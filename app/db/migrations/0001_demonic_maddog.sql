CREATE TABLE IF NOT EXISTS "gamestore_games" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"thumbnail" text NOT NULL,
	"short_description" text NOT NULL,
	"game_url" text NOT NULL,
	"genre" text NOT NULL,
	"platform" text NOT NULL,
	"publisher" text NOT NULL,
	"developer" text NOT NULL,
	"release_date" text NOT NULL,
	"freetogame_profile_url" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "title_idx" ON "gamestore_games" USING btree ("title");