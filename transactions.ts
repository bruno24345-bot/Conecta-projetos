import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { orders as transactions, subscriptions, users, referrals } from "../../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

// Matriz PRODIN - Regras de Negócio
const COMMISSION_FREE = 0.10; // 10%
const COMMISSION_PREMIUM = 0.05; // 5%
const REFERRAL_DISCOUNT = 0.075; // 7.5% de desconto via indicação
const SECURITY_HOLD_DAYS = 15; // Retenção para garantia do cliente

export const transactionsRouter = router({
  // Obter compras do comprador
  myPurchases: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return db.select().from(transactions)
      .where(eq(transactions.buyerId, ctx.user.id))
      .orderBy(desc(transactions.createdAt));
  }),

  // Obter vendas do profissional
  mySales: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return db.select().from(transactions)
      .where(eq(transactions.professionalId, ctx.user.id))
      .orderBy(desc(transactions.createdAt));
  }),

  // Iniciar compra segura (Pagar.me)
  initiatePurchase: protectedProcedure
    .input(z.object({
      projectId: z.number(),
      paymentMethod: z.enum(["pix", "credit_card", "boleto"]),
      copyrightAgreed: z.boolean(),
      referralCode: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!input.copyrightAgreed) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "A ciência dos direitos autorais é obrigatória." });
      }

      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      // Lógica de Indicação PRODIN (7.5% OFF)
      let discountRate = 0;
      if (input.referralCode) {
        const [ref] = await db.select().from(referrals)
          .where(and(eq(referrals.code, input.referralCode), eq(referrals.status, "active")))
          .limit(1);
        
        if (ref) {
          discountRate = REFERRAL_DISCOUNT;
        }
      }

      // Inicia integração com Pagar.me Checkout
      return {
        checkoutUrl: `https://checkout.pagar.me/conecta/${input.projectId}?discount=${discountRate}`,
        transactionId: `PRODIN-${Date.now()}`,
        discountApplied: discountRate > 0,
      };
    }),

  // Resumo financeiro com split de taxas
  financialSummary: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const sales = await db.select().from(transactions)
      .where(and(eq(transactions.professionalId, ctx.user.id), eq(transactions.paymentStatus, "paid")));

    // Cálculo dinâmico baseado no tipo de conta (Free/Premium)
    const [user] = await db.select().from(users).where(eq(users.id, ctx.user.id)).limit(1);
    const commissionRate = user?.accountType === "premium" ? COMMISSION_PREMIUM : COMMISSION_FREE;

    const totalGross = sales.reduce((sum, t) => sum + Number(t.grossAmount ?? 0), 0);
    const totalFees = totalGross * commissionRate;
    const totalNet = totalGross - totalFees;

    return {
      totalGross,
      totalFees,
      totalNet,
      commissionPercentage: commissionRate * 100,
      totalSales: sales.length,
    };
  }),

  // Assinatura Premium - Valores Auditados
  subscribePremium: protectedProcedure
    .input(z.object({
      planType: z.enum(["monthly_intro", "monthly_standard", "annual"]),
    }))
    .mutation(async ({ ctx, input }) => {
      // Valores auditados conforme PDF 2.0
      const prices = {
        monthly_intro: "50.00", // 3 primeiros meses
        monthly_standard: "280.00", // Padrão
        annual: "2800.00", // Anual
      };

      return {
        checkoutUrl: `https://checkout.pagar.me/conecta/subscribe/${input.planType}`,
        price: prices[input.planType],
      };
    }),
});
