# HP DIFF — Site vitrine (Next.js)

Site de **HP Diff**, électricien à Saintes (17) : électricité générale, dépannage,
rénovation et mise aux normes. Version modernisée, claire et animée, construite avec
**Next.js 16 (App Router) + TypeScript + Tailwind CSS 4**.

## Démarrer en local

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build && pnpm start   # build de production
```

## Architecture pensée pour être « administrable » plus tard

Tout le **contenu éditorial** est séparé de la présentation. Les composants React ne
contiennent aucun texte en dur : ils affichent des données.

```
src/
├── content/            ← LE CONTENU (à éditer ici)
│   ├── types.ts        ← modèle de données (typé)
│   ├── site.ts         ← infos entreprise : coordonnées, horaires, zones, avis, FAQ
│   └── pages.ts        ← contenu des pages (hero, sections, prestations)
├── lib/
│   └── content.ts      ← couche d'accès au contenu (getSiteConfig, getPage…)
├── components/         ← présentation (mise en page, sections, UI)
└── app/                ← pages & routing (App Router)
```

### Rendre le site administrable (back-office / CMS)

La couche `src/lib/content.ts` est le **point de bascule**. Ses fonctions sont déjà
`async`. Pour brancher un back-office plus tard, il suffit de réécrire leur corps pour
lire depuis une base de données ou un CMS headless (Sanity, Payload, Strapi, Supabase…)
**sans modifier aucun composant ni aucune page** :

```ts
// Aujourd'hui : lecture de fichiers TypeScript
export async function getSiteConfig() { return site; }

// Demain : lecture depuis un CMS / une base
export async function getSiteConfig() {
  return await cms.fetch("siteConfig");
}
```

## Points techniques

- **SEO** : metadata par page, `sitemap.xml`, `robots.txt`, données structurées
  Schema.org (`Electrician` + `FAQPage`).
- **Images** optimisées via `next/image` (fichiers dans `public/images`).
- **Formulaire de contact** : `POST /api/contact`. Pour l'activer en production,
  brancher l'envoi d'e-mail dans `src/app/api/contact/route.ts` (Resend, Nodemailer…).
- **Animations** : révélation au scroll (`components/ui/Reveal.tsx`), respect de
  `prefers-reduced-motion`, dégradé animé et halos décoratifs.

## Déploiement

Optimisé pour **Vercel** (`vercel deploy`). Aucune configuration spécifique requise :
Next.js est détecté automatiquement.
