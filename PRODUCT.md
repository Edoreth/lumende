# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router) + TypeScript + Tailwind v4 + Framer Motion + Lenis. Self-hosted fonts via `next/font`. Static export-friendly; deploy target `lumende.studio` (Vercel-compatible). Chosen by user.

## Users

Two audiences visiting `lumende.studio`:
1. **Creative buyers** — magazine editors, art/creative directors, fashion brands, musicians, and artists evaluating LUMENDE for editorial, campaign, or portrait commissions. They arrive skeptical, scan fast, and decide on the strength of the imagery.
2. **Peers & audience** — fellow photographers, collaborators, and followers coming from Instagram to experience the work as a body of art.

## Product Purpose

A premium portfolio and digital exhibition for LUMENDE, a photography and visual studio. Success = the visitor leaves feeling they entered a distinct visual universe (not "saw a portfolio"), remembers the work, and — for buyers — reaches out for a commission.

## Positioning

LUMENDE sits between fashion editorial, fine-art photography, and cinematic experiment. Its signature is light as material: light painting, long exposure, motion blur, projection, and studio lighting used to place images "somewhere between reality and fiction." The site must feel like an exhibition/editorial, never a commercial template.

## Operating Context

Visitors browse on desktop (creative directors, large screens, cursor) and mobile (Instagram referral traffic). The work is image-led; text is minimal throughout. Navigation must recede so photography dominates every screen.

## Capabilities and Constraints

- Sections/routes: Home, Selected Work (`/work`), project pages (`/work/[slug]`), Experiments, Commissions, About, Contact.
- Selected Work launches with four projects: NIGHTMARE, FERA, AFTERIMAGE, NOCTURNE. LIGHT STUDIES is planned but deferred (source frames still in RAW).
- Real imagery only, from the photographer's library (Sony `.ARW` originals, edited JPG exports). Pipeline optimizes a curated spread to responsive WebP + LQIP; ~92 images shipped in the first pass, to be curated further by the user.
- Contact form fields: Name, Email, Project, Message → "SEND INQUIRY". No backend wired yet (needs a form endpoint/email service — TBD).
- Accessibility: alt text, keyboard nav, sufficient contrast, `prefers-reduced-motion`, semantic structure.
- Performance: WebP/AVIF, lazy loading, preload only hero + first images.

## Brand Commitments

- Name: **LUMENDE**. Tagline: **Photography / Light / Motion**.
- Based in Querétaro, México.
- Instagram is the primary social channel (handle: TBD, user to supply).
- Contact email: TBD (user to supply).
- Voice: mysterious, elegant, experimental, cinematic, premium, artistic, contemporary. Copy is sparse and in English.
- Pinned visual direction (from the user's brief, binding): editorial + cinematic + experimental + minimalist + surreal; palette of deep black, white, very dark greys with all color coming from the photographs; a modern editorial sans for navigation/info paired with a high-contrast elegant serif for special titles/quotes/project names; huge negative space; photography as the absolute protagonist. Explicitly NOT: generic photographer grid, repetitive cards, big "Book Now" CTAs, commercial template feel.

## Evidence on Hand

- Photo library at `C:\Users\Admin\Desktop\Fotos organizadas` (68 GB): 1,845 edited JPG, 1,324 RAW, 59 videos.
- Folder → project mapping confirmed by user: NIGHTMARE ← Terror + FIlmake/Fotos pesadilla; FERA ← ALIEN/alienhada edit; AFTERIMAGE ← proyecto Dream (listas + Onirico); NOCTURNE ← Japon; EXPERIMENTS ← X + witch + yoga + Vilmora; COMMISSIONS ← FER + Jocelyn + pintores.
- Instagram reference grid supplied (dark editorial, colored light, light painting, surreal fashion).
- NOT on hand / must not be fabricated: real client names, testimonials, press, prices, the contact email and Instagram handle, and project credits (creative direction, model, styling, makeup, hair, location). Credits shown only when the user supplies them.

## Product Principles

1. **The photograph is the protagonist.** Every screen exists to make one image hit harder; interface recedes.
2. **Fewer, stronger.** Show less, at greater scale and impact, with abundant negative space.
3. **Exhibition, not storefront.** Editorial/gallery register throughout; services and commissions stay understated.
4. **Light is the subject.** Motion, exposure, and projection are the studio's mechanism and the site's through-line.
5. **Truth over fabrication.** Real imagery; credits and claims only when supplied.

## Accessibility & Inclusion

Honor `prefers-reduced-motion` (cinematic motion is decorative, never required to read content). Maintain text contrast ≥ 4.5:1 against the dark ground. Full keyboard navigation and visible focus. Every image carries descriptive alt text.
