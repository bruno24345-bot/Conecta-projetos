import { NOT_ADMIN_ERR_MSG, UNAUTHED_ERR_MSG } from '@shared/const';
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import type { TrpcContext } from "./context";
import { getDb } from "../db";
import { auditLogs } from "../../drizzle/schema";

const t = initTRPC.context<TrpcContext>().create({
  transformer: superjson,
});

export const router = t.router;
export const publicProcedure = t.procedure;

const requireUser = t.middleware(async opts => {
  const { ctx, next } = opts;

  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: UNAUTHED_ERR_MSG });
  }

  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(requireUser);

// Admin Sênior (Poder total)
export const adminProcedure = t.procedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;

    if (!ctx.user || ctx.user.role !== 'admin') {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
      },
    });
  }),
);

// Admin Subalterno (Poderes limitados)
export const adminSubProcedure = t.procedure.use(
  t.middleware(async opts => {
    const { ctx, next } = opts;

    const isAdmin = ctx.user?.role === 'admin';
    const isAdminSub = ctx.user?.role === 'admin_sub';

    if (!ctx.user || (!isAdmin && !isAdminSub)) {
      throw new TRPCError({ code: "FORBIDDEN", message: NOT_ADMIN_ERR_MSG });
    }

    return next({
      ctx: {
        ...ctx,
        user: ctx.user,
        isAdminSenior: isAdmin,
      },
    });
  }),
);

// Middleware para logs de auditoria
export const auditLogger = t.middleware(async ({ ctx, next, path, type }) => {
  const result = await next();
  
  if (ctx.user && (ctx.user.role === 'admin' || ctx.user.role === 'admin_sub')) {
    const db = await getDb();
    if (db) {
      try {
        await db.insert(auditLogs).values({
          userId: ctx.user.id,
          action: `${type.toUpperCase()}: ${path}`,
          status: result.ok ? 'success' : 'failure',
          ipAddress: ctx.req.ip,
          details: {
            input: (ctx as any).rawInput,
            error: !result.ok ? (result as any).error?.message : undefined
          }
        });
      } catch (err) {
        console.error("[Audit] Failed to log action:", err);
      }
    }
  }
  
  return result;
});
