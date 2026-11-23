import express from 'express';
import { memoryStore } from '../store/memoryStore.js';
import { requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// GET /api/menu
router.get('/', (req, res) => {
  try {
    const { category, isVeg, search } = req.query;
    let vegBool = undefined;
    if (isVeg === 'true') vegBool = true;
    if (isVeg === 'false') vegBool = false;

    const items = memoryStore.getMenuItems(category, vegBool, search);
    res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/menu/:id
router.get('/:id', (req, res) => {
  const item = memoryStore.menu.find(i => i.id === req.params.id);
  if (!item) {
    return res.status(404).json({ success: false, message: 'Menu item not found.' });
  }
  res.json({ success: true, data: item });
});

// POST /api/menu (Admin only)
router.post('/', requireAdmin, (req, res) => {
  try {
    const { name, category, price, isVeg, image, description } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({ success: false, message: 'Name, category, and price are required.' });
    }
    const created = memoryStore.addMenuItem(req.body);
    res.status(201).json({ success: true, message: 'Item added successfully!', data: created });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/menu/:id (Admin only)
router.put('/:id', requireAdmin, (req, res) => {
  try {
    const updated = memoryStore.updateMenuItem(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Item not found.' });
    }
    res.json({ success: true, message: 'Item updated!', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/menu/:id (Admin only)
router.delete('/:id', requireAdmin, (req, res) => {
  const deleted = memoryStore.deleteMenuItem(req.params.id);
  if (!deleted) {
    return res.status(404).json({ success: false, message: 'Item not found.' });
  }
  res.json({ success: true, message: 'Item removed successfully.' });
});

export default router;
