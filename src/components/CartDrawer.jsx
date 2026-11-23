import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Bike, 
  Store, 
  Sparkles, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { SpotFoodLogo } from './SpotFoodLogo';

export const CartDrawer = ({ onProceedToCheckout }) => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    gst,
    discount,
    grandTotal,
    deliveryType,
    setDeliveryType,
    couponCode,
    setCouponCode,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const { addToast } = useToast();
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);

  if (!isCartOpen) return null;

  const handleApply = (codeToApply) => {
    const code = codeToApply || couponInput;
    if (!code) return;
    const res = applyCoupon(code);
    setCouponMsg(res);
    if (res.success) {
      addToast(res.message, 'success');
      setCouponInput('');
    } else {
      addToast(res.message, 'error');
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setCouponMsg(null);
    addToast('Coupon removed', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-charcoal-900 border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-charcoal-850">
            <div className="flex items-center space-x-3">
              <SpotFoodLogo size="xs" showText={false} />
              <div>
                <h2 className="text-lg font-bold font-display text-white">
                  Your <span className="text-metallic-gold">SPOT</span> <span className="text-neon-orange">FOOD</span> Cart
                </h2>
                <p className="text-xs text-gray-400">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery / Pickup Switch */}
          <div className="px-5 pt-4 pb-2">
            <div className="grid grid-cols-2 p-1 bg-charcoal-950 rounded-xl border border-white/5 text-xs font-semibold">
              <button
                onClick={() => setDeliveryType('delivery')}
                className={`flex items-center justify-center space-x-2 py-2 rounded-lg transition-all ${
                  deliveryType === 'delivery'
                    ? 'bg-fiery text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>Express Delivery</span>
              </button>
              <button
                onClick={() => setDeliveryType('pickup')}
                className={`flex items-center justify-center space-x-2 py-2 rounded-lg transition-all ${
                  deliveryType === 'pickup'
                    ? 'bg-fiery text-white shadow-md'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Dine-In / Pickup</span>
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-charcoal-800 border border-white/5 flex items-center justify-center mx-auto mb-4 text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-white">Your Cart is Empty</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                  Looks like you haven't spotted your favorite cravings yet!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-6 py-2.5 rounded-full bg-gradient-to-r from-fiery to-gold text-charcoal-950 font-bold text-xs shadow-glow-orange"
                >
                  Explore Delicious Menu
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Order Items</span>
                  <button
                    onClick={clearCart}
                    className="text-xs text-rose-400 hover:text-rose-300 font-medium"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  {cartItems.map((item) => {
                    const itemKey = item.cartId || item.id;
                    return (
                      <div
                        key={itemKey}
                        className="p-3 rounded-2xl glass-card flex items-center justify-between gap-3 border border-white/5"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-1.5 flex-wrap">
                            <span className={item.isVeg ? 'veg-indicator scale-75' : 'non-veg-indicator scale-75'} />
                            <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                              {item.name}
                            </h4>
                            {item.portion && (
                              <span className="px-1.5 py-0.5 rounded-md bg-gold/15 text-gold border border-gold/30 text-[10px] font-bold">
                                {item.portion}
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-black text-fiery mt-0.5">
                            ₹{item.price * item.quantity}
                            <span className="text-[10px] text-gray-400 font-normal ml-1">
                              (₹{item.price} each)
                            </span>
                          </div>
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center space-x-1.5 bg-charcoal-800 rounded-lg p-1 border border-white/10 shrink-0">
                          <button
                            onClick={() => updateQuantity(itemKey, -1)}
                            className="p-1 text-gray-400 hover:text-white"
                            aria-label="Decrease"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white px-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(itemKey, 1)}
                            className="p-1 text-gold hover:text-white"
                            aria-label="Increase"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(itemKey)}
                          className="p-1.5 text-gray-500 hover:text-rose-400 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Promo Code Box */}
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                      placeholder="Enter promo code (e.g. SPOT50)"
                      className="flex-1 bg-charcoal-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-fiery uppercase"
                    />
                    <button
                      onClick={() => handleApply()}
                      className="px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 text-xs font-bold text-white border border-white/10 transition-colors"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Preset quick codes */}
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleApply('SPOT50')}
                      className="text-[10px] bg-fiery/10 border border-fiery/30 text-fiery px-2 py-0.5 rounded-md hover:bg-fiery/20 font-semibold"
                    >
                      SPOT50 (50% Off)
                    </button>
                    <button
                      onClick={() => handleApply('TASTY20')}
                      className="text-[10px] bg-gold/10 border border-gold/30 text-gold px-2 py-0.5 rounded-md hover:bg-gold/20 font-semibold"
                    >
                      TASTY20 (20% Off)
                    </button>
                  </div>

                  {appliedCoupon && (
                    <div className="mt-2.5 p-2 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-400">
                      <div className="flex items-center space-x-1.5">
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>Code <strong>{appliedCoupon.code}</strong> applied ({appliedCoupon.discountDesc})</span>
                      </div>
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-gray-400 hover:text-white text-[11px] underline ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Free Delivery Banner */}
                {deliveryType === 'delivery' && (
                  <div className="p-3 rounded-xl bg-charcoal-850 border border-white/5 text-xs flex items-center justify-between">
                    {subtotal >= 499 ? (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-gold" />
                        Unlocked FREE Delivery!
                      </span>
                    ) : (
                      <span className="text-gray-400">
                        Add <strong className="text-fiery">₹{499 - subtotal}</strong> more for FREE Delivery!
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer: Summary & Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-charcoal-850 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Item Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{discount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-400">
                  <span>Delivery Partner Fee</span>
                  <span>{deliveryFee === 0 ? <span className="text-emerald-400">FREE</span> : `₹${deliveryFee}`}</span>
                </div>

                <div className="flex justify-between text-gray-400">
                  <span>GST & Restaurant Packaging (5%)</span>
                  <span>₹{gst}</span>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline text-white">
                  <span className="text-sm font-bold">To Pay</span>
                  <span className="text-xl font-black text-gold">₹{grandTotal}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  onProceedToCheckout();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-gradient-to-r from-fiery to-gold text-charcoal-950 font-black text-sm uppercase tracking-wide hover:shadow-glow-orange transition-all duration-200 active:scale-98"
              >
                <span>Proceed to Checkout (₹{grandTotal})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
