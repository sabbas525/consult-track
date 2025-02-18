import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const timeEntryRouter = router({
  list: protectedProcedure
    .input(z.object({ projectId: z.string().optional() }).optional())
    .query(({ ctx, input }) => {
      return ctx.prisma.timeEntry.findMany({
        where: { userId: ctx.userId, projectId: input?.projectId },
        include: { project: { include: { client: true } } },
        orderBy: { date: 'desc' },
        take: 50,
      });
    }),

  log: protectedProcedure
    .input(z.object({
      projectId: z.string(),
      date: z.coerce.date(),
      hours: z.number().positive(),
      note: z.string().optional(),
    }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.timeEntry.create({
        data: {
          date: input.date,
          hours: input.hours,
          note: input.note,
          project: { connect: { id: input.projectId } },
          user: { connect: { id: ctx.userId } },
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.timeEntry.delete({
        where: { id: input.id, userId: ctx.userId },
      });
    }),
});
