import React from 'react';
import { ShieldCheck, Droplet, Sparkles, Phone, ArrowUpRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface AboutSectionProps {
  onBookClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBookClick }) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-[#F7F7F5] border-b border-[#E0E2E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#DCDEDF] shadow-xl bg-[#111214] group">
              <img
                src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=1200&q=85"
                alt="Mobile detailing professional steam cleansing and ceramic application"
                className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.93]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Floating studio feature card */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#E0E2E6] shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#111214] flex items-center justify-center text-[#C9F044] shrink-0">
                    <Droplet className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#111214]">
                      Zero Spot Mineral-Free Deionized Water
                    </h4>
                    <p className="text-xs text-[#555960]">
                      Purified through double resin beds to eliminate calcium spotting under sunlight.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner metallic accent */}
            <div className="absolute -top-3 -right-3 w-16 h-16 border-t-2 border-r-2 border-[#C9F044] rounded-tr-2xl pointer-events-none" />
          </div>

          {/* Text Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="w-6 h-[2px] bg-[#111214]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#73777D] uppercase">
                THE MOBILE STANDARD
              </span>
            </div>

            <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#111214] uppercase leading-[0.98]">
              PREMIUM CARE.<br />
              CONVENIENTLY DELIVERED.
            </h2>

            <p className="text-sm sm:text-base text-[#555960] leading-relaxed">
              Mobile Ceramic Coatings was established around a simple standard: luxury automotive care should not require losing your car to a shop for days. We bring detailing studio techniques, surgical illumination, and professional-grade ceramic systems directly to your home or office.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-md bg-[#111214] text-[#C9F044] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#111214]">
                    Tailored Inspection & Safe Formulations
                  </h4>
                  <p className="text-xs text-[#555960] mt-0.5 leading-relaxed">
                    Every vehicle paint system is unique—from delicate Japanese soft clears to rock-hard German finishes. We adjust pad density, polish abrasives, and coating formulas accordingly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-md bg-[#111214] text-[#C9F044] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-[#111214]">
                    Independent Power & Water Independence
                  </h4>
                  <p className="text-xs text-[#555960] mt-0.5 leading-relaxed">
                    Our customized mobile rig operates completely self-contained without needing your home utilities, offering a seamless experience whether at a private estate or corporate parking facility.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#111214] text-white hover:bg-[#202226] text-xs font-heading font-bold uppercase tracking-wider rounded-lg transition-all shadow-md"
              >
                <span>REQUEST YOUR QUOTE</span>
                <ArrowUpRight className="w-4 h-4 text-[#C9F044]" />
              </button>

              <a
                href={BUSINESS_INFO.callHref}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#111214] hover:underline"
              >
                <Phone className="w-3.5 h-3.5 text-[#111214]" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
