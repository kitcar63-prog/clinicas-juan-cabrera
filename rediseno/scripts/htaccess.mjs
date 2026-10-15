// Traduce las redirecciones y cabeceras de vercel.json a .htaccess,
// para poder subir el sitio al hosting actual (Plesk + Apache).
import { readFileSync, writeFileSync } from 'node:fs'

const cfg = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
const indexable = process.env.INDEXABLE === 'true'

const redirs = cfg.redirects
  .filter((r) => r.source !== '/pedir-cita')
  .map((r) => `Redirect 301 ${r.source} ${r.destination}`)
  .join('\n')

const salida = `# Generado por scripts/htaccess.mjs — no editar a mano.
# Regenerar con: npm run htaccess

Options -Indexes
DirectoryIndex index.html index.php

<IfModule mod_headers.c>
${indexable ? '  # Sitio abierto a buscadores' : '  # Entorno cerrado a buscadores\n  Header set X-Robots-Tag "noindex, nofollow"'}
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  <FilesMatch "\\.(webp|avif|jpg|jpeg|png|gif|svg|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.(css|js)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json image/svg+xml
</IfModule>

AddType text/plain .txt
AddType image/webp .webp

ErrorDocument 404 /404.html

# --- Redirecciones de las URLs antiguas ---
${redirs}
`

writeFileSync(new URL('../dist/.htaccess', import.meta.url), salida, 'utf8')
console.log(`.htaccess generado · ${cfg.redirects.length - 1} redirecciones · indexable: ${indexable}`)
