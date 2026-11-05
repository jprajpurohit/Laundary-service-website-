import React, { useState } from 'react';
import { 
  Calculator, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  Check, 
  Truck
} from 'lucide-react';
import { SERVICE_ITEMS } from '../data/laundryData';
import { ServiceCategory, ServiceItem } from '../types';

interface PricingCalculatorProps {
  onProceedToBooking: (items: { name: string; qty: number; price: number }[], subtotal: number) => void;
  initialCategory?: string;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({ 
  onProceedToBooking,
  initialCategory = 'all'
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(initialCategory as ServiceCategory);
  const [cart, setCart] = useState<Record<string, number>>({
    'wf-bag-small': 1,
    'dc-shirt': 2
  });
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const handleIncrement = (id: string) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  const handleDecrement = (id: string) => {
    setCart(prev => {
      const current = prev[id] || 0;
      if (current <= 1) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: current - 1 };
    });
  };

  const handleClearCart = () => {
    setCart({});
  };

  const categories: { key: ServiceCategory; label: string }[] = [
    { key: 'all', label: 'All Items' },
    { key: 'wash-fold', label: 'Wash & Fold' },
    { key: 'dry-cleaning', label: 'Dry Cleaning' },
    { key: 'ironing', label: 'Steam Press' },
    { key: 'bedding-linens', label: 'Bedding & Linens' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? SERVICE_ITEMS 
    : SERVICE_ITEMS.filter(item => item.category === activeCategory);

  // Calculate pricing
  const totalItemsCount = Object.values(cart).reduce((a, b) => a + b, 0);
  
  const rawSubtotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = SERVICE_ITEMS.find(i => i.id === id);
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const discountAmount = discountApplied ? rawSubtotal * 0.2 : 0;
  const finalSubtotal = Math.max(0, rawSubtotal - discountAmount);
  const freeShippingThreshold = 30;
  const freeShippingProgress = Math.min(100, (finalSubtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - finalSubtotal);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'FRESH20' || code === 'JPFIRST' || code === 'CLEAN20') {
      setDiscountApplied(true);
    } else {
      setPromoError('Invalid code. Try FRESH20 for 20% off!');
    }
  };

  const handleCheckout = () => {
    const itemsList = Object.entries(cart).map(([id, qty]) => {
      const item = SERVICE_ITEMS.find(i => i.id === id);
      return {
        name: item?.name || 'Laundry Item',
        qty,
        price: item?.price || 0
      };
    });
    onProceedToBooking(itemsList, finalSubtotal);
  };

  return (
    <section id="pricing" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-sky-600 mb-2">
            Transparent Flat-Rate Pricing
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
            Interactive Cost & Load Calculator
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            No hidden fees, no mystery surcharges. Calculate your exact basket, apply discount coupons, and schedule pickup directly.
          </p>
        </div>

        {/* Category Tabs (Segmented Control) */}
        <div className="mt-10 flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-200/80 rounded-2xl max-w-2xl w-full">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setActiveCategory(cat.key)}
                className={`px-3.5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 whitespace-nowrap shrink-0 ${
                  activeCategory === cat.key
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-Column: Items Catalog + Cart Sticky Summary */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Items Catalog (8 Cols) */}
          <div className="lg:col-span-8 space-y-3">
            {filteredItems.map((item: ServiceItem) => {
              const qty = cart[item.id] || 0;
              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl bg-white border transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    qty > 0 
                      ? 'border-sky-300 ring-1 ring-sky-300/40 shadow-sm' 
                      : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-base font-bold text-slate-900">{item.name}</h4>
                      {item.popular && (
                        <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md">
                          Most Popular
                        </span>
                      )}
                      {item.ecoFriendly && (
                        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-emerald-500" /> Eco-Safe
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                    <div className="mt-2 text-xs text-slate-400 flex items-center gap-2">
                      <span>Turnaround: {item.turnaroundHours}h</span>
                      <span>·</span>
                      <span>Billed per {item.unit}</span>
                    </div>
                  </div>

                  {/* Price & Incrementor */}
                  <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                    <div className="text-left sm:text-right">
                      <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                        ${item.price.toFixed(2)}
                      </span>
                      <span className="text-xs text-slate-400 block">per {item.unit}</span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => handleDecrement(item.id)}
                        disabled={qty === 0}
                        className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                          qty === 0
                            ? 'text-slate-300 cursor-not-allowed'
                            : 'bg-white text-slate-700 hover:text-slate-900 shadow-xs'
                        }`}
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>

                      <span className="w-6 text-center text-xs font-bold text-slate-900 tabular-nums">
                        {qty}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleIncrement(item.id)}
                        className="w-7 h-7 rounded-lg bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center shadow-xs transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Cart Summary (4 Cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">Your Basket</h3>
                </div>

                {totalItemsCount > 0 && (
                  <button
                    type="button"
                    onClick={handleClearCart}
                    className="text-xs text-slate-400 hover:text-rose-500 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear
                  </button>
                )}
              </div>

              {/* Free delivery progress bar */}
              <div className="mt-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-sky-500" /> Doorstep Delivery
                  </span>
                  <span className="tabular-nums">
                    {amountNeededForFreeShipping === 0 ? 'FREE' : `$${amountNeededForFreeShipping.toFixed(2)} to FREE`}
                  </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  {amountNeededForFreeShipping === 0 
                    ? '🎉 You qualify for 100% Free Pickup & Delivery!' 
                    : `Add $${amountNeededForFreeShipping.toFixed(2)} more for complimentary roundtrip delivery.`}
                </p>
              </div>

              {/* Cart line items */}
              <div className="mt-4 max-h-48 overflow-y-auto space-y-2 pr-1">
                {totalItemsCount === 0 ? (
                  <p className="text-center text-xs text-slate-400 py-6">
                    No items selected yet. Tap '+' on any service item to estimate your order.
                  </p>
                ) : (
                  Object.entries(cart).map(([id, qty]) => {
                    const item = SERVICE_ITEMS.find(i => i.id === id);
                    if (!item) return null;
                    return (
                      <div key={id} className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
                        <span className="text-slate-700 truncate max-w-[170px]">
                          {qty}x {item.name}
                        </span>
                        <span className="font-semibold text-slate-900 tabular-nums">
                          ${(item.price * qty).toFixed(2)}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Promo code form */}
              <form onSubmit={applyPromo} className="mt-4 pt-3 border-t border-slate-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. FRESH20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 text-xs px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg uppercase tracking-wider text-slate-800 placeholder:normal-case placeholder:tracking-normal focus:outline-none focus:ring-1 focus:ring-sky-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {discountApplied && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Coupon FRESH20 applied (20% off)!
                  </p>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-500 mt-1">{promoError}</p>
                )}
              </form>

              {/* Price summary block */}
              <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="tabular-nums font-medium text-slate-700">${rawSubtotal.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount (20%)</span>
                    <span className="tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500">
                  <span>Courier Pickup & Return</span>
                  <span className="tabular-nums font-medium text-slate-700">
                    {finalSubtotal >= freeShippingThreshold || finalSubtotal === 0 ? 'FREE' : '$4.99'}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between text-base font-extrabold text-slate-900">
                  <span>Total Estimated</span>
                  <span className="tabular-nums text-sky-600">
                    ${(finalSubtotal + (finalSubtotal >= freeShippingThreshold || finalSubtotal === 0 ? 0 : 4.99)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Action Button */}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={totalItemsCount === 0}
                className={`mt-5 w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold rounded-xl shadow-md transition-all duration-200 ${
                  totalItemsCount === 0
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-sky-600 hover:bg-sky-500 active:bg-sky-700 text-white shadow-sky-600/20'
                }`}
              >
                <span>Book Pickup with Items ({totalItemsCount})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-3 text-center">
                <p className="text-[11px] text-slate-400">
                  No payment required until garments are inspected & weighed at our facility.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
