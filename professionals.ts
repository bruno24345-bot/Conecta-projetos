import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { professionalProfiles, demands as reverseBids, bids as reverseBidProposals, users } from "../../drizzle/schema";
import { eq, and, desc } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const professionalsRouter = router({
  // Obter perfil profissional auditado
  myProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    const [profile] = await db.select().from(professionalProfiles)
      .where(eq(professionalProfiles.userId, ctx.user.id))
      .limit(1);

    return profile ?? null;
  }),

  // Atualizar perfil com auditoria de CREA/CAU
  upsertProfile: protectedProcedure
    .input(z.object({
      registrationType: z.enum(["CREA", "CAU"]),
      registrationNumber: z.string().min(5),
      registrationUF: z.string().length(2),
      specialties: z.array(z.string()).optional(),
      bio: z.string().max(1000).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const data = {
        userId: ctx.user.id,
        registrationType: input.registrationType,
        registrationNumber: input.registrationNumber,
        registrationUF: input.registrationUF,
        specialties: input.specialties ?? null,
        bio: input.bio,
        verificationStatus: "pending", // Sempre volta para pendente para nova auditoria
      };

      await db.insert(professionalProfiles).values(data)
        .onConflictDoUpdate({
          target: professionalProfiles.userId,
          set: {
            registrationType: input.registrationType,
            registrationNumber: input.registrationNumber,
            registrationUF: input.registrationUF,
            specialties: input.specialties ?? null,
            bio: input.bio,
            verificationStatus: "pending",
            updatedAt: new Date(),
          }
        });

      return { success: true, message: "Perfil enviado para auditoria manual." };
    }),

  // Listar lances reversos (Oportunidades PRODIN)
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

  // Criar demanda de lance reverso (Cliente)
  createReverseBid: protectedProcedure
    .input(z.object({
      title: z.string().min(10),
      description: z.string().min(20),
      category: z.string(),
      budgetMin: z.string(),
      budgetMax: z.string(),
      deadline: z.string(),
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

  // Enviar proposta (Apenas Profissionais Verificados)
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

      // Auditoria: Verificar se o profissional está aprovado
      const [profile] = await db.select().from(professionalProfiles)
        .where(eq(professionalProfiles.userId, ctx.user.id))
        .limit(1);

      if (!profile || profile.verificationStatus !== "approved") {
        throw new TRPCError({ 
          code: "FORBIDDEN", 
          message: "Apenas profissionais com CREA/CAU verificado podem enviar propostas." 
        });
      }

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
