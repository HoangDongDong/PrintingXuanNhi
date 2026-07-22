import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Careers() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('/api/jobs');
        setJobs(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Không thể tải danh sách tuyển dụng. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const getCategoryStyle = (category) => {
    switch (category) {
      case 'design':
        return {
          bgColor: 'bg-primary-50 dark:bg-primary-950/20',
          textColor: 'text-primary-600 dark:text-primary-400'
        };
      case 'operation':
        return {
          bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
          textColor: 'text-indigo-600 dark:text-indigo-400'
        };
      case 'sales':
      default:
        return {
          bgColor: 'bg-vibrant-orange/10',
          textColor: 'text-vibrant-orange'
        };
    }
  };

  const filteredJobs = activeCategory === 'all'
    ? jobs
    : jobs.filter(job => job.category === activeCategory);

  if (loading) {
    return (
      <div className="animate-fadeIn max-w-[1200px] mx-auto px-4 md:px-8 py-24 text-center">
        <div className="inline-block w-8 h-8 border-4 border-deep-navy border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-on-surface-variant">Đang tải danh sách tuyển dụng...</p>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      {/* 2. Hero Section */}
      <section className="relative h-[450px] md:h-[500px] flex items-center overflow-hidden rounded-3xl mb-16 shadow-lg">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ 
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDHaUq1I25R92D0PILLmYr73MpZH0jwABodewZx4CwIbc0KswfGrlECsAx_J08p4EcpDs6zG2u379CignE0HqgtkF5RNaUq9GTjowDbQiZ3o7L3SeZ_Pz2U0G-5iQfuWRdHCKwo9mgYv8twHSZ04reIsEz_tUereK-yAm9tIhRLnRCo-6nemGvhVtZ4Qhm_oHIW3-JKUG4RP6m16KOEQJjDGcF0ATmbRhbP_iruaVF8WttwIjRvS5RpGQ')` 
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/95 via-deep-navy/80 to-transparent"></div>
        </div>
        <div className="relative z-10 px-8 md:px-16 max-w-2xl text-paper-white">
          <h1 className="text-4xl md:text-5xl font-bold font-display-lg mb-4 tracking-tight leading-tight">
            Gia nhập đội ngũ Xuân Nhĩ
          </h1>
          <p className="text-lg opacity-90 leading-relaxed mb-8 font-sans">
            Cùng chúng tôi tạo nên những bản in hoàn hảo và định hình tương lai của ngành in ấn chuyên nghiệp tại Việt Nam.
          </p>
          <a 
            href="#positions"
            className="inline-block bg-vibrant-orange hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-250 shadow-lg shadow-vibrant-orange/20 hover:shadow-vibrant-orange/35 hover:-translate-y-0.5"
          >
            Xem vị trí trống
          </a>
        </div>
      </section>

      {/* 3. Tại sao chọn Xuân Nhĩ? */}
      <section className="py-16 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/80 p-8 md:p-12 mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-deep-navy dark:text-slate-100 mb-4">
            Tại sao chọn Xuân Nhĩ?
          </h2>
          <div className="w-16 h-1 bg-vibrant-orange mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value 1 */}
          <div className="flex flex-col items-center text-center group p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all duration-300">
            <div className="w-16 h-16 flex items-center justify-center bg-primary-50 dark:bg-primary-950/30 text-deep-navy dark:text-primary-400 rounded-2xl mb-6 shadow-sm group-hover:bg-deep-navy group-hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined text-3xl">diversity_3</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-deep-navy dark:text-slate-200">Môi trường chuyên nghiệp</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Làm việc trong không gian hiện đại, năng động với đội ngũ chuyên gia giàu kinh nghiệm và đam mê.
            </p>
          </div>
          {/* Value 2 */}
          <div className="flex flex-col items-center text-center group p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all duration-300">
            <div className="w-16 h-16 flex items-center justify-center bg-primary-50 dark:bg-primary-950/30 text-deep-navy dark:text-primary-400 rounded-2xl mb-6 shadow-sm group-hover:bg-deep-navy group-hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined text-3xl">payments</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-deep-navy dark:text-slate-200">Đãi ngộ hấp dẫn</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Chế độ lương thưởng cạnh tranh, bảo hiểm đầy đủ và các chương trình chăm sóc sức khỏe toàn diện.
            </p>
          </div>
          {/* Value 3 */}
          <div className="flex flex-col items-center text-center group p-6 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all duration-300">
            <div className="w-16 h-16 flex items-center justify-center bg-primary-50 dark:bg-primary-950/30 text-deep-navy dark:text-primary-400 rounded-2xl mb-6 shadow-sm group-hover:bg-deep-navy group-hover:text-white transition-all duration-300">
              <span className="material-symbols-outlined text-3xl">trending_up</span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-deep-navy dark:text-slate-200">Cơ hội thăng tiến</h3>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Lộ trình nghề nghiệp rõ ràng, các khóa đào tạo chuyên sâu giúp bạn bứt phá giới hạn bản thân.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Danh sách Vị trí Tuyển dụng */}
      <section className="py-12 mb-16 scroll-mt-24" id="positions">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-deep-navy dark:text-slate-100 mb-2">Vị trí Tuyển dụng</h2>
            <p className="text-sm text-on-surface-variant">Tìm kiếm cơ hội nghề nghiệp phù hợp với đam mê của bạn.</p>
          </div>
          <div className="flex gap-2.5">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'bg-deep-navy text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveCategory('design')}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeCategory === 'design'
                  ? 'bg-deep-navy text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              Thiết kế
            </button>
            <button
              onClick={() => setActiveCategory('operation')}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeCategory === 'operation'
                  ? 'bg-deep-navy text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              Vận hành & Khác
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {error && (
            <div className="col-span-3 text-center py-6 text-red-500 font-medium">
              {error}
            </div>
          )}
          {!error && filteredJobs.map((job) => {
            const style = getCategoryStyle(job.category);
            return (
              <div 
                key={job.id} 
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-12 h-12 ${style.bgColor} ${style.textColor} flex items-center justify-center rounded-xl`}>
                      <span className="material-symbols-outlined text-2xl">{job.icon || 'work'}</span>
                    </div>
                    <span className="text-xs font-bold bg-vibrant-orange/10 text-vibrant-orange px-3 py-1 rounded-full">
                      {job.type}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-deep-navy dark:text-slate-200 mb-4">{job.title}</h4>
                  <div className="space-y-2.5 mb-6 text-sm text-on-surface-variant">
                    <div className="flex items-center">
                      <span className="material-symbols-outlined text-lg mr-2">location_on</span>
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="material-symbols-outlined text-lg mr-2">payments</span>
                      <span>{job.salary}</span>
                    </div>
                  </div>
                </div>
                <button className="w-full py-3 mt-4 border border-deep-navy text-deep-navy hover:bg-deep-navy hover:text-white dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-400 dark:hover:text-slate-950 rounded-xl font-bold text-sm transition-all duration-200">
                  Ứng tuyển ngay
                </button>
              </div>
            );
          })}
          {filteredJobs.length === 0 && (
            <div className="col-span-3 text-center py-12 text-on-surface-variant">
              Hiện tại chưa có vị trí tuyển dụng mới ở mục này.
            </div>
          )}
        </div>
      </section>

      {/* 5. Quy trình Tuyển dụng */}
      <section className="py-16 bg-slate-100/50 dark:bg-slate-900/60 rounded-3xl p-8 md:p-12 mb-16 border border-slate-100/80 dark:border-slate-800/40">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-deep-navy dark:text-slate-100 mb-3">Quy trình Tuyển dụng</h2>
          <p className="text-sm text-on-surface-variant">Các bước cơ bản để bạn trở thành thành viên của Xuân Nhĩ.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center text-center p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100/50 dark:border-slate-800/50">
            <div className="w-12 h-12 bg-deep-navy text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
              1
            </div>
            <h5 className="font-bold text-deep-navy dark:text-slate-200 mb-2 text-md">Nộp hồ sơ</h5>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Gửi CV và Portfolio ấn tượng của bạn cho chúng tôi.
            </p>
          </div>
          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center text-center p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100/50 dark:border-slate-800/50">
            <div className="w-12 h-12 bg-deep-navy text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
              2
            </div>
            <h5 className="font-bold text-deep-navy dark:text-slate-200 mb-2 text-md">Phỏng vấn</h5>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Trao đổi trực tiếp về kỹ năng và định hướng nghề nghiệp.
            </p>
          </div>
          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center text-center p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100/50 dark:border-slate-800/50">
            <div className="w-12 h-12 bg-deep-navy text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
              3
            </div>
            <h5 className="font-bold text-deep-navy dark:text-slate-200 mb-2 text-md">Thử việc</h5>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Thể hiện năng lực trong môi trường làm việc thực tế.
            </p>
          </div>
          {/* Step 4 */}
          <div className="relative z-10 flex flex-col items-center text-center p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100/50 dark:border-slate-800/50">
            <div className="w-12 h-12 bg-vibrant-orange text-white rounded-full flex items-center justify-center font-bold text-lg mb-4 shadow-sm">
              4
            </div>
            <h5 className="font-bold text-deep-navy dark:text-slate-200 mb-2 text-md">Gia nhập</h5>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Chào mừng bạn chính thức trở thành thành viên Xuân Nhĩ!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-8">
        <div className="bg-deep-navy rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl shadow-deep-navy/15">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-vibrant-orange rounded-full opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-48 h-48 bg-white rounded-full opacity-10 pointer-events-none"></div>
          <h2 className="text-3xl font-bold mb-4 relative z-10">Sẵn sàng để bắt đầu?</h2>
          <p className="text-sm opacity-80 mb-8 max-w-xl mx-auto relative z-10">
            Nếu bạn không thấy vị trí phù hợp, hãy cứ gửi hồ sơ cho chúng tôi. Chúng tôi luôn tìm kiếm tài năng.
          </p>
          <button className="bg-vibrant-orange hover:bg-orange-600 text-white px-8 py-3.5 rounded-xl font-bold text-sm relative z-10 transition-all duration-200 shadow-md">
            Gửi hồ sơ tổng quát
          </button>
        </div>
      </section>
    </div>
  );
}
