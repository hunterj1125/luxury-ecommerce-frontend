'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type CheckoutStep = 'shipping' | 'payment' | 'review';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Form state
  const [shippingData, setShippingData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  });

  const steps = [
    { id: 'shipping', label: 'Shipping', icon: '📦' },
    { id: 'payment', label: 'Payment', icon: '💳' },
    { id: 'review', label: 'Review', icon: '✓' },
  ];

  const getCurrentStepIndex = () => steps.findIndex((s) => s.id === currentStep);

  const handleContinue = () => {
    if (currentStep === 'shipping') {
      setCurrentStep('payment');
    } else if (currentStep === 'payment') {
      setCurrentStep('review');
    }
  };

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => {
      router.push('/');
    }, 3000);
  };

  const shippingCost = totalPrice > 200 ? 0 : 15;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shippingCost + tax;

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto text-center py-20">
            <svg className="w-20 h-20 text-gray-300 dark:text-gray-700 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Add some items to proceed to checkout
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-20 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-fade-in-delay"
          >
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Order Placed Successfully!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Thank you for your purchase. Redirecting to home...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm mb-2 inline-block focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            aria-label="Back to shopping"
          >
            ← Back to shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Checkout</h1>
        </div>

        {/* Step Indicator */}
        <nav aria-label="Checkout progress" className="mb-8 overflow-x-auto">
          <ol className="flex items-center justify-between min-w-max sm:min-w-0">
            {steps.map((step, index) => {
              const isActive = step.id === currentStep;
              const isCompleted = getCurrentStepIndex() > index;
              
              return (
                <li key={step.id} className="flex items-center flex-1" aria-current={isActive ? 'step' : undefined}>
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
                        isActive
                          ? 'bg-indigo-600 text-white scale-110'
                          : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                      }`}
                      aria-label={`${step.label} - ${isCompleted ? 'Completed' : isActive ? 'Current step' : 'Not started'}`}
                    >
                      {isCompleted ? '✓' : step.icon}
                    </div>
                    <span
                      className={`text-sm font-medium mt-2 ${
                        isActive
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : isCompleted
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-gray-500 dark:text-gray-500'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 transition-colors ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-800'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div
              key={currentStep}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 shadow-lg animate-fade-in"
            >
              {/* Shipping Step */}
              {currentStep === 'shipping' && (
                <form onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
                  <fieldset>
                    <legend className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                      Shipping Information
                    </legend>
                    <div className="space-y-4">
                    <div>
                      <label htmlFor="checkout-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email <span className="text-red-500" aria-label="required">*</span>
                      </label>
                      <input
                        id="checkout-email"
                        type="email"
                        value={shippingData.email}
                        onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        placeholder="you@example.com"
                        required
                        autoComplete="email"
                        aria-required="true"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="checkout-firstname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          First Name <span className="text-red-500" aria-label="required">*</span>
                        </label>
                        <input
                          id="checkout-firstname"
                          type="text"
                          value={shippingData.firstName}
                          onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                          required
                          autoComplete="given-name"
                          aria-required="true"
                        />
                      </div>
                      <div>
                        <label htmlFor="checkout-lastname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Last Name <span className="text-red-500" aria-label="required">*</span>
                        </label>
                        <input
                          id="checkout-lastname"
                          type="text"
                          value={shippingData.lastName}
                          onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                          required
                          autoComplete="family-name"
                          aria-required="true"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        value={shippingData.address}
                        onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Apartment, suite, etc. (optional)
                      </label>
                      <input
                        type="text"
                        value={shippingData.apartment}
                        onChange={(e) => setShippingData({ ...shippingData, apartment: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={shippingData.city}
                          onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          State
                        </label>
                        <input
                          type="text"
                          value={shippingData.state}
                          onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          value={shippingData.zipCode}
                          onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={shippingData.phone}
                        onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                  </fieldset>
                </form>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <div role="region" aria-labelledby="payment-heading">
                  <h2 id="payment-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Payment Method
                  </h2>

                  {/* Express Payment Options */}
                  <fieldset className="mb-8">
                    <legend className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">
                      Express Checkout
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="radiogroup" aria-label="Express payment methods">
                      <button
                        onClick={() => setPaymentMethod('apple-pay')}
                        className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          paymentMethod === 'apple-pay'
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'
                        }`}
                        role="radio"
                        aria-checked={paymentMethod === 'apple-pay'}
                        aria-label="Pay with Apple Pay"
                      >
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                        </svg>
                        <span className="font-semibold text-gray-900 dark:text-white">Apple Pay</span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('google-pay')}
                        className={`flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'google-pay'
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'
                        }`}
                      >
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.73 13.3L7.8 12.83l.88-.88 1.59 1.59 4.17-4.17.88.88-5.05 5.05z"/>
                        </svg>
                        <span className="font-semibold text-gray-900 dark:text-white">Google Pay</span>
                      </button>
                    </div>
                  </fieldset>

                  {/* Buy Now Pay Later Options */}
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">
                      Buy Now, Pay Later
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      <button
                        onClick={() => setPaymentMethod('affirm')}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'affirm'
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">A</span>
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-gray-900 dark:text-white">Affirm</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">4 interest-free payments</div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                          ${(finalTotal / 4).toFixed(2)}/mo
                        </span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('klarna')}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'klarna'
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">K</span>
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-gray-900 dark:text-white">Klarna</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Pay in 4 installments</div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                          ${(finalTotal / 4).toFixed(2)}/mo
                        </span>
                      </button>

                      <button
                        onClick={() => setPaymentMethod('afterpay')}
                        className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                          paymentMethod === 'afterpay'
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                            : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-green-500 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-xl">A</span>
                          </div>
                          <div className="text-left">
                            <div className="font-semibold text-gray-900 dark:text-white">Afterpay</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Split into 4 payments</div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                          ${(finalTotal / 4).toFixed(2)}/mo
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or pay with card</span>
                    </div>
                  </div>

                  {/* Credit Card Form */}
                  <div>
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`w-full mb-4 flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === 'card'
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                          : 'border-gray-300 dark:border-gray-600 hover:border-indigo-500'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-8 h-8 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        <span className="font-semibold text-gray-900 dark:text-white">Credit or Debit Card</span>
                      </div>
                      <div className="flex gap-1">
                        <div className="text-2xl">💳</div>
                      </div>
                    </button>

                    {paymentMethod === 'card' && (
                      <div
                        className="space-y-4 animate-fade-in"
                      >
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value={cardData.cardNumber}
                            onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                            placeholder="1234 5678 9012 3456"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              value={cardData.expiry}
                              onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                              placeholder="MM/YY"
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              CVV
                            </label>
                            <input
                              type="text"
                              value={cardData.cvv}
                              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                              placeholder="123"
                              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Name on Card
                          </label>
                          <input
                            type="text"
                            value={cardData.nameOnCard}
                            onChange={(e) => setCardData({ ...cardData, nameOnCard: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Review Step */}
              {currentStep === 'review' && (
                <div role="region" aria-labelledby="review-heading">
                  <h2 id="review-heading" className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Review Order
                  </h2>

                  {/* Shipping Info */}
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Shipping Address</h3>
                      <button
                        onClick={() => setCurrentStep('shipping')}
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {shippingData.firstName} {shippingData.lastName}<br />
                      {shippingData.address} {shippingData.apartment}<br />
                      {shippingData.city}, {shippingData.state} {shippingData.zipCode}<br />
                      {shippingData.phone}
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Payment Method</h3>
                      <button
                        onClick={() => setCurrentStep('payment')}
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                      {paymentMethod ? paymentMethod.replace('-', ' ') : 'Not selected'}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Order Items</h3>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={`${item.id}-${item.size}-${item.color}`}
                          className="flex gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl"
                        >
                          <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${item.image} flex-shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {item.color} • {item.size} • Qty: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">${item.price * item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex gap-4 mt-8" role="group" aria-label="Checkout navigation">
                {currentStep !== 'shipping' && (
                  <button
                    onClick={() => {
                      if (currentStep === 'payment') setCurrentStep('shipping');
                      else if (currentStep === 'review') setCurrentStep('payment');
                    }}
                    className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                    aria-label="Go back to previous step"
                  >
                    ← Back
                  </button>
                )}
                {currentStep !== 'review' ? (
                  <button
                    onClick={handleContinue}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    aria-label="Continue to next step"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    aria-label="Place your order"
                  >
                    Place Order
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-3">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.image} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">${item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium text-gray-900 dark:text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Tax</span>
                  <span className="font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {shippingCost === 0 && (
                <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                    🎉 You qualify for FREE shipping!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
