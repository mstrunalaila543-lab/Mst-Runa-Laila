import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { PROCESS_STEPS, BUSINESS_INFO } from '../data/content';

interface ProcessSectionProps {
  onStartBooking: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onStartBooking }) => {
  return (
    <section id="process" className="py-20 lg:py-28 bg-[#F7F7F5] border-b border-[#E0E2E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#111214]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#73777D] uppercase">
              A BETTER DETAILING EXPERIENCE
            </span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#111214] uppercase">
            SIMPLE FROM START<br />TO FINISH.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#555960] leading-relaxed">
            From initial consultation to final inspection under specialized daylight lighting, our mobile process is designed for seamless convenience and unmatched precision.
          </p>
        </div>

        {/* Process Timeline: Horizontal on Desktop, Vertical on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-7 left-12 right-12 h-[2px] bg-[#E0E2E6] -z-0" />

          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative bg-white rounded-2xl p-6 sm:p-7 border border-[#E0E2E6] shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between group"
            >
              <div>
                {/* Step indicator circle */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#111214] text-[#C9F044] font-heading font-black text-base flex items-center justify-center border border-[#2E3035] group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                  <span className="text-[10px] font-mono uppercase text-[#73777D]">
                    PHASE 0{idx + 1}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-lg text-[#111214] tracking-tight mb-2">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#555960] leading-relaxed mb-4">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2F2F0] text-xs text-[#73777D] leading-normal">
                {step.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Action callout banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#111214] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <h4 className="font-heading font-bold text-xl text-white">
              Ready to schedule your mobile detail?
            </h4>
            <p className="text-xs sm:text-sm text-[#BFC3C8] mt-1">
              Speak directly with our team or submit a preliminary vehicle quote request.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
            <a
              href={BUSINESS_INFO.callHref}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-[#3E4249] text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#C9F044]" />
              <span>{BUSINESS_INFO.phone}</span>
            </a>

            <button
              type="button"
              onClick={onStartBooking}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#C9F044] text-[#111214] hover:bg-[#d5fa50] text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <span>BOOK APPOINTMENT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
