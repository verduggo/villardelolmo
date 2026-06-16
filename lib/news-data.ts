export interface NewsArticle {
  id: string
  categoria_id: string | null
  fecha_publicacion: string
  titulo: string
  extracto: string
  slug: string
  imagen_principal: string
  contenido: string
  estado: "publicada"
  destacada: boolean
  autor_id: string | null
  meta_titulo: string | null
  meta_descripcion: string | null
  galeria: string[] | null
  created_at: string
  updated_at: string
  // Campos adicionales para la página de detalle
  categoria: string
  cuerpo: string[]
  cita?: string
}

export const allNews: NewsArticle[] = [
  {
    id: "1",
    categoria_id: null,
    fecha_publicacion: "2026-04-28",
    titulo: "El club invierte 18.000€ en la reforma de sus instalaciones",
    extracto:
      "La directiva ha aprobado una inversión estimada de 18.000 euros para reformar vestuarios, el campo y el bar social, mejorando las instalaciones para socios, jugadores y aficionados.",
    slug: "obras-reforma-instalaciones",
    imagen_principal: "/images/news-obras.png",
    contenido: "",
    estado: "publicada",
    destacada: true,
    autor_id: null,
    meta_titulo: null,
    meta_descripcion: null,
    galeria: null,
    created_at: "",
    updated_at: "",
    categoria: "Instalaciones",
    cuerpo: [
      "El C.D. Unión Deportiva Villar del Olmo ha dado un paso firme hacia la modernización de sus instalaciones. La junta directiva ha aprobado un plan de reformas con una inversión estimada de 18.000 euros que se ejecutará a lo largo de los próximos meses, con el objetivo de ofrecer un entorno más cómodo, seguro y acogedor a jugadores, socios y aficionados.",
      "Las obras se centrarán en tres áreas principales. En primer lugar, la renovación integral de los vestuarios, que contarán con nuevas duchas, taquillas y un sistema de ventilación mejorado. En segundo lugar, el acondicionamiento del terreno de juego y su perímetro, incluyendo el repintado de líneas y la reparación de las zonas más deterioradas por el uso. Por último, una puesta a punto del bar social, un espacio que se ha convertido en punto de encuentro de toda la familia verdiblanca.",
      "Desde el club se ha querido subrayar que esta inversión es posible gracias al esfuerzo conjunto de socios, patrocinadores y colaboradores locales, cuyo apoyo resulta imprescindible para seguir creciendo. La directiva ha agradecido especialmente la implicación de los voluntarios que, temporada tras temporada, dedican su tiempo al mantenimiento de las instalaciones.",
      "Con estas mejoras, el club da respuesta a una demanda histórica de la afición y refuerza su compromiso con el fútbol base de la comarca. Las obras se realizarán procurando minimizar las molestias para que la actividad deportiva pueda continuar con la mayor normalidad posible.",
    ],
    cita: "Estas instalaciones son la casa de todos. Invertir en ellas es invertir en el futuro de nuestra cantera y de nuestro pueblo.",
  },
  {
    id: "2",
    categoria_id: null,
    fecha_publicacion: "2026-04-25",
    titulo: "Abierto el plazo del Campamento de Verano del club",
    extracto:
      "Un verano más, el club organiza su campamento para los más jóvenes con entrenamientos, juegos y actividades. Ya están abiertas las inscripciones para todas las categorías.",
    slug: "campamento-de-verano",
    imagen_principal: "/images/news-campamento.png",
    contenido: "",
    estado: "publicada",
    destacada: false,
    autor_id: null,
    meta_titulo: null,
    meta_descripcion: null,
    galeria: null,
    created_at: "",
    updated_at: "",
    categoria: "Cantera",
    cuerpo: [
      "Como cada año, con la llegada del buen tiempo el club abre las inscripciones para su tradicional Campamento de Verano, una de las citas más esperadas por las familias de Villar del Olmo y los municipios vecinos. La actividad está dirigida a niños y niñas de todas las edades, sean o no socios del club.",
      "Durante varias semanas, los participantes disfrutarán de entrenamientos adaptados a cada categoría, juegos, dinámicas en equipo y actividades pensadas para combinar el aprendizaje del fútbol con la diversión y los valores del deporte. El programa está diseñado por el cuerpo técnico del club, que trabajará en grupos reducidos para garantizar una atención cercana y personalizada.",
      "Más allá de lo deportivo, el campamento persigue un objetivo claro: que los más jóvenes hagan amigos, aprendan a trabajar en equipo y vivan el verano de una forma sana y activa. El compañerismo, el respeto y el esfuerzo serán, un año más, los protagonistas.",
      "Las plazas son limitadas y se asignarán por orden de inscripción. Las familias interesadas pueden formalizar la matrícula a través de la secretaría del club o contactando directamente con la organización. Desde la directiva animan a no dejar la inscripción para el último momento.",
    ],
    cita: "El campamento es donde muchos descubren su pasión por el fútbol. Para nosotros es una forma de sembrar el futuro del club.",
  },
  {
    id: "3",
    categoria_id: null,
    fecha_publicacion: "2026-04-20",
    titulo: "Victoria contundente en el derbi comarcal",
    extracto:
      "El equipo se impuso por 3-0 en un partido que dominó de principio a fin ante la afición local.",
    slug: "victoria-derbi-comarcal",
    imagen_principal: "/images/news-derbi.png",
    contenido: "",
    estado: "publicada",
    destacada: false,
    autor_id: null,
    meta_titulo: null,
    meta_descripcion: null,
    galeria: null,
    created_at: "",
    updated_at: "",
    categoria: "Primer equipo",
    cuerpo: [
      "El primer equipo firmó una de las mejores actuaciones de la temporada al imponerse por 3-0 en el esperado derbi comarcal, disputado ante una grada entregada que respondió a la llamada del club. Desde el pitido inicial, el conjunto verdiblanco mostró intensidad, orden y ambición.",
      "El primer gol llegó tras una jugada coral que terminó en el remate a placer de uno de los jóvenes de la cantera. Antes del descanso, una gran acción individual ampliaba la ventaja y tranquilizaba a los aficionados. En la segunda mitad, con el rival volcado, el equipo cerró el marcador a la contra para sentenciar un derbi que quedará en la memoria.",
      "El técnico destacó tras el encuentro el trabajo del grupo y el ambiente vivido en las gradas. La afición, fiel a su cita, empujó durante los noventa minutos y celebró cada acción como si fuera la última.",
      "Con esta victoria, el equipo refuerza sus aspiraciones en la clasificación y llega en el mejor momento de forma a la recta final de la temporada. El próximo compromiso será a domicilio, donde el conjunto buscará dar continuidad a esta gran racha de resultados.",
    ],
    cita: "Días como este recuerdan por qué amamos este club. El equipo lo dio todo y la afición fue un jugador más.",
  },
  {
    id: "4",
    categoria_id: null,
    fecha_publicacion: "2026-04-18",
    titulo: "Jornada de puertas abiertas para todas las familias",
    extracto:
      "Este sábado abrimos nuestras puertas a todas las familias que quieran conocer el proyecto deportivo del club.",
    slug: "jornada-puertas-abiertas",
    imagen_principal: "/images/news-puertas.png",
    contenido: "",
    estado: "publicada",
    destacada: false,
    autor_id: null,
    meta_titulo: null,
    meta_descripcion: null,
    galeria: null,
    created_at: "",
    updated_at: "",
    categoria: "Club",
    cuerpo: [
      "El club celebrará este sábado una jornada de puertas abiertas dirigida a todas las familias de Villar del Olmo y la comarca que quieran conocer de cerca su proyecto deportivo. La cita, de carácter gratuito, está pensada para acercar el club a quienes todavía no lo conocen.",
      "Durante la mañana, los más pequeños podrán participar en actividades y minipartidos sobre el césped, mientras los técnicos del club explicarán a los padres y madres el funcionamiento de las distintas categorías, la metodología de entrenamiento y los valores que guían el trabajo diario de la cantera.",
      "La jornada será también una oportunidad para conocer las instalaciones, recientemente en proceso de mejora, y para resolver cualquier duda sobre inscripciones, cuotas y horarios de cara a la próxima temporada. El bar social permanecerá abierto para que las familias puedan disfrutar de un ambiente distendido.",
      "Desde la directiva invitan a todos los vecinos a acercarse y vivir en primera persona lo que significa formar parte de la familia verdiblanca. No es necesario inscribirse previamente: basta con acudir y disfrutar de una mañana de fútbol y convivencia.",
    ],
    cita: "Queremos que cualquier niño o niña que sueñe con jugar al fútbol encuentre aquí su sitio. Las puertas están abiertas para todos.",
  },
]
