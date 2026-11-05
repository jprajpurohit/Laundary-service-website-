import React, { useState } from 'react';
import { 
  CalendarClock, 
  Truck, 
  Sparkles, 
  PackageCheck, 
  Check, 
  ArrowRight,
  Shield,
  Layers,
  Repeat
} from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: '01',
      title: 'Schedule in 60 Seconds',
      headline: 'Select your doorstep window',
      description: 'Choose your desired 1-hour collection and delivery slot online. Tell us any fabric preferences—unscented detergent, hang-dry, or delicate silk care.',
      icon: CalendarClock,
      badge: 'Zero prep required',
      highlights: ['No pre-sorting needed', 'Flexible 1-hour windows', 'Contactless pickup available', 'Live courier tracking']
    },
    {
      number: '02',
      title: 'We Collect at Your Door',
      headline: 'Uniformed courier with eco-bags',
      description: 'Our background-checked courier arrives with heavy-duty reusable waterproof bags. We digitally tag your garments on-site with secure individual barcodes.',
      icon: Truck,
      badge: 'Secure barcode tracking',
      highlights: ['Individual bag security seals', 'Digital photo intake log', 'Zero lost item guarantee', 'SMS driver ETA updates']
    },
    {
      number: '03',
      title: 'Gentle Eco-Care & Press',
      headline: 'Ozone water & precision steam',
      description: 'Garments are sorted by light and dark colors and fiber sensitivities. Washed using 100% plant-derived enzymes and finished with artisan hand-pressing on vacuum tables.',
      icon: Sparkles,
      badge: '100% solvent-free',
      highlights: ['Temperature-controlled baths', 'Biodegradable hypoallergenic soap', 'Hand collar & cuff shaping', '3-point quality assurance']
    },
    {
      number: '04',
      title: 'Delivered Crisp & Fresh',
      headline: 'Within 24 hours to your hands',
      description: 'Your clothes are returned immaculate—shirts hung on natural wooden hangers, casuals folded into neat stacks with paired socks, ready to wear.',
      icon: PackageCheck,
      badge: 'Ready for your wardrobe',
      highlights: ['24-hour express standard', 'Wooden recyclable hangers', 'Breathable garment dust covers', 'Pair-matched socks guarantee']
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
            Effortless Laundry Cycle
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            How Fresh Doorstep Laundry Works
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            We turned 4 hours of tedious weekly laundry chores into a 60-second tap on your phone. Here is what happens behind the scenes.
          </p>
        </div>

        {/* Step Indicator Buttons (Interactive) */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = activeStep === idx;
            return (
              <button
                key={s.number}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden ${
                  isCurrent 
                    ? 'bg-sky-50/80 border-sky-400 ring-2 ring-sky-400/20 shadow-md' 
                    : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold font-mono tracking-wider ${
                    isCurrent ? 'text-sky-600' : 'text-slate-400'
                  }`}>
                    STEP {s.number}
                  </span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isCurrent ? 'bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <p className={`mt-3 text-sm sm:text-base font-bold ${
                  isCurrent ? 'text-slate-900' : 'text-slate-700'
                }`}>
                  {s.title}
                </p>

                {isCurrent && (
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-semibold text-sky-700">
                    <span>Active Preview</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Featured Active Step Detail Card */}
        <div className="mt-8 bg-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-xl overflow-hidden relative">
          {/* Ambient lighting orb inside dark card */}
          <div 
            className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold tracking-widest uppercase text-sky-400">
                  Detailed Workflow · Step {steps[activeStep].number}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">
                  {steps[activeStep].badge}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {steps[activeStep].headline}
              </h3>

              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                {steps[activeStep].description}
              </p>

              {/* Step Highlights */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {steps[activeStep].highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-slate-200">
                    <div className="w-4 h-4 rounded-full bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-sky-500 hover:bg-sky-400 rounded-xl shadow-lg shadow-sky-500/25 transition-colors inline-flex items-center gap-2"
                >
                  <span>Experience This Service</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span>Backed by our 100% Happiness Guarantee</span>
                </div>
              </div>
            </div>

            {/* Right side interactive graphic display */}
            <div className="lg:col-span-5 bg-slate-800/80 rounded-2xl p-6 border border-slate-700/60 backdrop-blur-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-700 text-xs text-slate-400">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-sky-400" /> Quality Control Specs
                </span>
                <span className="font-mono text-emerald-400">PASSED 100%</span>
              </div>

              <div className="mt-4 space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-700/50">
                  <span className="text-slate-400">Average Turnaround</span>
                  <span className="text-white font-bold tabular-nums">22.4 Hours</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-700/50">
                  <span className="text-slate-400">Water Sanitization</span>
                  <span className="text-white font-medium">Activated O3 Aqueous Ozone</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-700/50">
                  <span className="text-slate-400">Detergent Base</span>
                  <span className="text-white font-medium">Plant Glucosides (Zero Phosphates)</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-700/50">
                  <span className="text-slate-400">Packaging</span>
                  <span className="text-white font-medium">100% Recyclable Paper & Poly</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Driver Courier Fleet</span>
                  <span className="text-white font-medium">100% Low-Emission Hybrid/EV</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700 text-[11px] text-slate-400 flex items-center gap-1.5">
                <Repeat className="w-3.5 h-3.5 text-sky-400" />
                <span>Repeat weekly schedules available with 10% discount</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
