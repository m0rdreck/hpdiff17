import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

/**
 * Section « Guides & conseils » — back-office.
 *
 * Ce schéma est le miroir exact du type `Article` (src/content/types.ts).
 * Toute modification ici doit être répercutée dans le mapper
 * `src/lib/content.ts` (fonction `toArticle`), seul endroit qui traduit un
 * document Payload en `Article` consommé par les pages.
 *
 * ⚠️ Les fourchettes de prix restent INDICATIVES : ne jamais annoncer de
 *    tarif ferme, toujours renvoyer au devis gratuit.
 */

/**
 * Purge le cache ISR des pages concernées par un guide.
 *
 * `revalidatePath` n'est utilisable que dans un contexte de requête Next.
 * Depuis le back-office c'est le cas, mais pas depuis un script (seed,
 * migration, tâche planifiée) où il lèverait « static generation store
 * missing ». On échoue donc en silence : rater une purge de cache ne doit
 * jamais faire échouer l'enregistrement du contenu lui-même.
 */
function revalidateGuide(slug?: string) {
  try {
    revalidatePath("/guides");
    if (slug) revalidatePath(`/guides/${slug}`);
    revalidatePath("/sitemap.xml");
  } catch {
    // Hors contexte de requête (script) : rien à purger, le build s'en charge.
  }
}

/**
 * Slugs des pages de prestation (pour le maillage interne des guides).
 * À synchroniser si une prestation est ajoutée ou renommée dans la
 * collection « service-details ».
 */
const SERVICE_SLUGS = [
  { label: "Tableau électrique", value: "tableau-electrique" },
  { label: "Rénovation électrique", value: "renovation-electrique" },
  { label: "Mise aux normes électriques", value: "mise-aux-normes-electriques" },
  { label: "Installation électrique", value: "installation-electrique" },
];

export const Guides: CollectionConfig = {
  slug: "guides",
  labels: { singular: "Guide", plural: "Guides" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "updated", "_status"],
    group: "Contenu",
    description:
      "Articles de conseil publiés sur /guides. Un guide enregistré en brouillon n'apparaît pas sur le site.",
  },
  access: {
    // Lecture publique : le site interroge cette collection.
    read: () => true,
  },
  // Brouillon / publié : Eric peut préparer un guide sans le mettre en ligne.
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  defaultSort: "order",
  hooks: {
    // Le site est en ISR : sans ça, une modification n'apparaîtrait qu'au
    // prochain build. On purge la liste et la page du guide concerné.
    afterChange: [({ doc }) => revalidateGuide(doc?.slug)],
    afterDelete: [({ doc }) => revalidateGuide(doc?.slug)],
  },
  fields: [
    {
      name: "title",
      type: "text",
      label: "Titre affiché",
      required: true,
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
          "Partie finale de l'adresse : /guides/mon-slug. À NE PLUS MODIFIER une fois le guide indexé par Google.",
      },
    },
    {
      name: "order",
      type: "number",
      label: "Ordre d'affichage",
      required: true,
      defaultValue: 100,
      admin: {
        position: "sidebar",
        description: "Les plus petits nombres apparaissent en premier sur /guides.",
      },
    },
    {
      name: "category",
      type: "select",
      label: "Catégorie",
      required: true,
      options: ["Sécurité", "Budget", "Rénovation", "Dépannage"],
      admin: { position: "sidebar" },
    },
    {
      name: "readingMinutes",
      type: "number",
      label: "Temps de lecture (minutes)",
      required: true,
      min: 1,
      admin: { position: "sidebar" },
    },
    {
      name: "updated",
      type: "date",
      label: "Date de mise à jour",
      required: true,
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayOnly", displayFormat: "dd/MM/yyyy" },
        description: "Affichée sur le guide et envoyée à Google (schema).",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      label: "Chapô / résumé",
      required: true,
      admin: {
        description: "Résumé affiché dans la liste des guides et lors des partages.",
      },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Image de couverture",
      required: true,
    },
    {
      name: "body",
      type: "blocks",
      label: "Corps de l'article",
      required: true,
      minRows: 1,
      labels: { singular: "bloc", plural: "blocs" },
      blocks: [
        {
          slug: "p",
          labels: { singular: "Paragraphe", plural: "Paragraphes" },
          fields: [{ name: "text", type: "textarea", label: "Texte", required: true }],
        },
        {
          slug: "h2",
          labels: { singular: "Sous-titre", plural: "Sous-titres" },
          fields: [{ name: "text", type: "text", label: "Sous-titre", required: true }],
        },
        {
          slug: "ul",
          labels: { singular: "Liste à puces", plural: "Listes à puces" },
          fields: [
            {
              name: "items",
              type: "array",
              label: "Puces",
              required: true,
              minRows: 1,
              labels: { singular: "puce", plural: "puces" },
              fields: [{ name: "text", type: "textarea", label: "Texte", required: true }],
            },
          ],
        },
        {
          slug: "callout",
          labels: { singular: "Encadré", plural: "Encadrés" },
          fields: [{ name: "text", type: "textarea", label: "Texte", required: true }],
        },
      ],
    },
    {
      // ⚠️ Liste FIGÉE, à tenir à jour à la main si une prestation est créée
      //    ou renommée dans « Prestations ».
      //    Passer ce champ en `relationship` serait plus juste, MAIS la
      //    migration supprimerait la table qui porte les liens actuels : les
      //    guides existants perdraient leurs prestations liées. La conversion
      //    demande donc une migration de données dédiée — à faire à part.
      name: "relatedServices",
      type: "select",
      label: "Prestations liées",
      hasMany: true,
      options: SERVICE_SLUGS,
      admin: {
        description: "Alimente le maillage interne et les liens en bas de guide.",
      },
    },
    {
      name: "faq",
      type: "array",
      label: "Questions fréquentes",
      labels: { singular: "question", plural: "questions" },
      admin: {
        description: "Affichées en bas du guide et envoyées à Google (FAQ schema).",
      },
      fields: [
        { name: "question", type: "text", label: "Question", required: true },
        { name: "answer", type: "textarea", label: "Réponse", required: true },
      ],
    },
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
          admin: { description: "Idéalement 50-60 caractères. Peut différer du titre affiché." },
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
};
