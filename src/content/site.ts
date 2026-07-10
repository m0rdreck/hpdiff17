import type { SiteConfig } from "./types";

/**
 * Configuration globale du site.
 * → Point d'entrée unique pour toutes les informations de l'entreprise.
 *   Modifiez ici : coordonnées, horaires, zones d'intervention, avis, FAQ.
 */
export const site: SiteConfig = {
  name: "HP DIFF",
  legalName: "HP DIFF",
  slogan: "Électricien à Saintes",
  description:
    "HP Diff est une entreprise d’électricité générale à Saintes. Installation, rénovation et dépannage électriques : contactez votre électricien pour une intervention adaptée à vos besoins.",
  url: "https://www.hpdiff-17.fr",
  logo: "/images/logo.png",

  phone: { display: "06 68 87 49 41", e164: "+33668874941" },
  email: "contact@hpdiff-17.fr",

  address: {
    street: "16 Rue Montplaisir",
    postalCode: "17100",
    city: "Saintes",
    country: "France",
  },
  googleMapsUrl:
    "https://www.google.com/maps/place/Hp+Diff/data=!4m2!3m1!1s0x0:0xed46889e09c6b0b6",

  hours: [
    { label: "Lundi – Vendredi", value: "8 h – 18 h" },
    { label: "Samedi", value: "Urgence dépannage : 8 h – 12 h" },
    { label: "Dimanche", value: "Fermé" },
  ],

  serviceRadiusKm: 30,
  serviceAreas: [
    { name: "Saintes" },
    { name: "Chaniers" },
    { name: "Corme-Royal" },
    { name: "Fontcouverte" },
    { name: "Les Gonds" },
  ],

  nav: [
    { label: "Accueil", href: "/" },
    { label: "Dépannage électrique", href: "/depannage-electrique" },
    { label: "Électricité générale", href: "/electricite-generale" },
    { label: "Contact", href: "/contact" },
  ],

  trustBadges: [
    { icon: "/images/experience.png", label: "Plus de 15 ans d’expérience" },
    { icon: "/images/garantie.png", label: "Garantie décennale", invert: true },
    { icon: "/images/ecoute.png", label: "À l’écoute de vos besoins" },
  ],

  reviews: [
    {
      author: "Sébastien M.",
      rating: 5,
      text: "Intervention rapide et soignée pour la remise aux normes de mon tableau électrique. Travail sérieux, je recommande vivement.",
    },
    {
      author: "Claire D.",
      rating: 5,
      text: "Très à l’écoute, ponctuel et de bon conseil. Dépannage réalisé le jour même, tout fonctionne parfaitement.",
    },
    {
      author: "Julien P.",
      rating: 5,
      text: "Installation électrique complète de notre rénovation. Un professionnel rigoureux et transparent sur les tarifs.",
    },
  ],

  faq: [
    {
      question: "Dans quelles zones intervenez-vous ?",
      answer:
        "J’interviens à Saintes et dans un rayon d’environ 30 km : Chaniers, Corme-Royal, Fontcouverte, Les Gonds et les communes alentour.",
    },
    {
      question: "Proposez-vous un dépannage en urgence ?",
      answer:
        "Oui. J’assure un service de dépannage électrique, avec une permanence le samedi de 8 h à 12 h pour les urgences. Appelez-moi pour une intervention rapide.",
    },
    {
      question: "Vos installations sont-elles garanties ?",
      answer:
        "Toutes mes interventions sont couvertes par la garantie décennale et réalisées dans le respect des normes électriques en vigueur (NF C 15-100).",
    },
    {
      question: "Comment obtenir un devis ?",
      answer:
        "Le devis est gratuit et sans engagement. Contactez-moi par téléphone ou via le formulaire de contact en décrivant votre projet, je vous réponds rapidement.",
    },
  ],
};
