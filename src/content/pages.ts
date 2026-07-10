import type { Page } from "./types";

/**
 * Contenu des pages du site (accueil + pages services).
 * Chaque page est un objet `Page` : hero, sections, cartes de prestations…
 * Pour ajouter/éditer une page, il suffit de modifier ce fichier.
 */

const home: Page = {
  slug: "/",
  seo: {
    title: "Électricien à Saintes | HP Diff, électricité générale & dépannage",
    description:
      "HP Diff, votre électricien à Saintes : installation, rénovation, mise aux normes et dépannage électrique. Plus de 15 ans d’expérience. Devis gratuit.",
    path: "/",
  },
  hero: {
    eyebrow: "Électricité générale · Saintes (17)",
    title: "Électricien",
    highlight: "à Saintes",
    text: "HP Diff vous accompagne dans la réalisation de tous vos travaux d’électricité générale à Saintes. Pose d’appareils électriques, dépannage ou remise aux normes : je réponds à chacun de vos besoins.",
    image: "/images/hero.webp",
    imageAlt: "Électricien à Saintes en intervention",
    ctas: [
      { label: "Appelez votre électricien", href: "tel:+33668874941", variant: "primary", icon: "phone" },
      { label: "Demandez votre devis", href: "/contact", variant: "outline", icon: "arrow" },
    ],
  },
  features: [
    {
      id: "depannage",
      title: "Service de dépannage électrique",
      body: "Je réalise tous types de dépannages électriques afin de diagnostiquer rapidement les pannes et de rétablir le bon fonctionnement de vos installations. J’interviens pour effectuer les réparations nécessaires sur votre réseau électrique.",
      image: "/images/depannage.webp",
      imageAlt: "Service de dépannage électrique à Saintes",
      imageSide: "left",
      cta: {
        label: "Bénéficiez de mon service de dépannage",
        href: "/depannage-electrique",
        variant: "primary",
        icon: "arrow",
      },
    },
    {
      id: "qui-suis-je",
      title: "Qui suis-je ?",
      body: "Je suis un électricien avec plus de 15 ans d’expérience. Mon parcours inclut également le domaine de la sonorisation, qui m’a appris la rigueur, la précision et le sens du travail soigné — des qualités essentielles dans mon métier. J’accorde une attention particulière à l’écoute de vos besoins, au suivi de projet et à la fiabilité de chaque intervention, pour un travail sérieux et durable.",
      image: "/images/portrait.webp",
      imageAlt: "Électricien HP Diff à Saintes",
      imageSide: "right",
    },
  ],
  servicesTitle: "Découvrez mes prestations en électricité générale",
  servicesIntro:
    "Spécialiste en électricité générale, j’interviens pour installer, rénover ou mettre en conformité vos circuits électriques. J’assure des prestations complètes visant à garantir des installations fiables, conformes aux normes en vigueur et adaptées à vos besoins.",
  services: [
    {
      title: "Installation de réseaux électriques",
      description:
        "J’assure l’installation complète des réseaux électriques afin de garantir une distribution fiable et adaptée aux besoins du bâtiment. Câblage des installations neuves, création ou adaptation de points d’alimentation et de circuits dédiés, notamment pour les équipements et les besoins en communication.",
      image: "/images/installation-reseaux.webp",
      imageAlt: "Installation de réseaux électriques",
    },
    {
      title: "Travaux de rénovation électrique",
      description:
        "La rénovation électrique permet de moderniser une installation ancienne ou devenue inadaptée. Remplacement des équipements obsolètes, amélioration de la distribution et sécurisation de l’ensemble du réseau : l’objectif est une installation fiable, conforme aux normes et adaptée à votre usage quotidien.",
      image: "/images/renovation.webp",
      imageAlt: "Travaux de rénovation électrique",
    },
  ],
};

