import React from 'react';
import { Phone, MapPin, Mail, Clock, ShieldCheck, HelpCircle, FileText } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-350 border-t border-slate-800">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Brand details */}
          <div className="space-y-4">
            <h3 className="text-white font-extrabold text-lg tracking-wider bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
              IN ẤN XUÂN NHI
            </h3>
            <p className="text-sm text-slate-405 leading-relaxed max-w-sm">
              Chuyên thiết kế và in ấn các ấn phẩm quảng cáo, bao bì giấy, túi giấy, hộp giấy, name card chuyên nghiệp chất lượng cao, giao hàng toàn quốc.
            </p>
            <div className="flex items-center space-x-3 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Uy tín</span>
              <span className="flex items-center gap-1"><HelpCircle className="h-4 w-4 text-blue-500" /> Hỗ trợ 24/7</span>
            </div>
          </div>

          {/* Column 2: Contact info */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Thông Tin Liên Hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                <span>58/7A Đường Tân Lập 1, Phường Tăng Nhơn Phú, TP Hồ Chí Minh</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Phone className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <span className="font-semibold text-white">Hotline: 0943 126 406</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Mail className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <span>Email: inanxuannhi@gmail.com</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Clock className="h-4.5 w-4.5 text-red-500 shrink-0 mt-0.5" />
                <span>Thứ 2 - Thứ 7: 8:00 - 20:30 (CN Nghỉ)</span>
              </li>
            </ul>
          </div>

          {/* Column 3: Policy links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-sm uppercase tracking-wider">Chính Sách & Hướng Dẫn</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#payment-policy" className="hover:text-red-500 transition-colors flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Chính sách thanh toán & giao hàng
                </a>
              </li>
              <li>
                <a href="#refund-policy" className="hover:text-red-500 transition-colors flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Hướng dẫn đặt in & đổi trả hàng
                </a>
              </li>
              <li>
                <a href="#privacy-policy" className="hover:text-red-500 transition-colors flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Chính sách bảo mật thông tin
                </a>
              </li>
              <li>
                <a href="#tos" className="hover:text-red-500 transition-colors flex items-center gap-1.5">
                  <FileText className="h-3.5 w-3.5" /> Điều khoản sử dụng dịch vụ
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-slate-800 py-6 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} In Ấn Xuân Nhi. Bản quyền thuộc về inanxuannhi.com.</p>
          <p className="mt-2 sm:mt-0">Thiết kế tinh tế & chuyên nghiệp</p>
        </div>
      </div>
    </footer>
  );
}
