import React from 'react';
import { Star, ShieldCheck, ExternalLink, MessageSquare, CheckCircle } from 'lucide-react';
import { REVIEWS, BUSINESS_INFO } from '../data/content';

export const ReviewsSection: React.FC = () => {
  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#111214] text-white border-b border-[#26282E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-[#C9F044]" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#C9F044] uppercase">
                CUSTOMER EXPERIENCES
              </span>
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white uppercase">
              TRUST BUILT ON<br />GREAT WORK.
            </h2>
          </div>

          {/* Google Profile Integration Card */}
          <div className="bg-[#18191D] border border-[#2E3035] rounded-xl p-4 sm:p-5 max-w-sm">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#C9F044]">
                <ShieldCheck className="w-4 h-4" />
                <span>Google Business Profile Integration</span>
              </div>
              <span className="text-[10px] bg-[#C9F044]/10 text-[#C9F044] px-2 py-0.5 rounded font-mono font-bold">
                CONNECTED
              </span>
            </div>
            <p className="text-xs text-[#BFC3C8] leading-relaxed mb-3">
              We take pride in transparent client relationships. Connect directly to read or submit feedback on our official business profile.
            </p>
            <a
              href={BUSINESS_INFO.googleReviewConfigUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#C9F044] transition-colors"
            >
              <span>View On Google Maps & Leave Review</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#16171A] rounded-2xl p-6 sm:p-7 border border-[#26282E] flex flex-col justify-between hover:border-[#3A3C42] transition-colors"
            >
              <div>
                {/* Rating stars & verified tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9F044] text-[#C9F044]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#73777D] flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-[#C9F044]" />
                    {rev.date}
                  </span>
                </div>

                <p className="text-sm text-[#D1D5DB] leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#26282E]">
                <h4 className="font-heading font-bold text-sm text-white">
                  {rev.author}
                </h4>
                <div className="flex items-center justify-between text-xs text-[#73777D] mt-0.5">
                  <span>{rev.vehicle}</span>
                  <span className="text-[#C9F044] text-[11px] font-mono">{rev.service}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Config Note for client handoff */}
        <div className="mt-8 p-4 rounded-xl bg-[#141518] border border-[#26282E] flex flex-col sm:flex-row items-center justify-between text-xs text-[#73777D] gap-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#BFC3C8]" />
            <span>Google Reviews API ready: Connect your official Google Place ID anytime in <code>src/data/content.ts</code></span>
          </div>
          <span className="text-[#BFC3C8] font-mono">Mobile Ceramic Coatings • +1 813-461-3340</span>
        </div>
      </div>
    </section>
  );
};
