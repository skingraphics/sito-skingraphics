# skingraphics.it — sito + pannello

Sito statico (HTML/JS) che legge contenuti, font, colori ed effetti da Supabase.

- `index.html` — il sito
- `admin/` — pannello di gestione (login Supabase, solo email in `sito_admins`)
- `config.js` — URL e chiave **pubblica** di Supabase
- `seed.js` — contenuti di riserva se Supabase non risponde
- `img/` — immagini iniziali (le nuove si caricano dal pannello nel bucket `sito-skin`)

## Pubblicazione
Ogni push su `main` viene pubblicato da Vercel su https://nuovo.skingraphics.it (fase di prova).
`vercel.json` chiede a Google di non indicizzare: togliere l'header `X-Robots-Tag`
e il meta `robots` in `index.html` quando si va su skingraphics.it.

## Backend (Supabase)
Tabelle `sito_content`, `sito_content_history`, `sito_admins`, bucket `sito-skin`, con RLS:
lettura pubblica, scrittura solo per gli admin.
