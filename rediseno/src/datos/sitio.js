export const SITIO = {
  nombre: 'Clínicas Dr. Juan Cabrera',
  url: 'https://www.clinicasdoctorjuancabrera.com',
  email: 'clinicas@drjuancabrera.com',
  // TODO pendiente de la clínica: razón social y número de colegiado
  razonSocial: '[RAZÓN SOCIAL]',
  colegiado: '[PENDIENTE]',
}

// Perfiles enlazados desde la cabecera de la web actual
export const REDES = [
  { nombre: 'Facebook', url: 'https://es-es.facebook.com/ClinicasCabrera/' },
  { nombre: 'Twitter', url: 'https://twitter.com/clinicascabrera' },
  { nombre: 'Instagram', url: 'https://www.instagram.com/clinicascabrera/' },
]

export const CLINICAS = [
  {
    slug: 'granada',
    nombre: 'Granada',
    direccion: 'C/ Tejeiro, 2 — 4º izqda.',
    cp: '18005',
    ciudad: 'Granada',
    provincia: 'Granada',
    telefonos: ['958 25 03 00', '958 25 07 00'],
    telefonoE164: '+34958250300',
    registroSanitario: '10549',
    foto: 'images/clinica-granada.jpg',
    equipo: [
      { nombre: 'Dr. Juan Cabrera Garrido', puesto: 'Cirujano vascular' },
      { nombre: 'Dr. Antonio Becerra', puesto: 'Especialista en flebología' },
      { nombre: 'Dra. Celia Garrido', puesto: 'Especialista en flebología y nefrología' },
      { nombre: 'Dra. Raquel Tendero', puesto: 'Especialista en flebología y medicina nuclear' },
      { nombre: 'Dr. Emir Salkovic', puesto: 'Especialista en microbiología' },
    ],
    enfermeria: ['Angélica Espigares', 'Mercedes Rodríguez', 'Angelina Alcaráz', 'Inmaculada Valdivia', 'María José Rodríguez', 'Marisol Gutiérrez'],
    administracion: ['Carlos Mochón, gerente', 'Silvia de la Fuente'],
  },
  {
    slug: 'barcelona',
    nombre: 'Barcelona',
    direccion: '[DIRECCIÓN BARCELONA]',
    cp: '[CP]',
    ciudad: 'Barcelona',
    provincia: 'Barcelona',
    telefonos: ['932 05 66 14'],
    telefonoE164: '+34932056614',
    registroSanitario: 'E08792275',
    foto: 'images/clinica-barcelona.jpg',
    equipo: [
      { nombre: 'Dr. Juan Cabrera Garrido', puesto: 'Cirujano vascular' },
      { nombre: 'Dra. María Rubia', puesto: 'Especialista en flebología y medicina intensiva' },
    ],
    enfermeria: ['Ana Aguirre', 'Olga San Millán'],
    administracion: ['Inés Bach, gerente', 'Silvia de la Fuente'],
  },
  {
    slug: 'a-coruna',
    nombre: 'A Coruña',
    direccion: '[DIRECCIÓN A CORUÑA]',
    cp: '[CP]',
    ciudad: 'A Coruña',
    provincia: 'A Coruña',
    telefonos: ['981 17 54 57'],
    telefonoE164: '+34981175457',
    registroSanitario: 'C-15-002644',
    foto: 'images/clinica-coruna-nueva.png',
    equipo: [
      { nombre: 'Dr. Juan Cabrera Garrido', puesto: 'Cirujano vascular' },
      { nombre: 'Dra. Teresa Pintos Moreu', puesto: 'Especialista en flebología y exploraciones vasculares' },
      { nombre: 'Dr. Gonzalo López', puesto: 'Especialista en flebología. Doctor en Ingeniería Tisular, especialidad en Biomateriales' },
    ],
    enfermeria: ['Virginia Torreiro', 'María García Yáñez', 'Susana Monteiro'],
    administracion: [],
  },
]

