import React, { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle'); // idle, sending, success

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setName('');
        setPhone('');
        setEmail('');
        setService('');
        setMessage('');
      }, 3000);
    }, 1500);
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen">
      <main className="max-w-[1200px] mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          
          {/* Left Column: Information & Map */}
          <div className="flex flex-col gap-10">
            <section>
              <h1 className="font-display-lg text-3xl md:text-4xl font-bold text-deep-navy mb-6">Hãy kết nối với chúng tôi</h1>
              <p className="text-on-surface-variant mb-10 max-w-lg">Đội ngũ chuyên gia của PrintPro luôn sẵn sàng hỗ trợ bạn biến những ý tưởng sáng tạo thành hiện thực với chất lượng in ấn đỉnh cao.</p>
              
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start gap-5">
                  <div className="bg-primary-container/10 p-3 rounded-xl text-deep-navy">
                    <span className="material-symbols-outlined">location_on</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-navy uppercase tracking-wider mb-1 text-xs">Địa chỉ</h3>
                    <p className="text-sm">58/7A Đường Tân Lập 1, Phường Tăng Nhơn Phú, TP Hồ Chí Minh</p>
                  </div>
                </div>

                {/* Hotline */}
                <div className="flex items-start gap-5">
                  <div className="bg-secondary-container/10 p-3 rounded-xl text-vibrant-orange">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-navy uppercase tracking-wider mb-1 text-xs">Hotline hỗ trợ 24/7</h3>
                    <p className="text-lg text-vibrant-orange font-bold">0943 126 406</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="bg-primary-container/10 p-3 rounded-xl text-deep-navy">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-navy uppercase tracking-wider mb-1 text-xs">Email</h3>
                    <p className="text-sm text-on-background">inanxuannhi@gmail.com</p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-5">
                  <div className="bg-primary-container/10 p-3 rounded-xl text-deep-navy">
                    <span className="material-symbols-outlined">schedule</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-deep-navy uppercase tracking-wider mb-1 text-xs">Giờ làm việc</h3>
                    <p className="text-sm text-on-background">Thứ 2 - Thứ 7: 08:00 - 20:30</p>
                  </div>
                </div>
              </div>
            </section>

             {/* Map */}
            <div className="relative w-full h-[300px] rounded-2xl overflow-hidden shadow-sm border border-surface-container">
              <iframe 
                src="https://maps.google.com/maps?q=58/7A%20Đường%20Tân%20Lập%201,%20Tăng%20Nhơn%20Phú,%20Quận%209,%20Hồ%20Chí%20Minh&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen="" 
                loading="lazy"
                title="Bản đồ chỉ đường In Ấn Xuân Nhĩ"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-paper-white p-8 md:p-12 rounded-2xl shadow-sm border border-surface-container-high h-fit">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-deep-navy mb-2">Gửi yêu cầu báo giá</h2>
              <p className="text-on-surface-variant text-sm">Chúng tôi sẽ phản hồi lại bạn trong vòng 30 phút làm việc.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="font-semibold text-xs text-on-surface-variant ml-1">Họ và tên</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-surface-variant rounded-lg text-sm outline-none focus:border-deep-navy focus:ring-1 focus:ring-deep-navy transition-all" 
                    placeholder="Nhập họ và tên"
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-semibold text-xs text-on-surface-variant ml-1">Số điện thoại</label>
                  <input 
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 border border-surface-variant rounded-lg text-sm outline-none focus:border-deep-navy focus:ring-1 focus:ring-deep-navy transition-all" 
                    placeholder="Nhập số điện thoại"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="font-semibold text-xs text-on-surface-variant ml-1">Email</label>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-surface-variant rounded-lg text-sm outline-none focus:border-deep-navy focus:ring-1 focus:ring-deep-navy transition-all" 
                  placeholder="Nhập địa chỉ email"
                />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-xs text-on-surface-variant ml-1">Chọn dịch vụ quan tâm</label>
                <select 
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full px-4 py-3 border border-surface-variant rounded-lg text-sm outline-none focus:border-deep-navy focus:ring-1 focus:ring-deep-navy transition-all bg-white"
                >
                  <option value="">Chọn loại dịch vụ</option>
                  <option value="business-cards">Danh thiếp &amp; Name Card</option>
                  <option value="marketing">Tờ rơi &amp; Catalog</option>
                  <option value="packaging">Bao bì &amp; Nhãn mác</option>
                  <option value="large-format">In khổ lớn &amp; Banner</option>
                  <option value="other">Dịch vụ khác</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-xs text-on-surface-variant ml-1">Nội dung yêu cầu</label>
                <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-surface-variant rounded-lg text-sm outline-none focus:border-deep-navy focus:ring-1 focus:ring-deep-navy transition-all resize-none" 
                  placeholder="Mô tả chi tiết yêu cầu của bạn..." 
                  rows="4"
                />
              </div>

              <button 
                type="submit"
                disabled={status === 'sending'}
                className={`w-full text-white font-bold py-4 rounded-xl hover:translate-y-[-2px] active:scale-95 transition-all duration-200 shadow-lg ${status === 'success' ? 'bg-green-600' : 'bg-vibrant-orange hover:bg-[#e05f00] shadow-vibrant-orange/20'}`}
              >
                {status === 'idle' && 'Gửi thông tin'}
                {status === 'sending' && 'Đang gửi...'}
                {status === 'success' && 'Gửi yêu cầu thành công!'}
              </button>
            </form>
          </div>

        </div>
      </main>
    </div>
  );
}
