'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import SearchOverlay from './SearchOverlay';

export default function Navigation() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  const categories = {
    women: {
      title: 'Women',
      sections: [
        {
          name: 'Clothing',
          items: ['Dresses', 'Tops & Blouses', 'Jackets & Coats', 'Pants & Jeans', 'Skirts', 'Activewear']
        },
        {
          name: 'Accessories',
          items: ['Handbags', 'Jewelry', 'Watches', 'Sunglasses', 'Belts', 'Scarves']
        },
        {
          name: 'Shoes',
          items: ['Heels', 'Flats', 'Sneakers', 'Boots', 'Sandals', 'Loafers']
        }
      ]
    },
    men: {
      title: 'Men',
      sections: [
        {
          name: 'Clothing',
          items: ['Shirts', 'T-Shirts', 'Jackets', 'Pants', 'Suits', 'Activewear']
        },
        {
          name: 'Accessories',
          items: ['Wallets', 'Watches', 'Belts', 'Sunglasses', 'Ties', 'Bags']
        },
        {
          name: 'Shoes',
          items: ['Sneakers', 'Dress Shoes', 'Boots', 'Loafers', 'Sandals']
        }
      ]
    },
    lifestyle: {
      title: 'Lifestyle',
      sections: [
        {
          name: 'Home',
          items: ['Decor', 'Furniture', 'Lighting', 'Bedding', 'Kitchenware']
        },
        {
          name: 'Tech',
          items: ['Headphones', 'Smart Watches', 'Speakers', 'Accessories']
        },
        {
          name: 'Beauty',
          items: ['Skincare', 'Makeup', 'Fragrance', 'Hair Care']
        }
      ]
    }
  };

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-indigo-600 focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Glassmorphism Navigation Bar */}
      <nav 
        className="fixed top-0 left-0 right-0 z-50 glass-dark shadow-lg border-b border-white/10"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg"
              aria-label="ÆTHER home page"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center" aria-hidden="true">
                <span className="text-white font-bold text-xl">Æ</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
                ÆTHER
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8" role="menubar">
              {Object.entries(categories).map(([key, category]) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(key)}
                  onMouseLeave={() => setActiveMenu(null)}
                  role="none"
                >
                  <button 
                    className="text-white/90 hover:text-white font-medium transition-colors px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg"
                    aria-expanded={activeMenu === key}
                    aria-haspopup="true"
                    aria-label={`${category.title} menu`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveMenu(activeMenu === key ? null : key);
                      } else if (e.key === 'Escape') {
                        setActiveMenu(null);
                      }
                    }}
                  >
                    {category.title}
                  </button>
                </div>
              ))}
              <Link 
                href="/sale" 
                className="text-red-400 hover:text-red-300 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg px-3 py-2"
                aria-label="View sale items"
              >
                Sale
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4" role="toolbar" aria-label="User actions">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Open search"
                title="Search products"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist */}
              <button 
                className="p-2 hover:bg-white/10 rounded-lg transition-colors relative focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="View wishlist"
                title="Wishlist"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>

              {/* Cart */}
              <button 
                onClick={openCart}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors relative group focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label={`Shopping cart with ${totalItems} ${totalItems === 1 ? 'item' : 'items'}`}
                title="View cart"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center group-hover:scale-110 transition-transform"
                    aria-label={`${totalItems} items`}
                  >
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Profile */}
              <button 
                className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="User account"
                title="Account"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        {activeMenu && (
          <div
            className="absolute left-0 right-0 top-full glass-dark border-t border-white/10"
            onMouseEnter={() => setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
            role="menu"
            aria-label={`${categories[activeMenu as keyof typeof categories].title} categories`}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-3 gap-8">
                {categories[activeMenu as keyof typeof categories].sections.map((section, idx) => (
                  <div key={idx} role="group" aria-labelledby={`menu-section-${activeMenu}-${idx}`}>
                    <h3 
                      id={`menu-section-${activeMenu}-${idx}`}
                      className="text-white font-semibold text-lg mb-4"
                    >
                      {section.name}
                    </h3>
                    <ul className="space-y-2" role="menu">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx} role="none">
                          <Link
                            href={`/category/${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-white/70 hover:text-white transition-colors block py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                            role="menuitem"
                            onKeyDown={(e) => {
                              if (e.key === 'Escape') {
                                setActiveMenu(null);
                              }
                            }}
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* AI-Powered Search Overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
