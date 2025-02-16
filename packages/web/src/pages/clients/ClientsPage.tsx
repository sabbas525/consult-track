import { useState } from 'react';
import { trpc } from '../../utils/trpc';

export function ClientsPage() {
  const { data: clients, refetch } = trpc.clients.list.useQuery();
  const createClient = trpc.clients.create.useMutation({ onSuccess: () => refetch() });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;
    createClient.mutate({ name, email: email || undefined });
    setName('');
    setEmail('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Clients</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6 mb-6 flex gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="border rounded px-3 py-2" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Client</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clients?.map(c => (
          <div key={c.id} className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold">{c.name}</h3>
            {c.email && <p className="text-sm text-gray-500">{c.email}</p>}
            <p className="text-sm mt-2">{c.projects.length} project(s)</p>
          </div>
        ))}
      </div>
    </div>
  );
}
