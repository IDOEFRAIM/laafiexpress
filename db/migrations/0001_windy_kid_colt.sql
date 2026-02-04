ALTER TABLE "addresses" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "phone" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "shipments" ADD COLUMN "invoice_url" varchar;--> statement-breakpoint
ALTER TABLE "shipments" ADD COLUMN "destination" varchar DEFAULT 'Ouagadougou (Samandin)';