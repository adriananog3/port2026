package main

// Escudo contra robôs maliciosos.
//
// O site quer ser lido e citado por buscadores e IAs de resposta (GEO/AEO),
// então o bloqueio é seletivo:
//   1. Varreduras de vulnerabilidade (/wp-admin, /.env, *.php...) recebem 404 seco.
//   2. Ferramentas de ataque e raspadores abusivos (lista abaixo) recebem 403.
//   3. Requisições sem User-Agent recebem 403.
//   4. Cada IP tem um teto de requisições por minuto (429 acima dele).
// Buscadores e IAs de citação (Googlebot, Bingbot, GPTBot, OAI-SearchBot,
// ChatGPT-User, ClaudeBot, PerplexityBot etc.) continuam liberados.

import (
	"log/slog"
	"net/http"
	"regexp"
	"strings"
	"sync"
	"time"
)

// Trechos (minúsculos) de User-Agent bloqueados: scanners de vulnerabilidade,
// ferramentas de ataque e raspadores que ignoram o robots.txt.
var badUserAgents = []string{
	// scanners e ferramentas de ataque
	"sqlmap", "nikto", "nmap", "masscan", "zgrab", "nuclei", "acunetix", "netsparker",
	"wpscan", "dirbuster", "gobuster", "ffuf", "feroxbuster", "w3af", "openvas",
	"jaeles", "whatweb", "wfuzz", "hydra", "arachni", "skipfish", "commix", "xsstrike",
	"censysinspect", "expanseinc", "internetmeasurement", "l9explore", "l9tcpid",
	"fuzz faster", "nessus", "qualys", "zmeu", "morfeus", "libwww-perl",
	// raspadores e robôs de IA que ignoram regras de rastreamento
	"bytespider", "img2dataset", "imagesiftbot", "timpibot", "omgili", "diffbot",
	"scrapy", "petalbot", "mj12bot", "dotbot", "blexbot", "dataforseobot",
	"serpstatbot", "seekportbot", "barkrowler", "megaindex", "magpie-crawler",
	"kangaroo bot", "velenpublicwebcrawler", "webzio", "sentibot",
}

// Robôs de busca e de IA de citação: nunca entram no limite de taxa.
var goodBots = []string{
	"googlebot", "google-extended", "googleother", "bingbot", "applebot", "duckduckbot",
	"yandexbot", "gptbot", "oai-searchbot", "chatgpt-user", "claudebot", "claude-user",
	"claude-searchbot", "perplexitybot", "perplexity-user", "linkedinbot",
	"facebookexternalhit", "whatsapp", "twitterbot", "slackbot", "telegrambot",
}

// Caminhos típicos de varredura de vulnerabilidade. O site não usa nenhum deles.
var probePath = regexp.MustCompile(`(?i)(^/(wp-|wp/|wordpress|xmlrpc|phpmyadmin|pma/|myadmin|cgi-bin|\.env|\.git|\.svn|\.hg|\.aws|\.ssh|\.ds_store|\.vscode|\.idea|vendor/|server-status|server-info|actuator|boaform|hnap1|owa/|autodiscover|solr|jenkins|telescope|_ignition|containers/|api/v1/pods|remote/|sftp-config|web\.config|config\.json|credentials|id_rsa)|\.(php\d?|phtml|asp|aspx|ashx|jsp|jspx|cgi|pl|sql|bak|old|orig|swp|ini|env|log|ya?ml|tar|tgz|gz|zip|rar|7z|db|sqlite)$)`)

const (
	rateWindow = time.Minute
	rateMax    = 240 // requisições por IP por minuto (a home completa usa cerca de 40)
)

type rateCounter struct {
	start time.Time
	n     int
}

var (
	rateMu    sync.Mutex
	rateHits  = map[string]*rateCounter{}
	rateSweep = time.Now()
)

func uaMatches(ua string, list []string) bool {
	for _, s := range list {
		if strings.Contains(ua, s) {
			return true
		}
	}
	return false
}

// overRate conta a requisição do IP e diz se ele passou do teto.
func overRate(ip string, now time.Time) bool {
	rateMu.Lock()
	defer rateMu.Unlock()
	if now.Sub(rateSweep) > 5*time.Minute || len(rateHits) > 20000 {
		for k, c := range rateHits {
			if now.Sub(c.start) > rateWindow {
				delete(rateHits, k)
			}
		}
		rateSweep = now
	}
	c := rateHits[ip]
	if c == nil || now.Sub(c.start) > rateWindow {
		rateHits[ip] = &rateCounter{start: now, n: 1}
		return false
	}
	c.n++
	return c.n > rateMax
}

// shield devolve true quando a requisição foi barrada (a resposta já foi escrita).
func shield(w http.ResponseWriter, r *http.Request) bool {
	if r.URL.Path == "/healthz" {
		return false
	}
	h := w.Header()
	block := func(code int, msg, motivo string) bool {
		h.Set("Cache-Control", "no-store")
		h.Set("Content-Type", "text/plain; charset=utf-8")
		h.Set("X-Robots-Tag", "noindex")
		if code == http.StatusTooManyRequests {
			h.Set("Retry-After", "60")
		}
		w.WriteHeader(code)
		w.Write([]byte(msg))
		logBlocked(r, code, motivo)
		return true
	}

	if probePath.MatchString(r.URL.Path) {
		return block(http.StatusNotFound, "404", "varredura")
	}
	ua := strings.ToLower(strings.TrimSpace(r.UserAgent()))
	if ua == "" {
		return block(http.StatusForbidden, "Acesso negado.", "sem-user-agent")
	}
	if uaMatches(ua, badUserAgents) {
		return block(http.StatusForbidden, "Acesso negado.", "robo-bloqueado")
	}
	if !uaMatches(ua, goodBots) && overRate(clientIP(r), time.Now()) {
		return block(http.StatusTooManyRequests, "Muitas requisições. Tente de novo em um minuto.", "limite-de-taxa")
	}
	return false
}

// logBlocked registra o bloqueio sem guardar o IP (minimização, LGPD art. 6º, III).
func logBlocked(r *http.Request, code int, motivo string) {
	ua := r.UserAgent()
	if len(ua) > 120 {
		ua = ua[:120]
	}
	slog.Info("bloqueado", "motivo", motivo, "status", code, "path", r.URL.Path, "ua", ua)
}
