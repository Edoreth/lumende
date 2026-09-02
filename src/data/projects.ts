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
    slug: "nightmare",
    title: "Nightmare",
    year: "2026",
    category: {
      es: "Fotografía Editorial / Experimental",
      en: "Editorial / Experimental Photography",
    },
    concept: {
      es: "Una exploración visual del sueño, la distorsión y la luz artificial.",
      en: "A visual exploration of dreams, distortion and artificial light.",
    },
    description: {
      es: "Un descenso al espacio entre el sueño y la vigilia. Cuerpos difuminados por la larga exposición, rostros iluminados por colores que no existen a la luz del día. Cada cuadro es el fragmento de un sueño que se niega a mantener su forma.",
      en: "A descent into the space between sleep and waking. Bodies smeared by long exposure, faces lit by colour that does not exist in daylight. Each frame is a fragment of a dream refusing to hold its shape.",
    },
    group: "nightmare",
    credits: [PHOTO],
  },
  {
    slug: "fera",
    title: "Fairy's and Aliens",
    year: "2026",
    category: {
      es: "Conceptual / Experimental",
      en: "Conceptual / Experimental",
    },
    concept: {
      es: "Una humana que se descubre como un hada alienígena.",
      en: "A human discovering herself as an alien fairy.",
    },
    description: {
      es: "En la frontera entre lo humano y lo extraño, el cuerpo se transforma en criatura. Mitad hada, mitad aparición de otro mundo: mundos proyectados envuelven la piel y el estudio se vuelve el hábitat de algo que apenas empieza a reconocerse.",
      en: "On the border between the human and the strange, the body turns into a creature. Half fairy, half apparition from another world — projected worlds wrap the skin and the studio becomes the habitat of something only beginning to recognise itself.",
    },
    group: "fera",
    credits: [PHOTO],
  },
  {
    slug: "afterimage",
    title: "Reverie Luminare",
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
    group: "afterimage",
    credits: [PHOTO],
  },
  {
    slug: "nocturne",
    title: "Japan",
    year: "2026",
    category: {
      es: "Fotografía / Movimiento",
      en: "Photography / Motion",
    },
    concept: {
      es: "Invierno japonés.",
      en: "Japanese winter.",
    },
    description: {
      es: "Un estudio silencioso de la luz azul, la distancia y el frío. Nieve, silueta y el silencio entre cuadros: el invierno japonés desacelera la mirada hasta que la imagen es menos una fotografía que un aliento contenido.",
      en: "A quiet study of blue light, distance and cold. Snow, silhouette and the hush between frames — the Japanese winter slows the eye until the image is less a photograph than a held breath.",
    },
    group: "nocturne",
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
