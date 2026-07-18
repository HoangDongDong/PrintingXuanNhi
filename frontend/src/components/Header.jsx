import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { name: 'Services', path: '/' },
    { name: 'Wedding Cards', path: '/wedding-cards' },
    { name: 'Paper Bags', path: '/paper-bags' },
    { name: 'Brochures', path: '/brochures' },
    { name: 'Stationery', path: '/stationery' },
    { name: 'Portfolio', path: '/portfolio' },
  ];

  return (
    <header className="w-full bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          <span className="font-serif text-xl font-bold tracking-tight text-[#0F2253]">
            Xuan Nhi Printing
          </span>
        </Link>

        {/* Center: Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = item.name === 'Services' && location.pathname === '/';
            return (
              <Link
                key={item.name}
                to="/"
                className={`text-[15px] font-medium tracking-wide transition-all py-2 relative ${
                  isActive
                    ? 'text-amber-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Search & Action Button */}
        <div className="flex items-center space-x-6">
          <button 
            className="text-slate-500 hover:text-[#0F2253] transition-colors p-1" 
            aria-label="Search"
          >
            <Search className="h-5 w-5 stroke-[2]" />
          </button>
          
          <Link 
            to="/" 
            className="px-5 py-2.5 bg-[#F38E36] hover:bg-[#e07b22] text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
          >
            Get a Quote
          </Link>
        </div>

      </div>
    </header>
  );
}
