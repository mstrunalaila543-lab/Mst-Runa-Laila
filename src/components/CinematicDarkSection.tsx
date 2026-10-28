import React, { useState } from 'react';
import { Sparkles, Eye, Shield, Compass, ArrowRight } from 'lucide-react';

interface CinematicDarkSectionProps {
  onExploreServices: () => void;
}

export const CinematicDarkSection: React.FC<CinematicDarkSectionProps> = ({ onExploreServices }) => {
  const [activeHighlight, setActiveHighlight] = useState<number>(0);
  const [lightSweepPos, setLightSweepPos] = useState<number>(35);

  const pillars = [
    {
      title: 'Precision Paint Gauging',
      desc: 'Digital ultrasound micrometers measure clear coat thickness across all metal and composite panels before polishing.',
    },
    {
      title: 'Surgical Light Inspection',
      desc: 'High-CRI daylight and warm LED inspection arrays expose micro-holograms and marring invisible in ambient sunlight.',
    },
    {
      title: 'Nano-Quartz Curing',
      desc: 'Infrared lamp baking activates ceramic coating cross-linking for enhanced molecular bonding and surface hardness.',
    },
  ];

  return (
    <section className="relative bg-[#111214] text-white py-20 lg:py-28 overflow-hidden">
      {/* Top smooth dark gradient transition */}
      <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#F7F7F5] to-transparent opacity-10 pointer-events-none" />

      {/* Cinematic subtle studio grid & ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(201,240,68,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#C9F044]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#C9F044]" />
            <span className="text-[11px] font-bold tracking-[0.25em] text-[#C9F044] uppercase">
              THE ART OF AUTOMOTIVE CARE
            </span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-6xl lg:text-7xl tracking-tighter leading-[0.95] uppercase">
            EVERY DETAIL.<br />
            <span className="text-[#C9F044] drop-shadow-[0_0_25px_rgba(201,240,68,0.25)]">
              PERFECTED.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#BFC3C8] font-normal leading-relaxed max-w-2xl">
            Great detailing is about more than appearance. It is about careful preparation, refined finishing, and attention to the details that make your vehicle stand out.
          </p>
        </div>

        {/* Cinematic Studio Showcase with Light Reflection Sweep */}
        <div className="relative rounded-2xl overflow-hidden border border-[#26282E] bg-[#16171A] group">
          {/* Main Wide Automotive Studio Visual */}
          <div className="relative w-full h-[320px] sm:h-[440px] md:h-[520px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=2000&q=85"
              alt="Cinematic side-profile sports car in dark detailing studio"
              className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.1] transition-transform duration-1000 group-hover:scale-[1.02]"
            />

            {/* Dark Studio Vignette and Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111214] via-[#111214]/30 to-[#111214]/60 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#111214]/90 via-transparent to-[#111214]/90 pointer-events-none" />

            {/* Animated Light Sweep Beam across Car Curve */}
            <div
              className="absolute top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-[#C9F044]/25 to-transparent blur-md pointer-events-none transition-all duration-700"
              style={{ left: `${lightSweepPos}%` }}
            />

            {/* Studio Inspection Beam Line */}
            <div
              className="absolute top-0 bottom-0 w-[1px] bg-[#C9F044] opacity-50 pointer-events-none transition-all duration-700"
              style={{ left: `${lightSweepPos + 6}%` }}
            />

            {/* Hotspot Interactive Markers on the Car */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-[#111214]/85 backdrop-blur-md px-3 py-1.5 rounded-md border border-[#2E3035] text-xs font-mono text-[#BFC3C8]">
                  <span>STUDIO CHAMBER : 5500K CRI-98 INSPECTION</span>
                </div>

                {/* Light reflection position slider */}
                <div className="flex items-center gap-2 bg-[#111214]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#2E3035]">
                  <span className="text-[11px] text-[#73777D] font-mono uppercase">Studio Lighting:</span>
                  <input
                    type="range"
                    min="10"
                    max="85"
                    value={lightSweepPos}
                    onChange={(e) => setLightSweepPos(Number(e.target.value))}
                    aria-label="Adjust studio inspection lighting position"
                    className="w-24 sm:w-32 accent-[#C9F044] cursor-pointer"
                  />
                </div>
              </div>

              {/* Bottom Card Overlay inside Image */}
              <div className="max-w-md bg-[#111214]/90 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-[#2E3035]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C9F044] uppercase tracking-wider mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Cured Nano-Ceramic Barrier</span>
                </div>
                <h4 className="font-heading font-bold text-lg text-white">
                  Flawless Mirror Depth
                </h4>
                <p className="text-xs text-[#BFC3C8] mt-1 leading-relaxed">
                  Eliminating microscopic orange-peel texture and micro-marring to unlock deep optical reflectivity that lasts through extreme weather.
                </p>
              </div>
            </div>
          </div>

          {/* Pillars Row directly under the visual */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#26282E] border-t border-[#26282E] bg-[#141518]">
            {pillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                onClick={() => {
                  setActiveHighlight(idx);
                  setLightSweepPos(25 + idx * 28);
                }}
                className={`p-5 sm:p-6 cursor-pointer transition-all ${
                  activeHighlight === idx
                    ? 'bg-[#1A1B1F] border-b-2 md:border-b-0 md:border-t-2 border-[#C9F044]'
                    : 'hover:bg-[#18191D]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-[#73777D]">
                    0{idx + 1} / METROLOGY
                  </span>
                  {activeHighlight === idx && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9F044]" />
                  )}
                </div>
                <h4 className="font-heading font-bold text-sm sm:text-base text-white tracking-tight">
                  {pillar.title}
                </h4>
                <p className="text-xs text-[#73777D] mt-2 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onExploreServices}
            className="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#C9F044] hover:text-white transition-colors"
          >
            <span>Explore All Precision Services</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
