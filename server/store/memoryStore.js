import bcrypt from 'bcryptjs';
import { MENU_ITEMS } from '../../src/data/menuData.js';

// Pre-seeded initial dataset
export const initialMenuItems = [...MENU_ITEMS];

class MemoryStore {
  constructor() {
    this.users = [];
    this.menu = [...initialMenuItems];
    this.orders = [
      {
        orderId: 'SF-10492',
        customer: {
          name: 'Aarav Sharma',
          phone: '9876543210',
          email: 'aarav@example.com',
          address: '402 Sunset Apts, 100ft Road',
          landmark: 'Near Metro',
          instructions: 'Leave at door',
        },
        items: [
          { id: 'biryani-1', name: 'Chicken Dum Biryani (Regular)', price: 200, quantity: 2 },
          { id: 'dry-3', name: 'Chicken 65 (Full)', price: 170, quantity: 1 }
        ],
        subtotal: 570,
        discount: 100,
        deliveryFee: 0,
        gst: 24,
        grandTotal: 494,
        paymentMethod: 'upi',
        paymentStatus: 'paid',
        orderStatus: 'in_kitchen',
        deliveryType: 'delivery',
        placedAt: '12:45 PM',
        createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
      },
      {
        orderId: 'SF-10491',
        customer: {
          name: 'Priya Mukherjee',
          phone: '9812345678',
          email: 'priya@example.com',
          address: '12 Rose Villa, Indiranagar',
          landmark: 'Opp Cafe',
          instructions: 'Call upon arrival',
        },
        items: [
          { id: 'ghee-7', name: 'Mixed Non Veg Biryani (Regular)', price: 320, quantity: 1 },
          { id: 'dry-8', name: 'Chicken Fried Wings (Full - 8 pc)', price: 200, quantity: 1 }
        ],
        subtotal: 520,
        discount: 100,
        deliveryFee: 0,
        gst: 21,
        grandTotal: 441,
        paymentMethod: 'card',
        paymentStatus: 'paid',
        orderStatus: 'out_for_delivery',
        deliveryType: 'delivery',
        placedAt: '12:30 PM',
        createdAt: new Date(Date.now() - 35 * 60000).toISOString(),
      }
    ];

    this.reservations = [
      {
        refCode: 'TBL-8841',
        name: 'Rohan Deshmukh',
        phone: '9876501234',
        email: 'rohan@example.com',
        date: new Date().toISOString().split('T')[0],
        time: '08:15 PM',
        guests: '4',
        occasion: 'Romantic Anniversary ❤️',
        specialRequest: 'Corner table with warm ambient glow',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      }
    ];

    this.coupons = [
      { code: 'SPOT50', discountPercent: 50, maxDiscount: 150, minOrder: 299, active: true },
      { code: 'TASTY20', discountPercent: 20, maxDiscount: 100, minOrder: 199, active: true },
    ];

    // Seed default admin user (admin@spotfood.in / admin123)
    const salt = bcrypt.genSaltSync(10);
    this.users.push({
      id: 'user-admin',
      name: 'SpotFood Master Admin',
      email: 'admin@spotfood.in',
      phone: '9876543210',
      passwordHash: bcrypt.hashSync('admin123', salt),
      role: 'admin',
      createdAt: new Date().toISOString(),
    });

    // Seed sample customer user (customer@spotfood.in / customer123)
    this.users.push({
      id: 'user-demo',
      name: 'Rahul Sharma',
      email: 'customer@spotfood.in',
      phone: '9988776655',
      passwordHash: bcrypt.hashSync('customer123', salt),
      role: 'customer',
      createdAt: new Date().toISOString(),
    });
  }

  // --- User operations ---
  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  findUserById(id) {
    return this.users.find(u => u.id === id);
  }

  createUser(userData) {
    const newUser = {
      id: 'usr-' + Date.now(),
      ...userData,
      createdAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  // --- Menu operations ---
  getMenuItems(category, isVeg, search) {
    return this.menu.filter(item => {
      if (category && category !== 'all' && item.category !== category) return false;
      if (isVeg !== undefined && item.isVeg !== isVeg) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!item.name.toLowerCase().includes(q) && !item.description.toLowerCase().includes(q)) {
          return false;
        }
      }
      return true;
    });
  }

  addMenuItem(item) {
    const newItem = {
      id: 'item-' + Date.now(),
      rating: 4.8,
      reviewsCount: 1,
      popular: false,
      prepTime: '15 min',
      ...item,
    };
    this.menu.push(newItem);
    return newItem;
  }

  updateMenuItem(id, updates) {
    const idx = this.menu.findIndex(i => i.id === id);
    if (idx === -1) return null;
    this.menu[idx] = { ...this.menu[idx], ...updates };
    return this.menu[idx];
  }

  deleteMenuItem(id) {
    const idx = this.menu.findIndex(i => i.id === id);
    if (idx === -1) return false;
    this.menu.splice(idx, 1);
    return true;
  }

  // --- Order operations ---
  createOrder(orderData) {
    const newOrder = {
      orderId: 'SF-' + Math.floor(10000 + Math.random() * 90000),
      orderStatus: 'received',
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      createdAt: new Date().toISOString(),
      ...orderData,
    };
    this.orders.unshift(newOrder);
    return newOrder;
  }

  getOrderById(orderId) {
    return this.orders.find(o => o.orderId === orderId);
  }

  getAllOrders() {
    return this.orders;
  }

  updateOrderStatus(orderId, status) {
    const order = this.orders.find(o => o.orderId === orderId);
    if (order) {
      order.orderStatus = status;
      return order;
    }
    return null;
  }

  // --- Reservations ---
  createReservation(resData) {
    const newRes = {
      refCode: 'TBL-' + Math.floor(1000 + Math.random() * 9000),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      ...resData,
    };
    this.reservations.unshift(newRes);
    return newRes;
  }

  getAllReservations() {
    return this.reservations;
  }

  // --- Coupons ---
  getCoupon(code) {
    return this.coupons.find(c => c.code === code.toUpperCase() && c.active);
  }

  // --- Admin stats ---
  getStats() {
    const totalOrders = this.orders.length;
    const totalRevenue = this.orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
    const activeOrders = this.orders.filter(o => ['received', 'in_kitchen', 'out_for_delivery'].includes(o.orderStatus)).length;
    const totalUsers = this.users.length;
    const totalReservations = this.reservations.length;

    return {
      totalOrders,
      totalRevenue,
      activeOrders,
      totalUsers,
      totalReservations,
      menuCount: this.menu.length,
    };
  }
}

export const memoryStore = new MemoryStore();
