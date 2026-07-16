import type { Article } from "./types";

/**
 * Section « Guides & conseils » — contenu éditorial SEO.
 *
 * Chaque article cible une intention de recherche informationnelle
 * (« prix mise aux normes », « quand changer son tableau »…) et renvoie
 * vers les pages de service correspondantes (maillage interne) + un devis.
 *
 * ⚠️ Les fourchettes de prix sont données À TITRE INDICATIF (ordres de
 *    grandeur du marché) et systématiquement renvoyées au devis gratuit :
 *    aucun prix ferme n'est annoncé.
 */

const miseAuxNormes: Article = {
  slug: "prix-mise-aux-normes-electrique",
  title: "Prix d’une mise aux normes électriques : à quoi s’attendre",
  seo: {
    title: "Prix d’une mise aux normes électriques à Saintes | HP Diff",
    description:
      "Combien coûte une mise aux normes électriques (NF C 15-100) ? Fourchettes de prix indicatives, facteurs qui font varier le devis et conseils d’un électricien à Saintes.",
    path: "/guides/prix-mise-aux-normes-electrique",
  },
  excerpt:
    "Mettre son installation électrique aux normes NF C 15-100 rassure, sécurise et conditionne souvent une vente ou une location. Voici les ordres de grandeur de prix et ce qui les fait varier.",
  category: "Budget",
  readingMinutes: 5,
  updated: "2026-07-10",
  image: "/images/depannage.webp",
  imageAlt: "Mise aux normes d’un tableau électrique à Saintes",
  body: [
    {
      type: "p",
      text: "« Combien ça coûte de remettre l’électricité aux normes ? » C’est l’une des questions qu’on me pose le plus souvent à Saintes. La réponse honnête : cela dépend de l’état de votre installation. Une mise en conformité peut aller de quelques ajustements ciblés à une reprise complète du réseau. Cet article vous donne des ordres de grandeur et surtout les facteurs qui font varier le devis.",
    },
    { type: "h2", text: "Ce que couvre une mise aux normes NF C 15-100" },
    {
      type: "p",
      text: "La norme NF C 15-100 encadre la sécurité des installations électriques des logements. Une mise en conformité vise à supprimer les risques d’électrocution et d’incendie. Concrètement, elle porte le plus souvent sur les points suivants :",
    },
    {
      type: "ul",
      items: [
        "La mise à la terre de l’installation et la liaison équipotentielle des pièces d’eau.",
        "La présence de protections différentielles (30 mA) sur le tableau.",
        "Un tableau électrique correctement dimensionné et repéré.",
        "Le respect des volumes de sécurité dans la salle de bains.",
        "La suppression des points dangereux : fils dénudés, prises sans terre, matériel vétuste.",
      ],
    },
    { type: "h2", text: "Les fourchettes de prix (à titre indicatif)" },
    {
      type: "p",
      text: "Impossible de donner un prix unique : tout dépend de la surface, de l’âge du logement et de l’ampleur des travaux. À titre purement indicatif, sur le marché on observe souvent :",
    },
    {
      type: "ul",
      items: [
        "Remplacement d’un tableau électrique seul : généralement quelques centaines d’euros à ~1 500 €.",
        "Mise en conformité partielle (terre, différentiels, quelques circuits) : de l’ordre de 1 000 à 3 000 €.",
        "Rénovation/mise aux normes complète d’un logement ancien : plusieurs milliers d’euros, selon la surface.",
      ],
    },
    {
      type: "callout",
      text: "Ces chiffres sont des ordres de grandeur du marché, pas un tarif. Le seul moyen de connaître le vrai coût est un diagnostic sur place — que je réalise gratuitement à Saintes et alentour.",
    },
    { type: "h2", text: "Ce qui fait varier le devis" },
    {
      type: "ul",
      items: [
        "L’état de départ : une installation récente mais incomplète coûte moins cher qu’un réseau des années 60 à reprendre entièrement.",
        "La surface et le nombre de pièces (donc de circuits et de points d’alimentation).",
        "L’accessibilité : passage des gaines apparent, en saignée ou en faux-plafond.",
        "Le niveau d’équipement souhaité : nombre de prises, circuits dédiés, domotique.",
      ],
    },
    { type: "h2", text: "Faut-il tout faire d’un coup ?" },
    {
      type: "p",
      text: "Pas nécessairement. Quand le budget est serré, je propose souvent une remise en conformité par étapes, en traitant d’abord ce qui présente un risque réel (mise à la terre, protection différentielle, tableau). L’essentiel est de sécuriser en priorité, puis de planifier le reste. Lors du devis, je vous indique clairement ce qui est urgent et ce qui peut attendre.",
    },
  ],
  relatedServices: ["mise-aux-normes-electriques", "tableau-electrique"],
  faq: [
    {
      question: "La mise aux normes est-elle obligatoire pour vendre ou louer ?",
      answer:
        "Un diagnostic électrique est obligatoire pour toute vente d’un logement de plus de 15 ans et pour la location. Il n’impose pas toujours de tout refaire, mais les anomalies dangereuses doivent être corrigées. Je vous aide à cibler les travaux réellement nécessaires.",
    },
    {
      question: "Le devis est-il payant ?",
      answer:
        "Non. Le diagnostic et le devis sont gratuits et sans engagement. Je me déplace à Saintes et dans un rayon d’environ 30 km pour évaluer votre installation.",
    },
  ],
};

