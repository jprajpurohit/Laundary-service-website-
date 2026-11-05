import React, { useState } from 'react';
import { 
  X, 
  User, 
  Package, 
  MapPin, 
  ShieldCheck, 
  HeartHandshake, 
  Clock, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { OrderRecord } from '../types';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeOrders: OrderRecord[];
  onSelectOrderToTrack: (orderId: string) => void;
  onOpenBooking: () => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  activeOrders,
  onSelectOrderToTrack,
  onOpenBooking
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'preferences' | 'address'>('orders');

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex items-center justify-center font-bold text-lg shadow-md shadow-sky-500/20">
              JP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-lg">J. Prajpurohit</h3>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100 px-2 py-0.5 rounded-full">
                  VIP Club
                </span>
              </div>
              <p className="text-xs text-slate-500">jprajpurohit604@gmail.com · Member since 2024</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors text-sm font-bold"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="mt-4 flex gap-1 p-1 bg-slate-100 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'orders' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active Orders ({activeOrders.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preferences')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'preferences' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Laundry Preferences
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('address')}
            className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'address' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Addresses
          </button>
        </div>

        {/* TAB 1: Orders */}
        {activeTab === 'orders' && (
          <div className="mt-5 space-y-3">
            {activeOrders.length === 0 ? (
              <div className="text-center py-8">
                <Package className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <p className="text-xs text-slate-500 font-medium">No active laundry orders right now.</p>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="mt-3 px-4 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl"
                >
                  Schedule a Pickup
                </button>
              </div>
            ) : (
              activeOrders.map((order) => (
                <div
                  key={order.orderId}
                  className="p-4 rounded-2xl border border-sky-200/80 bg-sky-50/50 hover:bg-sky-50 transition-colors flex flex-col justify-between gap-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 text-sm">
                          #{order.orderId}
                        </span>
                        <span className="text-[11px] font-semibold text-sky-700 bg-sky-100 px-2 py-0.5 rounded-md">
                          {order.serviceType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        Delivery: <strong className="text-slate-700">{order.deliveryDate}</strong>
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full capitalize">
                        {order.status.replace(/_/g, ' ')}
                      </span>
                      <p className="text-xs font-extrabold text-slate-900 mt-1 tabular-nums">
                        ${order.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-sky-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 truncate max-w-[220px]">
                      {order.items.reduce((s, i) => s + i.qty, 0)} items in care
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectOrderToTrack(order.orderId);
                      }}
                      className="inline-flex items-center gap-1 font-bold text-sky-600 hover:text-sky-700"
                    >
                      <span>Track Live</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: Preferences */}
        {activeTab === 'preferences' && (
          <div className="mt-5 space-y-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-900 block mb-1">Detergent Formula</span>
              <p className="text-slate-600">Hypoallergenic & Plant-Based (Zero artificial fragrances)</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-900 block mb-1">Shirt Finishing</span>
              <p className="text-slate-600">Light starch, hung on wooden hangers with collar stays</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-900 block mb-1">Pairing Guarantee</span>
              <p className="text-slate-600">Socks sorted & paired with compostable paper bands</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-900 block mb-1">Temperature Setting</span>
              <p className="text-slate-600">Eco-Cold (30°C) with Ozone Sanitization</p>
            </div>
          </div>
        )}

        {/* TAB 3: Addresses */}
        {activeTab === 'address' && (
          <div className="mt-5 space-y-3 text-xs">
            <div className="p-3 bg-sky-50/60 rounded-xl border border-sky-200 flex items-start justify-between">
              <div>
                <span className="font-bold text-sky-900 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-sky-600" /> Primary Residence (Default)
                </span>
                <p className="text-slate-700 mt-1">742 Evergreen Terrace, Suite 4B</p>
                <p className="text-slate-500 text-[11px]">Instructions: Leave with concierge front desk</p>
              </div>
              <span className="text-[10px] bg-sky-600 text-white px-1.5 py-0.5 rounded font-semibold">
                ACTIVE
              </span>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start justify-between">
              <div>
                <span className="font-semibold text-slate-900">Office / Work</span>
                <p className="text-slate-600 mt-1">100 Tech Hub Plaza, 8th Floor</p>
                <p className="text-slate-400 text-[11px]">Instructions: Call reception on arrival</p>
              </div>
            </div>
          </div>
        )}

        {/* Modal footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Garment Insurance Protection active</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
