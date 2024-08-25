CREATE TABLE IF NOT EXISTS "gamestore_platforms" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "gamestore_platforms_name_unique" UNIQUE("name")
);
--> statement-breakpoint
DROP INDEX IF EXISTS "platform_idx";--> statement-breakpoint
ALTER TABLE "gamestore_games" ADD COLUMN "platform_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gamestore_games" ADD CONSTRAINT "gamestore_games_platform_id_gamestore_platforms_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."gamestore_platforms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "platform_idx" ON "gamestore_games" USING btree ("platform_id");--> statement-breakpoint
ALTER TABLE "gamestore_games" DROP COLUMN IF EXISTS "platform";