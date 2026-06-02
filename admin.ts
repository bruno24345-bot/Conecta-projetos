import { adminProcedure, adminSubProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { professionalProfiles, users, auditLogs, orders } from "../../drizzle/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const adminRouter = router({
  // List profiles for approval (SubAdmin can do this)
  pendingApprovals: adminSubProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return db.select().from(professionalProfiles)
      .where(eq(professionalProfiles.verificationStatus, "pending"))
      .orderBy(desc(professionalProfiles.createdAt));
  }),

  // Approve profile (SubAdmin can do this)
  approveProfile: adminSubProcedure
    .input(z.object({ id: z.number(), approve: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await db.update(professionalProfiles)
        .set({ 
          verificationStatus: input.approve ? "approved" : "rejected",
          verifiedAt: new Date(),
          verifiedBy: ctx.user.id
        })
        .where(eq(professionalProfiles.id, input.id));

      return { success: true };
    }),

  // View Financial GMV (Only Senior Admin)
  getFinancialReport: adminProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const results = await db.select({
      totalGross: sql<string>`sum(${orders.grossAmount})`,
      totalNet: sql<string>`sum(${orders.netAmount})`,
      totalFees: sql<string>`sum(${orders.platformFeeAmount})`,
      count: sql<number>`count(${orders.id})`,
    }).from(orders).where(eq(orders.paymentStatus, "paid"));

    return results[0];
  }),

  // List audit logs (Only Senior Admin)
  getAuditLogs: adminProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return db.select().from(auditLogs)
      .orderBy(desc(auditLogs.createdAt))
      .limit(100);
  }),
});
