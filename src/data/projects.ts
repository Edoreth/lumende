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
    title: "Fera",
    year: "2026",
    category: {
      es: "Moda / Fotografía de Arte",
      en: "Fashion / Fine Art Photography",
    },
    concept: {
      es: "La figura humana disolviéndose en algo feral.",
      en: "The human figure dissolving into something feral.",
    },
    description: {
      es: "Fera pone en escena el cuerpo como una criatura atrapada en plena transformación: mitad moda, mitad aparición. Mundos proyectados envuelven la piel, y el estudio se vuelve el hábitat de algo que nunca fue del todo humano.",
      en: "Fera stages the body as a creature caught mid-transformation — half fashion, half apparition. Projected worlds wrap the skin, and the studio becomes a habitat for something that was never quite human.",
    },
    group: "fera",
    credits: [PHOTO],
  },
  {
    slug: "afterimage",
    title: "Afterimage",
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
    title: "Nocturne",
    year: "2026",
    category: {
      es: "Fotografía / Movimiento",
      en: "Photography / Motion",
    },
    concept: {
      es: "La quietud registrada en las horas que el mundo olvida.",
      en: "Stillness recorded in the hours the world forgets.",
    },
    description: {
      es: "Un estudio silencioso de la luz azul, la distancia y el frío. Nocturne desacelera la mirada al ritmo de la noche —nieve, silueta y el silencio entre cuadros— donde la imagen es menos una fotografía que un aliento contenido.",
      en: "A quiet study of blue light, distance and cold. Nocturne slows the eye to the pace of the night — snow, silhouette and the hush between frames — where the image is less a photograph than a held breath.",
    },
    group: "nocturne",
    credits: [PHOTO],
  },
];

export const projectMap = Object.fromEntries(projects.map((p) => [p.slug, p]));

export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
