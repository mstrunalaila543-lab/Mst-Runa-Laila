/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { HighlightStrip } from './components/HighlightStrip';
import { CinematicDarkSection } from './components/CinematicDarkSection';
import { ServicesSection } from './components/ServicesSection';
import { PaintProtectionExperience } from './components/PaintProtectionExperience';
import { ProcessSection } from './components/ProcessSection';
import { GallerySection } from './components/GallerySection';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSection } from './components/AboutSection';
import { BookingSection } from './components/BookingSection';
import { FinalCtaBanner } from './components/FinalCtaBanner';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState<string>('ceramic-coating');

  const scrollToBooking = (serviceId?: string) => {
    if (serviceId) {
      setSelectedServiceForBooking(serviceId);
    }
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] text-[#151515] flex flex-col font-sans selection:bg-[#C9F044] selection:text-[#111214]">
      {/* 1. Navigation Bar */}
      <Navbar onBookClick={() => scrollToBooking()} />

      <main className="flex-1">
        {/* 2. Immersive 3D Hero Studio Experience */}
        <HeroSection
          onBookClick={() => scrollToBooking()}
          onExploreClick={scrollToServices}
        />

        {/* 3. Trust & Service Highlight Strip */}
        <HighlightStrip />

        {/* 4. Dark Cinematic Design Section */}
        <CinematicDarkSection onExploreServices={scrollToServices} />

        {/* 5. Editorial Services Section with Interactive Detail Drawers */}
        <ServicesSection
          onSelectServiceForBooking={(serviceId) => scrollToBooking(serviceId)}
        />

        {/* 6. Interactive Paint Protection & Ceramic Comparison */}
        <PaintProtectionExperience />

        {/* 7. Our Process Section */}
        <ProcessSection onStartBooking={() => scrollToBooking()} />

        {/* 8. Before-and-After Gallery with Lightbox */}
        <GallerySection />

        {/* 9. Reviews & Trust with Google Business Integration */}
        <ReviewsSection />

        {/* 10. About the Mobile Business */}
        <AboutSection onBookClick={() => scrollToBooking()} />

        {/* 11. Booking & Quote Request Section */}
        <BookingSection preselectedServiceId={selectedServiceForBooking} />

        {/* 12. Final Call-to-Action Banner */}
        <FinalCtaBanner onBookClick={() => scrollToBooking()} />
      </main>

      {/* 13. Comprehensive Footer */}
      <Footer />
    </div>
  );
}
