import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { name: 'Trang chủ', path: '/' },
    { name: 'Giới thiệu', path: '/gioi-thieu' },
    { name: 'Sản phẩm In ấn', path: '/san-pham' },
    { name: 'Bảng giá', path: '/bang-gia' },
    { name: 'Tin tức', path: '/tin-tuc' },
    { name: 'Liên hệ', path: '/lien-he' }
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 shadow-sm bg-paper-white/95 backdrop-blur-md h-20 transition-all duration-300 border-b border-surface-container">
      <nav className="flex justify-between items-center px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto h-full">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <img src="/logo.png" alt="Xuân Nhĩ Logo" className="h-12 w-auto max-h-12 object-contain" />
          </Link>
          
          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`font-body-md text-sm transition-colors duration-200 py-4 ${
                    isActive 
                      ? 'text-vibrant-orange font-bold border-b-2 border-vibrant-orange' 
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
            <Link to="/login" className="material-symbols-outlined p-2 text-deep-navy hover:bg-surface-container rounded-full transition-all scale-95 active:opacity-80">
              person
            </Link>
            <Link to="/tinh-gia" className="material-symbols-outlined p-2 text-deep-navy hover:bg-surface-container rounded-full transition-all scale-95 active:opacity-80">
              shopping_cart
            </Link>
            <Link 
              to="/tinh-gia"
              className="bg-deep-navy text-paper-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-vibrant-orange hover:-translate-y-0.5 shadow-sm transition-all duration-200"
            >
              Nhận báo giá
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
