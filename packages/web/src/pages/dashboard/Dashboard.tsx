import { trpc } from '../../utils/trpc';

export function Dashboard() {
  const { data: entries } = trpc.timeEntries.list.useQuery({});
  const { data: invoices } = trpc.invoices.list.useQuery();

  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay());

  const hoursThisWeek = entries
    ?.filter(e => new Date(e.date) >= weekStart)
    .reduce((s, e) => s + e.hours, 0) || 0;

  const monthEarnings = entries
    ?.filter(e => new Date(e.date).getMonth() === now.getMonth())
    .reduce((s, e) => s + e.hours * e.project.hourlyRate, 0) || 0;

  const unpaidInvoices = invoices?.filter(i => i.status !== 'paid') || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border p-6">
          <p className="text-sm text-gray-500">Hours this week</p>
          <p className="text-3xl font-bold">{hoursThisWeek.toFixed(1)}</p>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <p className="text-sm text-gray-500">Earnings this month</p>
          <p className="text-3xl font-bold">€{monthEarnings.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg border p-6">
          <p className="text-sm text-gray-500">Unpaid invoices</p>
          <p className="text-3xl font-bold">{unpaidInvoices.length}</p>
        </div>
      </div>
    </div>
  );
}
