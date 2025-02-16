import { useState } from 'react';
import { trpc } from '../../utils/trpc';

export function InvoicesPage() {
  const { data: invoices, refetch } = trpc.invoices.list.useQuery();
  const { data: clients } = trpc.clients.list.useQuery();
  const generate = trpc.invoices.generate.useMutation({ onSuccess: () => refetch() });
  const updateStatus = trpc.invoices.updateStatus.useMutation({ onSuccess: () => refetch() });

  const [clientId, setClientId] = useState('');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientId) return;
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    generate.mutate({ clientId, periodStart, periodEnd });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Invoices</h1>
      <form onSubmit={handleGenerate} className="bg-white rounded-lg border p-6 mb-6 flex gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Client</label>
          <select value={clientId} onChange={e => setClientId(e.target.value)} className="border rounded px-3 py-2">
            <option value="">Select client...</option>
            {clients?.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Generate Invoice</button>
      </form>

      <div className="bg-white rounded-lg border">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left text-sm text-gray-500">
              <th className="p-3">Client</th>
              <th className="p-3">Period</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices?.map(inv => (
              <tr key={inv.id} className="border-b last:border-0">
                <td className="p-3">{inv.client.name}</td>
                <td className="p-3 text-sm">
                  {new Date(inv.periodStart).toLocaleDateString()} - {new Date(inv.periodEnd).toLocaleDateString()}
                </td>
                <td className="p-3 font-mono">€{(inv.amount / 100).toFixed(2)}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    inv.status === 'paid' ? 'bg-green-100 text-green-800' :
                    inv.status === 'sent' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>{inv.status}</span>
                </td>
                <td className="p-3">
                  {inv.status === 'draft' && (
                    <button onClick={() => updateStatus.mutate({ id: inv.id, status: 'sent' })} className="text-sm text-blue-600 hover:underline">Mark Sent</button>
                  )}
                  {inv.status === 'sent' && (
                    <button onClick={() => updateStatus.mutate({ id: inv.id, status: 'paid' })} className="text-sm text-green-600 hover:underline">Mark Paid</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
