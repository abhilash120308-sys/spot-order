# 🍽️ Spot Food – Full-Stack Food Discovery & Delivery Platform

> **"Cravings Spotted. Hunger Solved."**

Spot Food is a full-stack food discovery, online food ordering, and table reservation platform with an obsidian dark-mode aesthetic (`#121212`), fiery orange (`#FF5722`) and gold (`#FFC107`) highlights, real-time cart calculations, JWT authentication, and an interactive **Admin Console**.

---

## 🏗️ Architecture & Technology Stack

- **Frontend**: React 18 + Vite, Tailwind CSS, Lucide Icons, Canvas Confetti.
- **Backend**: Node.js + Express.js REST APIs.
- **Database**: MongoDB (Mongoose schemas) with seamless high-speed in-memory persistence fallback for immediate zero-config execution.
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing and role-based access control (`customer` vs `admin`).

---

## ⚡ Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Both Frontend and Backend Concurrently
```bash
npm run fullstack
```
- **Backend API**: [http://localhost:5000](http://localhost:5000)
- **Frontend App**: [http://localhost:5173](http://localhost:5173)

### 3. Alternative Individual Commands
```bash
# Start backend server only
npm run server

# Start frontend dev server only
npm run dev

# Build production bundle
npm run build
```

---

## 🔑 Demo Accounts & Admin Credentials

| Role | Email | Password | Access Capabilities |
|------|-------|----------|---------------------|
| **Admin** | `admin@spotfood.in` | `admin123` | Full Admin Console, live order dispatching, status changer, revenue stats, table reservations |
| **Diner** | `customer@spotfood.in` | `customer123` | Online ordering, cart checkout, table booking, profile tracking |

*(You can also use the one-click quick login buttons inside the Sign In modal).*

---

## 🌐 Backend REST APIs

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `GET` | `/api/health` | Server health check | No |
| `POST` | `/api/auth/register` | Register new customer | No |
| `POST` | `/api/auth/login` | Sign in & receive JWT | No |
| `GET` | `/api/auth/me` | Fetch authenticated profile | Bearer Token |
| `GET` | `/api/menu` | List dishes (category, veg, search) | No |
| `POST` | `/api/menu` | Add new dish to menu | Admin |
| `POST` | `/api/orders` | Create online food order | No |
| `GET` | `/api/orders` | Retrieve orders list | No |
| `PUT` | `/api/orders/:id/status` | Change order status | Admin |
| `POST` | `/api/reservations` | Reserve a dining table | No |
| `GET` | `/api/reservations` | List all table bookings | No |
| `POST` | `/api/coupons/verify` | Validate `SPOT50` or `TASTY20` | No |
| `GET` | `/api/admin/stats` | Live revenue & order counts | Admin |

---

## 📱 Core Highlights

1. **Sticky Glassmorphic Navigation**:
   - Brand logo with flame icon
   - Smooth-scrolling anchors (*Home, Menu, Specials, Reserve, Reviews, Contact*)
   - User account avatar and one-click Admin Console trigger
   - Live cart drawer trigger with counter badge

2. **Appetizing Hero Section**:
   - High-res culinary photography with obsidian gradient overlays
   - Dual CTAs (*"Explore Menu & Order"* & *"Book a Table"*)
   - Live trust metrics: 4.9/5 Rating, 25-Min Hot Delivery, 100% Fresh Daily

3. **Chef's Specials & Trending Combos**:
   - Curated feast boxes (*SpotFood Signature Feast*, *Royal Biryani Dum Bucket*, *Veg Royale Feast Box*)
   - Direct add-to-cart with celebratory toast

4. **Categorized Menu & Instant Search**:
   - Filter pills: Starters, Mains, Biryani & Bowls, Burgers & Wraps, Desserts, Mocktails
   - Dietary filter toggles: *All*, *Pure Veg*, *Non-Veg*
   - Interactive quantity stepper (`[-] qty [+]`) directly on cards

5. **Slide-Out Cart & Checkout**:
   - Delivery vs. Dine-in / Takeaway toggle
   - Coupon promo engine (`SPOT50` for 50% off, `TASTY20` for 20% off)
   - Real-time billing: Subtotal, Discount, Delivery fee (Free > ₹499), 5% GST, Grand Total
   - UPI / Cards / Cash on Delivery payment simulation

6. **Order Confirmation & Tracker**:
   - Confetti burst animation via `canvas-confetti`
   - Generated Order ID (`SF-XXXXX`)
   - 4-stage live order status (*Received ➔ In Kitchen ➔ On the Way ➔ At Spot*)

7. **Table Reservation System**:
   - Form with Date, Time Slot, Guests, Occasion, Special Requests
   - Instant booking reference code (`TBL-XXXX`)

8. **Admin Dashboard Console**:
   - Overview metrics: Total Revenue, Total Orders, Active Orders, Table Bookings
   - Live status changer dropdown for dispatching orders
   - Real-time customer contact and reservation details viewer
