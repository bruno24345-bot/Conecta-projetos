CREATE TYPE "public"."account_type" AS ENUM('free', 'premium');--> statement-breakpoint
CREATE TYPE "public"."audit_log_status" AS ENUM('success', 'failure');--> statement-breakpoint
CREATE TYPE "public"."bid_status" AS ENUM('pending', 'accepted', 'rejected', 'withdrawn');--> statement-breakpoint
CREATE TYPE "public"."content_type" AS ENUM('video', 'text', 'pdf');--> statement-breakpoint
CREATE TYPE "public"."course_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "public"."demand_status" AS ENUM('open', 'in_progress', 'closed', 'canceled');--> statement-breakpoint
CREATE TYPE "public"."finishing_standard" AS ENUM('basic', 'standard', 'premium');--> statement-breakpoint
CREATE TYPE "public"."payment_method" AS ENUM('credit_card', 'pix');--> statement-breakpoint
CREATE TYPE "public"."payment_status" AS ENUM('pending', 'paid', 'failed', 'refunded', 'disputed');--> statement-breakpoint
CREATE TYPE "public"."payout_status" AS ENUM('held', 'released', 'paid_out');--> statement-breakpoint
CREATE TYPE "public"."project_category" AS ENUM('residential', 'commercial', 'industrial', 'interior_design', 'landscape', 'urban_planning', 'renovation', 'other');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('draft', 'pending_review', 'published', 'paused', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."property_type" AS ENUM('residential', 'commercial', 'industrial');--> statement-breakpoint
CREATE TYPE "public"."registration_type" AS ENUM('CREA', 'CAU');--> statement-breakpoint
CREATE TYPE "public"."subscription_status" AS ENUM('active', 'past_due', 'canceled', 'trialing');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'professional', 'admin', 'admin_sub');--> statement-breakpoint
CREATE TYPE "public"."verification_status" AS ENUM('pending', 'approved', 'rejected');--> statement-breakpoint
CREATE TABLE "admin_permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"canApproveProfiles" boolean DEFAULT false NOT NULL,
	"canManageDisputes" boolean DEFAULT false NOT NULL,
	"canViewFinancials" boolean DEFAULT false NOT NULL,
	"canManageUsers" boolean DEFAULT false NOT NULL,
	"canManageCourses" boolean DEFAULT false NOT NULL,
	"canManageContent" boolean DEFAULT false NOT NULL,
	"allowedIPs" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "audit_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"transactionId" varchar(64),
	"userId" integer,
	"ipAddress" varchar(45),
	"action" text NOT NULL,
	"status" "audit_log_status" NOT NULL,
	"details" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "bids" (
	"id" serial PRIMARY KEY NOT NULL,
	"demandId" integer NOT NULL,
	"professionalId" integer NOT NULL,
	"proposalText" text NOT NULL,
	"proposedAmount" numeric(10, 2) NOT NULL,
	"estimatedDays" integer,
	"status" "bid_status" DEFAULT 'pending' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "budget_estimates" (
	"id" serial PRIMARY KEY NOT NULL,
	"projectId" integer,
	"clientId" integer,
	"professionalId" integer,
	"region" varchar(64),
	"finishingStandard" "finishing_standard",
	"propertyType" "property_type",
	"areaM2" numeric(10, 2),
	"estimatedCost" numeric(10, 2),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"roomId" integer NOT NULL,
	"senderId" integer NOT NULL,
	"content" text NOT NULL,
	"messageType" "content_type" DEFAULT 'text' NOT NULL,
	"fileUrl" text,
	"readAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chat_rooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"orderId" integer,
	"buyerId" integer NOT NULL,
	"professionalId" integer NOT NULL,
	"isDispute" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_contents" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"contentType" "content_type" NOT NULL,
	"contentUrl" text,
	"textContent" text,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"durationSeconds" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "course_enrollments" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"courseId" integer NOT NULL,
	"orderId" integer,
	"progressPercent" integer DEFAULT 0 NOT NULL,
	"completedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courses" (
	"id" serial PRIMARY KEY NOT NULL,
	"instructorId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"thumbnailUrl" text,
	"price" numeric(10, 2) NOT NULL,
	"status" "course_status" DEFAULT 'draft' NOT NULL,
	"totalLessons" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "demands" (
	"id" serial PRIMARY KEY NOT NULL,
	"clientId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"category" varchar(64),
	"budgetMin" numeric(10, 2),
	"budgetMax" numeric(10, 2),
	"deadline" timestamp,
	"status" "demand_status" DEFAULT 'open' NOT NULL,
	"selectedBidId" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"buyerId" integer NOT NULL,
	"projectId" integer NOT NULL,
	"professionalId" integer NOT NULL,
	"grossAmount" numeric(10, 2) NOT NULL,
	"platformFeeRate" numeric(5, 4) NOT NULL,
	"platformFeeAmount" numeric(10, 2) NOT NULL,
	"netAmount" numeric(10, 2) NOT NULL,
	"discountAmount" numeric(10, 2) DEFAULT '0.00',
	"referralDiscount" numeric(10, 2) DEFAULT '0.00',
	"paymentMethod" "payment_method",
	"paymentStatus" "payment_status" DEFAULT 'pending' NOT NULL,
	"stripePaymentIntentId" varchar(128),
	"stripeTransferId" varchar(128),
	"payoutStatus" "payout_status" DEFAULT 'held' NOT NULL,
	"payoutReleasedAt" timestamp,
	"copyrightAgreed" boolean DEFAULT false NOT NULL,
	"copyrightAgreedAt" timestamp,
	"paidAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "professional_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"registrationType" "registration_type" NOT NULL,
	"registrationNumber" varchar(32) NOT NULL,
	"registrationUF" varchar(2) NOT NULL,
	"documentUrl" text,
	"bio" text,
	"specialties" jsonb,
	"portfolioUrls" jsonb,
	"verificationStatus" "verification_status" DEFAULT 'pending' NOT NULL,
	"verifiedAt" timestamp,
	"verifiedBy" integer,
	"stripeAccountId" varchar(64),
	"averageRating" numeric(3, 2) DEFAULT '0.00',
	"totalReviews" integer DEFAULT 0 NOT NULL,
	"totalSales" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"professionalId" integer NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"category" "project_category" NOT NULL,
	"architecturalStyle" varchar(64),
	"areaM2" numeric(10, 2),
	"areaM3" numeric(10, 2),
	"price" numeric(10, 2) NOT NULL,
	"thumbnailUrl" text,
	"galleryUrls" jsonb,
	"technicalDrawingUrls" jsonb,
	"model3dUrl" text,
	"finalFileUrls" jsonb,
	"status" "project_status" DEFAULT 'draft' NOT NULL,
	"isPremiumFeatured" boolean DEFAULT false NOT NULL,
	"averageRating" numeric(3, 2) DEFAULT '0.00',
	"totalReviews" integer DEFAULT 0 NOT NULL,
	"totalSales" integer DEFAULT 0 NOT NULL,
	"viewCount" integer DEFAULT 0 NOT NULL,
	"tags" jsonb,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "referrals" (
	"id" serial PRIMARY KEY NOT NULL,
	"referrerId" integer NOT NULL,
	"referredUserId" integer NOT NULL,
	"discountRate" numeric(5, 4) DEFAULT '0.0750' NOT NULL,
	"discountUsed" boolean DEFAULT false NOT NULL,
	"discountUsedAt" timestamp,
	"orderId" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"orderId" integer NOT NULL,
	"reviewerId" integer NOT NULL,
	"projectId" integer NOT NULL,
	"professionalId" integer NOT NULL,
	"rating" integer NOT NULL,
	"comment" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "reviews_orderId_unique" UNIQUE("orderId")
);
--> statement-breakpoint
CREATE TABLE "subscriptions" (
	"id" serial PRIMARY KEY NOT NULL,
	"userId" integer NOT NULL,
	"status" "subscription_status" DEFAULT 'trialing' NOT NULL,
	"stripeSubscriptionId" varchar(128),
	"stripeCustomerId" varchar(128),
	"currentPeriodStart" timestamp,
	"currentPeriodEnd" timestamp,
	"billingCycleCount" integer DEFAULT 0 NOT NULL,
	"monthlyAmount" numeric(10, 2) DEFAULT '50.00',
	"failedAttempts" integer DEFAULT 0 NOT NULL,
	"lastAttemptAt" timestamp,
	"nextAttemptAt" timestamp,
	"canceledAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"accountType" "account_type" DEFAULT 'free' NOT NULL,
	"termsAccepted" boolean DEFAULT false NOT NULL,
	"termsVersion" varchar(16),
	"termsAcceptedAt" timestamp,
	"privacyAccepted" boolean DEFAULT false NOT NULL,
	"deletedAt" timestamp,
	"isAnonymized" boolean DEFAULT false NOT NULL,
	"referralCode" varchar(16),
	"referredBy" integer,
	"twoFactorSecret" varchar(255),
	"twoFactorEnabled" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_openId_unique" UNIQUE("openId"),
	CONSTRAINT "users_referralCode_unique" UNIQUE("referralCode")
);
