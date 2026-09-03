"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { T } from "@/i18n/T";
import LangToggle from "./LangToggle";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-32"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,6,6,0.6), rgba(6,6,6,0))",
        }}
      />
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex items-start justify-between px-[var(--pad)] py-[clamp(1rem,2.5vw,1.75rem)]">
        <Link
          href="/"
          className="pointer-events-auto font-sans text-[0.8rem] font-medium uppercase tracking-[0.32em] text-white/95 transition-opacity hover:opacity-60"
          aria-label={`${site.name} — home`}
        >
          {site.name}
        </Link>

        {/* Desktop menu */}
        <nav className="pointer-events-auto hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-100"
                style={{ opacity: active ? 1 : 0.62 }}
              >
                <T es={item.label.es} en={item.label.en} />
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.22em] text-white opacity-80 transition-opacity hover:opacity-100"
          >
            <T es="Agenda" en="Agenda" />
          </Link>
          <span className="ml-2 h-3 w-px bg-white/25" aria-hidden />
          <LangToggle />
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="label pointer-events-auto z-[70] !text-white md:hidden"
          aria-expanded={open}
          aria-label="Menu"
        >
          {open ? <T es="Cerrar" en="Close" /> : <T es="Menú" en="Menu" />}
        </button>
      </header>

      {/* Mobile menu overlay — CSS driven */}
      <div
        className={`fixed inset-0 z-50 flex flex-col justify-center bg-ground px-[var(--pad)] transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav className="flex flex-col gap-6">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className="display text-ink text-[clamp(2.25rem,11vw,4rem)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transitionDelay: open ? `${100 + i * 60}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "translateY(0)" : "translateY(20px)",
              }}
              tabIndex={open ? 0 : -1}
            >
              <T es={item.label.es} en={item.label.en} />
            </Link>
          ))}
          <Link
            href="/contact"
            className="display text-ink text-[clamp(2.25rem,11vw,4rem)] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transitionDelay: open ? `${100 + nav.length * 60}ms` : "0ms",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(20px)",
            }}
            tabIndex={open ? 0 : -1}
          >
            <T es="Agenda" en="Agenda" />
          </Link>
        </nav>
        <div className="mt-16 flex flex-col gap-3">
          <LangToggle className="!text-ink [&_button]:!text-ink" />
          <span className="label">{site.location}</span>
          <a href={site.instagram.url} className="label hover:text-ink">
            Instagram
          </a>
        </div>
      </div>
    </>
  );
}
