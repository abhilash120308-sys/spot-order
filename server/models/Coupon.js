import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountPercent: { type: Number, required: true },
  maxDiscount: { type: Number, required: true },
  minOrder: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
});

export const Coupon = mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);
