import type { Loc } from "./site";

export type Landing = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  kicker: Loc; // small label above the title
  title: Loc; // h1
  lead: Loc; // intro paragraph, keyword-rich but readable
  heroGroup: string; // media.json key for the opening image
  gallery: string[]; // one image is pulled from each of these groups
  blocks: { h: Loc; p: Loc }[]; // proceso / entregables / ubicación / cómo contratar
};

const QRO = "Querétaro, México";

export const landings: Landing[] = [
  {
    slug: "fotografo-editorial-queretaro",
    metaTitle: "Fotógrafo editorial en Querétaro",
    metaDescription:
      "LUMENDE es un estudio de fotografía editorial en Querétaro: editoriales de moda, conceptos visuales y dirección de arte para artistas y marcas. Cotiza una sesión.",
    kicker: { es: "Servicio · Querétaro", en: "Service · Querétaro" },
    title: {
      es: "Fotografía editorial en Querétaro",
      en: "Editorial photography in Querétaro",
    },
    lead: {
      es: "Editoriales de moda y proyectos conceptuales con dirección de arte, iluminación cinematográfica y una estética cuidada de principio a fin. Trabajo con diseñadores, marcas y talento creativo en Querétaro y todo México.",
      en: "Fashion editorials and conceptual projects with art direction, cinematic lighting and a considered aesthetic from start to finish. I work with designers, brands and creative talent in Querétaro and across Mexico.",
    },
    heroGroup: "reverie-nightmare",
    gallery: ["vilmora", "fantasma", "vestida"],
    blocks: [
      {
        h: { es: "Proceso", en: "Process" },
        p: {
          es: "Empezamos por el concepto: referencias, vestuario, locación y paleta. El día de la sesión dirijo pose, luz y ritmo para construir una narrativa, no solo fotos sueltas.",
          en: "We start from the concept: references, wardrobe, location and palette. On the shoot day I direct pose, light and pacing to build a narrative, not just isolated frames.",
        },
      },
      {
        h: { es: "Entregables", en: "Deliverables" },
        p: {
          es: "Galería privada con una selección editada a color, en alta resolución y en formato listo para impresión o redes. Tiempos y número de imágenes según el paquete.",
          en: "A private gallery with a color-graded edit in high resolution, ready for print or social. Turnaround and image count depend on the package.",
        },
      },
      {
        h: { es: "Ubicación", en: "Location" },
        p: {
          es: `Con base en ${QRO}. Sesiones en estudio, en locación o en exteriores dentro del estado; disponible para viajar a otras ciudades.`,
          en: `Based in ${QRO}. Sessions in studio, on location or outdoors within the state; available to travel to other cities.`,
        },
      },
    ],
  },
  {
    slug: "light-painting-queretaro",
    metaTitle: "Light painting en Querétaro",
    metaDescription:
      "Fotografía de light painting y larga exposición en Querétaro: retratos donde la luz se dibuja sobre el cuerpo. Sesiones creativas con LUMENDE.",
    kicker: { es: "Servicio · Querétaro", en: "Service · Querétaro" },
    title: {
      es: "Light painting en Querétaro",
      en: "Light painting in Querétaro",
    },
    lead: {
      es: "Retratos hechos con larga exposición, donde la luz se dibuja a mano alrededor del cuerpo en una sola toma. Una técnica experimental para portadas, sencillos musicales y piezas de autor.",
      en: "Portraits made with long exposure, where light is drawn by hand around the body in a single frame. An experimental technique for covers, music singles and author pieces.",
    },
    heroGroup: "experiments",
    gallery: ["yoga", "blue", "vestida"],
    blocks: [
      {
        h: { es: "Proceso", en: "Process" },
        p: {
          es: "Trabajamos en un espacio oscuro con exposiciones largas. Cada imagen es una coreografía de luz y movimiento: irrepetible, construida en cámara, sin montajes.",
          en: "We work in a dark space with long exposures. Each image is a choreography of light and movement — unrepeatable, built in camera, with no compositing.",
        },
      },
      {
        h: { es: "Ideal para", en: "Ideal for" },
        p: {
          es: "Músicos y bandas, proyectos personales, campañas conceptuales y quien busque un retrato que no se parezca a ningún otro.",
          en: "Musicians and bands, personal projects, conceptual campaigns and anyone after a portrait that looks like no other.",
        },
      },
      {
        h: { es: "Ubicación", en: "Location" },
        p: {
          es: `Sesiones en ${QRO}, en estudio o en locación con condiciones de baja luz.`,
          en: `Sessions in ${QRO}, in studio or on location with low-light conditions.`,
        },
      },
    ],
  },
  {
    slug: "retratos-creativos-queretaro",
    metaTitle: "Retratos creativos en Querétaro",
    metaDescription:
      "Retrato creativo y conceptual en Querétaro: dirección, luz y styling para un retrato con identidad. Reserva tu sesión con LUMENDE.",
    kicker: { es: "Servicio · Querétaro", en: "Service · Querétaro" },
    title: {
      es: "Retratos creativos en Querétaro",
      en: "Creative portraits in Querétaro",
    },
    lead: {
      es: "Retratos con concepto: no la foto de siempre, sino una imagen dirigida donde la luz, el color y el gesto cuentan algo de quien está frente a la cámara.",
      en: "Portraits with a concept: not the usual headshot, but a directed image where light, color and gesture say something about the person in front of the camera.",
    },
    heroGroup: "witch",
    gallery: ["fantasma", "reverie-dream", "vilmora"],
    blocks: [
      {
        h: { es: "Proceso", en: "Process" },
        p: {
          es: "Definimos una idea juntos y la llevamos a vestuario, luz y locación. Te dirijo durante toda la sesión para que el resultado se sienta tuyo y, a la vez, cinematográfico.",
          en: "We define an idea together and take it into wardrobe, light and location. I direct you throughout so the result feels like you — and cinematic at once.",
        },
      },
      {
        h: { es: "Para quién", en: "For whom" },
        p: {
          es: "Artistas, creativos, actrices y actores, y cualquier persona que quiera un retrato editorial con carácter para portafolio o marca personal.",
          en: "Artists, creatives, actors, and anyone who wants an editorial portrait with character for a portfolio or personal brand.",
        },
      },
      {
        h: { es: "Ubicación", en: "Location" },
        p: {
          es: `Con base en ${QRO}. Estudio, locación o exteriores.`,
          en: `Based in ${QRO}. Studio, location or outdoors.`,
        },
      },
    ],
  },
  {
    slug: "fotografia-para-artistas-y-musicos",
    metaTitle: "Fotografía para artistas y músicos en Querétaro",
    metaDescription:
      "Fotografía para músicos, bandas y artistas en Querétaro: portadas, prensa y contenido con dirección de arte. Cotiza con LUMENDE.",
    kicker: { es: "Servicio · Querétaro", en: "Service · Querétaro" },
    title: {
      es: "Fotografía para artistas y músicos",
      en: "Photography for artists and musicians",
    },
    lead: {
      es: "Imagen para músicos, bandas y proyectos artísticos: portadas de sencillo y álbum, fotos de prensa y contenido con una dirección visual coherente con tu sonido.",
      en: "Imagery for musicians, bands and artistic projects: single and album covers, press photos and content with a visual direction that matches your sound.",
    },
    heroGroup: "commissions",
    gallery: ["witch", "blue", "vilmora"],
    blocks: [
      {
        h: { es: "Qué incluye", en: "What's included" },
        p: {
          es: "Desde una sesión de retrato hasta un concepto completo con vestuario, locación y varios looks para portada, prensa y redes.",
          en: "From a single portrait session to a full concept with wardrobe, location and several looks for cover, press and social.",
        },
      },
      {
        h: { es: "Formatos", en: "Formats" },
        p: {
          es: "Entrega pensada para plataformas de streaming, prensa y redes, en las proporciones y resoluciones que cada una necesita.",
          en: "Delivery built for streaming platforms, press and social, in the ratios and resolutions each one needs.",
        },
      },
      {
        h: { es: "Ubicación", en: "Location" },
        p: {
          es: `Con base en ${QRO}; disponible para giras y viajes.`,
          en: `Based in ${QRO}; available for tours and travel.`,
        },
      },
    ],
  },
];

export const landingMap = Object.fromEntries(landings.map((l) => [l.slug, l]));
