import { router } from '../trpc';
import { clientRouter } from './clients';
import { projectRouter } from './projects';
import { timeEntryRouter } from './timeEntries';
import { invoiceRouter } from './invoices';

export const appRouter = router({
  clients: clientRouter,
  projects: projectRouter,
  timeEntries: timeEntryRouter,
  invoices: invoiceRouter,
});

export type AppRouter = typeof appRouter;
