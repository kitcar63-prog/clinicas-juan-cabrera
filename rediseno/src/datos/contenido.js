const modulos = import.meta.glob('../content/paginas/*.md', { eager: true })

export const PAGINAS = Object.fromEntries(
  Object.entries(modulos).map(([ruta, mod]) => [ruta.split('/').pop().replace(/\.md$/, ''), mod])
)

export function pagina(slug) {
  const p = PAGINAS[slug]
  if (!p) throw new Error(`No existe el contenido "${slug}". Ejecuta npm run extraer.`)
  return p
}

// Texto plano de los .md, para poder reutilizar trozos (p. ej. las preguntas en la portada)
const crudos = import.meta.glob('../content/paginas/*.md', { eager: true, query: '?raw', import: 'default' })

export const CRUDOS = Object.fromEntries(
  Object.entries(crudos).map(([ruta, txt]) => [ruta.split('/').pop().replace(/\.md$/, ''), txt])
)

// Devuelve las preguntas de faq.md tal y como están escritas en la web actual
export function preguntasFrecuentes() {
  const txt = CRUDOS['faq'] || ''
  const cuerpo = txt.replace(/^---[\s\S]*?\n---\n/, '')
  const trozos = cuerpo.split(/\n(?=#{2,3} )/)
  return trozos
    .filter((t) => /^#{2,3} /.test(t))
    .map((t) => {
      const [cabecera, ...resto] = t.split('\n')
      return {
        pregunta: cabecera.replace(/^#{2,3} /, '').trim(),
        respuesta: resto.join('\n').replace(/\s+/g, ' ').trim(),
      }
    })
    .filter((p) => p.pregunta && p.respuesta)
}