const tableau: Article = {
  slug: "quand-changer-tableau-electrique",
  title: "Quand faut-il changer son tableau électrique ? 6 signes qui alertent",
  seo: {
    title: "Quand changer son tableau électrique ? 6 signes | HP Diff Saintes",
    description:
      "Disjoncteur qui saute, fusibles, odeur de brûlé… 6 signes qui montrent qu’il faut remplacer votre tableau électrique. Conseils d’un électricien à Saintes.",
    path: "/guides/quand-changer-tableau-electrique",
  },
  excerpt:
    "Le tableau électrique est le cœur — et le premier organe de sécurité — de votre logement. Voici 6 signaux qui indiquent qu’il est temps de le remplacer.",
  category: "Sécurité",
  readingMinutes: 4,
  updated: "2026-07-08",
  image: "/images/installation-reseaux.webp",
  imageAlt: "Tableau électrique moderne installé à Saintes",
  body: [
    {
      type: "p",
      text: "Le tableau électrique répartit le courant dans toute la maison et protège chaque circuit. Quand il vieillit ou n’est plus adapté, il devient une source de risques : surchauffe, court-circuit, voire départ de feu. Voici les signes qui doivent vous alerter.",
    },
    { type: "h2", text: "1. Il y a encore des fusibles à porcelaine" },
    {
      type: "p",
      text: "Les anciens tableaux à fusibles (parfois à broches ou à porcelaine) n’offrent plus le niveau de protection attendu aujourd’hui. Un tableau moderne à disjoncteurs et interrupteurs différentiels est à la fois plus sûr et bien plus pratique à réarmer.",
    },
    { type: "h2", text: "2. Le disjoncteur saute régulièrement" },
    {
      type: "p",
      text: "Un disjoncteur qui se déclenche de temps en temps fait son travail. Mais s’il saute souvent, c’est le signe d’un circuit surchargé, d’un défaut, ou d’un tableau sous-dimensionné pour vos usages actuels (électroménager, recharge, climatisation…).",
    },
    { type: "h2", text: "3. Absence de protection différentielle 30 mA" },
    {
      type: "p",
      text: "Les interrupteurs différentiels 30 mA protègent les personnes contre l’électrocution. S’ils sont absents ou en nombre insuffisant, l’installation n’est pas conforme et surtout pas sûre.",
    },
    { type: "h2", text: "4. Traces de chaleur, noircissement ou odeur" },
    {
      type: "callout",
      text: "Une odeur de plastique chaud, des traces noires ou un composant qui a fondu sont des signaux d’urgence. Coupez le circuit concerné et faites intervenir un électricien sans attendre.",
    },
    { type: "h2", text: "5. Le tableau est saturé ou anarchique" },
    {
      type: "p",
      text: "Plus de place pour ajouter un circuit, câblage en désordre, aucun repérage des disjoncteurs : un tableau saturé complique tout dépannage et traduit souvent des ajouts successifs mal maîtrisés.",
    },
    { type: "h2", text: "6. Vous rénovez ou vous vendez" },
    {
      type: "p",
      text: "Une rénovation, un agrandissement ou une vente sont le bon moment pour remettre le tableau à niveau : c’est un poste central de la sécurité et de la conformité du logement.",
    },
    { type: "h2", text: "Que faire ?" },
    {
      type: "p",
      text: "Si vous reconnaissez un ou plusieurs de ces signes, faites vérifier votre tableau. J’interviens à Saintes et alentour pour diagnostiquer, puis installer ou remplacer votre tableau électrique avec un repérage clair de chaque circuit.",
    },
  ],
  relatedServices: ["tableau-electrique", "mise-aux-normes-electriques"],
  faq: [
    {
      question: "Combien de temps dure le remplacement d’un tableau ?",
      answer:
        "Le remplacement d’un tableau seul se fait généralement en une journée, avec une courte coupure de courant. Je repère chaque circuit et vérifie le bon fonctionnement avant de partir.",
    },
    {
      question: "Peut-on ajouter un circuit sans changer tout le tableau ?",
      answer:
        "Souvent oui, si le tableau dispose de place et de protections suffisantes. Sinon, mieux vaut le remettre à niveau. Je vous conseille la solution la plus adaptée lors du devis.",
    },
  ],
};

