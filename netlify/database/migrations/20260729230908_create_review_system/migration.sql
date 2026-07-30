CREATE TABLE "review_helpful_votes" (
	"review_id" text,
	"voter_hash" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "review_helpful_votes_pkey" PRIMARY KEY("review_id","voter_hash")
);
--> statement-breakpoint
CREATE TABLE "review_media" (
	"id" text PRIMARY KEY,
	"review_id" text NOT NULL,
	"blob_key" text NOT NULL UNIQUE,
	"content_type" text NOT NULL,
	"alt_text" text NOT NULL,
	"category" text NOT NULL,
	"position" integer NOT NULL,
	"byte_size" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review_replies" (
	"id" text PRIMARY KEY,
	"review_id" text NOT NULL,
	"author_name" text NOT NULL,
	"body" text NOT NULL,
	"is_owner" boolean DEFAULT false NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"approved_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "review_reports" (
	"id" text PRIMARY KEY,
	"review_id" text NOT NULL,
	"reporter_hash" text NOT NULL,
	"reason" text NOT NULL,
	"status" text DEFAULT 'open' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review_verification_tokens" (
	"id" text PRIMARY KEY,
	"review_id" text NOT NULL UNIQUE,
	"token_hash" text NOT NULL UNIQUE,
	"expires_at" timestamp with time zone NOT NULL,
	"used_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" text PRIMARY KEY,
	"client_name" text NOT NULL,
	"email" text NOT NULL,
	"email_hash" text NOT NULL,
	"business" text,
	"service" text NOT NULL,
	"project_title" text NOT NULL,
	"project_date" text NOT NULL,
	"completion_timeline" text,
	"rating" integer NOT NULL,
	"review_text" text,
	"avatar_key" text NOT NULL,
	"avatar_alt" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"verified" boolean DEFAULT false NOT NULL,
	"photo_verified" boolean DEFAULT false NOT NULL,
	"proof_attached" boolean DEFAULT false NOT NULL,
	"featured" boolean DEFAULT false NOT NULL,
	"helpful_count" integer DEFAULT 0 NOT NULL,
	"consent" boolean NOT NULL,
	"ip_hash" text NOT NULL,
	"moderation_notes" text,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL,
	"approved_at" timestamp with time zone,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "review_media_review_idx" ON "review_media" ("review_id","position");--> statement-breakpoint
CREATE INDEX "review_replies_review_idx" ON "review_replies" ("review_id","status");--> statement-breakpoint
CREATE UNIQUE INDEX "review_reports_unique_reporter_idx" ON "review_reports" ("review_id","reporter_hash");--> statement-breakpoint
CREATE INDEX "review_reports_status_idx" ON "review_reports" ("status");--> statement-breakpoint
CREATE INDEX "review_tokens_expiry_idx" ON "review_verification_tokens" ("expires_at");--> statement-breakpoint
CREATE INDEX "reviews_status_submitted_idx" ON "reviews" ("status","submitted_at");--> statement-breakpoint
CREATE INDEX "reviews_email_submitted_idx" ON "reviews" ("email_hash","submitted_at");--> statement-breakpoint
CREATE INDEX "reviews_ip_submitted_idx" ON "reviews" ("ip_hash","submitted_at");--> statement-breakpoint
CREATE INDEX "reviews_service_idx" ON "reviews" ("service");--> statement-breakpoint
ALTER TABLE "review_helpful_votes" ADD CONSTRAINT "review_helpful_votes_review_id_reviews_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "review_media" ADD CONSTRAINT "review_media_review_id_reviews_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "review_replies" ADD CONSTRAINT "review_replies_review_id_reviews_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "review_reports" ADD CONSTRAINT "review_reports_review_id_reviews_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "review_verification_tokens" ADD CONSTRAINT "review_verification_tokens_review_id_reviews_id_fkey" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE;