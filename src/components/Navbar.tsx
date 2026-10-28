import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { BUSINESS_INFO } from '../data/content';

interface NavbarProps {
  onBookClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'SERVICES', href: '#services' },
    { name: 'OUR PROCESS', href: '#process' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'REVIEWS', href: '#reviews' },
    { name: 'ABOUT', href: '#about' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#111214]/95 backdrop-blur-md py-3 text-white shadow-lg border-b border-[#26282E]'
          : 'bg-[#F7F7F5]/90 backdrop-blur-sm py-4 sm:py-5 text-[#151515]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Typographic Logo */}
        <a
          href="#home"
          className="flex items-center gap-2 group tracking-tighter"
        >
          <div className="w-8 h-8 rounded-md bg-[#111214] flex items-center justify-center text-[#C9F044] border border-[#26282E] group-hover:scale-105 transition-transform">
            <span className="font-heading font-bold text-sm tracking-widest">MC</span>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-sm sm:text-base tracking-widest uppercase">
              Mobile Ceramic
            </span>
            <span className={`text-[10px] tracking-[0.22em] font-semibold uppercase ${
              isScrolled ? 'text-[#C9F044]' : 'text-[#73777D]'
            }`}>
              Coatings
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-xs font-semibold tracking-wider transition-colors hover:text-[#C9F044] ${
                isScrolled ? 'text-[#BFC3C8]' : 'text-[#444850]'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA & Phone Action */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={BUSINESS_INFO.callHref}
            className={`flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors ${
              isScrolled
                ? 'text-[#C9F044] hover:bg-white/5'
                : 'text-[#111214] hover:bg-black/5'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{BUSINESS_INFO.phone}</span>
          </a>

          <button
            type="button"
            onClick={onBookClick}
            className="flex items-center gap-1.5 bg-[#C9F044] text-[#111214] hover:bg-[#d8fa5a] font-heading font-bold text-xs uppercase px-4 py-2.5 rounded-md shadow-xs transition-all hover:translate-y-[-1px] active:translate-y-[0px]"
          >
            <span>BOOK NOW</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={BUSINESS_INFO.callHref}
            aria-label="Call Mobile Ceramic Coatings"
            className="p-2 rounded-md bg-[#C9F044] text-[#111214]"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            type="button"
            aria-label="Toggle mobile menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-md ${
              isScrolled ? 'text-white' : 'text-[#111214]'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#111214] border-b border-[#26282E] text-white px-6 py-6 shadow-2xl transition-all">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold tracking-wider text-[#BFC3C8] hover:text-[#C9F044] py-1 border-b border-[#1A1B1D]"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-3">
              <a
                href={BUSINESS_INFO.callHref}
                className="flex items-center justify-center gap-2 py-3 bg-[#1A1B1D] text-[#C9F044] font-semibold text-sm rounded-lg border border-[#2E3035]"
              >
                <Phone className="w-4 h-4" />
                <span>Call {BUSINESS_INFO.phone}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#C9F044] text-[#111214] font-bold text-sm uppercase rounded-lg shadow-sm"
              >
                <span>BOOK YOUR DETAIL NOW</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
