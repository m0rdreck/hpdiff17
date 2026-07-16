import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_guides_related_services" AS ENUM('tableau-electrique', 'renovation-electrique', 'mise-aux-normes-electriques', 'installation-electrique');
  CREATE TYPE "public"."enum_guides_category" AS ENUM('Sécurité', 'Budget', 'Rénovation', 'Dépannage');
  CREATE TYPE "public"."enum_guides_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__guides_v_version_related_services" AS ENUM('tableau-electrique', 'renovation-electrique', 'mise-aux-normes-electriques', 'installation-electrique');
  CREATE TYPE "public"."enum__guides_v_version_category" AS ENUM('Sécurité', 'Budget', 'Rénovation', 'Dépannage');
  CREATE TYPE "public"."enum__guides_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "guides_blocks_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_h2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_ul_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "guides_blocks_ul" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "guides_related_services" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_guides_related_services",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "guides_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "guides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"order" numeric DEFAULT 100,
  	"category" "enum_guides_category",
  	"reading_minutes" numeric,
  	"updated" timestamp(3) with time zone,
  	"excerpt" varchar,
  	"image_id" integer,
  	"seo_title" varchar,
  	"seo_description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_guides_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_guides_v_blocks_p" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_h2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_ul_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_ul" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_guides_v_version_related_services" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum__guides_v_version_related_services",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "_guides_v_version_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_guides_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_order" numeric DEFAULT 100,
  	"version_category" "enum__guides_v_version_category",
  	"version_reading_minutes" numeric,
  	"version_updated" timestamp(3) with time zone,
  	"version_excerpt" varchar,
  	"version_image_id" integer,
  	"version_seo_title" varchar,
  	"version_seo_description" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__guides_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"guides_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "guides_blocks_p" ADD CONSTRAINT "guides_blocks_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_h2" ADD CONSTRAINT "guides_blocks_h2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_ul_items" ADD CONSTRAINT "guides_blocks_ul_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides_blocks_ul"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_ul" ADD CONSTRAINT "guides_blocks_ul_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_blocks_callout" ADD CONSTRAINT "guides_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_related_services" ADD CONSTRAINT "guides_related_services_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides_faq" ADD CONSTRAINT "guides_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "guides" ADD CONSTRAINT "guides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_p" ADD CONSTRAINT "_guides_v_blocks_p_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_h2" ADD CONSTRAINT "_guides_v_blocks_h2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_ul_items" ADD CONSTRAINT "_guides_v_blocks_ul_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v_blocks_ul"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_ul" ADD CONSTRAINT "_guides_v_blocks_ul_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_blocks_callout" ADD CONSTRAINT "_guides_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_version_related_services" ADD CONSTRAINT "_guides_v_version_related_services_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v_version_faq" ADD CONSTRAINT "_guides_v_version_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_guides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_parent_id_guides_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."guides"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_guides_v" ADD CONSTRAINT "_guides_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_guides_fk" FOREIGN KEY ("guides_id") REFERENCES "public"."guides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "guides_blocks_p_order_idx" ON "guides_blocks_p" USING btree ("_order");
  CREATE INDEX "guides_blocks_p_parent_id_idx" ON "guides_blocks_p" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_p_path_idx" ON "guides_blocks_p" USING btree ("_path");
  CREATE INDEX "guides_blocks_h2_order_idx" ON "guides_blocks_h2" USING btree ("_order");
  CREATE INDEX "guides_blocks_h2_parent_id_idx" ON "guides_blocks_h2" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_h2_path_idx" ON "guides_blocks_h2" USING btree ("_path");
  CREATE INDEX "guides_blocks_ul_items_order_idx" ON "guides_blocks_ul_items" USING btree ("_order");
  CREATE INDEX "guides_blocks_ul_items_parent_id_idx" ON "guides_blocks_ul_items" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_ul_order_idx" ON "guides_blocks_ul" USING btree ("_order");
  CREATE INDEX "guides_blocks_ul_parent_id_idx" ON "guides_blocks_ul" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_ul_path_idx" ON "guides_blocks_ul" USING btree ("_path");
  CREATE INDEX "guides_blocks_callout_order_idx" ON "guides_blocks_callout" USING btree ("_order");
  CREATE INDEX "guides_blocks_callout_parent_id_idx" ON "guides_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "guides_blocks_callout_path_idx" ON "guides_blocks_callout" USING btree ("_path");
  CREATE INDEX "guides_related_services_order_idx" ON "guides_related_services" USING btree ("order");
  CREATE INDEX "guides_related_services_parent_idx" ON "guides_related_services" USING btree ("parent_id");
  CREATE INDEX "guides_faq_order_idx" ON "guides_faq" USING btree ("_order");
  CREATE INDEX "guides_faq_parent_id_idx" ON "guides_faq" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "guides_slug_idx" ON "guides" USING btree ("slug");
  CREATE INDEX "guides_image_idx" ON "guides" USING btree ("image_id");
  CREATE INDEX "guides_updated_at_idx" ON "guides" USING btree ("updated_at");
  CREATE INDEX "guides_created_at_idx" ON "guides" USING btree ("created_at");
  CREATE INDEX "guides__status_idx" ON "guides" USING btree ("_status");
  CREATE INDEX "_guides_v_blocks_p_order_idx" ON "_guides_v_blocks_p" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_p_parent_id_idx" ON "_guides_v_blocks_p" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_p_path_idx" ON "_guides_v_blocks_p" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_h2_order_idx" ON "_guides_v_blocks_h2" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_h2_parent_id_idx" ON "_guides_v_blocks_h2" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_h2_path_idx" ON "_guides_v_blocks_h2" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_ul_items_order_idx" ON "_guides_v_blocks_ul_items" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_ul_items_parent_id_idx" ON "_guides_v_blocks_ul_items" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_ul_order_idx" ON "_guides_v_blocks_ul" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_ul_parent_id_idx" ON "_guides_v_blocks_ul" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_ul_path_idx" ON "_guides_v_blocks_ul" USING btree ("_path");
  CREATE INDEX "_guides_v_blocks_callout_order_idx" ON "_guides_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_guides_v_blocks_callout_parent_id_idx" ON "_guides_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_blocks_callout_path_idx" ON "_guides_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_guides_v_version_related_services_order_idx" ON "_guides_v_version_related_services" USING btree ("order");
  CREATE INDEX "_guides_v_version_related_services_parent_idx" ON "_guides_v_version_related_services" USING btree ("parent_id");
  CREATE INDEX "_guides_v_version_faq_order_idx" ON "_guides_v_version_faq" USING btree ("_order");
  CREATE INDEX "_guides_v_version_faq_parent_id_idx" ON "_guides_v_version_faq" USING btree ("_parent_id");
  CREATE INDEX "_guides_v_parent_idx" ON "_guides_v" USING btree ("parent_id");
  CREATE INDEX "_guides_v_version_version_slug_idx" ON "_guides_v" USING btree ("version_slug");
  CREATE INDEX "_guides_v_version_version_image_idx" ON "_guides_v" USING btree ("version_image_id");
  CREATE INDEX "_guides_v_version_version_updated_at_idx" ON "_guides_v" USING btree ("version_updated_at");
  CREATE INDEX "_guides_v_version_version_created_at_idx" ON "_guides_v" USING btree ("version_created_at");
  CREATE INDEX "_guides_v_version_version__status_idx" ON "_guides_v" USING btree ("version__status");
  CREATE INDEX "_guides_v_created_at_idx" ON "_guides_v" USING btree ("created_at");
  CREATE INDEX "_guides_v_updated_at_idx" ON "_guides_v" USING btree ("updated_at");
  CREATE INDEX "_guides_v_latest_idx" ON "_guides_v" USING btree ("latest");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_guides_id_idx" ON "payload_locked_documents_rels" USING btree ("guides_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "guides_blocks_p" CASCADE;
  DROP TABLE "guides_blocks_h2" CASCADE;
  DROP TABLE "guides_blocks_ul_items" CASCADE;
  DROP TABLE "guides_blocks_ul" CASCADE;
  DROP TABLE "guides_blocks_callout" CASCADE;
  DROP TABLE "guides_related_services" CASCADE;
  DROP TABLE "guides_faq" CASCADE;
  DROP TABLE "guides" CASCADE;
  DROP TABLE "_guides_v_blocks_p" CASCADE;
  DROP TABLE "_guides_v_blocks_h2" CASCADE;
  DROP TABLE "_guides_v_blocks_ul_items" CASCADE;
  DROP TABLE "_guides_v_blocks_ul" CASCADE;
  DROP TABLE "_guides_v_blocks_callout" CASCADE;
  DROP TABLE "_guides_v_version_related_services" CASCADE;
  DROP TABLE "_guides_v_version_faq" CASCADE;
  DROP TABLE "_guides_v" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_guides_related_services";
  DROP TYPE "public"."enum_guides_category";
  DROP TYPE "public"."enum_guides_status";
  DROP TYPE "public"."enum__guides_v_version_related_services";
  DROP TYPE "public"."enum__guides_v_version_category";
  DROP TYPE "public"."enum__guides_v_version_status";`)
}
