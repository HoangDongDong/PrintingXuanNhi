import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Printer, LayoutDashboard, Home, User, LogOut, Phone, MapPin, Mail, Clock, Sun, Moon } from 'lucide-react';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  const toggleDarkMode = () => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 group">
            <div className="p-2 rounded-xl bg-primary-50 dark:bg-primary-950/50 group-hover:scale-105 transition-all duration-300">
              <Printer className="h-6 w-6 stroke-[2]" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-primary-600 to-indigo-600 dark:from-primary-400 dark:to-indigo-400 bg-clip-text text-transparent">
              XUÂN NHI PRINTING
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-1 items-center">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                location.pathname === '/' 
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/30 dark:text-primary-400' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Trang chủ</span>
            </Link>
            <Link 
              to="/admin" 
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                location.pathname === '/admin' 
                  ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/30 dark:text-primary-400' 
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Quản trị (Admin)</span>
            </Link>
          </nav>

          {/* User Controls / Actions */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode toggle */}
            <button 
              onClick={toggleDarkMode} 
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {user ? (
              <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-800/60 p-1.5 pl-3 rounded-2xl">
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{user.role}</p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{user.username}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all duration-200"
                  title="Đăng xuất"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-5 py-2.5 rounded-xl text-sm font-bold bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-600/30 hover:-translate-y-0.5 transition-all duration-250 flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Đăng Nhập</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-md font-bold uppercase tracking-wider text-slate-800 dark:text-slate-100 mb-4 flex items-center space-x-2">
                <Printer className="h-5 w-5 text-primary-500" />
                <span>CÔNG TY TNHH TM DV IN ẤN XUÂN NHI</span>
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                Chúng tôi cung cấp các giải pháp thiết kế và in ấn chất lượng cao: In namecard, túi giấy, hộp giấy, nhãn decal, catalogue và nhiều ấn phẩm quảng cáo cao cấp khác.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-sm">Liên Hệ</h4>
                <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
                  <li className="flex items-start space-x-2.5">
                    <Phone className="h-4.5 w-4.5 text-primary-500 shrink-0 mt-0.5" />
                    <span>Hotline: 0943 126 406</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Mail className="h-4.5 w-4.5 text-primary-500 shrink-0 mt-0.5" />
                    <span className="break-all">inanxuannhi@gmail.com</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-slate-800 dark:text-slate-200 mb-3 text-sm">Địa Chỉ & Giờ Làm Việc</h4>
                <ul className="space-y-2.5 text-sm text-slate-500 dark:text-slate-400">
                  <li className="flex items-start space-x-2.5">
                    <MapPin className="h-4.5 w-4.5 text-primary-500 shrink-0 mt-0.5" />
                    <span>58/7A Đường Tân Lập 1, Phường Tăng Nhơn Phú, TP Hồ Chí Minh</span>
                  </li>
                  <li className="flex items-start space-x-2.5">
                    <Clock className="h-4.5 w-4.5 text-primary-500 shrink-0 mt-0.5" />
                    <span>Thứ 2 - Thứ 7: 8h00 - 20h30 (Chủ nhật: Nghỉ)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
            <p>&copy; {new Date().getFullYear()} In Ấn Xuân Nhi. All rights reserved.</p>
            <p className="mt-2 sm:mt-0">Thiết kế bởi Đội ngũ kỹ thuật</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
