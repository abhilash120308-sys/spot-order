import React from 'react';
import { Sparkles, Flame, Check, Plus, ShoppingBag, Star } from 'lucide-react';
import { CHEF_SPECIALS } from '../data/combosData';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

export const ChefSpecials = () => {
  const { addToCart, getItemQuantity } = useCart();
  const { addToast } = useToast();

  const handleAddCombo = (combo) => {
    // Treat combo as an item
    addToCart({
      id: combo.id,
      name: combo.title,
      price: combo.price,
      isVeg: combo.isVeg,
      image: combo.image,
      category: 'combos',
      description: combo.description,
    });
    addToast(`Added "${combo.title}" to cart!`, 'success');
  };

  return (
    <section id="specials" className="py-20 bg-charcoal-900 relative overflow-hidden border-t border-b border-white/5">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-fiery/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold tracking-wider uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chef's Signature Combos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-white tracking-tight">
            Trending Combos & Feasts
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Hand-crafted curated bundles created by our executive chefs for maximum flavor and unforgettable shared experiences.
          </p>
        </div>

        {/* Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CHEF_SPECIALS.map((combo) => {
            const inCartQty = getItemQuantity(combo.id);

            return (
              <div
                key={combo.id}
                className="group relative rounded-3xl overflow-hidden glass-card hover:border-fiery/50 transition-all duration-300 flex flex-col justify-between hover:shadow-card-hover"
              >
                {/* Image Banner */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={combo.image}
                    alt={combo.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-850 via-charcoal-850/30 to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-3 py-1 rounded-full bg-fiery text-white text-xs font-bold shadow-md flex items-center gap-1">
                      <Flame className="w-3 h-3 fill-white" />
                      {combo.tag}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-gold text-charcoal-950 text-xs font-black shadow-md">
                      {combo.savings}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-3 right-3 bg-charcoal-900/90 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center space-x-1 text-gold text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                    <span>{combo.rating}</span>
                  </div>

                  {/* Veg / Non-Veg Indicator */}
                  <div className="absolute bottom-3 left-3 bg-charcoal-900/90 backdrop-blur-md p-1.5 rounded-md border border-white/10">
                    <span className={combo.isVeg ? 'veg-indicator' : 'non-veg-indicator'} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white group-hover:text-fiery transition-colors">
                      {combo.title}
                    </h3>
                    <p className="text-xs text-gold font-medium mt-0.5">{combo.tagline}</p>
                    <p className="text-xs text-gray-300 mt-2.5 leading-relaxed">
                      {combo.description}
                    </p>

                    {/* What's included checklist */}
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
                      <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                        Included in this Feast:
                      </div>
                      {combo.itemsIncluded.map((item, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-xs text-gray-200">
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-2xl font-black text-white">₹{combo.price}</span>
                        <span className="text-xs text-gray-500 line-through">₹{combo.originalPrice}</span>
                      </div>
                      <span className="text-[10px] text-emerald-400 font-semibold">Taxes included</span>
                    </div>

                    <button
                      onClick={() => handleAddCombo(combo)}
                      className={`inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl font-bold text-xs transition-all duration-200 ${
                        inCartQty > 0
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                          : 'bg-gradient-to-r from-fiery to-gold text-charcoal-950 hover:shadow-glow-orange hover:scale-105 active:scale-95'
                      }`}
                    >
                      {inCartQty > 0 ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added ({inCartQty})</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" />
                          <span>Add Feast</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
