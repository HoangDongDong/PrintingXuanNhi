import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  User, Mail, Phone, Calendar, Shield, Activity, 
  ArrowRight, ArrowLeft, LogOut, Lock, Edit3 
} from 'lucide-react';

export default function Profile() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    if (!token || !userStr) {
      navigate('/login');
      return;
    }
    try {
      setCurrentUser(JSON.parse(userStr));
    } catch (e) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!currentUser) return null;

  const isAdmin = currentUser.role === 'admin';

  return (
    <div className="animate-fadeIn max-w-[1200px] mx-auto px-4 md:px-8 py-8 text-slate-800 dark:text-slate-200">
      {/* Page Header */}
      <header className="mb-10 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <Link to="/" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-vibrant-orange hover:underline mb-2">
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            Về trang chủ
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight text-deep-navy dark:text-slate-100">Hồ sơ người dùng</h1>
          <p className="text-sm text-slate-400 mt-1">Thông tin cá nhân và lịch sử hoạt động tại website Xuân Nhĩ</p>
        </div>
        {isAdmin && (
          <Link 
            to="/admin" 
            className="px-5 py-2.5 bg-deep-navy text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 self-start sm:self-center hover:bg-opacity-95"
          >
            Vào quản trị Admin
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </header>

      {/* Profile Bento Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Profile Card (Left Column) */}
        <div className="xl:col-span-1">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 flex flex-col items-center text-center shadow-sm">
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-100 dark:border-slate-800 flex items-center justify-center bg-slate-100 dark:bg-slate-950">
                <span className="material-symbols-outlined text-slate-400 text-6xl">account_circle</span>
              </div>
              <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white dark:border-slate-900 rounded-full" title="Đang hoạt động"></div>
            </div>
            <h2 className="text-xl font-bold text-deep-navy dark:text-slate-200 mb-1">{currentUser.username || 'Khách hàng'}</h2>
            <p className="text-xs text-on-surface-variant mb-4 uppercase tracking-wider font-semibold">
              {isAdmin ? 'Quản trị viên hệ thống' : 'Khách hàng liên hệ'}
            </p>
            
            <div className="flex items-center gap-1.5 text-green-600 dark:text-green-400 text-xs font-bold mb-8 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-green-600 dark:bg-green-400 animate-pulse"></span>
              Đang hoạt động
            </div>
            
            <div className="flex flex-col w-full gap-3">
              <button 
                onClick={handleLogout}
                className="w-full py-3 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-950/20 dark:text-red-400 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Đăng xuất tài khoản
              </button>
            </div>
          </div>
        </div>

        {/* Info and Activities (Right Column) */}
        <div className="xl:col-span-2 flex flex-col gap-8">
          
          {/* Contact Information Card */}
          <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-50 dark:border-slate-800/80">
              <Shield className="h-5 w-5 text-deep-navy dark:text-primary-400" />
              <h3 className="text-lg font-bold text-deep-navy dark:text-slate-200">Chi tiết tài khoản</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 text-sm">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tên hiển thị</p>
                <p className="font-bold text-deep-navy dark:text-slate-350">{currentUser.username}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Địa chỉ Email</p>
                <p className="font-bold text-deep-navy dark:text-slate-350">{currentUser.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Quyền hạn tài khoản</p>
                <p className="font-bold text-deep-navy dark:text-slate-350 capitalize">{currentUser.role === 'admin' ? 'Quản trị (Admin)' : 'Người dùng'}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Trạng thái xác thực</p>
                <p className="font-bold text-green-600 dark:text-green-400">Đã kích hoạt</p>
              </div>
            </div>
          </section>

          {/* Recent Activities Card */}
          <section className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-50 dark:border-slate-800/80">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-deep-navy dark:text-primary-400" />
                <h3 className="text-lg font-bold text-deep-navy dark:text-slate-200">Nhật ký hoạt động</h3>
              </div>
            </div>
            
            <div className="space-y-6 relative text-xs">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-800"></div>
              
              <div className="flex gap-4 relative">
                <div className="z-10 w-6 h-6 rounded-full bg-deep-navy flex items-center justify-center border-4 border-white dark:border-slate-900">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Đăng nhập vào hệ thống thành công</p>
                  <p className="text-xxs text-slate-400 mt-0.5">Vừa xong</p>
                </div>
              </div>

              {isAdmin ? (
                <>
                  <div className="flex gap-4 relative">
                    <div className="z-10 w-6 h-6 rounded-full bg-vibrant-orange flex items-center justify-center border-4 border-white dark:border-slate-900">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Kiểm tra thông tin danh sách sản phẩm và tin tuyển dụng</p>
                      <p className="text-xxs text-slate-400 mt-0.5">15 phút trước</p>
                    </div>
                  </div>
                  <div className="flex gap-4 relative">
                    <div className="z-10 w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center border-4 border-white dark:border-slate-900">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Hệ thống tự động nạp bảng giá từ ảnh Excel</p>
                      <p className="text-xxs text-slate-400 mt-0.5">2 giờ trước</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex gap-4 relative">
                  <div className="z-10 w-6 h-6 rounded-full bg-vibrant-orange flex items-center justify-center border-4 border-white dark:border-slate-900">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Tính giá in ấn tự động trên trang web</p>
                    <p className="text-xxs text-slate-400 mt-0.5">30 phút trước</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
