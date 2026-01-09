'use client';

import { useState, useRef } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

export default function ProductDetails() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [showMagnifier, setShowMagnifier] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);
  const { addToCart } = useCart();

  // Mock product data
  const product = {
    name: 'Premium Leather Handbag',
    price: 899,
    rating: 4.8,
    reviews: 124,
    description: 'Handcrafted from Italian full-grain leather, this timeless piece combines elegance with functionality. Features gold-plated hardware and a luxurious silk lining.',
    images: [
      'from-amber-400 to-orange-500',
      'from-orange-400 to-red-500',
      'from-yellow-400 to-amber-500',
      'from-rose-400 to-pink-500',
    ],
    colors: ['Black', 'Cognac', 'Navy', 'Burgundy'],
    sizes: ['Small', 'Medium', 'Large'],
  };

  // Mock user profile for personalization
  const userProfile = {
    style: 'classic',
    recentViews: ['leather-goods', 'accessories'],
    priceRange: 'premium',
  };

  // Complementary products based on mock profile
  const complementaryProducts = [
    { name: 'Leather Wallet', price: 249, image: 'from-slate-400 to-gray-500' },
    { name: 'Designer Sunglasses', price: 399, image: 'from-blue-400 to-indigo-500' },
    { name: 'Silk Scarf', price: 189, image: 'from-pink-400 to-rose-500' },
    { name: 'Gold Bracelet', price: 599, image: 'from-yellow-400 to-amber-500' },
  ];

  // Handle magnifier movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    
    const rect = imgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMagnifierPosition({ x, y });
  };

  const handleAddToCart = () => {
    addToCart({
      id: 1,
      name: product.name,
      price: product.price,
      image: product.images[selectedImage],
      color: selectedColor,
      size: selectedSize,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/" className="hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded">Accessories</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <span className="text-gray-900 dark:text-white" aria-current="page">Handbags</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery with Magnifier */}
          <div role="group" aria-label="Product images">
            {/* Main Image with Magnifying Glass Effect */}
            <div 
              ref={imgRef}
              className="relative aspect-square rounded-3xl overflow-hidden mb-4 cursor-crosshair bg-gradient-to-br shadow-2xl"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setShowMagnifier(true)}
              onMouseLeave={() => setShowMagnifier(false)}
              role="img"
              aria-label={`${product.name} main image`}
            >
              <div className={`w-full h-full bg-gradient-to-br ${product.images[selectedImage]} flex items-center justify-center`}>
                <span className="text-white/30 text-6xl font-bold">PRODUCT</span>
              </div>

              {/* Magnifier */}
              {showMagnifier && (
                <div
                  className="absolute w-40 h-40 rounded-full border-4 border-white shadow-2xl pointer-events-none overflow-hidden animate-fade-in"
                  style={{
                    left: magnifierPosition.x - 80,
                    top: magnifierPosition.y - 80,
                    background: `radial-gradient(circle at center, rgba(255,255,255,0.1), transparent)`,
                  }}
                >
                  <div 
                    className={`w-[300%] h-[300%] bg-gradient-to-br ${product.images[selectedImage]}`}
                    style={{
                      transform: `translate(-${magnifierPosition.x * 1.5}px, -${magnifierPosition.y * 1.5}px)`,
                    }}
                  />
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-4 gap-4" role="list" aria-label="Product image thumbnails">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-square rounded-xl overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    selectedImage === idx 
                      ? 'ring-4 ring-indigo-500 scale-105' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View image ${idx + 1} of ${product.images.length}`}
                  aria-pressed={selectedImage === idx}
                  role="listitem"
                >
                  <div className={`w-full h-full bg-gradient-to-br ${img}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div role="region" aria-labelledby="product-title">
            <h1 id="product-title" className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6" role="group" aria-label="Product rating">
              <div className="flex items-center gap-1" role="img" aria-label={`${product.rating} out of 5 stars`}>
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <span className="text-5xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <fieldset className="mb-6">
              <legend className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Color
              </legend>
              <div className="flex gap-3" role="radiogroup" aria-label="Available colors">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 rounded-lg border-2 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      selectedColor === color
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        : 'border-gray-300 dark:border-gray-700 hover:border-indigo-500 text-gray-700 dark:text-gray-300'
                    }`}
                    role="radio"
                    aria-checked={selectedColor === color}
                    aria-label={`Select ${color} color`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Size Selection */}
            <fieldset className="mb-8">
              <legend className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Size
              </legend>
              <div className="flex gap-3" role="radiogroup" aria-label="Available sizes">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-6 py-2 rounded-lg border-2 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      selectedSize === size
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300'
                        : 'border-gray-300 dark:border-gray-700 hover:border-indigo-500 text-gray-700 dark:text-gray-300'
                    }`}
                    role="radio"
                    aria-checked={selectedSize === size}
                    aria-label={`Select ${size} size`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8" role="group" aria-label="Product actions">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                aria-label={`Add ${product.name} to cart`}
              >
                Add to Cart
              </button>
              <button 
                className="p-4 border-2 border-gray-300 dark:border-gray-700 rounded-xl hover:border-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Add to wishlist"
                title="Add to wishlist"
              >
                <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Radix UI Accordions for Specifications */}
            <Accordion.Root type="single" collapsible className="space-y-2">
              <Accordion.Item value="details" className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <Accordion.Trigger className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                  <span className="font-semibold text-gray-900 dark:text-white">Product Details</span>
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform group-data-[state=open]:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Accordion.Trigger>
                <Accordion.Content className="px-6 py-4 text-gray-600 dark:text-gray-400 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <ul className="space-y-2">
                    <li>• Material: Italian full-grain leather</li>
                    <li>• Hardware: 24k gold-plated</li>
                    <li>• Lining: 100% silk</li>
                    <li>• Dimensions: 12" W x 10" H x 5" D</li>
                    <li>• Weight: 1.2 lbs</li>
                  </ul>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="shipping" className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <Accordion.Trigger className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                  <span className="font-semibold text-gray-900 dark:text-white">Shipping & Returns</span>
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform group-data-[state=open]:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Accordion.Trigger>
                <Accordion.Content className="px-6 py-4 text-gray-600 dark:text-gray-400 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <ul className="space-y-2">
                    <li>• Free shipping on orders over $200</li>
                    <li>• Express shipping available</li>
                    <li>• 30-day return policy</li>
                    <li>• Free returns and exchanges</li>
                  </ul>
                </Accordion.Content>
              </Accordion.Item>

              <Accordion.Item value="care" className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                <Accordion.Trigger className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group">
                  <span className="font-semibold text-gray-900 dark:text-white">Care Instructions</span>
                  <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 transition-transform group-data-[state=open]:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Accordion.Trigger>
                <Accordion.Content className="px-6 py-4 text-gray-600 dark:text-gray-400 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <ul className="space-y-2">
                    <li>• Clean with soft, dry cloth</li>
                    <li>• Avoid exposure to water</li>
                    <li>• Store in dust bag when not in use</li>
                    <li>• Keep away from direct sunlight</li>
                    <li>• Use leather conditioner monthly</li>
                  </ul>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        </div>

        {/* Personalization Widget - Complementary Products */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Curated For You
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Based on your {userProfile.style} style preferences
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {complementaryProducts.map((item, idx) => (
              <div
                key={idx}
                className="group cursor-pointer animate-fade-in-delay"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`aspect-square rounded-2xl bg-gradient-to-br ${item.image} mb-3 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <button className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                  {item.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  ${item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
