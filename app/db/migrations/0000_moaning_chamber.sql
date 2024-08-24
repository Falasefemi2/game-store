CREATE TABLE IF NOT EXISTS "gamestore_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"auth_id" varchar(256),
	"email" varchar(256),
	"profile_picture_url" varchar(256),
	"username" varchar(256),
	"first_name" varchar(256),
	"last_name" varchar(256),
	"created_at" timestamp DEFAULT now()
);
