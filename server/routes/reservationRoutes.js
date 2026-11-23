import express from 'express';
import { memoryStore } from '../store/memoryStore.js';

const router = express.Router();

// POST /api/reservations (Book table)
router.post('/', (req, res) => {
  try {
    const { name, phone, email, date, time, guests, occasion, specialRequest } = req.body;
    if (!name || !phone || !date || !time) {
      return res.status(400).json({ success: false, message: 'Name, phone, date, and time are required.' });
    }

    const reservation = memoryStore.createReservation({
      name,
      phone,
      email: email || '',
      date,
      time,
      guests: guests || '2',
      occasion: occasion || 'Casual Dining',
      specialRequest: specialRequest || '',
    });

    res.status(201).json({
      success: true,
      message: 'Table reserved successfully!',
      reservation,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/reservations
router.get('/', (req, res) => {
  res.json({ success: true, data: memoryStore.getAllReservations() });
});

export default router;
