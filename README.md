# ÆTHER - High-End E-Commerce Frontend

A cutting-edge e-commerce frontend built with Next.js 15+ and Tailwind CSS, featuring 2026 design trends including Bento Grid layouts and Glassmorphism effects. ÆTHER represents the pinnacle of modern luxury commerce.

## ✨ Features

### Design & UX
- 🎨 **Bento Grid Layout** - Asymmetric, modern product showcase
- 🔮 **Glassmorphism Navigation** - Sticky nav bar with frosted glass effect
- 📱 **Fully Responsive** - Optimized for all devices
- 🎭 **Mega Menu** - Multi-level product category navigation
- ✨ **Smooth Animations** - Hover effects and transitions

### E-Commerce Features
- 🛍️ **Product Showcase** - Dynamic Bento grid with featured products
- 🔍 **Search Overlay** - Full-screen search with blur backdrop
- 💝 **Wishlist** - Save favorite products
- 🛒 **Shopping Cart** - With item counter badge
- 🏷️ **Category Filtering** - Dynamic product filtering
- ⚡ **Quick Actions** - Wishlist and quick view on hover

### Technical
- ⚡ Next.js 15+ with App Router
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS with custom utilities
- 🌐 SEO optimized
- ♿ Accessible components

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
npm start
```

## 🎨 Design Features

### Glassmorphism Navigation
- Frosted glass effect with backdrop blur
- Sticky positioning
- Multi-level mega menu on hover
- Search overlay with blur effect

### Bento Grid Layout
- Asymmetric grid pattern
- Dynamic sizing (2x2, 2x1, 1x2, 1x1)
- Featured product highlighting
- Responsive breakpoints

### Product Cards
- Gradient backgrounds
- Hover animations
- Quick action buttons
- Glass morphism overlays
- Category badges

## 🛠️ Tech Stack

- **Framework**: Next.js 15+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Heroicons (SVG)

## 📂 Project Structure

```
ecommerce/
├── app/
│   ├── components/
│   │   └── Navigation.tsx      # Glassmorphism nav with mega menu
│   ├── globals.css             # Custom utilities & glass effects
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Home page with Bento grid
├── public/                      # Static assets
├── next.config.js              # Next.js config
├── tailwind.config.ts          # Tailwind customization
└── tsconfig.json               # TypeScript config
```

## 🎯 Key Components

### Navigation Component
- Glassmorphism effect
- Multi-level mega menu
- Search overlay
- Wishlist, cart, profile icons
- Category navigation

### Bento Grid
- Asymmetric product layout
- Dynamic filtering
- Featured products
- Hover effects
- Quick actions

## 🌟 Design Trends 2026

1. **Glassmorphism** - Frosted glass UI elements
2. **Bento Grid** - Asymmetric layouts inspired by Japanese bento boxes
3. **Bold Gradients** - Vibrant color transitions
4. **Micro-interactions** - Smooth hover and click animations
5. **Minimalist Icons** - Clean, purposeful iconography

## 🎨 Customization

### Update Colors
Edit `tailwind.config.ts` to change the color scheme.

### Modify Grid Layout
Adjust Bento grid classes in `app/globals.css`:
- `.bento-item-1` through `.bento-item-5`

### Add Products
Update the products array in `app/page.tsx`.

### Customize Navigation
Modify categories object in `app/components/Navigation.tsx`.

## 📱 Responsive Design

- **Mobile**: Single column layout
- **Tablet**: 2-column grid
- **Desktop**: 4-column Bento grid

## 🚀 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Netlify
```bash
npm run build
# Deploy .next folder
```

## 📄 License

MIT License

## 👨‍💻 Author

Built with modern web technologies and 2026 design trends.

---

⭐ Star this repo if you find it useful!
