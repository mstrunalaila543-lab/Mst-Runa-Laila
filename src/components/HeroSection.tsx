import React from 'react';
import { ArrowRight, Phone, ShieldCheck, Sparkles, ChevronDown } from 'lucide-react';
import { Hero3DCar } from './Hero3DCar';
import { BUSINESS_INFO } from '../data/content';

interface HeroSectionProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookClick, onExploreClick }) => {
  return (
    <section id="home" className="relative pt-24 sm:pt-28 pb-8 lg:pb-12 bg-[#F7F7F5] overflow-hidden">
      {/* Subtle architectural background grid accents */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Eyebrow & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#E0E2E6] rounded-full shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#C9F044]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#151515] uppercase">
              PREMIUM MOBILE AUTO DETAILING
            </span>
          </div>

          <a
            href={BUSINESS_INFO.callHref}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#151515] hover:text-[#000] px-3 py-1 rounded-md bg-white/70 border border-[#E0E2E6] hover:bg-white transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#151515]" />
            <span>Direct Scheduling: {BUSINESS_INFO.phone}</span>
          </a>
        </div>

        {/* Hero Title & Supporting Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-6 sm:mb-8">
          <div className="lg:col-span-8">
            <h1 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.92] text-[#111214] uppercase">
              YOUR CAR.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#111214] via-[#2A2B30] to-[#73777D]">
                RESTORED TO
              </span><br />
              <span className="relative inline-block">
                PERFECTION.
                <span className="absolute left-0 bottom-1 sm:bottom-2 w-full h-[6px] sm:h-[8px] bg-[#C9F044] -z-10 rounded-sm" />
              </span>
            </h1>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between space-y-5">
            <p className="text-sm sm:text-base text-[#555960] font-normal leading-relaxed">
              {BUSINESS_INFO.subheading}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2 bg-[#111214] text-white hover:bg-[#202226] text-xs sm:text-sm font-heading font-bold uppercase tracking-wider px-6 py-3.5 rounded-md shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>BOOK YOUR DETAIL</span>
                <ArrowRight className="w-4 h-4 text-[#C9F044]" />
              </button>

              <button
                type="button"
                onClick={onExploreClick}
                className="inline-flex items-center justify-center gap-2 bg-white text-[#111214] hover:bg-[#EDEDEB] border border-[#D8DADD] text-xs sm:text-sm font-heading font-semibold uppercase tracking-wider px-5 py-3.5 rounded-md transition-colors"
              >
                <span>EXPLORE SERVICES</span>
              </button>
            </div>
          </div>
        </div>

        {/* IMMERSIVE 3D / STUDIO CAR STAGE */}
        <div className="relative rounded-2xl overflow-hidden border border-[#E0E2E6] shadow-xl bg-[#F7F7F5]">
          <Hero3DCar onBookClick={onBookClick} />
        </div>

        {/* Quick Micro-bar beneath hero car */}
        <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-[#73777D] gap-3 px-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#111214]" />
            <span>Self-contained mobile detailing rig & spot-free rinse</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#111214]" />
            <span>Bespoke multi-stage paint correction & ceramic coating</span>
          </div>
          <a
            href="#process"
            className="flex items-center gap-1 text-[#111214] font-semibold hover:underline"
          >
            <span>Learn how our mobile service works</span>
            <ChevronDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
