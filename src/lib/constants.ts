// Brand color palette for Boost Digital HN
export const colors = {
  primary: '#0d0869',
  accent: '#ff4342',
  orange: '#ff6000',
  highlight: '#3b6cff',
  bgDark: '#06043a',
  bgDarker: '#030225',
  white: '#f8f9ff',
  gray: '#a6accd',
  glowRed: '#ff6a63',
  glowBlue: '#4f7aff',
} as const;

export const site = {
  name: 'Boost Digital',
  tagline: 'Marketing y Diseño Digital',
  subtitle: 'MARKETING - BTL - AUDIOVISUALES',
  title: 'Tu agencia de marketing en Honduras',
  description:
    'Empresa de eventos, BTL, audiovisuales y Marketing digital. Creamos, producimos, administramos e implementamos sus requerimientos publicitarios',
  url: 'https://www.boostdigitalhn.com',
  email: 'info@boostdigitalhn.com',
  socials: [
    { name: 'Instagram', href: 'https://instagram.com/boostdigitalhn' },
    { name: 'Facebook', href: 'https://facebook.com/boostdigitalhn' },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/boost-digital-hn' },
  ],
} as const;

/** In-page sections, shared by the header, footer and scroll indicator. */
export const navLinks = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Digital', href: '#digital' },
  { label: 'Marcas', href: '#marcas' },
  { label: 'Proceso', href: '#proceso' },
] as const;

export const contactLink = { label: 'Contáctanos', href: '#contacto' } as const;

export const services = [
  {
    title: 'BTL',
    description:
      'Activaciones, volanteo, personal en licras, mochilas publicitarias, impulsadoras, degustadoras, edecanes, chefs, bartenders, perifoneos, ruletas digitales, DJs, animadores, batucadas, zancos, juegos, realidad virtual y carpas.',
    icon: 'btl',
  },
  {
    title: 'Marketing digital',
    description:
      'Marketing digital, diseño gráfico, edición de videos y animaciones, fotografía, creación de página web, y manejo de redes sociales con planeación de estrategias y pautas digitales.',
    icon: 'digital',
  },
  {
    title: 'Producción de Eventos',
    description:
      'Nos especializamos en la creación y producción de eventos que superan todas las expectativas. Desde eventos corporativos elegantes y lanzamientos de marca hasta eventos masivos. Convertimos tu visión en una realidad inolvidable.',
    icon: 'events',
  },
  {
    title: 'Audiovisuales',
    description:
      'Pantallas LED, televisores LED, luces, audio profesional, tarimas y estructuras truss para potenciar cada activación y evento.',
    icon: 'av',
  },
] as const;

export const stats = [
  { value: '7+', label: 'Años de experiencia' },
  { value: '3500', label: 'Activaciones ejecutadas anualmente' },
  { value: '120', label: 'Eventos Anuales' },
  { value: '80+', label: 'Marcas trabajando con Nosotros' },
] as const;

export const about = {
  subtitle: '¿Quiénes somos?',
  title: 'Tu agencia de marketing en Honduras',
  body:
    'Con más de 7 años en el mercado, nos especializamos en la elaboración de eventos corporativos y sociales, destacándonos por nuestro servicio y brindando una excelente calidad en cada uno de los eventos a los que asistimos.',
  mission:
    'Somos tu socio creativo y estratégico que te proporciona soluciones publicitarias innovadoras y efectivas que impulsan el crecimiento de tu marca, comprometidos con entender profundamente tus necesidades y objetivos',
  vision:
    'Ser reconocidos como líderes en la industria de la publicidad, siendo referentes en creatividad, innovación y resultados. Buscamos desafiar los límites de la creatividad y tecnología, ampliando nuestro abanico de ofertas para brindar un enfoque más completo, efectivo y masivo.',
  video:
    'https://www.boostdigitalhn.com/wp-content/uploads/2024/04/Boost-Logo-Animation.mp4',
} as const;

export const digitalExpertise = {
  subtitle: 'Expertos en medios digitales',
  title: 'Boost Marketing Digital',
  body:
    'Somos un equipo experto y creativo en marketing digital. Creamos, producimos, administramos e implementamos sus requerimientos publicitarios al desarrollar e impulsar la presencia de su marca o servicio en el mercado digital. Potenciamos el nivel de captación de su público meta, somos un equipo completo y competente que está preparado para elevar el posicionamiento de tu marca.',
  bullets: [
    'Marketing digital',
    'Diseño gráfico',
    'Edición de videos y animaciones',
    'Fotografía',
    'Creación de página web',
    'Manejo de redes sociales con planeación de estrategias y pautas digitales',
  ],
} as const;

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
    description: 'Producimos contenido, experiencias y campañas de alto impacto.',
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