const renovation: Article = {
  slug: "renovation-electrique-maison-ancienne",
  title: "Rénovation électrique d’une maison ancienne : étapes, durée et budget",
  seo: {
    title: "Rénovation électrique d’une maison ancienne | HP Diff Saintes",
    description:
      "Rénover l’électricité d’une maison ancienne : étapes, durée du chantier, budget et pièges à éviter. Les conseils d’un électricien à Saintes (17).",
    path: "/guides/renovation-electrique-maison-ancienne",
  },
  excerpt:
    "Reprendre l’électricité d’une maison ancienne fait peur… souvent à tort. Voici comment se déroule un chantier, combien de temps il prend et comment maîtriser le budget.",
  category: "Rénovation",
  readingMinutes: 6,
  updated: "2026-07-05",
  image: "/images/renovation.webp",
  imageAlt: "Rénovation électrique d’une maison ancienne à Saintes",
  body: [
    {
      type: "p",
      text: "Dans une maison ancienne, l’installation électrique a souvent été rallongée au fil des décennies : pas de terre, prises vétustes, tableau à fusibles, câbles fatigués. La bonne nouvelle, c’est qu’une rénovation bien menée redonne une installation sûre, confortable et durable. Voici comment ça se passe.",
    },
    { type: "h2", text: "Étape 1 — Le diagnostic" },
    {
      type: "p",
      text: "Tout commence par un état des lieux : âge de l’installation, présence de la terre, état du tableau, des câbles et des points dangereux. Ce diagnostic permet de distinguer ce qui est urgent (sécurité) de ce qui relève du confort, et de définir si une rénovation partielle suffit ou si une reprise complète est préférable.",
    },
    { type: "h2", text: "Étape 2 — Partielle ou totale ?" },
    {
      type: "ul",
      items: [
        "Rénovation partielle : on cible une pièce, un circuit ou les points les plus à risque. Idéal quand l’installation est globalement saine.",
        "Rénovation totale : on reprend l’ensemble du réseau (câblage, tableau, prises, éclairage). Recommandée pour les installations très anciennes ou lors d’une grosse rénovation.",
      ],
    },
    { type: "h2", text: "Étape 3 — Les travaux" },
    {
      type: "p",
      text: "Concrètement : remplacement du tableau, création d’une mise à la terre, passage de nouveaux câbles, pose des prises, interrupteurs et points lumineux, ajout de circuits dédiés pour l’électroménager. J’organise le chantier pour limiter la gêne au quotidien, surtout si vous habitez sur place.",
    },
    { type: "h2", text: "Combien de temps ça prend ?" },
    {
      type: "p",
      text: "Une rénovation partielle peut se régler en quelques jours. Une reprise complète sur une maison entière s’étale généralement sur une à plusieurs semaines selon la surface, le nombre de pièces et le mode de passage des gaines (apparent, en saignée, en faux-plafond).",
    },
    { type: "h2", text: "Comment maîtriser le budget" },
    {
      type: "ul",
      items: [
        "Prioriser la sécurité d’abord (terre, différentiels, tableau), le confort ensuite.",
        "Regrouper les travaux avec d’autres postes de rénovation (peinture, sols) pour mutualiser les saignées et reprises.",
        "Anticiper vos besoins futurs (recharge de véhicule, bornes RJ45) pour éviter de rouvrir les murs plus tard.",
      ],
    },
    {
      type: "callout",
      text: "Le budget dépend entièrement de l’état de départ et de la surface. Je vous remets un devis détaillé et gratuit, avec les priorités clairement identifiées.",
    },
  ],
  relatedServices: ["renovation-electrique", "tableau-electrique", "mise-aux-normes-electriques"],
  faq: [
    {
      question: "Peut-on rester dans la maison pendant les travaux ?",
      answer:
        "Le plus souvent oui. J’organise le chantier par zones pour limiter les coupures et la gêne. Sur une reprise complète, quelques interruptions de courant sont à prévoir.",
    },
    {
      question: "Faut-il refaire toute la maison d’un coup ?",
      answer:
        "Non. Une rénovation par étapes est possible : on sécurise d’abord l’essentiel, puis on planifie le reste selon votre budget.",
    },
  ],
};

