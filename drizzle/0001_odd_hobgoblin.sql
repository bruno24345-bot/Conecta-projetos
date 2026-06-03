CREATE TABLE `admin_permissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`canApproveProfiles` boolean NOT NULL DEFAULT false,
	`canManageDisputes` boolean NOT NULL DEFAULT false,
	`canViewFinancials` boolean NOT NULL DEFAULT false,
	`canManageUsers` boolean NOT NULL DEFAULT false,
	`canManageCourses` boolean NOT NULL DEFAULT false,
	`canManageContent` boolean NOT NULL DEFAULT false,
	`allowedIPs` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `admin_permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `bids` (
	`id` int AUTO_INCREMENT NOT NULL,
	`demandId` int NOT NULL,
	`professionalId` int NOT NULL,
	`proposalText` text NOT NULL,
	`proposedAmount` decimal(10,2) NOT NULL,
	`estimatedDays` int,
	`status` enum('pending','accepted','rejected','withdrawn') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bids_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `budget_estimates` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int,
	`clientId` int,
	`professionalId` int,
	`region` varchar(64),
	`finishingStandard` enum('basic','standard','premium','luxury'),
	`structureType` varchar(64),
	`areaM2` decimal(10,2),
	`estimatedCostMin` decimal(12,2),
	`estimatedCostMax` decimal(12,2),
	`questionnaire` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `budget_estimates_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chat_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`roomId` int NOT NULL,
	`senderId` int NOT NULL,
	`content` text NOT NULL,
	`messageType` enum('text','file','system') NOT NULL DEFAULT 'text',
	`fileUrl` text,
	`readAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `chat_rooms` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int,
	`buyerId` int NOT NULL,
	`professionalId` int NOT NULL,
	`isDispute` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `chat_rooms_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contact_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`email` varchar(320) NOT NULL,
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`userId` int,
	`status` enum('pending','replied','closed') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `course_contents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`courseId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`contentType` enum('video','text','pdf') NOT NULL,
	`contentUrl` text,
	`textContent` text,
	`sortOrder` int NOT NULL DEFAULT 0,
	`durationSeconds` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `course_contents_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `course_enrollments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`courseId` int NOT NULL,
	`orderId` int,
	`progressPercent` int NOT NULL DEFAULT 0,
	`completedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `course_enrollments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`instructorId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`thumbnailUrl` text,
	`price` decimal(10,2) NOT NULL,
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
	`totalLessons` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `demands` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clientId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`category` varchar(64),
	`budgetMin` decimal(10,2),
	`budgetMax` decimal(10,2),
	`deadline` timestamp,
	`status` enum('open','in_progress','closed','canceled') NOT NULL DEFAULT 'open',
	`selectedBidId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `demands_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`type` varchar(64) NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text,
	`isRead` boolean NOT NULL DEFAULT false,
	`metadata` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notifications_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`buyerId` int NOT NULL,
	`projectId` int NOT NULL,
	`professionalId` int NOT NULL,
	`grossAmount` decimal(10,2) NOT NULL,
	`platformFeeRate` decimal(5,4) NOT NULL,
	`platformFeeAmount` decimal(10,2) NOT NULL,
	`netAmount` decimal(10,2) NOT NULL,
	`discountAmount` decimal(10,2) DEFAULT '0.00',
	`referralDiscount` decimal(10,2) DEFAULT '0.00',
	`paymentMethod` enum('credit_card','pix'),
	`paymentStatus` enum('pending','paid','failed','refunded','disputed') NOT NULL DEFAULT 'pending',
	`stripePaymentIntentId` varchar(128),
	`stripeTransferId` varchar(128),
	`payoutStatus` enum('held','released','paid_out') NOT NULL DEFAULT 'held',
	`payoutReleasedAt` timestamp,
	`copyrightAgreed` boolean NOT NULL DEFAULT false,
	`copyrightAgreedAt` timestamp,
	`paidAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `professional_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`registrationType` enum('CREA','CAU') NOT NULL,
	`registrationNumber` varchar(32) NOT NULL,
	`registrationUF` varchar(2) NOT NULL,
	`documentUrl` text,
	`bio` text,
	`specialties` json,
	`portfolioUrls` json,
	`verificationStatus` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`verifiedAt` timestamp,
	`verifiedBy` int,
	`stripeAccountId` varchar(64),
	`averageRating` decimal(3,2) DEFAULT '0.00',
	`totalReviews` int NOT NULL DEFAULT 0,
	`totalSales` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `professional_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`projectId` int NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`positionX` decimal(6,2),
	`positionY` decimal(6,2),
	`imageIndex` int DEFAULT 0,
	`parentId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `project_comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`professionalId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`category` enum('residential','commercial','industrial','interior_design','landscape','urban_planning','renovation','other') NOT NULL,
	`architecturalStyle` varchar(64),
	`areaM2` decimal(10,2),
	`areaM3` decimal(10,2),
	`price` decimal(10,2) NOT NULL,
	`thumbnailUrl` text,
	`galleryUrls` json,
	`technicalDrawingUrls` json,
	`model3dUrl` text,
	`finalFileUrls` json,
	`status` enum('draft','pending_review','published','paused','rejected') NOT NULL DEFAULT 'draft',
	`isPremiumFeatured` boolean NOT NULL DEFAULT false,
	`averageRating` decimal(3,2) DEFAULT '0.00',
	`totalReviews` int NOT NULL DEFAULT 0,
	`totalSales` int NOT NULL DEFAULT 0,
	`viewCount` int NOT NULL DEFAULT 0,
	`tags` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`deletedAt` timestamp,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `referrals` (
	`id` int AUTO_INCREMENT NOT NULL,
	`referrerId` int NOT NULL,
	`referredUserId` int NOT NULL,
	`discountRate` decimal(5,4) NOT NULL DEFAULT '0.0750',
	`discountUsed` boolean NOT NULL DEFAULT false,
	`discountUsedAt` timestamp,
	`orderId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `referrals_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderId` int NOT NULL,
	`reviewerId` int NOT NULL,
	`projectId` int NOT NULL,
	`professionalId` int NOT NULL,
	`rating` int NOT NULL,
	`comment` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`),
	CONSTRAINT `reviews_orderId_unique` UNIQUE(`orderId`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`status` enum('active','past_due','canceled','trialing') NOT NULL DEFAULT 'trialing',
	`stripeSubscriptionId` varchar(128),
	`stripeCustomerId` varchar(128),
	`currentPeriodStart` timestamp,
	`currentPeriodEnd` timestamp,
	`billingCycleCount` int NOT NULL DEFAULT 0,
	`monthlyAmount` decimal(10,2) DEFAULT '50.00',
	`failedAttempts` int NOT NULL DEFAULT 0,
	`lastAttemptAt` timestamp,
	`nextAttemptAt` timestamp,
	`canceledAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('user','professional','admin','admin_sub') NOT NULL DEFAULT 'user';--> statement-breakpoint
ALTER TABLE `users` ADD `accountType` enum('free','premium') DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `termsAccepted` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `termsVersion` varchar(16);--> statement-breakpoint
ALTER TABLE `users` ADD `termsAcceptedAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `privacyAccepted` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `deletedAt` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `isAnonymized` boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE `users` ADD `referralCode` varchar(16);--> statement-breakpoint
ALTER TABLE `users` ADD `referredBy` int;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_referralCode_unique` UNIQUE(`referralCode`);