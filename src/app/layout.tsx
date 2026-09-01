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

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "LUMENDE — Photography / Light / Motion",
    template: "%s — LUMENDE",
  },
  description: site.description,
  keywords: [
    "Lumende Studio",
    "Editorial Photographer Querétaro",
    "Creative Photographer Mexico",
    "Fashion Photographer Querétaro",
    "Experimental Photography",
    "Light Painting Photography",
    "Creative Portrait Photography",
  ],
  authors: [{ name: "LUMENDE" }],
  openGraph: {
    type: "website",
    siteName: "LUMENDE",
    title: "LUMENDE — Photography / Light / Motion",
    description: site.description,
    url: site.url,
    locale: "en_US",
    images: [
      {
        url: "/media/nightmare/nightmare-16-1280.webp",
        width: 1280,
        alt: "LUMENDE — figures traced in light",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMENDE — Photography / Light / Motion",
    description: site.description,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${bodoni.variable} antialiased`}
    >
      <body className="min-h-screen bg-ground text-ink">
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
