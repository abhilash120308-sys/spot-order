import React, { useState, useEffect } from 'react';
import { 
  X, 
  LayoutDashboard, 
  ShoppingBag, 
  Calendar, 
  UtensilsCrossed, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw 
} from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { SpotFoodLogo } from './SpotFoodLogo';

export const AdminModal = ({ isOpen, onClose }) => {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'reservations' | 'stats'
  const [stats, setStats] = useState({
    totalOrders: 14,
    totalRevenue: 12450,
    activeOrders: 4,
    totalUsers: 8,
    totalReservations: 6,
  });

  const [orders, setOrders] = useState([
    {
      orderId: 'RF-10492',
      customer: { name: 'Aarav Sharma', phone: '9876543210' },
      items: [{ name: 'Hyderabadi Chicken Dum Biryani', quantity: 2 }, { name: 'Crispy Wings', quantity: 1 }],
      grandTotal: 732,
      orderStatus: 'in_kitchen',
      placedAt: '12:45 PM',
    },
    {
      orderId: 'RF-10491',
      customer: { name: 'Priya Mukherjee', phone: '9812345678' },
      items: [{ name: 'Paneer Tikka Platter', quantity: 1 }, { name: 'Sizzling Brownie', quantity: 2 }],
      grandTotal: 511,
      orderStatus: 'out_for_delivery',
      placedAt: '12:30 PM',
    },
    {
      orderId: 'RF-10488',
      customer: { name: 'Rohan Deshmukh', phone: '9876501234' },
      items: [{ name: 'Butter Chicken & Naan', quantity: 2 }],
      grandTotal: 658,
      orderStatus: 'delivered',
      placedAt: '11:50 AM',
    },
  ]);

  const [reservations, setReservations] = useState([
    {
      refCode: 'TBL-8841',
      name: 'Rohan Deshmukh',
      phone: '9876501234',
      date: 'Today',
      time: '08:15 PM',
      guests: '4',
      occasion: 'Romantic Anniversary ❤️',
      status: 'confirmed',
    },
    {
      refCode: 'TBL-8839',
      name: 'Ananya Roy',
      phone: '9765432109',
      date: 'Tomorrow',
      time: '07:30 PM',
      guests: '2',
      occasion: 'Casual Dining',
      status: 'confirmed',
    },
  ]);

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  const loadData = async () => {
    try {
      const statsRes = await api.getAdminStats();
      if (statsRes && statsRes.data) {
        setStats(statsRes.data);
      }
      const ordersRes = await api.getAllOrders();
      if (ordersRes && ordersRes.data) {
        setOrders(ordersRes.data);
      }
      const resRes = await api.getAllReservations();
      if (resRes && resRes.data) {
        setReservations(resRes.data);
      }
    } catch {
      // Keep mock data if server not active
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.updateOrderStatus(orderId, newStatus);
    } catch {
      // local update
    }
    setOrders(prev =>
      prev.map(o => (o.orderId === orderId ? { ...o, orderStatus: newStatus } : o))
    );
    addToast(`Order ${orderId} updated to "${newStatus}"`, 'success');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-charcoal-900 border border-gold/40 rounded-3xl shadow-2xl overflow-hidden my-6 z-10 animate-scale-up flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-charcoal-850 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SpotFoodLogo size="sm" showText={false} />
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold font-display text-white">
                  <span className="text-metallic-gold">RAJA</span> <span className="text-neon-orange">FOODS</span> Restaurant Console
                </h3>
                <span className="px-2 py-0.5 rounded-md bg-gold/20 text-gold text-[10px] font-bold uppercase tracking-wider border border-gold/30">
                  Admin
                </span>
              </div>
              <p className="text-xs text-gray-400">Live order dispatching, booking management & revenue analytics</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={loadData}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Overview Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-charcoal-950/80 border-b border-white/5">
          <div className="p-3 rounded-2xl glass-card border border-white/5">
            <span className="text-[10px] text-gray-400 font-semibold uppercase">Total Revenue</span>
            <div className="text-xl font-black text-gold">₹{stats.totalRevenue.toLocaleString()}</div>
          </div>
          <div className="p-3 rounded-2xl glass-card border border-white/5">
            <span className="text-[10px] text-gray-400 font-semibold uppercase">Active Orders</span>
            <div className="text-xl font-black text-fiery">{orders.filter(o => o.orderStatus !== 'delivered').length} Active</div>
          </div>
          <div className="p-3 rounded-2xl glass-card border border-white/5">
            <span className="text-[10px] text-gray-400 font-semibold uppercase">Total Orders</span>
            <div className="text-xl font-black text-white">{orders.length}</div>
          </div>
          <div className="p-3 rounded-2xl glass-card border border-white/5">
            <span className="text-[10px] text-gray-400 font-semibold uppercase">Table Bookings</span>
            <div className="text-xl font-black text-emerald-400">{reservations.length}</div>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center space-x-2 px-5 pt-3 border-b border-white/10 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'orders'
                ? 'border-fiery text-fiery font-bold'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Live Orders ({orders.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('reservations')}
            className={`pb-3 px-2 border-b-2 transition-all flex items-center space-x-1.5 ${
              activeTab === 'reservations'
                ? 'border-fiery text-fiery font-bold'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Table Reservations ({reservations.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 flex-1 overflow-y-auto space-y-3">
          {activeTab === 'orders' && (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="p-4 rounded-2xl glass-card border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-gold text-sm">{order.orderId}</span>
                      <span className="text-xs text-gray-400">• {order.placedAt}</span>
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      {order.customer.name} <span className="text-xs text-gray-400 font-normal">({order.customer.phone})</span>
                    </div>
                    <div className="text-xs text-gray-300 mt-1">
                      {order.items.map((i, idx) => `${i.quantity}x ${i.name}`).join(', ')}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
                    <div className="text-right">
                      <div className="text-base font-black text-white">₹{order.grandTotal}</div>
                      <span className="text-[10px] text-emerald-400 font-semibold uppercase">Paid Online</span>
                    </div>

                    {/* Status Changer */}
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleUpdateStatus(order.orderId, e.target.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none transition-colors ${
                        order.orderStatus === 'received'
                          ? 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                          : order.orderStatus === 'in_kitchen'
                          ? 'bg-orange-950/80 border-orange-500/40 text-orange-300'
                          : order.orderStatus === 'out_for_delivery'
                          ? 'bg-blue-950/80 border-blue-500/40 text-blue-300'
                          : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
                      }`}
                    >
                      <option value="received">Received</option>
                      <option value="in_kitchen">In Kitchen 🍳</option>
                      <option value="out_for_delivery">Out for Delivery 🛵</option>
                      <option value="delivered">Delivered ✅</option>
                      <option value="cancelled">Cancelled ❌</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reservations' && (
            <div className="space-y-3">
              {reservations.map((res) => (
                <div
                  key={res.refCode}
                  className="p-4 rounded-2xl glass-card border border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-bold text-gold text-sm">{res.refCode}</span>
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-md font-semibold">
                        {res.status}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white mt-1">
                      {res.name} • <span className="text-gray-400 font-normal">{res.phone}</span>
                    </div>
                    <div className="text-xs text-gray-300 mt-0.5">
                      {res.occasion} • {res.guests} Guests
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-xs font-bold text-gold">{res.date}</div>
                    <div className="text-xs text-gray-400">{res.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
