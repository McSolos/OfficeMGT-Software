import { NavLink } from 'react-router-dom';

const Sidebar = ({ user }) => {
  const role = user?.role;

  // Full list of links
  const allLinks = [
    { label: 'Make a Request', path: '/dashboard/make-request', roles: ['user', 'admin'] },
    { label: 'Request Log', path: '/dashboard/request-log', roles: ['user', 'admin'] },
    { label: 'Account', path: '/dashboard/account', roles: ['user', 'admin', 'superuser'] },
    { label: 'General Requests', path: '/dashboard/requests', roles: ['user', 'admin', 'superuser'] },
    { label: 'Open Stock', path: '/dashboard/open-stock', roles: ['user', 'admin', 'superuser'] },
    { label: 'Admin Summary', path: '/dashboard/admin-summary', roles: ['superuser'] },
    { label: 'Manage Users', path: '/dashboard/manage-users', roles: ['superuser'] },
    { label: 'Manage Requests', path: '/dashboard/manage-requests', roles: ['superuser'] },
    { label: 'Request Update', path: '/dashboard/request-update', roles: ['admin', 'superuser'] },
    { label: 'Help', path: '/dashboard/help', roles: ['user', 'admin', 'superuser'] },
  ];

  // Filter links based on user role
  const visibleLinks = allLinks.filter(link => link.roles.includes(role));

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col h-full">
      <div className="p-6 text-2xl font-bold border-b border-gray-200">YourCompany</div>
      <nav className="flex-1 overflow-y-auto">
        {visibleLinks.map(({ label, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `block px-6 py-3 hover:bg-blue-100 ${isActive ? 'bg-blue-50 font-semibold border-l-4 border-blue-600' : ''}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t text-sm text-gray-500">
        Logged in as <strong>{user?.username}</strong> ({user?.role})
      </div>
    </aside>
  );
};

export default Sidebar;
