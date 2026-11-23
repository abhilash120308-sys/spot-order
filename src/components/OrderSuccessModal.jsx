import React, { useEffect } from 'react';
import { 
  CheckCircle2, 
  X, 
  Clock, 
  MapPin, 
  Sparkles, 
  ChefHat, 
  Bike, 
  PartyPopper,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrderSuccessModal = ({ orderDetails, onClose }) => {
  if (!orderDetails) return null;

  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF5722', '#FFC107', '#22C55E', '#FFFFFF'],
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg bg-charcoal-900 border border-gold/40 rounded-3xl shadow-2xl overflow-hidden my-8 z-10 animate-scale-up">
        
        {/* Confetti & Success Banner */}
        <div className="p-6 text-center bg-gradient-to-b from-charcoal-800 to-charcoal-900 border-b border-white/10 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/60 flex items-center justify-center mx-auto mb-3 text-emerald-400 shadow-glow-gold animate-bounce">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-fiery/15 text-fiery border border-fiery/30 text-[11px] font-bold uppercase tracking-wider mb-2">
            <PartyPopper className="w-3.5 h-3.5 text-gold" />
            <span>Cravings Spotted & Confirmed!</span>
          </span>

          <h2 className="text-2xl font-black font-display text-white">
            Order Confirmed!
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            Order ID: <span className="font-mono text-gold font-bold text-sm">{orderDetails.orderId}</span>
          </p>
        </div>

        {/* Live Tracking Progress Bar */}
        <div className="p-5 border-b border-white/10 bg-charcoal-950/60">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-gray-400 font-semibold">Live Order Tracker</span>
            <span className="text-gold font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Est: {orderDetails.estimatedTime}
            </span>
          </div>

          {/* 4 Step Progress Indicators */}
          <div className="grid grid-cols-4 gap-2 relative">
            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-charcoal-950 font-bold flex items-center justify-center mx-auto text-xs shadow-md">
                ✓
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold block mt-1">Received</span>
            </div>

            <div className="text-center">
              <div className="w-8 h-8 rounded-full bg-fiery text-white font-bold flex items-center justify-center mx-auto text-xs shadow-glow-orange animate-pulse">
                <ChefHat className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-fiery font-bold block mt-1">In Kitchen</span>
            </div>

            <div className="text-center opacity-40">
              <div className="w-8 h-8 rounded-full bg-charcoal-800 text-gray-400 font-bold flex items-center justify-center mx-auto text-xs border border-white/10">
                <Bike className="w-4 h-4" />
              </div>
              <span className="text-[10px] text-gray-400 font-medium block mt-1">On the Way</span>
            </div>

            <div className="text-center opacity-40">
              <div className="w-8 h-8 rounded-full bg-charcoal-800 text-gray-400 font-bold flex items-center justify-center mx-auto text-xs border border-white/10">
                ★
              </div>
              <span className="text-[10px] text-gray-400 font-medium block mt-1">At Spot</span>
            </div>
          </div>
        </div>

        {/* Order Details & Receipt */}
        <div className="p-6 space-y-4 max-h-64 overflow-y-auto">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Items Ordered ({orderDetails.items.length})
          </div>

          <div className="space-y-2">
            {orderDetails.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs py-1.5 border-b border-white/5">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-gold">{item.quantity}x</span>
                  <span className="text-gray-200">{item.name}</span>
                </div>
                <span className="font-bold text-white">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs text-gray-400 space-y-1">
            <div className="flex justify-between">
              <span>Customer:</span>
              <span className="text-white font-medium">{orderDetails.customer.name} ({orderDetails.customer.phone})</span>
            </div>
            {orderDetails.deliveryType === 'delivery' && (
              <div className="flex justify-between">
                <span>Address:</span>
                <span className="text-white font-medium text-right max-w-xs truncate">{orderDetails.customer.address}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-sm text-gold pt-2 border-t border-white/10">
              <span>Amount Paid:</span>
              <span>₹{orderDetails.totalPaid}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-5 border-t border-white/10 bg-charcoal-850 flex items-center justify-end">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-fiery to-gold text-charcoal-950 font-black text-xs uppercase tracking-wider hover:shadow-glow-orange transition-all"
          >
            Order More Delicious Food
          </button>
        </div>

      </div>
    </div>
  );
};
