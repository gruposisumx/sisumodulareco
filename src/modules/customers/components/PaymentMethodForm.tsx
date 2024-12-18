import React, { useState } from 'react';
import { CreditCard, X } from 'lucide-react';
import type { PaymentMethod } from '../../../types';

interface PaymentMethodFormProps {
  customerId: string;
  onClose: () => void;
  onSave: (method: PaymentMethod) => void;
}

export function PaymentMethodForm({ customerId, onClose, onSave }: PaymentMethodFormProps) {
  const [methodType, setMethodType] = useState<PaymentMethod['type']>('credit_card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvv: '',
    accountNumber: '',
    bankName: '',
    creditAmount: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const method: PaymentMethod = {
      id: String(Date.now()),
      customerId,
      type: methodType,
      isDefault: false,
      status: 'active'
    };

    if (methodType === 'credit_card' || methodType === 'debit_card') {
      method.last4 = formData.cardNumber.slice(-4);
      method.expMonth = parseInt(formData.expMonth);
      method.expYear = parseInt(formData.expYear);
      method.brand = getCardBrand(formData.cardNumber);
    } else if (methodType === 'bank_transfer') {
      method.accountNumber = formData.accountNumber;
      method.bankName = formData.bankName;
    } else if (methodType === 'store_credit') {
      method.creditBalance = parseFloat(formData.creditAmount);
    }

    onSave(method);
  };

  const getCardBrand = (number: string): string => {
    // Simple card brand detection
    if (number.startsWith('4')) return 'visa';
    if (number.startsWith('5')) return 'mastercard';
    if (number.startsWith('3')) return 'amex';
    return 'unknown';
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Add Payment Method
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Payment Type</label>
            <select
              value={methodType}
              onChange={(e) => setMethodType(e.target.value as PaymentMethod['type'])}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="credit_card">Credit Card</option>
              <option value="debit_card">Debit Card</option>
              <option value="paypal">PayPal</option>
              <option value="mercado_pago">Mercado Pago</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="store_credit">Store Credit</option>
            </select>
          </div>

          {(methodType === 'credit_card' || methodType === 'debit_card') && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  maxLength={16}
                  required
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Month</label>
                  <input
                    type="text"
                    value={formData.expMonth}
                    onChange={(e) => setFormData({ ...formData, expMonth: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    maxLength={2}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Year</label>
                  <input
                    type="text"
                    value={formData.expYear}
                    onChange={(e) => setFormData({ ...formData, expYear: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    maxLength={4}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">CVV</label>
                  <input
                    type="text"
                    value={formData.cvv}
                    onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {methodType === 'bank_transfer' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </>
          )}

          {methodType === 'store_credit' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Credit Amount (MXN)</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  value={formData.creditAmount}
                  onChange={(e) => setFormData({ ...formData, creditAmount: e.target.value })}
                  className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                1 credit = 1 MXN. Some products may have special prices when paying with credits.
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Add Payment Method
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}