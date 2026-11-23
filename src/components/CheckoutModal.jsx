import React, { useState, useEffect } from 'react';
import { 
  X, 
  MapPin, 
  User, 
  Phone, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import { SpotFoodLogo } from './SpotFoodLogo';

export const CheckoutModal = ({ isOpen, onClose, onOrderSuccess }) => {
  const { cartItems, grandTotal, subtotal, discount, deliveryFee, gst, clearCart, deliveryType } = useCart();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    landmark: '',
    instructions: 'Leave at door',
    paymentMethod: 'upi', // 'upi' | 'card' | 'cod'
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
        address: prev.address || user.address || '',
      }));
    }
  }, [user]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setError('Please provide your name and phone number.');
      return;
    }
    if (deliveryType === 'delivery' && !formData.address.trim()) {
      setError('Please provide your delivery address.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    const payload = {
      customer: { ...formData },
      items: [...cartItems],
      subtotal,
      discount,
      deliveryFee,
      gst,
      grandTotal,
      paymentMethod: formData.paymentMethod,
      deliveryType,
    };

    // Attempt remote backend API call first
    api.createOrder(payload).then((res) => {
      let orderDetails;
      if (res && res.order) {
        orderDetails = res.order;
      } else {
        const orderId = 'SF-' + Math.floor(10000 + Math.random() * 90000);
        orderDetails = {
          orderId,
          ...payload,
          totalPaid: grandTotal,
          placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          estimatedTime: '25-30 mins',
        };
      }

      setIsSubmitting(false);
      clearCart();
      onOrderSuccess(orderDetails);
      addToast(`🎉 Order ${orderDetails.orderId} placed successfully!`, 'success');
    }).catch(() => {
      const orderId = 'SF-' + Math.floor(10000 + Math.random() * 90000);
      const fallbackDetails = {
        orderId,
        ...payload,
        totalPaid: grandTotal,
        placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        estimatedTime: '25-30 mins',
      };
      setIsSubmitting(false);
      clearCart();
      onOrderSuccess(fallbackDetails);
      addToast(`🎉 Order ${orderId} placed successfully!`, 'success');
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-charcoal-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden my-8 z-10 animate-scale-up">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-charcoal-850 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SpotFoodLogo size="xs" showText={false} />
            <div>
              <h3 className="text-lg font-bold font-display text-white">
                Complete Your <span className="text-metallic-gold">SPOT</span> <span className="text-neon-orange">FOOD</span> Order
              </h3>
              <p className="text-xs text-gray-400">
                {deliveryType === 'delivery' ? 'Express Doorstep Delivery' : 'Quick Dine-in / Takeaway'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/40 text-xs text-rose-300 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gold uppercase tracking-wider">
              1. Contact Information
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-charcoal-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-fiery"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                  Phone Number (10 Digits) *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 98765 43210"
                    className="w-full bg-charcoal-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-fiery"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address Details (if delivery) */}
          {deliveryType === 'delivery' && (
            <div className="space-y-3 pt-2 border-t border-white/10">
              <h4 className="text-xs font-bold text-gold uppercase tracking-wider">
                2. Delivery Address
              </h4>
              <div className="space-y-2">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                    House / Flat No., Street, Building *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="e.g. Flat 402, Sunshine Heights, 12th Main Road"
                    className="w-full bg-charcoal-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fiery"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                      Landmark / Area
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      value={formData.landmark}
                      onChange={handleChange}
                      placeholder="e.g. Near Metro Station / Park"
                      className="w-full bg-charcoal-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fiery"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-gray-300 mb-1">
                      Delivery Instructions
                    </label>
                    <select
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleChange}
                      className="w-full bg-charcoal-950 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-fiery"
                    >
                      <option value="Leave at door">Leave at doorstep</option>
                      <option value="Call upon arrival">Call upon arrival</option>
                      <option value="Do not ring bell">Do not ring doorbell</option>
                      <option value="Hand to security">Hand over to security</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Method */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <h4 className="text-xs font-bold text-gold uppercase tracking-wider">
              3. Payment Method (Simulated Gateway)
            </h4>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'upi' }))}
                className={`p-3 rounded-xl border text-center transition-all ${
                  formData.paymentMethod === 'upi'
                    ? 'bg-fiery/15 border-fiery text-white shadow-glow-orange'
                    : 'bg-charcoal-950 border-white/10 text-gray-400 hover:border-white/20'
                }`}
              >
                <Smartphone className="w-5 h-5 mx-auto mb-1 text-fiery" />
                <span className="block text-xs font-bold">UPI / GPay</span>
                <span className="text-[10px] text-gray-500">Fastest</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'card' }))}
                className={`p-3 rounded-xl border text-center transition-all ${
                  formData.paymentMethod === 'card'
                    ? 'bg-fiery/15 border-fiery text-white shadow-glow-orange'
                    : 'bg-charcoal-950 border-white/10 text-gray-400 hover:border-white/20'
                }`}
              >
                <CreditCard className="w-5 h-5 mx-auto mb-1 text-gold" />
                <span className="block text-xs font-bold">Cards</span>
                <span className="text-[10px] text-gray-500">Credit / Debit</span>
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                className={`p-3 rounded-xl border text-center transition-all ${
                  formData.paymentMethod === 'cod'
                    ? 'bg-fiery/15 border-fiery text-white shadow-glow-orange'
                    : 'bg-charcoal-950 border-white/10 text-gray-400 hover:border-white/20'
                }`}
              >
                <Banknote className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
                <span className="block text-xs font-bold">Cash</span>
                <span className="text-[10px] text-gray-500">On Delivery</span>
              </button>
            </div>
          </div>

          {/* Amount Due and Submit Button */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400">Total Payable</span>
              <div className="text-2xl font-black text-gold">₹{grandTotal}</div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-fiery to-gold text-charcoal-950 font-black text-xs sm:text-sm uppercase tracking-wider hover:shadow-glow-orange transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Place Order • ₹{grandTotal}</span>
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
