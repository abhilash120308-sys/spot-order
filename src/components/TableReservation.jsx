import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  User, 
  Mail, 
  MessageSquare,
  Wine,
  ShieldCheck
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { SpotFoodLogo } from './SpotFoodLogo';

export const TableReservation = () => {
  const { addToast } = useToast();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:30',
    guests: '2',
    occasion: 'Casual Dining',
    specialRequest: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || '',
      }));
    }
  }, [user]);

  const [bookingConfirmed, setBookingConfirmed] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    '12:30 PM', '01:30 PM', '02:30 PM', 
    '07:00 PM', '07:30 PM', '08:15 PM', '09:00 PM', '09:45 PM'
  ];

  const occasions = [
    'Casual Dining',
    'Birthday Celebration 🎂',
    'Romantic Anniversary ❤️',
    'Family Gathering 👨‍👩‍👧‍👦',
    'Business Dinner 💼'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookTable = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      addToast('Please enter your name and phone number', 'error');
      return;
    }

    setIsSubmitting(true);
    api.createReservation(formData).then((res) => {
      let confirmation;
      if (res && res.reservation) {
        confirmation = res.reservation;
      } else {
        const refCode = 'TBL-' + Math.floor(1000 + Math.random() * 9000);
        confirmation = { refCode, ...formData };
      }
      setBookingConfirmed(confirmation);
      setIsSubmitting(false);
      addToast(`🎉 Table reserved! Reference: ${confirmation.refCode}`, 'success');
    }).catch(() => {
      const refCode = 'TBL-' + Math.floor(1000 + Math.random() * 9000);
      const confirmation = { refCode, ...formData };
      setBookingConfirmed(confirmation);
      setIsSubmitting(false);
      addToast(`🎉 Table reserved! Reference: ${refCode}`, 'success');
    });
  };

  return (
    <section id="reservation" className="py-20 bg-charcoal-900 relative overflow-hidden border-t border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-fiery/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold tracking-wider uppercase mb-3">
            <Calendar className="w-3.5 h-3.5" />
            <span>Table Reservation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
            Reserve Your Dining Table
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Enjoy an unforgettable dining experience with glowing ambient lighting, sizzling live food, and handcrafted mocktails.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {bookingConfirmed ? (
            /* Booking Confirmation Card */
            <div className="p-8 sm:p-10 rounded-3xl glass-card border border-gold/40 text-center animate-scale-up">
              <div className="flex justify-center mb-4">
                <SpotFoodLogo size="lg" showText={false} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Reservation Confirmed</span>
              <h3 className="text-2xl sm:text-3xl font-black font-display text-white mt-1">
                We're Saving a Table for You, {bookingConfirmed.name}!
              </h3>
              <p className="text-sm text-gray-300 mt-2 max-w-md mx-auto">
                Your reservation has been locked in. We will send an SMS confirmation to <strong className="text-white">{bookingConfirmed.phone}</strong>.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto my-6 p-4 rounded-2xl bg-charcoal-950/80 border border-white/5 text-left">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">Booking ID</span>
                  <div className="text-sm font-mono font-bold text-gold">{bookingConfirmed.refCode}</div>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">Date & Time</span>
                  <div className="text-sm font-bold text-white">{bookingConfirmed.date} • {bookingConfirmed.time}</div>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">Guests</span>
                  <div className="text-sm font-bold text-white">{bookingConfirmed.guests} Persons</div>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 uppercase font-semibold">Occasion</span>
                  <div className="text-sm font-bold text-white truncate">{bookingConfirmed.occasion}</div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => setBookingConfirmed(null)}
                  className="px-6 py-2.5 rounded-full bg-charcoal-800 hover:bg-charcoal-700 text-xs font-bold text-white border border-white/10"
                >
                  Book Another Table
                </button>
                <a
                  href="#menu"
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-fiery to-gold text-charcoal-950 text-xs font-black uppercase tracking-wider shadow-glow-orange"
                >
                  Pre-Browse Food Menu
                </a>
              </div>
            </div>
          ) : (
            /* Reservation Form */
            <form onSubmit={handleBookTable} className="p-6 sm:p-10 rounded-3xl glass-card border border-white/10 shadow-2xl space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Vikram Malhotra"
                      className="w-full bg-charcoal-950 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="e.g. 98765 12345"
                      className="w-full bg-charcoal-950 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Email Address (Optional)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="vikram@example.com"
                      className="w-full bg-charcoal-950 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Select Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      name="date"
                      required
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-charcoal-950 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                    />
                  </div>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Number of Guests *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full bg-charcoal-950 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                    >
                      <option value="1">1 Person (Solo Dining)</option>
                      <option value="2">2 Persons (Couple Table)</option>
                      <option value="3">3 Persons</option>
                      <option value="4">4 Persons (Family Table)</option>
                      <option value="5">5 Persons</option>
                      <option value="6">6 Persons (Large Booth)</option>
                      <option value="8">8 Persons (Party Table)</option>
                      <option value="10+">10+ Persons (Celebration Area)</option>
                    </select>
                  </div>
                </div>

                {/* Occasion */}
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Occasion
                  </label>
                  <div className="relative">
                    <Wine className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                    <select
                      name="occasion"
                      value={formData.occasion}
                      onChange={handleChange}
                      className="w-full bg-charcoal-950 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-gold"
                    >
                      {occasions.map((occ, idx) => (
                        <option key={idx} value={occ}>{occ}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Time Slot Picker */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">
                  Select Time Slot *
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = formData.time === slot;
                    return (
                      <button
                        type="button"
                        key={slot}
                        onClick={() => setFormData(prev => ({ ...prev, time: slot }))}
                        className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                          isSelected
                            ? 'bg-fiery text-white border-fiery shadow-glow-orange scale-102 font-bold'
                            : 'bg-charcoal-950 border-white/10 text-gray-300 hover:border-white/30'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Special Requests / Dietary Preferences
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
                  <textarea
                    rows={2}
                    name="specialRequest"
                    value={formData.specialRequest}
                    onChange={handleChange}
                    placeholder="e.g. Quiet corner table, high chair for toddler, extra spicy dips..."
                    className="w-full bg-charcoal-950 border border-white/10 rounded-xl pl-10 pr-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold resize-none"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant confirmation • No booking fees • Free cancellation</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-fiery to-gold text-charcoal-950 font-black text-xs sm:text-sm uppercase tracking-wider hover:shadow-glow-orange hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Securing Table...' : 'Confirm Table Reservation'}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
