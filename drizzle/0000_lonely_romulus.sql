CREATE TABLE IF NOT EXISTS "libraries" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now(),
	"plays" integer DEFAULT 0 NOT NULL,
	"likes" integer[] NOT NULL,
	"prompt_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	CONSTRAINT "libraries_likes_unique" UNIQUE("likes")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prompt" (
	"id" serial PRIMARY KEY NOT NULL,
	"visibility" text DEFAULT 'PUBLIC' NOT NULL,
	"description" text NOT NULL,
	"is_intrumental" boolean DEFAULT false NOT NULL,
	"custom_aramters" json,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"user_id" integer,
	CONSTRAINT "tokens_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" integer PRIMARY KEY NOT NULL,
	"username" text,
	"first_name" text NOT NULL,
	"last_name" text,
	"last_login" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
