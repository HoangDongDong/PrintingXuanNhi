import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PlusCircle, FileText, DollarSign, Image, Sparkles, CheckCircle2, AlertCircle, Trash2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    isFeatured: false
  });
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      setStatusMsg({ type: 'error', text: 'Vui lòng điền tiêu đề sản phẩm.' });
      return;
    }

    try {
      setSubmitting(true);
      setStatusMsg({ type: '', text: '' });
      
      const payload = {
        ...formData,
        price: parseFloat(formData.price) || 0.00
      };

      const res = await axios.post('/api/products', payload);
      
      setStatusMsg({ 
        type: 'success', 
        text: `Đã thêm sản phẩm "${res.data.product.title}" thành công!` 
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        imageUrl: '',
        isFeatured: false
      });

      // Refresh list
      fetchProducts();
    } catch (err) {
      console.error('Error adding product:', err);
      setStatusMsg({ 
        type: 'error', 
        text: err.response?.data?.message || 'Có lỗi xảy ra khi thêm sản phẩm. Vui lòng kiểm tra kết nối API backend.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header and Back Link */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link to="/" className="inline-flex items-center text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline mb-2">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Quay lại trang chủ
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight">Khu Vực Quản Trị</h1>
          <p className="text-sm text-slate-400 mt-1">Cập nhật và thêm mới sản phẩm in ấn của Xuân Nhi</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Column */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-md h-fit">
          <h2 className="text-lg font-bold mb-5 flex items-center space-x-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <PlusCircle className="h-5 w-5 text-primary-500" />
            <span>Thêm Sản Phẩm Mới</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Tên sản phẩm *</label>
              <div className="relative">
                <FileText className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input 
                  type="text" 
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Ví dụ: In túi giấy đựng quà" 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Đơn giá (VND) *</label>
              <div className="relative">
                <DollarSign className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input 
                  type="number" 
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Ví dụ: 15000" 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Đường dẫn hình ảnh (URL)</label>
              <div className="relative">
                <Image className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input 
                  type="url" 
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/..." 
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Mô tả sản phẩm</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Nhập mô tả sản phẩm, chất liệu giấy, kích thước..." 
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all resize-none"
              />
            </div>

            {/* Checkbox Featured */}
            <div className="flex items-center space-x-2.5 py-1">
              <input 
                type="checkbox" 
                name="isFeatured"
                id="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                className="h-4.5 w-4.5 rounded border-slate-350 text-primary-600 focus:ring-primary-500 bg-transparent"
              />
              <label htmlFor="isFeatured" className="text-sm font-semibold select-none cursor-pointer flex items-center gap-1 text-slate-600 dark:text-slate-300">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Sản phẩm nổi bật (Featured)
              </label>
            </div>

            {/* Status Alert Messages */}
            {statusMsg.text && (
              <div className={`p-4 rounded-xl text-sm flex items-start space-x-2.5 ${
                statusMsg.type === 'success' 
                  ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900/40' 
                  : 'bg-red-50 dark:bg-red-950/20 text-red-850 dark:text-red-300 border border-red-100 dark:border-red-900/40'
              }`}>
                {statusMsg.type === 'success' ? <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" /> : <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />}
                <span>{statusMsg.text}</span>
              </div>
            )}

            <button 
              type="submit" 
              disabled={submitting}
              className="w-full py-3 rounded-xl text-sm font-bold bg-primary-600 hover:bg-primary-750 text-white disabled:opacity-50 transition-all shadow-lg shadow-primary-600/20"
            >
              {submitting ? 'Đang thêm...' : 'Thêm Sản Phẩm'}
            </button>
          </form>
        </div>

        {/* List Column */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 shadow-md overflow-hidden">
          <h2 className="text-lg font-bold mb-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <span>Danh Sách Sản Phẩm Đang Có ({products.length})</span>
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">Live</span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
                  <th className="py-3 px-4">Sản Phẩm</th>
                  <th className="py-3 px-4">Đơn Giá</th>
                  <th className="py-3 px-4">Loại</th>
                  <th className="py-3 px-4">Hình Ảnh</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-8 text-center text-slate-400 dark:text-slate-500">
                      Chưa có sản phẩm nào trong hệ thống.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/40 dark:hover:bg-slate-800/20 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-slate-800 dark:text-slate-200">
                        {p.title}
                        <p className="font-normal text-xs text-slate-400 line-clamp-1 max-w-sm mt-0.5">{p.description}</p>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-primary-600 dark:text-primary-400">
                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price)}
                      </td>
                      <td className="py-3.5 px-4">
                        {p.isFeatured ? (
                          <span className="px-2 py-1 rounded-md text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-200/50">
                            Nổi bật
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded-md text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500">
                            Thường
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4">
                        {p.imageUrl ? (
                          <img 
                            src={p.imageUrl} 
                            alt={p.title} 
                            className="h-9 w-12 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700" 
                          />
                        ) : (
                          <span className="text-xs text-slate-400">Không có</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
