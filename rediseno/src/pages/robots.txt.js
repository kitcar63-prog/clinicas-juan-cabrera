import { SITIO } from '../datos/sitio.js'

// Mientras INDEXABLE no valga "true", el sitio se cierra a los buscadores.
// Al pasar a producción: vercel env add INDEXABLE production  →  true
const INDEXABLE = import.meta.env.INDEXABLE === 'true'

const CERRADO = `# Entorno de pruebas. No indexar.
User-agent: *
Disallow: /
`

const ABIERTO = `User-agent: *
Allow: /

# Rastreadores de IA: permitidos a propósito, para poder ser citados
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITIO.url}/sitemap-index.xml
`

export function GET() {
  return new Response(INDEXABLE ? ABIERTO : CERRADO, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
