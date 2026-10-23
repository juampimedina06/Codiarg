export interface ProjectGalleryItem {
  url: string;
  title: string;
  caption: string;
}

export interface ProjectTech {
  name: string;
  role: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  client: string;
  subtitle: string;
  category: string;
  year: string;
  statusBadge: string;
  shortDescription: string;
  challenge: string;
  solution: string;
  keyFeatures: string[];
  techStack: ProjectTech[];
  metrics: ProjectMetric[];
  coverImage: string;
  gallery: ProjectGalleryItem[];
  accentColor: string;
  consultType: string;
  liveUrl?: string;
}

export const REAL_PROJECTS: Project[] = [
  {
    id: 'el-pequeno-hong-kong',
    number: '01',
    title: 'El Pequeño Hong Kong',
    client: 'El Pequeño Hong Kong',
    subtitle: 'Tienda Online & Catálogo de Ropa con Pedidos por WhatsApp',
    category: 'E-COMMERCE & RETAIL',
    year: '2026',
    statusBadge: 'PRODUCCIÓN • EN VIVO',
    shortDescription:
      'Tienda de indumentaria urbana ultra rápida donde tus clientes eligen prendas, talles y envían su pedido armado directo a tu WhatsApp en 1 clic, sin pagar comisiones por venta ni costos mensuales de plataforma.',
    challenge:
      'Las plataformas tradicionales cobran comisiones mensuales caras y tardan una eternidad en cargar fotos desde el celular, haciendo que los compradores se cansen y abandonen la compra. Hacía falta una tienda con diseño de marca internacional, carga instantánea en cualquier teléfono y costo cero de mantenimiento.',
    solution:
      'Creamos una tienda online a medida inspirada en marcas líderes de moda. El sistema optimiza automáticamente las fotos para que abran al instante en cualquier conexión, cuenta con buscador inteligente de prendas y un panel fácil para que el dueño cargue productos, actualice precios y reciba las ventas armadas listas para cobrar por WhatsApp.',
    keyFeatures: [
      'Tus clientes compran directo por WhatsApp con el pedido y total ya calculado',
      'Carga instantánea de fotos en celulares, sin demoras ni pérdida de calidad',
      'Buscador inteligente para encontrar prendas, modelos y talles en segundos',
      'Panel simple para que el dueño suba nuevos productos y cambie precios al instante',
      'Control de stock automático para evitar vender prendas sin disponibilidad',
    ],
    techStack: [
      { name: 'Next.js', role: 'Tienda online de máxima velocidad' },
      { name: 'React', role: 'Experiencia interactiva en celulares' },
      { name: 'TypeScript', role: 'Estructura sólida y sin fallas' },
      { name: 'Base de Datos Cloud', role: 'Inventario y stock en tiempo real' },
      { name: 'Tailwind CSS', role: 'Diseño moderno estilo marca urbana' },
      { name: 'Servidor de Fotos', role: 'Entrega rápida de imágenes en alta definición' },
    ],
    metrics: [
      { value: '0% Comisión', label: 'Sin pagos mensuales por cada venta' },
      { value: '< 1 Segundo', label: 'Velocidad de carga en celulares' },
      { value: '1 Clic', label: 'Para enviar el pedido listo a WhatsApp' },
    ],
    coverImage: '/IMAGENES-PROYECTO-HONGKONG/pagina-peque.png',
    gallery: [
      {
        url: '/IMAGENES-PROYECTO-HONGKONG/pagina-peque.png',
        title: 'Vitrina Principal y Catálogo',
        caption: 'Diseño limpio y moderno que resalta las prendas y hace fácil comprar desde el celular.',
      },
      {
        url: '/IMAGENES-PROYECTO-HONGKONG/pagina-peque-2.png',
        title: 'Ficha de Producto en Detalle',
        caption: 'Selección rápida de talles, fotos ampliadas y verificación de stock en el acto.',
      },
      {
        url: '/IMAGENES-PROYECTO-HONGKONG/pagina-peque-3.png',
        title: 'Detalle de Colección & Prendas',
        caption: 'Fotografía en alta definición para transmitir calidad y estilo de marca.',
      },
      {
        url: '/IMAGENES-PROYECTO-HONGKONG/pagina-peque-4.png',
        title: 'Panel de Control para el Dueño',
        caption: 'Control total de existencias, productos destacados y estado del catálogo.',
      },
      {
        url: '/IMAGENES-PROYECTO-HONGKONG/pagina-peque-5.png',
        title: 'Historial y Movimientos de Stock',
        caption: 'Registro claro de cada prenda que entra, se vende o se ajusta en el local.',
      },
      {
        url: '/IMAGENES-PROYECTO-HONGKONG/pagina-peque6.png',
        title: 'Carga Fácil de Nuevos Productos',
        caption: 'Formulario simple para subir fotos y nuevos lanzamientos en minutos.',
      },
      {
        url: '/IMAGENES-PROYECTO-HONGKONG/pagina-peque7.png',
        title: 'Buscador y Filtros por Categoría',
        caption: 'Tus clientes encuentran la prenda exacta que buscan sin perder tiempo.',
      },
      {
        url: '/IMAGENES-PROYECTO-HONGKONG/pagina-peque8.png',
        title: 'Edición Rápida de Inventario',
        caption: 'Actualización de precios y cantidades en un solo clic.',
      },
      {
        url: '/IMAGENES-PROYECTO-HONGKONG/pagina-peque9.png',
        title: 'Pedido Directo a WhatsApp',
        caption: 'El cliente envía su pedido armado con total y talles listo para coordinar el cobro.',
      },
    ],
    accentColor: '#58CC02',
    consultType: 'Web App / SaaS',
  },
  {
    id: 'tomas-fotografia',
    number: '02',
    title: 'Tomás Fotografía & Eventos',
    client: 'Tomás Fotografía',
    subtitle: 'Portafolio Web & Entrega Inmediata de Fotos para Eventos',
    category: 'MEDIA & EVENTOS',
    year: '2026',
    statusBadge: 'PRODUCCIÓN • EN VIVO',
    shortDescription:
      'Plataforma web para que los asistentes a recitales y fiestas encuentren sus fotos en segundos y las descarguen en máxima resolución, ahorrándole al fotógrafo horas de responder mensajes.',
    challenge:
      'Después de cada recital o evento masivo, cientos de personas le escriben al fotógrafo pidiéndole fotos. Compartir carpetas de Google Drive genera desorden, links caídos y una imagen informal que desgasta el tiempo del profesional.',
    solution:
      'Desarrollamos una web moderna y elegante donde cada evento tiene su propia portada y acceso directo. El público entra desde su celular, busca la fecha de su fiesta y entra al álbum en un clic. Además, el fotógrafo cuenta con un panel privado para subir fechas nuevas en segundos y medir cuántas visitas tiene cada cobertura.',
    keyFeatures: [
      'Acceso en 1 clic a las fotos de cada recital en máxima calidad',
      'Buscador rápido por fecha, artista o boliche para encontrar tu show al instante',
      'Panel simple para que el fotógrafo agregue eventos nuevos sin depender de nadie',
      'Diseño profesional que destaca la marca y multiplica las consultas de contratación',
      'Contador de visitas para saber qué eventos tuvieron mayor repercusión',
    ],
    techStack: [
      { name: 'Next.js', role: 'Web rápida para miles de visitas simultáneas' },
      { name: 'React', role: 'Experiencia visual y fluida en celulares' },
      { name: 'TypeScript', role: 'Estructura sólida y confiable' },
      { name: 'Nube de Almacenamiento', role: 'Entrega de fotos en alta definición' },
      { name: 'Panel Privado', role: 'Gestión simple de eventos y fechas' },
      { name: 'Diseño Editorial', role: 'Estilo visual premium para destacar las fotos' },
    ],
    metrics: [
      { value: '1 Clic', label: 'Para que el público encuentre sus fotos' },
      { value: '0 Horas', label: 'Perdidas pasando links manualmente' },
      { value: '100% Calidad', label: 'Descarga de fotos en alta definición' },
    ],
    coverImage: '/IMAGENES-PROYECTO-TOMI/pagina-tomi.png',
    gallery: [
      {
        url: '/IMAGENES-PROYECTO-TOMI/pagina-tomi.png',
        title: 'Portada y Catálogo de Eventos',
        caption: 'Mosaico dinámico para que la gente encuentre su fecha de recital en segundos.',
      },
      {
        url: '/IMAGENES-PROYECTO-TOMI/pagina-tomi2.png',
        title: 'Panel de Gestión para el Fotógrafo',
        caption: 'Carga de fechas, visibilidad pública y links externos desde un solo lugar.',
      },
      {
        url: '/IMAGENES-PROYECTO-TOMI/pagina-tomi3.png',
        title: 'Carga de Flyers con Previsualización',
        caption: 'Subida arrastrando archivos con vista previa antes de publicar.',
      },
      {
        url: '/IMAGENES-PROYECTO-TOMI/pagina-tomi4.png',
        title: 'Canales de Contacto Directo',
        caption: 'Botones claros a WhatsApp y redes para cotizar nuevas coberturas.',
      },
    ],
    accentColor: '#0096F6',
    consultType: 'Web App / SaaS',
  },
  {
    id: 'transfer-black',
    number: '03',
    title: 'Transfer Black',
    client: 'Transfer Black Corporativo',
    subtitle: 'Ecosistema Digital de Traslados Ejecutivos & Choferes Privados',
    category: 'MOVILIDAD URBANA & LOGÍSTICA',
    year: '2026',
    statusBadge: 'PRODUCCIÓN • EN VIVO',
    shortDescription:
      'Sistema integral para empresas de transporte privado: app para pasajeros con pedido y reserva de autos, app para choferes con mapa en vivo y consola web para coordinar toda la flota en tiempo real.',
    challenge:
      'Coordinar traslados ejecutivos por llamadas o mensajes de WhatsApp genera demoras, dudas con las tarifas y falta de control sobre la ubicación de los autos, transmitiendo una imagen poco confiable a clientes corporativos exigentes.',
    solution:
      'Creamos una solución digital integral de nivel internacional: el pasajero pide o agenda su auto conociendo el precio de antemano; el conductor recibe el viaje en su app con la ruta óptima; y la empresa monitorea todos los vehículos en un mapa en vivo desde una pantalla central, garantizando puntualidad y seguridad.',
    keyFeatures: [
      'App para pasajeros con pedido de autos, reserva anticipada y tarifa transparente',
      'App para choferes con navegación en vivo y recepción inmediata de viajes',
      'Mapa en tiempo real para ver dónde está cada vehículo de la flota las 24 horas',
      'Panel administrativo para despachar viajes, gestionar choferes y auditar ingresos',
      'Conexión permanente pensada para operar en la calle con total seguridad',
    ],
    techStack: [
      { name: 'Aplicaciones Móviles', role: 'Apps nativas para Android y iPhone' },
      { name: 'Servidor Central', role: 'Coordinación instantánea de viajes y tarifas' },
      { name: 'Conexión en Vivo', role: 'Transmisión continua de ubicación GPS en mapa' },
      { name: 'Base de Datos Corporativa', role: 'Historial de viajes, clientes y facturación' },
      { name: 'Consola Web de Despacho', role: 'Monitoreo de flota para operadores' },
      { name: 'Memoria de Alta Velocidad', role: 'Respuesta instantánea en horarios pico' },
    ],
    metrics: [
      { value: 'En Vivo', label: 'Ubicación GPS de cada auto en el mapa' },
      { value: '3 Aplicaciones', label: 'Pasajero, chofer y consola web integrados' },
      { value: '24/7', label: 'Operación continua para viajes corporativos' },
    ],
    coverImage: '/IMAGENES-PROYECTO-TRANSFERBLACK/logo_transferblack.png',
    gallery: [
      {
        url: '/IMAGENES-PROYECTO-TRANSFERBLACK/logo_transferblack.png',
        title: 'Emblema e Identidad Corporativa',
        caption: 'Diseño sobrio y elegante pensado para clientes ejecutivos y empresas.',
      },
      {
        url: '/IMAGENES-PROYECTO-TRANSFERBLACK/logo_transferblack_sinfodo.png',
        title: 'Presencia de Marca en la Flota',
        caption: 'Imagen uniforme y profesional en las aplicaciones de pasajeros y conductores.',
      },
    ],
    accentColor: '#0096F6',
    consultType: 'App Mobile',
  },
  {
    id: 'gym-os',
    number: '04',
    title: 'GYM OS',
    client: 'GYM OS • Control de Acceso',
    subtitle: 'Terminal Inteligente para Molinetes 24/7 & Control de Socios',
    category: 'SAAS & AUTOMATIZACIÓN DE ACCESOS',
    year: '2026',
    statusBadge: 'PRODUCCIÓN • EN VIVO',
    shortDescription:
      'Automatizá la entrada de tu gimnasio las 24 horas: los socios ingresan solo con su DNI, la pantalla les avisa en el acto si su cuota está al día y el molinete se destraba solo, sin filas ni necesidad de recepcionista.',
    challenge:
      'En horas pico, la recepción colapsa: el personal pierde tiempo cobrando manualmente y entran personas con cuotas vencidas sin que nadie lo note. Hacía falta un sistema automático que cuide los ingresos del gimnasio y abra la puerta en menos de 1 segundo.',
    solution:
      'Creamos una pantalla interactiva instalada junto al molinete. El socio escribe su DNI o apoya su tarjeta: en un segundo la pantalla se ilumina en verde y le abre el paso si está al día, o le muestra un aviso en rojo indicando que debe regularizar su pago. Además, los dueños y profesores tienen un panel fácil para dar de alta socios, registrar cobros y ver quién está entrenando en tiempo real.',
    keyFeatures: [
      'Ingreso en 1 segundo: el socio pone su DNI y el molinete se abre automáticamente',
      'Cobranza asegurada: bloqueo inmediato a personas con cuotas vencidas o impagas',
      'Gimnasio abierto 24/7: funciona de día y de noche sin requerir personal en la puerta',
      'Pantalla gigante y clara: avisos visuales y sonoros que el socio entiende al instante',
      'Panel de control simple: administrá socios, profesores y vencimientos sin planillas difíciles',
    ],
    techStack: [
      { name: 'Pantalla Kiosco', role: 'Interfaz visual interactiva para recepción' },
      { name: 'Motor de Control', role: 'Validación de cuotas y estados en 1 segundo' },
      { name: 'Base de Datos Segura', role: 'Registro de socios, cobros y vencimientos' },
      { name: 'Servidor Central', role: 'Historial de asistencias e ingresos diarios' },
      { name: 'Diseño Dark Mode', role: 'Colores de alto contraste legibles a distancia' },
      { name: 'Conexión a Molinete', role: 'Apertura automática de puertas y barreras' },
    ],
    metrics: [
      { value: '< 1 Segundo', label: 'Tiempo que tarda en validar el DNI' },
      { value: '24/7', label: 'Acceso automático sin recepcionista' },
      { value: '100%', label: 'Control: nadie entra con cuota vencida' },
    ],
    coverImage: '/IMAGENES-PROYECTO-GESTION-GYM/pagina-gym.png',
    gallery: [
      {
        url: '/IMAGENES-PROYECTO-GESTION-GYM/pagina-gym.png',
        title: 'Terminal de Entrada al Gimnasio',
        caption: 'Pantalla de recepción que invita al socio a tipear su DNI para entrar.',
      },
      {
        url: '/IMAGENES-PROYECTO-GESTION-GYM/pagina-gym2.png',
        title: 'Aviso de Cuota Pendiente de Pago',
        caption: 'Alerta automática en rojo que avisa que debe regularizar el pago antes de pasar.',
      },
      {
        url: '/IMAGENES-PROYECTO-GESTION-GYM/pagina-gym3.png',
        title: 'Panel Administrativo para Dueños',
        caption: 'Acceso privado para gestionar cuotas, altas de socios y turnos de entrenadores.',
      },
    ],
    accentColor: '#CCFF00',
    consultType: 'Web App / SaaS',
  },
];
