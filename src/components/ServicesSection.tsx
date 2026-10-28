import React, { useState } from 'react';
import { ArrowUpRight, Clock, Sparkles, Shield, ChevronRight } from 'lucide-react';
import { SERVICES } from '../data/content';
import { ServiceItem } from '../types';
import { ServiceModal } from './ServiceModal';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceForBooking }) => {
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const primaryServices = SERVICES.slice(0, 2); // Mobile Car Detailing & Ceramic Coating
  const secondaryServices = SERVICES.slice(2);   // Paint Correction, Interior, Exterior, Maintenance

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#F7F7F5] border-b border-[#E0E2E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#111214]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#73777D] uppercase">
                OUR SERVICES
              </span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#111214] uppercase">
              THE RIGHT CARE FOR<br />YOUR VEHICLE.
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#555960] max-w-md font-normal leading-relaxed">
            Explore detailing and paint protection options designed around your vehicle's needs. All procedures performed on-site with self-contained equipment.
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="space-y-6">
          {/* Top Row: Two Prominent Hero Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {primaryServices.map((service, index) => (
              <div
                key={service.id}
                className={`group relative rounded-2xl overflow-hidden border border-[#DCDEDF] bg-white shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col justify-between ${
                  index === 0 ? 'lg:col-span-7' : 'lg:col-span-5'
                }`}
              >
                {/* Visual Header */}
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#111214]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-[0.92]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-wider text-[#111214]">
                      {service.category === 'protection' ? 'Nanotechnology' : 'Mobile Flagship'}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="text-[10px] font-mono text-[#C9F044] tracking-widest uppercase">
                      SERVICE 0{index + 1}
                    </span>
                    <h3 className="font-heading font-bold text-2xl sm:text-3xl text-white tracking-tight">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-[#555960] leading-relaxed">
                    {service.shortDesc}
                  </p>

                  <div className="pt-2 border-t border-[#F0F0EE] flex items-center justify-between text-xs text-[#73777D]">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#111214]" />
                      <span>{service.duration}</span>
                    </div>
                    <span className="font-semibold text-[#111214]">
                      {service.startingPrice}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="pt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveModalService(service)}
                      className="flex-1 py-2.5 px-4 rounded-lg bg-[#F2F2F0] hover:bg-[#E5E7EB] text-xs font-semibold text-[#111214] text-center transition-colors"
                    >
                      LEARN MORE
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectServiceForBooking(service.id)}
                      className="flex-1 py-2.5 px-4 rounded-lg bg-[#111214] hover:bg-[#202226] text-xs font-heading font-bold uppercase text-[#C9F044] flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>GET A QUOTE</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Row: 4 Specialized Editorial Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {secondaryServices.map((service, index) => (
              <div
                key={service.id}
                className="group rounded-2xl overflow-hidden border border-[#DCDEDF] bg-white shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-44 w-full overflow-hidden bg-[#111214]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-[0.92]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-[10px] font-mono text-[#C9F044] tracking-wider uppercase">
                    SERVICE 0{index + 3}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-heading font-bold text-lg text-[#111214] tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#555960] mt-1.5 leading-relaxed line-clamp-2">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#F0F0EE] flex items-center justify-between text-[11px] text-[#73777D]">
                    <span>{service.duration}</span>
                    <span className="font-semibold text-[#111214]">{service.startingPrice}</span>
                  </div>

                  <div className="pt-1 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalService(service)}
                      className="flex-1 py-2 px-3 rounded-md bg-[#F2F2F0] hover:bg-[#E5E7EB] text-[11px] font-semibold text-[#111214] transition-colors"
                    >
                      Details
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectServiceForBooking(service.id)}
                      className="p-2 rounded-md bg-[#111214] text-[#C9F044] hover:bg-[#202226] transition-colors"
                      title="Request Quote"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Details Modal */}
      <ServiceModal
        service={activeModalService}
        onClose={() => setActiveModalService(null)}
        onBookService={onSelectServiceForBooking}
      />
    </section>
  );
};
