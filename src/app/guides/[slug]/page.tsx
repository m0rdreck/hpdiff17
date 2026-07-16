import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllArticles, getArticleBySlug, getServiceDetail, getSiteConfig } from "@/lib/content";
import { ArticleBody } from "@/components/ArticleBody";
import { Faq } from "@/components/sections/Faq";
import { ContactCta } from "@/components/sections/ContactCta";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ArticleSchema, BreadcrumbSchema, FaqSchema } from "@/components/StructuredData";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: { absolute: article.seo.title },
    description: article.seo.description,
    alternates: { canonical: article.seo.path },
    openGraph: {
      type: "article",
      title: article.seo.title,
      description: article.seo.description,
      url: article.seo.path,
      images: [{ url: article.image }],
    },
  };
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric" }).format(d);
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [site, article] = await Promise.all([getSiteConfig(), getArticleBySlug(slug)]);
  if (!article) notFound();

  const related = await Promise.all((article.relatedServices ?? []).map((s) => getServiceDetail(s)));
  const relatedServices = related.filter((s): s is NonNullable<typeof s> => Boolean(s));

  return (
    <>
      <ArticleSchema site={site} article={article} />
      <BreadcrumbSchema
        site={site}
        items={[
          { name: "Accueil", path: "/" },
          { name: "Guides & conseils", path: "/guides" },
          { name: article.title, path: article.seo.path },
        ]}
      />
      {article.faq && article.faq.length > 0 && <FaqSchema items={article.faq} />}

      <article>
        {/* En-tête */}
        <header className="bg-white pt-10 pb-8 sm:pt-16">
          <div className="container-page max-w-3xl">
            <Reveal>
              <nav aria-label="Fil d’Ariane" className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <Link href="/" className="hover:text-gold-600">Accueil</Link>
                <span aria-hidden>/</span>
                <Link href="/guides" className="hover:text-gold-600">Guides &amp; conseils</Link>
              </nav>
              <span className="mt-6 inline-block rounded-full bg-navy-900 px-3 py-1 text-xs font-semibold text-gold-400">
                {article.category}
              </span>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
                {article.title}
              </h1>
              <p className="mt-4 text-lg leading-8 text-muted">{article.excerpt}</p>
              <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="clock" className="size-4 text-gold-500" />
                  {article.readingMinutes} min de lecture
                </span>
                <span>Mis à jour le {formatDate(article.updated)}</span>
              </p>
            </Reveal>
          </div>
        </header>

        {/* Image de couverture */}
        <div className="bg-white pt-2">
          <div className="container-page max-w-4xl">
            <Reveal className="relative aspect-[21/9] overflow-hidden rounded-3xl shadow-[var(--shadow-card)]">
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                priority
                sizes="(max-width: 896px) 100vw, 896px"
                className="object-cover"
              />
            </Reveal>
          </div>
        </div>

        {/* Corps */}
        <div className="bg-white py-12 sm:py-16">
          <div className="container-page">
            <ArticleBody blocks={article.body} />
          </div>
        </div>

        {/* Maillage interne : services liés */}
        {relatedServices.length > 0 && (
          <section className="bg-navy-25 py-14">
            <div className="container-page max-w-3xl">
              <h2 className="section-title text-center text-2xl">Prestations en lien</h2>
              <p className="mt-3 text-center text-sm text-muted">
                Besoin d’une intervention ? Découvrez le détail de mes prestations.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {relatedServices.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/${s.slug}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-navy-900/12 bg-white px-5 py-3 text-sm font-semibold text-navy-900 shadow-[var(--shadow-card)] transition-all hover:-translate-y-0.5 hover:border-gold-500 hover:text-gold-600"
                  >
                    {s.hero.title} {s.hero.highlight}
                    <Icon name="arrow" className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <ContactCta
          site={site}
          title="Un projet ou une panne à Saintes ?"
          text="Contactez-moi pour un conseil adapté à votre situation ou un devis gratuit et sans engagement."
        />

        {/* FAQ de l'article */}
        {article.faq && article.faq.length > 0 && (
          <section className="bg-navy-25 py-16 sm:py-24">
            <Reveal className="container-page max-w-3xl">
              <Faq items={article.faq} />
            </Reveal>
          </section>
        )}
      </article>
    </>
  );
}
