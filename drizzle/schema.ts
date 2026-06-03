import {
  boolean,
  decimal,
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

// ─── USERS (PII segregado conforme LGPD) ─────────────────────────────────────
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "professional", "admin", "admin_sub"]).default("user").notNull(),
  accountType: mysqlEnum("accountType", ["free", "premium"]).default("free").notNull(),
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
  referredBy: int("referredBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── PROFESSIONAL PROFILES ────────────────────────────────────────────────────
export const professionalProfiles = mysqlTable("professional_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  registrationType: mysqlEnum("registrationType", ["CREA", "CAU"]).notNull(),
  registrationNumber: varchar("registrationNumber", { length: 32 }).notNull(),
  registrationUF: varchar("registrationUF", { length: 2 }).notNull(),
  documentUrl: text("documentUrl"),
  bio: text("bio"),
  specialties: json("specialties").$type<string[]>(),
  portfolioUrls: json("portfolioUrls").$type<string[]>(),
  verificationStatus: mysqlEnum("verificationStatus", ["pending", "approved", "rejected"]).default("pending").notNull(),
  verifiedAt: timestamp("verifiedAt"),
  verifiedBy: int("verifiedBy"),
  stripeAccountId: varchar("stripeAccountId", { length: 64 }),
  averageRating: decimal("averageRating", { precision: 3, scale: 2 }).default("0.00"),
  totalReviews: int("totalReviews").default(0).notNull(),
  totalSales: int("totalSales").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ProfessionalProfile = typeof professionalProfiles.$inferSelect;

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  professionalId: int("professionalId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  category: mysqlEnum("category", [
    "residential",
    "commercial",
    "industrial",
    "interior_design",
    "landscape",
    "urban_planning",
    "renovation",
    "other",
  ]).notNull(),
  architecturalStyle: varchar("architecturalStyle", { length: 64 }),
  areaM2: decimal("areaM2", { precision: 10, scale: 2 }),
  areaM3: decimal("areaM3", { precision: 10, scale: 2 }),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  // Imagens e arquivos
  thumbnailUrl: text("thumbnailUrl"),
  galleryUrls: json("galleryUrls").$type<string[]>(),
  technicalDrawingUrls: json("technicalDrawingUrls").$type<string[]>(),
  model3dUrl: text("model3dUrl"),
  finalFileUrls: json("finalFileUrls").$type<string[]>(), // entregue apenas após compra
  // Status
  status: mysqlEnum("status", ["draft", "pending_review", "published", "paused", "rejected"]).default("draft").notNull(),
  isPremiumFeatured: boolean("isPremiumFeatured").default(false).notNull(),
  averageRating: decimal("averageRating", { precision: 3, scale: 2 }).default("0.00"),
  totalReviews: int("totalReviews").default(0).notNull(),
  totalSales: int("totalSales").default(0).notNull(),
  viewCount: int("viewCount").default(0).notNull(),
  tags: json("tags").$type<string[]>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  deletedAt: timestamp("deletedAt"),
});

export type Project = typeof projects.$inferSelect;

