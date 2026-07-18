import React from 'react';
import { Share2, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B2265] text-slate-350 border-t border-slate-900 text-[14px]">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1: Brand & Desc */}
          <div className="space-y-6">
            <h3 className="text-white font-serif text-xl font-bold tracking-tight">
              Xuan Nhi Printing
            </h3>
            <p className="text-[#A2B3D5] leading-relaxed max-w-sm">
              Leading the print industry with artisan craftsmanship and advanced CMYK precision. Based in the heart of design innovation.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <button 
                className="p-2 rounded-full bg-[#18347E] text-white hover:bg-[#20429C] transition-colors"
                aria-label="Share"
              >
                <Share2 className="h-4.5 w-4.5" />
              </button>
              <button 
                className="p-2 rounded-full bg-[#18347E] text-white hover:bg-[#20429C] transition-colors"
                aria-label="Location"
              >
                <MapPin className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase">Services</h4>
            <ul className="space-y-3">
              <li><a href="#wedding" className="text-[#A2B3D5] hover:text-white transition-colors">Wedding Stationery</a></li>
              <li><a href="#commercial" className="text-[#A2B3D5] hover:text-white transition-colors">Commercial Printing</a></li>
              <li><a href="#packaging" className="text-[#A2B3D5] hover:text-white transition-colors">Packaging Design</a></li>
              <li><a href="#identity" className="text-[#A2B3D5] hover:text-white transition-colors">Brand Identity</a></li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-amber-500 font-medium hover:underline">Services</a></li>
              <li><a href="#portfolio" className="text-[#A2B3D5] hover:text-white transition-colors">Portfolio</a></li>
              <li><a href="#about" className="text-[#A2B3D5] hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-[#A2B3D5] hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-xs tracking-widest uppercase">Newsletter</h4>
            <p className="text-[#A2B3D5] leading-relaxed">
              Subscribe for printing tips and exclusive template releases.
            </p>
            <div className="flex items-center space-x-1 bg-[#18347E] rounded-lg p-1">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-transparent text-white placeholder-[#7890C0] text-sm px-3 py-1.5 focus:outline-none w-full"
              />
              <button className="bg-[#FFEADA] text-[#A85810] font-semibold text-sm px-4 py-1.5 rounded-md hover:bg-white transition-colors">
                Join
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-[#18347E] py-6 bg-[#081B52]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7890C0]">
          <p>&copy; 2026 Xuan Nhi Printing & Design. All rights reserved. Precision in Every Print.</p>
          <div className="flex space-x-6 mt-2 sm:mt-0">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
