import type { Metadata } from "next";
import { Archivo, Bodoni_Moda } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";
import SmoothScroll from "@/components/SmoothScroll";
import RevealProvider from "@/components/RevealProvider";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const descriptionEs =
  "LUMENDE es un estudio de fotografía y creación visual que explora la relación entre la luz, el movimiento y la figura humana — imágenes editoriales, cinematográficas y experimentales hechas en Querétaro, México.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Fotógrafo editorial y creativo en Querétaro — LUMENDE",
    template: "%s — LUMENDE",
  },
  description: descriptionEs,
  keywords: [
    "Lumende Studio",
    "Fotógrafo editorial Querétaro",
    "Fotografía creativa México",
    "Fotógrafo de moda Querétaro",
    "Fotografía experimental",
    "Light painting",
    "Retrato creativo",
    "Editorial Photographer Querétaro",
    "Creative Photographer Mexico",
  ],
  authors: [{ name: "LUMENDE" }],
  openGraph: {
    type: "website",
    siteName: "LUMENDE",
    title: "Fotógrafo editorial y creativo en Querétaro — LUMENDE",
    description: descriptionEs,
    url: site.url,
    locale: "es_MX",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/media/hero/hero-01-1280.webp",
        width: 1280,
        alt: "LUMENDE — figuras trazadas con luz roja y azul",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fotógrafo editorial y creativo en Querétaro — LUMENDE",
    description: descriptionEs,
  },
  alternates: { canonical: "/" },
};

// Applies the visitor's saved language before first paint (no flash).
const langInit = `try{var l=localStorage.getItem('lumende-lang');if(l==='en'){document.documentElement.dataset.lang='en';document.documentElement.lang='en';}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${archivo.variable} ${bodoni.variable} antialiased`}
    >
      <body className="min-h-screen bg-ground text-ink">
        <script dangerouslySetInnerHTML={{ __html: langInit }} />
        <SmoothScroll />
        <RevealProvider />
        <Loader />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
