/**
 * Modèle de contenu du site HP DIFF.
 *
 * Tout le contenu éditorial du site est décrit ici sous forme de types.
 * Les données concrètes vivent dans `site.ts`, `pages.ts` et `legal.ts`.
 *
 * ⇢ POURQUOI CETTE STRUCTURE ?
 *   Le contenu est volontairement séparé de la présentation (les composants
 *   React ne contiennent aucun texte "en dur"). Pour rendre le site
 *   administrable plus tard, il suffira de remplacer la lecture de ces
 *   fichiers (voir `src/lib/content.ts`) par un appel à un CMS / une base de
 *   données / un back-office, SANS toucher aux composants ni aux pages.
 */

export interface Cta {
  label: string;
  href: string;
  /** style visuel du bouton */
  variant?: "primary" | "outline" | "ghost";
  /** icône optionnelle (clé connue du composant Button) */
  icon?: "phone" | "mail" | "arrow" | "quote";
}

export interface TrustBadge {
  icon: string; // chemin d'image dans /public
  label: string;
  /** inverser la couleur de l'icône (icônes noires -> blanches) */
  invert?: boolean;
}

/** Section "image + texte" alternée (accueil, pages services). */
export interface FeatureSection {
  id: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  /** position de l'image */
  imageSide?: "left" | "right";
  cta?: Cta;
}

/** Carte de prestation détaillée (grille de cartes avec survol). */
export interface ServiceCard {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Review {
  author: string;
  rating: number; // 0-5
  text: string;
  date?: string;
}

export interface ServiceArea {
  name: string;
  /** identifiant d'URL, ex: "corme-royal" (pour la page locale) */
  slug?: string;
  /** commune de rattachement de l'entreprise (pas de page dédiée) */
  base?: boolean;
  /** distance approximative depuis la base, en km */
  distanceKm?: number;
  /** phrase d'accroche locale (unique par ville, pour le SEO) */
  intro?: string;
}

/** Horaires structurés (pour les données Schema.org). */
export interface OpeningHoursSpec {
  /** jours en anglais court : Mo, Tu, We, Th, Fr, Sa, Su */
  days: string[];
  opens: string; // "08:00"
  closes: string; // "18:00"
}

export interface GeoPoint {
  lat: number;
  lng: number;
}

/** Métadonnées SEO d'une page. */
export interface Seo {
  title: string;
  description: string;
  /** chemin canonique, ex: "/depannage-electrique" */
  path: string;
}

/** Bloc "hero" en haut d'une page. */
export interface Hero {
  eyebrow?: string;
  title: string;
  highlight?: string; // portion du titre mise en avant (or)
  text: string;
  image: string;
  imageAlt: string;
  ctas: Cta[];
}

/** Page de contenu générique (accueil + pages services). */
export interface Page {
  slug: string;
  seo: Seo;
  hero: Hero;
  /** intro optionnelle sous le hero */
  intro?: { title: string; body: string; cta?: Cta };
  features?: FeatureSection[];
  /** grille de cartes de prestations */
  servicesTitle?: string;
  servicesIntro?: string;
  services?: ServiceCard[];
}

export interface OpeningHours {
  label: string;
  value: string;
}

/** Élément de navigation, avec sous-menu optionnel. */
export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

/** Page de service détaillée (cluster autour de la page pilier). */
export interface ServiceDetail {
  slug: string;
  seo: Seo;
  hero: Hero;
  /** paragraphe d'introduction */
  intro: string;
  /** prestations concrètes incluses (grille de cartes) */
  benefits: { title: string; text: string }[];
  /** étapes d'intervention (optionnel, liste numérotée) */
  steps?: { title: string; text: string }[];
  /** slugs des services liés (maillage interne) */
  related?: string[];
}

/**
 * Bloc de contenu d'un article (guide/conseil).
 * Modèle volontairement simple → facile à mapper depuis un CMS plus tard.
 */
export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

/** Article de la section « Guides & conseils » (contenu SEO éditorial). */
export interface Article {
  slug: string;
  seo: Seo;
  /** titre affiché (peut différer du <title> SEO) */
  title: string;
  /** chapô / résumé (liste + meta + partages) */
  excerpt: string;
  /** libellé de catégorie, ex: "Sécurité", "Budget" */
  category: string;
  /** temps de lecture estimé, en minutes */
  readingMinutes: number;
  /** date de mise à jour, ISO "AAAA-MM-JJ" (schema + affichage) */
  updated: string;
  image: string;
  imageAlt: string;
  /** corps de l'article, en blocs */
  body: ArticleBlock[];
  /** slugs de services liés (maillage interne + CTA) */
  relatedServices?: string[];
  /** questions fréquentes propres à l'article (FAQ schema) */
  faq?: FaqItem[];
}

/** Configuration globale, partagée par toutes les pages. */
export interface SiteConfig {
  name: string;
  legalName: string;
  slogan: string;
  description: string;
  /** URL de production (utilisée pour les metadata/SEO) */
  url: string;
  logo: string;
  phone: { display: string; e164: string };
  email?: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  googleMapsUrl: string;
  /** liens officiels (fiche Google, réseaux…) pour le schema `sameAs` */
  sameAs?: string[];
  /** coordonnées GPS de l'établissement (Schema.org geo) */
  geo?: GeoPoint;
  hours: OpeningHours[];
  /** horaires structurés pour Schema.org (openingHoursSpecification) */
  openingHoursSpec?: OpeningHoursSpec[];
  serviceRadiusKm: number;
  serviceAreas: ServiceArea[];
  nav: NavItem[];
  trustBadges: TrustBadge[];
  reviews: Review[];
  faq: FaqItem[];
}
