// Brand color palette for Boost Digital HN
export const colors = {
  primary: '#0d0869',
  accent: '#ff4342',
  highlight: '#3b6cff',
  bgDark: '#06043a',
  bgDarker: '#030225',
  white: '#f8f9ff',
  gray: '#a6accd',
  glowRed: '#ff6a63',
  glowBlue: '#4f7aff',
} as const;

export const services = [
  {
    title: 'Estrategia de Marketing',
    description: 'Diseñamos estrategias integrales que conectan tu marca con la audiencia correcta, maximizando cada punto de contacto.',
    icon: 'strategy',
  },
  {
    title: 'Marketing Digital',
    description: 'Campañas digitales de alto impacto en redes sociales, search y programmatic que generan resultados medibles.',
    icon: 'digital',
  },
  {
    title: 'Eventos BTL',
    description: 'Producción de eventos experienciales a gran escala que crean conexiones memorables entre marcas y personas.',
    icon: 'btl',
  },
  {
    title: 'Activaciones de Marca',
    description: 'Experiencias inmersivas en punto de venta y espacios públicos que transforman audiencias en embajadores de marca.',
    icon: 'activation',
  },
  {
    title: 'Marketing Experiencial',
    description: 'Creamos momentos únicos que involucran todos los sentidos y generan un impacto emocional duradero.',
    icon: 'experiential',
  },
] as const;

export const caseStudies = [
  {
    title: 'Lanzamiento Nacional',
    client: 'Marca Premium Beverage',
    category: 'Evento BTL',
    image: '/brand/buho2.png',
    stats: '+50K asistentes',
  },
  {
    title: 'Campaña Digital 360°',
    client: 'Retail Líder Regional',
    category: 'Marketing Digital',
    image: '/brand/buho2.png',
    stats: '+200% engagement',
  },
  {
    title: 'Festival de Marca',
    client: 'Telecom Nacional',
    category: 'Activación',
    image: '/brand/buho2.png',
    stats: '+30K interacciones',
  },
  {
    title: 'Experiencia Inmersiva',
    client: 'Automotriz Premium',
    category: 'Experiencial',
    image: '/brand/buho2.png',
    stats: '98% satisfacción',
  },
] as const;

export const processSteps = [
  {
    step: '01',
    title: 'Descubrimiento',
    description: 'Entendemos tu marca, objetivos y audiencia a profundidad.',
  },
  {
    step: '02',
    title: 'Estrategia',
    description: 'Diseñamos un plan integral con KPIs claros y medibles.',
  },
  {
    step: '03',
    title: 'Creación',
    description: 'Producimos contenido, experiencias y campañas de clase mundial.',
  },
  {
    step: '04',
    title: 'Ejecución',
    description: 'Implementamos con precisión y atención obsesiva al detalle.',
  },
  {
    step: '05',
    title: 'Optimización',
    description: 'Medimos, iteramos y escalamos lo que funciona.',
  },
] as const;

export const testimonials = [
  {
    quote: 'Boost Digital transformó nuestra presencia de marca. El evento superó todas nuestras expectativas con una producción de nivel internacional.',
    author: 'María González',
    role: 'Directora de Marketing',
    company: 'Grupo Empresarial',
  },
  {
    quote: 'La estrategia digital que implementaron duplicó nuestras conversiones en solo 3 meses. Un equipo verdaderamente excepcional.',
    author: 'Carlos Mendoza',
    role: 'CEO',
    company: 'Tech Startup HN',
  },
  {
    quote: 'Cada activación que han producido para nosotros ha sido memorable. Entienden cómo crear experiencias que la gente no olvida.',
    author: 'Ana Rodríguez',
    role: 'Brand Manager',
    company: 'Marca Nacional',
  },
] as const;

export const trustIndicators = [
  { value: '10+', label: 'Años de experiencia' },
  { value: '500+', label: 'Campañas ejecutadas' },
  { value: '200+', label: 'Clientes satisfechos' },
  { value: '50+', label: 'Eventos a gran escala' },
] as const;
