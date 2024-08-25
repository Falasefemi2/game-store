CREATE TABLE IF NOT EXISTS "gamestore_game_library" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"game_id" integer NOT NULL,
	"added_at" timestamp DEFAULT now(),
	"status" varchar(20) DEFAULT 'added',
	"notes" text
);
--> statement-breakpoint
ALTER TABLE "gamestore_users" ALTER COLUMN "auth_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gamestore_users" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gamestore_users" ALTER COLUMN "username" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gamestore_games" ADD COLUMN "last_synced_at" timestamp DEFAULT now();--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gamestore_game_library" ADD CONSTRAINT "gamestore_game_library_user_id_gamestore_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."gamestore_users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "gamestore_game_library" ADD CONSTRAINT "gamestore_game_library_game_id_gamestore_games_id_fk" FOREIGN KEY ("game_id") REFERENCES "public"."gamestore_games"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "genre_idx" ON "gamestore_games" USING btree ("genre");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "platform_idx" ON "gamestore_games" USING btree ("platform");--> statement-breakpoint
ALTER TABLE "gamestore_users" ADD CONSTRAINT "gamestore_users_auth_id_unique" UNIQUE("auth_id");--> statement-breakpoint
ALTER TABLE "gamestore_users" ADD CONSTRAINT "gamestore_users_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "gamestore_users" ADD CONSTRAINT "gamestore_users_username_unique" UNIQUE("username");