import React, { useState, useEffect } from 'react';

// Real pricing matrices extracted from the "Báo Giá" images
const PRICING_DATA = {
  namecard_nhanh: {
    title: 'Name Card C300 (In nhanh lấy gấp)',
    description: 'Giấy Couches 300gsm cán mờ 2 mặt, kích thước 55x90mm, in nhanh sắc nét. Giá áp dụng cho 1 nội dung thiết kế.',
    quantities: [1, 2, 3, 5, 10, 20, 50, 100],
    unit: 'Hộp',
    getPrices: (qty, isRoundedCorners) => {
      const basePrices = {
        1: 120000, 2: 90000, 3: 70000, 5: 50000, 10: 45000, 20: 40000, 50: 35000, 100: 30000
      };
      const pricePerUnit = basePrices[qty] || 30000;
      const cornerPrice = isRoundedCorners ? 20000 : 0;
      const unitTotal = pricePerUnit + cornerPrice;
      return {
        unitPrice: unitTotal,
        totalPrice: unitTotal * qty
      };
    }
  },
  namecard_offset: {
    title: 'Name Card C300 (In Offset giá tốt)',
    description: 'Giấy Couches 300gsm cán mờ 2 mặt, kích thước 90x54mm, in ghép bài offset chất lượng cao, thời gian 1-2 ngày.',
    quantities: [2, 5, 10, 20, 50, 100],
    unit: 'Hộp',
    getPrices: (qty) => {
      const basePrices = {
        2: 40000, 5: 24000, 10: 17000, 20: 15000, 50: 14000, 100: 13000
      };
      const pricePerUnit = basePrices[qty] || 13000;
      return {
        unitPrice: pricePerUnit,
        totalPrice: pricePerUnit * qty
      };
    }
  },
  temnhan_tron: {
    title: 'Tem Nhãn Hình Tròn/Vuông (In decal giấy bế thành phẩm)',
    description: 'In tem nhãn decal giấy hình tròn, hình vuông, bế demi theo kích thước.',
    sizes: ['3x3cm', '4x4cm', '5x5cm', '6x6cm', '7x7cm'],
    quantities: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000, 5000, 10000],
    unit: 'Cái',
    matrix: {
      '3x3cm': { 100: 360000, 200: 400000, 300: 460000, 400: 360000, 500: 500000, 600: 520000, 700: 540000, 800: 560000, 900: 580000, 1000: 744000, 1500: 864000, 2000: 1008000, 5000: 1704000, 10000: 2616000 },
      '4x4cm': { 100: 400000, 200: 440000, 300: 500000, 400: 540000, 500: 580000, 600: 620000, 700: 660000, 800: 700000, 900: 720000, 1000: 936000, 1500: 1152000, 2000: 1344000, 5000: 2344000, 10000: 2836000 },
      '5x5cm': { 100: 420000, 200: 500000, 300: 560000, 400: 620000, 500: 680000, 600: 740000, 700: 780000, 800: 840000, 900: 900000, 1000: 1152000, 1500: 1440000, 2000: 1728000, 5000: 2512000, 10000: 3600000 },
      '6x6cm': { 100: 440000, 200: 540000, 300: 640000, 400: 720000, 500: 780000, 600: 880000, 700: 940000, 800: 1020000, 900: 1100000, 1000: 1392000, 1500: 1776000, 2000: 2044000, 5000: 2896000, 10000: 4536000 },
      '7x7cm': { 100: 480000, 200: 600000, 300: 720000, 400: 820000, 500: 920000, 600: 1020000, 700: 1120000, 800: 1200000, 900: 1300000, 1000: 1656000, 1500: 2044000, 2000: 2260000, 5000: 3492000, 10000: 5280000 }
    },
    getPrices: (size, qty) => {
      const total = PRICING_DATA.temnhan_tron.matrix[size]?.[qty] || 0;
      return {
        unitPrice: Math.round(total / qty),
        totalPrice: total
      };
    }
  },
  decal_chunhat: {
    title: 'Nhãn Decal Giấy Chữ Nhật (Laser KTS)',
    description: 'In nhanh kỹ thuật số Laser sắc nét, bế demi đứt nửa hình chữ nhật.',
    sizes: ['2x3cm', '2.5x3cm', '3x4cm', '3.5x5cm', '4x6cm', '5x8cm', '5.5x9cm'],
    quantities: [100, 200, 300, 500, 800, 1000, 1500, 2000],
    unit: 'Cái',
    matrix: {
      '2x3cm': { 100: 850, 200: 450, 300: 400, 500: 330, 800: 300, 1000: 260, 1500: 240, 2000: 200 },
      '2.5x3cm': { 100: 900, 200: 500, 300: 450, 500: 360, 800: 330, 1000: 300, 1500: 270, 2000: 240 },
      '3x4cm': { 100: 1000, 200: 550, 300: 480, 500: 380, 800: 360, 1000: 320, 1500: 290, 2000: 270 },
      '3.5x5cm': { 100: 1100, 200: 650, 300: 590, 500: 470, 800: 430, 1000: 390, 1500: 350, 2000: 300 },
      '4x6cm': { 100: 1200, 200: 690, 300: 650, 500: 520, 800: 480, 1000: 450, 1500: 400, 2000: 370 },
      '5x8cm': { 100: 1350, 200: 750, 300: 690, 500: 650, 800: 620, 1000: 590, 1500: 540, 2000: 480 },
      '5.5x9cm': { 100: 1550, 200: 850, 300: 790, 500: 690, 800: 660, 1000: 620, 1500: 560, 2000: 520 }
    },
    getPrices: (size, qty) => {
      const unit = PRICING_DATA.decal_chunhat.matrix[size]?.[qty] || 0;
      return {
        unitPrice: unit,
        totalPrice: unit * qty
      };
    }
  },
  hop_giay: {
    title: 'Hộp Giấy Ivory 300g (18x10x5cm)',
    description: 'Hộp giấy mềm Ivory 300g, cán màng bóng, bế dán thành phẩm hoàn thiện.',
    quantities: [500, 1000, 2000, 5000, 10000],
    unit: 'Cái',
    getPrices: (qty) => {
      const prices = { 500: 8000, 1000: 5500, 2000: 4000, 5000: 3000, 10000: 2800 };
      const unitPrice = prices[qty] || 2800;
      return {
        unitPrice,
        totalPrice: unitPrice * qty
      };
    }
  },
  hop_biyacung: {
    title: 'Hộp Giấy Bìa Cứng Cao Cấp (15x9x28cm)',
    description: 'Chất liệu Ivory/C300, cán mờ 1 mặt chống nước, in offset độ sắc nét cao, thành phẩm đóng thùng carton.',
    quantities: [100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000],
    unit: 'Hộp',
    getPrices: (qty) => {
      const prices = {
        100: 25000, 200: 15000, 300: 10500, 500: 7500, 1000: 5400, 2000: 4900, 3000: 4200, 5000: 3850, 10000: 3250
      };
      const unitPrice = prices[qty] || 3250;
      return {
        unitPrice,
        totalPrice: unitPrice * qty
      };
    }
  },
  hop_ghep: {
    title: 'Hộp Ghép Bài (Giấy Duplex/Ivory 300gsm)',
    description: 'Bảng giá in hộp ghép, in màu, cán màng, bế dán thành phẩm.',
    sizes: ['15x15cm', '15x21cm', '21x21cm', '21x32cm', '27x32cm', '26x38cm', '32x43cm', '36x52cm'],
    quantities: [100, 200, 500, 1000, 2000, 3000, 5000, 10000],
    unit: 'Hộp',
    matrix: {
      '15x15cm': { 100: 750000, 200: 1000000, 500: 1100000, 1000: 1250000, 2000: 1850000, 3000: 2350000, 5000: 3900000, 10000: 7500000 },
      '15x21cm': { 100: 800000, 200: 1000000, 500: 1150000, 1000: 1450000, 2000: 1900000, 3000: 2450000, 5000: 4050000, 10000: 7900000 },
      '21x21cm': { 100: 850000, 200: 1250000, 500: 1350000, 1000: 1750000, 2000: 2350000, 3000: 2950000, 5000: 4950000, 10000: 9650000 },
      '21x32cm': { 100: 900000, 200: 1350000, 500: 1450000, 1000: 1950000, 2000: 3300000, 3000: 4750000, 5000: 7830000, 10000: 15500000 },
      '27x32cm': { 100: 1450000, 200: 1850000, 500: 1900000, 1000: 2600000, 2000: 4000000, 3000: 5700000, 5000: 9250000, 10000: 18000000 },
      '26x38cm': { 100: 1550000, 200: 2150000, 500: 2200000, 1000: 3100000, 2000: 4950000, 3000: 6950000, 5000: 11250000, 10000: 21950000 },
      '32x43cm': { 100: 1650000, 200: 2350000, 500: 2600000, 1000: 3450000, 2000: 5550000, 3000: 7890000, 5000: 13050000, 10000: 24800000 },
      '36x52cm': { 100: 2370000, 200: 2650000, 500: 3450000, 1000: 4950000, 2000: 7850000, 3000: 11150000, 5000: 18150000, 10000: 34620000 }
    },
    getPrices: (size, qty) => {
      const total = PRICING_DATA.hop_ghep.matrix[size]?.[qty] || 0;
      return {
        unitPrice: Math.round(total / qty),
        totalPrice: total
      };
    }
  },
  catalogue_nhanh: {
    title: 'Catalogue A4 (In nhanh số lượng ít)',
    description: 'In nhanh Catalogue A4, bìa C250, ruột C150, cán màng bìa.',
    pagesList: [12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68],
    quantities: [1, 10, 20, 50, 100, 200],
    unit: 'Cuốn',
    matrix: {
      12: { 1: 160000, 10: 63000, 20: 58000, 50: 37000, 100: 29400, 200: 20650 },
      16: { 1: 200000, 10: 77000, 20: 70000, 50: 48000, 100: 37400, 200: 26650 },
      20: { 1: 260000, 10: 93000, 20: 82000, 50: 58000, 100: 44400, 200: 33150 },
      24: { 1: 280000, 10: 109000, 20: 90500, 50: 69000, 100: 55400, 200: 39400 },
      28: { 1: 300000, 10: 123000, 20: 103000, 50: 80000, 100: 65900, 200: 45650 },
      32: { 1: 330000, 10: 141000, 20: 113000, 50: 91000, 100: 73200, 200: 51650 },
      36: { 1: 360000, 10: 155000, 20: 124000, 50: 104000, 100: 80400, 200: 56150 },
      40: { 1: 380000, 10: 165000, 20: 134000, 50: 114600, 100: 88900, 200: 62150 },
      44: { 1: 400000, 10: 173000, 20: 145500, 50: 123000, 100: 95400, 200: 68650 },
      48: { 1: 430000, 10: 182000, 20: 153000, 50: 129000, 100: 101900, 200: 70650 },
      52: { 1: 460000, 10: 192000, 20: 159250, 50: 137000, 100: 109400, 200: 74150 },
      56: { 1: 490000, 10: 207000, 20: 165500, 50: 141000, 100: 119400, 200: 78650 },
      60: { 1: 520000, 10: 219000, 20: 170500, 50: 145000, 100: 129400, 200: 85650 },
      64: { 1: 550000, 10: 227000, 20: 171000, 50: 155000, 100: 134400, 200: 90900 },
      68: { 1: 620000, 10: 235000, 20: 190500, 50: 163000, 100: 139400, 200: 94150 }
    },
    getPrices: (pages, qty) => {
      const unitPrice = PRICING_DATA.catalogue_nhanh.matrix[pages]?.[qty] || 0;
      return {
        unitPrice,
        totalPrice: unitPrice * qty
      };
    }
  },
  catalogue_sll: {
    title: 'Catalogue A4 (In Offset số lượng lớn)',
    description: 'In offset số lượng lớn chuyên nghiệp, bìa C300, ruột C150, cán màng bìa.',
    pagesList: [8, 12, 16, 20, 24, 28, 32, 36, 40, 44],
    quantities: [500, 1000, 2000, 3000, 5000, 10000],
    unit: 'Cuốn',
    matrix: {
      8: { 500: 8000, 1000: 5300, 2000: 3300, 3000: 2700, 5000: 2500, 10000: 2400 },
      12: { 500: 12000, 1000: 7000, 2000: 4100, 3000: 3500, 5000: 3200, 10000: 3000 },
      16: { 500: 14000, 1000: 9000, 2000: 5800, 3000: 4700, 5000: 4400, 10000: 4200 },
      20: { 500: 15000, 1000: 10000, 2000: 7200, 3000: 5300, 5000: 5000, 10000: 4600 },
      24: { 500: 17200, 1000: 11500, 2000: 7500, 3000: 6500, 5000: 6200, 10000: 5800 },
      28: { 500: 19000, 1000: 13000, 2000: 8500, 3000: 7500, 5000: 7200, 10000: 6800 },
      32: { 500: 25000, 1000: 15000, 2000: 9900, 3000: 8700, 5000: 8300, 10000: 7900 },
      36: { 500: 30000, 1000: 16500, 2000: 10900, 3000: 9300, 5000: 9000, 10000: 8700 },
      40: { 500: 33000, 1000: 18000, 2000: 12000, 3000: 10000, 5000: 9700, 10000: 9400 },
      44: { 500: 36000, 1000: 20000, 2000: 13400, 3000: 11000, 5000: 10600, 10000: 10300 }
    },
    getPrices: (pages, qty) => {
      const unitPrice = PRICING_DATA.catalogue_sll.matrix[pages]?.[qty] || 0;
      return {
        unitPrice,
        totalPrice: unitPrice * qty
      };
    }
  }
};

