import type { ServiceDetail } from "./types";

/**
 * Pages de service détaillées (cluster SEO autour de la page pilier
 * « Électricité générale »). Chaque entrée cible une requête précise.
 * Contenu unique par page pour éviter le contenu dupliqué.
 */

const phoneCta = {
  label: "Appelez votre électricien",
  href: "tel:+33668874941",
  variant: "outline" as const,
  icon: "phone" as const,
};
const devisCta = {
  label: "Demandez votre devis",
  href: "/contact",
  variant: "primary" as const,
  icon: "arrow" as const,
};

const tableau: ServiceDetail = {
  slug: "tableau-electrique",
  seo: {
    title: "Tableau électrique à Saintes | Installation & remplacement — HP Diff",
    description:
      "Installation, remplacement et mise en conformité de tableau électrique à Saintes. Disjoncteurs, différentiels, protection : une installation sûre et aux normes. Devis gratuit.",
    path: "/tableau-electrique",
  },
  hero: {
    eyebrow: "Prestation · Saintes (17)",
    title: "Tableau",
    highlight: "électrique",
    text: "Cœur de votre installation, le tableau électrique protège votre logement et ses occupants. J’assure sa pose, son remplacement et sa mise en conformité pour une distribution fiable et sécurisée.",
    image: "/images/installation-reseaux.webp",
    imageAlt: "Installation de tableau électrique à Saintes",
    ctas: [devisCta, phoneCta],
  },
  intro:
    "Le tableau électrique répartit et protège l’ensemble des circuits de votre habitation. Un tableau vétuste, sous-dimensionné ou non conforme représente un vrai risque (surchauffe, court-circuit, électrocution). J’interviens à Saintes et alentour pour installer un tableau neuf, remplacer un ancien tableau à fusibles ou remettre le vôtre aux normes en vigueur.",
  benefits: [
    {
      title: "Installation de tableau neuf",
      text: "Pose d’un tableau dimensionné selon votre logement et vos usages, avec repérage clair de chaque circuit.",
    },
    {
      title: "Remplacement de tableau vétuste",
      text: "Dépose des anciens tableaux à fusibles et remplacement par un tableau moderne à disjoncteurs, plus sûr et plus pratique.",
    },
    {
      title: "Protections adaptées",
      text: "Installation et calibrage des disjoncteurs et interrupteurs différentiels pour protéger les personnes et les biens.",
    },
    {
      title: "Mise en conformité du tableau",
      text: "Ajout de la protection différentielle, de la liaison à la terre et du parafoudre si nécessaire, selon la norme NF C 15-100.",
    },
  ],
  steps: [
    { title: "Diagnostic", text: "J’analyse votre installation existante et vos besoins réels." },
    { title: "Devis clair", text: "Vous recevez un devis détaillé et gratuit, sans surprise." },
    { title: "Intervention", text: "Pose ou remplacement soigné, avec repérage et test de chaque circuit." },
    { title: "Vérification", text: "Contrôle du bon fonctionnement et remise d’un tableau conforme." },
  ],
  related: ["mise-aux-normes-electriques", "renovation-electrique", "installation-electrique"],
};

const renovation: ServiceDetail = {
  slug: "renovation-electrique",
  seo: {
    title: "Rénovation électrique à Saintes | HP Diff, électricien",
    description:
      "Rénovation électrique à Saintes : modernisation, sécurisation et remise aux normes de votre installation. Rénovation partielle ou complète. Devis gratuit et sans engagement.",
    path: "/renovation-electrique",
  },
  hero: {
    eyebrow: "Prestation · Saintes (17)",
    title: "Rénovation",
    highlight: "électrique",
    text: "Une installation ancienne devient vite dangereuse et inadaptée. Je rénove votre réseau électrique pour le rendre sûr, fonctionnel et conforme, en partie ou en totalité.",
    image: "/images/renovation.webp",
    imageAlt: "Rénovation électrique à Saintes",
    ctas: [devisCta, phoneCta],
  },
  intro:
    "Fils dénudés, prises qui chauffent, absence de terre, tableau obsolète : les installations anciennes ne répondent plus aux usages ni à la sécurité d’aujourd’hui. J’accompagne les particuliers de Saintes et des environs dans la rénovation de leur installation électrique, du simple rafraîchissement à la reprise complète du réseau.",
  benefits: [
    {
      title: "Rénovation partielle ou totale",
      text: "Reprise ciblée d’une pièce ou refonte complète du réseau selon l’état de l’installation et votre budget.",
    },
    {
      title: "Remplacement du réseau vétuste",
      text: "Changement des câblages, gaines, prises et interrupteurs qui ne garantissent plus la sécurité.",
    },
    {
      title: "Sécurisation de l’installation",
      text: "Mise à la terre, protections différentielles et suppression des points dangereux.",
    },
    {
      title: "Adaptation à vos usages",
      text: "Ajout de prises, de points lumineux et de circuits dédiés pour vos équipements actuels.",
    },
  ],
  steps: [
    { title: "État des lieux", text: "Diagnostic de l’installation existante et de ses points faibles." },
    { title: "Proposition", text: "Devis détaillé avec priorités et solutions adaptées à votre budget." },
    { title: "Travaux", text: "Rénovation soignée, en limitant la gêne au quotidien." },
    { title: "Conformité", text: "Installation remise aux normes et testée avant restitution." },
  ],
  related: ["mise-aux-normes-electriques", "tableau-electrique", "installation-electrique"],
};

