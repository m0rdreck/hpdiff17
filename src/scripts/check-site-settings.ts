/**
 * Vérification EN LECTURE SEULE du global « site-settings ».
 * Sert à contrôler l'état d'une base (prod comprise) avant un déploiement.
 * N'écrit rien.
 *
 * Usage : pnpm check:site:prod
 */
import config from "@payload-config";
import { getPayload } from "payload";

const payload = await getPayload({ config });
const s = await payload.findGlobal({ slug: "site-settings", depth: 1 });

if (!s?.name) {
  console.error("✗ global VIDE — ne pas déployer, le site perdrait ses coordonnées.");
  process.exit(1);
}

const badges = s.trustBadges ?? [];
const iconsOk = badges.every((b) => typeof b.icon === "object" && b.icon?.url);

console.log("  nom       :", s.name);
console.log("  téléphone :", s.phone?.display, "/", s.phone?.e164);
console.log(
  "  adresse   :",
  [s.address?.street, s.address?.postalCode, s.address?.city].filter(Boolean).join(", "),
);
console.log("  rayon     :", s.serviceRadiusKm, "km");
console.log("  horaires  :", (s.hours ?? []).length, "lignes");
console.log("  badges    :", badges.length, iconsOk ? "(icônes OK)" : "(⚠️ icône manquante)");
console.log("  avis      :", (s.reviews ?? []).length);
console.log("  FAQ       :", (s.faq ?? []).length, "questions");
console.log("  liens     :", (s.sameAs ?? []).length);

const guides = await payload.count({ collection: "guides" });
console.log("  guides    :", guides.totalDocs);

const areas = await payload.find({ collection: "service-areas", limit: 0, depth: 0 });
const withPage = areas.docs.filter((a) => a.slug);
const base = areas.docs.filter((a) => a.base);
console.log(
  "  communes  :",
  areas.totalDocs,
  `(${withPage.length} avec page, ${base.length} de rattachement)`,
);

// Une commune sans slug ET sans être « base » n'aurait pas de page : anomalie.
const orphans = areas.docs.filter((a) => !a.slug && !a.base).map((a) => a.name);
if (orphans.length) console.log("  ⚠️ sans slug ni rattachement :", orphans.join(", "));

const ok = iconsOk && areas.totalDocs > 0 && !orphans.length;
console.log(ok ? "\n✓ prêt pour le déploiement" : "\n✗ problème détecté");
process.exit(ok ? 0 : 1);
