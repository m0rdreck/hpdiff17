import type { Metadata } from "next";
import { getServiceDetail } from "@/lib/content";
import { ServiceDetailPage } from "@/components/ServiceDetailPage";

const SLUG = "renovation-electrique";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getServiceDetail(SLUG);
  return {
    title: { absolute: s!.seo.title },
    description: s!.seo.description,
    alternates: { canonical: s!.seo.path },
  };
}

export default function Page() {
  return <ServiceDetailPage slug={SLUG} />;
}
