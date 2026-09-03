import type { Metadata } from "next";
import ServiceLanding from "@/components/ServiceLanding";
import { landingMap } from "@/data/landings";

const data = landingMap["light-painting-queretaro"];

export const metadata: Metadata = {
  title: data.metaTitle,
  description: data.metaDescription,
  alternates: { canonical: "/light-painting-queretaro" },
  openGraph: {
    title: `${data.metaTitle} — LUMENDE`,
    description: data.metaDescription,
  },
};

export default function Page() {
  return <ServiceLanding data={data} />;
}
