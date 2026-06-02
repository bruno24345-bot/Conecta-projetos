import { publicProcedure, protectedProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { users, auditLogs } from "../../drizzle/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "../_core/cookies";

export const authRouter = router({
  // Obter dados do usuário logado
  me: publicProcedure.query(({ ctx }) => ctx.user),

  // Logout com registro de auditoria
  logout: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (db) {
      await db.insert(auditLogs).values({
        userId: ctx.user.id,
        action: "LOGOUT",
        entityType: "USER",
        entityId: ctx.user.id.toString(),
        details: { method: ctx.user.loginMethod },
        status: "success",
        ipAddress: ctx.req.ip,
      });
    }

    const cookieOptions = getSessionCookieOptions(ctx.req);
    ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
    return { success: true };
  }),

  // Configurar 2FA (TOTP)
  setup2FA: protectedProcedure.mutation(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    // Em produção, geraria um segredo TOTP real
    const secret = "PRODIN-2FA-" + Math.random().toString(36).substring(7).toUpperCase();
    
    await db.update(users)
      .set({ twoFactorSecret: secret, updatedAt: new Date() })
      .where(eq(users.id, ctx.user.id));

    return { secret, qrCodePlaceholder: `otpauth://totp/ConectaProjetos:${ctx.user.email}?secret=${secret}&issuer=ConectaProjetos` };
  }),

  // Ativar/Desativar 2FA
  toggle2FA: protectedProcedure
    .input(z.object({ enable: z.boolean(), code: z.string().length(6) }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      // Simulação de validação de código
      if (input.code !== "123456" && process.env.NODE_ENV === "production") {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Código 2FA inválido." });
      }

      await db.update(users)
        .set({ twoFactorEnabled: input.enable, updatedAt: new Date() })
        .where(eq(users.id, ctx.user.id));

      await db.insert(auditLogs).values({
        userId: ctx.user.id,
        action: input.enable ? "2FA_ENABLED" : "2FA_DISABLED",
        entityType: "USER",
        entityId: ctx.user.id.toString(),
        status: "success",
        ipAddress: ctx.req.ip,
      });

      return { success: true };
    }),
});
