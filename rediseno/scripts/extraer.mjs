// Extrae el contenido real de las páginas HTML actuales a Markdown.
// No inventa texto: sólo limpia el marcado de la plantilla de 2015.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'

const RAIZ = new URL('../../', import.meta.url).pathname
const SALIDA = join(RAIZ, 'rediseno/src/content/paginas')

const PAGINAS = [
  { archivo: 'varices.html',                        slug: 'varices',                        seccion: 'patologia' },
  { archivo: 'ulceras-varicosas.html',              slug: 'ulceras-varicosas',              seccion: 'patologia' },
  { archivo: 'hemorroides.html',                    slug: 'hemorroides',                    seccion: 'patologia' },
  { archivo: 'malformaciones-vasculares.html',      slug: 'malformaciones-vasculares',      seccion: 'patologia' },
  { archivo: 'diagnostico-arana-vasculares.html',   slug: 'aranas-vasculares',              seccion: 'patologia' },
  { archivo: 'varices-embarazo.html',               slug: 'varices-embarazo',               seccion: 'patologia' },
  { archivo: 'varices-deportistas.html',            slug: 'varices-deportistas',            seccion: 'patologia' },
  { archivo: 'eliminar-grandes-varices.html',       slug: 'eliminar-grandes-varices',       seccion: 'patologia' },
  { archivo: 'microespuma.html',                    slug: 'microespuma',                    seccion: 'tratamiento' },
  { archivo: 'tratamiento-microespuma.html',        slug: 'tratamiento-microespuma',        seccion: 'tratamiento' },
  { archivo: 'tecnica-aplicacion.html',             slug: 'tecnica-aplicacion',             seccion: 'tratamiento' },
  { archivo: 'tratamientos.html',                   slug: 'tratamientos',                   seccion: 'indice' },
  { archivo: 'quienes-somos.html',                  slug: 'quienes-somos',                  seccion: 'institucional' },
  { archivo: 'equipo.html',                         slug: 'equipo',                         seccion: 'institucional' },
  { archivo: 'empresas-vinculadas.html',            slug: 'empresas-vinculadas',            seccion: 'institucional' },
  { archivo: 'historia-escleroterapia.html',        slug: 'historia-escleroterapia',        seccion: 'divulgacion' },
  { archivo: 'variz.html',                          slug: 'que-es-una-variz',                seccion: 'divulgacion' },
  { archivo: 'divulgacion.html',                    slug: 'divulgacion',                    seccion: 'divulgacion' },
  { archivo: 'faq.html',                            slug: 'faq',                            seccion: 'pacientes' },
  { archivo: 'avisolegal.html',                     slug: 'aviso-legal',                    seccion: 'legal' },
  { archivo: 'politica-privacidad.html',            slug: 'politica-privacidad',            seccion: 'legal' },
  { archivo: 'politicacookies.html',                slug: 'politica-cookies',               seccion: 'legal' },
]

const ent = (s) => s
  .replace(/&#8471;/g, '℗').replace(/&commat;/g, '@').replace(/&period;/g, '.')
  .replace(/&nbsp;/g, ' ').replace(/&aacute;/g, 'á').replace(/&eacute;/g, 'é')
  .replace(/&iacute;/g, 'í').replace(/&oacute;/g, 'ó').replace(/&uacute;/g, 'ú')
  .replace(/&ntilde;/g, 'ñ').replace(/&Aacute;/g, 'Á').replace(/&Eacute;/g, 'É')
  .replace(/&Iacute;/g, 'Í').replace(/&Oacute;/g, 'Ó').replace(/&Uacute;/g, 'Ú')
  .replace(/&Ntilde;/g, 'Ñ').replace(/&uuml;/g, 'ü').replace(/&deg;/g, '°')
  .replace(/&ordm;/g, 'º').replace(/&ordf;/g, 'ª').replace(/&hellip;/g, '…')
  .replace(/&mdash;/g, '—').replace(/&ndash;/g, '–').replace(/&laquo;/g, '«')
  .replace(/&raquo;/g, '»').replace(/&quot;/g, '"').replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>')

// Erratas del HTML original que se corrigen al migrar. Añadir aquí, no a mano
// en los .md, para que no se pierdan al volver a extraer.
// Títulos para la etiqueta <title> cuando el de la página no cabe en
// un resultado de búsqueda (unos 60 caracteres).
const TITULOS_SEO = {
  'microespuma': 'Escleroterapia con microespuma',
  'aranas-vasculares': 'Arañas vasculares: diagnóstico y tratamiento',
  'eliminar-grandes-varices': 'Eliminar grandes varices sin cirugía',
  'tratamiento-microespuma': 'Tratamiento de hemorroides con microespuma',
  'historia-escleroterapia': 'Historia de la escleroterapia',
  'que-es-una-variz': 'Qué es una variz',
}

const ERRATAS = [
  [/TRATATAMIENTO/g, 'TRATAMIENTO'],
]

const corregir = (s) => ERRATAS.reduce((acc, [de, a]) => acc.replace(de, a), s)

const limpiar = (s) => corregir(ent(s.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim())

function extraerGaleria(html) {
  const fotos = []
  const re = /<a href="(images\/[^"]+)"[^>]*>\s*<img[^>]*>\s*<\/a>\s*<div class="caption"[^>]*>\s*<p>([^<]*)<\/p>/g
  let m
  while ((m = re.exec(html))) fotos.push({ src: m[1], pie: limpiar(m[2]) })
  return fotos
}

