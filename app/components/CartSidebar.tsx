'use client';

import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CartSidebar() {
  const { items, removeFromCart, updateQuantity, totalPrice, isOpen, closeCart } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-describedby="cart-description"
      >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <h2 id="cart-title" className="text-2xl font-bold text-gray-900 dark:text-white">
                  Shopping Cart
                </h2>
                <button
                  onClick={closeCart}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  aria-label="Close shopping cart"
                >
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p id="cart-description" className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6" role="region" aria-label="Cart items">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center" role="status" aria-live="polite">
                  <svg className="w-20 h-20 text-gray-300 dark:text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Add some items to get started
                  </p>
                  <Link
                    href="/"
                    onClick={closeCart}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    aria-label="Continue shopping and close cart"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4" role="list" aria-label="Shopping cart items">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                    >
                      {/* Product Image */}
                      <div className={`w-20 h-20 rounded-lg bg-gradient-to-br ${item.image} flex-shrink-0`} />

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                          {item.name}
                        </h3>
                        <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-0.5">
                          {item.color && <p>Color: {item.color}</p>}
                          {item.size && <p>Size: {item.size}</p>}
                        </div>
                        <p className="text-indigo-600 dark:text-indigo-400 font-bold mt-2">
                          ${item.price}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2" role="group" aria-label="Quantity controls">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label={`Decrease quantity of ${item.name}`}
                          >
                            <svg className="w-3 h-3 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="text-sm font-medium text-gray-900 dark:text-white w-8 text-center" aria-label={`Quantity: ${item.quantity}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            aria-label={`Increase quantity of ${item.name}`}
                          >
                            <svg className="w-3 h-3 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors self-start focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Total and Checkout */}
            {items.length > 0 && (
              <div className="p-6 border-t border-gray-200 dark:border-gray-800 space-y-4" role="region" aria-label="Cart summary">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-lg" aria-live="polite">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-bold text-gray-900 dark:text-white" aria-label={`Subtotal: $${totalPrice.toFixed(2)}`}>
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Shipping Note */}
                <p className="text-xs text-gray-500 dark:text-gray-500">
                  Shipping and taxes calculated at checkout
                </p>

                {/* Checkout Button */}
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] shadow-lg text-center focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  aria-label="Proceed to checkout"
                >
                  Proceed to Checkout
                </Link>

                {/* Continue Shopping */}
                <button
                  onClick={closeCart}
                  className="w-full py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-lg"
                  aria-label="Continue shopping and close cart"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
    </>
  );
}
