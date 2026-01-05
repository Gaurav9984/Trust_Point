import React, { useState } from 'react';
// Eye icon SVG (or you can use any icon library)
const EyeIcon = ({ open }) => (
  <svg height="20" width="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    {open ? (
      <path d="M1 10C1 10 4.5 4 10 4C15.5 4 19 10 19 10C19 10 15.5 16 10 16C4.5 16 1 10 1 10Z" stroke="#555" strokeWidth="2"/>
    ) : (
      <>
        <path d="M1 10C1 10 4.5 4 10 4C15.5 4 19 10 19 10C19 10 15.5 16 10 16C4.5 16 1 10 1 10Z" stroke="#555" strokeWidth="2"/>
        <line x1="3" y1="17" x2="17" y2="3" stroke="#555" strokeWidth="2"/>
      </>
    )}
  </svg>
);
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

 function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Fixed admin credentials
    const ADMIN_EMAIL = "RavindraTrust@gmail.com";
    const ADMIN_PASSWORD = "Trust4Ravindra@0000";
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      // You can set a dummy token and user info
      localStorage.setItem('admin_token', 'fixed_admin_token');
      localStorage.setItem('admin_user', JSON.stringify({ id: 'admin-fixed-id', name: 'Admin', email: ADMIN_EMAIL }));
      toast.success('Admin logged in');
      navigate('/admin/dashboard');
    } else {
      toast.error('Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F0D3] p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded pr-10"
            />
            <span
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-9 cursor-pointer"
              tabIndex={0}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeIcon open={showPassword} />
            </span>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AdminLogin;
// AdminLogin exported above as default function