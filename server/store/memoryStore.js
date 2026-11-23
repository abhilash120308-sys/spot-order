import bcrypt from 'bcryptjs';

// Pre-seeded initial dataset
export const initialMenuItems = [
  // --- STARTERS ---
  {
    id: 'starter-1',
    name: 'Crispy Chicken Wings',
    category: 'starters',
    price: 249,
    originalPrice: 299,
    isVeg: false,
    spiceLevel: 'Fiery',
    rating: 4.8,
    reviewsCount: 312,
    description: 'Crispy golden fried chicken wings tossed in our signature smoky peri-peri BBQ glaze, served with garlic herb dip.',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '15-20 min',
  },
  {
    id: 'starter-2',
    name: 'Paneer Tikka Platter',
    category: 'starters',
    price: 229,
    originalPrice: 269,
    isVeg: true,
    spiceLevel: 'Medium',
    rating: 4.7,
    reviewsCount: 245,
    description: 'Fresh cottage cheese cubes marinated in aromatic tandoori spices and mustard oil, charred in clay oven with bell peppers.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '15 min',
  },
  {
    id: 'starter-3',
    name: 'Loaded Cheese Nachos',
    category: 'starters',
    price: 199,
    originalPrice: 239,
    isVeg: true,
    spiceLevel: 'Mild',
    rating: 4.6,
    reviewsCount: 189,
    description: 'Crispy artisanal corn tortilla chips smothered in molten cheddar cheese, pickled jalapeños, fresh pico de gallo, and sour cream.',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '12 min',
  },
  {
    id: 'starter-4',
    name: 'Chilli Garlic Prawns',
    category: 'starters',
    price: 319,
    originalPrice: 379,
    isVeg: false,
    spiceLevel: 'Fiery',
    rating: 4.9,
    reviewsCount: 420,
    description: 'Plump ocean prawns wok-tossed with crushed bird-eye chillies, toasted garlic chips, scallions, and light soy glaze.',
    image: 'https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '15 min',
  },
  {
    id: 'starter-5',
    name: 'Crispy Corn Pepper Salt',
    category: 'starters',
    price: 189,
    originalPrice: 219,
    isVeg: true,
    spiceLevel: 'Medium',
    rating: 4.5,
    reviewsCount: 130,
    description: 'Crunchy sweet corn kernels seasoned with freshly ground Sichuan pepper, garlic, and tossed with crispy curry leaves.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '10 min',
  },
  {
    id: 'starter-6',
    name: 'Tandoori Malai Chicken Tikka',
    category: 'starters',
    price: 279,
    originalPrice: 329,
    isVeg: false,
    spiceLevel: 'Mild',
    rating: 4.8,
    reviewsCount: 290,
    description: 'Melt-in-mouth chicken chunks steeped in rich cashew paste, hung curd, cardamom, and gentle cheese marinade.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '18 min',
  },

  // --- SIGNATURE MAINS ---
  {
    id: 'main-1',
    name: 'Butter Chicken with Garlic Naan',
    category: 'mains',
    price: 329,
    originalPrice: 389,
    isVeg: false,
    spiceLevel: 'Mild',
    rating: 4.9,
    reviewsCount: 560,
    description: 'Velvety smooth makhani gravy with tender tandoori chicken chunks simmered in butter and kasuri methi, paired with 2 hot butter garlic naans.',
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '20 min',
  },
  {
    id: 'main-2',
    name: 'Dal Makhani with Jeera Rice',
    category: 'mains',
    price: 239,
    originalPrice: 279,
    isVeg: true,
    spiceLevel: 'Mild',
    rating: 4.8,
    reviewsCount: 380,
    description: 'Whole black lentils slow-cooked overnight on charcoal embers with churned butter and fresh cream, served with fragrant cumin basmati rice.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '15 min',
  },
  {
    id: 'main-3',
    name: 'Kadhai Paneer with Flaky Parotta',
    category: 'mains',
    price: 269,
    originalPrice: 319,
    isVeg: true,
    spiceLevel: 'Medium',
    rating: 4.7,
    reviewsCount: 215,
    description: 'Fresh malai paneer simmered with crunchy bell peppers, onions, and freshly pounded kadhai coriander-fennel spices. Served with 2 layered parottas.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '20 min',
  },
  {
    id: 'main-4',
    name: 'Fiery Chettinad Mutton Curry',
    category: 'mains',
    price: 379,
    originalPrice: 449,
    isVeg: false,
    spiceLevel: 'Fiery',
    rating: 4.9,
    reviewsCount: 310,
    description: 'Succulent tender mutton pieces slow cooked in traditional 18-spice roasted Chettinad gravy, stone flower, and fresh coconut extract.',
    image: 'https://images.unsplash.com/photo-1545247181-516773cae7be?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '25 min',
  },

  // --- BIRYANI & BOWLS ---
  {
    id: 'biryani-1',
    name: 'SpotFood Special Chicken Dum Biryani',
    category: 'biryani',
    price: 299,
    originalPrice: 349,
    isVeg: false,
    spiceLevel: 'Medium',
    rating: 4.9,
    reviewsCount: 780,
    description: 'Our crown jewel: fragrant Daawat basmati rice slow-dum cooked with tender spiced chicken, saffron milk, fried onions, and served with Mirchi ka Salan and creamy Raita.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '20 min',
  },
  {
    id: 'biryani-2',
    name: 'Royal Paneer Dum Biryani',
    category: 'biryani',
    price: 259,
    originalPrice: 299,
    isVeg: true,
    spiceLevel: 'Medium',
    rating: 4.7,
    reviewsCount: 420,
    description: 'Layered dum biryani made with saffron-infused basmati rice, marinated golden paneer cubes, whole fragrant spices, and mint leaves.',
    image: 'https://images.unsplash.com/photo-1642821373181-696a54913e9a?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '20 min',
  },
  {
    id: 'biryani-3',
    name: 'Lucknowi Awadhi Mutton Biryani',
    category: 'biryani',
    price: 369,
    originalPrice: 429,
    isVeg: false,
    spiceLevel: 'Mild',
    rating: 4.9,
    reviewsCount: 395,
    description: 'Delicate Awadhi style dum biryani with fork-tender goat meat, aromatic kewra and rose water essences, and caramelized shallots.',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '25 min',
  },
  {
    id: 'biryani-4',
    name: 'Teriyaki Chicken Rice Bowl',
    category: 'biryani',
    price: 289,
    originalPrice: 339,
    isVeg: false,
    spiceLevel: 'Mild',
    rating: 4.7,
    reviewsCount: 190,
    description: 'Grilled chicken breast with house-made honey teriyaki glaze over steamed jasmine rice, fresh broccoli, edamame, and toasted sesame.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '15 min',
  },

  // --- BURGERS & WRAPS ---
  {
    id: 'burger-1',
    name: 'Double Smash Chicken Burger',
    category: 'burgers',
    price: 239,
    originalPrice: 279,
    isVeg: false,
    spiceLevel: 'Medium',
    rating: 4.8,
    reviewsCount: 460,
    description: 'Twin seared chicken smash patties with melted double cheddar, house dill pickles, caramelized onions, and signature secret Spot drizzle in toasted brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '15 min',
  },
  {
    id: 'burger-2',
    name: 'Spicy Peri-Peri Paneer Wrap',
    category: 'burgers',
    price: 189,
    originalPrice: 229,
    isVeg: true,
    spiceLevel: 'Fiery',
    rating: 4.6,
    reviewsCount: 310,
    description: 'Crunchy golden paneer fingers seasoned with peri-peri dust, rolled with purple cabbage slaw, chipotle mayo, and onions in a warm toasted tortilla.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '12 min',
  },
  {
    id: 'burger-3',
    name: 'Truffle Mushroom Swiss Burger',
    category: 'burgers',
    price: 269,
    originalPrice: 319,
    isVeg: true,
    spiceLevel: 'Mild',
    rating: 4.8,
    reviewsCount: 230,
    description: 'Charred mushroom & lentil patty topped with melted Swiss Gruyère, butter-sautéed portobello mushrooms, and white truffle garlic aioli.',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '15 min',
  },

  // --- DESSERTS ---
  {
    id: 'dessert-1',
    name: 'Sizzling Chocolate Brownie',
    category: 'desserts',
    price: 179,
    originalPrice: 219,
    isVeg: true,
    spiceLevel: 'Sweet',
    rating: 4.9,
    reviewsCount: 610,
    description: 'Warm fudge walnut brownie served on a piping hot cast-iron sizzler plate, crowned with artisan vanilla bean ice cream and molten Belgian dark chocolate cascade.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '10 min',
  },
  {
    id: 'dessert-2',
    name: 'Royal Gulab Jamun Rabdi Sundae',
    category: 'desserts',
    price: 149,
    originalPrice: 179,
    isVeg: true,
    spiceLevel: 'Sweet',
    rating: 4.8,
    reviewsCount: 350,
    description: 'Golden fried khoya dumplings soaked in warm saffron-cardamom syrup, layered with chilled Lucknowi rabdi and silvered Iranian pistachios.',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '8 min',
  },
  {
    id: 'dessert-3',
    name: 'Salted Caramel Biscoff Cheesecake',
    category: 'desserts',
    price: 219,
    originalPrice: 259,
    isVeg: true,
    spiceLevel: 'Sweet',
    rating: 4.9,
    reviewsCount: 420,
    description: 'Creamy New York-style cheesecake resting on a crunchy Lotus Biscoff biscuit crust, drizzled with sea-salted caramel drizzle and cookie crumb.',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '5 min',
  },

  // --- MOCKTAILS & BEVERAGES ---
  {
    id: 'bev-1',
    name: 'Classic Cold Coffee with Ice Cream',
    category: 'beverages',
    price: 129,
    originalPrice: 159,
    isVeg: true,
    spiceLevel: 'Chilled',
    rating: 4.7,
    reviewsCount: 520,
    description: 'Signature cold brew espresso blitzed with creamy milk, chocolate drizzle, and topped with a generous scoop of vanilla bean ice cream.',
    image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '5 min',
  },
  {
    id: 'bev-2',
    name: 'Fresh Lime Mint Cooler',
    category: 'beverages',
    price: 99,
    originalPrice: 129,
    isVeg: true,
    spiceLevel: 'Refreshing',
    rating: 4.8,
    reviewsCount: 340,
    description: 'Crushed garden mint leaves, freshly squeezed Persian lime juice, rock salt, and chilled club soda poured over crushed ice.',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '5 min',
  },
  {
    id: 'bev-3',
    name: 'Mango Passionfruit Spritz',
    category: 'beverages',
    price: 139,
    originalPrice: 169,
    isVeg: true,
    spiceLevel: 'Chilled',
    rating: 4.9,
    reviewsCount: 280,
    description: 'Golden Alphonso mango pulp blended with exotic Brazilian passionfruit, basil seeds, and sparkling tonic water with a mint sprig.',
    image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=800&q=80',
    popular: true,
    prepTime: '6 min',
  },
  {
    id: 'bev-4',
    name: 'Smoky Blueberry Mojito',
    category: 'beverages',
    price: 149,
    originalPrice: 189,
    isVeg: true,
    spiceLevel: 'Refreshing',
    rating: 4.8,
    reviewsCount: 195,
    description: 'Muddled mountain blueberries, fresh spearmint, lime wheel, cold sparkling water with a hint of smoked rosemary mist.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    popular: false,
    prepTime: '6 min',
  },
];

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
          { id: 'biryani-1', name: 'SpotFood Special Chicken Dum Biryani', price: 299, quantity: 2 },
          { id: 'starter-1', name: 'Crispy Chicken Wings', price: 249, quantity: 1 }
        ],
        subtotal: 847,
        discount: 150,
        deliveryFee: 0,
        gst: 35,
        grandTotal: 732,
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
          { id: 'starter-2', name: 'Paneer Tikka Platter', price: 229, quantity: 1 },
          { id: 'dessert-1', name: 'Sizzling Chocolate Brownie', price: 179, quantity: 2 }
        ],
        subtotal: 587,
        discount: 100,
        deliveryFee: 0,
        gst: 24,
        grandTotal: 511,
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
