import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ChevronRight, Award, RotateCw, ChevronDown, Check } from 'lucide-react';

const mockData = [
  {
    id: 1,
    title: 'Premium Cosmetic Boxes',
    category: 'Packaging',
    tag: 'PACKAGING',
    tagBg: 'bg-[#FCE8E6] text-[#A8201A]',
    description: 'High-end medicinal and cosmetic packaging with soft-touch finish and minimalist embossed detailing.',
    priceText: 'From $2.50 / pc',
    imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=600&auto=format&fit=crop&q=60',
    cmyk: true
  },
  {
    id: 2,
    title: 'Wedding Invitations',
    category: 'Wedding Cards',
    tag: 'WEDDING',
    tagBg: 'bg-[#FEF6E9] text-[#A85810]',
    description: 'Traditional elegance meets modern craftsmanship. Features premium letterpress, gold foiling, and luxurious textures.',
    priceText: 'Custom Quote',
    imageUrl: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=600&auto=format&fit=crop&q=60',
    cmyk: false
  },
  {
    id: 3,
    title: 'Corporate Brochures',
    category: 'Brochures',
    tag: 'MARKETING',
    tagBg: 'bg-[#EBF7FC] text-[#0A7399]',
    description: 'Tri-fold and multi-page brochures with vibrant color reproduction and professional spot-UV finish.',
    priceText: 'From $0.85 / pc',
    imageUrl: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=600&auto=format&fit=crop&q=60',
    cmyk: false
  },
  {
    id: 4,
    title: 'Luxury Retail Bags',
    category: 'Paper Bags',
    tag: 'FASHION',
    tagBg: 'bg-[#FEF6E9] text-[#A85810]',
    description: 'Reinforced luxury paper bags with silk ribbon handles and custom logo embossing for premium branding.',
    priceText: 'Bulk Pricing',
    imageUrl: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=600&auto=format&fit=crop&q=60',
    cmyk: false,
    hasOrangeTag: true
  }
];

const categories = [
  'All Products',
  'Wedding Cards',
  'Paper Bags',
  'Brochures',
  'Stationery',
  'Packaging'
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [products, setProducts] = useState(mockData);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState('Featured');

  const filteredProducts = selectedCategory === 'All Products'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-12 gap-10">
        
        {/* LEFT SIDEBAR: Categories & Quality Card */}
        <aside className="col-span-12 lg:col-span-3 space-y-8">
          <div>
            <h3 className="text-[12px] font-bold tracking-wider text-slate-400 uppercase mb-4">
              Categories
            </h3>
            <ul className="space-y-1.5">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <li key={cat}>
                    <button
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-4 py-3 rounded-lg text-[15px] font-medium transition-all flex items-center justify-between group ${
                        isActive
                          ? 'bg-[#EDF2FA] text-[#1E40AF]'
                          : 'text-slate-650 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <span>{cat}</span>
                      {isActive && <ChevronRight className="h-4 w-4 text-[#1E40AF]" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Premium Quality Card */}
          <div className="bg-[#0B2265] text-white p-6 rounded-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#1E3A8A] to-transparent opacity-40 rounded-full blur-xl" />
            <div className="bg-[#18347E] inline-flex p-2.5 rounded-lg">
              <Award className="h-5 w-5 text-amber-400" />
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-bold tracking-tight">Premium Quality</h4>
              <p className="text-[#A2B3D5] text-[13px] leading-relaxed">
                Precision in every print. From gold foiling to custom die-cuts.
              </p>
            </div>
            <a 
              href="#portfolio" 
              className="inline-block text-[13px] font-semibold text-white underline hover:text-amber-300 transition-colors"
            >
              Explore Portfolio
            </a>
          </div>
        </aside>

        {/* RIGHT CONTENT: Services List */}
        <main className="col-span-12 lg:col-span-9 space-y-8">
          
          {/* Header section */}
          <div className="space-y-3">
            <h1 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-[#0F2253]">
              Our Printing Services
            </h1>
            <p className="text-slate-500 text-[15px] leading-relaxed max-w-3xl">
              Discover our curated collection of premium print solutions designed for brands that value excellence and tactile precision.
            </p>
          </div>

          {/* Filter / Sort bar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-5 text-[14px]">
            <span className="text-slate-400">
              Showing {filteredProducts.length} results
            </span>
            <div className="relative">
              <button 
                onClick={() => setSortOpen(!sortOpen)}
                className="flex items-center space-x-1.5 text-slate-800 font-medium hover:text-slate-900 focus:outline-none"
              >
                <span className="text-slate-400 font-normal">Sort by:</span>
                <span>{sortBy}</span>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </button>

              {sortOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 rounded-lg shadow-lg py-1 z-20">
                  {['Featured', 'Newest', 'Price: Low to High', 'Price: High to Low'].map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setSortBy(option);
                        setSortOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700 text-xs font-medium flex items-center justify-between"
                    >
                      <span>{option}</span>
                      {sortBy === option && <Check className="h-3.5 w-3.5 text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Grid list */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center">
              <p className="text-slate-400">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white border border-slate-100/80 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group flex flex-col justify-between"
                >
                  <div>
                    {/* Color Dots CMYK (if enabled) */}
                    {product.cmyk && (
                      <div className="absolute top-4 left-4 flex space-x-1 z-10">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF]" title="Cyan" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FF007F]" title="Magenta" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#FFEA00]" title="Yellow" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A]" title="Black" />
                      </div>
                    )}

                    {/* Tag badge / Stamp on the right side if retail bag */}
                    {product.hasOrangeTag && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#F38E36] text-white p-3 rounded-full shadow-md z-10 flex items-center justify-center transform hover:scale-105 transition-transform cursor-pointer">
                        <span className="font-bold text-[15px]">$</span>
                      </div>
                    )}

                    {/* Image */}
                    <div className="aspect-[1.5] w-full overflow-hidden bg-slate-50 border-b border-slate-100">
                      <img 
                        src={product.imageUrl} 
                        alt={product.title} 
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>

                    {/* Text Details */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold tracking-tight text-[#0F2253] group-hover:text-amber-600 transition-colors">
                          {product.title}
                        </h2>
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider ${product.tagBg}`}>
                          {product.tag}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[14px] leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing / Details Footer */}
                  <div className="px-6 pb-6 pt-2 flex items-center justify-between mt-auto">
                    <span className="font-semibold text-slate-800 text-[15px]">
                      {product.priceText}
                    </span>
                    <button className="flex items-center space-x-1.5 px-4 py-2 border border-slate-200 hover:border-slate-800 rounded-lg text-slate-700 hover:text-slate-900 text-sm font-medium transition-colors">
                      <span>View Details</span>
                      <span>&rarr;</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          <div className="flex justify-center pt-6">
            <button className="flex items-center space-x-2 px-6 py-3 bg-[#EEF2F6] hover:bg-[#E2E8F0] text-slate-700 rounded-full font-medium text-sm transition-colors">
              <RotateCw className="h-4 w-4 text-slate-500" />
              <span>Load More Designs</span>
            </button>
          </div>

        </main>
      </div>
    </div>
  );
}
