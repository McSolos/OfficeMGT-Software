// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import DashboardLayout from './layout/DashboardLayout';

import MakeRequest from './pages/MakeRequest';
import RequestLog from './pages/RequestLog';
import Account from './pages/Account';
import Requests from './pages/Requests';
import OpenStock from './pages/OpenStock';
import AdminSummary from './pages/AdminSummary';
import ManageUsers from './pages/ManageUsers';
import Help from './pages/Help';
import MyRequests from './pages/MyRequests';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

  const user = [
    {role: "admin"},
    {role: "superuser"},
    {role: "user"}
  ]

function App() {
  return ( 
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route path="make-request" element={<MakeRequest />} />
        <Route path="myrequests" element={<MyRequests />} />
        <Route path="request-log" element={<RequestLog />} />
        <Route path="account" element={<Account />} />
        <Route path="requests" element={<Requests />} />
        <Route path="open-stock" element={<OpenStock />} />
        <Route path="admin-summary" element={<AdminSummary />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="help" element={<Help />} />
        <Route
          index
          element={
            user.role === "superuser" ? (
              <Navigate to="account" />
            ) : (
              <Navigate to="make-request" />
            )
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
