import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  PhoneCall, 
  Calendar, 
  Package, 
  User, 
  ChevronRight,
  ShieldCheck,
  Clock
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenTracker: (orderId?: string) => void;
  onOpenAccount: () => void;
  activeOrderCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenBooking, 
  onOpenTracker, 
  onOpenAccount,
  activeOrderCount = 1 
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Stain Guide', href: '#stain-guide' },
    { label: 'Track Order', href: '#track', isTracker: true },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3' 
            : 'bg-white/70 backdrop-blur-sm border-b border-slate-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Zone 1: Brand Wordmark */}
            <a 
              href="#" 
              className="flex items-center gap-2.5 text-slate-900 group whitespace-nowrap shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-600 to-cyan-500 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 leading-none">
                  Aura<span className="text-sky-600">Fresh</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">
                  Laundry & Dry Care
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.isTracker) {
                      e.preventDefault();
                      onOpenTracker();
                    }
                  }}
                  className="hover:text-sky-600 transition-colors whitespace-nowrap shrink-0 relative py-1 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-sky-600 transition-all duration-200 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* Zone 3: Actions & Mobile Toggle */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Active Order Pill / Account */}
              <button
                type="button"
                onClick={onOpenAccount}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50/80 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors"
                title="View user account and active orders"
              >
                <div className="relative">
                  <User className="w-4 h-4 text-slate-600" />
                  {activeOrderCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-sky-500 ring-2 ring-white" />
                  )}
                </div>
                <span className="font-semibold text-slate-900">J. Prajpurohit</span>
                {activeOrderCount > 0 && (
                  <span className="bg-sky-100 text-sky-700 px-1.5 py-0.5 rounded text-[11px] font-semibold">
                    1 Active
                  </span>
                )}
              </button>

              {/* Primary CTA */}
              <button
                type="button"
                onClick={onOpenBooking}
                className="flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-xl shadow-sm hover:shadow-md hover:shadow-sky-500/20 transition-all duration-200 whitespace-nowrap shrink-0"
              >
                <Calendar className="w-4 h-4" />
                <span>Book a Service</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 lg:hidden bg-slate-900/40 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl p-6 flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header inside drawer */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-600 flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-slate-900">AuraFresh Laundry</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* User Account Quick Tile */}
              <div 
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAccount();
                }}
                className="mt-4 p-3 bg-sky-50/80 rounded-xl border border-sky-100 flex items-center justify-between cursor-pointer hover:bg-sky-100/60 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-sm">
                    JP
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-900">J. Prajpurohit</p>
                    <p className="text-[11px] text-sky-700 font-medium">1 order currently in wash</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-sky-600" />
              </div>

              {/* Navigation Links */}
              <div className="mt-6 flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (link.isTracker) {
                        e.preventDefault();
                        onOpenTracker();
                      }
                    }}
                    className="flex items-center justify-between px-3 py-2.5 text-sm font-medium text-slate-700 hover:text-sky-600 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    <span>{link.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </a>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenTracker('LND-8492');
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-medium text-sky-700 bg-sky-50 border border-sky-200 rounded-xl hover:bg-sky-100 transition-colors"
                >
                  <Package className="w-4 h-4" />
                  <span>Track Active Order (#LND-8492)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-sm transition-colors"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Doorstep Pickup</span>
                </button>
              </div>
            </div>

            {/* Bottom Support Info */}
            <div className="pt-6 border-t border-slate-100">
              <a 
                href="tel:18005553737" 
                className="flex items-center gap-2 text-xs font-medium text-slate-600 hover:text-sky-600"
              >
                <PhoneCall className="w-4 h-4 text-sky-600" />
                <span>Need help? Call (800) 555-FRESH</span>
              </a>
              <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Eco-Safe
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-sky-500" /> 24h Turnaround
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
