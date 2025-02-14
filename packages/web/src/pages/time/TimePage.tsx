import { useState } from 'react';
import { trpc } from '../../utils/trpc';

export function TimePage() {
  const { data: entries, refetch } = trpc.timeEntries.list.useQuery({});
  const { data: projects } = trpc.projects.list.useQuery();
  const logEntry = trpc.timeEntries.log.useMutation({ onSuccess: () => refetch() });

  const [projectId, setProjectId] = useState('');
  const [hours, setHours] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectId || !hours) return;
    logEntry.mutate({ projectId, date: new Date(), hours: parseFloat(hours), note: note || undefined });
    setHours('');
    setNote('');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Log Time</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6 mb-6 flex gap-4 items-end">
        <div>
          <label className="block text-sm text-gray-500 mb-1">Project</label>
          <select value={projectId} onChange={e => setProjectId(e.target.value)} className="border rounded px-3 py-2">
            <option value="">Select...</option>
            {projects?.map(p => <option key={p.id} value={p.id}>{p.client.name} - {p.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Hours</label>
          <input type="number" step="0.25" value={hours} onChange={e => setHours(e.target.value)} className="border rounded px-3 py-2 w-24" />
        </div>
        <div>
          <label className="block text-sm text-gray-500 mb-1">Note</label>
          <input type="text" value={note} onChange={e => setNote(e.target.value)} className="border rounded px-3 py-2" />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Log</button>
      </form>

      <div className="bg-white rounded-lg border">
        <table className="w-full">
          <thead className="border-b">
            <tr className="text-left text-sm text-gray-500">
              <th className="p-3">Date</th>
              <th className="p-3">Project</th>
              <th className="p-3">Hours</th>
              <th className="p-3">Note</th>
            </tr>
          </thead>
          <tbody>
            {entries?.map(e => (
              <tr key={e.id} className="border-b last:border-0">
                <td className="p-3">{new Date(e.date).toLocaleDateString()}</td>
                <td className="p-3">{e.project.client.name} - {e.project.name}</td>
                <td className="p-3">{e.hours}h</td>
                <td className="p-3 text-gray-500">{e.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