function extraerImagenes(html) {
  const out = new Set()
  const re = /<img[^>]+src="(images\/[^"]+)"/g
  let m
  while ((m = re.exec(html))) {
    if (!/ie8-panel|blank\.gif|loader|fancybox|marker/.test(m[1])) out.add(m[1])
  }
  return [...out]
}

function aMarkdown(html, enGaleria = new Set(), tituloPagina = '') {
  let s = html
  s = s.replace(/<img[^>]+src="(images\/[^"]+)"[^>]*>/gi, (etiqueta, ruta) => {
    if (enGaleria.has(ruta) || /ie8-panel|blank\.gif|loader|fancybox|marker/.test(ruta)) return ''
    const alt = ((etiqueta.match(/alt="([^"]*)"/i) || [])[1] || '').trim() || tituloPagina
    const webp = '/img/' + ruta.replace(/^images\//, '').replace(/\.[a-zA-Z0-9]+$/, '') + '-960.webp'
    return `\n\n![${alt}](${webp})\n\n`
  })
  s = s.replace(/<!--[\s\S]*?-->/g, '')
  s = s.replace(/<script[\s\S]*?<\/script>/gi, '')
  s = s.replace(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi, (_, t, c) => {
    const n = Number(t[1])
    const nivel = n <= 3 ? '##' : '###'
    const txt = limpiar(c)
    return txt ? `\n\n${nivel} ${txt}\n\n` : ''
  })
  s = s.replace(/<br\s*\/?>/gi, '\n\n')
  s = s.replace(/<\/p>/gi, '\n\n').replace(/<p[^>]*>/gi, '')
  s = s.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, c) => `\n- ${limpiar(c)}`)
  s = s.replace(/<\/?(ul|ol)[^>]*>/gi, '\n\n')
  s = s.replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_, h, c) => {
    const t = limpiar(c)
    return t ? `[${t}](${h})` : ''
  })
  s = s.replace(/<(b|strong)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, c) => {
    const t = ent(c.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim()
    return t ? `**${t}**` : ''
  })
  s = s.replace(/<(i|em)[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, c) => {
    const t = ent(c.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim()
    return t ? `*${t}*` : ''
  })
  s = s.replace(/\[(!\[[^\]]*\]\([^)]*\))\]\([^)]*\)/g, '$1')
  s = s.replace(/<[^>]*>/g, ' ')
  s = ent(s)
  s = s.split('\n').map((l) => l.replace(/[ \t]+/g, ' ').trim()).join('\n')
  s = s.replace(/\n{3,}/g, '\n\n').trim()
  s = s.split('\n').filter((l) => !/^\*{0,2}(ANTES|DESPU[EÉ]S)\*{0,2}\.?$/i.test(l.trim())).join('\n')
  s = s.replace(/\*\*[ \t]*\*\*/g, '').replace(/ +([,.;:）)])/g, '$1')

  // Bloque de tarjetas de la plantilla de 2015: no es contenido de la clínica
  s = s.replace(/\n#{2,3} (Productos Y Servicios|Contacta|Te Llamamos Gratis)[\s\S]*$/i, '')
  s = s.replace(/^\s*\[ver m[áa]s\]\([^)]*\)\s*$/gim, '')

  // Encabezados idénticos consecutivos (los pies "Resultados" repetidos)
  const lineas = s.split('\n')
  const salida = []
  let ultimoEnc = ''
  for (const l of lineas) {
    const esEnc = /^#{2,3} /.test(l)
    if (esEnc) {
      if (l.trim() === ultimoEnc) continue
      ultimoEnc = l.trim()
    } else if (l.trim()) {
      ultimoEnc = ''
    }
    salida.push(l)
  }
  s = salida.join('\n')

  // Encabezados al final sin nada debajo
  s = s.replace(/(\n#{2,3} [^\n]*\n*)+$/, '')
  s = corregir(s.replace(/\n{3,}/g, '\n\n').trim())
  return s
}

mkdirSync(SALIDA, { recursive: true })
const informe = []

for (const p of PAGINAS) {
  let bruto
  try { bruto = readFileSync(join(RAIZ, p.archivo), 'utf8') } catch { informe.push(`FALTA ${p.archivo}`); continue }

  const mMain = bruto.match(/<main>([\s\S]*?)<\/main>/i)
  const cuerpoHtml = mMain ? mMain[1] : ''
  if (!cuerpoHtml) { informe.push(`SIN <main> ${p.archivo}`); continue }

  const titulo = corregir((bruto.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '').trim())
  const descripcion = (bruto.match(/<meta name="description" content="([^"]*)"/i)?.[1] || '').trim()
  const h5 = limpiar(cuerpoHtml.match(/<h5[^>]*>([\s\S]*?)<\/h5>/i)?.[1] || '')

  const galeria = extraerGaleria(cuerpoHtml)
  const imagenes = extraerImagenes(cuerpoHtml)
  const enGaleria = new Set(galeria.map((g) => g.src))
  let cuerpo = aMarkdown(cuerpoHtml, enGaleria, limpiar(h5 || titulo))
  const primero = (h5 || titulo).trim().toLowerCase()
  cuerpo = cuerpo.replace(/^#{2,3} ([^\n]+)\n+/, (todo, txt) =>
    txt.trim().toLowerCase() === primero ? '' : todo
  )

  // Los títulos del HTML viejo vienen en mayúsculas y son larguísimos:
  // se normalizan para que quepan en los resultados de Google.
  const aFrase = (s) =>
    s === s.toUpperCase() && /[A-ZÁÉÍÓÚÑ]{4}/.test(s)
      ? s.charAt(0) + s.slice(1).toLowerCase().replace(/\bmicroespuma℗/gi, 'Microespuma℗')
      : s
  const tituloCorto = aFrase(h5 || titulo).replace(/\s+/g, ' ').trim()

  // Si la página no traía meta description, se saca del primer párrafo real.
  let descripcionFinal = ent(descripcion)
  if (!descripcionFinal) {
    const primerParrafo = cuerpo
      .split('\n')
      .map((l) => l.trim())
      .find((l) => l && !l.startsWith('#') && !l.startsWith('!') && !l.startsWith('[') && l.length > 80)
    if (primerParrafo) {
      const limpio = primerParrafo.replace(/\*\*/g, '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/\s+/g, ' ').trim()
      descripcionFinal = limpio.length > 155 ? limpio.slice(0, 152).replace(/[\s,;:]+\S*$/, '') + '…' : limpio
    }
  }

  const fm = [
    '---',
    `titulo: ${JSON.stringify(h5 || titulo)}`,
    `tituloSeo: ${JSON.stringify(titulo)}`,
    `descripcion: ${JSON.stringify(descripcionFinal)}`,
    `tituloCorto: ${JSON.stringify(tituloCorto)}`,
    `tituloSeo2: ${JSON.stringify(TITULOS_SEO[p.slug] || tituloCorto)}`,
    `seccion: ${p.seccion}`,
    `origen: ${p.archivo}`,
    imagenes.length ? `imagenes:\n${imagenes.map((i) => `  - ${JSON.stringify(i)}`).join('\n')}` : 'imagenes: []',
    galeria.length
      ? `galeria:\n${galeria.map((g) => `  - src: ${JSON.stringify(g.src)}\n    pie: ${JSON.stringify(g.pie)}`).join('\n')}`
      : 'galeria: []',
    '---',
    '',
  ].join('\n')

  writeFileSync(join(SALIDA, `${p.slug}.md`), fm + cuerpo + '\n', 'utf8')
  informe.push(`${p.slug.padEnd(32)} ${String(cuerpo.split(/\s+/).length).padStart(5)} palabras · ${galeria.length} fotos galería · ${imagenes.length} imgs`)
}

console.log(informe.join('\n'))
