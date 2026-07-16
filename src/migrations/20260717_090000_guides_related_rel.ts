import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * « Prestations liées » des guides : liste figée → vraie relation.
 *
 * ÉCRITE À LA MAIN, volontairement. `payload migrate:create` ne convient pas
 * ici pour deux raisons :
 *   1. il pose une question interactive (drizzle ne sait pas distinguer une
 *      création d'un renommage quand une table est supprimée et une autre
 *      créée dans le même diff) ;
 *   2. surtout, il ne migrerait AUCUNE donnée : les liens des guides
 *      existants seraient perdus en silence.
 *
 * Ordre impératif : créer les nouvelles tables → COPIER les liens → seulement
 * ensuite supprimer les anciennes. La copie fait la jointure sur le slug de
 * la prestation (`guides_related_services.value` contenait le slug).
 *
 * Le schéma cible reproduit exactement celui généré par Payload pour un champ
 * `relationship hasMany` (relevé sur une base poussée en mode dev).
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  // --- 1. Nouvelles tables de relation ---
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "guides_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "service_details_id" integer
    );

    CREATE TABLE IF NOT EXISTS "_guides_v_rels" (
      "id" serial PRIMARY KEY NOT NULL,
      "order" integer,
      "parent_id" integer NOT NULL,
      "path" varchar NOT NULL,
      "service_details_id" integer
    );

    ALTER TABLE "guides_rels"
      ADD CONSTRAINT "guides_rels_parent_fk"
      FOREIGN KEY ("parent_id") REFERENCES "public"."guides"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "guides_rels"
      ADD CONSTRAINT "guides_rels_service_details_fk"
      FOREIGN KEY ("service_details_id") REFERENCES "public"."service_details"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "_guides_v_rels"
      ADD CONSTRAINT "_guides_v_rels_parent_fk"
      FOREIGN KEY ("parent_id") REFERENCES "public"."_guides_v"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "_guides_v_rels"
      ADD CONSTRAINT "_guides_v_rels_service_details_fk"
      FOREIGN KEY ("service_details_id") REFERENCES "public"."service_details"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "guides_rels_order_idx" ON "guides_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "guides_rels_parent_idx" ON "guides_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "guides_rels_path_idx" ON "guides_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "guides_rels_service_details_id_idx" ON "guides_rels" USING btree ("service_details_id");
    CREATE INDEX IF NOT EXISTS "_guides_v_rels_order_idx" ON "_guides_v_rels" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "_guides_v_rels_parent_idx" ON "_guides_v_rels" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "_guides_v_rels_path_idx" ON "_guides_v_rels" USING btree ("path");
    CREATE INDEX IF NOT EXISTS "_guides_v_rels_service_details_id_idx" ON "_guides_v_rels" USING btree ("service_details_id");
  `)

  // --- 2. Reprise des liens existants (slug → id de la prestation) ---
  //     La jointure ignore d'elle-même un slug sans prestation correspondante.
  await db.execute(sql`
    INSERT INTO "guides_rels" ("order", "parent_id", "path", "service_details_id")
    SELECT grs."order", grs."parent_id", 'relatedServices', sd."id"
    FROM "guides_related_services" grs
    JOIN "service_details" sd ON sd."slug" = grs."value"::text
    ORDER BY grs."parent_id", grs."order";
  `)

  await db.execute(sql`
    INSERT INTO "_guides_v_rels" ("order", "parent_id", "path", "service_details_id")
    SELECT v."order", v."parent_id", 'version.relatedServices', sd."id"
    FROM "_guides_v_version_related_services" v
    JOIN "service_details" sd ON sd."slug" = v."value"::text
    ORDER BY v."parent_id", v."order";
  `)

  // --- 3. Suppression de l'ancien modèle, une fois les liens recopiés ---
  await db.execute(sql`
    DROP TABLE "guides_related_services" CASCADE;
    DROP TABLE "_guides_v_version_related_services" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_guides_related_services";
    DROP TYPE IF EXISTS "public"."enum__guides_v_version_related_services";
  `)
}

/**
 * Retour arrière : recrée le modèle « liste figée » et y recopie les liens.
 * Les prestations créées depuis le back-office n'ont pas de valeur dans
 * l'énumération : leurs liens ne peuvent pas être restitués et sont ignorés.
 */
export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_guides_related_services" AS ENUM('tableau-electrique', 'renovation-electrique', 'mise-aux-normes-electriques', 'installation-electrique');
    CREATE TYPE "public"."enum__guides_v_version_related_services" AS ENUM('tableau-electrique', 'renovation-electrique', 'mise-aux-normes-electriques', 'installation-electrique');

    CREATE TABLE IF NOT EXISTS "guides_related_services" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "value" "enum_guides_related_services",
      "id" serial PRIMARY KEY NOT NULL
    );

    CREATE TABLE IF NOT EXISTS "_guides_v_version_related_services" (
      "order" integer NOT NULL,
      "parent_id" integer NOT NULL,
      "value" "enum__guides_v_version_related_services",
      "id" serial PRIMARY KEY NOT NULL
    );

    ALTER TABLE "guides_related_services"
      ADD CONSTRAINT "guides_related_services_parent_fk"
      FOREIGN KEY ("parent_id") REFERENCES "public"."guides"("id")
      ON DELETE cascade ON UPDATE no action;

    ALTER TABLE "_guides_v_version_related_services"
      ADD CONSTRAINT "_guides_v_version_related_services_parent_fk"
      FOREIGN KEY ("parent_id") REFERENCES "public"."_guides_v"("id")
      ON DELETE cascade ON UPDATE no action;

    CREATE INDEX IF NOT EXISTS "guides_related_services_order_idx" ON "guides_related_services" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "guides_related_services_parent_idx" ON "guides_related_services" USING btree ("parent_id");
    CREATE INDEX IF NOT EXISTS "_guides_v_version_related_services_order_idx" ON "_guides_v_version_related_services" USING btree ("order");
    CREATE INDEX IF NOT EXISTS "_guides_v_version_related_services_parent_idx" ON "_guides_v_version_related_services" USING btree ("parent_id");
  `)

  await db.execute(sql`
    INSERT INTO "guides_related_services" ("order", "parent_id", "value")
    SELECT r."order", r."parent_id", sd."slug"::"public"."enum_guides_related_services"
    FROM "guides_rels" r
    JOIN "service_details" sd ON sd."id" = r."service_details_id"
    WHERE r."path" = 'relatedServices'
      AND sd."slug" IN ('tableau-electrique', 'renovation-electrique', 'mise-aux-normes-electriques', 'installation-electrique');
  `)

  await db.execute(sql`
    DROP TABLE "guides_rels" CASCADE;
    DROP TABLE "_guides_v_rels" CASCADE;
  `)
}