const conformite: ServiceDetail = {
  slug: "mise-aux-normes-electriques",
  seo: {
    title: "Mise aux normes électriques à Saintes (NF C 15-100) | HP Diff",
    description:
      "Mise aux normes et remise en conformité de votre installation électrique à Saintes selon la norme NF C 15-100. Idéal pour la vente, la location ou votre sécurité. Devis gratuit.",
    path: "/mise-aux-normes-electriques",
  },
  hero: {
    eyebrow: "Prestation · Saintes (17)",
    title: "Mise aux",
    highlight: "normes",
    text: "Vente, location ou simple tranquillité : je remets votre installation électrique en conformité avec la norme NF C 15-100 pour garantir la sécurité des personnes et des biens.",
    image: "/images/depannage.webp",
    imageAlt: "Mise aux normes électriques à Saintes",
    ctas: [devisCta, phoneCta],
  },
  intro:
    "La norme NF C 15-100 encadre la sécurité des installations électriques des logements. Une installation non conforme peut empêcher une vente, compliquer une location et surtout exposer les occupants à des risques. J’identifie les non-conformités de votre installation à Saintes et je réalise les travaux nécessaires pour la mettre en règle.",
  benefits: [
    {
      title: "Diagnostic de conformité",
      text: "Repérage des écarts avec la norme NF C 15-100 : terre, différentiels, tableau, points dangereux.",
    },
    {
      title: "Mise à la terre & différentiels",
      text: "Mise en place ou reprise de la liaison à la terre et des protections différentielles indispensables.",
    },
    {
      title: "Tableau conforme",
      text: "Mise à niveau du tableau électrique et de ses protections selon les exigences actuelles.",
    },
    {
      title: "Sécurisation des pièces d’eau",
      text: "Respect des volumes de protection dans la salle de bains et les zones humides.",
    },
  ],
  steps: [
    { title: "Contrôle", text: "Vérification complète de l’installation et des non-conformités." },
    { title: "Devis", text: "Liste claire des travaux nécessaires et devis gratuit." },
    { title: "Mise en conformité", text: "Réalisation des travaux dans le respect de la norme." },
    { title: "Attestation", text: "Installation sécurisée, prête pour la vente ou la location." },
  ],
  related: ["tableau-electrique", "renovation-electrique", "installation-electrique"],
};

const installation: ServiceDetail = {
  slug: "installation-electrique",
  seo: {
    title: "Installation électrique à Saintes | Prises, circuits — HP Diff",
    description:
      "Installation électrique à Saintes : neuf, extension, pose de prises et d’interrupteurs, points lumineux et circuits dédiés. Un raccordement propre et conforme. Devis gratuit.",
    path: "/installation-electrique",
  },
  hero: {
    eyebrow: "Prestation · Saintes (17)",
    title: "Installation",
    highlight: "électrique",
    text: "Neuf, extension ou ajout d’équipements : je réalise vos installations électriques avec soin, pour un raccordement propre, fiable et conforme aux normes.",
    image: "/images/hero.webp",
    imageAlt: "Installation électrique à Saintes",
    ctas: [devisCta, phoneCta],
  },
  intro:
    "Que vous construisiez, agrandissiez ou souhaitiez simplement ajouter des prises et des points lumineux, je réalise votre installation électrique à Saintes dans les règles de l’art. Chaque circuit est dimensionné, protégé et repéré pour un usage sûr et durable au quotidien.",
  benefits: [
    {
      title: "Installation neuve",
      text: "Câblage complet des logements neufs : circuits, points d’alimentation et raccordements.",
    },
    {
      title: "Pose de prises & interrupteurs",
      text: "Ajout ou déplacement de prises, d’interrupteurs et de points lumineux là où vous en avez besoin.",
    },
    {
      title: "Circuits dédiés",
      text: "Création de circuits spécialisés pour vos gros équipements (four, plaque, lave-linge…).",
    },
    {
      title: "Raccordement d’équipements",
      text: "Installation et mise en service de vos appareils électriques en toute sécurité.",
    },
  ],
  steps: [
    { title: "Besoin", text: "On définit ensemble vos besoins en prises, éclairage et circuits." },
    { title: "Devis", text: "Devis clair et gratuit adapté à votre projet." },
    { title: "Pose", text: "Installation soignée, câblage repéré et raccordements propres." },
    { title: "Mise en service", text: "Tests et vérification du bon fonctionnement de l’ensemble." },
  ],
  related: ["tableau-electrique", "renovation-electrique", "mise-aux-normes-electriques"],
};

export const serviceDetails: Record<string, ServiceDetail> = {
  [tableau.slug]: tableau,
  [renovation.slug]: renovation,
  [conformite.slug]: conformite,
  [installation.slug]: installation,
};
