import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, Search, ShoppingBag, Printer, ChevronDown, Phone, UserCircle } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full flex flex-col shadow-md z-50">
      
      {/* ----------------- DÒNG 1: TOP BAR (Nền trắng) ----------------- */}
      <div className="bg-white border-b border-slate-200 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Bên trái: Logo */}
          <Link to="/" className="flex items-center space-x-2 shrink-0">
            <span className="font-extrabold text-xl tracking-tight flex flex-col sm:flex-row sm:items-center">
              <span className="text-blue-800 font-extrabold text-lg sm:text-xl">XUÂN NHI</span>
              <span className="hidden sm:inline mx-1.5 text-slate-300">|</span>
              <span className="text-red-650 font-bold text-sm sm:text-base tracking-wide uppercase">PRINTING & DESIGN</span>
            </span>
          </Link>

          {/* Ở giữa: Menu chính */}
          <nav className="hidden lg:flex items-center space-x-6">
            <Link to="/" className="text-sm font-bold text-blue-900 hover:text-red-600 transition-colors tracking-wide">
              TRANG CHỦ
            </Link>
            <a href="#gioi-thieu" className="text-sm font-bold text-blue-900 hover:text-red-600 transition-colors tracking-wide">
              GIỚI THIỆU
            </a>
            <div className="relative group cursor-pointer flex items-center gap-1 py-2">
              <span className="text-sm font-bold text-blue-900 hover:text-red-600 transition-colors tracking-wide flex items-center">
                CỬA HÀNG
                <ChevronDown className="h-4 w-4 ml-1 stroke-[2.5]" />
              </span>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-xl shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200">
                <Link to="/" className="block px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-red-600 border-b border-slate-100">Túi Giấy</Link>
                <Link to="/" className="block px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-red-600 border-b border-slate-100">Hộp Giấy</Link>
                <Link to="/" className="block px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-red-600 border-b border-slate-100">Name Card</Link>
                <Link to="/" className="block px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-red-600">Thiệp Mời</Link>
              </div>
            </div>
            <a href="#tin-tuc" className="text-sm font-bold text-blue-900 hover:text-red-600 transition-colors tracking-wide">
              TIN TỨC
            </a>
            <a href="#lien-he" className="text-sm font-bold text-blue-900 hover:text-red-600 transition-colors tracking-wide">
              LIÊN HỆ
            </a>
          </nav>

          {/* Bên phải: Auth & Hotline */}
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-sm font-bold text-blue-900 hover:text-red-600 transition-colors flex items-center gap-1.5 uppercase">
              <UserCircle className="h-5 w-5" />
              <span className="hidden sm:inline">ĐĂNG NHẬP / ĐĂNG KÝ</span>
            </Link>
            
            <a 
              href="tel:0943126406" 
              className="px-6 py-2.5 bg-red-600 hover:bg-red-750 text-white text-sm font-extrabold rounded-full flex items-center space-x-1.5 shadow-md shadow-red-600/20 hover:shadow-red-600/30 hover:-translate-y-0.5 transition-all"
            >
              <Phone className="h-4 w-4 fill-white" />
              <span>0943126406</span>
            </a>
          </div>

        </div>
      </div>

      {/* ----------------- DÒNG 2: BOTTOM BAR (Nền xanh dương đậm - Navy Blue) ----------------- */}
      <div className="bg-[#2a328f] w-full text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Bên trái: Nút Danh mục */}
          <div className="bg-[#c20088] px-6 h-12 flex items-center space-x-2 shrink-0 cursor-pointer hover:bg-[#a10071] transition-colors select-none">
            <Menu className="h-5 w-5" />
            <span className="font-extrabold text-xs tracking-wider uppercase">DANH MỤC SẢN PHẨM</span>
          </div>

          {/* Ở giữa: Thanh tìm kiếm (Search Bar) */}
          <div className="flex-grow max-w-xl mx-4 py-1.5 hidden md:block">
            <div className="relative flex items-center w-full bg-white rounded-full p-1 shadow-inner">
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                className="w-full pl-5 pr-14 py-1.5 text-xs text-slate-800 bg-transparent placeholder-slate-400 focus:outline-none"
              />
              <button 
                className="absolute right-1 top-1 bottom-1 px-4 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full flex items-center justify-center transition-colors shadow-sm"
                aria-label="Tìm kiếm"
              >
                <Search className="h-4 w-4 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Bên phải: Các nút Tiện ích */}
          <div className="flex items-center space-x-3 px-4 h-12">
            <Link 
              to="/" 
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-[10px] font-extrabold rounded-full flex items-center gap-1.5 uppercase transition-colors"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>GIỎ HÀNG</span>
            </Link>
            <a 
              href="#quote-form" 
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-[10px] font-extrabold rounded-full flex items-center gap-1.5 uppercase transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>BÁO GIÁ</span>
            </a>
          </div>

        </div>
      </div>

    </header>
  );
}
