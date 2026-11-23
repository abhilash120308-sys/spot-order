import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  UtensilsCrossed, 
  Flame, 
  Soup, 
  Search, 
  Star, 
  Clock, 
  Plus, 
  Minus, 
  Check, 
  X 
} from 'lucide-react';
import { CATEGORIES, MENU_ITEMS, DEFAULT_FOOD_IMAGE } from '../data/menuData';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';

export const MenuSection = () => {
  const { addToCart, updateQuantity, getItemQuantity } = useCart();
  const { addToast } = useToast();

  const [menuItems, setMenuItems] = useState(MENU_ITEMS);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [vegFilter, setVegFilter] = useState('all'); // 'all' | 'veg' | 'non-veg'
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-low' | 'price-high' | 'rating'
  const [isLiveFromBackend, setIsLiveFromBackend] = useState(false);

  // Per-dish selected portion state: { [itemId]: portionObject }
  const [selectedPortions, setSelectedPortions] = useState({});

  useEffect(() => {
    // Fetch live menu from Node.js backend
    api.getMenu().then((res) => {
      if (res && res.data && res.data.length > 0) {
        setMenuItems(res.data);
        setIsLiveFromBackend(true);
      }
    }).catch(() => {
      // Fallback kept
    });
  }, []);

  const iconMap = {
    Sparkles,
    Soup,
    Flame,
    UtensilsCrossed,
  };

  // Helper to get active portion for a dish
  const getActivePortion = (item) => {
    if (selectedPortions[item.id]) {
      return selectedPortions[item.id];
    }
    if (item.portions && item.portions.length > 0) {
      return item.portions[0];
    }
    return { name: 'Standard', price: item.price };
  };

  const handleSelectPortion = (itemId, portion) => {
    setSelectedPortions(prev => ({
      ...prev,
      [itemId]: portion,
    }));
  };

  // Filter & Sort Logic
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category match
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Veg / Non-Veg match
      if (vegFilter === 'veg' && !item.isVeg) return false;
      if (vegFilter === 'non-veg' && item.isVeg) return false;
      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description?.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }
      return true;
    }).sort((a, b) => {
      const priceA = a.portions?.[0]?.price || a.price;
      const priceB = b.portions?.[0]?.price || b.price;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: popular first
      return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
    });
  }, [menuItems, activeCategory, searchQuery, vegFilter, sortBy]);

  const handleAddItem = (item, portion) => {
    addToCart(item, 1, portion);
    addToast(`Added "${item.name} (${portion.name})" to cart!`, 'success');
  };

  return (
    <section id="menu" className="py-20 bg-charcoal-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 mb-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-fiery/10 border border-fiery/30 text-fiery text-xs font-bold tracking-wider uppercase">
              <Flame className="w-3.5 h-3.5" />
              <span>Authentic Restaurant Menu</span>
            </div>
            {isLiveFromBackend && (
              <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>Backend API Live</span>
              </div>
            )}
          </div>
          <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
            Explore Flavors at <span className="text-metallic-gold">RAJA</span> <span className="text-neon-orange">FOODS</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            From royal Hyderabadi Dum Biryanis and Special Mix Ghee feasts to sizzling southern starters, choose your preferred portion size and order fresh.
          </p>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 gap-2.5 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Sparkles;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-fiery to-gold text-charcoal-950 shadow-glow-orange font-black scale-105'
                    : 'bg-charcoal-850 hover:bg-charcoal-800 text-gray-300 hover:text-white border border-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-charcoal-950' : 'text-fiery'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Filter & Search Bar */}
        <div className="mt-8 mb-10 p-4 rounded-2xl glass-card flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Live Search */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search biryani, fry, chicken, prawns..."
              className="w-full bg-charcoal-900 border border-white/10 rounded-xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-fiery transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Dietary Filters (All / Pure Veg / Non-Veg) */}
          <div className="flex items-center space-x-2 w-full md:w-auto justify-between md:justify-start">
            <div className="bg-charcoal-900 p-1 rounded-xl border border-white/10 flex items-center space-x-1">
              <button
                onClick={() => setVegFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  vegFilter === 'all'
                    ? 'bg-charcoal-700 text-white shadow-sm font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                All Dishes
              </button>
              <button
                onClick={() => setVegFilter('veg')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  vegFilter === 'veg'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40 shadow-sm font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="veg-indicator scale-90" />
                <span>Veg Only</span>
              </button>
              <button
                onClick={() => setVegFilter('non-veg')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                  vegFilter === 'non-veg'
                    ? 'bg-rose-950 text-rose-400 border border-rose-500/40 shadow-sm font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <span className="non-veg-indicator scale-90" />
                <span>Non-Veg</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-charcoal-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-fiery"
              >
                <option value="popular">Recommended</option>
                <option value="rating">Top Rated (★)</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

        </div>

        {/* Food Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 glass-card rounded-2xl max-w-md mx-auto">
            <UtensilsCrossed className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No dishes found</h3>
            <p className="text-xs text-gray-400 mt-1">Try adjusting your filters or search keywords.</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setVegFilter('all');
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-fiery/20 text-fiery text-xs font-bold border border-fiery/40"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const activePortion = getActivePortion(item);
              const currentPrice = activePortion.price;
              const activeCartId = `${item.id}-${activePortion.name}`;
              const qty = getItemQuantity(item.id, activePortion.name);

              return (
                <div
                  key={item.id}
                  className="group rounded-2xl overflow-hidden glass-card hover:border-gold/40 transition-all duration-300 flex flex-col justify-between hover:shadow-card-hover"
                >
                  {/* Dish Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-charcoal-850">
                    <img
                      src={item.image || DEFAULT_FOOD_IMAGE}
                      alt={item.name}
                      loading="lazy"
                      onError={(e) => {
                        if (e.currentTarget.src !== DEFAULT_FOOD_IMAGE) {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = DEFAULT_FOOD_IMAGE;
                        }
                      }}
                      className="w-full h-full aspect-[16/10] object-cover transition-transform duration-500 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/95 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Row Indicators: Veg/Non-veg & Spice Tag */}
                    <div className="absolute top-3 left-3 flex items-center space-x-2">
                      <div className="p-1.5 rounded-md bg-charcoal-950/80 backdrop-blur-md border border-white/10 shadow">
                        <span className={item.isVeg ? 'veg-indicator' : 'non-veg-indicator'} />
                      </div>
                      
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md shadow backdrop-blur-md ${
                        item.spiceLevel === 'Fiery' 
                          ? 'bg-rose-600/80 text-white' 
                          : item.spiceLevel === 'Medium'
                          ? 'bg-orange-500/80 text-white'
                          : 'bg-amber-500/80 text-white'
                      }`}>
                        {item.spiceLevel}
                      </span>
                    </div>

                    {/* Prep Time */}
                    <div className="absolute bottom-3 left-3 flex items-center space-x-1 text-gray-300 text-[11px] font-medium bg-charcoal-950/80 backdrop-blur-md px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3 text-gold" />
                      <span>{item.prepTime}</span>
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-3 right-3 flex items-center space-x-1 text-gold text-xs font-bold bg-charcoal-950/80 backdrop-blur-md px-2 py-0.5 rounded-md">
                      <Star className="w-3 h-3 fill-gold text-gold" />
                      <span>{item.rating}</span>
                      <span className="text-[10px] text-gray-400 font-normal">({item.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold font-display text-white text-base group-hover:text-gold transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Interactive Portion / Size Selector Pills */}
                      {item.portions && item.portions.length > 0 && (
                        <div className="mt-3 pt-2.5 border-t border-white/5">
                          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-1.5">
                            Portion Size:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.portions.map((portion) => {
                              const isSelected = activePortion.name === portion.name;
                              return (
                                <button
                                  key={portion.name}
                                  type="button"
                                  onClick={() => handleSelectPortion(item.id, portion)}
                                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 border ${
                                    isSelected
                                      ? 'bg-gradient-to-r from-fiery to-gold text-charcoal-950 border-gold font-bold shadow-sm scale-102'
                                      : 'bg-charcoal-900 text-gray-300 border-white/10 hover:border-gold/40 hover:text-white'
                                  }`}
                                >
                                  <span>{portion.name}</span>
                                  <span className="ml-1 opacity-80 text-[10px]">₹{portion.price}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Price & Add to Cart Controls */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-semibold uppercase">
                          {activePortion.name} Pack
                        </span>
                        <div className="flex items-baseline space-x-1.5">
                          <span className="text-xl font-black text-white">₹{currentPrice}</span>
                        </div>
                      </div>

                      {/* Interactive Add or Stepper for selected portion */}
                      {qty === 0 ? (
                        <button
                          onClick={() => handleAddItem(item, activePortion)}
                          className="inline-flex items-center space-x-1 px-3.5 py-2 rounded-xl bg-gradient-to-r from-fiery to-gold text-charcoal-950 font-black text-xs hover:shadow-glow-orange transition-all duration-200 active:scale-95 shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>ADD</span>
                        </button>
                      ) : (
                        <div className="flex items-center space-x-2 bg-charcoal-800 border border-gold/50 rounded-xl px-2.5 py-1.5 shadow-glow-gold">
                          <button
                            onClick={() => updateQuantity(activeCartId, -1)}
                            className="p-1 text-gray-300 hover:text-white active:scale-90"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold text-white min-w-[16px] text-center">
                            {qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(activeCartId, 1)}
                            className="p-1 text-gold hover:text-white active:scale-90"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
