import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const invoiceRouter = router({
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.invoice.findMany({
      where: { userId: ctx.userId },
      include: { client: true },
      orderBy: { createdAt: 'desc' },
    });
  }),

  generate: protectedProcedure
    .input(z.object({
      clientId: z.string(),
      periodStart: z.coerce.date(),
      periodEnd: z.coerce.date(),
    }))
    .mutation(async ({ ctx, input }) => {
      const entries = await ctx.prisma.timeEntry.findMany({
        where: {
          userId: ctx.userId,
          project: { clientId: input.clientId },
          date: { gte: input.periodStart, lte: input.periodEnd },
        },
        include: { project: true },
      });

      const amount = entries.reduce(
        (sum, e) => sum + Math.round(e.hours * e.project.hourlyRate * 100), 0
      );

      return ctx.prisma.invoice.create({
        data: {
          amount,
          periodStart: input.periodStart,
          periodEnd: input.periodEnd,
          client: { connect: { id: input.clientId } },
          user: { connect: { id: ctx.userId } },
        },
      });
    }),

  updateStatus: protectedProcedure
    .input(z.object({ id: z.string(), status: z.enum(['draft', 'sent', 'paid']) }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.invoice.update({
        where: { id: input.id, userId: ctx.userId },
        data: { status: input.status },
      });
    }),
});
