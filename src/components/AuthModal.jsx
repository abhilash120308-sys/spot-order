import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, ShieldCheck, Sparkles, LogOut, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { SpotFoodLogo } from './SpotFoodLogo';

export const AuthModal = () => {
  const { user, login, register, logout, isAuthModalOpen, setIsAuthModalOpen } = useAuth();
  const { addToast } = useToast();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await login(formData.email, formData.password);
        if (res.success) {
          addToast(`👋 Welcome, ${res.user.name}!`, 'success');
          setIsAuthModalOpen(false);
        } else {
          setError(res.message || 'Login failed.');
        }
      } else {
        if (!formData.name.trim()) {
          setError('Name is required');
          setLoading(false);
          return;
        }
        const res = await register(formData.name, formData.email, formData.password, formData.phone);
        if (res.success) {
          addToast(`🎉 Account created for ${res.user.name}!`, 'success');
          setIsAuthModalOpen(false);
        } else {
          setError(res.message || 'Registration failed.');
        }
      }
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (email, pass) => {
    setFormData(prev => ({ ...prev, email, password: pass }));
    login(email, pass).then(res => {
      if (res.success) {
        addToast(`Logged in as ${res.user.name} (${res.user.role})!`, 'success');
        setIsAuthModalOpen(false);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsAuthModalOpen(false)}
      />

      <div className="relative w-full max-w-md bg-charcoal-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 animate-scale-up">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 bg-charcoal-850 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SpotFoodLogo size="xs" showText={false} />
            <div>
              <h3 className="text-base font-bold font-display text-white">
                {user ? (
                  'Your Diner Profile'
                ) : mode === 'login' ? (
                  <>Sign In to <span className="text-metallic-gold">RAJA</span> <span className="text-neon-orange">FOODS</span></>
                ) : (
                  <>Create Account at <span className="text-metallic-gold">RAJA</span> <span className="text-neon-orange">FOODS</span></>
                )}
              </h3>
              <p className="text-[11px] text-gray-400">
                {user ? user.email : 'Order faster, save delivery preferences & earn rewards'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Logged in state */}
        {user ? (
          <div className="p-6 space-y-5 text-center">
            <div className="w-16 h-16 rounded-full bg-fiery/20 border-2 border-fiery flex items-center justify-center mx-auto text-fiery text-xl font-bold font-display">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">{user.name}</h4>
              <p className="text-xs text-gray-400">{user.email}</p>
              <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                user.role === 'admin' ? 'bg-gold/20 text-gold border border-gold/40' : 'bg-fiery/20 text-fiery'
              }`}>
                Role: {user.role}
              </span>
            </div>

            <div className="pt-4 border-t border-white/10 flex gap-3">
              <button
                onClick={() => {
                  logout();
                  addToast('You have been logged out.', 'info');
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-charcoal-800 hover:bg-rose-950/60 text-rose-400 border border-white/10 text-xs font-bold transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
              <button
                onClick={() => setIsAuthModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-fiery to-gold text-charcoal-950 text-xs font-black uppercase tracking-wider"
              >
                Continue Dining
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-4">
            {/* Tab switch */}
            <div className="grid grid-cols-2 p-1 bg-charcoal-950 rounded-xl border border-white/5 text-xs font-semibold">
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); }}
                className={`py-2 rounded-lg transition-all ${
                  mode === 'login' ? 'bg-fiery text-white shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); setError(''); }}
                className={`py-2 rounded-lg transition-all ${
                  mode === 'register' ? 'bg-fiery text-white shadow-md' : 'text-gray-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>

            {error && (
              <div className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-xs text-rose-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === 'register' && (
                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-charcoal-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-fiery"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-gray-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-charcoal-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-fiery"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full bg-charcoal-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-fiery"
                  />
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-[11px] font-semibold text-gray-300 mb-1">Phone (Optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="98765 43210"
                      className="w-full bg-charcoal-950 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-fiery"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-fiery to-gold text-charcoal-950 font-black text-xs uppercase tracking-wider hover:shadow-glow-orange transition-all mt-2 disabled:opacity-50"
              >
                {loading ? 'Processing...' : mode === 'login' ? 'Sign In to Account' : 'Create Account'}
              </button>
            </form>

            {/* Quick Demo Logins for Testing */}
            <div className="pt-3 border-t border-white/10">
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center mb-2">
                ⚡ Quick Demo One-Click Sign In
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('customer@rajafoods.in', 'customer123')}
                  className="p-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 border border-white/5 text-[11px] font-semibold text-gray-300 hover:text-white transition-all text-center"
                >
                  👤 Diner Account
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin@rajafoods.in', 'admin123')}
                  className="p-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 border border-gold/30 text-[11px] font-semibold text-gold hover:text-white transition-all text-center"
                >
                  👑 Admin Panel Access
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
