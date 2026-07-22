import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Pricing() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [priceSheets, setPriceSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSheets = async () => {
      try {
        const res = await axios.get('/api/pricing-sheets');
        setPriceSheets(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching pricing sheets:', err);
        setError('Không thể tải danh sách bảng giá. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };
    fetchSheets();
  }, []);

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
      {loading ? (
        <div className="py-24 text-center">
          <div className="inline-block w-8 h-8 border-4 border-deep-navy border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-on-surface-variant">Đang tải danh sách bảng giá...</p>
        </div>
      ) : error ? (
        <div className="py-12 text-center text-red-500 font-medium">{error}</div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {priceSheets.map((sheet) => (
            <div 
              key={sheet.id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative group cursor-pointer overflow-hidden aspect-[4/3] bg-slate-100 flex items-center justify-center border-b border-slate-100 dark:border-slate-800" onClick={() => setSelectedImage(sheet)}>
                <img 
                  src={sheet.imageUrl} 
                  alt={sheet.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-deep-navy/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-4xl">zoom_in</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-deep-navy dark:text-slate-200 mb-2">{sheet.title}</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed mb-6">{sheet.description}</p>
                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedImage(sheet)}
                    className="flex-1 py-2.5 bg-deep-navy hover:bg-opacity-90 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">zoom_in</span>
                    Xem chi tiết
                  </button>
                  <a 
                    href={sheet.imageUrl} 
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
      )}

      {/* Lightbox / Zoom Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 animate-fadeIn">
          <div className="absolute top-4 right-4 flex gap-4">
            <a 
              href={selectedImage.imageUrl} 
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
              src={selectedImage.imageUrl} 
              alt={selectedImage.title} 
              className="max-w-[95vw] max-h-[85vh] object-contain rounded-lg shadow-2xl" 
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-white">
            <h4 className="text-lg font-bold">{selectedImage.title}</h4>
            <p className="text-xs opacity-75">{selectedImage.description}</p>
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
