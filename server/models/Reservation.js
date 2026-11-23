import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  refCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: String, required: true },
  occasion: { type: String, default: 'Casual Dining' },
  specialRequest: { type: String, default: '' },
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' },
  createdAt: { type: Date, default: Date.now },
});

export const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema);
