// Construye el corpus que lee el asistente: SOLO el contenido migrado de la clínica.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const DIR = new URL('../src/content/paginas/', import.meta.url).pathname
const SALIDA = new URL('../api/_corpus.js', import.meta.url).pathname

// slug del .md -> URL pública
const RUTAS = {
  varices: '/patologias/varices/',
  'ulceras-varicosas': '/patologias/ulceras-varicosas/',
  hemorroides: '/patologias/hemorroides/',
  'malformaciones-vasculares': '/patologias/malformaciones-vasculares/',
  'aranas-vasculares': '/patologias/aranas-vasculares/',
  'varices-embarazo': '/patologias/varices-embarazo/',
  'varices-deportistas': '/patologias/varices-deportistas/',
  'eliminar-grandes-varices': '/patologias/eliminar-grandes-varices/',
  microespuma: '/tratamiento/microespuma/',
  'tratamiento-microespuma': '/tratamiento/tratamiento-microespuma/',
  'tecnica-aplicacion': '/tratamiento/tecnica-aplicacion/',
  tratamientos: '/patologias/',
  'quienes-somos': '/la-clinica/',
  equipo: '/equipo/',
  'empresas-vinculadas': '/investigacion/',
  'historia-escleroterapia': '/divulgacion/historia-escleroterapia/',
  'que-es-una-variz': '/divulgacion/que-es-una-variz/',
  divulgacion: '/divulgacion/',
  faq: '/preguntas-frecuentes/',
}

const partes = []
const indice = []

for (const archivo of readdirSync(DIR).filter((f) => f.endsWith('.md')).sort()) {
  const slug = archivo.replace(/\.md$/, '')
  const ruta = RUTAS[slug]
  if (!ruta) continue // las legales no entran: el asistente no debe interpretarlas

  const bruto = readFileSync(join(DIR, archivo), 'utf8')
  const titulo = (bruto.match(/^titulo: "(.*)"$/m) || [])[1] || slug
  const cuerpo = bruto
    .replace(/^---[\s\S]*?\n---\n/, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '') // las imágenes no aportan al texto
    .replace(/\n{3,}/g, '\n\n')
    .trim()

  if (!cuerpo) continue
  partes.push(`<pagina url="${ruta}" titulo="${titulo}">\n${cuerpo}\n</pagina>`)
  indice.push({ titulo, ruta, palabras: cuerpo.split(/\s+/).length })
}

const FUNDADOR = `
<fundador>
Dr. Juan Ramón Cabrera Garrido, cirujano vascular, fundador de las clínicas.
En 1993 inventó los esclerosantes en Microespuma℗, forma farmacéutica inyectable para el tratamiento no quirúrgico de varices, malformaciones venosas, úlceras varicosas, varicocele y hemorroides. La patentó junto a su hijo Juan Cabrera García-Olmedo, farmacéutico. Número de patente europea: EP0656203A1.
Primera publicación: "Nuevo Método de Esclerosis en las Varices Tronculares", Patología Vascular, vol 1, nº 4: 55-71, 1995.
La multinacional británica BTG plc adquirió los derechos y desarrolló a partir de esa patente el fármaco Varithena®, la primera especialidad farmacéutica de origen español aprobada por la FDA, comercializada en Estados Unidos desde 2014.
Reconocimientos: miembro titular de la Sociedad Española de Angiología; miembro honorífico de la Unión Internacional de Angiología; miembro honorífico de la Sociedad Francesa de Flebología; académico correspondiente de la Real Academia de Medicina y Cirugía de Granada; primer premio del Colegio Oficial de Médicos de Granada (1996); mención honorífica en el premio internacional "Cid Dos Santos - Boehringer Mannheim"; mención especial del Ilustre Colegio Oficial de Farmacéuticos de Granada.
Tiene entrada propia en Wikipedia: https://es.wikipedia.org/wiki/Juan_Cabrera_Garrido
Según la propia clínica, en España la escleroterapia ecoguiada con su Microespuma℗ patentada se realiza de forma exclusiva en Clínicas Dr. Juan Cabrera.
</fundador>
`.trim()

const DATOS = `
<clinicas>
Granada — C/ Tejeiro 2, 4º izqda., 18005 Granada. Teléfonos 958 25 03 00 y 958 25 07 00. Registro sanitario 10549.
Barcelona — dirección pendiente de confirmar. Teléfono 932 05 66 14. Registro sanitario E08792275.
A Coruña — dirección pendiente de confirmar. Teléfono 981 17 54 57. Registro sanitario C-15-002644.
Correo: clinicas@drjuancabrera.com. Pedir cita: /pedir-cita/
</clinicas>
`.trim()

const contenido = `// Generado por scripts/corpus.mjs — no editar a mano.
export const CORPUS = ${JSON.stringify(FUNDADOR + '\n\n' + DATOS + '\n\n' + partes.join('\n\n'))}

export const INDICE = ${JSON.stringify(indice, null, 2)}
`

writeFileSync(SALIDA, contenido, 'utf8')
const palabras = indice.reduce((n, p) => n + p.palabras, 0)
console.log(`${indice.length} páginas · ${palabras} palabras · ${(contenido.length / 1024).toFixed(0)} KB`)
console.log(`≈ ${Math.round(palabras * 1.6)} tokens aproximados de corpus`)
