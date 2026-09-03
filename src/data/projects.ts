export type Loc = { es: string; en: string };
export type Credit = { role: Loc; name: string };

export type Project = {
  slug: string;
  title: string; // proper name — same in both languages
  year: string;
  category: Loc;
  concept: Loc; // one brief conceptual line
  description: Loc; // 30–60 words
  group: string; // media.json key
  credits: Credit[];
};

const PHOTO: Credit = {
  role: { es: "Fotografía", en: "Photography" },
  name: "LUMENDE",
};

export const projects: Project[] = [
  {
    slug: "reverie-nightmare",
    title: "Reverie Nightmare",
    year: "2026",
    category: {
      es: "Fotografía Editorial / Experimental",
      en: "Editorial / Experimental Photography",
    },
    concept: {
      es: "El lado oscuro del ensueño.",
      en: "The dark side of the reverie.",
    },
    description: {
      es: "Un descenso al espacio entre el sueño y la vigilia. Cuerpos difuminados por la larga exposición, rostros iluminados por colores que no existen a la luz del día. Cada cuadro es el fragmento de un sueño que se niega a mantener su forma.",
      en: "A descent into the space between sleep and waking. Bodies smeared by long exposure, faces lit by colour that does not exist in daylight. Each frame is a fragment of a dream refusing to hold its shape.",
    },
    group: "reverie-nightmare",
    credits: [PHOTO],
  },
  {
    slug: "reverie-dream",
    title: "Reverie Dream",
    year: "2026",
    category: {
      es: "Larga Exposición / Fotografía Experimental",
      en: "Long Exposure / Experimental Photography",
    },
    concept: {
      es: "Lo que el ojo retiene cuando la luz se ha ido.",
      en: "What the eye keeps after the light has gone.",
    },
    description: {
      es: "El movimiento registrado como memoria. Las figuras dejan estelas de sí mismas a lo largo del encuadre, pintadas por la luz y el tiempo más que capturadas por ellos. El sujeto y su fantasma comparten el mismo instante.",
      en: "Movement recorded as memory. Figures leave trails of themselves across the frame, painted by light and time rather than captured by it. The subject and its ghost share the same instant.",
    },
    group: "reverie-dream",
    credits: [PHOTO],
  },
  {
    slug: "reverie-oniric",
    title: "Reverie Oneiric",
    year: "2026",
    category: {
      es: "Conceptual / Fotografía Experimental",
      en: "Conceptual / Experimental Photography",
    },
    concept: {
      es: "La lógica del sueño hecha imagen.",
      en: "The logic of dreams turned into image.",
    },
    description: {
      es: "El tercer movimiento del ensueño: ni pesadilla ni descanso, sino ese territorio flotante donde las reglas se disuelven. La luz se curva, el cuerpo se desdobla y la escena obedece a una gramática que solo tiene sentido mientras dormimos.",
      en: "The third movement of the reverie — neither nightmare nor rest, but that floating territory where the rules dissolve. Light bends, the body doubles, and the scene obeys a grammar that only makes sense while we sleep.",
    },
    group: "reverie-oniric",
    credits: [PHOTO],
  },
  {
    slug: "witch",
    title: "She Is a Witch",
    year: "2026",
    category: {
      es: "Retrato Conceptual / Experimental",
      en: "Conceptual Portrait / Experimental",
    },
    concept: {
      es: "Ritual, humo y poder femenino.",
      en: "Ritual, smoke and feminine power.",
    },
    description: {
      es: "Un retrato de lo indomable. Entre humo, sombra y gesto, la figura invoca una fuerza antigua: no la bruja del cuento, sino la mujer que conoce su propio poder. La luz la busca y ella decide cuánto dejarse ver.",
      en: "A portrait of the untamed. Amid smoke, shadow and gesture, the figure summons something ancient — not the witch of fairy tales, but a woman who knows her own power. Light seeks her out, and she decides how much to reveal.",
    },
    group: "witch",
    credits: [PHOTO],
  },
  {
    slug: "fantasma",
    title: "Fantasma",
    year: "2026",
    category: {
      es: "Retrato Pictórico / Editorial",
      en: "Painterly Portrait / Editorial",
    },
    concept: {
      es: "Un retrato que respira como una pintura.",
      en: "A portrait that breathes like a painting.",
    },
    description: {
      es: "Luz cálida de vela, terracota y girasoles: un retrato construido como pintura clásica. La figura habita la penumbra como una presencia que apenas se detiene — mitad recuerdo, mitad aparición — y deja en el aire la sensación de algo que ya no está.",
      en: "Warm candlelight, terracotta and sunflowers — a portrait built like a classical painting. The figure inhabits the half-light as a presence barely pausing: half memory, half apparition, leaving behind the feeling of something no longer there.",
    },
    group: "fantasma",
    credits: [PHOTO],
  },
  {
    slug: "vilmora-studio",
    title: "Vilmora Studio",
    year: "2026",
    category: {
      es: "Editorial de Moda / Colaboración",
      en: "Fashion Editorial / Collaboration",
    },
    concept: {
      es: "Oro, cadenas y devoción.",
      en: "Gold, chains and devotion.",
    },
    description: {
      es: "Una colaboración con Vilmora Studio. Iconografía sacra reinterpretada: velos de brocado dorado, pecheras de oro y cadenas que atan a dos figuras entre lo santo y lo profano. Lágrimas doradas, terciopelo negro y luz de templo — un retablo vivo.",
      en: "A collaboration with Vilmora Studio. Sacred iconography reimagined: gold-brocade veils, gilded breastplates and chains binding two figures between the holy and the profane. Golden tears, black velvet and temple light — a living altarpiece.",
    },
    group: "vilmora",
    credits: [
      PHOTO,
      { role: { es: "Vestuario", en: "Wardrobe" }, name: "Vilmora Studio" },
    ],
  },
  {
    slug: "vestida-de-luz",
    title: "Vestida de Luz",
    year: "2026",
    category: {
      es: "Desnudo Artístico / Light Painting",
      en: "Fine-Art Nude / Light Painting",
    },
    concept: {
      es: "La luz como única prenda.",
      en: "Light as the only garment.",
    },
    description: {
      es: "Trazos de luz dibujados a mano envuelven la piel como una prenda que solo existe durante la exposición. Un estudio íntimo y escultórico del cuerpo, donde la desnudez se vela y se revela con luz: no lo que se muestra, sino lo que la luz decide tocar.",
      en: "Hand-drawn trails of light wrap the skin like a garment that exists only for the length of the exposure. An intimate, sculptural study of the body, where nakedness is veiled and revealed by light — not what is shown, but what the light chooses to touch.",
    },
    group: "vestida",
    credits: [PHOTO],
  },
  {
    slug: "blue",
    title: "Blue",
    year: "2026",
    category: {
      es: "Boudoir Editorial / Fotografía Experimental",
      en: "Editorial Boudoir / Experimental Photography",
    },
    concept: {
      es: "El cuerpo encuentra su propia arquitectura.",
      en: "The body finds its own architecture.",
    },
    description: {
      es: "Un estudio en azul frío: piel, cristal y reflejo dentro de la geometría del espacio. La figura se sostiene entre superficies duras y luz fría, y el pudor se vuelve composición. Un ritual íntimo escrito en un solo color.",
      en: "A study in cold blue — skin, glass and reflection inside the geometry of the room. The figure holds itself between hard surfaces and cool light, and modesty becomes composition. An intimate ritual written in a single colour.",
    },
    group: "blue",
    credits: [PHOTO],
  },
  {
    slug: "yoga",
    title: "Yoga and Light",
    year: "2026",
    category: {
      es: "Movimiento / Larga Exposición",
      en: "Movement / Long Exposure",
    },
    concept: {
      es: "El cuerpo dibujado con luz.",
      en: "The body drawn in light.",
    },
    description: {
      es: "La respiración y la postura convertidas en trazo. Cada asana deja su firma luminosa en el aire: una meditación sobre el equilibrio entre quietud y movimiento, escrita con luz sobre el cuerpo.",
      en: "Breath and posture turned into line. Each asana leaves its luminous signature in the air — a meditation on the balance between stillness and motion, written in light across the body.",
    },
    group: "yoga",
    credits: [PHOTO],
  },
];

export const projectMap = Object.fromEntries(projects.map((p) => [p.slug, p]));

export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
