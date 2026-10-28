import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Clock, Car, MapPin, Mail, User, CheckCircle2, AlertCircle, ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES, BUSINESS_INFO } from '../data/content';
import { BookingFormData } from '../types';

interface BookingSectionProps {
  preselectedServiceId?: string;
}

export const BookingSection: React.FC<BookingSectionProps> = ({ preselectedServiceId }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    vehicleYear: '',
    vehicleMake: '',
    vehicleModel: '',
    serviceId: preselectedServiceId || 'ceramic-coating',
    preferredDate: '',
    preferredTime: 'Morning (8:30 AM – 12:00 PM)',
    fullName: '',
    phone: '',
    email: '',
    locationAddress: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
    }
  }, [preselectedServiceId]);

  const validate = () => {
    const errs: Partial<Record<keyof BookingFormData, string>> = {};
    if (!formData.vehicleMake.trim()) errs.vehicleMake = 'Vehicle make is required (e.g. Porsche, BMW)';
    if (!formData.vehicleModel.trim()) errs.vehicleModel = 'Vehicle model is required (e.g. 911, M4)';
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required for appointment scheduling';
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please provide a valid 10-digit phone number';
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate real form dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const selectedService = SERVICES.find((s) => s.id === formData.serviceId) || SERVICES[0];

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#111214] text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute -top-32 right-0 w-[500px] h-[500px] bg-[#C9F044]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[2px] bg-[#C9F044]" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#C9F044] uppercase">
              LET'S CARE FOR YOUR VEHICLE
            </span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase">
            READY FOR A<br />BETTER FINISH?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#BFC3C8] leading-relaxed">
            Tell us about your vehicle and what you would like to improve. Get in touch to discuss available services and request an appointment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Direct Phone & Business Credentials (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#18191D] rounded-2xl p-6 sm:p-7 border border-[#2E3035]">
              <span className="text-[11px] font-mono text-[#73777D] uppercase tracking-wider block mb-1">
                DIRECT INQUIRY & DISPATCH
              </span>
              <h3 className="font-heading font-black text-2xl text-white">
                Mobile Ceramic Coatings
              </h3>

              <div className="mt-6 p-4 rounded-xl bg-[#111214] border border-[#2E3035]">
                <div className="text-xs text-[#73777D] font-medium mb-1">
                  CALL DIRECTLY:
                </div>
                <a
                  href={BUSINESS_INFO.callHref}
                  className="font-heading font-bold text-xl sm:text-2xl text-[#C9F044] hover:underline flex items-center gap-2"
                >
                  <Phone className="w-5 h-5 text-[#C9F044]" />
                  <span>{BUSINESS_INFO.phone}</span>
                </a>
              </div>

              <div className="mt-6 space-y-4 text-xs text-[#BFC3C8]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C9F044] shrink-0 mt-0.5" />
                  <span>{BUSINESS_INFO.serviceArea}</span>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C9F044] shrink-0 mt-0.5" />
                  <span>{BUSINESS_INFO.operatingHours}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-[#26282E]">
                <a
                  href={BUSINESS_INFO.callHref}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#C9F044] text-[#111214] hover:bg-[#d8fa5a] font-heading font-bold text-xs uppercase tracking-wider transition-all shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  <span>CLICK TO CALL NOW</span>
                </a>
              </div>
            </div>

            {/* Selected Service Quick Info Card */}
            <div className="bg-[#16171A] rounded-2xl p-6 border border-[#26282E] hidden sm:block">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C9F044] uppercase mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Selected Service Focus</span>
              </div>
              <h4 className="font-heading font-bold text-lg text-white">
                {selectedService.title}
              </h4>
              <p className="text-xs text-[#73777D] mt-1 leading-relaxed">
                {selectedService.shortDesc}
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-[#BFC3C8] pt-3 border-t border-[#26282E]">
                <span>Typical Duration: {selectedService.duration}</span>
                <span className="font-semibold text-white">{selectedService.startingPrice}</span>
              </div>
            </div>
          </div>

          {/* Booking & Quote Request Form (8 cols) */}
          <div className="lg:col-span-8">
            <div className="bg-[#18191D] rounded-2xl p-6 sm:p-8 border border-[#2E3035] shadow-2xl">
              {isSubmitted ? (
                <div className="py-12 px-4 text-center space-y-4 animate-in fade-in duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#C9F044]/10 text-[#C9F044] flex items-center justify-center mx-auto border border-[#C9F044]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                    INQUIRY RECEIVED
                  </h3>
                  <p className="text-sm text-[#BFC3C8] max-w-lg mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.fullName}</strong>. We have received your preliminary quote request for your <strong className="text-white">{formData.vehicleYear} {formData.vehicleMake} {formData.vehicleModel}</strong>.
                  </p>
                  <div className="p-4 rounded-xl bg-[#141518] border border-[#2E3035] max-w-md mx-auto text-xs text-[#73777D] text-left space-y-1">
                    <p>• <strong>Status:</strong> Pending Specialist Review</p>
                    <p>• <strong>Service:</strong> {selectedService.title}</p>
                    <p>• <strong>Preferred Window:</strong> {formData.preferredDate || 'Earliest Available'} ({formData.preferredTime})</p>
                    <p>• <strong>Contact:</strong> {formData.phone}</p>
                  </div>
                  <p className="text-xs text-[#73777D] max-w-md mx-auto pt-2">
                    Our detailing specialist will contact you directly to confirm availability, site logistics, and finalize your tailored service quote.
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={BUSINESS_INFO.callHref}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#C9F044] text-[#111214] font-heading font-bold text-xs uppercase"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Call Now: +1 813-461-3340</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="px-5 py-2.5 rounded-lg bg-[#2A2B30] text-white hover:bg-[#35373E] text-xs font-semibold"
                    >
                      Submit Another Vehicle
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-heading font-bold text-xl text-white mb-1">
                      Request Vehicle Quote & Scheduling
                    </h3>
                    <p className="text-xs text-[#73777D]">
                      Complete the vehicle details below. No upfront payment required.
                    </p>
                  </div>

                  {/* 1. Service Selection Pills */}
                  <div>
                    <label className="block text-xs font-mono text-[#BFC3C8] uppercase tracking-wider mb-2">
                      1. Select Requested Service *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SERVICES.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, serviceId: s.id })}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            formData.serviceId === s.id
                              ? 'bg-[#111214] border-[#C9F044] text-white shadow-sm ring-1 ring-[#C9F044]'
                              : 'bg-[#141518] border-[#2E3035] text-[#73777D] hover:text-white hover:border-[#3E4249]'
                          }`}
                        >
                          <div className="font-heading font-bold text-xs text-white">
                            {s.title}
                          </div>
                          <div className="text-[10px] text-[#73777D] mt-0.5">
                            {s.duration}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 2. Vehicle Details */}
                  <div>
                    <label className="block text-xs font-mono text-[#BFC3C8] uppercase tracking-wider mb-2">
                      2. Vehicle Information *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Year (e.g. 2024)"
                          value={formData.vehicleYear}
                          onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#141518] border border-[#2E3035] text-white placeholder-[#555960] text-xs focus:outline-none focus:border-[#C9F044]"
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Make (e.g. Porsche) *"
                          value={formData.vehicleMake}
                          onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-[#141518] border text-white placeholder-[#555960] text-xs focus:outline-none ${
                            errors.vehicleMake ? 'border-red-500' : 'border-[#2E3035] focus:border-[#C9F044]'
                          }`}
                        />
                        {errors.vehicleMake && (
                          <span className="text-[10px] text-red-400 mt-1 block">{errors.vehicleMake}</span>
                        )}
                      </div>
                      <div>
                        <input
                          type="text"
                          placeholder="Model (e.g. 911 GT3) *"
                          value={formData.vehicleModel}
                          onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-[#141518] border text-white placeholder-[#555960] text-xs focus:outline-none ${
                            errors.vehicleModel ? 'border-red-500' : 'border-[#2E3035] focus:border-[#C9F044]'
                          }`}
                        />
                        {errors.vehicleModel && (
                          <span className="text-[10px] text-red-400 mt-1 block">{errors.vehicleModel}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 3. Date & Time Window */}
                  <div>
                    <label className="block text-xs font-mono text-[#BFC3C8] uppercase tracking-wider mb-2">
                      3. Preferred Date & Window
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="date"
                          value={formData.preferredDate}
                          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#141518] border border-[#2E3035] text-white text-xs focus:outline-none focus:border-[#C9F044]"
                        />
                      </div>
                      <div>
                        <select
                          value={formData.preferredTime}
                          onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#141518] border border-[#2E3035] text-white text-xs focus:outline-none focus:border-[#C9F044]"
                        >
                          <option>Morning (8:30 AM – 12:00 PM)</option>
                          <option>Afternoon (1:00 PM – 4:30 PM)</option>
                          <option>Flexible / Any Available Window</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* 4. Customer Contact Details */}
                  <div>
                    <label className="block text-xs font-mono text-[#BFC3C8] uppercase tracking-wider mb-2">
                      4. Your Contact Details *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          placeholder="Full Name *"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-[#141518] border text-white placeholder-[#555960] text-xs focus:outline-none ${
                            errors.fullName ? 'border-red-500' : 'border-[#2E3035] focus:border-[#C9F044]'
                          }`}
                        />
                        {errors.fullName && (
                          <span className="text-[10px] text-red-400 mt-1 block">{errors.fullName}</span>
                        )}
                      </div>

                      <div>
                        <input
                          type="tel"
                          placeholder="Phone Number (e.g. 813-461-3340) *"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-[#141518] border text-white placeholder-[#555960] text-xs focus:outline-none ${
                            errors.phone ? 'border-red-500' : 'border-[#2E3035] focus:border-[#C9F044]'
                          }`}
                        />
                        {errors.phone && (
                          <span className="text-[10px] text-red-400 mt-1 block">{errors.phone}</span>
                        )}
                      </div>

                      <div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`w-full px-3.5 py-2.5 rounded-lg bg-[#141518] border text-white placeholder-[#555960] text-xs focus:outline-none ${
                            errors.email ? 'border-red-500' : 'border-[#2E3035] focus:border-[#C9F044]'
                          }`}
                        />
                        {errors.email && (
                          <span className="text-[10px] text-red-400 mt-1 block">{errors.email}</span>
                        )}
                      </div>

                      <div>
                        <input
                          type="text"
                          placeholder="Service Location / City / Neighborhood"
                          value={formData.locationAddress}
                          onChange={(e) => setFormData({ ...formData, locationAddress: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-lg bg-[#141518] border border-[#2E3035] text-white placeholder-[#555960] text-xs focus:outline-none focus:border-[#C9F044]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 5. Additional Notes */}
                  <div>
                    <label className="block text-xs font-mono text-[#BFC3C8] uppercase tracking-wider mb-2">
                      5. Specific Requests or Paint Condition Notes
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Swirls visible under sunlight, previous dealership wash scratches, water spotting on hood, or specific focus areas..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141518] border border-[#2E3035] text-white placeholder-[#555960] text-xs focus:outline-none focus:border-[#C9F044]"
                    />
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 rounded-xl bg-[#C9F044] hover:bg-[#d4fa50] text-[#111214] font-heading font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl active:scale-[0.99] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>PROCESSING REQUEST...</span>
                      ) : (
                        <>
                          <span>SUBMIT APPOINTMENT REQUEST</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-[#73777D] text-center mt-2">
                      We never share your information. No credit card required to submit inquiry.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
