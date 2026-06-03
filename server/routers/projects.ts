import { protectedProcedure, publicProcedure, router } from "../_core/trpc";
import { getDb } from "../db";
import { projects, reviews as projectReviews } from "../../drizzle/schema";
import { eq, and, desc, like, gte, lte, sql } from "drizzle-orm";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const projectsRouter = router({
  // List projects with filters
  list: publicProcedure
    .input(z.object({
      query: z.string().optional(),
      category: z.string().optional(),
      architecturalStyle: z.string().optional(),
      minPrice: z.number().optional(),
      maxPrice: z.number().optional(),
      minRating: z.number().optional(),
      sortBy: z.enum(["relevance", "newest", "price_asc", "price_desc", "rating", "sales"]).default("relevance"),
      limit: z.number().min(1).max(100).default(20),
      offset: z.number().default(0),
    }).optional())
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "Database unavailable" });

      const filters = [];
      filters.push(eq(projects.status, "published"));

      if (input?.query) {
        filters.push(like(projects.title, `%${input.query}%`));
      }
      if (input?.category) {
        filters.push(eq(projects.category, input.category as any));
      }
      if (input?.minPrice !== undefined) {
        filters.push(gte(projects.price, String(input.minPrice)));
      }
      if (input?.maxPrice !== undefined) {
        filters.push(lte(projects.price, String(input.maxPrice)));
      }

      const rows = await db
        .select()
        .from(projects)
        .where(and(...filters))
        .orderBy(
          input?.sortBy === "price_asc" ? projects.price :
          input?.sortBy === "price_desc" ? desc(projects.price) :
          input?.sortBy === "rating" ? desc(projects.averageRating) :
          input?.sortBy === "sales" ? desc(projects.totalSales) :
          desc(projects.createdAt)
        )
        .limit(input?.limit ?? 20)
        .offset(input?.offset ?? 0);

      return rows;
    }),

  // Get single project
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const [project] = await db.select().from(projects).where(eq(projects.id, input.id)).limit(1);
      if (!project) throw new TRPCError({ code: "NOT_FOUND", message: "Projeto não encontrado" });

      // Increment view count
      await db.update(projects).set({ viewCount: sql`${projects.viewCount} + 1` }).where(eq(projects.id, input.id));

      const reviews = await db.select().from(projectReviews).where(eq(projectReviews.projectId, input.id)).orderBy(desc(projectReviews.createdAt)).limit(10);

      return { ...project, reviews };
    }),

  // Get my projects (professional)
  myProjects: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

    return db.select().from(projects).where(eq(projects.professionalId, ctx.user.id)).orderBy(desc(projects.createdAt));
  }),

  // Create project
  create: protectedProcedure
    .input(z.object({
      title: z.string().min(5).max(200),
      description: z.string().min(20),
      category: z.enum(["residential", "commercial", "industrial", "interior_design", "landscape", "urban_planning", "renovation", "other"]),
      architecturalStyle: z.string().optional(),
      areaM2: z.string().optional(),
      price: z.string(),
      tags: z.array(z.string()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const [result] = await db.insert(projects).values({
        professionalId: ctx.user.id,
        title: input.title,
        description: input.description,
        category: input.category,
        architecturalStyle: input.architecturalStyle,
        areaM2: input.areaM2,
        price: input.price,
        status: "draft",
        tags: input.tags ?? null,
      });

      return { id: (result as any).insertId };
    }),

  // Submit for review
  submitForReview: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      const [project] = await db.select().from(projects).where(and(eq(projects.id, input.id), eq(projects.professionalId, ctx.user.id))).limit(1);
      if (!project) throw new TRPCError({ code: "NOT_FOUND" });

      await db.update(projects).set({ status: "pending_review" }).where(eq(projects.id, input.id));
      return { success: true };
    }),

  // Submit review
  submitReview: protectedProcedure
    .input(z.object({
      projectId: z.number(),
      rating: z.number().min(1).max(5),
      comment: z.string().min(10).max(1000),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });

      await db.insert(projectReviews).values({
        projectId: input.projectId,
        reviewerId: ctx.user.id,
        professionalId: 0, // will be resolved from project
        orderId: 0, // will be resolved from order
        rating: input.rating,
        comment: input.comment,
      });

      // Update project average rating
      const reviews = await db.select().from(projectReviews).where(eq(projectReviews.projectId, input.projectId));
      const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      await db.update(projects).set({
        averageRating: avg.toFixed(2),
        totalReviews: reviews.length,
      }).where(eq(projects.id, input.projectId));

      return { success: true };
    }),
});
