import React from 'react';
import { X, CheckCircle2, Clock, Phone, ArrowRight, Shield } from 'lucide-react';
import { ServiceItem } from '../types';
import { BUSINESS_INFO } from '../data/content';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onBookService }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#111214]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#E0E2E6] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#111214]">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover filter brightness-[0.9]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white hover:bg-[#C9F044] hover:text-[#111214] flex items-center justify-center transition-colors shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title on image */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="inline-block text-[10px] font-mono tracking-widest text-[#C9F044] uppercase mb-1">
              {service.category.toUpperCase()} PACKAGE
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 py-2 border-b border-[#E5E7EB] text-xs text-[#555960]">
            <div className="flex items-center gap-1.5 font-semibold text-[#111214]">
              <Clock className="w-4 h-4 text-[#73777D]" />
              <span>Duration: {service.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 font-semibold text-[#111214]">
              <Shield className="w-4 h-4 text-[#73777D]" />
              <span>Investment: {service.startingPrice}</span>
            </div>
          </div>

          <p className="text-sm text-[#444850] leading-relaxed">
            {service.fullDesc}
          </p>

          {/* Features list */}
          <div>
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#111214] mb-3">
              Included In This Service
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feat) => (
                <div key={feat} className="flex items-start gap-2 text-xs text-[#555960]">
                  <CheckCircle2 className="w-4 h-4 text-[#111214] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended For */}
          <div className="p-3.5 bg-[#F7F7F5] rounded-xl border border-[#E5E7EB] text-xs text-[#555960]">
            <strong className="text-[#111214] block mb-0.5 font-semibold">Recommended Application:</strong>
            {service.recommendedFor}
          </div>

          {/* Modal Action Footer */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#E5E7EB]">
            <a
              href={BUSINESS_INFO.callHref}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-[#D0D4DA] text-xs font-semibold text-[#111214] hover:bg-[#F2F2F0] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call +1 813-461-3340</span>
            </a>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBookService(service.id);
              }}
              className="flex items-center justify-center gap-2 py-3 px-6 rounded-lg bg-[#111214] text-[#C9F044] hover:bg-[#202226] text-xs font-heading font-bold uppercase tracking-wider transition-all shadow-md"
            >
              <span>Request Quote For This Service</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
