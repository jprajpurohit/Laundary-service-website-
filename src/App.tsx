import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { PricingCalculator } from './components/PricingCalculator';
import { HowItWorks } from './components/HowItWorks';
import { OrderTracker } from './components/OrderTracker';
import { StainGuide } from './components/StainGuide';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { UserAccountModal } from './components/UserAccountModal';
import { DEMO_ORDERS } from './data/laundryData';
import { OrderRecord } from './types';
import { Calendar, CheckCircle2, Package, Sparkles } from 'lucide-react';

export default function App() {
  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  // Booking prefill state
  const [prefillService, setPrefillService] = useState('wash-fold');
  const [prefillItems, setPrefillItems] = useState<{ name: string; qty: number; price: number }[]>([]);
  const [prefillSubtotal, setPrefillSubtotal] = useState<number>(0);

  // Active orders state (starts with JP's active demo order)
  const [activeOrders, setActiveOrders] = useState<OrderRecord[]>([
    DEMO_ORDERS['LND-8492']
  ]);
  const [currentTrackingId, setCurrentTrackingId] = useState('LND-8492');

  // Success toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleOpenBooking = (serviceId?: string) => {
    if (serviceId) {
      setPrefillService(serviceId);
    }
    setPrefillItems([]);
    setPrefillSubtotal(0);
    setIsBookingOpen(true);
  };

  const handleProceedFromCalculator = (
    items: { name: string; qty: number; price: number }[],
    subtotal: number
  ) => {
    setPrefillItems(items);
    setPrefillSubtotal(subtotal);
    setPrefillService('wash-fold');
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (newOrder: OrderRecord) => {
    setActiveOrders(prev => [newOrder, ...prev]);
    setCurrentTrackingId(newOrder.orderId);
    showToast(`Order #${newOrder.orderId} booked! Electric courier scheduled for pickup.`);
  };

  const handleOpenTracker = (orderId?: string) => {
    if (orderId) {
      setCurrentTrackingId(orderId);
    }
    const elem = document.getElementById('track');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPricing = (category?: string) => {
    const elem = document.getElementById('pricing');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToHowItWorks = () => {
    const elem = document.getElementById('how-it-works');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenStainBooking = (stainName: string) => {
    setPrefillService('dry-cleaning');
    setPrefillItems([
      { name: `Special Stain Restoration (${stainName})`, qty: 1, price: 15.00 }
    ]);
    setPrefillSubtotal(15.00);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-sky-500 selection:text-white">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-3 animate-float-slow text-xs sm:text-sm">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenTracker={handleOpenTracker}
        onOpenAccount={() => setIsAccountOpen(true)}
        activeOrderCount={activeOrders.length}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenBooking}
          onScrollToPricing={handleScrollToPricing}
          onScrollToHowItWorks={handleScrollToHowItWorks}
        />

        {/* Services Section */}
        <ServicesSection
          onSelectServiceForBooking={handleOpenBooking}
          onOpenPricing={handleScrollToPricing}
        />

        {/* Interactive Pricing Calculator */}
        <PricingCalculator
          onProceedToBooking={handleProceedFromCalculator}
        />

        {/* How It Works Pipeline */}
        <HowItWorks
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Live Order Tracker */}
        <OrderTracker
          initialOrderId={currentTrackingId}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Fabric Care & Stain Emergency Guide */}
        <StainGuide
          onOpenBookingWithStain={handleOpenStainBooking}
        />

        {/* Social Proof & Reviews */}
        <ReviewsSection />

        {/* FAQ Section */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenTracker={() => handleOpenTracker()}
      />

      {/* Sticky Mobile Quick-Action Floating Pill (Within 15% mobile sticky limit) */}
      <div className="sm:hidden fixed bottom-3 left-4 right-4 z-30">
        <div className="bg-slate-900/95 backdrop-blur-md text-white p-2 rounded-2xl shadow-2xl border border-slate-800 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => handleOpenTracker('LND-8492')}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-xl"
          >
            <Package className="w-3.5 h-3.5 text-sky-400" />
            <span>Track (#8492)</span>
          </button>

          <button
            type="button"
            onClick={() => handleOpenBooking()}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-md"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Pickup</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        prefillService={prefillService}
        prefillItems={prefillItems}
        prefillSubtotal={prefillSubtotal}
        onBookingSuccess={handleBookingSuccess}
      />

      <UserAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        activeOrders={activeOrders}
        onSelectOrderToTrack={(orderId) => {
          setCurrentTrackingId(orderId);
          handleOpenTracker(orderId);
        }}
        onOpenBooking={() => handleOpenBooking()}
      />

    </div>
  );
}
