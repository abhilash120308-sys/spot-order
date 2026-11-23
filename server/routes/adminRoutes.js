import express from 'express';
import { memoryStore } from '../store/memoryStore.js';

const router = express.Router();

// GET /api/admin/stats
router.get('/stats', (req, res) => {
  try {
    const stats = memoryStore.getStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/admin/orders
router.get('/orders', (req, res) => {
  res.json({ success: true, data: memoryStore.getAllOrders() });
});

// GET /api/admin/users
router.get('/users', (req, res) => {
  const safeUsers = memoryStore.users.map(u => ({
    id: u.id,
    name: u.name,
    email: u.email,
    phone: u.phone,
    role: u.role,
    createdAt: u.createdAt,
  }));
  res.json({ success: true, data: safeUsers });
});

export default router;
