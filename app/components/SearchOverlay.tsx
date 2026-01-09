'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock product data for search suggestions
const allProducts = [
  { id: 1, name: 'Premium Leather Bag', category: 'Accessories', price: 899, image: 'from-amber-400 to-orange-500' },
  { id: 2, name: 'Designer Watch', category: 'Accessories', price: 1299, image: 'from-blue-400 to-indigo-500' },
  { id: 3, name: 'Silk Dress', category: 'Clothing', price: 649, image: 'from-pink-400 to-rose-500' },
  { id: 4, name: 'Leather Jacket', category: 'Clothing', price: 1499, image: 'from-gray-400 to-slate-500' },
  { id: 5, name: 'Running Shoes', category: 'Shoes', price: 299, image: 'from-green-400 to-emerald-500' },
  { id: 6, name: 'Wireless Earbuds', category: 'Tech', price: 399, image: 'from-purple-400 to-violet-500' },
  { id: 7, name: 'Sunglasses', category: 'Accessories', price: 399, image: 'from-yellow-400 to-amber-500' },
  { id: 8, name: 'Cashmere Sweater', category: 'Clothing', price: 549, image: 'from-cyan-400 to-blue-500' },
  { id: 9, name: 'Leather Boots', category: 'Shoes', price: 799, image: 'from-orange-400 to-red-500' },
  { id: 10, name: 'Smart Watch', category: 'Tech', price: 899, image: 'from-indigo-400 to-purple-500' },
];

const trendingSearches = [
  'Leather bags',
  'Designer watches',
  'Summer collection',
  'Premium accessories',
  'Luxury shoes',
  'Tech gadgets',
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState(allProducts);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions(allProducts);
    } else {
      const filtered = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  // Focus trap for accessibility
  useEffect(() => {
    if (isOpen) {
      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEscapeKey);
      return () => document.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
        aria-hidden="true"
      />

      {/* Search Panel */}
      <div
        className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 animate-slide-down"
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-title"
        onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 z-10"
                aria-label="Close search"
              >
                <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Search Input */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                <h2 id="search-title" className="sr-only">Product Search</h2>
                <div className="relative">
                  <label htmlFor="product-search" className="sr-only">Search for products</label>
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    ref={inputRef}
                    id="product-search"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for products, categories..."
                    className="w-full pl-14 pr-12 py-4 text-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl border-2 border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-900 transition-all outline-none"
                    aria-describedby="search-instructions"
                    aria-autocomplete="list"
                    aria-controls="search-results"
                  />
                  <span id="search-instructions" className="sr-only">
                    Type to search for products. Use Escape key to close search.
                  </span>
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      aria-label="Clear search"
                    >
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* AI Badge */}
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-medium rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                    AI-Powered Search
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    Smart suggestions as you type
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="max-h-[60vh] overflow-y-auto" id="search-results" role="region" aria-live="polite">
                {query === '' ? (
                  /* Trending Searches */
                  <div className="p-6">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                      Trending Searches
                    </h3>
                    <div className="flex flex-wrap gap-2" role="list" aria-label="Trending search terms">
                      {trendingSearches.map((trend, idx) => (
                        <button
                          key={trend}
                          onClick={() => setQuery(trend)}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 animate-fade-in"
                          style={{ animationDelay: `${idx * 0.05}s` }}
                          role="listitem"
                          aria-label={`Search for ${trend}`}
                        >
                          <span className="mr-2">🔥</span>
                          {trend}
                        </button>
                      ))}
                    </div>

                    {/* Popular Products */}
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 mt-8">
                      Popular Products
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" role="list" aria-label="Popular products">
                      {allProducts.slice(0, 6).map((product, idx) => (
                        <div
                          key={product.id}
                          className="animate-fade-in-delay"
                          style={{ animationDelay: `${idx * 0.05}s` }}
                          role="listitem"
                        >
                          <Link
                            href="/product"
                            onClick={onClose}
                            className="block group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
                            aria-label={`${product.name} - $${product.price}`}
                          >
                            <div className={`aspect-square rounded-xl bg-gradient-to-br ${product.image} mb-2 group-hover:scale-105 transition-transform`} role="img" aria-label={`${product.name} product image`} />
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {product.name}
                            </h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              ${product.price}
                            </p>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : suggestions.length > 0 ? (
                  /* Search Results */
                  <div className="p-6">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                      {suggestions.length} Result{suggestions.length !== 1 ? 's' : ''}
                    </h3>
                    <div className="space-y-3">
                      {suggestions.map((product, idx) => (
                        <div
                          key={product.id}
                          className="animate-fade-in"
                          style={{ animationDelay: `${idx * 0.03}s` }}
                        >
                          <Link
                            href="/product"
                            onClick={onClose}
                            className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                          >
                            <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${product.image} flex-shrink-0 group-hover:scale-105 transition-transform`} />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                                {product.name}
                              </h4>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {product.category}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-indigo-600 dark:text-indigo-400">
                                ${product.price}
                              </p>
                            </div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* No Results */
                  <div className="p-12 text-center">
                    <svg className="w-16 h-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Try searching with different keywords
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
      </>
  );
}
