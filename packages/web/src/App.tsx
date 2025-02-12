import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Dashboard } from './pages/dashboard/Dashboard';
import { TimePage } from './pages/time/TimePage';
import { ClientsPage } from './pages/clients/ClientsPage';
import { InvoicesPage } from './pages/invoices/InvoicesPage';

export function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <nav className="bg-white border-b px-6 py-3 flex gap-6">
          <NavLink to="/" className={({ isActive }) => isActive ? 'font-semibold' : ''}>Dashboard</NavLink>
          <NavLink to="/time" className={({ isActive }) => isActive ? 'font-semibold' : ''}>Time</NavLink>
          <NavLink to="/clients" className={({ isActive }) => isActive ? 'font-semibold' : ''}>Clients</NavLink>
          <NavLink to="/invoices" className={({ isActive }) => isActive ? 'font-semibold' : ''}>Invoices</NavLink>
        </nav>
        <main className="p-6 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/time" element={<TimePage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/invoices" element={<InvoicesPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
