import React from 'react';

export default function About() {
  return (
    <div className="bg-background text-on-background selection:bg-vibrant-orange selection:text-white min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center brightness-[0.6]" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCRIAzqf4yEhlwIqo13R06azRCycCREMcDV0IjRwqeuuXqhKmSD99_XjTE2-je8iZ9TKpRV82RHaAOZU4Afh4K4kPjaBL8oNt8m11bcRFFcrLs0AYN1_hdef-nyuhE0jF-V9DkfR1ezGRZuz1GSNMu9AXhhJaR5GHbjPV42GF5b8aAZ-v_9qTHafmqZx9q1B6C8rqjgTIcbQEBquYz4PeOGM1cxwSrFUArQi6MiRwerjTNohZcbhKHdNQ')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-deep-navy/80 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-in-up">
          <span className="inline-block px-4 py-1 mb-6 rounded-full bg-vibrant-orange text-white font-label-lg uppercase tracking-wider text-sm">Tinh hoa in ấn</span>
          <h1 className="font-display-lg text-white text-[38px] md:text-[54px] mb-6 leading-tight drop-shadow-lg font-bold">
            Về Chúng Tôi <br/> <span className="text-vibrant-orange font-light italic text-[28px] md:text-[42px]">Tận tâm trong từng bản in</span>
          </h1>
          <p className="font-body-lg text-white/90 text-md md:text-lg max-w-2xl mx-auto leading-relaxed">
            Sứ mệnh của chúng tôi là biến ý tưởng của bạn thành hiện thực sắc nét nhất thông qua công nghệ in ấn tiên tiến hàng đầu thế giới.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-vibrant-orange/10 -z-10 rounded-xl"></div>
            <div className="overflow-hidden rounded-xl shadow-xl">
              <img 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDROIOhQYaZBnfVNWmgZpJ5Cjy8AmTfUutaSR5PumYmpip2X9QpAgDVOi94WN9GEoSXt8k-_yhVrkzKjUojzZQflHUJsSOifvJQBhUEDWJdLCm4PqeIqe7zJ3KJgEQSB60Tjl1ru_eu0gysZHEx9Od8kOKkgvKC3e-a3Rbb_NNhacCxUptew9wl5GvIiA1CJGEqJqcoIQupjZesZ3kDT7CxdUGJ8OAtSbVPwqT2hGhu-Y69H5gVXicd0w"
                alt="Robot in action"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 border-2 border-deep-navy/10 -z-10 rounded-xl"></div>
          </div>
          {/* Text Side */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="font-headline-lg text-headline-lg text-deep-navy text-3xl font-bold">Câu Chuyện Của Chúng Tôi</h2>
              <div className="h-1.5 w-20 bg-vibrant-orange rounded-full"></div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3 flex items-center gap-3 font-semibold text-lg">
                  <span className="material-symbols-outlined text-vibrant-orange">history</span> Lịch sử hình thành
                </h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Được thành lập từ năm 2014, PrintPro khởi đầu từ một xưởng in gia đình với niềm đam mê bất tận với màu sắc và chất liệu giấy. Sau một thập kỷ không ngừng đổi mới, chúng tôi đã vươn mình thành đơn vị dẫn đầu thị trường in ấn kỹ thuật số.
                </p>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3 flex items-center gap-3 font-semibold text-lg">
                  <span className="material-symbols-outlined text-vibrant-orange">visibility</span> Tầm nhìn
                </h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Trở thành đối tác in ấn chiến lược hàng đầu tại Đông Nam Á, nơi công nghệ hiện đại và sự sáng tạo nghệ thuật hòa quyện để tạo ra những sản phẩm vượt mong đợi.
                </p>
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-3 flex items-center gap-3 font-semibold text-lg">
                  <span className="material-symbols-outlined text-vibrant-orange">rocket_launch</span> Sứ mệnh
                </h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Cung cấp giải pháp in ấn toàn diện với chất lượng hoàn hảo, thời gian thần tốc và chi phí tối ưu, giúp khách hàng khẳng định vị thế thương hiệu trên thị trường.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-deep-navy py-16">
        <div className="px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <span className="material-symbols-outlined text-vibrant-orange text-5xl mb-4 inline-block group-hover:scale-110 transition-transform">award_star</span>
              <div className="font-display-lg text-3xl font-bold text-white mb-1">10+</div>
              <div className="font-label-lg text-surface-variant uppercase text-xs">Năm kinh nghiệm</div>
            </div>
            <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <span className="material-symbols-outlined text-vibrant-orange text-5xl mb-4 inline-block group-hover:scale-110 transition-transform">sentiment_satisfied</span>
              <div className="font-display-lg text-3xl font-bold text-white mb-1">5000+</div>
              <div className="font-label-lg text-surface-variant uppercase text-xs">Khách hàng hài lòng</div>
            </div>
            <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <span className="material-symbols-outlined text-vibrant-orange text-5xl mb-4 inline-block group-hover:scale-110 transition-transform">groups</span>
              <div className="font-display-lg text-3xl font-bold text-white mb-1">50+</div>
              <div className="font-label-lg text-surface-variant uppercase text-xs">Nhân viên tận tâm</div>
            </div>
            <div className="p-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
              <span className="material-symbols-outlined text-vibrant-orange text-5xl mb-4 inline-block group-hover:scale-110 transition-transform">verified_user</span>
              <div className="font-display-lg text-3xl font-bold text-white mb-1">100%</div>
              <div className="font-label-lg text-surface-variant uppercase text-xs">Cam kết chất lượng</div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-surface-container-low overflow-hidden">
        <div className="px-margin-mobile md:px-margin-desktop max-w-[1200px] mx-auto mb-12">
          <div className="text-center">
            <h2 className="font-headline-lg text-deep-navy text-2xl font-bold mb-4">Đối tác Tin Cậy</h2>
            <p className="font-body-md text-on-surface-variant">Đồng hành cùng sự thành công của hơn 500+ doanh nghiệp trong và ngoài nước.</p>
          </div>
        </div>
        <div className="flex justify-center gap-12 flex-wrap max-w-5xl mx-auto px-6 grayscale opacity-60">
          <img className="h-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-dVXiZslIHAD_AKhmCuVSZqImljp2vdi9utdJk-ufw7J0AqOtT6qBrREUtxJvkdCHPH47t3rgxL8UKevOXBvaEhxg6a7rtuaTF8-wmtynGssKpyQMYezrqTsD6Nd3Q9ICetPVuzp6Ok6Bnjqjuk1oaBeDzLvkYROEZoee65no1cXzUp-mnxlcrCzaQ2mVWc-OMSCR46Zdv-Z9maTkkuBtrP6kMNMYs-5QP49U7Ul1jR061HBMs0j7sQ" alt="Partner 1" />
          <img className="h-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaqkeIcA50kQba7ol1pRFNYkGoB8gGsT5ib-Ne3TxRyOGhRRjFWwBkY55AnEwOJbV31MdW69wKe0gLlPmC2EZjpOwKkG25_795gw-ov59LicRS1l9PH1SfWVjNsyfp5W6g2apMaa34PpjdPdPoKO_Yz_UfFYDtaraduQLk9Bp1U6mSl-BS74o2Cdo4hdlZAC8eCSwOo7MF-yn3k2cJAW4wRrq8zEgn02lTdmpgTVL49sW3dXNnxZ4rfA" alt="Partner 2" />
          <img className="h-10 object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHdbJEFMwotoZ3-C0LSgG0CB-fGiE2G31kHZxmijbciPyQS7xjyKwX2FTg0sxWcHie8t10_-L9N-8GyJO3MzWG85OCou0MnT4HvURJTuiqWkixZPCEt3wk0kUHhmYELJKB2n7w3boHL71XQfGMwi96i1DVhYCsM10hT6LXdddfu2Hri1i8ywXZCPmtnFfAJe5HfI5pAGYm362LW5YZ-OrRhs1XA7jdX34ZGh4A9HdRk5QunBWBbzkMmA" alt="Partner 3" />
        </div>
      </section>
    </div>
  );
}
