import { systemRouter } from "./_core/systemRouter";
import { router } from "./_core/trpc";
import { projectsRouter } from "./routers/projects";
import { transactionsRouter } from "./routers/transactions";
import { professionalsRouter } from "./routers/professionals";
import { aiRouter } from "./routers/ai";
import { adminRouter } from "./routers/admin";
import { authRouter } from "./routers/auth";

export const appRouter = router({
  system: systemRouter,
  auth: authRouter,
  projects: projectsRouter,
  transactions: transactionsRouter,
  professionals: professionalsRouter,
  ai: aiRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
