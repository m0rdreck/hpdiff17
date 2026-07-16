import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "service_details_benefits" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "service_details_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "service_details" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nav_label" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"order" numeric DEFAULT 100 NOT NULL,
  	"hero_eyebrow" varchar,
  	"hero_title" varchar NOT NULL,
  	"hero_highlight" varchar,
  	"hero_text" varchar NOT NULL,
  	"hero_image_id" integer NOT NULL,
  	"intro" varchar NOT NULL,
  	"seo_title" varchar NOT NULL,
  	"seo_description" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "service_details_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"service_details_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "service_details_id" integer;
  ALTER TABLE "service_details_benefits" ADD CONSTRAINT "service_details_benefits_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_details_steps" ADD CONSTRAINT "service_details_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."service_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_details" ADD CONSTRAINT "service_details_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "service_details_rels" ADD CONSTRAINT "service_details_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."service_details"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "service_details_rels" ADD CONSTRAINT "service_details_rels_service_details_fk" FOREIGN KEY ("service_details_id") REFERENCES "public"."service_details"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "service_details_benefits_order_idx" ON "service_details_benefits" USING btree ("_order");
  CREATE INDEX "service_details_benefits_parent_id_idx" ON "service_details_benefits" USING btree ("_parent_id");
  CREATE INDEX "service_details_steps_order_idx" ON "service_details_steps" USING btree ("_order");
  CREATE INDEX "service_details_steps_parent_id_idx" ON "service_details_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "service_details_slug_idx" ON "service_details" USING btree ("slug");
  CREATE INDEX "service_details_hero_hero_image_idx" ON "service_details" USING btree ("hero_image_id");
  CREATE INDEX "service_details_updated_at_idx" ON "service_details" USING btree ("updated_at");
  CREATE INDEX "service_details_created_at_idx" ON "service_details" USING btree ("created_at");
  CREATE INDEX "service_details_rels_order_idx" ON "service_details_rels" USING btree ("order");
  CREATE INDEX "service_details_rels_parent_idx" ON "service_details_rels" USING btree ("parent_id");
  CREATE INDEX "service_details_rels_path_idx" ON "service_details_rels" USING btree ("path");
  CREATE INDEX "service_details_rels_service_details_id_idx" ON "service_details_rels" USING btree ("service_details_id");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_details_fk" FOREIGN KEY ("service_details_id") REFERENCES "public"."service_details"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_service_details_id_idx" ON "payload_locked_documents_rels" USING btree ("service_details_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_details_benefits" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_details_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_details" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "service_details_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "service_details_benefits" CASCADE;
  DROP TABLE "service_details_steps" CASCADE;
  DROP TABLE "service_details" CASCADE;
  DROP TABLE "service_details_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_service_details_fk";
  
  DROP INDEX "payload_locked_documents_rels_service_details_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "service_details_id";`)
}
