import { router, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const clientRouter = router({
  list: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.client.findMany({
      where: { userId: ctx.userId },
      include: { projects: true },
    });
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string(), email: z.string().email().optional() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.client.create({
        data: {
          name: input.name,
          email: input.email,
          user: { connect: { id: ctx.userId } },
        },
      });
    }),
});
