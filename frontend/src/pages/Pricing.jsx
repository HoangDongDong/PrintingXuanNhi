import React, { useState } from 'react';

export default function Pricing() {
  const [selectedImage, setSelectedImage] = useState(null);

  const priceSheets = [
    {
      id: 1,
      title: 'Bảng Báo Giá 01',
      desc: 'Báo giá chi tiết các hạng mục in ấn & gia công phổ thông.',
      img: '/baogia/z7781495653654_42fda5e372f92182ee30494d86c9566a.jpg'
    },
    {
      id: 2,
      title: 'Bảng Báo Giá 02',
      desc: 'Báo giá chi tiết quy cách chất liệu và dịch vụ gia công thêm.',
      img: '/baogia/z7781495653870_7e4ff90e60a18cbfe83313a870f5f98a.jpg'
    },
    {
      id: 3,
      title: 'Bảng Báo Giá 03',
      desc: 'Bảng giá in Offset số lượng lớn các ấn phẩm văn phòng.',
      img: '/baogia/z7781495662873_72f22d3d440d5a3d6b4065594844bd3a.jpg'
    },
    {
      id: 4,
      title: 'Bảng Báo Giá 04',
      desc: 'Báo giá nhanh các loại danh thiếp, tờ rơi cơ bản.',
      img: '/baogia/z7781495670655_d2cda0cf6f3499fd4108cbe20c0cf08c.jpg'
    },
    {
      id: 5,
      title: 'Bảng Báo Giá 05',
      desc: 'Bảng giá quy chuẩn kích thước túi giấy và hộp giấy.',
      img: '/baogia/z7781495671536_72c07cf3de0f16a18c02d09f34a823d2.jpg'
    },
    {
      id: 6,
      title: 'Bảng Báo Giá 06',
      desc: 'Báo giá các loại nhãn decal, tem bảo hành, sticker.',
      img: '/baogia/z7781495672841_a15a24a933049314f2c940f02d52a755.jpg'
    },
    {
      id: 7,
      title: 'Bảng Báo Giá 07',
      desc: 'Báo giá in ấn bao thư, catalogue doanh nghiệp.',
      img: '/baogia/z7781495683380_e537bfaa6e3e2955cc954b7d81fe4e80.jpg'
    },
    {
      id: 8,
      title: 'Bảng Báo Giá 08',
      desc: 'Báo giá in bạt hiflex, pp, decal quảng cáo ngoài trời.',
      img: '/baogia/z7781495690105_da543b24a496a73656713a7163029406.jpg'
    },
    {
      id: 9,
      title: 'Bảng Báo Giá 09',
      desc: 'Báo giá thiệp mời, biểu mẫu kế toán, phiếu thu chi.',
      img: '/baogia/z7781495693291_d4ab81e23404654cb109200845f22290.jpg'
    }
  ];

  return (
    <div className="animate-fadeIn max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      {/* Header Section */}
      <section className="mb-12 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-deep-navy mb-4">
          Bảng báo giá dịch vụ in ấn
        </h1>
        <p className="text-on-surface-variant max-w-2xl leading-relaxed text-sm md:text-base">
          Dưới đây là các bảng báo giá chi tiết cho từng hạng mục dịch vụ thiết kế và in ấn tại Xuân Nhĩ. Bạn có thể nhấn vào từng bảng để phóng to, tải về hoặc liên hệ nhận báo giá riêng.
        </p>
        <div className="w-16 h-1 bg-vibrant-orange mt-6 rounded-full mx-auto md:mx-0"></div>
      </section>

      {/* Grid of Price Sheets */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {priceSheets.map((sheet) => (
          <div 
            key={sheet.id}
            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="relative group cursor-pointer overflow-hidden aspect-[4/3] bg-slate-100 flex items-center justify-center border-b border-slate-100 dark:border-slate-800" onClick={() => setSelectedImage(sheet)}>
              <img 
                src={sheet.img} 
                alt={sheet.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-deep-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-deep-navy dark:text-slate-200 mb-2">{sheet.title}</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-6">{sheet.desc}</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setSelectedImage(sheet)}
                  className="flex-1 py-2.5 bg-deep-navy hover:bg-opacity-90 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">zoom_in</span>
                  Xem chi tiết
                </button>
                <a 
                  href={sheet.img} 
                  download={sheet.title}
                  className="px-3 py-2.5 border border-slate-200 hover:border-deep-navy text-deep-navy dark:border-slate-800 dark:text-slate-300 dark:hover:border-primary-400 dark:hover:text-primary-400 rounded-xl transition-all flex items-center justify-center"
                  title="Tải ảnh báo giá"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Lightbox / Zoom Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 animate-fadeIn">
          <div className="absolute top-4 right-4 flex gap-4">
            <a 
              href={selectedImage.img} 
              download={selectedImage.title}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all flex items-center justify-center"
              title="Tải ảnh xuống"
            >
              <span className="material-symbols-outlined">download</span>
            </a>
            <button 
              onClick={() => setSelectedImage(null)}
              className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all flex items-center justify-center"
              title="Đóng"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="max-w-full max-h-full overflow-auto flex items-center justify-center p-8">
            <img 
              src={selectedImage.img} 
              alt={selectedImage.title} 
              className="max-w-[95vw] max-h-[85vh] object-contain rounded-lg shadow-2xl" 
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white">
            <h4 className="text-lg font-bold">{selectedImage.title}</h4>
            <p className="text-xs opacity-75">{selectedImage.desc}</p>
          </div>
        </div>
      )}

      {/* Bottom Contact & Quick Estimate Form */}
      <section className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-bold text-deep-navy dark:text-slate-100 mb-4">Bạn muốn nhận báo giá theo yêu cầu?</h2>
          <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
            Nếu quy cách in của bạn nằm ngoài các bảng giá trên (in kích thước riêng, chất liệu đặc biệt, số lượng cực lớn), hãy gửi thông tin cho chúng tôi. Đội ngũ tư vấn sẽ phản hồi lại bạn sau 15-30 phút làm việc.
          </p>
          <div className="space-y-3.5 text-sm text-on-surface-variant">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-vibrant-orange">call</span>
              <span>Hotline hỗ trợ: <strong>0943 126 406</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-vibrant-orange">mail</span>
              <span>Email: <strong>inanxuannhi@gmail.com</strong></span>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <h3 className="text-lg font-bold text-deep-navy dark:text-slate-200 mb-4">Yêu cầu báo giá nhanh</h3>
          <form className="space-y-4" onSubmit={(e) => {
            e.preventDefault();
            alert('Cảm ơn bạn đã gửi yêu cầu báo giá! Chúng tôi sẽ phản hồi lại sớm nhất.');
            e.target.reset();
          }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input 
                type="text" 
                required 
                placeholder="Họ tên của bạn" 
                className="w-full px-4 py-2.5 text-xs border border-slate-200 dark:border-slate-800 dark:bg-slate-900 rounded-xl outline-none focus:border-deep-navy transition-all"
              />
              <input 
                type="tel" 
                required 
                placeholder="Số điện thoại" 
                className="w-full px-4 py-2.5 text-xs border border-slate-200 dark:border-slate-800 dark:bg-slate-900 rounded-xl outline-none focus:border-deep-navy transition-all"
              />
            </div>
            <textarea 
              required
              rows="3" 
              placeholder="Mô tả quy cách in (Loại ấn phẩm, kích thước, số lượng...)" 
              className="w-full px-4 py-2.5 text-xs border border-slate-200 dark:border-slate-800 dark:bg-slate-900 rounded-xl outline-none focus:border-deep-navy transition-all resize-none"
            />
            <button 
              type="submit" 
              className="w-full py-3 bg-vibrant-orange hover:bg-orange-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-vibrant-orange/15"
            >
              Gửi thông tin yêu cầu
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
