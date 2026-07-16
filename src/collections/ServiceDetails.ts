import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

/**
 * Pages de prestations (« Électricité générale ») — back-office.
 *
 * Miroir du type `ServiceDetail` (src/content/types.ts).
 *
 * Ces pages sont servies par la route dynamique `src/app/(frontend)/[service]`.
 * En créer une ici suffit : sa page /<slug> existe aussitôt et elle apparaît
 * dans le menu « Électricité générale », dans le pied de page et dans les
 * grilles de liens internes.
 */

/**
 * Slugs interdits : la route `/[service]` vit à la RACINE du site, elle
 * partage donc l'espace d'adresses avec les pages fixes. Next.js donne la
 * priorité aux routes statiques, donc un service nommé « contact » ne
 * casserait pas /contact — il serait simplement INACCESSIBLE, en silence.
 * On refuse ces slugs à la saisie plutôt que de laisser créer une page
 * fantôme.
 */
const RESERVED_SLUGS = [
  "admin",
  "api",
  "contact",
  "depannage-electrique",
  "electricien",
  "electricite-generale",
  "guides",
  "mentions-legales",
  "images",
  "favicon.ico",
  "icon.png",
  "apple-icon.png",
  "robots.txt",
  "sitemap.xml",
  "og.png",
  "_next",
];

/** Une prestation modifiée change le menu et le pied de page → tout le site. */
function revalidateService(slug?: string | null) {
  try {
    revalidatePath("/", "layout");
    if (slug) revalidatePath(`/${slug}`);
  } catch {
    // Hors contexte de requête (scripts) : rien à purger.
  }
}

export const ServiceDetails: CollectionConfig = {
  slug: "service-details",
  labels: { singular: "Prestation", plural: "Prestations" },
  admin: {
    useAsTitle: "navLabel",
    defaultColumns: ["navLabel", "slug", "order"],
    group: "Contenu",
    description:
      "Pages détaillées listées sous « Électricité générale ». En créer une ajoute sa page et son entrée de menu.",
  },
  access: { read: () => true },
  defaultSort: "order",
  hooks: {
    afterChange: [({ doc }) => revalidateService(doc?.slug)],
    afterDelete: [({ doc }) => revalidateService(doc?.slug)],
  },
  fields: [
    {
      name: "navLabel",
      type: "text",
      label: "Nom dans le menu",
      required: true,
      admin: {
        description:
          "Libellé court affiché dans le menu et le pied de page. Ex : « Tableau électrique ».",
      },
    },
    {
      name: "slug",
      type: "text",
      label: "Slug (URL)",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description:
          "Adresse de la page : /mon-slug. Sans accent. À NE PLUS MODIFIER une fois la page indexée par Google.",
      },
      validate: (value: string | null | undefined) => {
        if (!value) return "Le slug est obligatoire.";
        if (!/^[a-z0-9-]+$/.test(value)) {
          return "Uniquement des minuscules non accentuées, chiffres et tirets. Ex : tableau-electrique.";
        }
        if (RESERVED_SLUGS.includes(value)) {
          return `« ${value} » est réservé à une autre page du site : la prestation serait inaccessible. Choisissez un autre slug.`;
        }
        return true;
      },
    },
    {
      name: "order",
      type: "number",
      label: "Ordre dans le menu",
      required: true,
      defaultValue: 100,
      admin: { position: "sidebar", description: "Les plus petits nombres apparaissent en premier." },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "En-tête",
          fields: [
            {
              name: "hero",
              type: "group",
              label: "Bandeau du haut",
              fields: [
                {
                  name: "eyebrow",
                  type: "text",
                  label: "Sur-titre",
                  admin: { description: "Petite ligne au-dessus du titre. Ex : « Électricité générale · Saintes »." },
                },
                {
                  name: "title",
                  type: "text",
                  label: "Titre",
                  required: true,
                  admin: { description: "Première partie du titre, en blanc. Ex : « Tableau »." },
                },
                {
                  name: "highlight",
                  type: "text",
                  label: "Titre mis en avant",
                  admin: { description: "Suite du titre, affichée en doré. Ex : « électrique »." },
                },
                { name: "text", type: "textarea", label: "Texte d'accroche", required: true },
                { name: "image", type: "upload", relationTo: "media", label: "Image", required: true },
              ],
            },
          ],
        },
        {
          label: "Contenu",
          fields: [
            {
              name: "intro",
              type: "textarea",
              label: "Paragraphe d'introduction",
              required: true,
            },
            {
              name: "benefits",
              type: "array",
              label: "Prestations incluses",
              required: true,
              minRows: 1,
              labels: { singular: "prestation", plural: "prestations" },
              admin: { description: "Grille de cartes présentant ce que couvre l'intervention." },
              fields: [
                { name: "title", type: "text", label: "Titre", required: true },
                { name: "text", type: "textarea", label: "Description", required: true },
              ],
            },
            {
              name: "steps",
              type: "array",
              label: "Étapes d'intervention",
              labels: { singular: "étape", plural: "étapes" },
              admin: {
                description: "Liste numérotée, facultative. Laissez vide pour ne pas afficher la section.",
              },
              fields: [
                { name: "title", type: "text", label: "Titre", required: true },
                { name: "text", type: "textarea", label: "Description", required: true },
              ],
            },
            {
              name: "related",
              type: "relationship",
              relationTo: "service-details",
              hasMany: true,
              label: "Prestations liées",
              admin: {
                description:
                  "Liens affichés en bas de page (maillage interne). Ne vous sélectionnez pas vous-même.",
              },
              filterOptions: ({ id }) => (id ? { id: { not_equals: id } } : true),
            },
          ],
        },
        {
          label: "SEO",
          fields: [
            {
              name: "seo",
              type: "group",
              label: "SEO",
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Titre SEO (<title>)",
                  required: true,
                  admin: { description: "Idéalement 50-60 caractères." },
                },
                {
                  name: "description",
                  type: "textarea",
                  label: "Meta description",
                  required: true,
                  admin: { description: "Idéalement 150-160 caractères." },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
