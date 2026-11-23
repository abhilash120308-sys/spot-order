import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  userId: { type: String },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    landmark: { type: String },
    instructions: { type: String },
  },
  items: [
    {
      id: String,
      name: String,
      price: Number,
      quantity: Number,
    }
  ],
  deliveryType: { type: String, enum: ['delivery', 'pickup'], default: 'delivery' },
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  deliveryFee: { type: Number, default: 0 },
  gst: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['upi', 'card', 'cod'], default: 'upi' },
  paymentStatus: { type: String, default: 'paid' },
  orderStatus: {
    type: String,
    enum: ['received', 'in_kitchen', 'out_for_delivery', 'delivered', 'cancelled'],
    default: 'received'
  },
  placedAt: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
