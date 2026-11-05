import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  ArrowRight,
  ArrowLeft,
  Package
} from 'lucide-react';
import { OrderRecord } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillService?: string;
  prefillItems?: { name: string; qty: number; price: number }[];
  prefillSubtotal?: number;
  onBookingSuccess: (newOrder: OrderRecord) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefillService = 'wash-fold',
  prefillItems = [],
  prefillSubtotal = 0,
  onBookingSuccess
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [serviceType, setServiceType] = useState(prefillService);
  const [fabricNotes, setFabricNotes] = useState('');
  const [detergentPreference, setDetergentPreference] = useState('hypoallergenic');
  const [bagSize, setBagSize] = useState('standard');

  const [pickupDate, setPickupDate] = useState('Today, Nov 5');
  const [pickupSlot, setPickupSlot] = useState('Morning (8:00 AM - 11:00 AM)');
  const [isExpress, setIsExpress] = useState(false);

  const [fullName, setFullName] = useState('J. Prajpurohit');
  const [phone, setPhone] = useState('+1 (555) 234-8901');
  const [address, setAddress] = useState('742 Evergreen Terrace, Suite 4B');
  const [instructions, setInstructions] = useState('Leave with concierge if not home.');

  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  useEffect(() => {
    if (prefillService) {
      setServiceType(prefillService);
    }
  }, [prefillService]);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 3) {
      setStep((step + 1) as 1 | 2 | 3 | 4);
    } else if (step === 3) {
      // Create new Order
      const newId = `LND-${Math.floor(1000 + Math.random() * 9000)}`;
      setConfirmedOrderId(newId);

      const items = prefillItems.length > 0 
        ? prefillItems 
        : [
            { name: serviceType === 'wash-fold' ? 'Daily Wash & Fold Bag' : 'Garments for Care', qty: 1 }
          ];

      const newOrderRecord: OrderRecord = {
        orderId: newId,
        customerName: fullName,
        phone,
        address,
        pickupDate,
        pickupTimeSlot: pickupSlot,
        deliveryDate: isExpress ? 'Tomorrow (Express 12-24h)' : 'In 48 Hours',
        serviceType: serviceType === 'wash-fold' ? 'Daily Wash & Fold' : serviceType === 'dry-cleaning' ? 'Eco-Dry Cleaning' : 'Custom Garment Care',
        items,
        totalAmount: prefillSubtotal > 0 ? prefillSubtotal : 28.50,
        status: 'placed',
        driverName: 'Alex Morgan (Assigned Courier)',
        driverPhone: '+1 (555) 890-4141',
        specialInstructions: `${instructions} Preference: ${detergentPreference}. Notes: ${fabricNotes}`,
        timeline: [
          {
            step: 'placed',
            title: 'Order Scheduled Online',
            description: 'Pickup window reserved and assigned to electric delivery van.',
            timestamp: 'Just now',
            completed: true,
            current: true
          },
          {
            step: 'picked_up',
            title: 'Courier Doorstep Collection',
            description: 'Courier en route to collect garments in reusable eco-bag.',
            timestamp: `Scheduled for ${pickupSlot}`,
            completed: false
          },
          {
            step: 'inspecting',
            title: 'Barcode Scanning & Fabric Check',
            description: 'Stains marked and digital photos saved to your portal.',
            timestamp: 'Pending collection',
            completed: false
          },
          {
            step: 'washing',
            title: 'Eco-Enzyme Wash & Treatment',
            description: 'Custom wash cycle using hypoallergenic plant enzymes.',
            timestamp: 'Pending inspection',
            completed: false
          },
          {
            step: 'pressing',
            title: 'Steam Press & Crisp Folding',
            description: 'Finishing touches with wooden hangers and soft folds.',
            timestamp: 'Pending wash',
            completed: false
          },
          {
            step: 'out_for_delivery',
            title: 'Out for Doorstep Return',
            description: 'Fresh delivery right to your door.',
            timestamp: 'Scheduled tomorrow',
            completed: false
          },
          {
            step: 'delivered',
            title: 'Delivered Fresh & Crisp',
            description: 'Handover complete.',
            timestamp: 'Pending delivery',
            completed: false
          }
        ]
      };

      onBookingSuccess(newOrderRecord);
      setStep(4);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 overflow-hidden relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                {step === 4 ? 'Pickup Confirmed!' : 'Schedule Doorstep Service'}
              </h3>
              <p className="text-xs text-slate-500">
                {step === 4 ? 'We will see you soon' : `Step ${step} of 3`}
              </p>
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

        {/* Step Progress Bar (hidden on success) */}
        {step < 4 && (
          <div className="mt-4 flex items-center gap-2">
            <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 1 ? 'bg-sky-600' : 'bg-slate-200'}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 2 ? 'bg-sky-600' : 'bg-slate-200'}`} />
            <div className={`h-1.5 flex-1 rounded-full transition-all ${step >= 3 ? 'bg-sky-600' : 'bg-slate-200'}`} />
          </div>
        )}

        {/* STEP 1: Service & Preferences */}
        {step === 1 && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Primary Service
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'wash-fold', label: 'Wash & Fold' },
                  { id: 'dry-cleaning', label: 'Eco-Dry Cleaning' },
                  { id: 'steam-press', label: 'Steam Press Only' },
                  { id: 'bedding-linens', label: 'Bedding & Duvet' }
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setServiceType(s.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      serviceType === s.id
                        ? 'border-sky-500 bg-sky-50 text-sky-900 ring-1 ring-sky-500/20'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {prefillItems.length > 0 && (
              <div className="p-3 bg-sky-50/70 border border-sky-100 rounded-xl text-xs">
                <span className="font-bold text-sky-900 block mb-1">
                  Items imported from Pricing Calculator:
                </span>
                <div className="text-slate-600 space-y-0.5">
                  {prefillItems.map((it, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{it.qty}x {it.name}</span>
                      <span className="font-semibold text-slate-800">${(it.price * it.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Detergent & Care Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Detergent Preference
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'hypoallergenic', label: 'Hypoallergenic (Unscented)' },
                  { id: 'lavender', label: 'Organic Lavender' },
                  { id: 'sport', label: 'Activewear Anti-Odor' }
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDetergentPreference(d.id)}
                    className={`p-2.5 rounded-xl border text-[11px] font-medium transition-all text-center ${
                      detergentPreference === d.id
                        ? 'border-sky-500 bg-sky-50 text-sky-900'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Fabric Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Special Care & Stain Notes (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Red wine spot on white blouse, please hang navy trousers on wooden hanger..."
                value={fabricNotes}
                onChange={(e) => setFabricNotes(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
          </div>
        )}

        {/* STEP 2: Timing & Express Options */}
        {step === 2 && (
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Pickup Day
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Today, Nov 5', 'Tomorrow, Nov 6', 'Friday, Nov 7'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setPickupDate(d)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      pickupDate === d
                        ? 'border-sky-500 bg-sky-50 text-sky-900 ring-1 ring-sky-500/20'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                1-Hour Pickup Window
              </label>
              <div className="space-y-2">
                {[
                  'Morning (8:00 AM - 11:00 AM)',
                  'Afternoon (1:00 PM - 4:00 PM)',
                  'Evening (5:00 PM - 8:00 PM)'
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setPickupSlot(slot)}
                    className={`w-full p-3 rounded-xl border text-xs font-medium text-left flex items-center justify-between transition-all ${
                      pickupSlot === slot
                        ? 'border-sky-500 bg-sky-50 text-sky-900 font-bold'
                        : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-sky-600" />
                      {slot}
                    </span>
                    {pickupSlot === slot && <CheckCircle2 className="w-4 h-4 text-sky-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Express Toggle */}
            <div 
              onClick={() => setIsExpress(!isExpress)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                isExpress 
                  ? 'bg-amber-50/70 border-amber-300 ring-1 ring-amber-300' 
                  : 'bg-slate-50 border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isExpress ? 'bg-amber-500 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Same-Day Express Rush (12h - 24h)</p>
                  <p className="text-[11px] text-slate-500">Guaranteed delivery within 24 hours (+$5.00)</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isExpress}
                onChange={() => {}} // handled by parent div
                className="w-4 h-4 accent-amber-500 rounded"
              />
            </div>
          </div>
        )}

        {/* STEP 3: Address & Contact */}
        {step === 3 && (
          <div className="mt-6 space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Phone Number (for Courier SMS Alerts)
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Pickup & Return Address
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Doorstep Notes
              </label>
              <input
                type="text"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Gate code, concierge, leave on front porch..."
                className="w-full text-xs px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500 font-medium"
              />
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero cancellation fee anytime up to 1 hour before pickup.</span>
            </div>
          </div>
        )}

        {/* STEP 4: Order Confirmed Screen */}
        {step === 4 && (
          <div className="mt-6 text-center py-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-float-slow shadow-lg shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
            </div>

            <h4 className="text-xl font-extrabold text-slate-900">
              Pickup Scheduled Successfully!
            </h4>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              We have dispatched your appointment to our electric courier van. You will receive an SMS reminder 30 minutes before arrival.
            </p>

            <div className="mt-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-200/80 pb-2">
                <span className="text-slate-500">Order Reference</span>
                <span className="font-mono font-bold text-sky-600 text-sm">#{confirmedOrderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup Window</span>
                <span className="font-semibold text-slate-900">{pickupDate} · {pickupSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination</span>
                <span className="font-semibold text-slate-900 truncate max-w-[200px]">{address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment</span>
                <span className="font-semibold text-emerald-600">Pay After Clean / Cashless</span>
              </div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Done
              </button>
              <a
                href="#track"
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-md shadow-sky-600/20 transition-colors inline-flex items-center justify-center gap-1.5"
              >
                <Package className="w-4 h-4" />
                <span>Track in Real-Time</span>
              </a>
            </div>
          </div>
        )}

        {/* Wizard Footer Controls */}
        {step < 4 && (
          <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((step - 1) as 1 | 2 | 3 | 4)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" /> Free doorstep pickup
              </span>
            )}

            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-md shadow-sky-600/20 transition-all"
            >
              <span>{step === 3 ? 'Confirm & Dispatch Driver' : 'Continue'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
