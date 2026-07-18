import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Vui lòng nhập đầy đủ thông tin đăng nhập.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const res = await axios.post('/api/auth/login', { email, password });
      
      // Store token and user details
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      
      navigate('/admin');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại email/mật khẩu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12">
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-primary-500 to-indigo-600" />
        
        <Link to="/" className="inline-flex items-center text-xs font-semibold text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1.5" />
          Về trang chủ
        </Link>

        <h2 className="text-2xl font-extrabold tracking-tight">Đăng nhập tài khoản</h2>
        <p className="text-sm text-slate-400 mt-1 mb-6">Đăng nhập quản trị viên để cập nhật danh mục</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-450 mb-1.5">Địa chỉ Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="inanxuannhi@gmail.com" 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-450 mb-1.5">Mật khẩu</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="p-4 rounded-xl text-sm bg-red-50 dark:bg-red-950/20 text-red-850 dark:text-red-300 border border-red-100 dark:border-red-900/40 flex items-start space-x-2.5">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 rounded-xl text-sm font-bold bg-primary-600 hover:bg-primary-750 text-white disabled:opacity-50 transition-all shadow-lg shadow-primary-600/20 flex items-center justify-center space-x-2"
          >
            <LogIn className="h-4.5 w-4.5" />
            <span>{loading ? 'Đang xác thực...' : 'Đăng Nhập'}</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-400 space-y-2">
          <p className="font-semibold text-slate-500 dark:text-slate-300">Tài khoản demo:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Email: <code className="text-primary-500 bg-slate-50 dark:bg-slate-800 px-1 py-0.5 rounded">inanxuannhi@gmail.com</code> / Pass: <code className="text-primary-500 bg-slate-50 dark:bg-slate-800 px-1 py-0.5 rounded">admin123</code></li>
            <li>Email: <code className="text-primary-500 bg-slate-50 dark:bg-slate-800 px-1 py-0.5 rounded">nguyenvana@gmail.com</code> / Pass: <code className="text-primary-500 bg-slate-50 dark:bg-slate-800 px-1 py-0.5 rounded">customer123</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
