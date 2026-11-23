import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('rajafoods_cart') || localStorage.getItem('spotfood_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [deliveryType, setDeliveryType] = useState('delivery'); // 'delivery' | 'pickup'

  useEffect(() => {
    try {
      localStorage.setItem('rajafoods_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const addToCart = (item, quantity = 1, selectedPortion = null) => {
    const portionName = selectedPortion ? selectedPortion.name : (item.portion || (item.portions && item.portions[0]?.name) || '');
    const price = selectedPortion ? selectedPortion.price : (item.price || item.portions?.[0]?.price || 0);
    const cartId = portionName ? `${item.id}-${portionName}` : item.id;

    setCartItems(prev => {
      const existing = prev.find(i => (i.cartId || i.id) === cartId);
      if (existing) {
        return prev.map(i =>
          (i.cartId || i.id) === cartId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          ...item,
          cartId,
          portion: portionName,
          price,
          quantity,
        }
      ];
    });
  };

  const updateQuantity = (cartId, delta) => {
    setCartItems(prev => {
      return prev
        .map(i => {
          const currentId = i.cartId || i.id;
          if (currentId === cartId) {
            const newQty = i.quantity + delta;
            return newQty > 0 ? { ...i, quantity: newQty } : null;
          }
          return i;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(i => (i.cartId || i.id) !== cartId));
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setCouponCode('');
  };

  const getItemQuantity = (itemId, portionName = null) => {
    if (portionName) {
      const targetCartId = `${itemId}-${portionName}`;
      const found = cartItems.find(i => (i.cartId || i.id) === targetCartId);
      return found ? found.quantity : 0;
    }
    // Total for this dish across all portions
    return cartItems
      .filter(i => i.id === itemId)
      .reduce((acc, i) => acc + i.quantity, 0);
  };

  // Calculations
  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Coupons
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.code === 'RAJA50' || appliedCoupon.code === 'SPOT50') {
      discount = Math.min(Math.round(subtotal * 0.5), 150);
    } else if (appliedCoupon.code === 'TASTY20') {
      discount = Math.min(Math.round(subtotal * 0.2), 100);
    }
  }

  const deliveryFee = deliveryType === 'pickup' || subtotal === 0 ? 0 : subtotal > 499 ? 0 : 40;
  const gst = Math.round((subtotal - discount) * 0.05); // 5% GST on food
  const grandTotal = Math.max(0, subtotal - discount + deliveryFee + gst);

  const applyCoupon = (code) => {
    const trimmed = code.trim().toUpperCase();
    if (trimmed === 'RAJA50' || trimmed === 'SPOT50') {
      if (subtotal < 299) {
        return { success: false, message: 'RAJA50 requires a minimum order of ₹299.' };
      }
      setAppliedCoupon({ code: 'RAJA50', discountDesc: '50% OFF (Up to ₹150)' });
      return { success: true, message: '🎉 Code RAJA50 applied! ₹150 saved.' };
    }
    if (trimmed === 'TASTY20') {
      setAppliedCoupon({ code: 'TASTY20', discountDesc: '20% OFF (Up to ₹100)' });
      return { success: true, message: '🎉 Code TASTY20 applied successfully!' };
    }
    return { success: false, message: 'Invalid coupon code. Try RAJA50 or TASTY20!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        getItemQuantity,
        totalItemCount,
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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
