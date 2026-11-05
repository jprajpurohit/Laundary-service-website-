import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Sparkles, 
  ArrowRight,
  Coffee,
  Wine,
  Droplet,
  PenTool
} from 'lucide-react';
import { STAIN_GUIDE_DATA } from '../data/laundryData';

interface StainGuideProps {
  onOpenBookingWithStain: (stainType: string) => void;
}

export const StainGuide: React.FC<StainGuideProps> = ({ onOpenBookingWithStain }) => {
  const [selectedStainId, setSelectedStainId] = useState('coffee');

  const selectedStain = STAIN_GUIDE_DATA.find(s => s.id === selectedStainId) || STAIN_GUIDE_DATA[0];

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Coffee': return <Coffee className="w-5 h-5" />;
      case 'Wine': return <Wine className="w-5 h-5" />;
      case 'Droplet': return <Droplet className="w-5 h-5" />;
      case 'PenTool': return <PenTool className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="stain-guide" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
            First-Aid Fabric Guide
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Stain Emergency? Know What to Do (And What to Avoid)
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            90% of permanent garment stains happen because of incorrect DIY rubbing. Tap your stain below for immediate damage control before sending it to our lab.
          </p>
        </div>

        {/* Stain Selector Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {STAIN_GUIDE_DATA.map((stain) => {
            const isSelected = stain.id === selectedStainId;
            return (
              <button
                key={stain.id}
                type="button"
                onClick={() => setSelectedStainId(stain.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                  isSelected
                    ? 'bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/20 scale-105'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {renderIcon(stain.iconName)}
                <span>{stain.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Stain Card */}
        <div className="mt-8 max-w-4xl mx-auto bg-slate-50 rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center">
                {renderIcon(selectedStain.iconName)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedStain.name} Treatment Protocol</h3>
                <span className="text-xs text-slate-500 font-medium">
                  Urgency Level: <strong className="text-sky-700">{selectedStain.severity}</strong>
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onOpenBookingWithStain(selectedStain.name)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-colors shadow-sm self-start sm:self-auto"
            >
              <span>Book Expert Stain Treatment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dos vs Don'ts Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Immediate DOs */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Immediate DOs at Home</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-900/90 leading-relaxed">
                {selectedStain.quickDos}
              </p>
            </div>

            {/* Critical DON'Ts */}
            <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5">
              <div className="flex items-center gap-2 text-rose-800 font-bold text-sm mb-2">
                <XCircle className="w-4 h-4 text-rose-600" />
                <span>Critical DON'Ts (Avoid Fiber Damage)</span>
              </div>
              <p className="text-xs sm:text-sm text-rose-900/90 leading-relaxed">
                {selectedStain.donts}
              </p>
            </div>

          </div>

          {/* How Our Lab Treats It */}
          <div className="mt-6 bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-1.5">
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>How AuraFresh Lab Restores Your Fabric</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {selectedStain.proTreatment}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
