CREATE TABLE IF NOT EXISTS "standards_maintenance_issues" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"github_issue_id" varchar(32) NOT NULL,
	"created_at" timestamp NOT NULL,
	"title" varchar(256) NOT NULL,
	"content" text NOT NULL
);
