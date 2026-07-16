import type { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { getSiteConfig } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/StructuredData";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteConfig();
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${site.slogan} | ${site.name}`,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    applicationName: site.name,
    authors: [{ name: site.name }],
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: site.name,
      title: `${site.slogan} | ${site.name}`,
      description: site.description,
      url: site.url,
      images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name} — ${site.slogan}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${site.slogan} | ${site.name}`,
      description: site.description,
      images: ["/og.png"],
    },
    // Les favicons sont fournis par les fichiers src/app/icon.png,
    // apple-icon.png et favicon.ico (convention Next.js).
    alternates: { canonical: "/" },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const site = await getSiteConfig();
  return (
    <html lang="fr" className={`${poppins.variable} ${montserrat.variable}`}>
      <body>
        <StructuredData site={site} />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-gold-500 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-navy-950"
        >
          Aller au contenu
        </a>
        <Header site={site} />
        <main id="contenu">{children}</main>
        <Footer site={site} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
