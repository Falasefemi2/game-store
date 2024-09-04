CREATE TABLE IF NOT EXISTS "gamestore_game_library" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"game_id" integer NOT NULL,
	"added_at" timestamp DEFAULT now(),
	"status" varchar(20) DEFAULT 'added',
	"notes" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gamestore_games" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"thumbnail" text NOT NULL,
	"short_description" text NOT NULL,
	"game_url" text NOT NULL,
	"genre" text NOT NULL,
	"platform_id" integer NOT NULL,
	"publisher" text NOT NULL,
	"developer" text NOT NULL,
	"release_date" text NOT NULL,
	"freetogame_profile_url" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"last_synced_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gamestore_platforms" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "gamestore_platforms_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "gamestore_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"auth_id" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"profile_picture_url" varchar(256),
	"username" varchar(256) NOT NULL,
	"first_name" varchar(256),
	"last_name" varchar(256),
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "gamestore_users_auth_id_unique" UNIQUE("auth_id"),
	CONSTRAINT "gamestore_users_email_unique" UNIQUE("email"),
	CONSTRAINT "gamestore_users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
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
DO $$ BEGIN
 ALTER TABLE "gamestore_games" ADD CONSTRAINT "gamestore_games_platform_id_gamestore_platforms_id_fk" FOREIGN KEY ("platform_id") REFERENCES "public"."gamestore_platforms"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "title_idx" ON "gamestore_games" USING btree ("title");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "genre_idx" ON "gamestore_games" USING btree ("genre");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "platform_idx" ON "gamestore_games" USING btree ("platform_id");