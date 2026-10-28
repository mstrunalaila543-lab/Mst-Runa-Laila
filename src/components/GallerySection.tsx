import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data/content';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight, Eye, Sparkles, ZoomIn } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'correction' | 'coating' | 'interior' | 'wheels'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'coating', label: 'Ceramic Coating' },
    { id: 'correction', label: 'Paint Correction' },
    { id: 'wheels', label: 'Wheels & Calipers' },
    { id: 'interior', label: 'Interior Rejuvenation' },
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-20 lg:py-28 bg-[#F7F7F5] border-b border-[#E0E2E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#111214]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#73777D] uppercase">
                THE DETAILS MAKE THE DIFFERENCE
              </span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#111214] uppercase">
              SEE THE<br />TRANSFORMATION.
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#111214] text-white shadow-xs'
                    : 'bg-white text-[#555960] hover:bg-[#E5E7EB] border border-[#E0E2E6]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative rounded-2xl overflow-hidden bg-white border border-[#E0E2E6] shadow-2xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#111214]">
                <img
                  src={item.afterImage}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.93]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-[#111214]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/90 backdrop-blur-md text-[#111214] shadow-lg">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 bg-[#111214]/85 backdrop-blur-md text-[#C9F044] rounded text-[10px] font-mono uppercase tracking-wider">
                    {item.category.toUpperCase()}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[11px] font-mono text-[#C9F044] uppercase tracking-wider mb-0.5">
                    {item.vehicle}
                  </p>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-white leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 sm:p-5 flex items-center justify-between text-xs text-[#555960] border-t border-[#F2F2F0]">
                <span>{item.serviceCompleted}</span>
                <span className="font-semibold text-[#111214] group-hover:text-[#000] flex items-center gap-1">
                  View <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Notice */}
        <div className="mt-8 text-center text-xs text-[#73777D]">
          Illustrative portfolio showcase representing multi-stage paint correction, ceramic coatings, and mobile detailing standards.
        </div>
      </div>

      {/* WORKING LIGHTBOX MODAL */}
      {activeItem && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-[#111214]/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-[#C9F044] text-white hover:text-[#111214] flex items-center justify-center transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-[#C9F044] text-white hover:text-[#111214] flex items-center justify-center transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-[#C9F044] text-white hover:text-[#111214] flex items-center justify-center transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            className="max-w-4xl w-full bg-[#18191D] rounded-2xl overflow-hidden border border-[#2E3035] shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[65vh] w-full bg-black flex items-center justify-center overflow-hidden">
              <img
                src={activeItem.afterImage}
                alt={activeItem.title}
                className="max-h-[65vh] w-full object-contain"
              />
            </div>

            <div className="p-6 bg-[#16171A] border-t border-[#26282E] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-[#C9F044] uppercase tracking-wider block">
                  {activeItem.vehicle} — {activeItem.serviceCompleted}
                </span>
                <h3 className="font-heading font-bold text-lg sm:text-xl text-white mt-1">
                  {activeItem.title}
                </h3>
                <p className="text-xs text-[#BFC3C8] mt-1 max-w-xl">
                  {activeItem.description}
                </p>
              </div>

              <div className="text-xs font-mono text-[#73777D] shrink-0">
                {lightboxIndex + 1} / {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
