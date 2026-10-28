import React from 'react';
import { Navigation, Sparkles, ShieldCheck, Car, CheckCircle2 } from 'lucide-react';
import { HIGHLIGHTS } from '../data/content';

export const HighlightStrip: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Navigation':
        return <Navigation className="w-5 h-5 text-[#C9F044]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#C9F044]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#C9F044]" />;
      case 'Car':
      default:
        return <Car className="w-5 h-5 text-[#C9F044]" />;
    }
  };

  return (
    <section className="bg-white border-y border-[#E0E2E6] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#E5E7EB]">
          {HIGHLIGHTS.map((item, index) => (
            <div
              key={item.title}
              className={`flex flex-col justify-between group ${
                index > 0 ? 'pt-4 sm:pt-0 sm:pl-6 lg:pl-8' : ''
              }`}
            >
              <div className="flex items-start gap-3.5 mb-2">
                <div className="w-10 h-10 rounded-lg bg-[#111214] flex items-center justify-center shrink-0 border border-[#26282E] group-hover:scale-105 group-hover:border-[#C9F044] transition-all">
                  {getIcon(item.icon)}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-[#111214] tracking-tight group-hover:text-black">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#73777D] tracking-wide uppercase mt-0.5">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#555960] leading-relaxed mt-2 pl-[54px] sm:pl-0">
                {item.description}
              </p>

              <div className="mt-3 hidden lg:flex items-center gap-1.5 text-[11px] font-semibold text-[#111214]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C9F044]" />
                <span>Verified Studio Standard</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
