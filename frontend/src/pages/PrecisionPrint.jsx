import React, { useState } from 'react';

export default function PrecisionPrint() {
  const [productType, setProductType] = useState('namecard');
  const [quantity, setQuantity] = useState(200);
  const [paper, setPaper] = useState('conqueror');
  const [finishing, setFinishing] = useState('none');
  const [file, setFile] = useState(null);

  // Pricing constants (simple mockup calculator)
  const basePrices = {
    namecard: 50,
    catalogue: 120,
    bag: 90,
    decal: 40
  };

  const paperMultipliers = {
    conqueror: 1.5,
    canvas: 1.3,
    smooth: 1.1,
    stardream: 1.7
  };

  const finishingPrices = {
    none: 0,
    foil: 35000,
    round: 15000,
    emboss: 40000
  };

  const calculateTotal = () => {
    const base = basePrices[productType] || 50;
    const mult = paperMultipliers[paper] || 1.0;
    const finish = finishingPrices[finishing] || 0;
    
    // Simple calculation: (Base * Quantity * Multiplier) + Finishing
    const total = Math.round((base * quantity * mult) + finish);
    return total.toLocaleString('vi-VN') + ' đ';
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="bg-background text-on-surface font-sans min-h-screen py-12">
      <div className="max-w-[1200px] mx-auto px-margin-desktop">
        <header className="mb-12">
          <h1 className="font-display-lg font-bold text-3xl md:text-4xl text-deep-navy mb-4">Hệ Thống Tính Giá In Ấn Chính Xác</h1>
          <p className="text-on-surface-variant max-w-2xl text-sm">Cấu hình các tùy chọn in ấn của bạn bên dưới để nhận ngay báo giá chính xác theo thời gian thực.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Configuration Form */}
          <div className="lg:col-span-8 bg-paper-white p-8 rounded-xl shadow-sm border border-surface-container space-y-6">
            <h2 className="font-display-lg text-lg font-bold text-deep-navy">1. Cấu hình sản phẩm</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Type */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Loại sản phẩm</label>
                <select 
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full border border-outline-variant rounded-lg p-3 text-sm focus:border-deep-navy focus:ring-deep-navy outline-none bg-white transition-all"
                >
                  <option value="namecard">Name Card Cao Cấp</option>
                  <option value="catalogue">Catalogue Doanh Nghiệp</option>
                  <option value="bag">Túi Giấy Kraft</option>
                  <option value="decal">Nhãn Decal Cuộn</option>
                </select>
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Số lượng</label>
                <input 
                  type="number" 
                  min="100" 
                  step="100"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border border-outline-variant rounded-lg p-3 text-sm focus:border-deep-navy focus:ring-deep-navy outline-none transition-all"
                />
              </div>

              {/* Paper Material */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Chất liệu giấy</label>
                <select 
                  value={paper}
                  onChange={(e) => setPaper(e.target.value)}
                  className="w-full border border-outline-variant rounded-lg p-3 text-sm focus:border-deep-navy focus:ring-deep-navy outline-none bg-white transition-all"
                >
                  <option value="conqueror">Conqueror Laid 220gsm</option>
                  <option value="canvas">Koehler Canvas 250gsm</option>
                  <option value="smooth">Monnalisa Smooth 300gsm</option>
                  <option value="stardream">Giấy ánh kim Stardream</option>
                </select>
              </div>

              {/* Finishing */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Gia công sau in</label>
                <select 
                  value={finishing}
                  onChange={(e) => setFinishing(e.target.value)}
                  className="w-full border border-outline-variant rounded-lg p-3 text-sm focus:border-deep-navy focus:ring-deep-navy outline-none bg-white transition-all"
                >
                  <option value="none">Cắt xén thẳng (Mặc định)</option>
                  <option value="foil">Ép kim (Vàng/Bạc)</option>
                  <option value="round">Bo tròn 4 góc</option>
                  <option value="emboss">Dập chìm/Dập nổi logo</option>
                </select>
              </div>
            </div>

            <hr className="border-surface-container" />

            {/* File Upload Zone */}
            <div className="space-y-3">
              <h2 className="font-display-lg text-lg font-bold text-deep-navy">2. Tải lên file thiết kế</h2>
              <div className="border-2 border-dashed border-deep-navy/30 hover:border-deep-navy bg-surface-container-low rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all relative">
                <input 
                  type="file" 
                  id="file-upload" 
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <span className="material-symbols-outlined text-4xl text-deep-navy mb-3">cloud_upload</span>
                <p className="text-sm font-semibold text-deep-navy mb-1">
                  {file ? file.name : 'Nhấp hoặc Kéo & Thả file thiết kế của bạn vào đây'}
                </p>
                <p className="text-xs text-outline">Chấp nhận PDF, AI, PSD, INDD (Tối đa 50MB)</p>
              </div>
            </div>
          </div>

          {/* Pricing Estimation Sidebar */}
          <div className="lg:col-span-4 bg-[#0B2265] text-white p-8 rounded-xl shadow-sm space-y-6 sticky top-28">
            <h2 className="font-display-lg text-lg font-bold">Báo giá chi tiết</h2>
            
            <div className="space-y-4 text-sm border-b border-white/10 pb-6">
              <div className="flex justify-between">
                <span className="text-[#A2B3D5]">Loại sản phẩm:</span>
                <span className="font-semibold capitalize">{productType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A2B3D5]">Số lượng:</span>
                <span className="font-semibold">{quantity} chiếc</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A2B3D5]">Chất liệu giấy:</span>
                <span className="font-semibold capitalize">{paper}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A2B3D5]">Gia công sau in:</span>
                <span className="font-semibold capitalize">{finishing !== 'none' ? finishing : 'Không'}</span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <span className="text-[#A2B3D5] text-sm">Tổng cộng (Tạm tính):</span>
              <span className="text-2xl font-bold text-vibrant-orange">{calculateTotal()}</span>
            </div>

            <button 
              onClick={() => alert('Yêu cầu báo giá của bạn đã được tiếp nhận. Đội ngũ chuyên viên sẽ liên hệ lại sớm nhất!')}
              className="w-full bg-vibrant-orange text-white py-4 rounded-lg font-bold hover:bg-[#e05f00] transition-colors shadow-lg text-sm"
            >
              Gửi yêu cầu & Đặt in ngay
            </button>

            <p className="text-xs text-[#A2B3D5] text-center leading-relaxed">
              * Báo giá trên là tạm tính dựa trên quy cách tiêu chuẩn. Giá thực tế có thể thay đổi sau khi kiểm tra file thiết kế của bạn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
