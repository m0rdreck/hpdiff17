import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Ajoute le SIRET à la configuration du site, et le renseigne.
 *
 * Écrite à la main : l'instantané drizzle (.json) a été régénéré à un moment
 * où le champ existait déjà dans la config, donc `migrate:create` ne voit
 * plus de différence à produire. Le contenu reste trivial — une colonne.
 *
 * La valeur est posée ici plutôt que laissée à une saisie manuelle : sans ça
 * les mentions légales partiraient en production sans SIRET, alors que sa
 * présence y est une obligation légale. Elle reste modifiable dans le
 * back-office ensuite. Le `WHERE siret IS NULL` évite d'écraser une saisie.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" ADD COLUMN IF NOT EXISTS "siret" varchar;
  `)

  await db.execute(sql`
    UPDATE "site_settings" SET "siret" = '47769215600078' WHERE "siret" IS NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "site_settings" DROP COLUMN IF EXISTS "siret";
  `)
}
