import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  Calendar, 
  Menu as MenuIcon, 
  X, 
  User, 
  LayoutDashboard,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { SpotFoodLogo } from './SpotFoodLogo';

export const Navbar = ({ onOpenReservation }) => {
  const { totalItemCount, setIsCartOpen } = useCart();
  const { user, isAdmin, setIsAuthModalOpen, setIsAdminModalOpen } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isServerLive, setIsServerLive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);

    // Probe backend API
    api.checkHealth().then((res) => {
      if (res && res.status === 'online') {
        setIsServerLive(true);
      }
    }).catch(() => {});

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Specials', href: '#specials' },
    { name: 'Reserve', href: '#reservation' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3 shadow-xl'
            : 'bg-gradient-to-b from-charcoal-950/90 via-charcoal-900/60 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo: Option 3 - Luxury Neon Urban Diner Circular Emblem */}
            <a
              href="#home"
              className="flex items-center focus:outline-none transition-transform duration-300 hover:scale-105"
              aria-label="Spot Food Home"
            >
              <SpotFoodLogo size="md" />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 bg-charcoal-850/80 px-4 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-1.5 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Actions: Admin, Auth, Book Table & Cart Drawer Trigger */}
            <div className="flex items-center space-x-2.5">
              {/* Server Status Pill */}
              <div className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-charcoal-800 border border-white/5 text-[10px] font-semibold">
                <span className={`w-1.5 h-1.5 rounded-full ${isServerLive ? 'bg-emerald-400 animate-pulse' : 'bg-emerald-400'}`} />
                <span className="text-emerald-400">
                  {isServerLive ? 'API: Live (5000)' : 'API: Fullstack Ready'}
                </span>
              </div>

              {/* Admin Panel Trigger (if Admin) */}
              {isAdmin && (
                <button
                  onClick={() => setIsAdminModalOpen(true)}
                  className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gold/15 text-gold border border-gold/40 text-xs font-bold hover:bg-gold/25 transition-all shadow-glow-gold"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </button>
              )}

              {/* User Profile / Login Trigger */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 border border-white/10 text-xs font-semibold text-gray-200 transition-all hover:border-fiery/40"
              >
                <User className="w-4 h-4 text-fiery" />
                <span className="hidden sm:inline">
                  {user ? user.name.split(' ')[0] : 'Sign In'}
                </span>
              </button>

              {/* Table Booking CTA */}
              <button
                onClick={onOpenReservation}
                className="hidden lg:inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-semibold bg-white/5 hover:bg-white/10 text-gold border border-gold/30 hover:border-gold transition-all duration-300 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-gold" />
                <span>Book Table</span>
              </button>

              {/* Shopping Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative flex items-center justify-center p-2.5 rounded-xl bg-charcoal-800 hover:bg-charcoal-700 border border-white/10 text-white transition-all duration-200 hover:border-fiery/50 group"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5 text-gray-200 group-hover:text-fiery transition-colors" />
                {totalItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 rounded-full bg-gradient-to-r from-fiery to-gold text-charcoal-950 font-bold text-xs flex items-center justify-center shadow-glow-orange animate-bounce">
                    {totalItemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-charcoal-800 text-gray-300 hover:text-white border border-white/5"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-dropdown border-b border-white/10 px-4 pt-4 pb-6 mt-3 space-y-3 animate-fadeIn">
            <div className="flex flex-col space-y-1">
              {navLinks.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 rounded-lg text-base font-medium text-gray-200 hover:bg-fiery/10 hover:text-fiery transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-gray-500">→</span>
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              {isAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdminModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-gold/20 text-gold border border-gold/40 font-bold text-xs"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Open Admin Console</span>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAuthModalOpen(true);
                }}
                className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-charcoal-800 text-white border border-white/10 font-bold text-xs"
              >
                <User className="w-4 h-4 text-fiery" />
                <span>{user ? `Account (${user.name})` : 'Sign In / Register'}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-fiery to-gold text-charcoal-950 font-bold text-sm shadow-glow-orange"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve a Table</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Floating Bottom Quick Cart Button (Mobile Only) */}
      {totalItemCount > 0 && (
        <div className="fixed bottom-5 left-4 right-4 z-30 sm:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full flex items-center justify-between px-5 py-3.5 rounded-2xl bg-gradient-to-r from-fiery to-gold text-charcoal-950 font-bold shadow-2xl shadow-fiery/40"
          >
            <div className="flex items-center space-x-3">
              <span className="w-7 h-7 rounded-full bg-charcoal-950 text-gold flex items-center justify-center text-xs font-black">
                {totalItemCount}
              </span>
              <span className="text-sm uppercase tracking-wide">View Your Order</span>
            </div>
            <span className="text-sm font-extrabold flex items-center">
              Checkout →
            </span>
          </button>
        </div>
      )}
    </>
  );
};
