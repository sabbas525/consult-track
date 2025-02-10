import { createHTTPServer } from '@trpc/server/adapters/standalone';
import { appRouter } from './routers';
import { createContext } from './context';

const server = createHTTPServer({
  router: appRouter,
  createContext,
});

server.listen(3001);
console.log('tRPC server listening on http://localhost:3001');

export type { AppRouter } from './routers';
