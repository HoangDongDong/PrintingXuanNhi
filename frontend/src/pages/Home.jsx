import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('In Namecard');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setName('');
      setPhone('');
      setService('In Namecard');
      setMessage('');
      alert('Cảm ơn bạn đã gửi yêu cầu! Chúng tôi sẽ liên hệ lại sớm nhất.');
    }, 1000);
  };

  const featuredServices = [
    {
      title: 'In Namecard',
      desc: 'Ấn tượng đầu tiên chuyên nghiệp với chất liệu giấy cao cấp.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGa0WMAZLWfMgfca4TnGg6xUTTkb0GH1q7bDa6Qa16KdSMjMqA9GrXmDLcW9-ED9G7g1Xbxp67pycG8Zifl7AyCpJe8vIesED9ta5EnBfxI0wVdanNnngxzGMPLCkgLLhWTKJx7V8TWL66o4K6B0BjHf56oo2mj9lqjcQhwpmOpSnvyOc18-DDayF2MUh5Ozkxl6fQZE_3yLWj342pMAFkjiH3jTS4gKEdjQ3DHjYlD7-2rG1V0K6WeA',
      link: '/san-pham/namecard-my-thuat'
    },
    {
      title: 'In Tờ rơi',
      desc: 'Giải pháp quảng bá nhanh chóng, hiệu quả với chi phí tối ưu.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZdEahQ0-23k4f-4o0reYzuJtIj7rW95QhJKxlOUAkVEjMYeK-CSsvuZZRpAt4-JzYihq7WgR6lHcon2UPyxgS7nUvlvntTJbn0gMDidQJBIIRTFsDRNJXbT_QXkbgcbImxeayfCDyn_zc2di5NnvQJVYMTmt97qiJOW9ERBXog4JCnCXjtTMraLDXEmGAC8z9DZ-0fMBmlcNl3gDQC1uFEVSJKr9lp9wFmFxXFxEaZ1Hmc4bfNkDjeA',
      link: '/san-pham'
    },
    {
      title: 'In Tem nhãn',
      desc: 'Tem nhãn decal chống thấm, bám dính cực tốt trên mọi bề mặt.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4y7Zb6SopzcVHgr7ywTvxIIW62pfCnx-t2yiN8y49WAW00pwrWkpRMouSqBpgEoQLgWIQ_vrP5n-diPT1p9u3h9TM6Or-7yDM-tqSJo5U_XQ2sCGA8nLwebJCuFojbM0CZEFbJ6mbY7sCsaKNCGjcdKavNraAAYUgy-3oXZT1hBquvsbQ7Q0LN_7ocBiLWwWX9Yy4UUCC-iCCxkRv1DVyR_Yhwn8ARGehKw9hQL0nV5FwH9vSNwwvyw',
      link: '/san-pham'
    },
    {
      title: 'In Bao bì',
      desc: 'Nâng tầm giá trị sản phẩm với hộp giấy và túi giấy cao cấp.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxSOpm6BuOL-UR5yjE0iCiApVFZQIyQ8_U7VXIMD6fJTwLqpIfc5KzuZdKZrRks5V52D1mV6mYP0NUDF9gsIVr9KZUVhQoCjJSannQFSRv0fKiyKWghqk9oaIBS-9QKBTZZLeJCdp0zAsWtRB5xa70NYHVl8KnG7uOCrzRmkfjEt9Wanrfl1KP5ay3ijIhK3hS2myR3xC-mQtU02FCWJ_bbyMzGmCJJ1bRpblJhLMvR-haNdnhNfRuUA',
      link: '/san-pham'
    },
    {
      title: 'In Catalogue',
      desc: 'Trình bày sản phẩm chuyên nghiệp, đóng cuốn sang trọng.',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDrxc14am2Sukr4TipRlTLXmUDzuQ5AGGri5KXT_DLnFoVJnrlcRfiG6J3LpaSTjAvRSSCPI5s-clg9Xtgr_Uqf2YzU4qb50x4mrOKjAsK050KRDtU8V47RwBAWIY98UUd1WOZ30_jFg5zPnkzyAyyEUHDc_s0a6gF8J5NmRIJpneQromYi7Lr0a-EYkKdxH9tAnhDkA7jnaW2AMrLuTQK9yg0GOXXlrBxyf6CdLV0z-p834Jxhgo062g',
      link: '/san-pham'
    }
  ];

  return (
    <div className="bg-background text-on-surface font-body-md overflow-x-hidden min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[550px] md:h-[650px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center brightness-[0.6]" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0Y-MoJFJd_PW8t38ObfuhHZCGvwEhkI3TV-FNYyI8_W_MdsWGFMvjidPmLldC00FgFuTauzh95mcumnZt2jsxaYqyGZxlFio0XwOJ5GH0xl-z-oBQ6G4OJo42HOM7Lp2--GfOj32-7Guw3i6jx5sd3kXqhpeSuZVVArlJ_TThL9nDDDNiRJODYgF9JfyEyEkiOV577VznK4jHuNgq-olVLD7O4DU46IomwWVmJwwvTIQHEqKPVbX43A')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/80 to-transparent"></div>
        </div>
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop text-paper-white">
          <div className="max-w-2xl">
            <h1 className="font-display-lg text-4xl md:text-6xl mb-6 leading-tight font-bold text-white">
              Giải pháp in ấn <br/><span className="text-vibrant-orange">chất lượng cao</span>
            </h1>
            <p className="font-body-lg text-md md:text-lg mb-10 text-surface-variant leading-relaxed opacity-90">
              Từ thiết kế sáng tạo đến thành phẩm hoàn hảo. PrintPro đồng hành cùng thương hiệu của bạn qua từng chi tiết bản in với công nghệ hiện đại nhất.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/san-pham" className="bg-vibrant-orange text-white px-8 py-4 rounded-lg font-bold hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 shadow-lg text-sm">
                Khám phá dịch vụ
              </Link>
              <Link to="/tinh-gia" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-deep-navy transition-all duration-300 text-sm">
                Xem báo giá
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display-lg text-2xl md:text-3xl font-bold text-deep-navy mb-2">Dịch vụ nổi bật</h2>
              <div className="w-20 h-1 bg-vibrant-orange rounded-full"></div>
            </div>
            <Link to="/san-pham" className="text-deep-navy font-bold hover:text-vibrant-orange transition-colors flex items-center gap-2 text-sm">
              Tất cả dịch vụ <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-gutter">
            {featuredServices.map((service, idx) => (
              <div key={idx} className="product-card bg-paper-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group h-full border border-surface-container">
                <div className="aspect-square mb-6 overflow-hidden rounded-lg bg-slate-100">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={service.img} alt={service.title}/>
                </div>
                <h3 className="font-bold text-deep-navy mb-2 text-md leading-tight">{service.title}</h3>
                <p className="text-on-surface-variant font-body-md text-xs mb-6 flex-grow">{service.desc}</p>
                <Link to={service.link} className="w-full text-center border border-deep-navy text-deep-navy hover:bg-deep-navy hover:text-white py-2 rounded-lg font-semibold text-xs transition-all">
                  Xem chi tiết
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Working Process */}
      <section className="py-20 bg-surface-container">
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop text-center">
          <h2 className="font-display-lg text-2xl md:text-3xl font-bold text-deep-navy mb-16">Quy trình làm việc chuyên nghiệp</h2>
          <div className="relative flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4">
            {/* Progress Line */}
            <div className="hidden md:block absolute top-12 left-12 right-12 h-0.5 bg-outline-variant z-0"></div>
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center flex-1">
              <div className="w-24 h-24 bg-paper-white rounded-full flex items-center justify-center border-4 border-deep-navy mb-6 shadow-md transition-transform hover:scale-105">
                <span className="material-symbols-outlined text-deep-navy text-3xl">contact_support</span>
              </div>
              <h4 className="font-bold text-deep-navy mb-2 text-sm">1. Liên hệ</h4>
              <p className="text-on-surface-variant text-xs px-4">Gửi yêu cầu hoặc gọi hotline để được tư vấn dịch vụ.</p>
            </div>
            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center flex-1">
              <div className="w-24 h-24 bg-paper-white rounded-full flex items-center justify-center border-4 border-deep-navy mb-6 shadow-md transition-transform hover:scale-105">
                <span className="material-symbols-outlined text-deep-navy text-3xl">request_quote</span>
              </div>
              <h4 className="font-bold text-deep-navy mb-2 text-sm">2. Báo giá</h4>
              <p className="text-on-surface-variant text-xs px-4">Nhận báo giá chi tiết và tối ưu nhất cho ngân sách của bạn.</p>
            </div>
            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center flex-1">
              <div className="w-24 h-24 bg-paper-white rounded-full flex items-center justify-center border-4 border-deep-navy mb-6 shadow-md transition-transform hover:scale-105">
                <span className="material-symbols-outlined text-deep-navy text-3xl">print</span>
              </div>
              <h4 className="font-bold text-deep-navy mb-2 text-sm">3. Thiết kế &amp; In ấn</h4>
              <p className="text-on-surface-variant text-xs px-4">Xác nhận mẫu thiết kế và tiến hành in ấn với công nghệ hiện đại.</p>
            </div>
            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center flex-1">
              <div className="w-24 h-24 bg-paper-white rounded-full flex items-center justify-center border-4 border-deep-navy mb-6 shadow-md transition-transform hover:scale-105">
                <span className="material-symbols-outlined text-deep-navy text-3xl">local_shipping</span>
              </div>
              <h4 className="font-bold text-deep-navy mb-2 text-sm">4. Giao hàng</h4>
              <p className="text-on-surface-variant text-xs px-4">Kiểm tra chất lượng và giao hàng tận nơi nhanh chóng.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Form */}
      <section className="py-20 bg-paper-white">
        <div className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="font-display-lg text-3xl md:text-4xl font-bold text-deep-navy mb-6">Liên hệ nhanh để nhận ưu đãi</h2>
              <p className="text-on-surface-variant mb-8 leading-relaxed text-sm">
                Đội ngũ chuyên viên của PrintPro luôn sẵn sàng lắng nghe và tư vấn giải pháp in ấn phù hợp nhất cho doanh nghiệp của bạn. Hãy để lại thông tin, chúng tôi sẽ liên hệ lại trong vòng 15 phút.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-deep-navy">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-semibold">Hotline 24/7</p>
                    <p className="font-bold text-deep-navy text-md">0943 126 406</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-deep-navy">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <p className="text-xs text-on-surface-variant font-semibold">Email hỗ trợ</p>
                    <p className="font-bold text-deep-navy text-md">inanxuannhi@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background p-8 md:p-12 rounded-2xl shadow-sm border border-outline-variant">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <label className="text-xs text-on-surface-variant font-semibold block">Họ và tên</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-paper-white border border-outline-variant focus:border-deep-navy focus:ring-1 focus:ring-deep-navy rounded-lg p-3 outline-none text-sm transition-all" 
                    placeholder="Nhập họ và tên của bạn" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-on-surface-variant font-semibold block">Số điện thoại</label>
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-paper-white border border-outline-variant focus:border-deep-navy focus:ring-1 focus:ring-deep-navy rounded-lg p-3 outline-none text-sm transition-all" 
                    placeholder="Nhập số điện thoại liên hệ" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-on-surface-variant font-semibold block">Dịch vụ cần in</label>
                  <select 
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-paper-white border border-outline-variant focus:border-deep-navy focus:ring-1 focus:ring-deep-navy rounded-lg p-3 outline-none text-sm transition-all"
                  >
                    <option>In Namecard</option>
                    <option>In Tờ rơi</option>
                    <option>In Tem nhãn</option>
                    <option>In Bao bì</option>
                    <option>In Catalogue</option>
                    <option>Dịch vụ khác</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-on-surface-variant font-semibold block">Ghi chú yêu cầu</label>
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-paper-white border border-outline-variant focus:border-deep-navy focus:ring-1 focus:ring-deep-navy rounded-lg p-3 outline-none text-sm transition-all" 
                    placeholder="Mô tả ngắn gọn yêu cầu của bạn..." 
                    rows="3"
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-vibrant-orange text-white py-4 rounded-lg font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg text-sm"
                >
                  Gửi yêu cầu ngay
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
