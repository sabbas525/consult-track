import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@consult-track/server';

export const trpc = createTRPCReact<AppRouter>();