const depannage: Page = {
  slug: "/depannage-electrique",
  seo: {
    title: "Dépannage électrique à Saintes | HP Diff, intervention rapide",
    description:
      "HP Diff intervient en dépannage électrique près de Saintes et Chaniers : pannes, tableaux défectueux, disjoncteurs. Diagnostic précis et intervention rapide.",
    path: "/depannage-electrique",
  },
  hero: {
    eyebrow: "Dépannage · Saintes & Chaniers",
    title: "Dépannage",
    highlight: "électrique",
    text: "En cas de panne, de coupure ou de dysfonctionnement, j’interviens rapidement pour diagnostiquer l’origine du problème et rétablir le bon fonctionnement de votre installation en toute sécurité.",
    image: "/images/depannage.webp",
    imageAlt: "Dépannage électrique à Saintes",
    ctas: [
      { label: "Appelez-moi maintenant", href: "tel:+33668874941", variant: "primary", icon: "phone" },
      { label: "Demandez une intervention", href: "/contact", variant: "outline", icon: "arrow" },
    ],
  },
  intro: {
    title: "Confiez-moi le dépannage de vos réseaux électriques",
    body: "J’assure un diagnostic rapide de vos pannes électriques afin d’identifier précisément leur origine et de rétablir le bon fonctionnement de votre installation. Chaque intervention vise à sécuriser votre réseau, prévenir les risques de dysfonctionnement et limiter l’interruption de vos équipements.",
  },
  servicesTitle: "Mes prestations de dépannage",
  services: [
    {
      title: "Recherche et résolution de panne électrique",
      description:
        "J’identifie l’origine de la panne grâce à un diagnostic complet de votre installation. Cette méthode permet de cibler rapidement le dysfonctionnement, d’éviter les remplacements inutiles et de rétablir votre alimentation dans les meilleures conditions.",
      image: "/images/depannage.webp",
      imageAlt: "Recherche et résolution de panne électrique",
    },
    {
      title: "Dépannage du tableau électrique",
      description:
        "Disjoncteur qui saute, protection différentielle qui se déclenche, circuit défaillant : je réalise un diagnostic complet de votre tableau électrique. Vous retrouvez une installation sécurisée, un fonctionnement fiable de vos circuits et une protection adaptée contre les risques.",
      image: "/images/installation-reseaux.webp",
      imageAlt: "Dépannage de tableau électrique",
    },
    {
      title: "Remplacement de disjoncteur, fusible ou interrupteur différentiel",
      description:
        "Je procède au remplacement des équipements de protection défectueux qui ne garantissent plus la sécurité de votre installation. L’objectif : rétablir une protection efficace des circuits et assurer une alimentation fiable, durable et conforme.",
      image: "/images/renovation.webp",
      imageAlt: "Remplacement de disjoncteur et fusible",
    },
    {
      title: "Réparation de prises et interrupteurs défectueux",
      description:
        "Faux contact, coupure, défaut d’alimentation : j’effectue la réparation ou le remplacement des prises et interrupteurs. Une remise en état soignée rétablit un fonctionnement fiable, améliore la sécurité et prévient les pannes récurrentes.",
      image: "/images/portrait.webp",
      imageAlt: "Réparation de prises et interrupteurs",
    },
  ],
};

const electricite: Page = {
  slug: "/electricite-generale",
  seo: {
    title: "Électricité générale à Saintes | HP Diff, installation & rénovation",
    description:
      "HP Diff intervient en électricité générale près de Saintes et Fontcouverte : installation d’appareils, rénovation, mise en conformité. Appelez votre électricien.",
    path: "/electricite-generale",
  },
  hero: {
    eyebrow: "Électricité générale · Saintes & Fontcouverte",
    title: "Électricité",
    highlight: "générale",
    text: "Installation, rénovation ou mise en conformité de vos circuits électriques : j’assure des prestations complètes pour des installations fiables, sûres et conformes aux normes en vigueur.",
    image: "/images/installation-reseaux.webp",
    imageAlt: "Travaux d’électricité générale à Saintes",
    ctas: [
      { label: "Confiez-moi vos travaux", href: "/contact", variant: "primary", icon: "arrow" },
      { label: "Appelez votre électricien", href: "tel:+33668874941", variant: "outline", icon: "phone" },
    ],
  },
  features: [
    {
      id: "installation-appareils",
      title: "Installation d’appareils électriques",
      body: "Besoin de raccorder ou d’installer vos appareils électriques ? Je réalise leur installation pour garantir un fonctionnement conforme à votre installation. Chaque intervention est effectuée avec soin : raccordement propre, mise en service optimale et parfaite stabilité de vos équipements dans le temps.",
      image: "/images/renovation.webp",
      imageAlt: "Installation d’appareils électriques",
      imageSide: "left",
    },
    {
      id: "renovation",
      title: "Travaux de rénovation électrique",
      body: "Je modernise les installations anciennes ou devenues inadaptées : remplacement des équipements obsolètes, amélioration de la distribution et sécurisation de l’ensemble du réseau, pour une installation fiable et conforme aux normes actuelles.",
      image: "/images/depannage.webp",
      imageAlt: "Travaux de rénovation électrique",
      imageSide: "right",
    },
    {
      id: "conformite",
      title: "Mise en conformité des installations électriques",
      body: "Je remets vos installations en conformité avec la norme NF C 15-100 afin de garantir la sécurité des personnes et des biens. Un point essentiel pour la vente, la location ou simplement la tranquillité au quotidien.",
      image: "/images/portrait.webp",
      imageAlt: "Mise en conformité électrique",
      imageSide: "left",
    },
  ],
  servicesTitle: "Réseaux et objets connectés",
  servicesIntro:
    "Au-delà de l’électricité générale, j’interviens sur les réseaux de communication et les équipements connectés de votre logement ou bâtiment.",
  services: [
    {
      title: "Pose et raccordement de box Internet",
      description:
        "Installation de votre box Internet pour un raccordement fiable et immédiatement fonctionnel : vérification du point de connexion, raccordement des équipements et mise en service, pour une connexion stable, performante et durable.",
      image: "/images/installation-reseaux.webp",
      imageAlt: "Pose et raccordement de box Internet",
    },
    {
      title: "Installation de réseaux RJ45 et d’équipements connectés",
      description:
        "Je mets en place des réseaux RJ45 pour structurer vos connexions filaires et optimiser la distribution du réseau dans votre logement ou bâtiment. J’interviens également sur le raccordement d’équipements connectés nécessitant une infrastructure fiable.",
      image: "/images/renovation.webp",
      imageAlt: "Installation de réseaux RJ45 et objets connectés",
    },
  ],
};

export const pages: Record<string, Page> = {
  "/": home,
  "/depannage-electrique": depannage,
  "/electricite-generale": electricite,
};
