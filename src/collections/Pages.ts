import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

/**
 * Pages principales (accueil, dépannage électrique, électricité générale)
 * — back-office.
 *
 * Miroir du type `Page` (src/content/types.ts).
 *
 * ⚠️ Contrairement aux prestations, ces pages ne sont PAS créables : chacune
 *    a sa propre route et sa mise en page (l'accueil n'est pas construit
 *    comme /depannage-electrique). On administre leur CONTENU, pas leur
 *    existence. D'où `create` et `delete` fermés : supprimer une de ces trois
 *    lignes ferait tomber la page correspondante en 404.
 *    Pour ajouter une page, passer par « Prestations ».
 */

/** Purge la page concernée. Le slug fait déjà office de chemin. */
function revalidatePage(slug?: string | null) {
  try {
    if (slug) revalidatePath(slug);
  } catch {
    // Hors contexte de requête (scripts) : rien à purger.
  }
}

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page principale", plural: "Pages principales" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug"],
    group: "Contenu",
    description:
      "Contenu des trois pages principales du site. Pour créer une page, utilisez « Prestations ».",
  },
  access: {
    read: () => true,
    // Ces trois pages sont adossées à des routes fixes : en créer ou en
    // supprimer n'aurait pas de sens et casserait le site.
    create: () => false,
    delete: () => false,
  },
  hooks: {
    afterChange: [({ doc }) => revalidatePage(doc?.slug)],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Nom de la page",
      required: true,
      admin: { description: "Repère interne, non affiché sur le site. Ex : « Accueil »." },
    },
    {
      name: "slug",
      type: "text",
      label: "Chemin",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Fixé par le code : cette page est adossée à une route précise.",
      },
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
                { name: "eyebrow", type: "text", label: "Sur-titre" },
                {
                  name: "title",
                  type: "text",
                  label: "Titre",
                  required: true,
                  admin: { description: "Première partie du titre, en blanc." },
                },
                {
                  name: "highlight",
                  type: "text",
                  label: "Titre mis en avant",
                  admin: { description: "Suite du titre, affichée en doré." },
                },
                { name: "text", type: "textarea", label: "Texte d'accroche", required: true },
                { name: "image", type: "upload", relationTo: "media", label: "Image", required: true },
                {
                  name: "ctas",
                  type: "array",
                  label: "Boutons",
                  maxRows: 2,
                  labels: { singular: "bouton", plural: "boutons" },
                  admin: {
                    description:
                      "Deux boutons au maximum. Le premier est mis en avant. Le lien est automatique : « Appeler » utilise le téléphone de la configuration du site, « Formulaire » renvoie vers la page contact.",
                  },
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      label: "Texte du bouton",
                      required: true,
                      admin: { description: "Ex : « Appelez-moi maintenant »." },
                    },
                    {
                      name: "target",
                      type: "select",
                      label: "Destination",
                      required: true,
                      defaultValue: "phone",
                      options: [
                        { label: "Appeler (téléphone)", value: "phone" },
                        { label: "Formulaire de contact", value: "contact" },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Contenu",
          fields: [
            {
              name: "intro",
              type: "group",
              label: "Encart d'introduction",
              admin: { description: "Laisser le titre vide pour ne pas afficher la section." },
              fields: [
                { name: "title", type: "text", label: "Titre" },
                { name: "body", type: "textarea", label: "Texte" },
              ],
            },
            {
              name: "features",
              type: "array",
              label: "Encarts image + texte",
              labels: { singular: "encart", plural: "encarts" },
              admin: { description: "Sections alternées image/texte." },
              fields: [
                { name: "title", type: "text", label: "Titre", required: true },
                { name: "body", type: "textarea", label: "Texte", required: true },
                { name: "image", type: "upload", relationTo: "media", label: "Image", required: true },
                {
                  name: "imageSide",
                  type: "select",
                  label: "Position de l'image",
                  defaultValue: "left",
                  options: [
                    { label: "À gauche", value: "left" },
                    { label: "À droite", value: "right" },
                  ],
                },
                {
                  name: "ctaLabel",
                  type: "text",
                  label: "Bouton (texte)",
                  admin: { description: "Laisser vide pour ne pas afficher de bouton." },
                },
                {
                  name: "ctaHref",
                  type: "text",
                  label: "Bouton (lien)",
                  admin: { description: "Ex : /depannage-electrique" },
                },
              ],
            },
            {
              name: "servicesTitle",
              type: "text",
              label: "Titre de la grille de prestations",
            },
            {
              name: "servicesIntro",
              type: "textarea",
              label: "Introduction de la grille",
            },
            {
              name: "services",
              type: "array",
              label: "Cartes de prestations",
              labels: { singular: "carte", plural: "cartes" },
              fields: [
                { name: "title", type: "text", label: "Titre", required: true },
                { name: "description", type: "textarea", label: "Description", required: true },
                { name: "image", type: "upload", relationTo: "media", label: "Image", required: true },
              ],
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
