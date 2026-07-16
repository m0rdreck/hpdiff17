import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_hero_ctas_target" AS ENUM('phone', 'contact');
  CREATE TYPE "public"."enum_pages_features_image_side" AS ENUM('left', 'right');
  CREATE TABLE "pages_hero_ctas" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"target" "enum_pages_hero_ctas_target" DEFAULT 'phone' NOT NULL
  );
  
  CREATE TABLE "pages_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"body" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"image_side" "enum_pages_features_image_side" DEFAULT 'left',
  	"cta_label" varchar,
  	"cta_href" varchar
  );
  
  CREATE TABLE "pages_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_highlight" varchar,
  	"hero_text" varchar NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"intro_title" varchar,
  	"intro_body" varchar,
  	"services_title" varchar,
  	"services_intro" varchar,
  	"seo_title" varchar NOT NULL,
  	"seo_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pages_id" integer;
  ALTER TABLE "pages_hero_ctas" ADD CONSTRAINT "pages_hero_ctas_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_features" ADD CONSTRAINT "pages_features_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_features" ADD CONSTRAINT "pages_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_services" ADD CONSTRAINT "pages_services_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_services" ADD CONSTRAINT "pages_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages" ADD CONSTRAINT "pages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_hero_ctas_order_idx" ON "pages_hero_ctas" USING btree ("_order");
  CREATE INDEX "pages_hero_ctas_parent_id_idx" ON "pages_hero_ctas" USING btree ("_parent_id");
  CREATE INDEX "pages_features_order_idx" ON "pages_features" USING btree ("_order");
  CREATE INDEX "pages_features_parent_id_idx" ON "pages_features" USING btree ("_parent_id");
  CREATE INDEX "pages_features_image_idx" ON "pages_features" USING btree ("image_id");
  CREATE INDEX "pages_services_order_idx" ON "pages_services" USING btree ("_order");
  CREATE INDEX "pages_services_parent_id_idx" ON "pages_services" USING btree ("_parent_id");
  CREATE INDEX "pages_services_image_idx" ON "pages_services" USING btree ("image_id");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_hero_hero_image_idx" ON "pages" USING btree ("hero_image_id");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_hero_ctas" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_hero_ctas" CASCADE;
  DROP TABLE "pages_features" CASCADE;
  DROP TABLE "pages_services" CASCADE;
  DROP TABLE "pages" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pages_fk";
  
  DROP INDEX "payload_locked_documents_rels_pages_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pages_id";
  DROP TYPE "public"."enum_pages_hero_ctas_target";
  DROP TYPE "public"."enum_pages_features_image_side";`)
}
