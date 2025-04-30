// src/pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const navItems = [
  'Make a Request',
  'Request Log',
  'Requests',
  'Account',
  'Open Stock',
  'Admin Summary',
  'Manage Users',
  'Help'
];

const Dashboard = () => {
  const { user } = useAuth();
  const [active, setActive] = useState('Make a Request');

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}x
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-200">YourCompany</div>
        <nav className="flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              className={`w-full text-left px-6 py-3 text-gray-700 hover:bg-blue-100 ${
                active === item ? 'bg-blue-50 font-semibold border-l-4 border-blue-600' : ''
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t text-sm text-gray-500">
          Logged in as <strong>({user?.name})</strong> ({user?.role})
          ({user.id})
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-semibold mb-4">{active}</h1>
        <div className="bg-white p-6 rounded shadow">
          {/* Placeholder content for now */}
          <p>This is the <strong>{active}</strong> page.</p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
