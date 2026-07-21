import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const [searchTerm, setSearchTerm] = useState('');

  const pricingData = [
    { name: 'In Danh Thiếp (Offset)', spec: 'Giấy C300, Cán mờ 2 mặt, 9x5.4cm', qty: '5 Hộp', price: '25.000đ/hộp', total: '125.000đ' },
    { name: 'In Danh Thiếp (Offset)', spec: 'Giấy C300, Cán mờ 2 mặt, 9x5.4cm', qty: '10 Hộp', price: '18.000đ/hộp', total: '180.000đ' },
    { name: 'In Danh Thiếp (Nhanh)', spec: 'Giấy Mỹ thuật, 9x5.4cm', qty: '2 Hộp', price: '80.000đ/hộp', total: '160.000đ' },
    { name: 'Tờ rơi A5 (Offset)', spec: 'Giấy C150, In 2 mặt, 14.8x21cm', qty: '1.000 Tờ', price: '650đ/tờ', total: '650.000đ' },
    { name: 'Tờ rơi A4 (Offset)', spec: 'Giấy C150, In 2 mặt, 21x29.7cm', qty: '1.000 Tờ', price: '1.150đ/tờ', total: '1.150.000đ' }
  ];

  const filteredPricing = pricingData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.spec.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <main className="max-w-[1200px] mx-auto px-margin-desktop py-12">
        {/* Hero Title & Controls */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-display-lg text-3xl font-bold text-deep-navy mb-4">Bảng giá tham khảo</h1>
              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 bg-deep-navy text-white rounded-full text-sm font-semibold hover:bg-vibrant-orange transition-colors">Bảng giá Namecard</button>
                <button className="px-4 py-2 bg-surface-container text-deep-navy rounded-full text-sm font-semibold hover:bg-surface-container-high transition-colors">Bảng giá Tờ rơi</button>
                <button className="px-4 py-2 bg-surface-container text-deep-navy rounded-full text-sm font-semibold hover:bg-surface-container-high transition-colors">Bảng giá Bao bì</button>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative w-full sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">search</span>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-paper-white border border-outline-variant rounded-lg text-sm focus:border-deep-navy focus:ring-deep-navy outline-none transition-all" 
                  placeholder="Tìm dịch vụ..."
                />
              </div>
              <button className="flex items-center justify-center gap-2 bg-paper-white border border-deep-navy text-deep-navy px-6 py-2 rounded-lg font-semibold hover:bg-deep-navy hover:text-white transition-all w-full sm:w-auto text-sm">
                <span className="material-symbols-outlined text-sm">download</span>
                Tải xuống Bảng giá (PDF)
              </button>
            </div>
          </div>
        </section>

        {/* Table Container */}
        <section className="bg-paper-white rounded-xl overflow-hidden shadow-sm border border-surface-container">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-surface-container-low border-b border-outline-variant">
                  <th className="px-6 py-5 font-bold text-deep-navy">Tên dịch vụ</th>
                  <th className="px-6 py-5 font-bold text-deep-navy">Quy cách/Kích thước</th>
                  <th className="px-6 py-5 font-bold text-deep-navy">Số lượng</th>
                  <th className="px-6 py-5 font-bold text-deep-navy">Đơn giá</th>
                  <th className="px-6 py-5 font-bold text-deep-navy">Thành tiền</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container">
                {filteredPricing.map((item, idx) => (
                  <tr key={idx} className="hover:bg-surface-bright transition-colors">
                    <td className="px-6 py-5 font-semibold text-deep-navy">{item.name}</td>
                    <td className="px-6 py-5 text-on-surface-variant">{item.spec}</td>
                    <td className="px-6 py-5 text-on-surface-variant">{item.qty}</td>
                    <td className="px-6 py-5 text-on-surface-variant">{item.price}</td>
                    <td className="px-6 py-5 text-vibrant-orange font-bold">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Footer Notes & CTA */}
        <section className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-surface-container-low p-8 rounded-xl border border-surface-container">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-vibrant-orange mt-1">info</span>
            <div>
              <p className="font-semibold text-on-surface">Lưu ý quan trọng:</p>
              <ul className="list-disc list-inside text-on-surface-variant font-medium mt-1 space-y-1 text-sm">
                <li>Giá trên chưa bao gồm VAT và phí thiết kế.</li>
                <li>Bảng giá chỉ mang tính chất tham khảo cho các quy cách chuẩn.</li>
                <li>Thời gian hoàn thành từ 2-5 ngày làm việc tùy dịch vụ.</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-3">
            <p className="text-on-surface-variant text-center lg:text-right text-sm">Bạn cần in số lượng lớn hoặc quy cách đặc biệt?</p>
            <Link 
              to="/lien-he"
              className="bg-vibrant-orange text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              Liên hệ để có giá sỉ tốt nhất
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
