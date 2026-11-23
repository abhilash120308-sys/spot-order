import express from 'express';
import { memoryStore } from '../store/memoryStore.js';

const router = express.Router();

// POST /api/coupons/verify
router.post('/verify', (req, res) => {
  const { code, subtotal } = req.body;
  if (!code) {
    return res.status(400).json({ success: false, message: 'Coupon code required.' });
  }

  const coupon = memoryStore.getCoupon(code);
  if (!coupon) {
    return res.status(404).json({ success: false, message: 'Invalid or expired coupon code.' });
  }

  if (subtotal < coupon.minOrder) {
    return res.status(400).json({
      success: false,
      message: `Coupon ${coupon.code} requires a minimum order of ₹${coupon.minOrder}.`,
    });
  }

  const calculatedDiscount = Math.min(
    Math.round(subtotal * (coupon.discountPercent / 100)),
    coupon.maxDiscount
  );

  res.json({
    success: true,
    message: `🎉 Coupon ${coupon.code} applied! You saved ₹${calculatedDiscount}.`,
    coupon: {
      code: coupon.code,
      discount: calculatedDiscount,
      discountPercent: coupon.discountPercent,
    },
  });
});

// GET /api/coupons
router.get('/', (req, res) => {
  res.json({ success: true, data: memoryStore.coupons });
});

export default router;
