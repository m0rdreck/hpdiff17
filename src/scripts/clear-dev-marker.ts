/**
 * Supprime le marqueur « dev » (batch -1) de la table payload_migrations.
 *
 * Usage : pnpm fix:dev-marker:prod
 *
 * POURQUOI — Payload inscrit cette ligne quand il pousse le schéma en mode
 * dev (`push`). Tant qu'elle existe, `payload migrate` pose une question
 * interactive AVANT toute migration. En build Vercel, il n'y a pas de
 * terminal : la question s'auto-annule, `migrate` sort en code 0 et le build
 * enchaîne — donc **les migrations sont silencieusement sautées** (et le
 * build traîne ~7 min au lieu de 30 s en attendant l'invite).
 *
 * Le flag `--force-accept-warning` NE SERT À RIEN ici : `payload migrate` ne
 * le lit pas (seuls `migrate:create` et `migrate:fresh` l'honorent).
 *
 * SÛRETÉ — cette ligne n'est qu'un drapeau : elle ne décrit aucune migration
 * et supprimer une ligne batch -1 ne modifie AUCUNE table de contenu. Le
 * schéma reste celui décrit par les migrations sur fichier, qui sont
 * conservées. `push: false` (payload.config.ts) empêche sa réapparition.
 */
import config from "@payload-config";
import { getPayload } from "payload";

const payload = await getPayload({ config });

const { docs } = await payload.find({
  collection: "payload-migrations",
  limit: 0,
  sort: "-name",
});

console.log("Lignes de payload_migrations :");
docs.forEach((d) => console.log(`  ${String(d.name).padEnd(34)} batch = ${d.batch}`));

const markers = docs.filter((d) => d.batch === -1);
if (!markers.length) {
  console.log("\n✓ aucun marqueur dev — rien à faire.");
  process.exit(0);
}

for (const m of markers) {
  await payload.delete({ collection: "payload-migrations", id: m.id });
  console.log(`\n- marqueur supprimé : « ${m.name} » (batch ${m.batch})`);
}

const after = await payload.find({ collection: "payload-migrations", limit: 0 });
console.log("\nÉtat final :");
after.docs.forEach((d) => console.log(`  ${String(d.name).padEnd(34)} batch = ${d.batch}`));
console.log("\n✓ terminé — `payload migrate` ne posera plus de question.");
process.exit(0);
