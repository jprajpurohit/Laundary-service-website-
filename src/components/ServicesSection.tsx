import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  Info, 
  ShieldCheck, 
  Clock, 
  Tag
} from 'lucide-react';
import { LAUNDRY_SERVICES } from '../data/laundryData';
import { LaundryServiceDetail } from '../types';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
  onOpenPricing: (category: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  onOpenPricing
}) => {
  const [activeModalService, setActiveModalService] = useState<LaundryServiceDetail | null>(null);

  return (
    <section id="services" className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
            Tailored Fabric & Garment Care
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Every Garment Deserves Customized Attention
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            From daily cottons to bespoke Italian wool suits and delicate silk gowns, each piece is sorted, treated with fabric-specific enzymes, and finished to perfection.
          </p>
        </div>

        {/* Services Grid (2x2 on desktop, 1-col on mobile) */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {LAUNDRY_SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-300 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image & Price header */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                {/* Starting price chip */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-white text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-sky-600" />
                  <span>From {service.startingPrice}</span>
                </div>

                {/* Title inside card media */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-bold tracking-wider uppercase text-sky-300">
                    Service 0{index + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white drop-shadow-sm">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {service.shortDesc}
                  </p>

                  {/* Bullet features */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Best for bar */}
                  <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-600">
                    <span className="font-semibold text-slate-900">Recommended for: </span>
                    <span>{service.bestFor}</span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModalService(service)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-sky-600 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>View Care Details</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenPricing(service.id)}
                      className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                    >
                      Price List
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => onSelectServiceForBooking(service.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg shadow-sm transition-colors"
                    >
                      <span>Book Service</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveModalService(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden relative animate-float-slow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Garment Care Protocol</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">{activeModalService.title}</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setActiveModalService(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="mt-4 text-sm text-slate-600 leading-relaxed">
              {activeModalService.longDesc}
            </p>

            <div className="mt-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <Clock className="w-4 h-4 text-sky-600" />
                <span className="font-semibold">Turnaround: </span> Standard 24 Hours (Express 12 Hours on request)
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold">Guarantee: </span> 100% Zero Color Bleed & Scent-Free Option
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                <span className="font-semibold">Solvent: </span> Liquid silicone & pure ozone water wash
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveModalService(null)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const id = activeModalService.id;
                  setActiveModalService(null);
                  onSelectServiceForBooking(id);
                }}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-md transition-colors"
              >
                Schedule This Service
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
