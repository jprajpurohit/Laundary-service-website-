import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  ShieldCheck, 
  Truck, 
  Calendar, 
  CheckCircle2, 
  Leaf, 
  Calculator,
  Play
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: (prefillService?: string) => void;
  onScrollToPricing: () => void;
  onScrollToHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onOpenBooking, 
  onScrollToPricing,
  onScrollToHowItWorks
}) => {
  const [selectedService, setSelectedService] = useState('wash-fold');
  const [selectedDay, setSelectedDay] = useState('Today');
  const [selectedSlot, setSelectedSlot] = useState('Morning (8:00 AM - 11:00 AM)');

  const handleQuickBook = (e: React.FormEvent) => {
    e.preventDefault();
    onOpenBooking(selectedService);
  };

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-gradient-to-b from-sky-50/60 via-white to-slate-50">
      {/* Background subtle ambient orbs */}
      <div 
        className="absolute top-12 left-1/4 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-48 right-10 w-80 h-80 bg-cyan-200/25 rounded-full blur-3xl pointer-events-none -z-10 animate-float-reverse" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Headline, value prop & quick book */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Clean unboxed top kicker with subtle dot separator */}
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-700 mb-4 bg-sky-100/70 px-3 py-1 rounded-lg">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
              <span>Doorstep Pickup & Delivery</span>
              <span aria-hidden="true">·</span>
              <span>24h Turnaround Guaranteed</span>
            </div>

            {/* Signature Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15] text-balance">
              Revitalize Your Clothes with Expert{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-500">
                Laundry Services!
              </span>
            </h1>

            {/* Elevated Body Copy */}
            <p className="mt-4 sm:mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              From premium solvent-free dry cleaning to swift wash and fold, we deliver care, crisp freshness, and convenience. Schedule a doorstep pickup in 60 seconds and rediscover that just-bought feel.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-base font-semibold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-xl shadow-lg shadow-sky-600/20 hover:shadow-sky-600/30 transition-all duration-200"
              >
                <span>Book a service today!</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={onScrollToPricing}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-200 rounded-xl transition-colors"
              >
                <Calculator className="w-4 h-4 text-sky-600" />
                <span>Estimate Price</span>
              </button>

              <button
                type="button"
                onClick={onScrollToHowItWorks}
                className="hidden md:inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-sky-600 px-3 py-2 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current text-sky-500" />
                <span>How it works</span>
              </button>
            </div>

            {/* Quick Pickup Selector Box */}
            <form 
              onSubmit={handleQuickBook}
              className="mt-8 w-full bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-sky-600" /> Quick Pickup Scheduler
                </span>
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Same-day slots open
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Service selector */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Select Service
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="wash-fold">Daily Wash & Fold</option>
                    <option value="dry-cleaning">Eco-Dry Cleaning</option>
                    <option value="steam-press">Steam Press & Ironing</option>
                    <option value="bedding-linens">Duvet & Bedding Spa</option>
                  </select>
                </div>

                {/* Day selector */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Pickup Day
                  </label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Today">Today (Next 2 Hours)</option>
                    <option value="Tomorrow">Tomorrow Morning</option>
                    <option value="Friday">Friday Weekend Prep</option>
                  </select>
                </div>

                {/* Time slot */}
                <div>
                  <label className="block text-xs font-medium text-slate-500 mb-1">
                    Time Window
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="w-full text-xs sm:text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    <option value="Morning (8:00 AM - 11:00 AM)">Morning (8:00 - 11:00 AM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 - 4:00 PM)</option>
                    <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 - 8:00 PM)</option>
                  </select>
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-sky-500" /> Free collection
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Garment protection
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  Confirm Window & Book
                </button>
              </div>
            </form>

          </div>

          {/* Right Column: Hero Visual & Floating Feature Badges */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none">
              
              {/* Outer decorative glow frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/80 bg-slate-100 aspect-[4/3] sm:aspect-[16/11]">
                <img
                  src="/src/assets/images/hero_laundry_studio_1793869084305.jpg"
                  alt="Modern Scandinavian laundry and dry cleaning facility with crisp fresh garments"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Subtle scrim overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-900/60 via-slate-900/20 to-transparent pointer-events-none" />
                
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium flex items-center justify-between">
                  <span className="flex items-center gap-1.5 drop-shadow">
                    <Leaf className="w-4 h-4 text-emerald-400" /> Certified Eco-Enzyme Wash Facility
                  </span>
                  <span className="text-white/80 drop-shadow">
                    Clean Air Sanitized
                  </span>
                </div>
              </div>

              {/* Floating Badge 1: 24h Express Delivery */}
              <div className="absolute -top-4 -left-4 sm:-top-5 sm:-left-6 bg-white/95 backdrop-blur-md px-3.5 py-2.5 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float-slow">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">24-Hour Turnaround</p>
                  <p className="text-[11px] text-slate-500 font-medium">Standard & express options</p>
                </div>
              </div>

              {/* Floating Badge 2: 99.8% Stain Removal Guarantee */}
              <div className="absolute -bottom-5 -right-4 sm:-bottom-6 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-float-reverse">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">100% Care Guarantee</p>
                  <p className="text-[11px] text-slate-500 font-medium">Zero shrinkage · Color safe</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Adjacency Proof & Trust Strip */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">48,000+</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Garments Revitalized</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">24 hrs</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Guaranteed Delivery</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums">4.9 / 5.0</p>
            <p className="text-xs text-slate-500 font-medium mt-1">Customer Satisfaction</p>
          </div>
          <div>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-600 flex items-center gap-1">
              <Leaf className="w-6 h-6 inline-block" /> 100%
            </p>
            <p className="text-xs text-slate-500 font-medium mt-1">Non-Toxic Biodegradable</p>
          </div>
        </div>

      </div>
    </section>
  );
};
