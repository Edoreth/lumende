import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with LUMENDE for editorials, collaborations, commissions and creative projects. Based in Querétaro, México.",
  alternates: { canonical: "/contact" },
};

const kinds = ["Editorials", "Collaborations", "Commissions", "Creative Projects"];

export default function ContactPage() {
  return (
    <section className="flex min-h-[100svh] flex-col justify-center px-[var(--pad)] pb-[clamp(3rem,8vh,6rem)] pt-[clamp(8rem,20vh,14rem)]">
      <h1 className="display max-w-[14ch] text-ink text-[clamp(3rem,12vw,10rem)]">
        Let&rsquo;s create something.
      </h1>

      <div className="mt-[clamp(3rem,9vh,7rem)] grid grid-cols-1 gap-[clamp(3rem,7vw,6rem)] md:grid-cols-[1fr_1fr]">
        {/* Left — details */}
        <div className="flex flex-col justify-between gap-12">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {kinds.map((k) => (
              <li key={k} className="label !text-ink">
                {k}
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
