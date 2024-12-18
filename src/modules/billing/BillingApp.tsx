import React, { useState } from 'react';
import { CreditCard, DollarSign, Receipt, Clock } from 'lucide-react';
import type { Invoice, PaymentMethod, BillingPlan } from '../../types';

const initialInvoices: Invoice[] = [
  {
    id: '1',
    amount: 299.99,
    status: 'paid',
    date: new Date().toISOString(),
    items: [
      { description: 'Monthly Subscription', amount: 299.99 }
    ]
  }
];

const initialPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'credit_card',
    last4: '4242',
    expMonth: 12,
    expYear: 2024,
    brand: 'visa',
    isDefault: true
  }
];

const plans: BillingPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 29.99,
    features: ['Up to 5 users', '5GB storage', 'Basic support']
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 99.99,
    features: ['Up to 20 users', '25GB storage', 'Priority support']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299.99,
    features: ['Unlimited users', 'Unlimited storage', '24/7 support']
  }
];

export function BillingApp() {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(initialPaymentMethods);
  const [selectedPlan, setSelectedPlan] = useState<string>('enterprise');
  const [activeTab, setActiveTab] = useState<'overview' | 'payment-methods' | 'invoices'>('overview');

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <DollarSign className="w-8 h-8" />
          Billing & Subscriptions
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <DollarSign className="w-5 h-5 mx-auto mb-1" />
              Billing Overview
            </button>
            <button
              onClick={() => setActiveTab('payment-methods')}
              className={`flex-1 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'payment-methods'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <CreditCard className="w-5 h-5 mx-auto mb-1" />
              Payment Methods
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex-1 py-4 px-1 text-center border-b-2 text-sm font-medium ${
                activeTab === 'invoices'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Receipt className="w-5 h-5 mx-auto mb-1" />
              Invoices
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <Clock className="h-5 w-5 text-blue-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Your next billing date is {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`relative rounded-lg border ${
                      selectedPlan === plan.id
                        ? 'border-blue-500 shadow-lg'
                        : 'border-gray-300'
                    } bg-white p-6`}
                  >
                    {selectedPlan === plan.id && (
                      <div className="absolute top-0 right-0 -mt-2 -mr-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Current Plan
                        </span>
                      </div>
                    )}
                    <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                    <p className="mt-4 text-sm text-gray-500">
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      /month
                    </p>
                    <ul className="mt-6 space-y-4">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <div className="flex-shrink-0">
                            <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <p className="ml-3 text-sm text-gray-700">{feature}</p>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`mt-8 block w-full rounded-md px-4 py-2 text-sm font-medium text-center ${
                        selectedPlan === plan.id
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'text-blue-600 border border-blue-600 hover:bg-blue-50'
                      }`}
                    >
                      {selectedPlan === plan.id ? 'Current Plan' : 'Switch Plan'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'payment-methods' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Payment Methods</h2>
                <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Add Payment Method
                </button>
              </div>

              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {paymentMethods.map((method) => (
                    <li key={method.id} className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CreditCard className="h-8 w-8 text-gray-400" />
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">
                              {method.brand.toUpperCase()} ending in {method.last4}
                            </p>
                            <p className="text-sm text-gray-500">
                              Expires {method.expMonth}/{method.expYear}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          {method.isDefault && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Default
                            </span>
                          )}
                          <button className="text-sm text-red-600 hover:text-red-900">
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-900">Invoice History</h2>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  Download All
                </button>
              </div>

              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(invoice.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${invoice.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            invoice.status === 'paid'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">
                            Download
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}