export type Credit = { role: string; name: string };

export type Project = {
  slug: string;
  title: string;
  year: string;
  category: string;
  concept: string; // one brief conceptual line
  description: string; // 30–60 words
  group: string; // media.json key
  credits: Credit[]; // only real, supplied credits
};

// Credits are shown only when they exist. Photography is LUMENDE's own work;
// remaining roles (creative direction, model, styling, makeup, hair, location)
// are left for the user to supply per project.
export const projects: Project[] = [
  {
    slug: "nightmare",
    title: "Nightmare",
    year: "2026",
    category: "Editorial / Experimental Photography",
    concept: "A visual exploration of dreams, distortion and artificial light.",
    description:
      "A descent into the space between sleep and waking. Bodies smeared by long exposure, faces lit by colour that does not exist in daylight. Each frame is a fragment of a dream refusing to hold its shape.",
    group: "nightmare",
    credits: [{ role: "Photography", name: "LUMENDE" }],
  },
  {
    slug: "fera",
    title: "Fera",
    year: "2026",
    category: "Fashion / Fine Art Photography",
    concept: "The human figure dissolving into something feral.",
    description:
      "Fera stages the body as a creature caught mid-transformation — half fashion, half apparition. Projected worlds wrap the skin, and the studio becomes a habitat for something that was never quite human.",
    group: "fera",
    credits: [{ role: "Photography", name: "LUMENDE" }],
  },
  {
    slug: "afterimage",
    title: "Afterimage",
    year: "2026",
    category: "Long Exposure / Experimental Photography",
    concept: "What the eye keeps after the light has gone.",
    description:
      "Movement recorded as memory. Figures leave trails of themselves across the frame, painted by light and time rather than captured by it. The subject and its ghost share the same instant.",
    group: "afterimage",
    credits: [{ role: "Photography", name: "LUMENDE" }],
  },
  {
    slug: "nocturne",
    title: "Nocturne",
    year: "2026",
    category: "Photography / Motion",
    concept: "Stillness recorded in the hours the world forgets.",
    description:
      "A quiet study of blue light, distance and cold. Nocturne slows the eye to the pace of the night — snow, silhouette and the hush between frames — where the image is less a photograph than a held breath.",
    group: "nocturne",
    credits: [{ role: "Photography", name: "LUMENDE" }],
  },
];

export const projectMap = Object.fromEntries(
  projects.map((p) => [p.slug, p])
);

export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
