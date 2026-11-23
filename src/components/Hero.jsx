import React from 'react';
import { Flame, ArrowRight, Calendar, Star, Clock, ShieldCheck, Sparkles, ChefHat } from 'lucide-react';

export const Hero = ({ onOpenReservation }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background with Dark Food Imagery & Obsidian Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=85"
          alt="Spot Food Gourmet Dining"
          className="w-full h-full object-cover object-center scale-105 animate-pulse-slow filter brightness-40"
        />
        {/* Layered overlays for deep obsidian charcoal atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950 via-charcoal-900/95 to-charcoal-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-transparent to-charcoal-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-fiery/20 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline, Tagline, CTAs & Stats */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Luxury Diner Vibe Badge */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-fiery/15 to-gold/15 border border-gold/30 text-xs font-semibold tracking-wide backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-gold animate-spin" />
              <span className="text-metallic-gold font-bold">LUXURY URBAN DINER</span>
              <span className="text-gray-500">•</span>
              <span className="text-neon-orange font-bold">CRAVINGS SOLVED</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black font-display text-white tracking-tight leading-[1.1]">
              Cravings Hit Different At{' '}
              <span className="text-metallic-gold">
                SPOT
              </span>{' '}
              <span className="text-neon-orange">
                FOOD.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-300 max-w-xl font-normal leading-relaxed">
              Step into a world of sizzling charcoal grills, slow-dum Hyderabadi biryanis, 
              and handcrafted double smash burgers. Fresh ingredients, bold culinary flair, 
              and fast delivery straight to your doorstep or dining table.
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <a
                href="#menu"
                className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-fiery to-gold text-charcoal-950 font-bold text-sm sm:text-base hover:shadow-glow-orange hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <span>Explore Menu & Order</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenReservation}
                className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-full bg-charcoal-800/80 hover:bg-charcoal-700/80 text-white font-semibold text-sm sm:text-base border border-white/10 hover:border-gold/50 backdrop-blur-md transition-all duration-200"
              >
                <Calendar className="w-4 h-4 text-gold" />
                <span>Reserve a Table</span>
              </button>
            </div>

            {/* Floating Trust Metrics */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg">
              <div className="flex flex-col">
                <div className="flex items-center space-x-1 text-gold font-bold text-lg sm:text-xl">
                  <Star className="w-4 h-4 fill-gold text-gold" />
                  <span>4.9 / 5</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">1,400+ Happy Foodies</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-1 text-fiery font-bold text-lg sm:text-xl">
                  <Clock className="w-4 h-4 text-fiery" />
                  <span>25 Mins</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">Average Delivery Time</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-1 text-emerald-400 font-bold text-lg sm:text-xl">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Fresh</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">Farm Direct Produce</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Featured Dish Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer Glow Halo */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-fiery to-gold rounded-3xl blur-xl opacity-30 animate-pulse-slow" />

              {/* Showcase Card */}
              <div className="relative rounded-3xl overflow-hidden glass-card p-4 sm:p-5 border border-white/10 shadow-2xl">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group">
                  <img
                    src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80"
                    alt="SpotFood Signature Dum Biryani"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/20 to-transparent" />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 bg-fiery/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1 rounded-full flex items-center space-x-1 shadow-lg">
                    <Flame className="w-3.5 h-3.5 fill-white" />
                    <span>Today's Spotlight</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gold uppercase tracking-wider">Chef's Signature Dum</span>
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                        ★ 4.9 (780+)
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-display mt-0.5">Hyderabadi Chicken Dum Biryani</h3>
                    <p className="text-xs text-gray-300 line-clamp-1">Slow-dum cooked with saffron, tender spiced chicken & fried onions.</p>
                  </div>
                </div>

                {/* Bottom interactive card bar */}
                <div className="mt-4 flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Special Price</span>
                    <div className="flex items-baseline space-x-2">
                      <span className="text-2xl font-black text-white">₹299</span>
                      <span className="text-xs text-gray-500 line-through">₹349</span>
                    </div>
                  </div>
                  <a
                    href="#menu"
                    className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-fiery hover:bg-fiery-hover text-white text-xs font-bold shadow-glow-orange transition-all duration-200"
                  >
                    <span>Order Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Floating Mini Badge 1 */}
              <div className="hidden sm:flex absolute -top-4 -right-4 glass-card px-3.5 py-2 rounded-xl border border-gold/30 items-center space-x-2 shadow-xl animate-float">
                <ChefHat className="w-5 h-5 text-gold" />
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase font-semibold">Master Chef</div>
                  <div className="text-xs font-bold text-white">Authentic Dum & Tandoor</div>
                </div>
              </div>

              {/* Floating Mini Badge 2 */}
              <div className="hidden sm:flex absolute -bottom-4 -left-4 glass-card px-3.5 py-2 rounded-xl border border-fiery/30 items-center space-x-2 shadow-xl animate-float" style={{ animationDelay: '1.5s' }}>
                <span className="text-lg">🔥</span>
                <div className="text-left">
                  <div className="text-[10px] text-gray-400 uppercase font-semibold">Flat 50% Off</div>
                  <div className="text-xs font-bold text-gold">Use Code: SPOT50</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
