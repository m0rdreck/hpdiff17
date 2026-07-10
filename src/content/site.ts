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
  sameAs: [
    "https://www.google.com/maps/place/Hp+Diff/data=!4m2!3m1!1s0x0:0xed46889e09c6b0b6",
  ],
  // Coordonnées de Saintes (à affiner sur l'adresse exacte si besoin).
  geo: { lat: 45.7485, lng: -0.632 },

  hours: [
    { label: "Lundi – Vendredi", value: "8 h – 18 h" },
    { label: "Samedi", value: "Urgence dépannage : 8 h – 12 h" },
    { label: "Dimanche", value: "Fermé" },
  ],
  openingHoursSpec: [
    { days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "08:00", closes: "18:00" },
    { days: ["Sa"], opens: "08:00", closes: "12:00" },
  ],

  serviceRadiusKm: 30,
  serviceAreas: [
    { name: "Saintes", base: true },
    {
      name: "Chaniers",
      slug: "chaniers",
      distanceKm: 5,
      intro:
        "Voisine immédiate de Saintes, Chaniers fait partie de mes communes d’intervention prioritaires pour vos travaux et dépannages électriques.",
    },
    {
      name: "Corme-Royal",
      slug: "corme-royal",
      distanceKm: 12,
      intro:
        "À une douzaine de kilomètres de Saintes, j’interviens à Corme-Royal pour vos installations, rénovations et remises aux normes électriques.",
    },
    {
      name: "Fontcouverte",
      slug: "fontcouverte",
      distanceKm: 6,
      intro:
        "Toute proche de Saintes, Fontcouverte bénéficie de mes services d’électricité générale et de dépannage rapide, particuliers comme professionnels.",
    },
    {
      name: "Les Gonds",
      slug: "les-gonds",
      distanceKm: 4,
      intro:
        "Aux Gonds, à quelques minutes de mon atelier saintais, j’assure vos dépannages et vos travaux d’électricité avec la même exigence de qualité.",
    },
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
