import { prisma } from './db';
import { IncomingMessage } from 'http';

export function createContext({ req }: { req: IncomingMessage }) {
  const userId = req.headers['x-user-id'] as string || 'demo-user';
  return { prisma, userId };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
