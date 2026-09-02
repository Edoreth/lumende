export type Loc = { es: string; en: string };

export const site = {
  name: "LUMENDE",
  tagline: { es: "Fotografía / Luz / Movimiento", en: "Photography / Light / Motion" },
  location: "Querétaro, México",
  email: "lumende.studio@gmail.com",
  instagram: {
    handle: "@lumende.studio",
    url: "https://instagram.com/lumende.studio",
  },
  domain: "lumende.studio",
  url: "https://lumende.studio",
};

export const nav: { label: Loc; href: string }[] = [
  { label: { es: "Trabajo", en: "Selected Work" }, href: "/work" },
  { label: { es: "Experimentos", en: "Experiments" }, href: "/experiments" },
  { label: { es: "Encargos", en: "Commissions" }, href: "/commissions" },
  { label: { es: "Estudio", en: "About" }, href: "/about" },
];

/** Discreetly shown inside About / Commissions, never a Services page. */
export const services: Loc[] = [
  { es: "Fotografía Editorial", en: "Editorial Photography" },
  { es: "Retratos Creativos", en: "Creative Portraits" },
  { es: "Moda", en: "Fashion" },
  { es: "Retrato de Artistas", en: "Artist Portraits" },
  { es: "Campañas Visuales", en: "Visual Campaigns" },
  { es: "Desarrollo de Concepto", en: "Concept Development" },
  { es: "Light Painting", en: "Light Painting" },
  { es: "Fotografía Experimental", en: "Experimental Photography" },
];
