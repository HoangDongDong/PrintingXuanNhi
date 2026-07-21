import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeTab, setActiveTab] = useState('desc');
  const [quantity, setQuantity] = useState('5 Hộp (500 chiếc)');
  const [paperType, setPaperType] = useState('Conqueror Laid 220gsm');
  const [size, setSize] = useState('Chuẩn (90 x 54 mm)');
  const [finishing, setFinishing] = useState('Cắt xén thẳng (Mặc định)');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/products/${id}`);
        setProduct(res.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product detail:', err);
        setError('Không tìm thấy sản phẩm yêu cầu.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-vibrant-orange"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
        <h2 className="text-2xl font-bold text-deep-navy mb-4">{error || 'Không tìm thấy sản phẩm'}</h2>
        <Link to="/san-pham" className="text-vibrant-orange font-bold hover:underline">Quay lại danh sách sản phẩm</Link>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-background font-body-md overflow-x-hidden min-h-screen">
      <main className="max-w-[1200px] mx-auto px-margin-desktop py-12 space-y-24">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center gap-2 font-label-lg text-label-lg text-outline text-xs tracking-wider">
            <li className="hover:text-deep-navy transition-colors"><Link to="/">TRANG CHỦ</Link></li>
            <li>/</li>
            <li className="hover:text-deep-navy transition-colors"><Link to="/san-pham">SẢN PHẨM</Link></li>
            <li>/</li>
            <li className="text-deep-navy font-bold">CHI TIẾT SẢN PHẨM</li>
          </ol>
        </nav>

        {/* Product Section Upper */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Imagery */}
          <div className="space-y-6">
            <div className="product-card-shadow rounded-xl overflow-hidden bg-white aspect-[4/3] group cursor-zoom-in border border-surface-container">
              <img 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                src={product.imageUrl} 
                alt={product.title}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <button className="border-2 border-vibrant-orange rounded-lg overflow-hidden bg-white aspect-square">
                <img className="w-full h-full object-cover" src={product.imageUrl} alt="Thumbnail 1" />
              </button>
              <button className="border border-outline-variant rounded-lg overflow-hidden bg-white aspect-square hover:border-deep-navy transition-colors">
                <img className="w-full h-full object-cover" src={product.imageUrl} alt="Thumbnail 2" />
              </button>
              <button className="border border-outline-variant rounded-lg overflow-hidden bg-white aspect-square hover:border-deep-navy transition-colors">
                <img className="w-full h-full object-cover" src={product.imageUrl} alt="Thumbnail 3" />
              </button>
              <button className="border border-outline-variant rounded-lg overflow-hidden bg-white aspect-square hover:border-deep-navy transition-colors">
                <img className="w-full h-full object-cover" src={product.imageUrl} alt="Thumbnail 4" />
              </button>
            </div>
          </div>
          {/* Right Column: Details & Configuration */}
          <div className="space-y-8">
            <div className="space-y-4 border-b border-surface-variant pb-8">
              <div className="flex items-center gap-2">
                <span className="bg-primary-fixed text-primary px-3 py-1 rounded-full text-xs font-semibold">Sản phẩm Cao cấp</span>
                <div className="flex text-vibrant-orange">
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="material-symbols-outlined text-sm">star</span>
                </div>
              </div>
              <h1 className="font-display-lg text-3xl font-bold text-deep-navy leading-tight">{product.title}</h1>
              <p className="text-body-lg text-on-surface-variant max-w-lg">{product.description || 'Chất lượng in sắc nét, thiết kế chuyên nghiệp và tinh tế theo yêu cầu.'}</p>
            </div>
            {/* Dropdowns Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-label-sm text-xs text-outline uppercase tracking-wider">Số lượng (Hộp)</label>
                <select 
                  value={quantity} 
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full border-outline-variant rounded-lg py-3 px-4 bg-white focus:border-deep-navy focus:ring-deep-navy transition-colors text-sm"
                >
                  <option>2 Hộp (200 chiếc)</option>
                  <option>5 Hộp (500 chiếc)</option>
                  <option>10 Hộp (1000 chiếc)</option>
                  <option>Số lượng khác (Báo giá riêng)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label-sm text-xs text-outline uppercase tracking-wider">Chất liệu giấy</label>
                <select 
                  value={paperType} 
                  onChange={(e) => setPaperType(e.target.value)}
                  className="w-full border-outline-variant rounded-lg py-3 px-4 bg-white focus:border-deep-navy focus:ring-deep-navy transition-colors text-sm"
                >
                  <option>Conqueror Laid 220gsm</option>
                  <option>Koehler Canvas 250gsm</option>
                  <option>Monnalisa Smooth 300gsm</option>
                  <option>Giấy ánh kim Stardream</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label-sm text-xs text-outline uppercase tracking-wider">Kích thước</label>
                <select 
                  value={size} 
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full border-outline-variant rounded-lg py-3 px-4 bg-white focus:border-deep-navy focus:ring-deep-navy transition-colors text-sm"
                >
                  <option>Chuẩn (90 x 54 mm)</option>
                  <option>Châu Âu (85 x 55 mm)</option>
                  <option>Vuông (50 x 50 mm)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="font-label-sm text-xs text-outline uppercase tracking-wider">Gia công sau in</label>
                <select 
                  value={finishing} 
                  onChange={(e) => setFinishing(e.target.value)}
                  className="w-full border-outline-variant rounded-lg py-3 px-4 bg-white focus:border-deep-navy focus:ring-deep-navy transition-colors text-sm"
                >
                  <option>Cắt xén thẳng (Mặc định)</option>
                  <option>Ép kim (Vàng/Bạc)</option>
                  <option>Bo tròn 4 góc</option>
                  <option>Dập chìm/Dập nổi logo</option>
                </select>
              </div>
            </div>
            <div className="pt-8 space-y-4">
              <Link 
                to="/tinh-gia"
                className="w-full block text-center bg-vibrant-orange text-white py-4 px-8 rounded-xl font-bold hover:translate-y-[-4px] active:scale-95 transition-all duration-200 shadow-lg text-lg"
              >
                Nhận báo giá chính xác
              </Link>
              <p className="text-center text-xs text-on-surface-variant flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">schedule</span>
                Thời gian hoàn thành dự kiến: 2-3 ngày làm việc
              </p>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="space-y-12">
          <div className="border-b border-surface-variant">
            <div className="flex gap-12 overflow-x-auto scrollbar-hide">
              <button 
                className={`pb-4 font-semibold text-md whitespace-nowrap transition-all duration-200 ${activeTab === 'desc' ? 'text-vibrant-orange border-b-2 border-vibrant-orange' : 'text-on-surface-variant'}`}
                onClick={() => setActiveTab('desc')}
              >
                Mô tả chi tiết
              </button>
              <button 
                className={`pb-4 font-semibold text-md whitespace-nowrap transition-all duration-200 ${activeTab === 'spec' ? 'text-vibrant-orange border-b-2 border-vibrant-orange' : 'text-on-surface-variant'}`}
                onClick={() => setActiveTab('spec')}
              >
                Quy cách kỹ thuật
              </button>
              <button 
                className={`pb-4 font-semibold text-md whitespace-nowrap transition-all duration-200 ${activeTab === 'review' ? 'text-vibrant-orange border-b-2 border-vibrant-orange' : 'text-on-surface-variant'}`}
                onClick={() => setActiveTab('review')}
              >
                Đánh giá của khách hàng
              </button>
            </div>
          </div>

          {activeTab === 'desc' && (
            <div className="tab-content grid grid-cols-1 md:grid-cols-3 gap-12 animate-fadeIn">
              <div className="md:col-span-2 space-y-6">
                <h3 className="font-headline-md text-deep-navy text-xl font-bold">Đẳng cấp trong từng chi tiết</h3>
                <p className="leading-relaxed text-on-surface-variant">In Namecard giấy mỹ thuật là lựa chọn hàng đầu cho những ai tìm kiếm sự khác biệt và đẳng cấp. Khác với các loại giấy thông thường được cán màng bóng hay mờ, giấy mỹ thuật giữ nguyên được vẻ đẹp tự nhiên của bề mặt giấy với các đường vân nổi, độ sần hoặc ánh kim tinh tế.</p>
                <p className="leading-relaxed text-on-surface-variant">Tại PrintPro, chúng tôi sử dụng công nghệ in kỹ thuật số HP Indigo hiện đại nhất, đảm bảo màu sắc sắc nét, độ phủ mực hoàn hảo ngay cả trên các bề mặt giấy có vân sâu. Sự kết hợp giữa chất liệu cao cấp và kỹ thuật in chuẩn xác tạo nên một chiếc danh thiếp không chỉ để trao đổi thông tin mà còn là một tác phẩm nghệ thuật nhỏ bé.</p>
                <ul className="space-y-3 pt-4">
                  <li className="flex items-start gap-3 text-sm">
                    <span className="material-symbols-outlined text-vibrant-orange">check_circle</span>
                    <span>Hơn 100 loại giấy mỹ thuật nhập khẩu có sẵn tại showroom.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <span className="material-symbols-outlined text-vibrant-orange">check_circle</span>
                    <span>Hỗ trợ thiết kế tối giản, tập trung vào chất liệu và typo.</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm">
                    <span className="material-symbols-outlined text-vibrant-orange">check_circle</span>
                    <span>Kỹ thuật gia công thủ công tỉ mỉ: ép kim, dập nổi, bồi dày.</span>
                  </li>
                </ul>
              </div>
              <div className="bg-surface-container p-8 rounded-xl space-y-6">
                <h4 className="font-semibold text-deep-navy uppercase text-sm tracking-wider">Ưu điểm nổi bật</h4>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-vibrant-orange shrink-0 shadow-sm">
                      <span className="material-symbols-outlined">touch_app</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Cảm giác xúc giác</p>
                      <p className="text-xs text-on-surface-variant">Bề mặt vân giấy tạo ấn tượng mạnh khi chạm vào.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-vibrant-orange shrink-0 shadow-sm">
                      <span className="material-symbols-outlined">palette</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Màu sắc trung thực</p>
                      <p className="text-xs text-on-surface-variant">Màu in thẩm thấu vào sợi giấy tạo vẻ đẹp tự nhiên.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-vibrant-orange shrink-0 shadow-sm">
                      <span className="material-symbols-outlined">verified</span>
                    </div>
                    <div>
                      <p className="font-bold text-sm">Độ bền cao</p>
                      <p className="text-xs text-on-surface-variant">Giấy mỹ thuật có độ dai và bền màu theo thời gian.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'spec' && (
            <div className="tab-content animate-fadeIn">
              <div className="overflow-hidden border border-outline-variant rounded-xl">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container">
                    <tr>
                      <th className="p-6 font-semibold text-deep-navy border-b border-outline-variant">Đặc tính</th>
                      <th className="p-6 font-semibold text-deep-navy border-b border-outline-variant">Thông số kỹ thuật</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant text-sm">
                    <tr>
                      <td className="p-6 font-bold w-1/3">Công nghệ in</td>
                      <td className="p-6">In kỹ thuật số Laser / Offset / Letterpress tùy số lượng</td>
                    </tr>
                    <tr>
                      <td className="p-6 font-bold">Định lượng giấy</td>
                      <td className="p-6">200gsm - 400gsm (Có thể bồi nhiều lớp lên đến 700gsm)</td>
                    </tr>
                    <tr>
                      <td className="p-6 font-bold">Màu sắc</td>
                      <td className="p-6">Hệ màu CMYK chuẩn / Màu pha Pantone theo yêu cầu</td>
                    </tr>
                    <tr>
                      <td className="p-6 font-bold">Kỹ thuật gia công</td>
                      <td className="p-6">Ép kim nhiệt, Phủ UV định hình, Dập chìm chìm (Deboss), Bồi form</td>
                    </tr>
                    <tr>
                      <td className="p-6 font-bold">Quy cách đóng gói</td>
                      <td className="p-6">Hộp nhựa mica cao cấp (100 chiếc/hộp)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'review' && (
            <div className="tab-content grid grid-cols-1 md:grid-cols-2 gap-8 animate-fadeIn">
              <div className="product-card-shadow p-8 rounded-xl bg-white space-y-4 border border-surface-container">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuADsIGqUFdsUCShqSHSJLj7LOzehiG5KVPq7ct10_36U0tx3VR__hhY95EuEscHkouobzeqJHAZGUBnooI2XkbdvKDPA_rsAAxQSzWz7HHNpDQK4o2Z-ouTY8YCGAy0RQevEDpTYRPuHfZioihb9u7ndKPvAwXF175Po0m4k7_ftuQbAvzb0QI-HDNCCvMrey4PyNpYNndXH7LtUS0eQjeuaqdTfmGcP_OY2y5gux0BI-TJTB6fl14QPw" alt="Architect Headshot" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">KTS. Minh Hoàng</p>
                      <p className="text-xs text-outline font-medium">GĐ Sáng tạo - MH Studio</p>
                    </div>
                  </div>
                  <div className="flex text-vibrant-orange">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant italic leading-relaxed">"Chất lượng in tuyệt vời, vân giấy Conqueror hiện lên rất rõ nét. Tôi rất hài lòng với kỹ thuật ép kim mờ mà các bạn tư vấn. Chắc chắn sẽ quay lại."</p>
              </div>

              <div className="product-card-shadow p-8 rounded-xl bg-white space-y-4 border border-surface-container">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-surface-container overflow-hidden">
                      <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTIk-xj5ddow67A_9scP3sJmwpp-Amn5_q4TbSSAefV3Nn7XlGCZMmtcKKVmw6DhvFHlve6VWQOt0rs733lm147_3IEcM2YF3kxsGp810aFIyQiNVjykTTaVMxZxEvE0heuenYRlSFg-lhcpo5a-GaiyNSJ7mUsRFsztZMQCCUGDI14AI2AXNb-It6Hjc_mXGAPV1Qm5IwbVqT9rMjRWTcAIZLmNXyCT6nqBjFBV7CuyLm1YAIITHRRw" alt="Freelancer Headshot" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Thanh Hằng</p>
                      <p className="text-xs text-outline font-medium">Freelancer Marketing</p>
                    </div>
                  </div>
                  <div className="flex text-vibrant-orange">
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                    <span className="material-symbols-outlined text-sm">star</span>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant italic leading-relaxed">"Dịch vụ khách hàng rất tận tâm. Các bạn đã gửi mẫu giấy cho mình chọn trước khi in. Namecard in xong nhận được rất nhiều lời khen từ đối tác."</p>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
