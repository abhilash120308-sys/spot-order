const API_BASE = import.meta.env.VITE_API_URL || '/api';

class ApiService {
  constructor() {
    this.token = localStorage.getItem('spotfood_token') || null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('spotfood_token', token);
    } else {
      localStorage.removeItem('spotfood_token');
    }
  }

  async request(endpoint, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'API request failed');
      }
      return data;
    } catch (err) {
      // If relative URL failed (e.g. running without vite proxy on standalone port), try direct localhost:5000
      if (!API_BASE.startsWith('http') && !options._retried) {
        try {
          const directRes = await fetch(`http://localhost:5000/api${endpoint}`, {
            ...options,
            _retried: true,
            headers,
          });
          const directData = await directRes.json();
          if (directRes.ok) return directData;
        } catch {}
      }

      console.warn(`[API] Remote call to ${endpoint} failed (${err.message}). Using local fallback.`);
      return null;
    }
  }

  // --- Health Check ---
  async checkHealth() {
    return this.request('/health');
  }

  // --- Auth ---
  async login(email, password) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(name, email, password, phone) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, phone }),
    });
  }

  async getMe() {
    return this.request('/auth/me');
  }

  // --- Menu ---
  async getMenu(category, isVeg, search) {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (isVeg !== undefined) params.append('isVeg', isVeg);
    if (search) params.append('search', search);

    const queryStr = params.toString() ? `?${params.toString()}` : '';
    return this.request(`/menu${queryStr}`);
  }

  // --- Orders ---
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getAllOrders() {
    return this.request('/orders');
  }

  async updateOrderStatus(orderId, status) {
    return this.request(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  // --- Reservations ---
  async createReservation(reservationData) {
    return this.request('/reservations', {
      method: 'POST',
      body: JSON.stringify(reservationData),
    });
  }

  async getAllReservations() {
    return this.request('/reservations');
  }

  // --- Coupons ---
  async verifyCoupon(code, subtotal) {
    return this.request('/coupons/verify', {
      method: 'POST',
      body: JSON.stringify({ code, subtotal }),
    });
  }

  // --- Admin ---
  async getAdminStats() {
    return this.request('/admin/stats');
  }
}

export const api = new ApiService();
