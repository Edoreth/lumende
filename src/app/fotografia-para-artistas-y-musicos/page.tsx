import type { Metadata } from "next";
import ServiceLanding from "@/components/ServiceLanding";
import { landingMap } from "@/data/landings";

const data = landingMap["fotografia-para-artistas-y-musicos"];

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: "/fotografia-para-artistas-y-musicos" },
  openGraph: {
    title: `${data.metaTitle} — LUMENDE`,
    description: data.metaDescription,
  },
};

export default function Page() {
  return <ServiceLanding data={data} />;
}