export default function PrecisionPrint() {
  const [productType, setProductType] = useState('namecard_nhanh');
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState('');
  const [pages, setPages] = useState(12);
  const [isRoundedCorners, setIsRoundedCorners] = useState(false);
  const [pricingInfo, setPricingInfo] = useState({ unitPrice: 0, totalPrice: 0 });

  const activeProduct = PRICING_DATA[productType];

  // Sync state variables when productType changes
  useEffect(() => {
    const defaultQty = PRICING_DATA[productType].quantities[0];
    setQuantity(defaultQty);

    if (PRICING_DATA[productType].sizes) {
      setSize(PRICING_DATA[productType].sizes[0]);
    } else {
      setSize('');
    }

    if (PRICING_DATA[productType].pagesList) {
      setPages(PRICING_DATA[productType].pagesList[0]);
    } else {
      setPages(12);
    }

    setIsRoundedCorners(false);
  }, [productType]);

  // Recalculate price whenever inputs change
  useEffect(() => {
    let result = { unitPrice: 0, totalPrice: 0 };
    if (productType === 'namecard_nhanh') {
      result = PRICING_DATA.namecard_nhanh.getPrices(quantity, isRoundedCorners);
    } else if (productType === 'namecard_offset') {
      result = PRICING_DATA.namecard_offset.getPrices(quantity);
    } else if (productType === 'temnhan_tron') {
      result = PRICING_DATA.temnhan_tron.getPrices(size, quantity);
    } else if (productType === 'decal_chunhat') {
      result = PRICING_DATA.decal_chunhat.getPrices(size, quantity);
    } else if (productType === 'hop_giay') {
      result = PRICING_DATA.hop_giay.getPrices(quantity);
    } else if (productType === 'hop_biyacung') {
      result = PRICING_DATA.hop_biyacung.getPrices(quantity);
    } else if (productType === 'hop_ghep') {
      result = PRICING_DATA.hop_ghep.getPrices(size, quantity);
    } else if (productType === 'catalogue_nhanh') {
      result = PRICING_DATA.catalogue_nhanh.getPrices(pages, quantity);
    } else if (productType === 'catalogue_sll') {
      result = PRICING_DATA.catalogue_sll.getPrices(pages, quantity);
    }
    setPricingInfo(result);
  }, [productType, quantity, size, pages, isRoundedCorners]);

  return (
    <div className="animate-fadeIn max-w-[1200px] mx-auto px-4 md:px-8 py-8">
      {/* Header */}
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-deep-navy mb-4">
          Tính giá in ấn tự động
        </h1>
        <p className="text-on-surface-variant max-w-2xl text-sm leading-relaxed">
          Hệ thống báo giá tự động theo thời gian thực dựa trên các bảng giá chuẩn của Xuân Nhĩ. Vui lòng chọn loại sản phẩm và cấu hình số lượng để biết giá chính xác.
        </p>
        <div className="w-16 h-1 bg-vibrant-orange mt-6 rounded-full mx-auto md:mx-0"></div>
      </header>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Selector and Controls */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-8 rounded-2xl shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-deep-navy dark:text-slate-200 mb-2">1. Chọn và cấu hình sản phẩm</h2>
            <p className="text-xs text-on-surface-variant">{activeProduct.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {/* Product Type Dropdown */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Loại sản phẩm
              </label>
              <select
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                className="w-full border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl p-3 text-sm focus:border-deep-navy transition-all outline-none bg-white font-medium"
              >
                <option value="namecard_nhanh">Name Card C300 (In nhanh lấy gấp)</option>
                <option value="namecard_offset">Name Card C300 (In Offset giá tốt)</option>
                <option value="temnhan_tron">Tem Nhãn Tròn / Vuông (Demi)</option>
                <option value="decal_chunhat">Decal Giấy Chữ Nhật (Laser KTS)</option>
                <option value="hop_giay">In Hộp Giấy Ivory 300g (Mềm)</option>
                <option value="hop_biyacung">Hộp Giấy Bìa Cứng Cao Cấp (15x9x28cm)</option>
                <option value="hop_ghep">Hộp Ghép Bài (Duplex/Ivory 300g)</option>
                <option value="catalogue_nhanh">Catalogue A4 (In nhanh SLL ít)</option>
                <option value="catalogue_sll">Catalogue A4 (In Offset SLL lớn)</option>
              </select>
            </div>

            {/* Size Dropdown (Only show if product has sizes) */}
            {activeProduct.sizes && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Kích thước
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl p-3 text-sm focus:border-deep-navy transition-all outline-none bg-white font-medium"
                >
                  {activeProduct.sizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Catalogue Pages Dropdown (Only show for catalogue) */}
            {activeProduct.pagesList && (
              <div className="space-y-2">
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  Số trang
                </label>
                <select
                  value={pages}
                  onChange={(e) => setPages(Number(e.target.value))}
                  className="w-full border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl p-3 text-sm focus:border-deep-navy transition-all outline-none bg-white font-medium"
                >
                  {activeProduct.pagesList.map((p) => (
                    <option key={p} value={p}>{p} Trang</option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity Dropdown (based on real sheets) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                Số lượng ({activeProduct.unit})
              </label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full border border-slate-200 dark:border-slate-800 dark:bg-slate-950 rounded-xl p-3 text-sm focus:border-deep-navy transition-all outline-none bg-white font-medium"
              >
                {activeProduct.quantities.map((qty) => (
                  <option key={qty} value={qty}>
                    {qty.toLocaleString('vi-VN')} {activeProduct.unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Special Add-on Options */}
          {productType === 'namecard_nhanh' && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <label className="flex items-center space-x-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isRoundedCorners}
                  onChange={(e) => setIsRoundedCorners(e.target.checked)}
                  className="h-5 w-5 text-vibrant-orange border-slate-300 dark:border-slate-800 rounded focus:ring-vibrant-orange focus:ring-2 focus:ring-offset-0"
                />
                <span className="text-sm font-bold text-deep-navy dark:text-slate-200">Gia công bo góc card (+20.000đ / 1 hộp)</span>
              </label>
            </div>
          )}
        </div>

        {/* Right Column: Dynamic Price Summary */}
        <div className="lg:col-span-4 bg-deep-navy text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-vibrant-orange rounded-full opacity-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-36 h-36 bg-white rounded-full opacity-5 pointer-events-none"></div>

          <div className="relative z-10 space-y-8">
            <div>
              <h3 className="text-lg font-bold mb-1 uppercase tracking-wide opacity-75">Tóm tắt đơn hàng</h3>
              <div className="h-0.5 bg-white/20 my-4"></div>
            </div>

            <div className="space-y-4 text-sm font-sans">
              <div className="flex justify-between">
                <span className="opacity-75">Sản phẩm:</span>
                <span className="font-bold text-right">{activeProduct.title}</span>
              </div>
              {size && (
                <div className="flex justify-between">
                  <span className="opacity-75">Kích thước:</span>
                  <span className="font-bold">{size}</span>
                </div>
              )}
              {activeProduct.pagesList && (
                <div className="flex justify-between">
                  <span className="opacity-75">Số trang:</span>
                  <span className="font-bold">{pages} trang</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="opacity-75">Số lượng:</span>
                <span className="font-bold">
                  {quantity.toLocaleString('vi-VN')} {activeProduct.unit}
                </span>
              </div>
              {isRoundedCorners && (
                <div className="flex justify-between text-orange-300">
                  <span className="opacity-90">Gia công:</span>
                  <span className="font-bold">Bo tròn góc</span>
                </div>
              )}
              <div className="h-px bg-white/10 my-4"></div>
              <div className="flex justify-between items-end">
                <span className="opacity-75 text-xs pb-1">Đơn giá ước tính:</span>
                <span className="font-semibold text-md text-orange-200">
                  {pricingInfo.unitPrice.toLocaleString('vi-VN')}đ / {activeProduct.unit}
                </span>
              </div>
            </div>

            <div className="bg-white/10 p-5 rounded-xl border border-white/5 space-y-2">
              <p className="text-xs uppercase tracking-wider font-semibold opacity-75">Thành tiền tạm tính</p>
              <p className="text-3xl font-extrabold text-vibrant-orange tracking-tight">
                {pricingInfo.totalPrice.toLocaleString('vi-VN')}đ
              </p>
              <p className="text-[10px] opacity-60">* Giá ước tính chưa gồm VAT và phí thiết kế.</p>
            </div>

            <button 
              onClick={() => {
                alert(`Đã gửi yêu cầu báo giá cho sản phẩm ${activeProduct.title}. Chúng tôi sẽ liên hệ Zalo số điện thoại tài khoản của bạn ngay!`);
              }}
              className="w-full py-4 bg-vibrant-orange hover:bg-orange-600 text-white rounded-xl font-bold text-sm transition-all shadow-md shadow-vibrant-orange/10 flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-md">send</span>
              Gửi yêu cầu & đặt in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
