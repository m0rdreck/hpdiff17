import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_opening_hours_spec_days" AS ENUM('Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su');
  CREATE TABLE "site_settings_same_as" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_opening_hours_spec_days" (
  	"order" integer NOT NULL,
  	"parent_id" varchar NOT NULL,
  	"value" "enum_site_settings_opening_hours_spec_days",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "site_settings_opening_hours_spec" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"opens" varchar NOT NULL,
  	"closes" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings_trust_badges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer NOT NULL,
  	"label" varchar NOT NULL,
  	"invert" boolean
  );
  
  CREATE TABLE "site_settings_reviews" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"author" varchar NOT NULL,
  	"rating" numeric NOT NULL,
  	"text" varchar NOT NULL,
  	"date" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" varchar NOT NULL
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"legal_name" varchar NOT NULL,
  	"slogan" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"phone_display" varchar NOT NULL,
  	"phone_e164" varchar NOT NULL,
  	"email" varchar,
  	"address_street" varchar NOT NULL,
  	"address_postal_code" varchar NOT NULL,
  	"address_city" varchar NOT NULL,
  	"address_country" varchar DEFAULT 'France' NOT NULL,
  	"google_maps_url" varchar NOT NULL,
  	"geo_lat" numeric NOT NULL,
  	"geo_lng" numeric NOT NULL,
  	"service_radius_km" numeric NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "site_settings_same_as" ADD CONSTRAINT "site_settings_same_as_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_hours" ADD CONSTRAINT "site_settings_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_opening_hours_spec_days" ADD CONSTRAINT "site_settings_opening_hours_spec_days_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."site_settings_opening_hours_spec"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_opening_hours_spec" ADD CONSTRAINT "site_settings_opening_hours_spec_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_trust_badges" ADD CONSTRAINT "site_settings_trust_badges_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_trust_badges" ADD CONSTRAINT "site_settings_trust_badges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_reviews" ADD CONSTRAINT "site_settings_reviews_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_faq" ADD CONSTRAINT "site_settings_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_same_as_order_idx" ON "site_settings_same_as" USING btree ("_order");
  CREATE INDEX "site_settings_same_as_parent_id_idx" ON "site_settings_same_as" USING btree ("_parent_id");
  CREATE INDEX "site_settings_hours_order_idx" ON "site_settings_hours" USING btree ("_order");
  CREATE INDEX "site_settings_hours_parent_id_idx" ON "site_settings_hours" USING btree ("_parent_id");
  CREATE INDEX "site_settings_opening_hours_spec_days_order_idx" ON "site_settings_opening_hours_spec_days" USING btree ("order");
  CREATE INDEX "site_settings_opening_hours_spec_days_parent_idx" ON "site_settings_opening_hours_spec_days" USING btree ("parent_id");
  CREATE INDEX "site_settings_opening_hours_spec_order_idx" ON "site_settings_opening_hours_spec" USING btree ("_order");
  CREATE INDEX "site_settings_opening_hours_spec_parent_id_idx" ON "site_settings_opening_hours_spec" USING btree ("_parent_id");
  CREATE INDEX "site_settings_trust_badges_order_idx" ON "site_settings_trust_badges" USING btree ("_order");
  CREATE INDEX "site_settings_trust_badges_parent_id_idx" ON "site_settings_trust_badges" USING btree ("_parent_id");
  CREATE INDEX "site_settings_trust_badges_icon_idx" ON "site_settings_trust_badges" USING btree ("icon_id");
  CREATE INDEX "site_settings_reviews_order_idx" ON "site_settings_reviews" USING btree ("_order");
  CREATE INDEX "site_settings_reviews_parent_id_idx" ON "site_settings_reviews" USING btree ("_parent_id");
  CREATE INDEX "site_settings_faq_order_idx" ON "site_settings_faq" USING btree ("_order");
  CREATE INDEX "site_settings_faq_parent_id_idx" ON "site_settings_faq" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings_same_as" CASCADE;
  DROP TABLE "site_settings_hours" CASCADE;
  DROP TABLE "site_settings_opening_hours_spec_days" CASCADE;
  DROP TABLE "site_settings_opening_hours_spec" CASCADE;
  DROP TABLE "site_settings_trust_badges" CASCADE;
  DROP TABLE "site_settings_reviews" CASCADE;
  DROP TABLE "site_settings_faq" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_site_settings_opening_hours_spec_days";`)
}
