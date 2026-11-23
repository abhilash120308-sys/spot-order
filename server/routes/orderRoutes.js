import express from 'express';
import { memoryStore } from '../store/memoryStore.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// POST /api/orders (Create new order)
router.post('/', (req, res) => {
  try {
    const { customer, items, subtotal, discount, deliveryFee, gst, grandTotal, paymentMethod, deliveryType } = req.body;

    if (!customer || !customer.name || !customer.phone) {
      return res.status(400).json({ success: false, message: 'Customer name and phone number are required.' });
    }

    if (!items || !items.length) {
      return res.status(400).json({ success: false, message: 'Cart items cannot be empty.' });
    }

    const order = memoryStore.createOrder({
      customer,
      items,
      subtotal,
      discount: discount || 0,
      deliveryFee: deliveryFee || 0,
      gst: gst || 0,
      grandTotal: grandTotal || subtotal,
      paymentMethod: paymentMethod || 'upi',
      deliveryType: deliveryType || 'delivery',
      estimatedTime: '25-30 mins',
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/orders (All orders)
router.get('/', (req, res) => {
  res.json({ success: true, data: memoryStore.getAllOrders() });
});

// GET /api/orders/:id (Get order by ID)
router.get('/:id', (req, res) => {
  const order = memoryStore.getOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ success: false, message: 'Order not found.' });
  }
  res.json({ success: true, data: order });
});

// PUT /api/orders/:id/status (Admin updates order status)
router.put('/:id/status', (req, res) => {
  const { status } = req.body;
  const valid = ['received', 'in_kitchen', 'out_for_delivery', 'delivered', 'cancelled'];
  if (!valid.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid order status.' });
  }

  const updated = memoryStore.updateOrderStatus(req.params.id, status);
  if (!updated) {
    return res.status(404).json({ success: false, message: 'Order not found.' });
  }

  res.json({ success: true, message: `Order status updated to ${status}!`, order: updated });
});

export default router;
