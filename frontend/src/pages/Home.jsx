import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, Printer, FileText, Phone, Send, Loader2, AlertCircle } from 'lucide-react';

const mockData = [
  {
    id: 101,
    title: 'In Túi Giấy Mỹ Phẩm',
    description: 'Túi giấy kraft/couche cao cấp, thiết kế trang nhã, quai xách chắc chắn.',
    price: 12000.00,
    imageUrl: ''
  },
  {
    id: 102,
    title: 'In Hộp Giấy Carton Lạnh',
    description: 'Hộp cứng cao cấp cho ngành quà tặng, mỹ phẩm, bồi giấy mỹ thuật sang trọng.',
    price: 35000.00,
    imageUrl: ''
  },
  {
    id: 103,
    title: 'In Name Card Ép Kim',
    description: 'Danh thiếp giấy mỹ thuật cao cấp, ép kim vàng/bạc logo tạo ấn tượng mạnh.',
    price: 150000.00,
    imageUrl: ''
  },
  {
    id: 104,
    title: 'In Thiệp Mời Sự Kiện',
    description: 'Thiệp cưới, thiệp sự kiện in sắc nét trên các dòng giấy mỹ thuật cao cấp.',
    price: 8000.00,
    imageUrl: ''
  }
];

const categories = [
  {
    id: 1,
    name: 'Túi giấy',
    desc: 'Túi quà tặng, túi shop thời trang',
    icon: '🛍️'
  },
  {
    id: 2,
    name: 'Hộp giấy',
    desc: 'Hộp mỹ phẩm, hộp carton, hộp cứng',
    icon: '📦'
  },
  {
    id: 3,
    name: 'Name card',
    desc: 'Danh thiếp lấy ngay, giấy mỹ thuật',
    icon: '📇'
  },
  {
    id: 4,
    name: 'Thiệp mời',
    desc: 'Thiệp cưới, thiệp mời sự kiện',
    icon: '✉️'
  }
];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error('API Error, falling back to mockData:', err);
        setError(true);
        setProducts(mockData);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="space-y-16">
      
      {/* 1. Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-red-950 text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative max-w-3xl space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-red-500/20 text-red-300 border border-red-500/30">
            <Sparkles className="h-3 w-3 fill-red-300" />
            GIẢI PHÁP IN ẤN CHUYÊN NGHIỆP
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight uppercase">
            In Ấn Xuân Nhi <br />
            <span className="bg-gradient-to-r from-red-500 to-amber-400 bg-clip-text text-transparent">
              Chất Lượng Đi Đầu
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-350 max-w-xl leading-relaxed">
            Chúng tôi cung cấp dịch vụ in ấn cao cấp, tối ưu hóa chi phí cho doanh nghiệp của bạn. Thiết kế tinh tế, sắc nét, gia công chuẩn quy trình.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <a 
              href="#quote-form" 
              className="px-6 py-3 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-700 text-white transition-all shadow-lg shadow-red-600/30 flex items-center space-x-2"
            >
              <Send className="h-4.5 w-4.5" />
              <span>Nhận Báo Giá Ngay</span>
            </a>
            <a 
              href="tel:0943126406" 
              className="px-6 py-3 rounded-xl text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/10 transition-all flex items-center space-x-2"
            >
              <Phone className="h-4.5 w-4.5" />
              <span>Hotline 0943 126 406</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Danh mục Sản phẩm (Grid layout) */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Dịch Vụ In Ấn Chính</h2>
          <p className="text-sm text-slate-400 dark:text-slate-450">Lựa chọn giải pháp in ấn phù hợp nhất với nhu cầu kinh doanh của bạn</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.id} 
              className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-sm hover:shadow-md hover:border-red-500/50 dark:hover:border-red-500/50 transition-all text-center group cursor-pointer"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{cat.icon}</div>
              <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-100">{cat.name}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Sản phẩm nổi bật */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Sản Phẩm Mới & Nổi Bật</h2>
            <p className="text-sm text-slate-400 mt-1">Các sản phẩm thiết kế và gia công đặc biệt</p>
          </div>
          {error && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200/40">
              <AlertCircle className="h-3.5 w-3.5" />
              Chế độ Offline (Sử dụng dữ liệu mẫu)
            </span>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="h-10 w-10 text-red-600 animate-spin" />
            <p className="text-sm text-slate-400 animate-pulse font-medium">Đang tải sản phẩm in ấn...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-sm hover:shadow-lg transition-all duration-350"
              >
                {/* Image Placeholder or URL */}
                <div className="relative aspect-square w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  {product.imageUrl ? (
                    <img 
                      src={product.imageUrl} 
                      alt={product.title} 
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-350 dark:text-slate-600">
                      <Printer className="h-12 w-12 stroke-[1.5]" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-100 group-hover:text-red-500 transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                      {product.description || 'Không có mô tả chi tiết.'}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                    <span className="text-sm font-bold text-red-500">
                      {formatCurrency(product.price)}
                    </span>
                    <button className="w-full py-2.5 rounded-lg text-xs font-bold text-slate-700 hover:text-white dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-slate-750 hover:bg-red-600 hover:border-transparent dark:hover:bg-red-600 transition-all">
                      Xem chi tiết
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