export const PATOLOGIAS = [
  {
    slug: 'varices',
    nombre: 'Varices',
    // Resúmenes tomados literalmente de tratamientos.html de la web actual
    resumen: 'El tratamiento con microespuma viene a revolucionar el mundo del tratamiento de las varices, ya que consigue la eliminación total de todo tipo de varices.',
  },
  {
    slug: 'aranas-vasculares',
    nombre: 'Arañas vasculares',
    resumen: 'Diagnosticarlas correctamente y diferenciar su origen es fundamental antes de tratarlas.',
  },
  {
    slug: 'hemorroides',
    nombre: 'Hemorroides',
    resumen: 'En Clínicas Dr. Juan Cabrera se realiza el tratamiento de las hemorroides mediante un procedimiento de ablación química.',
  },
  {
    slug: 'ulceras-varicosas',
    nombre: 'Úlceras varicosas',
    resumen: 'Las úlceras varicosas son una de las grandes complicaciones de las varices cuando no son tratadas debidamente y a su tiempo.',
  },
  {
    slug: 'malformaciones-vasculares',
    nombre: 'Malformaciones vasculares',
    resumen: 'Las malformaciones vasculares son lesiones benignas presentes siempre desde el nacimiento.',
  },
  {
    slug: 'varices-embarazo',
    nombre: 'Varices en el embarazo',
    resumen: 'Un porcentaje alto de mujeres desarrollan varices por primera vez durante el embarazo.',
  },
  {
    slug: 'varices-deportistas',
    nombre: 'Varices en deportistas',
    resumen: 'En los deportistas las varices afectan de forma directa a su rendimiento deportivo.',
  },
  {
    slug: 'eliminar-grandes-varices',
    nombre: 'Grandes varices',
    resumen: '¿Puede la escleroterapia con microespuma eliminar las grandes varices? Sí, sin duda.',
  },
]

export const TRATAMIENTOS = [
  { slug: 'microespuma', nombre: 'Escleroterapia con microespuma' },
  { slug: 'tecnica-aplicacion', nombre: 'Técnica de aplicación' },
  { slug: 'tratamiento-microespuma', nombre: 'El tratamiento, en detalle' },
]

// El fundador tiene entrada propia en Wikipedia: es el ancla de entidad más fuerte
// que tiene la clínica para SEO y para que los modelos de IA la citen.
export const FUNDADOR = {
  nombre: 'Dr. Juan Ramón Cabrera Garrido',
  cargo: 'Cirujano vascular · Inventor de la escleroterapia con microespuma',
  wikipedia: 'https://es.wikipedia.org/wiki/Juan_Cabrera_Garrido',
  patente: 'EP0656203A1',
  patenteUrl: 'https://patents.google.com/patent/EP0656203A1',
  // Párrafo literal de la home actual
  resena:
    'El Dr. Juan Ramón Cabrera Garrido inventó y patentó en 1993 la nueva forma farmacéutica de Microespuma℗ inyectable, la cual se emplea en el tratamiento no quirúrgico de todo tipo de varices, hemorroides, malformaciones venosas (incluyendo las inoperables y las de localizaciones delicadas), úlceras varicosas y varicocele, y en cuya patente se basa Varithena®, primera especialidad farmacéutica de origen español aprobada por la FDA y que desde 2014 se comercializa en EE. UU. y Canadá para la eliminación de grandes varices.',
  // Reconocimientos recogidos en su entrada de Wikipedia
  credenciales: [
    'Académico correspondiente de la Real Academia de Medicina y Cirugía de Granada',
    'Miembro honorífico de la Unión Internacional de Angiología',
    'Miembro honorífico de la Sociedad Francesa de Flebología',
    'Miembro titular de la Sociedad Española de Angiología',
    'Primer premio del Colegio Oficial de Médicos de Granada (1996)',
    'Mención honorífica en el premio internacional «Cid Dos Santos — Boehringer Mannheim»',
  ],
  primeraPublicacion:
    '«Nuevo Método de Esclerosis en las Varices Tronculares», Patología Vascular, vol. 1, nº 4: 55-71 (1995)',
}

// Migas de pan en datos estructurados, para cualquier página
export function migasLd(ruta, nombre) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITIO.url + '/' },
      { '@type': 'ListItem', position: 2, name: nombre, item: SITIO.url + ruta },
    ],
  }
}
