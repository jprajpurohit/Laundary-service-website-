import React, { useState } from 'react';
import { 
  Search, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  FileText, 
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { DEMO_ORDERS } from '../data/laundryData';
import { OrderRecord, OrderStatusStep } from '../types';

interface OrderTrackerProps {
  initialOrderId?: string;
  onOpenBooking: () => void;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ 
  initialOrderId = 'LND-8492',
  onOpenBooking 
}) => {
  const [searchInput, setSearchInput] = useState(initialOrderId);
  const [currentOrder, setCurrentOrder] = useState<OrderRecord | null>(
    DEMO_ORDERS[initialOrderId] || DEMO_ORDERS['LND-8492']
  );
  const [notFoundError, setNotFoundError] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchInput.trim().toUpperCase();
    if (DEMO_ORDERS[query]) {
      setCurrentOrder(DEMO_ORDERS[query]);
      setNotFoundError(false);
    } else {
      setNotFoundError(true);
    }
  };

  const handleSelectDemo = (id: string) => {
    setSearchInput(id);
    setCurrentOrder(DEMO_ORDERS[id]);
    setNotFoundError(false);
  };

  const getStepStatus = (stepName: OrderStatusStep, currentStatus: OrderStatusStep) => {
    const sequence: OrderStatusStep[] = [
      'placed',
      'picked_up',
      'inspecting',
      'washing',
      'pressing',
      'out_for_delivery',
      'delivered'
    ];
    const currentIndex = sequence.indexOf(currentStatus);
    const targetIndex = sequence.indexOf(stepName);

    if (targetIndex < currentIndex) return 'completed';
    if (targetIndex === currentIndex) return 'current';
    return 'pending';
  };

  return (
    <section id="track" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div 
        className="absolute top-1/3 left-10 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-2">
            Real-Time Garment Visibility
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight text-balance">
            Track Your Fresh Laundry Order
          </h2>
          <p className="mt-3 text-base text-slate-300 leading-relaxed">
            Follow your garments through every stage—from collection and ultrasonic stain pre-treatment to hand-pressing and electric van delivery.
          </p>
        </div>

        {/* Search Bar + Quick Test Chips */}
        <div className="mt-10 max-w-2xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Enter order ID (e.g. LND-8492)"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-slate-800 border border-slate-700 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 text-sm font-medium uppercase tracking-wider"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm rounded-2xl transition-colors shadow-lg shadow-sky-500/25 shrink-0"
            >
              Track Status
            </button>
          </form>

          {/* Quick Demo Pickers */}
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400 flex-wrap">
            <span>Sample live orders:</span>
            <button
              type="button"
              onClick={() => handleSelectDemo('LND-8492')}
              className={`px-2.5 py-1 rounded-lg border text-xs transition-colors ${
                currentOrder?.orderId === 'LND-8492'
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              #LND-8492 (In Wash)
            </button>
            <button
              type="button"
              onClick={() => handleSelectDemo('LND-9104')}
              className={`px-2.5 py-1 rounded-lg border text-xs transition-colors ${
                currentOrder?.orderId === 'LND-9104'
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/50'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
              }`}
            >
              #LND-9104 (Out for Delivery)
            </button>
          </div>

          {notFoundError && (
            <div className="mt-4 p-3 bg-rose-500/20 border border-rose-500/30 rounded-xl text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Order not found. Please try #LND-8492 or #LND-9104 to view real-time garment tracking.</span>
            </div>
          )}
        </div>

        {/* Order Details Display Card */}
        {currentOrder && (
          <div className="mt-12 bg-slate-800/90 border border-slate-700 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl backdrop-blur-sm max-w-5xl mx-auto">
            
            {/* Top Bar of Order Card */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-xl sm:text-2xl font-mono font-bold text-white">
                    #{currentOrder.orderId}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    {currentOrder.serviceType}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Customer: <span className="text-white font-medium">{currentOrder.customerName}</span> · {currentOrder.phone}
                </p>
              </div>

              {/* Status Pill & Estimated Handover */}
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-400 uppercase tracking-wider block">Estimated Handover</span>
                <span className="text-base font-bold text-emerald-400 flex items-center sm:justify-end gap-1.5 mt-0.5">
                  <Clock className="w-4 h-4" /> {currentOrder.deliveryDate}
                </span>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="mt-8">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-6">
                Garment Care Milestones
              </h4>

              <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {currentOrder.timeline.map((event, index) => {
                  const state = getStepStatus(event.step, currentOrder.status);
                  return (
                    <div key={event.step} className="flex flex-col items-start relative group">
                      {/* Milestone Node */}
                      <div className="flex items-center gap-3 sm:flex-col sm:items-start w-full">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                          state === 'completed'
                            ? 'bg-emerald-500 text-white'
                            : state === 'current'
                            ? 'bg-sky-500 text-white ring-4 ring-sky-500/30 animate-pulse'
                            : 'bg-slate-700 text-slate-400'
                        }`}>
                          {state === 'completed' ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>

                        <div>
                          <p className={`text-xs font-bold mt-0 sm:mt-2 ${
                            state === 'current' 
                              ? 'text-sky-300' 
                              : state === 'completed' 
                              ? 'text-white' 
                              : 'text-slate-400'
                          }`}>
                            {event.title}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">
                            {event.timestamp}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom 3-Column Info Blocks */}
            <div className="mt-10 pt-8 border-t border-slate-700 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              
              {/* Courier Contact */}
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/60">
                <span className="text-slate-400 uppercase tracking-wider font-semibold block mb-2 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-sky-400" /> Assigned Courier
                </span>
                <p className="text-white font-bold text-sm">{currentOrder.driverName || 'Dispatching...'}</p>
                <p className="text-slate-400 mt-0.5">Electric Delivery Van #04</p>
                {currentOrder.driverPhone && (
                  <a
                    href={`tel:${currentOrder.driverPhone}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-semibold"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call Courier Direct
                  </a>
                )}
              </div>

              {/* Delivery Address & Notes */}
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/60">
                <span className="text-slate-400 uppercase tracking-wider font-semibold block mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-400" /> Handover Address
                </span>
                <p className="text-white font-medium">{currentOrder.address}</p>
                {currentOrder.specialInstructions && (
                  <div className="mt-2 text-slate-400 italic bg-slate-900/40 p-2 rounded-lg border border-slate-700/40">
                    "{currentOrder.specialInstructions}"
                  </div>
                )}
              </div>

              {/* Items in Care */}
              <div className="bg-slate-800 p-4 rounded-2xl border border-slate-700/60">
                <span className="text-slate-400 uppercase tracking-wider font-semibold block mb-2 flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-cyan-400" /> Garments in Care
                </span>
                <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                  {currentOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-slate-300">
                      <span>{it.qty}x {it.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-slate-700 flex justify-between font-bold text-white">
                  <span>Total Garments</span>
                  <span className="tabular-nums">
                    {currentOrder.items.reduce((s, i) => s + i.qty, 0)} items
                  </span>
                </div>
              </div>

            </div>

            {/* Need Another Pickup CTA */}
            <div className="mt-8 pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Have another load ready? Book a return collection in 60 seconds.
              </span>
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-sky-500 hover:bg-sky-400 rounded-xl transition-colors"
              >
                <span>Schedule New Pickup</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
