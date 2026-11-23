import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ChefSpecials } from './components/ChefSpecials';
import { MenuSection } from './components/MenuSection';
import { TableReservation } from './components/TableReservation';
import { VibeGallery } from './components/VibeGallery';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AuthModal } from './components/AuthModal';
import { AdminModal } from './components/AdminModal';

export function AppContent() {
  const { isAdminModalOpen, setIsAdminModalOpen } = useAuth();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  const scrollToReservation = () => {
    const el = document.getElementById('reservation');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProceedToCheckout = () => {
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderDetails) => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(orderDetails);
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#F8F9FA] flex flex-col selection:bg-[#FF5722] selection:text-white">
      {/* Sticky Glassmorphic Navbar */}
      <Navbar onOpenReservation={scrollToReservation} />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero onOpenReservation={scrollToReservation} />

        {/* Chef Specials & Trending Combos */}
        <ChefSpecials />

        {/* Interactive Menu Section */}
        <MenuSection />

        {/* Table Reservation Section */}
        <TableReservation />

        {/* Vibe Gallery */}
        <VibeGallery />

        {/* Customer Reviews Section */}
        <ReviewsSection />
      </main>

      {/* Footer with Hours, Location & Newsletter */}
      <Footer onOpenReservation={scrollToReservation} />

      {/* Slide-out Cart Drawer */}
      <CartDrawer onProceedToCheckout={handleProceedToCheckout} />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Confirmed Celebration Modal */}
      {confirmedOrder && (
        <OrderSuccessModal
          orderDetails={confirmedOrder}
          onClose={() => setConfirmedOrder(null)}
        />
      )}

      {/* Authentication Modal */}
      <AuthModal />

      {/* Admin Panel Console */}
      <AdminModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
