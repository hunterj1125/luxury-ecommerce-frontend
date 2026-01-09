'use client';

import { useState } from 'react';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products = [
    { id: 1, name: 'Premium Leather Bag', category: 'accessories', price: 899, image: 'from-amber-400 to-orange-500', featured: true, description: 'Handcrafted Italian leather' },
    { id: 2, name: 'Designer Watch', category: 'accessories', price: 1299, image: 'from-blue-400 to-indigo-500', featured: false, description: 'Swiss automatic movement' },
    { id: 3, name: 'Silk Evening Dress', category: 'clothing', price: 649, image: 'from-pink-400 to-rose-500', featured: true, description: '100% pure silk' },
    { id: 4, name: 'Minimalist Sneakers', category: 'shoes', price: 329, image: 'from-gray-400 to-slate-500', featured: false, description: 'Premium leather & suede' },
    { id: 5, name: 'Cashmere Sweater', category: 'clothing', price: 499, image: 'from-teal-400 to-cyan-500', featured: false, description: 'Mongolian cashmere' },
    { id: 6, name: 'Smart Home Speaker', category: 'tech', price: 399, image: 'from-purple-400 to-indigo-500', featured: true, description: '360° premium sound' },
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'clothing', name: 'Clothing' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'shoes', name: 'Shoes' },
    { id: 'tech', name: 'Tech' },
  ];

  const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
        
        <div className="relative z-10 text-center px-4 max-w-6xl animate-fade-in">
          <h1 className="text-7xl md:text-9xl font-black text-white mb-6 animate-slide-up">
            The Future
            <br />
            <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-blue-200 text-transparent bg-clip-text">
              of Luxury
            </span>
          </h1>

          <p className="text-xl md:text-3xl text-white/90 mb-12 animate-fade-in-delay">
            Discover a new dimension of premium shopping
          </p>

          <button className="px-12 py-6 text-xl font-bold text-gray-900 bg-gradient-to-b from-gray-100 to-gray-200 rounded-2xl hover:scale-105 transition-transform animate-fade-in-delay-2">
            Explore Collection
          </button>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-4 justify-center">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
          {filteredProducts.map((product, idx) => (
            <div
              key={product.id}
              className={`group relative rounded-3xl overflow-hidden ${
                idx === 0 ? 'md:col-span-2 md:row-span-2' : 
                idx === 2 ? 'md:col-span-2' : 
                idx === 5 ? 'md:row-span-2' : ''
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${product.image}`} />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="glass rounded-2xl p-4">
                  {product.featured && <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-2">FEATURED</span>}
                  <h3 className="text-white font-bold text-xl">{product.name}</h3>
                  <p className="text-white/80 text-sm mb-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white font-bold text-2xl">${product.price}</span>
                    <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-sm">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Free Shipping</h3>
              <p className="text-white/80">On orders over $200</p>
            </div>
            <div className="p-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Secure Payment</h3>
              <p className="text-white/80">100% secure transactions</p>
            </div>
            <div className="p-8">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Easy Returns</h3>
              <p className="text-white/80">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
