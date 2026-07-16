import config from "@payload-config";
import { getPayload } from "payload";
import { site } from "@/content/site";
import { pages } from "@/content/pages";
import type {
  Guide,
  ServiceArea as PayloadServiceArea,
  ServiceDetail as PayloadServiceDetail,
  SiteSetting,
} from "@/payload-types";
import type {
  Article,
  ArticleBlock,
  Cta,
  NavItem,
  Page,
  ServiceArea,
  ServiceDetail,
  SiteConfig,
} from "@/content/types";

/**
 * Couche d'accès au contenu — seul point de contact entre le site et ses
 * sources de données.
 *
 * État actuel :
 *   • Guides          → administrés dans Payload. Voir `toArticle`.
 *   • Config du site  → global « site-settings », SAUF url/logo/nav.
 *   • Zones d'intervention → collection « service-areas ». Voir `toServiceArea`.
 *   • Pages, prestations → toujours dans les fichiers de `src/content/`.
 *
 * Les signatures ne changent pas quand une source bascule vers le CMS :
 * aucune page ni aucun composant n'a besoin d'être modifié.
 */

/** URL exploitable d'un média Payload (upload) ; "" si absent. */
function mediaUrl(v: unknown): string {
  return typeof v === "object" && v !== null && "url" in v ? ((v as { url?: string }).url ?? "") : "";
}

/** Texte alternatif d'un média Payload ; "" si absent. */
function mediaAlt(v: unknown): string {
  return typeof v === "object" && v !== null && "alt" in v ? ((v as { alt?: string }).alt ?? "") : "";
}

/**
 * Construit le menu principal.
 *
 * Volontairement DÉRIVÉ, jamais éditable : les sous-menus se déduisent des
 * zones d'intervention et des prestations. Ajouter une commune dans le
 * back-office la fait apparaître ici toute seule, et personne ne peut casser
 * la navigation depuis l'admin.
 */
function buildNav(areas: ServiceArea[], services: { label: string; href: string }[]): NavItem[] {
  return [
    { label: "Accueil", href: "/" },
    { label: "Dépannage électrique", href: "/depannage-electrique" },
    {
      label: "Électricité générale",
      href: "/electricite-generale",
      children: services,
    },
    {
      label: "Zones d’intervention",
      href: "",
      children: areas
        .filter((a) => a.slug)
        .map((a) => ({ label: `Électricien à ${a.name}`, href: `/electricien/${a.slug}` })),
    },
    { label: "Guides", href: "/guides" },
    { label: "Contact", href: "/contact" },
  ];
}

/** Recompose un `SiteConfig` : global Payload + parties restées en code. */
function toSiteConfig(
  s: SiteSetting,
  areas: ServiceArea[],
  services: { label: string; href: string }[],
): SiteConfig {
  return {
    // --- administré dans le back-office ---
    name: s.name,
    legalName: s.legalName,
    slogan: s.slogan,
    description: s.description,
    phone: { display: s.phone.display, e164: s.phone.e164 },
    email: s.email ?? undefined,
    address: {
      street: s.address.street,
      postalCode: s.address.postalCode,
      city: s.address.city,
      country: s.address.country,
    },
    googleMapsUrl: s.googleMapsUrl,
    sameAs: s.sameAs?.map((l) => l.url) ?? undefined,
    geo: s.geo ? { lat: s.geo.lat, lng: s.geo.lng } : undefined,
    hours: (s.hours ?? []).map(({ label, value }) => ({ label, value })),
    openingHoursSpec: s.openingHoursSpec?.map(({ days, opens, closes }) => ({
      days,
      opens,
      closes,
    })),
    serviceRadiusKm: s.serviceRadiusKm,
    trustBadges: (s.trustBadges ?? []).map((b) => ({
      icon: mediaUrl(b.icon),
      label: b.label,
      invert: b.invert ?? undefined,
    })),
    reviews: (s.reviews ?? []).map((r) => ({
      author: r.author,
      rating: r.rating,
      text: r.text,
      date: r.date ? r.date.slice(0, 10) : undefined,
    })),
    faq: (s.faq ?? []).map(({ question, answer }) => ({ question, answer })),

    // --- administrées dans leur propre collection ---
    serviceAreas: areas,

    // --- volontairement NON éditables ---
    nav: buildNav(areas, services), // dérivé des zones + prestations
    url: site.url, // lié au déploiement
    logo: site.logo, // fichier du repo
  };
}

