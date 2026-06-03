import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { professionalProfiles, demands as reverseBids, bids as reverseBidProposals } from "../../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const professionalsRouter = router({
  // Get my professional profile
  myProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const [profile] = await db.select().from(professionalProfiles)
      .where(eq(professionalProfiles.userId, ctx.user.id))
      .limit(1);

    return profile ?? null;
  }),

  // Create or update professional profile
  upsertProfile: protectedProcedure
    .input(z.object({
      registrationType: z.enum(["CREA", "CAU"]),
      registrationNumber: z.string().min(5),
      registrationUF: z.string().length(2),
      specialties: z.array(z.string()).optional(),
      bio: z.string().max(1000).optional(),
      portfolioUrl: z.string().url().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const existing = await db.select().from(professionalProfiles)
        .where(eq(professionalProfiles.userId, ctx.user.id))
        .limit(1);

      if (existing.length > 0) {
        await db.update(professionalProfiles).set({
          registrationType: input.registrationType,
          registrationNumber: input.registrationNumber,
          registrationUF: input.registrationUF,
          specialties: input.specialties ?? null,
          bio: input.bio,
          portfolioUrls: input.portfolioUrl ? [input.portfolioUrl] : null,
          verificationStatus: "pending",
        }).where(eq(professionalProfiles.userId, ctx.user.id));
      } else {
        await db.insert(professionalProfiles).values({
          userId: ctx.user.id,
          registrationType: input.registrationType,
          registrationNumber: input.registrationNumber,
          registrationUF: input.registrationUF,
          specialties: input.specialties ?? null,
          bio: input.bio,
          portfolioUrls: input.portfolioUrl ? [input.portfolioUrl] : null,
          verificationStatus: "pending",
        });
      }

      return { success: true };
    }),

  // List open reverse bids
  listReverseBids: publicProcedure
    .input(z.object({
      category: z.string().optional(),
      limit: z.number().default(20),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      return db.select().from(reverseBids)
        .where(eq(reverseBids.status, "open"))
        .orderBy(desc(reverseBids.createdAt))
        .limit(input?.limit ?? 20);
    }),

  // Create reverse bid (client)
  createReverseBid: protectedProcedure
    .input(z.object({
      title: z.string().min(10),
      description: z.string().min(20),
      category: z.string(),
      budgetMin: z.string(),
      budgetMax: z.string(),
      deadline: z.string(),
      location: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await db.insert(reverseBids).values({
        clientId: ctx.user.id,
        title: input.title,
        description: input.description,
        category: input.category,
        budgetMin: input.budgetMin,
        budgetMax: input.budgetMax,
        deadline: new Date(input.deadline),
        status: "open",
      });

      return { success: true };
    }),

  // Submit proposal on reverse bid (professional)
  submitProposal: protectedProcedure
    .input(z.object({
      reverseBidId: z.number(),
      proposedPrice: z.string(),
      description: z.string().min(20),
      estimatedDays: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await db.insert(reverseBidProposals).values({
        demandId: input.reverseBidId,
        professionalId: ctx.user.id,
        proposedAmount: input.proposedPrice,
        proposalText: input.description,
        estimatedDays: input.estimatedDays,
        status: "pending",
      });

      return { success: true };
    }),
});
