import React from 'react';
import { Tag, Sparkles } from 'lucide-react';

export default function ProductList({ products }) {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-slate-950 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <p className="text-slate-400 dark:text-slate-500 text-lg">Chưa có sản phẩm nào được cập nhật.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <article 
          key={product.id} 
          className="group relative flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Badge for Featured Products */}
          {product.isFeatured && (
            <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-primary-600/90 text-white backdrop-blur-sm">
              <Sparkles className="h-3 w-3 fill-white" />
              Nổi bật
            </span>
          )}

          {/* Product Image */}
          <div className="relative aspect-video sm:aspect-square overflow-hidden bg-slate-100 dark:bg-slate-800">
            {product.imageUrl ? (
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400">
                <Tag className="h-10 w-10 stroke-[1.5]" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Product Details */}
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-base font-bold text-slate-850 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
              {product.title}
            </h3>
            
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed flex-grow">
              {product.description || 'Không có mô tả sản phẩm.'}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Đơn giá từ</p>
                <p className="text-lg font-extrabold text-primary-600 dark:text-primary-400">
                  {formatCurrency(product.price)}
                </p>
              </div>

              <button className="px-4 py-2 rounded-xl text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40 hover:bg-primary-100 dark:hover:bg-primary-950/80 transition-colors">
                Xem chi tiết
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
