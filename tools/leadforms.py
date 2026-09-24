"""Trechos compartilhados dos formulários de cadastro direto (newsletter e Banco de Prompts)."""
from pathlib import Path
_D = Path(__file__).resolve().parent / "snippets"
JS = (_D / "leadform.js").read_text(encoding="utf-8")
CSS = (_D / "leadform.css").read_text(encoding="utf-8") + ".sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0)}\n"
ENV = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M3.5 6.5l8.5 6.5 8.5-6.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>'
ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
HP = '<input class="hp" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true">'

def field(name, label, typ="text", auto="", placeholder=None, icon=""):
    ph = placeholder or label
    return (f'<label class="nl-field">{icon}<span class="sr-only">{label}</span>'
            f'<input type="{typ}" name="{name}" placeholder="{ph}" autocomplete="{auto}" required data-nome="{label.lower()}"></label>')

def newsletter(origem, fallback_href, dark=False):
    return (f'<form class="nl-form{" nl-dark" if dark else ""}" data-tipo="newsletter" data-origem="{origem}" data-fallback="fb-{origem}" novalidate>'
            + field("email", "Seu e-mail", "email", "email", icon=ENV) + HP +
            f'<button type="submit" class="nl-go">Quero receber {ARROW}</button>'
            '<label class="nl-ok"><input type="checkbox" name="consentimento" required> <span>Quero receber a Newsletter Café com Marketing por e-mail. Posso cancelar quando quiser (LGPD).</span></label>'
            '<p class="nl-st" role="status" aria-live="polite"></p>'
            f'<p class="nl-fb" id="fb-{origem}" hidden><a href="{fallback_href}">Concluir a inscrição pelo formulário →</a></p></form>')

def prompts(origem="banco-de-prompts"):
    return (f'<form class="nl-form nl-dark" id="bp-form" data-tipo="prompts" data-origem="{origem}" data-fallback="bp-fb" novalidate>'
            + field("nome", "Nome", "text", "name")
            + field("empresa", "Empresa", "text", "organization")
            + field("telefone", "Telefone com DDD", "tel", "tel", "Telefone com DDD")
            + field("email", "E-mail", "email", "email", icon=ENV) + HP +
            f'<button type="submit" class="nl-go">Liberar acesso gratuito {ARROW}</button>'
            '<label class="nl-ok"><input type="checkbox" name="consentimento" required> <span>Concordo com o uso dos meus dados para liberar o acesso e receber conteúdos relacionados, conforme a LGPD. Posso pedir a exclusão a qualquer momento.</span></label>'
            '<p class="nl-st" role="status" aria-live="polite"></p></form>')
