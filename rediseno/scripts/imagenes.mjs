// Copia y optimiza a WebP sólo las imágenes que el sitio nuevo usa de verdad.
import { readFileSync, readdirSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname, extname } from 'node:path'
import sharp from 'sharp'

const RAIZ = new URL('../../', import.meta.url).pathname
const CONTENIDO = new URL('../src/content/paginas/', import.meta.url).pathname
const DESTINO = new URL('../public/img/', import.meta.url).pathname

const extra = [
  'images/Dr.JuanCabrera.jpg',
  'images/clinica-granada.jpg',
  'images/clinica-barcelona.jpg',
  'images/clinica-coruna-nueva.png',
  'images/equipo_clinica.jpg',
  'images/equipo.jpg',
  'images/logo.png',
  'images/slider0.webp',
  'images/quienes-somos.webp',
]

const usadas = new Set(extra)
for (const f of readdirSync(CONTENIDO).filter((n) => n.endsWith('.md'))) {
  const t = readFileSync(join(CONTENIDO, f), 'utf8')
  for (const m of t.matchAll(/"(images\/[^"]+)"/g)) usadas.add(m[1])
}

const ANCHOS = [480, 960, 1600, 2200]
let hechas = 0, fallos = 0, bytesOrig = 0, bytesNuevos = 0

for (const rel of [...usadas].sort()) {
  const origen = join(RAIZ, rel)
  if (!existsSync(origen)) { console.log('  falta:', rel); fallos++; continue }
  const base = rel.replace(/^images\//, '').replace(extname(rel), '')
  const dir = join(DESTINO, dirname(base))
  mkdirSync(dir, { recursive: true })
  bytesOrig += readFileSync(origen).length
  try {
    const meta = await sharp(origen).metadata()
    for (const w of ANCHOS) {
      const salida = join(DESTINO, `${base}-${w}.webp`)
      await sharp(origen).resize({ width: Math.min(w, meta.width || w) }).webp({ quality: 72 }).toFile(salida)
      bytesNuevos += readFileSync(salida).length
    }
    hechas++
  } catch (e) { console.log('  error:', rel, e.message); fallos++ }
}

console.log(`\n${hechas} imágenes convertidas, ${fallos} fallos`)
console.log(`original: ${(bytesOrig / 1048576).toFixed(1)} MB → webp: ${(bytesNuevos / 1048576).toFixed(1)} MB`)
