import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Leaf, 
  Heart,
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking, onOpenTracker }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-sky-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Aura<span className="text-sky-400">Fresh</span> Laundry
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Revitalizing clothes with expert laundry and solvent-free eco dry cleaning. Doorstep collection, transparent pricing, and 24-hour turnaround guaranteed.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" /> 100% Plant Enzymes
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Insured Care
              </span>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Garment Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors">Daily Wash & Fold</a>
              </li>
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors">Eco-Dry Cleaning</a>
              </li>
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors">Steam Press & Ironing</a>
              </li>
              <li>
                <a href="#services" className="hover:text-sky-400 transition-colors">Duvet & Bedding Spa</a>
              </li>
              <li>
                <a href="#stain-guide" className="hover:text-sky-400 transition-colors">Emergency Stain Lab</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-sky-400 transition-colors">Flat-Rate Price Sheet</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Portals */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Customer Hub
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button 
                  type="button" 
                  onClick={onOpenTracker} 
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  Live Order Tracker
                </button>
              </li>
              <li>
                <button 
                  type="button" 
                  onClick={onOpenBooking} 
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  Schedule a Pickup
                </button>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-sky-400 transition-colors">How Pickup Works</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-sky-400 transition-colors">Verified Customer Reviews</a>
              </li>
              <li>
                <a href="#stain-guide" className="hover:text-sky-400 transition-colors">Fabric Care Encyclopedia</a>
              </li>
            </ul>
          </div>

          {/* Col 5: Operating Hours & Direct Dispatch */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Courier Dispatch Hours
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>Mon – Sat: 7:00 AM – 9:00 PM</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>Sunday: 8:00 AM – 6:00 PM</span>
              </p>
              <p className="flex items-start gap-2 mt-3">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Hotline: (800) 555-3737</span>
              </p>
              <p className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>care@aurafreshlaundry.com</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <span>© {new Date().getFullYear()} AuraFresh Laundry Co.</span>
            <span>·</span>
            <span>Crafted for <strong className="text-slate-300 font-semibold">jprajpurohit</strong></span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[11px] text-slate-400">Free pickup over $30</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
