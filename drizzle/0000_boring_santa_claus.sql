CREATE TABLE IF NOT EXISTS "libraries" (
	"id" uuid PRIMARY KEY NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"plays" integer DEFAULT 0 NOT NULL,
	"likes" integer[] NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"user_id" text,
	CONSTRAINT "tokens_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text,
	"first_name" text NOT NULL,
	"last_name" text,
	"last_login" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
