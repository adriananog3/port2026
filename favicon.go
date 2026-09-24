package main

// Favicon do site: monograma "AN" dourado sobre preto, na identidade visual.
// Servido pelo próprio servidor (sem arquivos binários no repositório).

import (
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
)

const faviconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#000"/><rect x="2" y="2" width="60" height="60" rx="12.5" fill="none" stroke="#C9A96E" stroke-width="1.6"/><path fill="#C9A96E" transform="translate(7.66 43.38) scale(0.01684 -0.01684)" d="M428 73V0H20V73L120 100L597 1352H887L1362 100L1464 73V0H867V73L1022 100L894 447H379L256 100ZM641 1150 420 557H856ZM2574 1242 2394 1268V1341H2871V1268L2699 1242V0H2582L1755 1078V100L1935 73V0H1458V73L1630 100V1242L1458 1268V1341H1917L2574 484Z"/></svg>`

const faviconICOBase64 = "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" +
	"zwtxAAAAAElFTkSuQmCC"

func addFavicons(s *site) {
	add := func(p, ctype string, body []byte) {
		if _, ok := s.files[p]; ok {
			return
		}
		sum := sha256.Sum256(body)
		s.files[p] = &asset{body: body, ctype: ctype, etag: `"` + hex.EncodeToString(sum[:8]) + `"`, cacheCtl: "public, max-age=86400"}
	}
	add("/favicon.svg", "image/svg+xml", []byte(faviconSVG))
	if b, err := base64.StdEncoding.DecodeString(faviconICOBase64); err == nil {
		add("/favicon.ico", "image/x-icon", b)
	}
}
