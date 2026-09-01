import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";
import { T } from "@/i18n/T";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Ponte en contacto con LUMENDE para editoriales, colaboraciones, encargos y proyectos creativos. Con base en Querétaro, México.",
  alternates: { canonical: "/contact" },
};

const kinds: { es: string; en: string }[] = [
  { es: "Editoriales", en: "Editorials" },
  { es: "Colaboraciones", en: "Collaborations" },
  { es: "Encargos", en: "Commissions" },
  { es: "Proyectos Creativos", en: "Creative Projects" },
];

export default function ContactPage() {
  return (
    <section className="flex min-h-[100svh] flex-col justify-center px-[var(--pad)] pb-[clamp(3rem,8vh,6rem)] pt-[clamp(8rem,20vh,14rem)]">
      <h1 className="display max-w-[14ch] text-ink text-[clamp(3rem,12vw,10rem)]">
        <T es="Creemos algo juntos." en="Let’s create something." />
      </h1>

      <div className="mt-[clamp(3rem,9vh,7rem)] grid grid-cols-1 gap-[clamp(3rem,7vw,6rem)] md:grid-cols-[1fr_1fr]">
        {/* Left — details */}
        <div className="flex flex-col justify-between gap-12">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {kinds.map((k) => (
              <li key={k.en} className="label !text-ink">
                <T es={k.es} en={k.en} />
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-6">
            <a
              href={`mailto:${site.email}`}
              className="font-serif text-[clamp(1.5rem,4vw,2.75rem)] text-ink transition-opacity hover:opacity-60"
            >
              {site.email}
            </a>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noreferrer"
              className="font-serif text-[clamp(1.25rem,3vw,2rem)] text-ink-dim transition-colors hover:text-ink"
            >
              {site.instagram.handle}
            </a>
            <p className="label mt-2">{site.location}</p>
          </div>
        </div>

        {/* Right — form */}
        <ContactForm />
      </div>
    </section>
  );
}
