import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Corrige le SIRET : l'ancienne valeur seedée (…00078) était erronée, la bonne
 * est …00086.
 *
 * Posée en migration plutôt que par saisie back-office pour que la prod se mette
 * à jour au prochain `payload migrate` du build, et que la valeur reste versionnée.
 *
 * Le `WHERE siret = '47769215600078'` cible précisément l'ancienne valeur : si
 * quelqu'un a saisi autre chose entre-temps dans le back-office, on ne l'écrase pas.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "site_settings" SET "siret" = '47769215600086' WHERE "siret" = '47769215600078';
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "site_settings" SET "siret" = '47769215600078' WHERE "siret" = '47769215600086';
  `)
}
