import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-ink-black text-paper-white border-t border-white/5">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter px-margin-mobile md:px-margin-desktop py-16 max-w-[1200px] mx-auto">
        {/* Brand Column */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Xuân Nhĩ Logo" className="h-10 w-10 object-contain bg-white rounded-md p-0.5" />
            <span className="font-display-lg text-xl font-bold text-paper-white tracking-tight">
              XUÂN NHI
            </span>
          </Link>
          <p className="text-surface-variant text-sm opacity-80 leading-relaxed max-w-xs">
            Đơn vị cung cấp giải pháp in ấn hàng đầu Việt Nam. Cam kết chất lượng, tiến độ và sự hài lòng tuyệt đối của khách hàng.
          </p>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full border border-surface-variant flex items-center justify-center hover:bg-vibrant-orange hover:border-vibrant-orange transition-all" href="#">
              <span className="material-symbols-outlined text-sm">public</span>
            </a>
            <a className="w-10 h-10 rounded-full border border-surface-variant flex items-center justify-center hover:bg-vibrant-orange hover:border-vibrant-orange transition-all" href="#">
              <span className="material-symbols-outlined text-sm">share</span>
            </a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-6 text-sm">
          <h4 className="font-bold text-lg text-white">Thông tin liên hệ</h4>
          <ul className="space-y-4 text-surface-variant">
            <li className="flex items-start gap-3 hover:text-primary-fixed transition-colors">
              <span className="material-symbols-outlined text-vibrant-orange">location_on</span>
              <span>58/7A Đường Tân Lập 1, Phường Tăng Nhơn Phú, TP Hồ Chí Minh</span>
            </li>
            <li className="flex items-start gap-3 hover:text-primary-fixed transition-colors">
              <span className="material-symbols-outlined text-vibrant-orange">call</span>
              <span>0943 126 406</span>
            </li>
            <li className="flex items-start gap-3 hover:text-primary-fixed transition-colors">
              <span className="material-symbols-outlined text-vibrant-orange">mail</span>
              <span>inanxuannhi@gmail.com</span>
            </li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-6 text-sm">
          <h4 className="font-bold text-lg text-white">Chính sách</h4>
          <ul className="space-y-4 text-surface-variant">
            <li><a className="hover:text-vibrant-orange transition-colors" href="#privacy">Chính sách bảo mật</a></li>
            <li><a className="hover:text-vibrant-orange transition-colors" href="#return">Chính sách đổi trả</a></li>
            <li><a className="hover:text-vibrant-orange transition-colors" href="#payment">Hướng dẫn thanh toán</a></li>
            <li><a className="hover:text-vibrant-orange transition-colors" href="#shipping">Vận chuyển &amp; Giao hàng</a></li>
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="space-y-6">
          <h4 className="font-bold text-lg text-white">Bản đồ</h4>
          <div className="w-full aspect-video rounded-lg overflow-hidden bg-surface-variant">
            <div className="w-full h-full grayscale opacity-50 flex items-center justify-center bg-zinc-800">
              <span className="material-symbols-outlined text-4xl text-paper-white">map</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-surface-variant/20 px-margin-mobile md:px-margin-desktop py-8 max-w-[1200px] mx-auto text-center md:text-left text-xs">
        <p className="text-surface-variant opacity-60">© 2026 In Ấn Xuân Nhĩ. All rights reserved.</p>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col items-center gap-4 z-[100]">
        <a className="group relative flex items-center" href="https://zalo.me" target="_blank" rel="noopener noreferrer">
          <span className="absolute right-full mr-4 px-3 py-1 bg-deep-navy text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">Chat Zalo</span>
          <div className="bg-vibrant-orange text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform animate-bounce hover:animate-none">
            <span className="material-symbols-outlined text-2xl">chat</span>
          </div>
        </a>
        <a className="group relative flex items-center" href="tel:0943126406">
          <span className="absolute right-full mr-4 px-3 py-1 bg-deep-navy text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">Gọi Hotline</span>
          <div className="bg-deep-navy text-white rounded-full p-4 shadow-lg hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-2xl">call</span>
          </div>
        </a>
      </div>
    </footer>
  );
}
