import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  isVeg: { type: Boolean, default: true },
  spiceLevel: { type: String, default: 'Medium' },
  rating: { type: Number, default: 4.8 },
  reviewsCount: { type: Number, default: 100 },
  description: { type: String, default: '' },
  image: { type: String, required: true },
  popular: { type: Boolean, default: false },
  prepTime: { type: String, default: '15 min' },
  createdAt: { type: Date, default: Date.now },
});

export const MenuItem = mongoose.models.MenuItem || mongoose.model('MenuItem', menuItemSchema);
