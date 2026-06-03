import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { orders as transactions, subscriptions, users } from "../../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

// Commission rates
const COMMISSION_FREE = 0.10;
const COMMISSION_PREMIUM = 0.05;
const SECURITY_HOLD_DAYS = 15;

export const transactionsRouter = router({
  // Get my purchases (buyer)
  myPurchases: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return db.select().from(transactions)
      .where(eq(transactions.buyerId, ctx.user.id))
      .orderBy(desc(transactions.createdAt));
  }),

  // Get my sales (professional)
  mySales: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return db.select().from(transactions)
      .where(eq(transactions.professionalId, ctx.user.id))
      .orderBy(desc(transactions.createdAt));
  }),

  // Initiate purchase
  initiatePurchase: protectedProcedure
    .input(z.object({
      projectId: z.number(),
      paymentMethod: z.enum(["pix", "credit_card", "boleto"]),
      copyrightAgreed: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!input.copyrightAgreed) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Você deve aceitar os termos de direitos autorais." });
      }

      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      // In production: integrate with Stripe/Pagar.me
      // For now, return a mock checkout URL
      return {
        checkoutUrl: `https://checkout.conectaprojetos.com.br/pay/${input.projectId}`,
        transactionId: `TXN-${Date.now()}`,
      };
    }),

  // Get financial summary (professional)
  financialSummary: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const sales = await db.select().from(transactions)
      .where(and(eq(transactions.professionalId, ctx.user.id), eq(transactions.paymentStatus, "paid")));

    const totalGross = sales.reduce((sum, t) => sum + parseFloat(t.grossAmount ?? "0"), 0);
    const totalFees = sales.reduce((sum, t) => sum + parseFloat(t.platformFeeAmount ?? "0"), 0);
    const totalNet = sales.reduce((sum, t) => sum + parseFloat(t.netAmount ?? "0"), 0);

    const heldSales = sales.filter((t) => t.payoutStatus === "held");
    const heldAmount = heldSales.reduce((sum, t) => sum + parseFloat(t.netAmount ?? "0"), 0);

    const availableSales = sales.filter((t) => t.payoutStatus === "released");
    const availableAmount = availableSales.reduce((sum, t) => sum + parseFloat(t.netAmount ?? "0"), 0);

    return {
      totalGross,
      totalFees,
      totalNet,
      heldAmount,
      availableAmount,
      totalSales: sales.length,
    };
  }),

  // Subscribe to Premium
  subscribePremium: protectedProcedure
    .input(z.object({
      plan: z.enum(["premium_intro", "premium_full"]),
      paymentMethod: z.enum(["credit_card"]),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const priceMap = {
        premium_intro: "50.00",
        premium_full: "280.00",
      };

      // In production: integrate with Stripe Subscriptions
      return {
        checkoutUrl: `https://checkout.conectaprojetos.com.br/subscribe/${input.plan}`,
        subscriptionId: `SUB-${Date.now()}`,
      };
    }),

  // Get my subscription
  mySubscription: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const [sub] = await db.select().from(subscriptions)
      .where(and(eq(subscriptions.userId, ctx.user.id), eq(subscriptions.status, "active")))
      .orderBy(desc(subscriptions.createdAt))
      .limit(1);

    return sub ?? null;
  }),

  // Get commission rate for current user
  myCommissionRate: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const [activeSub] = await db.select().from(subscriptions)
      .where(and(eq(subscriptions.userId, ctx.user.id), eq(subscriptions.status, "active")))
      .limit(1);

    const isPremium = !!activeSub;
    return {
      rate: isPremium ? COMMISSION_PREMIUM : COMMISSION_FREE,
      percentage: isPremium ? 5 : 10,
      isPremium,
    };
  }),
});
