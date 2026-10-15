// Auditoría técnica de SEO y GEO sobre el sitio ya construido.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const DIST = new URL('../dist/', import.meta.url).pathname
const fallos = []
const avisos = []
const ok = []

function paginas(dir = DIST, acc = []) {
  for (const n of readdirSync(dir)) {
    const ruta = join(dir, n)
    if (statSync(ruta).isDirectory()) paginas(ruta, acc)
    else if (n === 'index.html') acc.push(ruta)
  }
  return acc
}

const archivos = paginas()
const url = (f) => '/' + relative(DIST, f).replace(/index\.html$/, '')
const sacar = (h, re) => (h.match(re) || [])[1]

const titulos = new Map()
const descripciones = new Map()

for (const f of archivos) {
  const h = readFileSync(f, 'utf8')
  const u = url(f)

  const titulo = sacar(h, /<title>([^<]*)<\/title>/)
  if (!titulo) fallos.push(`${u} — sin <title>`)
  else {
    if (titulo.length > 65) avisos.push(`${u} — title de ${titulo.length} caracteres (se corta en Google sobre 60)`)
    if (titulos.has(titulo)) fallos.push(`${u} — title duplicado con ${titulos.get(titulo)}`)
    titulos.set(titulo, u)
  }

  const desc = sacar(h, /<meta name="description" content="([^"]*)"/)
  if (!desc) fallos.push(`${u} — sin meta description`)
  else {
    if (desc.length < 70) avisos.push(`${u} — description de solo ${desc.length} caracteres`)
    if (desc.length > 165) avisos.push(`${u} — description de ${desc.length} caracteres (se corta sobre 160)`)
    if (descripciones.has(desc)) fallos.push(`${u} — description duplicada con ${descripciones.get(desc)}`)
    descripciones.set(desc, u)
  }

  const h1 = h.match(/<h1[^>]*>/g) || []
  if (h1.length === 0) fallos.push(`${u} — sin <h1>`)
  if (h1.length > 1) fallos.push(`${u} — ${h1.length} elementos <h1>`)

  if (!/<link rel="canonical"/.test(h)) fallos.push(`${u} — sin canonical`)
  if (!/<html lang="es"/.test(h)) fallos.push(`${u} — sin lang="es"`)
  if (!/property="og:title"/.test(h)) fallos.push(`${u} — sin og:title`)
  if (!/property="og:image"/.test(h)) avisos.push(`${u} — sin og:image (al compartir sale sin imagen)`)

  // Imágenes sin alt
  const imgs = h.match(/<img[^>]*>/g) || []
  const sinAlt = imgs.filter((i) => !/\salt="/.test(i))
  if (sinAlt.length) fallos.push(`${u} — ${sinAlt.length} imagen(es) sin alt`)
  const altVacio = imgs.filter((i) => /\salt=""/.test(i))
  if (altVacio.length) avisos.push(`${u} — ${altVacio.length} imagen(es) con alt vacío`)

  // Datos estructurados
  const ld = h.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) || []
  if (ld.length === 0) fallos.push(`${u} — sin datos estructurados`)
  for (const bloque of ld) {
    const json = bloque.replace(/<[^>]*>/g, '')
    try { JSON.parse(json) } catch { fallos.push(`${u} — JSON-LD no parseable`) }
  }
  if (!/BreadcrumbList/.test(h) && u !== '/') avisos.push(`${u} — sin BreadcrumbList`)

  // Texto visible
  const texto = h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]*>/g, ' ')
  const palabras = texto.split(/\s+/).filter(Boolean).length
  if (palabras < 320) avisos.push(`${u} — solo ${palabras} palabras de texto`)

  // Marcadores sin rellenar visibles para el usuario
  const corchetes = (texto.match(/\[[A-ZÁÉÍÓÚÑ][^\]]{2,40}\]/g) || []).length
  if (corchetes) avisos.push(`${u} — ${corchetes} marcador(es) [PENDIENTE] visibles`)
}

ok.push(`${archivos.length} páginas analizadas`)

// Enlaces internos rotos y páginas huérfanas
const existentes = new Set(archivos.map(url))
const entrantes = new Map([...existentes].map((u) => [u, 0]))
const rotos = new Set()
for (const f of archivos) {
  const h = readFileSync(f, 'utf8')
  for (const m of h.matchAll(/href="(\/[^"#?]*)"/g)) {
    let d = m[1]
    if (!d.endsWith('/') && !d.includes('.')) d += '/'
    if (d.startsWith('/img/') || d.startsWith('/_astro/') || d.includes('.')) continue
    if (!existentes.has(d)) rotos.add(`${url(f)} → ${d}`)
    else entrantes.set(d, entrantes.get(d) + 1)
  }
}
for (const r of rotos) fallos.push(`enlace roto: ${r}`)
for (const [u, n] of entrantes) if (n === 0 && u !== '/') fallos.push(`${u} — página huérfana, ningún enlace apunta a ella`)

// Ficheros clave
if (!existsSync(join(DIST, 'robots.txt'))) fallos.push('falta robots.txt')
if (!existsSync(join(DIST, 'sitemap-index.xml'))) fallos.push('falta sitemap')
if (!existsSync(join(DIST, '404.html'))) fallos.push('falta 404.html')
if (!existsSync(join(DIST, 'llms.txt'))) avisos.push('sin llms.txt (GEO: guía a los modelos por el sitio)')

const pinta = (t, l) => { console.log(`\n${t} (${l.length})`); l.forEach((x) => console.log('  · ' + x)) }
pinta('CORRECTO', ok)
pinta('FALLOS', fallos)
pinta('AVISOS', avisos)
