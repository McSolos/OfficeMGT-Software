// src/pages/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import Logo from '../../public/Screenshot_20250416-075243_WhatsApp.jpg'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Login failed');

      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Logo */}
      <div className="w-1/2 bg-blue-800 text-white flex justify-center items-center text-4xl font-bold">
        Luxsit Integration
        {/* <img src="/FrontEnd/public/Screenshot_20250416-075243_WhatsApp.jpg" alt="" /> */}
        {/* <img src={Logo} alt="" /> */}
      </div>

      {/* Right - Form */}
      <div className="w-1/2 flex justify-center items-center">
        <form onSubmit={handleLogin} className="bg-white shadow-md p-10 rounded-xl w-[400px] space-y-6">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <input
            type="text"
            placeholder="Username"
            className="w-full border px-4 py-2 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border px-4 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