export async function getSiteConfig(): Promise<SiteConfig> {
  const payload = await getPayload({ config });
  const [settings, areas, services] = await Promise.all([
    payload.findGlobal({ slug: "site-settings", depth: 1 }),
    getAllServiceAreas(),
    getServiceNavItems(),
  ]);
  return toSiteConfig(settings, areas, services);
}

export async function getPage(slug: string): Promise<Page | null> {
  return pages[slug] ?? null;
}

export async function getAllPageSlugs(): Promise<string[]> {
  return Object.keys(pages);
}

/* ------------------------------------------------------------------ *
 * Zones d'intervention — administrées depuis le back-office.
 * ------------------------------------------------------------------ */

/** Traduit un document Payload `service-areas` en `ServiceArea`. */
function toServiceArea(doc: PayloadServiceArea): ServiceArea {
  return {
    name: doc.name,
    slug: doc.slug ?? undefined,
    base: doc.base ?? undefined,
    distanceKm: doc.distanceKm ?? undefined,
    intro: doc.intro ?? undefined,
  };
}

/** Toutes les communes, Saintes (commune de rattachement) comprise. */
async function getAllServiceAreas(): Promise<ServiceArea[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "service-areas",
    sort: "name",
    limit: 200,
    depth: 0,
    overrideAccess: false,
  });
  // La commune de rattachement d'abord, puis les autres par ordre alphabétique
  // — l'ordre historique des puces et du menu.
  const areas = docs.map(toServiceArea);
  return [...areas.filter((a) => a.base), ...areas.filter((a) => !a.base)];
}

/** Villes disposant d'une page locale (celles ayant un `slug`). */
export async function getCityAreas(): Promise<ServiceArea[]> {
  return (await getAllServiceAreas()).filter((a) => a.slug);
}

export async function getCityBySlug(slug: string): Promise<ServiceArea | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "service-areas",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 0,
    overrideAccess: false,
  });
  return docs[0] ? toServiceArea(docs[0]) : null;
}

/* ------------------------------------------------------------------ *
 * Prestations (« Électricité générale ») — administrées dans le back-office.
 * ------------------------------------------------------------------ */

/**
 * Boutons du bandeau des pages prestations.
 *
 * Volontairement DÉRIVÉS et non éditables : ils étaient identiques sur les 4
 * pages. Surtout, le numéro vient maintenant de la configuration du site —
 * avant, il était codé en dur, donc changer le téléphone dans le back-office
 * n'aurait pas mis à jour le bouton « Appelez ».
 */
function serviceCtas(phoneE164: string): Cta[] {
  return [
    { label: "Demandez votre devis", href: "/contact", variant: "primary", icon: "arrow" },
    { label: "Appelez votre électricien", href: `tel:${phoneE164}`, variant: "outline", icon: "phone" },
  ];
}

/** Traduit un document Payload `service-details` en `ServiceDetail`. */
function toServiceDetail(doc: PayloadServiceDetail, phoneE164: string): ServiceDetail {
  return {
    slug: doc.slug,
    seo: {
      title: doc.seo.title,
      description: doc.seo.description,
      path: `/${doc.slug}`,
    },
    hero: {
      eyebrow: doc.hero.eyebrow ?? undefined,
      title: doc.hero.title,
      highlight: doc.hero.highlight ?? undefined,
      text: doc.hero.text,
      image: mediaUrl(doc.hero.image),
      imageAlt: mediaAlt(doc.hero.image) || doc.navLabel,
      ctas: serviceCtas(phoneE164),
    },
    intro: doc.intro,
    benefits: (doc.benefits ?? []).map(({ title, text }) => ({ title, text })),
    steps: doc.steps?.length ? doc.steps.map(({ title, text }) => ({ title, text })) : undefined,
    // `related` est une relation : avec depth >= 1 Payload renvoie les
    // documents liés, dont on ne garde que le slug (forme attendue par le type).
    related: doc.related?.length
      ? doc.related
          .map((r) => (typeof r === "object" && r !== null ? r.slug : null))
          .filter((s): s is string => Boolean(s))
      : undefined,
  };
}

