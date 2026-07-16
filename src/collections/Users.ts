import type { CollectionConfig } from "payload";

/**
 * Comptes du back-office (auth intégrée Payload : login, cookie, reset).
 * Le premier compte se crée à la main sur /admin (écran « create first user »).
 */
export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  labels: { singular: "Utilisateur", plural: "Utilisateurs" },
  admin: {
    useAsTitle: "email",
    group: "Administration",
  },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nom",
      required: true,
    },
  ],
};