const panne: Article = {
  slug: "panne-electrique-que-faire",
  title: "Panne électrique : que faire avant d’appeler un électricien ?",
  seo: {
    title: "Panne électrique : que faire ? Le guide | HP Diff Saintes",
    description:
      "Coupure de courant, disjoncteur qui saute, plus d’électricité dans une pièce : les bons réflexes avant d’appeler un électricien. Guide dépannage HP Diff à Saintes.",
    path: "/guides/panne-electrique-que-faire",
  },
  excerpt:
    "Une coupure soudaine ? Avant d’appeler, quelques vérifications simples permettent parfois de rétablir le courant en toute sécurité. Voici la marche à suivre.",
  category: "Dépannage",
  readingMinutes: 4,
  updated: "2026-07-03",
  image: "/images/depannage.webp",
  imageAlt: "Dépannage d’une panne électrique à Saintes",
  body: [
    {
      type: "p",
      text: "Une panne électrique est toujours stressante. Avant de faire intervenir un professionnel, quelques vérifications sans danger permettent parfois d’identifier l’origine du problème — voire de rétablir le courant. Voici les bons réflexes, dans l’ordre.",
    },
    { type: "h2", text: "1. La coupure vient-elle de chez vous ou du quartier ?" },
    {
      type: "p",
      text: "Regardez si vos voisins sont aussi touchés, ou si l’éclairage public est éteint. Si toute la rue est concernée, il s’agit probablement d’une coupure du réseau : rien à faire chez vous, il faut attendre le rétablissement par le gestionnaire.",
    },
    { type: "h2", text: "2. Vérifiez le tableau électrique" },
    {
      type: "ul",
      items: [
        "Ouvrez votre tableau et repérez les manettes en position basse (déclenchées).",
        "Si c’est le disjoncteur général qui a sauté, coupez d’abord les appareils puissants, puis tentez de le réarmer.",
        "Si c’est un différentiel ou un disjoncteur de circuit, remontez la manette. S’il retombe aussitôt, un appareil ou un circuit est en défaut.",
      ],
    },
    { type: "h2", text: "3. Isolez l’appareil en cause" },
    {
      type: "p",
      text: "Si un différentiel saute dès qu’on le réarme, débranchez les appareils du circuit concerné, réarmez, puis rebranchez-les un par un. Celui qui fait sauter à nouveau la protection est probablement défectueux.",
    },
    {
      type: "callout",
      text: "Ne forcez jamais une manette qui refuse de tenir, et ne touchez pas à un câble dénudé ou à une prise qui a chauffé. En cas d’odeur de brûlé, de fumée ou de doute, coupez le courant et appelez un électricien.",
    },
    { type: "h2", text: "4. Quand appeler un professionnel" },
    {
      type: "ul",
      items: [
        "Le courant ne revient pas après réarmement.",
        "Un différentiel saute de façon répétée sans cause identifiable.",
        "Vous constatez une odeur, de la chaleur ou des traces sur le tableau ou une prise.",
        "L’installation est ancienne et vous ne vous sentez pas en sécurité pour manipuler.",
      ],
    },
    {
      type: "p",
      text: "J’assure le dépannage électrique à Saintes et dans les environs, avec une permanence le samedi matin pour les urgences. Un diagnostic précis permet de cibler la panne et d’éviter les remplacements inutiles.",
    },
  ],
  relatedServices: ["tableau-electrique"],
  faq: [
    {
      question: "Est-ce dangereux de réarmer un disjoncteur soi-même ?",
      answer:
        "Réarmer une manette est sans danger si rien ne chauffe et qu’il n’y a pas d’odeur. En revanche, si la protection retombe aussitôt et de façon répétée, ne forcez pas : un défaut est présent et doit être diagnostiqué.",
    },
    {
      question: "Intervenez-vous en urgence le week-end ?",
      answer:
        "J’assure une permanence de dépannage le samedi de 8 h à 12 h. Appelez-moi pour une intervention rapide à Saintes et alentour.",
    },
  ],
};

export const articles: Record<string, Article> = {
  [miseAuxNormes.slug]: miseAuxNormes,
  [tableau.slug]: tableau,
  [renovation.slug]: renovation,
  [panne.slug]: panne,
};

/** Ordre d'affichage sur la page liste (plus récent en premier). */
export const articleOrder: string[] = [
  tableau.slug,
  miseAuxNormes.slug,
  renovation.slug,
  panne.slug,
];
