import {
  boolean,
  decimal,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// ─── ENUMS ────────────────────────────────────────────────────────────────────
export const userRoleEnum = pgEnum("user_role", ["user", "professional", "admin", "admin_sub"]);
export const accountTypeEnum = pgEnum("account_type", ["free", "premium"]);
export const registrationTypeEnum = pgEnum("registration_type", ["CREA", "CAU"]);
export const verificationStatusEnum = pgEnum("verification_status", ["pending", "approved", "rejected"]);
export const projectCategoryEnum = pgEnum("project_category", [
  "residential",
  "commercial",
  "industrial",
  "interior_design",
  "landscape",
  "urban_planning",
  "renovation",
  "other",
]);
export const projectStatusEnum = pgEnum("project_status", ["draft", "pending_review", "published", "paused", "rejected"]);
export const paymentMethodEnum = pgEnum("payment_method", ["credit_card", "pix"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "paid", "failed", "refunded", "disputed"]);
export const payoutStatusEnum = pgEnum("payout_status", ["held", "released", "paid_out"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", ["active", "past_due", "canceled", "trialing"]);
export const courseStatusEnum = pgEnum("course_status", ["draft", "published", "archived"]);
export const contentTypeEnum = pgEnum("content_type", ["video", "text", "pdf"]);
export const demandStatusEnum = pgEnum("demand_status", ["open", "in_progress", "closed", "canceled"]);
export const bidStatusEnum = pgEnum("bid_status", ["pending", "accepted", "rejected", "withdrawn"]);
export const auditLogStatusEnum = pgEnum("audit_log_status", ["success", "failure"]);
export const finishingStandardEnum = pgEnum("finishing_standard", ["basic", "standard", "premium"]);
export const propertyTypeEnum = pgEnum("property_type", ["residential", "commercial", "industrial"]);

// ─── USERS (PII segregado conforme LGPD) ─────────────────────────────────────
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRoleEnum("role").default("user").notNull(),
  accountType: accountTypeEnum("accountType").default("free").notNull(),
  // LGPD
  termsAccepted: boolean("termsAccepted").default(false).notNull(),
  termsVersion: varchar("termsVersion", { length: 16 }),
  termsAcceptedAt: timestamp("termsAcceptedAt"),
  privacyAccepted: boolean("privacyAccepted").default(false).notNull(),
  // Exclusão lógica (Direito ao Esquecimento)
  deletedAt: timestamp("deletedAt"),
  isAnonymized: boolean("isAnonymized").default(false).notNull(),
  // Referral
  referralCode: varchar("referralCode", { length: 16 }).unique(),
  referredBy: integer("referredBy"),
  // 2FA (TOTP)
  twoFactorSecret: varchar("twoFactorSecret", { length: 255 }),
  twoFactorEnabled: boolean("twoFactorEnabled").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── PROFESSIONAL PROFILES ────────────────────────────────────────────────────
export const professionalProfiles = pgTable("professional_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  registrationType: registrationTypeEnum("registrationType").notNull(),
  registrationNumber: varchar("registrationNumber", { length: 32 }).notNull(),
  registrationUF: varchar("registrationUF", { length: 2 }).notNull(),
  documentUrl: text("documentUrl"),
  bio: text("bio"),
  specialties: jsonb("specialties").$type<string[]>(),
  portfolioUrls: jsonb("portfolioUrls").$type<string[]>(),
  verificationStatus: verificationStatusEnum("verificationStatus").default("pending").notNull(),
  verifiedAt: timestamp("verifiedAt"),
  verifiedBy: integer("verifiedBy"),
  stripeAccountId: varchar("stripeAccountId", { length: 64 }),
  averageRating: decimal("averageRating", { precision: 3, scale: 2 }).default("0.00"),
  totalReviews: integer("totalReviews").default(0).notNull(),
  totalSales: integer("totalSales").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type ProfessionalProfile = typeof professionalProfiles.$inferSelect;

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  professionalId: integer("professionalId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: projectCategoryEnum("category").notNull(),
  architecturalStyle: varchar("architecturalStyle", { length: 64 }),
  areaM2: decimal("areaM2", { precision: 10, scale: 2 }),
  areaM3: decimal("areaM3", { precision: 10, scale: 2 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  // Imagens e arquivos
  thumbnailUrl: text("thumbnailUrl"),
  galleryUrls: jsonb("galleryUrls").$type<string[]>(),
  technicalDrawingUrls: jsonb("technicalDrawingUrls").$type<string[]>(),
  model3dUrl: text("model3dUrl"),
  finalFileUrls: jsonb("finalFileUrls").$type<string[]>(), // entregue apenas após compra
  // Status
  status: projectStatusEnum("status").default("draft").notNull(),
  isPremiumFeatured: boolean("isPremiumFeatured").default(false).notNull(),
  averageRating: decimal("averageRating", { precision: 3, scale: 2 }).default("0.00"),
  totalReviews: integer("totalReviews").default(0).notNull(),
  totalSales: integer("totalSales").default(0).notNull(),
  viewCount: integer("viewCount").default(0).notNull(),
  tags: jsonb("tags").$type<string[]>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  deletedAt: timestamp("deletedAt"),
});

export type Project = typeof projects.$inferSelect;

// ─── ORDERS ───────────────────────────────────────────────────────────────────
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  buyerId: integer("buyerId").notNull(),
  projectId: integer("projectId").notNull(),
  professionalId: integer("professionalId").notNull(),
  // Valores (mantidos mesmo após anonimização LGPD)
  grossAmount: decimal("grossAmount", { precision: 10, scale: 2 }).notNull(),
  platformFeeRate: decimal("platformFeeRate", { precision: 5, scale: 4 }).notNull(), // 0.10 ou 0.05
  platformFeeAmount: decimal("platformFeeAmount", { precision: 10, scale: 2 }).notNull(),
  netAmount: decimal("netAmount", { precision: 10, scale: 2 }).notNull(),
  discountAmount: decimal("discountAmount", { precision: 10, scale: 2 }).default("0.00"),
  referralDiscount: decimal("referralDiscount", { precision: 10, scale: 2 }).default("0.00"),
  // Pagamento
  paymentMethod: paymentMethodEnum("paymentMethod"),
  paymentStatus: paymentStatusEnum("paymentStatus").default("pending").notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 128 }),
  stripeTransferId: varchar("stripeTransferId", { length: 128 }),
  // Payout (retenção 15 dias)
  payoutStatus: payoutStatusEnum("payoutStatus").default("held").notNull(),
  payoutReleasedAt: timestamp("payoutReleasedAt"),
  // Direitos autorais
  copyrightAgreed: boolean("copyrightAgreed").default(false).notNull(),
  copyrightAgreedAt: timestamp("copyrightAgreedAt"),
  paidAt: timestamp("paidAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  orderId: integer("orderId").notNull().unique(),
  reviewerId: integer("reviewerId").notNull(),
  projectId: integer("projectId").notNull(),
  professionalId: integer("professionalId").notNull(),
  rating: integer("rating").notNull(), // 1-5
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;

// ─── CHAT ─────────────────────────────────────────────────────────────────────
export const chatRooms = pgTable("chat_rooms", {
  id: serial("id").primaryKey(),
  orderId: integer("orderId"),
  buyerId: integer("buyerId").notNull(),
  professionalId: integer("professionalId").notNull(),
  isDispute: boolean("isDispute").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  roomId: integer("roomId").notNull(),
  senderId: integer("senderId").notNull(),
  content: text("content").notNull(),
  messageType: contentTypeEnum("messageType").default("text").notNull(),
  fileUrl: text("fileUrl"),
  readAt: timestamp("readAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── SUBSCRIPTIONS (Plano Premium) ────────────────────────────────────────────
export const subscriptions = pgTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  status: subscriptionStatusEnum("status").default("trialing").notNull(),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 128 }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 128 }),
  // Promoção: 3 meses R$50, depois R$280
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  billingCycleCount: integer("billingCycleCount").default(0).notNull(), // para controle da promoção
  monthlyAmount: decimal("monthlyAmount", { precision: 10, scale: 2 }).default("50.00"),
  // Régua de cobrança
  failedAttempts: integer("failedAttempts").default(0).notNull(),
  lastAttemptAt: timestamp("lastAttemptAt"),
  nextAttemptAt: timestamp("nextAttemptAt"),
  canceledAt: timestamp("canceledAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Subscription = typeof subscriptions.$inferSelect;

// ─── COURSES (Plataforma de Cursos) ───────────────────────────────────────────
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  instructorId: integer("instructorId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnailUrl"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  status: courseStatusEnum("status").default("draft").notNull(),
  totalLessons: integer("totalLessons").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const courseContents = pgTable("course_contents", {
  id: serial("id").primaryKey(),
  courseId: integer("courseId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  contentType: contentTypeEnum("contentType").notNull(),
  contentUrl: text("contentUrl"),
  textContent: text("textContent"),
  sortOrder: integer("sortOrder").default(0).notNull(),
  durationSeconds: integer("durationSeconds"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const courseEnrollments = pgTable("course_enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  courseId: integer("courseId").notNull(),
  orderId: integer("orderId"),
  progressPercent: integer("progressPercent").default(0).notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── DEMANDS & BIDS (Lances Reversos) ─────────────────────────────────────────
export const demands = pgTable("demands", {
  id: serial("id").primaryKey(),
  clientId: integer("clientId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 64 }),
  budgetMin: decimal("budgetMin", { precision: 10, scale: 2 }),
  budgetMax: decimal("budgetMax", { precision: 10, scale: 2 }),
  deadline: timestamp("deadline"),
  status: demandStatusEnum("status").default("open").notNull(),
  selectedBidId: integer("selectedBidId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const bids = pgTable("bids", {
  id: serial("id").primaryKey(),
  demandId: integer("demandId").notNull(),
  professionalId: integer("professionalId").notNull(),
  proposalText: text("proposalText").notNull(),
  proposedAmount: decimal("proposedAmount", { precision: 10, scale: 2 }).notNull(),
  estimatedDays: integer("estimatedDays"),
  status: bidStatusEnum("status").default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// ─── REFERRALS (Programa de Indicação) ────────────────────────────────────────
export const referrals = pgTable("referrals", {
  id: serial("id").primaryKey(),
  referrerId: integer("referrerId").notNull(),
  referredUserId: integer("referredUserId").notNull(),
  discountRate: decimal("discountRate", { precision: 5, scale: 4 }).default("0.0750").notNull(), // 7.5%
  discountUsed: boolean("discountUsed").default(false).notNull(),
  discountUsedAt: timestamp("discountUsedAt"),
  orderId: integer("orderId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── ADMIN PERMISSIONS (Hierarquia) ───────────────────────────────────────────
export const adminPermissions = pgTable("admin_permissions", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  canApproveProfiles: boolean("canApproveProfiles").default(false).notNull(),
  canManageDisputes: boolean("canManageDisputes").default(false).notNull(),
  canViewFinancials: boolean("canViewFinancials").default(false).notNull(),
  canManageUsers: boolean("canManageUsers").default(false).notNull(),
  canManageCourses: boolean("canManageCourses").default(false).notNull(),
  canManageContent: boolean("canManageContent").default(false).notNull(),
  allowedIPs: jsonb("allowedIPs").$type<string[]>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

// ─── AUDIT LOGS (Trilha de Auditoria) ─────────────────────────────────────────
export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  transactionId: varchar("transactionId", { length: 64 }),
  userId: integer("userId"),
  ipAddress: varchar("ipAddress", { length: 45 }), // IPv4 or IPv6
  action: text("action").notNull(),
  status: auditLogStatusEnum("status").notNull(),
  details: jsonb("details"), // Store additional details if needed
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;

// ─── BUDGET ESTIMATES (Algoritmo de Orçamento) ────────────────────────────────
export const budgetEstimates = pgTable("budget_estimates", {
  id: serial("id").primaryKey(),
  projectId: integer("projectId"),
  clientId: integer("clientId"),
  professionalId: integer("professionalId"),
  region: varchar("region", { length: 64 }),
  finishingStandard: finishingStandardEnum("finishingStandard"), // Adicionado 'premium'
  propertyType: propertyTypeEnum("propertyType"), // Adicionado
  areaM2: decimal("areaM2", { precision: 10, scale: 2 }),
  estimatedCost: decimal("estimatedCost", { precision: 10, scale: 2 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
