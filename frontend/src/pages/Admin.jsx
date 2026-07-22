import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  PlusCircle, FileText, DollarSign, Image, Sparkles, CheckCircle2, 
  AlertCircle, Trash2, ArrowLeft, Edit3, Briefcase, MapPin, 
  ClipboardList, Settings, Eye 
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (!token || !userStr) {
      navigate('/login');
      return;
    }
    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'admin') {
        alert('Bạn không có quyền truy cập trang quản trị!');
        navigate('/');
      }
    } catch (e) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const [activeTab, setActiveTab] = useState('products');
  
  // Products State
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({
    title: '', description: '', price: '', imageUrl: '', isFeatured: false
  });

  // Jobs State
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [jobForm, setJobForm] = useState({
    title: '', type: 'Full-time', category: 'design', location: '', salary: 'Thỏa thuận', 
    icon: 'palette', description: '', requirements: '', benefits: '', status: 'active'
  });

  // Pricing Sheets State
  const [sheets, setSheets] = useState([]);
  const [editingSheet, setEditingSheet] = useState(null);
  const [sheetForm, setSheetForm] = useState({
    title: '', description: '', imageUrl: '', category: 'general'
  });

  // Common UI State
  const [submitting, setSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchProducts();
    fetchJobs();
    fetchSheets();
  }, []);

  // API Fetches
  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  const fetchJobs = async () => {
    try {
      const res = await axios.get('/api/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  };

  const fetchSheets = async () => {
    try {
      const res = await axios.get('/api/pricing-sheets');
      setSheets(res.data);
    } catch (err) {
      console.error('Error fetching pricing sheets:', err);
    }
  };

  const showStatus = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000);
  };

  // PRODUCT CRUD
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.title) return;
    setSubmitting(true);
    try {
      const payload = {
        ...productForm,
        price: parseFloat(productForm.price) || 0.00
      };

      if (editingProduct) {
        await axios.put(`/api/products/${editingProduct.id}`, payload);
        showStatus('success', `Đã cập nhật sản phẩm "${productForm.title}" thành công!`);
        setEditingProduct(null);
      } else {
        await axios.post('/api/products', payload);
        showStatus('success', `Đã thêm sản phẩm mới "${productForm.title}" thành công!`);
      }

      setProductForm({ title: '', description: '', price: '', imageUrl: '', isFeatured: false });
      fetchProducts();
    } catch (err) {
      showStatus('error', err.response?.data?.message || 'Có lỗi xảy ra.');
    } finally {
      setSubmitting(false);
    }
  };

  const startEditProduct = (p) => {
    setEditingProduct(p);
    setProductForm({
      title: p.title,
      description: p.description || '',
      price: p.price,
      imageUrl: p.imageUrl || '',
      isFeatured: p.isFeatured || false
    });
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      showStatus('success', 'Đã xóa sản phẩm thành công!');
      fetchProducts();
    } catch (err) {
      showStatus('error', 'Không thể xóa sản phẩm.');
    }
  };

  // JOB CRUD
  const handleJobSubmit = async (e) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.location) return;
    setSubmitting(true);
    try {
      if (editingJob) {
        await axios.put(`/api/jobs/${editingJob.id}`, jobForm);
        showStatus('success', `Đã cập nhật tin tuyển dụng "${jobForm.title}"!`);
        setEditingJob(null);
      } else {
        await axios.post('/api/jobs', jobForm);
        showStatus('success', `Đã đăng tin tuyển dụng "${jobForm.title}"!`);
      }

      setJobForm({
        title: '', type: 'Full-time', category: 'design', location: '', salary: 'Thỏa thuận', 
        icon: 'palette', description: '', requirements: '', benefits: '', status: 'active'
      });
      fetchJobs();
    } catch (err) {
      showStatus('error', 'Có lỗi xảy ra khi lưu tin tuyển dụng.');
    } finally {
      setSubmitting(false);
    }
  };

  const startEditJob = (j) => {
    setEditingJob(j);
    setJobForm({
      title: j.title,
      type: j.type,
      category: j.category,
      location: j.location,
      salary: j.salary,
      icon: j.icon || 'palette',
      description: j.description || '',
      requirements: j.requirements || '',
      benefits: j.benefits || '',
      status: j.status || 'active'
    });
  };

  const deleteJob = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa tin tuyển dụng này?')) return;
    try {
      await axios.delete(`/api/jobs/${id}`);
      showStatus('success', 'Đã xóa tin tuyển dụng thành công!');
      fetchJobs();
    } catch (err) {
      showStatus('error', 'Không thể xóa tin tuyển dụng.');
    }
  };

  // PRICING SHEET CRUD
  const handleSheetSubmit = async (e) => {
    e.preventDefault();
    if (!sheetForm.title || !sheetForm.imageUrl) return;
    setSubmitting(true);
    try {
      if (editingSheet) {
        await axios.put(`/api/pricing-sheets/${editingSheet.id}`, sheetForm);
        showStatus('success', `Đã cập nhật bảng giá "${sheetForm.title}"!`);
        setEditingSheet(null);
      } else {
        await axios.post('/api/pricing-sheets', sheetForm);
        showStatus('success', `Đã thêm bảng giá "${sheetForm.title}"!`);
      }

      setSheetForm({ title: '', description: '', imageUrl: '', category: 'general' });
      fetchSheets();
    } catch (err) {
      showStatus('error', 'Có lỗi xảy ra khi lưu bảng giá.');
    } finally {
      setSubmitting(false);
    }
  };

  const startEditSheet = (s) => {
    setEditingSheet(s);
    setSheetForm({
      title: s.title,
      description: s.description || '',
      imageUrl: s.imageUrl,
      category: s.category || 'general'
    });
  };

  const deleteSheet = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bảng giá này?')) return;
    try {
      await axios.delete(`/api/pricing-sheets/${id}`);
      showStatus('success', 'Đã xóa bảng giá thành công!');
      fetchSheets();
    } catch (err) {
      showStatus('error', 'Không thể xóa bảng giá.');
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 space-y-8 text-slate-800 dark:text-slate-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div>
          <Link to="/" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-vibrant-orange hover:underline mb-2">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Về trang chủ
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-deep-navy dark:text-slate-150">Hệ Thống Quản Trị</h1>
          <p className="text-sm text-slate-400 mt-1">Cập nhật sản phẩm, bảng giá và tuyển dụng cho website Xuân Nhĩ</p>
        </div>
        <button 
          onClick={handleLogout}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 self-start sm:self-center"
        >
          Đăng xuất
        </button>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2">
        <button 
          onClick={() => { setActiveTab('products'); setStatusMsg({ type: '', text: '' }); }}
          className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'products' ? 'border-vibrant-orange text-vibrant-orange' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Settings className="h-4 w-4" />
          Sản Phẩm
        </button>
        <button 
          onClick={() => { setActiveTab('pricing'); setStatusMsg({ type: '', text: '' }); }}
          className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'pricing' ? 'border-vibrant-orange text-vibrant-orange' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <DollarSign className="h-4 w-4" />
          Bảng Giá
        </button>
        <button 
          onClick={() => { setActiveTab('jobs'); setStatusMsg({ type: '', text: '' }); }}
          className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'jobs' ? 'border-vibrant-orange text-vibrant-orange' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Briefcase className="h-4 w-4" />
          Tuyển Dụng
        </button>
      </div>

      {/* Status Messages */}
      {statusMsg.text && (
        <div className={`p-4 rounded-xl text-sm flex items-start space-x-2.5 max-w-md ${
          statusMsg.type === 'success' 
            ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 border border-emerald-100' 
            : 'bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-300 border border-red-100'
        }`}>
          {statusMsg.type === 'success' ? <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" /> : <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* PRODUCTS TAB */}
      {activeTab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm h-fit">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-slate-50 dark:border-slate-800 pb-2">
              <PlusCircle className="h-5 w-5 text-vibrant-orange" />
              <span>{editingProduct ? 'Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</span>
            </h2>
            <form onSubmit={handleProductSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tên sản phẩm *</label>
                <input 
                  type="text" required
                  value={productForm.title}
                  onChange={(e) => setProductForm({...productForm, title: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-vibrant-orange bg-transparent"
                  placeholder="Ví dụ: Thiết kế túi giấy"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Đơn giá (VND) *</label>
                <input 
                  type="number" required
                  value={productForm.price}
                  onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-vibrant-orange bg-transparent"
                  placeholder="Ví dụ: 15000"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Đường dẫn ảnh (URL)</label>
                <input 
                  type="text"
                  value={productForm.imageUrl}
                  onChange={(e) => setProductForm({...productForm, imageUrl: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-vibrant-orange bg-transparent"
                  placeholder="Link ảnh sản phẩm..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mô tả ngắn</label>
                <textarea 
                  rows="3"
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-vibrant-orange bg-transparent resize-none"
                  placeholder="Chất liệu giấy, gia công thêm..."
                />
              </div>
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={productForm.isFeatured}
                  onChange={(e) => setProductForm({...productForm, isFeatured: e.target.checked})}
                  className="h-4.5 w-4.5 rounded border-slate-350 text-vibrant-orange focus:ring-vibrant-orange"
                />
                <span className="text-sm font-semibold flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-amber-500" /> Sản phẩm nổi bật
                </span>
              </label>
              <div className="flex gap-2 pt-2">
                {editingProduct && (
                  <button 
                    type="button"
                    onClick={() => { setEditingProduct(null); setProductForm({title:'',description:'',price:'',imageUrl:'',isFeatured:false}); }}
                    className="flex-1 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold"
                  >
                    Hủy sửa
                  </button>
                )}
                <button 
                  type="submit" disabled={submitting}
                  className="flex-1 py-3 bg-vibrant-orange hover:bg-orange-600 text-white font-bold rounded-xl text-xs"
                >
                  {submitting ? 'Đang lưu...' : editingProduct ? 'Cập nhật' : 'Thêm sản phẩm'}
                </button>
              </div>
            </form>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 border-b border-slate-50 dark:border-slate-800 pb-2">Danh Sách Sản Phẩm ({products.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase text-slate-400">
                    <th className="py-3 px-4">Sản Phẩm</th>
                    <th className="py-3 px-4">Đơn Giá</th>
                    <th className="py-3 px-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/20">
                      <td className="py-3.5 px-4 font-bold">
                        {p.title}
                        {p.isFeatured && <span className="ml-2 text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded font-bold">Nổi bật</span>}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-vibrant-orange">
                        {p.price?.toLocaleString('vi-VN')}đ
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button onClick={() => startEditProduct(p)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white" title="Sửa">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button onClick={() => deleteProduct(p.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg text-slate-400 hover:text-red-600" title="Xóa">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* PRICING TAB */}
      {activeTab === 'pricing' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sheet Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm h-fit">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-slate-50 dark:border-slate-800 pb-2">
              <PlusCircle className="h-5 w-5 text-vibrant-orange" />
              <span>{editingSheet ? 'Sửa Bảng Giá' : 'Thêm Bảng Giá Mới'}</span>
            </h2>
            <form onSubmit={handleSheetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tiêu đề bảng giá *</label>
                <input 
                  type="text" required
                  value={sheetForm.title}
                  onChange={(e) => setSheetForm({...sheetForm, title: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-vibrant-orange bg-transparent"
                  placeholder="Ví dụ: Bảng Báo Giá Namecard"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Đường dẫn ảnh bảng giá *</label>
                <input 
                  type="text" required
                  value={sheetForm.imageUrl}
                  onChange={(e) => setSheetForm({...sheetForm, imageUrl: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-vibrant-orange bg-transparent"
                  placeholder="Ví dụ: /baogia/namecard.jpg"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mô tả ngắn</label>
                <textarea 
                  rows="3"
                  value={sheetForm.description}
                  onChange={(e) => setSheetForm({...sheetForm, description: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-vibrant-orange bg-transparent resize-none"
                  placeholder="Thông tin quy chuẩn giấy..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Danh mục</label>
                <select
                  value={sheetForm.category}
                  onChange={(e) => setSheetForm({...sheetForm, category: e.target.value})}
                  className="w-full border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl p-2.5 text-sm focus:border-vibrant-orange outline-none bg-white font-medium dark:text-slate-800"
                >
                  <option value="general">Hạng mục chung</option>
                  <option value="namecard">Báo giá Namecard</option>
                  <option value="decal">Decal / Tem nhãn</option>
                  <option value="package">Bao bì / Hộp giấy</option>
                  <option value="office">Ấn phẩm văn phòng</option>
                  <option value="advertise">Quảng cáo</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                {editingSheet && (
                  <button 
                    type="button"
                    onClick={() => { setEditingSheet(null); setSheetForm({title:'',description:'',imageUrl:'',category:'general'}); }}
                    className="flex-1 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold"
                  >
                    Hủy sửa
                  </button>
                )}
                <button 
                  type="submit" disabled={submitting}
                  className="flex-1 py-3 bg-vibrant-orange hover:bg-orange-600 text-white font-bold rounded-xl text-xs"
                >
                  {submitting ? 'Đang lưu...' : editingSheet ? 'Cập nhật' : 'Thêm bảng giá'}
                </button>
              </div>
            </form>
          </div>

          {/* Sheet List */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 border-b border-slate-50 dark:border-slate-800 pb-2">Bảng Giá Đang Có ({sheets.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase text-slate-400">
                    <th className="py-3 px-4">Bảng Giá</th>
                    <th className="py-3 px-4">Tệp Ảnh</th>
                    <th className="py-3 px-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {sheets.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/20">
                      <td className="py-3.5 px-4 font-bold">
                        {s.title}
                        <p className="font-normal text-xs text-slate-400 line-clamp-1 mt-0.5">{s.description}</p>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-mono text-slate-400">
                        {s.imageUrl}
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button onClick={() => startEditSheet(s)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white" title="Sửa">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button onClick={() => deleteSheet(s.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg text-slate-400 hover:text-red-600" title="Xóa">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* JOBS TAB */}
      {activeTab === 'jobs' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm h-fit">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-slate-50 dark:border-slate-800 pb-2">
              <PlusCircle className="h-5 w-5 text-vibrant-orange" />
              <span>{editingJob ? 'Sửa Tin Tuyển Dụng' : 'Đăng Tuyển Dụng Mới'}</span>
            </h2>
            <form onSubmit={handleJobSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Vị trí tuyển dụng *</label>
                <input 
                  type="text" required
                  value={jobForm.title}
                  onChange={(e) => setJobForm({...jobForm, title: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-vibrant-orange bg-transparent"
                  placeholder="Ví dụ: Nhân viên thiết kế đồ họa"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Loại hình</label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({...jobForm, type: e.target.value})}
                    className="w-full border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl p-2 text-xs focus:border-vibrant-orange outline-none bg-white font-medium dark:text-slate-800"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mức lương</label>
                  <input 
                    type="text" required
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({...jobForm, salary: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl text-xs outline-none focus:border-vibrant-orange bg-transparent"
                    placeholder="Thỏa thuận..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Địa điểm làm việc *</label>
                <input 
                  type="text" required
                  value={jobForm.location}
                  onChange={(e) => setJobForm({...jobForm, location: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-vibrant-orange bg-transparent"
                  placeholder="Ví dụ: Quận 7, TP. HCM"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mô tả công việc</label>
                <textarea 
                  rows="3"
                  value={jobForm.description}
                  onChange={(e) => setJobForm({...jobForm, description: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-vibrant-orange bg-transparent resize-none"
                  placeholder="Mô tả công việc chính..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Yêu cầu ứng viên</label>
                <textarea 
                  rows="3"
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({...jobForm, requirements: e.target.value})}
                  className="w-full px-4 py-2.5 border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl text-sm outline-none focus:border-vibrant-orange bg-transparent resize-none"
                  placeholder="Kỹ năng, kinh nghiệm cần có..."
                />
              </div>
              <div className="flex gap-2 pt-2">
                {editingJob && (
                  <button 
                    type="button"
                    onClick={() => { setEditingJob(null); setJobForm({title: '', type: 'Full-time', category: 'design', location: '', salary: 'Thỏa thuận', icon: 'palette', description: '', requirements: '', benefits: '', status: 'active'}); }}
                    className="flex-1 py-3 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold"
                  >
                    Hủy sửa
                  </button>
                )}
                <button 
                  type="submit" disabled={submitting}
                  className="flex-1 py-3 bg-vibrant-orange hover:bg-orange-600 text-white font-bold rounded-xl text-xs"
                >
                  {submitting ? 'Đang lưu...' : editingJob ? 'Cập nhật' : 'Đăng tin'}
                </button>
              </div>
            </form>
          </div>

          {/* Job List */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold mb-4 border-b border-slate-50 dark:border-slate-800 pb-2">Vị Trí Tuyển Dụng Đang Đăng ({jobs.length})</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-xs font-bold uppercase text-slate-400">
                    <th className="py-3 px-4">Vị Trí</th>
                    <th className="py-3 px-4">Hình Thức / Địa Điểm</th>
                    <th className="py-3 px-4 text-right">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {jobs.map((j) => (
                    <tr key={j.id} className="hover:bg-slate-50/20">
                      <td className="py-3.5 px-4 font-bold">
                        {j.title}
                        <p className="font-normal text-xs text-slate-450 line-clamp-1 mt-0.5">{j.salary}</p>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-semibold mr-2">{j.type}</span>
                        <span className="text-xs text-slate-400">{j.location}</span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button onClick={() => startEditJob(j)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white" title="Sửa">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button onClick={() => deleteJob(j.id)} className="p-2 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg text-slate-400 hover:text-red-600" title="Xóa">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
