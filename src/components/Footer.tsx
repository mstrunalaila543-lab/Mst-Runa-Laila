import React from 'react';
import { Phone, MapPin, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO, SERVICES } from '../data/content';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B0C0E] text-[#BFC3C8] border-t border-[#222428] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12 pb-12 border-b border-[#1E2024]">
          {/* Brand Col (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-[#16171A] flex items-center justify-center text-[#C9F044] border border-[#2E3035]">
                <span className="font-heading font-black text-sm">MC</span>
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-black text-white text-base tracking-widest uppercase">
                  Mobile Ceramic
                </span>
                <span className="text-[10px] tracking-[0.24em] font-bold text-[#C9F044] uppercase">
                  Coatings
                </span>
              </div>
            </div>

            <p className="text-xs text-[#73777D] leading-relaxed max-w-sm">
              Mobile Ceramic Coatings delivers premier automotive detailing, bespoke paint correction, and advanced ceramic nanotechnology directly to your location with self-contained equipment.
            </p>

            <div className="pt-2">
              <a
                href={BUSINESS_INFO.callHref}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#16171A] text-white hover:text-[#C9F044] border border-[#26282E] text-xs font-semibold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C9F044]" />
                <span>Direct Line: {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-[#C9F044] transition-colors">Home Studio</a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#C9F044] transition-colors">Our Services</a>
              </li>
              <li>
                <a href="#process" className="hover:text-[#C9F044] transition-colors">Mobile Process</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#C9F044] transition-colors">Transformation Gallery</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#C9F044] transition-colors">Customer Experiences</a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#C9F044] transition-colors">About Us</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#C9F044] transition-colors">Book Appointment</a>
              </li>
            </ul>
          </div>

          {/* Confirmed Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">
              Verified Services
            </h4>
            <ul className="space-y-2 text-xs">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-white transition-colors">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Dispatch & Review Link */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">
              Verification & Dispatch
            </h4>
            <div className="space-y-2 text-xs text-[#73777D]">
              <p>• Fully self-contained mobile detailing unit</p>
              <p>• Spot-free deionized filtered water</p>
              <p>• Digital paint depth inspection</p>
            </div>

            <div className="pt-2">
              <a
                href={BUSINESS_INFO.googleReviewConfigUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#C9F044] hover:underline"
              >
                <span>Google Business Reviews</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#555960] gap-4">
          <p>© {new Date().getFullYear()} Mobile Ceramic Coatings. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Local Service Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
