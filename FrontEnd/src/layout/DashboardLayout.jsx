import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

const DashboardLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar user={user} />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
