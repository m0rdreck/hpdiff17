import type { GlobalConfig } from "payload";
import { revalidatePath } from "next/cache";

/**
 * Configuration globale du site — back-office.
 *
 * Miroir du type `SiteConfig` (src/content/types.ts), À DEUX EXCEPTIONS PRÈS,
 * volontairement NON éditables :
 *   • `nav`  → dérivé du code (zones + prestations). L'exposer permettrait de
 *              casser la navigation sans contrepartie.
 *   • `url` / `logo` → techniques, liés au déploiement et aux fichiers du repo.
 * Ils sont réinjectés depuis `src/content/site.ts` par `src/lib/content.ts`.
 *
 * `serviceAreas` reste également dans site.ts pour l'instant (bloc suivant).
 */

/** Toute modification ici change le site : on purge tout le cache ISR. */
function revalidateSite() {
  try {
    revalidatePath("/", "layout");
  } catch {
    // Hors contexte de requête (scripts) : rien à purger.
  }
}

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Configuration du site",
  admin: {
    group: "Configuration",
    description:
      "Coordonnées, horaires, avis et questions fréquentes. Ces informations apparaissent sur TOUTES les pages du site.",
  },
  access: { read: () => true },
  hooks: {
    afterChange: [() => revalidateSite()],
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Identité",
          fields: [
            { name: "name", type: "text", label: "Nom commercial", required: true },
            { name: "legalName", type: "text", label: "Raison sociale", required: true },
            {
              name: "siret",
              type: "text",
              label: "SIRET",
              admin: {
                description:
                  "14 chiffres. Obligatoire dans les mentions légales. Saisissez-le avec ou sans espaces : la mise en forme est automatique.",
              },
              validate: (value: string | null | undefined) => {
                if (!value) return true; // facultatif
                const digits = value.replace(/\s/g, "");
                if (!/^\d{14}$/.test(digits)) return "Le SIRET doit comporter exactement 14 chiffres.";
                // Clé de contrôle (formule de Luhn) : détecte les fautes de frappe.
                let sum = 0;
                for (let i = 0; i < digits.length; i++) {
                  let d = Number(digits[i]);
                  if ((digits.length - 1 - i) % 2 === 1) {
                    d *= 2;
                    if (d > 9) d -= 9;
                  }
                  sum += d;
                }
                if (sum % 10 !== 0) return "Ce SIRET est invalide (clé de contrôle incorrecte). Vérifiez la saisie.";
                return true;
              },
            },
            {
              name: "slogan",
              type: "text",
              label: "Slogan",
              required: true,
              admin: { description: "Utilisé dans le titre des pages. Ex : « Électricien à Saintes »." },
            },
            {
              name: "description",
              type: "textarea",
              label: "Description du site",
              required: true,
              admin: { description: "Meta description de l'accueil et partages sur les réseaux." },
            },
          ],
        },
        {
          label: "Coordonnées",
          fields: [
            {
              name: "phone",
              type: "group",
              label: "Téléphone",
              fields: [
                {
                  name: "display",
                  type: "text",
                  label: "Affiché",
                  required: true,
                  admin: { description: "Tel qu'il apparaît sur le site. Ex : 06 68 87 49 41." },
                },
                {
                  name: "e164",
                  type: "text",
                  label: "Format international",
                  required: true,
                  admin: {
                    description:
                      "Utilisé par les boutons « Appeler ». Format +33… sans espace. Ex : +33668874941.",
                  },
                },
              ],
            },
            { name: "email", type: "email", label: "E-mail" },
            {
              name: "address",
              type: "group",
              label: "Adresse",
              fields: [
                { name: "street", type: "text", label: "Rue", required: true },
                { name: "postalCode", type: "text", label: "Code postal", required: true },
                { name: "city", type: "text", label: "Ville", required: true },
                { name: "country", type: "text", label: "Pays", required: true, defaultValue: "France" },
              ],
            },
            {
              name: "googleMapsUrl",
              type: "text",
              label: "Lien Google Maps",
              required: true,
            },
            {
              name: "sameAs",
              type: "array",
              label: "Liens officiels",
              labels: { singular: "lien", plural: "liens" },
              admin: {
                description:
                  "Fiche Google, réseaux sociaux… Envoyés à Google pour relier le site à l'entreprise.",
              },
              fields: [{ name: "url", type: "text", label: "URL", required: true }],
            },
            {
              name: "geo",
              type: "group",
              label: "Coordonnées GPS",
              admin: { description: "Position de l'établissement, envoyée à Google (SEO local)." },
              fields: [
                { name: "lat", type: "number", label: "Latitude", required: true },
                { name: "lng", type: "number", label: "Longitude", required: true },
              ],
            },
          ],
        },
        {
          label: "Horaires",
          fields: [
            {
              name: "hours",
              type: "array",
              label: "Horaires affichés",
              required: true,
              minRows: 1,
              labels: { singular: "ligne", plural: "lignes" },
              admin: { description: "Texte libre, affiché tel quel sur le site." },
              fields: [
                {
                  name: "label",
                  type: "text",
                  label: "Jours",
                  required: true,
                  admin: { description: "Ex : « Lundi – Vendredi »." },
                },
                {
                  name: "value",
                  type: "text",
                  label: "Horaire",
                  required: true,
                  admin: { description: "Ex : « 8 h – 18 h » ou « Fermé »." },
                },
              ],
            },
            {
              name: "openingHoursSpec",
              type: "array",
              label: "Horaires structurés (Google)",
              labels: { singular: "créneau", plural: "créneaux" },
              admin: {
                description:
                  "Version machine des horaires, envoyée à Google. À garder cohérente avec les horaires affichés ci-dessus.",
              },
              fields: [
                {
                  name: "days",
                  type: "select",
                  label: "Jours",
                  hasMany: true,
                  required: true,
                  options: [
                    { label: "Lundi", value: "Mo" },
                    { label: "Mardi", value: "Tu" },
                    { label: "Mercredi", value: "We" },
                    { label: "Jeudi", value: "Th" },
                    { label: "Vendredi", value: "Fr" },
                    { label: "Samedi", value: "Sa" },
                    { label: "Dimanche", value: "Su" },
                  ],
                },
                { name: "opens", type: "text", label: "Ouverture", required: true, admin: { description: "Format 24 h. Ex : 08:00." } },
                { name: "closes", type: "text", label: "Fermeture", required: true, admin: { description: "Format 24 h. Ex : 18:00." } },
              ],
            },
            {
              name: "serviceRadiusKm",
              type: "number",
              label: "Rayon d'intervention (km)",
              required: true,
              min: 1,
              admin: {
                description:
                  "Affiché sur le site (« dans un rayon d'environ X km ») et dans la FAQ.",
              },
            },
          ],
        },
        {
          label: "Confiance",
          fields: [
            {
              name: "trustBadges",
              type: "array",
              label: "Badges de confiance",
              labels: { singular: "badge", plural: "badges" },
              admin: { description: "Bandeau affiché sous le hero des pages." },
              fields: [
                { name: "icon", type: "upload", relationTo: "media", label: "Icône", required: true },
                { name: "label", type: "text", label: "Texte", required: true },
                {
                  name: "invert",
                  type: "checkbox",
                  label: "Inverser la couleur de l'icône",
                  admin: { description: "À cocher pour une icône noire, afin de la passer en blanc." },
                },
              ],
            },
            {
              name: "reviews",
              type: "array",
              label: "Avis clients",
              labels: { singular: "avis", plural: "avis" },
              admin: {
                description:
                  "⚠️ UNIQUEMENT de VRAIS avis clients — publier de faux avis est illégal en France. Recopiez vos avis Google à l'identique. La section « avis » et la note moyenne apparaissent dès qu'un avis est présent.",
              },
              fields: [
                { name: "author", type: "text", label: "Auteur", required: true },
                {
                  name: "rating",
                  type: "number",
                  label: "Note sur 5",
                  required: true,
                  min: 0,
                  max: 5,
                },
                { name: "text", type: "textarea", label: "Avis", required: true },
                {
                  name: "date",
                  type: "date",
                  label: "Date",
                  admin: { date: { pickerAppearance: "dayOnly", displayFormat: "dd/MM/yyyy" } },
                },
              ],
            },
            {
              name: "faq",
              type: "array",
              label: "Questions fréquentes",
              required: true,
              minRows: 1,
              labels: { singular: "question", plural: "questions" },
              admin: {
                description:
                  "Affichées sur l'accueil et les pages ville, et envoyées à Google (FAQ schema).",
              },
              fields: [
                { name: "question", type: "text", label: "Question", required: true },
                { name: "answer", type: "textarea", label: "Réponse", required: true },
              ],
            },
          ],
        },
      ],
    },
  ],
};
