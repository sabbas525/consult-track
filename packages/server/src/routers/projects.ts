import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const projectRouter = router({
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.project.findMany({
      where: { userId: ctx.userId },
      include: { client: true },
    });
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string(), hourlyRate: z.number(), clientId: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.project.create({
        data: {
          name: input.name,
          hourlyRate: input.hourlyRate,
          client: { connect: { id: input.clientId } },
          user: { connect: { id: ctx.userId } },
        },
      });
    }),
});