// ─── ORDERS ───────────────────────────────────────────────────────────────────
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  buyerId: int("buyerId").notNull(),
  projectId: int("projectId").notNull(),
  professionalId: int("professionalId").notNull(),
  // Valores (mantidos mesmo após anonimização LGPD)
  grossAmount: decimal("grossAmount", { precision: 10, scale: 2 }).notNull(),
  platformFeeRate: decimal("platformFeeRate", { precision: 5, scale: 4 }).notNull(), // 0.10 ou 0.05
  platformFeeAmount: decimal("platformFeeAmount", { precision: 10, scale: 2 }).notNull(),
  netAmount: decimal("netAmount", { precision: 10, scale: 2 }).notNull(),
  discountAmount: decimal("discountAmount", { precision: 10, scale: 2 }).default("0.00"),
  referralDiscount: decimal("referralDiscount", { precision: 10, scale: 2 }).default("0.00"),
  // Pagamento
  paymentMethod: mysqlEnum("paymentMethod", ["credit_card", "pix"]),
  paymentStatus: mysqlEnum("paymentStatus", ["pending", "paid", "failed", "refunded", "disputed"]).default("pending").notNull(),
  stripePaymentIntentId: varchar("stripePaymentIntentId", { length: 128 }),
  stripeTransferId: varchar("stripeTransferId", { length: 128 }),
  // Payout (retenção 15 dias)
  payoutStatus: mysqlEnum("payoutStatus", ["held", "released", "paid_out"]).default("held").notNull(),
  payoutReleasedAt: timestamp("payoutReleasedAt"),
  // Direitos autorais
  copyrightAgreed: boolean("copyrightAgreed").default(false).notNull(),
  copyrightAgreedAt: timestamp("copyrightAgreedAt"),
  paidAt: timestamp("paidAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Order = typeof orders.$inferSelect;

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
export const reviews = mysqlTable("reviews", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull().unique(),
  reviewerId: int("reviewerId").notNull(),
  projectId: int("projectId").notNull(),
  professionalId: int("professionalId").notNull(),
  rating: int("rating").notNull(), // 1-5
  comment: text("comment"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Review = typeof reviews.$inferSelect;

// ─── CHAT ─────────────────────────────────────────────────────────────────────
export const chatRooms = mysqlTable("chat_rooms", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId"),
  buyerId: int("buyerId").notNull(),
  professionalId: int("professionalId").notNull(),
  isDispute: boolean("isDispute").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const chatMessages = mysqlTable("chat_messages", {
  id: int("id").autoincrement().primaryKey(),
  roomId: int("roomId").notNull(),
  senderId: int("senderId").notNull(),
  content: text("content").notNull(),
  messageType: mysqlEnum("messageType", ["text", "file", "system"]).default("text").notNull(),
  fileUrl: text("fileUrl"),
  readAt: timestamp("readAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── SUBSCRIPTIONS (Plano Premium) ────────────────────────────────────────────
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  status: mysqlEnum("status", ["active", "past_due", "canceled", "trialing"]).default("trialing").notNull(),
  stripeSubscriptionId: varchar("stripeSubscriptionId", { length: 128 }),
  stripeCustomerId: varchar("stripeCustomerId", { length: 128 }),
  // Promoção: 3 meses R$50, depois R$280
  currentPeriodStart: timestamp("currentPeriodStart"),
  currentPeriodEnd: timestamp("currentPeriodEnd"),
  billingCycleCount: int("billingCycleCount").default(0).notNull(), // para controle da promoção
  monthlyAmount: decimal("monthlyAmount", { precision: 10, scale: 2 }).default("50.00"),
  // Régua de cobrança
  failedAttempts: int("failedAttempts").default(0).notNull(),
  lastAttemptAt: timestamp("lastAttemptAt"),
  nextAttemptAt: timestamp("nextAttemptAt"),
  canceledAt: timestamp("canceledAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ─── COURSES (Plataforma de Cursos) ───────────────────────────────────────────
export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  instructorId: int("instructorId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  thumbnailUrl: text("thumbnailUrl"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["draft", "published", "archived"]).default("draft").notNull(),
  totalLessons: int("totalLessons").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const courseContents = mysqlTable("course_contents", {
  id: int("id").autoincrement().primaryKey(),
  courseId: int("courseId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  contentType: mysqlEnum("contentType", ["video", "text", "pdf"]).notNull(),
  contentUrl: text("contentUrl"),
  textContent: text("textContent"),
  sortOrder: int("sortOrder").default(0).notNull(),
  durationSeconds: int("durationSeconds"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const courseEnrollments = mysqlTable("course_enrollments", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  orderId: int("orderId"),
  progressPercent: int("progressPercent").default(0).notNull(),
  completedAt: timestamp("completedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── DEMANDS & BIDS (Lances Reversos) ─────────────────────────────────────────
export const demands = mysqlTable("demands", {
  id: int("id").autoincrement().primaryKey(),
  clientId: int("clientId").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 64 }),
  budgetMin: decimal("budgetMin", { precision: 10, scale: 2 }),
  budgetMax: decimal("budgetMax", { precision: 10, scale: 2 }),
  deadline: timestamp("deadline"),
  status: mysqlEnum("status", ["open", "in_progress", "closed", "canceled"]).default("open").notNull(),
  selectedBidId: int("selectedBidId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const bids = mysqlTable("bids", {
  id: int("id").autoincrement().primaryKey(),
  demandId: int("demandId").notNull(),
  professionalId: int("professionalId").notNull(),
  proposalText: text("proposalText").notNull(),
  proposedAmount: decimal("proposedAmount", { precision: 10, scale: 2 }).notNull(),
  estimatedDays: int("estimatedDays"),
  status: mysqlEnum("status", ["pending", "accepted", "rejected", "withdrawn"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ─── REFERRALS (Programa de Indicação) ────────────────────────────────────────
export const referrals = mysqlTable("referrals", {
  id: int("id").autoincrement().primaryKey(),
  referrerId: int("referrerId").notNull(),
  referredUserId: int("referredUserId").notNull(),
  discountRate: decimal("discountRate", { precision: 5, scale: 4 }).default("0.0750").notNull(), // 7.5%
  discountUsed: boolean("discountUsed").default(false).notNull(),
  discountUsedAt: timestamp("discountUsedAt"),
  orderId: int("orderId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── ADMIN PERMISSIONS (Hierarquia) ───────────────────────────────────────────
export const adminPermissions = mysqlTable("admin_permissions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  canApproveProfiles: boolean("canApproveProfiles").default(false).notNull(),
  canManageDisputes: boolean("canManageDisputes").default(false).notNull(),
  canViewFinancials: boolean("canViewFinancials").default(false).notNull(),
  canManageUsers: boolean("canManageUsers").default(false).notNull(),
  canManageCourses: boolean("canManageCourses").default(false).notNull(),
  canManageContent: boolean("canManageContent").default(false).notNull(),
  allowedIPs: json("allowedIPs").$type<string[]>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ─── BUDGET ESTIMATES (Algoritmo de Orçamento) ────────────────────────────────
export const budgetEstimates = mysqlTable("budget_estimates", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId"),
  clientId: int("clientId"),
  professionalId: int("professionalId"),
  region: varchar("region", { length: 64 }),
  finishingStandard: mysqlEnum("finishingStandard", ["basic", "standard", "premium", "luxury"]),
  structureType: varchar("structureType", { length: 64 }),
  areaM2: decimal("areaM2", { precision: 10, scale: 2 }),
  estimatedCostMin: decimal("estimatedCostMin", { precision: 12, scale: 2 }),
  estimatedCostMax: decimal("estimatedCostMax", { precision: 12, scale: 2 }),
  questionnaire: json("questionnaire").$type<Record<string, unknown>>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── PROJECT COMMENTS (Comentários Colaborativos nas Plantas) ─────────────────
export const projectComments = mysqlTable("project_comments", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  userId: int("userId").notNull(),
  content: text("content").notNull(),
  positionX: decimal("positionX", { precision: 6, scale: 2 }), // coordenada na planta
  positionY: decimal("positionY", { precision: 6, scale: 2 }),
  imageIndex: int("imageIndex").default(0),
  parentId: int("parentId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

// ─── CONTACT MESSAGES (Fale Conosco) ──────────────────────────────────────────
export const contactMessages = mysqlTable("contact_messages", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  subject: varchar("subject", { length: 255 }).notNull(),
  message: text("message").notNull(),
  userId: int("userId"),
  status: mysqlEnum("status", ["pending", "replied", "closed"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  type: varchar("type", { length: 64 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content"),
  isRead: boolean("isRead").default(false).notNull(),
  metadata: json("metadata").$type<Record<string, unknown>>(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
