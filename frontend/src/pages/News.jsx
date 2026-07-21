import React from 'react';

export default function News() {
  const posts = [
    {
      title: 'Ưu đãi 20% cho tất cả các gói in danh thiếp cao cấp trong tháng 6',
      cat: 'Khuyến mãi',
      date: '20 Tháng 5, 2024',
      desc: 'Nâng tầm vị thế cá nhân với dòng danh thiếp ép kim, dập nổi hoặc phủ UV định hình. Chương trình áp dụng cho đơn hàng từ 5 hộp...',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBus0ur1DXq7OlJiAlO-rj9cxRA1bed2fvvyo5gjQB50w7fcfE2EF0qnmR9BKQ7DF6F3-XxJvZm5Y-SilpSPYtOw4Pt7fzVrydl5aFMVjZzpoBqH1Zw4EL8LUG8Ngv6FUHH7jIc3cEoF70K-l2mF95ymvlAlmWawD0tJGMLV-ZCpm10voki3jYg8X-vUSgkHzlkbbeTCmIvvglGeRlkk6xtMXeAgFu6-fmZOBeobYhcR3ogVxewXCzn-A'
    },
    {
      title: 'Cách chuẩn bị file thiết kế in khổ lớn không bị vỡ hình',
      cat: 'Kỹ thuật',
      date: '18 Tháng 5, 2024',
      desc: 'Lỗi phổ biến nhất khi in poster hoặc standee là độ phân giải không đủ. Bài viết hướng dẫn cách setup thông số DPI chuẩn nhất cho từng kích thước...',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4CfjaT-yiB8WocHFHrXtDdkjsjAOgL6IySzm3WM6iSLovU1YaZPJN8OWcphs4kdNXa_jsR9IaZ7IXrL7Zh6w4zmGwBJFAyxQqDB2D1MCfrCVvktvGRTNw9b-Gx9naxVXA8OUBvOCbV-bvQ4TirrJfLn16O_MYpjrw8xap2DRGvp90wP_hCeB2BpLcxJWWaaorrrPnlfCAt56nBdg2pZ-lFfpvlId8tTO23F_Jjr1LHqnARBrN3Yaz-w'
    },
    {
      title: 'Top 10 mẫu Brochure ấn tượng dành cho ngành Bất động sản',
      cat: 'Cảm hứng',
      date: '15 Tháng 5, 2024',
      desc: 'Khám phá các bố cục Layout sang trọng, cách kết hợp màu sắc và chất liệu giấy giúp dự án của bạn thu hút nhà đầu tư ngay từ cái nhìn đầu tiên...',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa4Z8X4kz_uncu3XqWtwKQMcA8m5CS7Y3-rEpTHmEuqJwYhMDJQ9SkNysneG0M3Mkdg_oWLWxVNFuSX7CbekndQ8unGyhL1b1NfG-SzlTvhB2RNNKDyyWUI41bCS3LxwpGPqDMLAVRoBsgyeWRrQUsz4Xsl9XEcYBagvGRj0427KvPzFNOOfZfOMfVfxGSOtVGkwIc1GTzIun2wUmpovyOc9_i490-NvE6Kr6oNOSaeDXEBQeM2BW3Ww'
    },
    {
      title: 'Phân biệt hệ màu CMYK và RGB: Tại sao in ra lại khác màu trên màn hình?',
      cat: 'Kiến thức',
      date: '12 Tháng 5, 2024',
      desc: 'Tìm hiểu nguyên lý hiển thị màu sắc và cách chuyển đổi profile màu chuẩn xác nhất để sản phẩm thực tế giống 99% so với bản thiết kế trên máy tính...',
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfSEDzsDRK5V7ow_MZazhGOQKEa0Fxz3Fg2h6rBPWEX5w1E8YXv1lYeW6lrV6s5D5ulCQsBpxJboCO2h2AsMGrE2u7K5TeTcbvThor_5OYZGwQrwEpWKhqW9dD9GTHgzUtPyqXgMmRHTi2msJsUAp1ykgTkv6ALikQH1XvYKhodUVekYjO0aIe_yxVTVPkAPyrynP-Y_7mHevKHU_Gxv2koPkM4J6-3wRQ9lbzOSehXq4dym142fXtbg'
    }
  ];

  const popular = [
    { title: 'Lựa chọn loại giấy phù hợp cho catalogue doanh nghiệp', views: '1.2k lượt xem' },
    { title: 'Công nghệ in UV là gì? Những ưu điểm vượt trội bạn cần biết', views: '950 lượt xem' },
    { title: '5 nguyên tắc vàng trong thiết kế nhận diện thương hiệu', views: '840 lượt xem' }
  ];

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen">
      <main className="max-w-[1200px] mx-auto px-margin-desktop py-16">
        {/* Page Title */}
        <header className="text-center mb-16 space-y-4">
          <h1 className="font-display-lg text-4xl font-bold text-deep-navy">Tin tức In ấn &amp; Khuyến mãi</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto text-md">Cập nhật những xu hướng thiết kế mới nhất, kiến thức kỹ thuật in ấn chuyên sâu và các chương trình ưu đãi độc quyền từ PrintPro.</p>
        </header>

        {/* Featured Post Section */}
        <section className="mb-20">
          <article className="group relative overflow-hidden rounded-xl bg-white shadow-sm border border-surface-container grid grid-cols-1 lg:grid-cols-12 gap-0">
            <div className="lg:col-span-8 overflow-hidden">
              <div 
                className="w-full h-full min-h-[350px] bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB3p6090xSNje00UCnFe_138kLD45BhQyZLuNw8zs_o1cHitMV4iMqxWcqM-n7R97-h9gQ-u4NUD84wbHy3_wr0dZz_7KDX3RpSA2OC0S1iNHIowauHZ6X41L9hVNSaUTNLBfYqvMb9CiM0amYRArWJMskIg0LK3LpTRT1lGEyNpmakN5sPSP1nMlYplrWj4D0Js_NauuOIoJd1klETWtkIvW9eQt87AYM9Qz5n7ZhdPPsut6amXW8L7g')" }}
              />
            </div>
            <div className="lg:col-span-4 p-10 flex flex-col justify-center bg-white">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-primary-fixed text-deep-navy px-3 py-1 rounded-full text-xs font-semibold">Kiến thức</span>
                <span className="text-outline text-xs">24 Tháng 5, 2024</span>
              </div>
              <h2 className="font-headline-lg text-deep-navy mb-4 leading-tight text-xl font-bold">Xu hướng thiết kế bao bì bền vững năm 2024: Khi vẻ đẹp đi đôi với môi trường</h2>
              <p className="text-on-surface-variant mb-8 text-sm line-clamp-3">Tìm hiểu cách các doanh nghiệp đang chuyển dịch sang sử dụng vật liệu in ấn tái chế và mực in thực vật để vừa bảo vệ môi trường vừa nâng tầm thương hiệu chuyên nghiệp.</p>
              <a className="inline-flex items-center gap-2 text-vibrant-orange font-bold hover:underline" href="#">
                Đọc tiếp
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </a>
            </div>
          </article>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          {/* Blog Grid Section */}
          <div className="lg:col-span-8 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post, idx) => (
                <article key={idx} className="bg-white rounded-xl overflow-hidden hover:translate-y-[-4px] shadow-sm border border-surface-container transition-all duration-300 group">
                  <div className="aspect-video overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={post.img} alt={post.title} />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-vibrant-orange font-bold text-xs uppercase">{post.cat}</span>
                      <span className="text-outline text-xs">{post.date}</span>
                    </div>
                    <h3 className="font-bold text-deep-navy mb-3 line-clamp-2 text-md leading-tight">{post.title}</h3>
                    <p className="text-on-surface-variant text-xs line-clamp-3 mb-4">{post.desc}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 pt-12 text-sm">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:border-vibrant-orange hover:text-vibrant-orange transition-colors">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-vibrant-orange text-white font-bold">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:border-vibrant-orange hover:text-vibrant-orange transition-colors">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:border-vibrant-orange hover:text-vibrant-orange transition-colors">3</button>
              <span className="px-2">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:border-vibrant-orange hover:text-vibrant-orange transition-colors">8</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:border-vibrant-orange hover:text-vibrant-orange transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Search Box */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-surface-container">
              <h4 className="font-bold text-deep-navy mb-6 text-lg">Tìm kiếm</h4>
              <div className="relative">
                <input className="w-full bg-surface-container-low border-outline-variant rounded-lg px-4 py-3 focus:ring-2 focus:ring-vibrant-orange focus:border-vibrant-orange transition-all text-sm outline-none" placeholder="Nhập từ khóa..." type="text"/>
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-vibrant-orange">
                  <span className="material-symbols-outlined">search</span>
                </button>
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white p-8 rounded-xl shadow-sm border border-surface-container">
              <h4 className="font-bold text-deep-navy mb-6 text-lg">Bài viết xem nhiều nhất</h4>
              <div className="space-y-6">
                {popular.map((item, idx) => (
                  <a key={idx} className="flex gap-4 group cursor-pointer" href="#read">
                    <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                      <div className="w-full h-full bg-deep-navy/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-deep-navy">article</span>
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm text-deep-navy group-hover:text-vibrant-orange transition-colors line-clamp-2 leading-tight">{item.title}</h5>
                      <span className="text-outline text-xs">{item.views}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-deep-navy p-8 rounded-xl shadow-sm text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-4">Đăng ký nhận tin</h4>
                <p className="text-primary-fixed mb-6 text-xs leading-relaxed">Nhận thông báo về các bài viết mới nhất và chương trình khuyến mãi sớm nhất.</p>
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-lg px-4 py-3 focus:ring-2 focus:ring-vibrant-orange focus:bg-white/20 transition-all text-sm outline-none" placeholder="Email của bạn" type="email"/>
                  <button className="w-full bg-vibrant-orange hover:bg-secondary-container text-white font-bold py-3 rounded-lg transition-colors text-sm">Đăng ký ngay</button>
                </form>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-vibrant-orange/10 rounded-full blur-3xl"></div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
