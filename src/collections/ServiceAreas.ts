import type { CollectionConfig } from "payload";
import { revalidatePath } from "next/cache";

/**
 * Zones d'intervention — back-office.
 *
 * Miroir du type `ServiceArea` (src/content/types.ts).
 *
 * Ajouter une commune ici suffit : sa page /electricien/<slug> est générée
 * automatiquement, et elle apparaît dans le menu « Zones d'intervention »,
 * dans les puces de la section « zone d'intervention », dans le schema.org
 * (areaServed) et dans le sitemap. Rien à toucher dans le code.
 */

/** Une commune modifiée change le menu et les puces → présents sur toutes les pages. */
function revalidateAreas(slug?: string | null) {
  try {
    revalidatePath("/", "layout");
    if (slug) revalidatePath(`/electricien/${slug}`);
  } catch {
    // Hors contexte de requête (scripts) : rien à purger.
  }
}

export const ServiceAreas: CollectionConfig = {
  slug: "service-areas",
  labels: { singular: "Zone d'intervention", plural: "Zones d'intervention" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "distanceKm", "base"],
    group: "Configuration",
    description:
      "Communes où vous intervenez. Chacune obtient sa page /electricien/<slug> et apparaît dans le menu.",
  },
  access: { read: () => true },
  defaultSort: "name",
  hooks: {
    afterChange: [({ doc }) => revalidateAreas(doc?.slug)],
    afterDelete: [({ doc }) => revalidateAreas(doc?.slug)],
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nom de la commune",
      required: true,
      admin: { description: "Tel qu'affiché sur le site. Ex : « Saint-Jean-d'Angély »." },
    },
    {
      name: "base",
      type: "checkbox",
      label: "Commune de rattachement",
      admin: {
        position: "sidebar",
        description:
          "À cocher UNIQUEMENT pour Saintes (siège de l'entreprise). Cette commune n'a pas de page dédiée : c'est déjà l'accueil du site.",
      },
    },
    {
      name: "slug",
      type: "text",
      label: "Slug (URL)",
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
        description:
          "Partie finale de l'adresse : /electricien/mon-slug. Sans accent ni apostrophe (ex : saint-jean-d-angely). À NE PLUS MODIFIER une fois la page indexée par Google.",
        condition: (data) => !data?.base,
      },
      validate: (value: string | null | undefined, { data }: { data: Partial<{ base: boolean }> }) => {
        // La commune de rattachement n'a pas de page → pas de slug attendu.
        if (data?.base) return true;
        if (!value) return "Un slug est obligatoire (sauf pour la commune de rattachement).";
        if (!/^[a-z0-9-]+$/.test(value)) {
          return "Uniquement des minuscules non accentuées, chiffres et tirets. Ex : saint-jean-d-angely.";
        }
        return true;
      },
    },
    {
      name: "distanceKm",
      type: "number",
      label: "Distance depuis Saintes (km)",
      min: 0,
      admin: {
        position: "sidebar",
        description: "Affichée sur la page de la commune. Inutile pour la commune de rattachement.",
        condition: (data) => !data?.base,
      },
    },
    {
      name: "intro",
      type: "textarea",
      label: "Accroche locale",
      admin: {
        description:
          "Phrase d'introduction de la page, en haut. IMPORTANT pour le référencement : écrivez un texte UNIQUE pour chaque commune — un texte recopié d'une ville à l'autre est pénalisé par Google.",
        condition: (data) => !data?.base,
      },
    },
  ],
};
