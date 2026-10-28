import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface FinalCtaBannerProps {
  onBookClick: () => void;
}

export const FinalCtaBanner: React.FC<FinalCtaBannerProps> = ({ onBookClick }) => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#111214] overflow-hidden border-t border-[#26282E]">
      {/* Background Architectural Automotive Graphic */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=2000&q=85"
          alt="Silver sports car in architectural tunnel"
          className="w-full h-full object-cover filter brightness-[0.35] contrast-[1.15]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111214] via-[#111214]/80 to-[#111214]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-transparent to-[#111214]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/15 text-xs text-[#C9F044] mb-6">
          <span className="w-2 h-2 rounded-full bg-[#C9F044]" />
          <span className="font-mono tracking-widest uppercase">CONVENIENT LUXURY AT YOUR DOOR</span>
        </div>

        <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter text-white uppercase max-w-4xl leading-[0.92]">
          YOUR VEHICLE<br />
          <span className="text-[#C9F044] drop-shadow-[0_0_35px_rgba(201,240,68,0.3)]">
            DESERVES MORE.
          </span>
        </h2>

        <p className="mt-6 text-base sm:text-xl text-[#BFC3C8] max-w-2xl font-normal leading-relaxed">
          Discover a more refined approach to automotive detailing. Experience high-gloss paint protection and immaculate care delivered directly to you.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={onBookClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9F044] text-[#111214] hover:bg-[#d8fa5a] font-heading font-black text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            <span>REQUEST YOUR APPOINTMENT</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={BUSINESS_INFO.callHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/15 text-white font-heading font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl border border-white/20 backdrop-blur-sm transition-all"
          >
            <Phone className="w-4 h-4 text-[#C9F044]" />
            <span>Call {BUSINESS_INFO.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
