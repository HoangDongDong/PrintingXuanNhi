import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Giới thiệu', path: '/gioi-thieu' },
    { name: 'Sản phẩm In ấn', path: '/san-pham' },
    { name: 'Bảng giá', path: '/bang-gia' },
    { name: 'Tuyển dụng', path: '/tuyen-dung' },
    { name: 'Liên hệ', path: '/lien-he' }
  ];

  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [location]);

  return (
    <header className="sticky top-0 left-0 right-0 z-50 shadow-sm bg-paper-white/95 backdrop-blur-md h-20 transition-all duration-300 border-b border-surface-container">
      <nav className="flex justify-between items-center px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto h-full">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Xuân Nhĩ Logo" className="h-16 w-auto max-h-16 object-contain" />
          </Link>
          
          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-body-md text-xs xl:text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-200 py-4 ${
                    isActive 
                      ? 'text-vibrant-orange border-b-2 border-vibrant-orange' 
                      : 'text-on-surface-variant hover:text-vibrant-orange'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            {user ? (
              <Link 
                to="/ho-so" 
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl text-xs font-bold text-deep-navy dark:text-slate-200 transition-all"
                title="Xem hồ sơ"
              >
                <span className="material-symbols-outlined text-[18px]">account_circle</span>
                <span className="hidden sm:inline line-clamp-1 max-w-[80px]">{user.username}</span>
              </Link>
            ) : (
              <Link 
                to="/login" 
                className="material-symbols-outlined p-2 text-deep-navy hover:bg-surface-container rounded-full transition-all scale-95 active:opacity-80"
                title="Đăng nhập"
              >
                person
              </Link>
            )}
            <Link to="/tinh-gia" className="material-symbols-outlined p-2 text-deep-navy hover:bg-surface-container rounded-full transition-all scale-95 active:opacity-80">
              shopping_cart
            </Link>
            <Link 
              to="/tinh-gia"
              className="bg-deep-navy text-paper-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-vibrant-orange hover:-translate-y-0.5 shadow-sm transition-all duration-200 whitespace-nowrap"
            >
              Nhận báo giá
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
