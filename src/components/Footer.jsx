import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  Heart,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { InstagramIcon, FacebookIcon, TwitterIcon, YoutubeIcon } from './SocialIcons';
import { useToast } from '../context/ToastContext';
import { SpotFoodLogo } from './SpotFoodLogo';

export const Footer = ({ onOpenReservation }) => {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }
    addToast('🎉 Welcome to Raja\'s Foods Club! Check your inbox for 20% off.', 'success');
    setEmail('');
  };

  return (
    <footer id="contact" className="bg-charcoal-950 border-t border-white/10 pt-16 pb-12 relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-fiery/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Column: Option 3 Luxury Neon Urban Diner Logo */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="inline-block focus:outline-none transition-transform duration-300 hover:scale-105">
              <SpotFoodLogo size="lg" />
            </a>

            <p className="text-xs sm:text-sm text-gray-400 max-w-sm leading-relaxed">
              <span className="text-metallic-gold font-bold">RAJA</span> <span className="text-neon-orange font-bold">FOODS</span> is your premier luxury urban dining destination for mouth-watering Hyderabadi dum biryanis, 
              sizzling charcoal starters, authentic mix ghee specialties, and decadent desserts. 
              Always fresh, fiery, and prepared to culinary perfection.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-charcoal-850 hover:bg-fiery hover:text-white border border-white/5 flex items-center justify-center text-gray-300 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-charcoal-850 hover:bg-fiery hover:text-white border border-white/5 flex items-center justify-center text-gray-300 transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-charcoal-850 hover:bg-fiery hover:text-white border border-white/5 flex items-center justify-center text-gray-300 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-charcoal-850 hover:bg-fiery hover:text-white border border-white/5 flex items-center justify-center text-gray-300 transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gold uppercase tracking-wider font-display">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-fiery" /> Home
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-fiery" /> Interactive Menu
                </a>
              </li>
              <li>
                <a href="#specials" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-fiery" /> Chef's Specials
                </a>
              </li>
              <li>
                <button onClick={onOpenReservation} className="hover:text-white transition-colors flex items-center gap-1.5 text-left">
                  <ChevronRight className="w-3 h-3 text-fiery" /> Table Reservation
                </button>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ChevronRight className="w-3 h-3 text-fiery" /> Customer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gold uppercase tracking-wider font-display">
              Hours & Location
            </h4>
            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start space-x-2">
                <Clock className="w-4 h-4 text-fiery shrink-0 mt-0.5" />
                <div>
                  <div className="text-white font-semibold">11:00 AM – 11:30 PM</div>
                  <div className="text-[11px] text-emerald-400">Open All 7 Days (Dine-in & Delivery)</div>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>42 Flame Boulevard, Indiranagar 100ft Road, Bangalore, KA 560038</span>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-fiery shrink-0" />
                <a href="tel:+919876543210" className="text-white hover:text-fiery font-medium">
                  +91 98765 43210
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gold shrink-0" />
                <a href="mailto:contact@rajafoods.in" className="hover:text-white">
                  contact@rajafoods.in
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-gold uppercase tracking-wider font-display">
              Secret Foodie Perks
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Subscribe to get secret discount codes, weekend special previews, and 20% off your first online order.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-fiery"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-fiery hover:bg-fiery-hover text-white text-xs font-bold transition-all shadow-glow-orange flex items-center justify-center space-x-1.5"
              >
                <span>Join Foodie Club</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
          <p>© {new Date().getFullYear()} Raja's Foods Inc. All rights reserved. "Cravings Solved."</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-gray-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-gray-400 cursor-pointer">FSSAI Lic: 11223344556677</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