/** Téléphone au format international, depuis la configuration du site. */
async function getPhoneE164(): Promise<string> {
  const payload = await getPayload({ config });
  const s = await payload.findGlobal({ slug: "site-settings", depth: 0 });
  return s.phone.e164;
}

export async function getServiceDetail(slug: string): Promise<ServiceDetail | null> {
  const payload = await getPayload({ config });
  const [{ docs }, phone] = await Promise.all([
    payload.find({
      collection: "service-details",
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
      overrideAccess: false,
    }),
    getPhoneE164(),
  ]);
  return docs[0] ? toServiceDetail(docs[0], phone) : null;
}

export async function getAllServiceDetails(): Promise<ServiceDetail[]> {
  const payload = await getPayload({ config });
  const [{ docs }, phone] = await Promise.all([
    payload.find({
      collection: "service-details",
      sort: "order",
      limit: 100,
      depth: 1,
      overrideAccess: false,
    }),
    getPhoneE164(),
  ]);
  return docs.map((d) => toServiceDetail(d, phone));
}

/** Libellés courts des prestations, pour le menu et le pied de page. */
export async function getServiceNavItems(): Promise<{ label: string; href: string }[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "service-details",
    sort: "order",
    limit: 100,
    depth: 0,
    overrideAccess: false,
  });
  return docs.map((d) => ({ label: d.navLabel, href: `/${d.slug}` }));
}

/* ------------------------------------------------------------------ *
 * Guides — administrés depuis le back-office Payload (/admin).
 *
 * Seules ces fonctions parlent à Payload : les pages et composants
 * continuent de consommer le type `Article` sans rien savoir du CMS.
 * ------------------------------------------------------------------ */

/** Traduit un document Payload `guides` en `Article`. */
function toArticle(doc: Guide): Article {
  const image = typeof doc.image === "object" && doc.image !== null ? doc.image : null;

  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    category: doc.category,
    readingMinutes: doc.readingMinutes,
    // Payload renvoie un ISO complet ; le type `Article` attend "AAAA-MM-JJ".
    updated: (doc.updated ?? "").slice(0, 10),
    image: image?.url ?? "",
    imageAlt: image?.alt ?? doc.title,
    body: (doc.body ?? []).map((block): ArticleBlock => {
      switch (block.blockType) {
        case "h2":
          return { type: "h2", text: block.text };
        case "ul":
          return { type: "ul", items: (block.items ?? []).map((i) => i.text) };
        case "callout":
          return { type: "callout", text: block.text };
        default:
          return { type: "p", text: block.text };
      }
    }),
    relatedServices: doc.relatedServices ?? undefined,
    faq: doc.faq?.map(({ question, answer }) => ({ question, answer })) ?? undefined,
    seo: {
      title: doc.seo.title,
      description: doc.seo.description,
      path: `/guides/${doc.slug}`,
    },
  };
}

/** Articles de la section « Guides & conseils », dans l'ordre d'affichage. */
export async function getAllArticles(): Promise<Article[]> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "guides",
    // Les brouillons ne doivent jamais fuiter sur le site public.
    where: { _status: { equals: "published" } },
    sort: "order",
    depth: 1,
    limit: 100,
    overrideAccess: false,
  });
  return docs.map(toArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "guides",
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: "published" } }],
    },
    depth: 1,
    limit: 1,
    overrideAccess: false,
  });
  return docs[0] ? toArticle(docs[0]) : null;
}
