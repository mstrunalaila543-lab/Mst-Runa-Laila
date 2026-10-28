import React, { useState, useRef, useCallback } from 'react';
import { Droplets, Sparkles, SlidersHorizontal, ShieldAlert, Check } from 'lucide-react';

export const PaintProtectionExperience: React.FC = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [showWaterDroplets, setShowWaterDroplets] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(0, Math.min(rect.width, x));
    const percentage = (clamped / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    handleMove(e.clientX);
  };

  return (
    <section className="py-20 lg:py-28 bg-[#111214] text-white overflow-hidden border-b border-[#26282E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#C9F044]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#C9F044] uppercase">
              INTERACTIVE COATING COMPARISON
            </span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase">
            A FINISH THAT SPEAKS<br />FOR ITSELF.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#BFC3C8] leading-relaxed">
            Drag the interactive divider to observe the optical depth transformation between uncorrected factory clearcoat and multi-stage corrected, ceramic-sealed paintwork.
          </p>
        </div>

        {/* Interactive Before & After Slider Stage */}
        <div className="relative rounded-2xl overflow-hidden border border-[#2E3035] bg-[#16171A] shadow-2xl">
          <div
            ref={containerRef}
            onMouseDown={() => (isDraggingRef.current = true)}
            onMouseUp={() => (isDraggingRef.current = false)}
            onMouseLeave={() => (isDraggingRef.current = false)}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            className="relative h-[380px] sm:h-[480px] md:h-[540px] w-full select-none cursor-ew-resize overflow-hidden"
          >
            {/* UNDER LAYER: Ceramic Coated Super-Gloss / Hydrophobic */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src="https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=1800&q=85"
                alt="Ceramic Coated High-Gloss Automotive Finish"
                className="w-full h-full object-cover filter contrast-[1.12] brightness-[1.02]"
              />

              {/* Water Droplet Simulation Overlay on Coated Side */}
              {showWaterDroplets && (
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(201,240,68,0.06),transparent_70%)]">
                  {/* Procedural Water Bead Highlights */}
                  <div className="absolute top-1/3 right-1/4 flex items-center gap-2 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full border border-[#C9F044]/40 text-[11px] font-semibold text-[#C9F044]">
                    <Droplets className="w-3.5 h-3.5" />
                    <span>Extreme Hydrophobic Contact Angle (&gt;110°)</span>
                  </div>
                </div>
              )}

              {/* Right Tag */}
              <div className="absolute top-5 right-5 z-10 bg-[#111214]/85 backdrop-blur-md px-4 py-2 rounded-lg border border-[#C9F044]/50 shadow-md">
                <div className="flex items-center gap-2 text-xs font-bold text-[#C9F044] tracking-wider uppercase font-heading">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ceramic Coating Shield</span>
                </div>
                <div className="text-[11px] text-[#BFC3C8] mt-0.5">
                  Ultra-slick mirror gloss + self-cleaning tension
                </div>
              </div>
            </div>

            {/* TOP LAYER: Uncoated / Swirled Factory Paint (Clipped by slider) */}
            <div
              className="absolute inset-0 h-full overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <div className="relative w-full h-full">
                <img
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85"
                  alt="Standard Uncoated Factory Clearcoat"
                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.88] saturate-[0.85] contrast-[0.95]"
                  style={{ width: containerRef.current?.clientWidth || '100%', maxWidth: 'none' }}
                />

                {/* Subtle swirl / dull micro-marring overlay */}
                <div className="absolute inset-0 bg-black/25 pointer-events-none" />

                {/* Left Tag */}
                <div className="absolute top-5 left-5 z-10 bg-[#111214]/85 backdrop-blur-md px-4 py-2 rounded-lg border border-[#2E3035] shadow-md">
                  <div className="text-xs font-bold text-white tracking-wider uppercase font-heading">
                    Standard / Unprotected
                  </div>
                  <div className="text-[11px] text-[#73777D] mt-0.5">
                    Wash swirls, light oxidation, flat water sheeting
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDER DIVIDER LINE & HANDLE */}
            <div
              className="absolute top-0 bottom-0 z-20 w-[2px] bg-[#C9F044] shadow-[0_0_12px_rgba(201,240,68,0.8)] cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#111214] border-2 border-[#C9F044] flex items-center justify-center text-[#C9F044] shadow-xl hover:scale-110 transition-transform">
                <SlidersHorizontal className="w-4 h-4" />
              </div>
            </div>

            {/* Drag helper tooltip on initial load */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-black/75 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-white font-medium">
              Drag left or right to compare
            </div>
          </div>

          {/* Interactive Controls Strip */}
          <div className="p-4 sm:p-5 bg-[#141518] border-t border-[#26282E] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowWaterDroplets(!showWaterDroplets)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${
                  showWaterDroplets
                    ? 'bg-[#C9F044] text-[#111214]'
                    : 'bg-[#1F2024] text-[#BFC3C8] hover:bg-[#2A2B30]'
                }`}
              >
                <Droplets className="w-3.5 h-3.5" />
                <span>Water Beading Simulation: {showWaterDroplets ? 'ON' : 'OFF'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSliderPosition(50)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#1F2024] text-[#BFC3C8] hover:bg-[#2A2B30] transition-colors"
              >
                Center Slider (50/50)
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-[#73777D]">
              <Check className="w-4 h-4 text-[#C9F044]" />
              <span>Multi-layer silica (SiO2) molecular bonding</span>
            </div>
          </div>
        </div>

        {/* Clear Professional Disclaimer as required by prompt */}
        <div className="mt-4 flex items-start gap-2.5 p-3.5 bg-[#18191D] rounded-xl border border-[#2E3035] text-xs text-[#73777D]">
          <ShieldAlert className="w-4 h-4 text-[#BFC3C8] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-[#BFC3C8]">Technical Notice:</strong> Visual simulation representing optical clarity enhancement and hydrophobic water behavior. Actual real-world results depend on your vehicle's base paint condition and clearcoat thickness. Ceramic coatings do not make vehicles scratch-proof or immune to heavy rock chips.
          </p>
        </div>
      </div>
    </section>
  );
};
