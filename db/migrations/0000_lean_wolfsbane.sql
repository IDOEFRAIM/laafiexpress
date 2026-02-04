CREATE SCHEMA "finance";
--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('ADMIN', 'AGENT_CHINA', 'AGENT_BURKINA', 'CLIENT');--> statement-breakpoint
CREATE TYPE "public"."shipment_category" AS ENUM('LTA', 'MCO', 'EXPRESS', 'CONTAINER');--> statement-breakpoint
CREATE TYPE "public"."shipment_status" AS ENUM('RECU_CHINE', 'EN_COURS_GROUPAGE', 'CHARGE_TRANSIT', 'ARRIVE_OUAGA', 'LIVRE', 'LITIGE_BLOQUE');--> statement-breakpoint
CREATE TYPE "public"."transport_type" AS ENUM('AERIEN', 'MARITIME');--> statement-breakpoint
CREATE TYPE "finance"."payment_method" AS ENUM('ESPECE', 'ORANGE_MONEY', 'MOOV_MONEY', 'VIREMENT');--> statement-breakpoint
CREATE TYPE "finance"."payment_status" AS ENUM('EN_ATTENTE', 'PARTIEL', 'PAYE', 'RETARD_BLOQUANT');--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"label" varchar(50),
	"city" varchar(100) DEFAULT 'Ouagadougou',
	"details" text
);
--> statement-breakpoint
CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY NOT NULL,
	"full_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"role" "user_role" DEFAULT 'CLIENT' NOT NULL,
	"address" text,
	"client_code" varchar(10),
	"is_active" boolean DEFAULT true,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "profiles_email_unique" UNIQUE("email"),
	CONSTRAINT "profiles_phone_unique" UNIQUE("phone"),
	CONSTRAINT "profiles_client_code_unique" UNIQUE("client_code")
);
--> statement-breakpoint
CREATE TABLE "containers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"container_number" varchar NOT NULL,
	"departure_date" timestamp,
	"estimated_arrival" timestamp,
	"status" varchar DEFAULT 'OUVERT',
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "containers_container_number_unique" UNIQUE("container_number")
);
--> statement-breakpoint
CREATE TABLE "shipments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"tracking_number" varchar NOT NULL,
	"client_id" uuid NOT NULL,
	"container_id" uuid,
	"created_by" uuid,
	"type" "transport_type" NOT NULL,
	"category" "shipment_category" NOT NULL,
	"content_description" text,
	"weight" double precision,
	"cbm" double precision,
	"image_url" varchar,
	"status" "shipment_status" DEFAULT 'RECU_CHINE',
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "shipments_tracking_number_unique" UNIQUE("tracking_number")
);
--> statement-breakpoint
CREATE TABLE "finance"."invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invoice_number" varchar NOT NULL,
	"shipment_id" uuid NOT NULL,
	"client_id" uuid NOT NULL,
	"sub_total" double precision NOT NULL,
	"additional_fees" double precision DEFAULT 0,
	"total_amount" double precision NOT NULL,
	"status" "finance"."payment_status" DEFAULT 'EN_ATTENTE',
	"due_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"paid_at" timestamp,
	CONSTRAINT "invoices_invoice_number_unique" UNIQUE("invoice_number")
);
--> statement-breakpoint
CREATE TABLE "finance"."payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"invoice_id" uuid,
	"amount" double precision NOT NULL,
	"method" "finance"."payment_method" NOT NULL,
	"transaction_id" varchar,
	"received_by_id" uuid,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "finance"."rates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"service_type" varchar,
	"standard_price" integer NOT NULL,
	"promo_price" integer,
	"promo_end_date" timestamp,
	"is_active" boolean DEFAULT true
);
--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_user_id_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_client_id_profiles_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_container_id_containers_id_fk" FOREIGN KEY ("container_id") REFERENCES "public"."containers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "shipments" ADD CONSTRAINT "shipments_created_by_profiles_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance"."invoices" ADD CONSTRAINT "invoices_shipment_id_shipments_id_fk" FOREIGN KEY ("shipment_id") REFERENCES "public"."shipments"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance"."invoices" ADD CONSTRAINT "invoices_client_id_profiles_id_fk" FOREIGN KEY ("client_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance"."payments" ADD CONSTRAINT "payments_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "finance"."invoices"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "finance"."payments" ADD CONSTRAINT "payments_received_by_id_profiles_id_fk" FOREIGN KEY ("received_by_id") REFERENCES "public"."profiles"("id") ON DELETE no action ON UPDATE no action;