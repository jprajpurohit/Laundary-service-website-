import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, Mail } from 'lucide-react';
import { FAQ_DATA } from '../data/laundryData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
            Got Questions?
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Everything you need to know about doorstep pickup, detergents, delivery times, and garment protection.
          </p>
        </div>

        {/* Accordions */}
        <div className="mt-12 space-y-3">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-sky-300 bg-sky-50/30 shadow-xs' 
                    : 'border-slate-200/90 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {item.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-sky-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-sky-100/60 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 sm:p-8 bg-slate-50 rounded-3xl border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-base">Have a bespoke garment question?</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Speak directly with our senior fabric master before scheduling your pickup.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:18005553737"
              className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors inline-flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5 text-sky-600" />
              <span>(800) 555-FRESH</span>
            </a>
            <a
              href="mailto:care@aurafreshlaundry.com"
              className="px-4 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email Support</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