export const brands = [
  { name: "Pepsi", logo: "/brands/pepsi.png" },
  { name: "Kia", logo: "/brands/kia.png" },
  { name: "Genesis", logo: "/brands/genesis.png" },
  { name: "Gatorade", logo: "/brands/gatorade.png" },
  { name: "Fruta Fresca", logo: "/brands/fruta-fresca.png" },
  { name: "Price Home", logo: "/brands/price-home.png" },
  { name: "Adrenaline", logo: "/brands/adrenaline.png" },
  { name: "Multiplaza", logo: "/brands/multiplaza.png" },
  { name: "Pasta Ina", logo: "/brands/pasta-ina.png" },
  { name: "Petit", logo: "/brands/petit.png" },
  { name: "Dilo", logo: "/brands/dilo.png" },
  { name: "Mendels", logo: "/brands/mendels.png" },
  { name: "Plaza Miraflores", logo: "/brands/plaza-miraflores.png" },
  { name: "Pollolandia", logo: "/brands/pollolandia.png" },
  { name: "Motomundo", logo: "/brands/motomundo.png" },
  { name: "Punto Farma", logo: "/brands/punto-farma.jpg" },
  { name: "Lipton", logo: "/brands/lipton.png" },
  { name: "California", logo: "/brands/california.png" },
  { name: "El Porteno", logo: "/brands/el-porteno.png" },
  { name: "Espreso Americano", logo: "/brands/espreso-americano.png" },
  { name: "Ficohsa", logo: "/brands/ficohsa.png" },
  { name: "PolloRey", logo: "/brands/pollorey.png" },
  { name: "Hugo", logo: "/brands/hugo.png" },
  { name: "Loto", logo: "/brands/loto.png" },
  { name: "LOWA", logo: "/brands/lowa.png" },
  { name: "Ron Flor de Cana", logo: "/brands/ron-flor-de-cana.png" },
  { name: "Riunite", logo: "/brands/riunite.png" },
  { name: "DeTodo", logo: "/brands/detodo.png" },
  { name: "Franks", logo: "/brands/franks.png" },
  { name: "Totto", logo: "/brands/totto.png" },
  { name: "Quetzalteca", logo: "/brands/quetzalteca.png" },
  { name: "Metromall", logo: "/brands/metromall.png" },
  { name: "Gold Medal", logo: "/brands/gold-medal.png" },
  { name: "Europea", logo: "/brands/europea.png" },
  { name: "Hollandia", logo: "/brands/hollandia.png" },
  { name: "Ron Abuelo", logo: "/brands/ron-abuelo.png" },
  { name: "Toledo", logo: "/brands/toledo.png" },
  { name: "Salutaris", logo: "/brands/salutaris.png" },
  { name: "PAR2", logo: "/brands/par2.png" },
  { name: "Honduras Compania Chocolate", logo: "/brands/honduras-compania-chocolate.png" },
  { name: "Del Comal", logo: "/brands/del-comal.png" },
  { name: "Arizona", logo: "/brands/arizona.png" },
  { name: "Yamaha", logo: "/brands/yamaha.png" },
  { name: "Wendys", logo: "/brands/wendys.png" },
  { name: "TVS", logo: "/brands/tvs.png" },
  { name: "Tecate", logo: "/brands/tecate.png" },
  { name: "Choco Wow", logo: "/brands/choco-wow.png" },
  { name: "City Mall", logo: "/brands/city-mall.png" },
  { name: "KMF", logo: "/brands/kmf.png" },
  { name: "La Colonia", logo: "/brands/la-colonia.png" },
  { name: "Bayer", logo: "/brands/bayer.png" },
  { name: "Lady Lee", logo: "/brands/lady-lee.png" },
  { name: "Paulaner", logo: "/brands/paulaner.png" },
  { name: "Remington", logo: "/brands/remington.png" },
  { name: "Tatascan", logo: "/brands/tatascan.png" },
  { name: "Victoria", logo: "/brands/victoria.png" },
  { name: "Bumblebee", logo: "/brands/bumblebee.png" },
  { name: "Argos", logo: "/brands/argos.png" },
  { name: "Amp Energy", logo: "/brands/amp-energy.png" },
  { name: "Adoc", logo: "/brands/adoc.png" },
  { name: "Aca Joe", logo: "/brands/aca-joe.jpg" },
  { name: "Absolut Vodka", logo: "/brands/absolut-vodka.png" },
  { name: "Vino y Licores", logo: "/brands/vino-y-licores.png" },
  { name: "Chivas", logo: "/brands/chivas.png" }
] as const;
