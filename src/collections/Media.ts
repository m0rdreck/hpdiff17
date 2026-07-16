import type { CollectionConfig } from "payload";

/**
 * Images uploadées depuis le back-office (stockées sur Vercel Blob).
 * `alt` est obligatoire : il alimente l'attribut alt des <Image>, donc
 * l'accessibilité et le SEO.
 */
export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Média", plural: "Médias" },
  admin: { group: "Contenu" },
  access: {
    // Les images sont servies sur le site public.
    read: () => true,
  },
  upload: {
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      label: "Texte alternatif",
      required: true,
      admin: {
        description:
          "Décrit l'image pour les lecteurs d'écran et Google. Ex : « Tableau électrique remis aux normes à Saintes ».",
      },
    },
  ],
};
