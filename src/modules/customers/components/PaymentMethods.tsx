import React, { useState } from 'react';
import { CreditCard, Wallet, Plus, Trash2 } from 'lucide-react';
import type { PaymentMethod } from '../../../types';
import { PaymentMethodForm } from './PaymentMethodForm';

interface PaymentMethodsProps {
  customerId: string;
  paymentMethods: PaymentMethod[];
  onUpdatePaymentMethods: (methods: PaymentMethod[]) => void;
  onClose: () => void;
}

export function PaymentMethods({ 
  customerId, 
  paymentMethods,
  onUpdatePaymentMethods,
  onClose 
}: PaymentMethodsProps) {
  const [showAddMethod, setShowAddMethod] = useState(false);

  const handleAddMethod = (method: PaymentMethod) => {
    onUpdatePaymentMethods([...paymentMethods, method]);
    setShowAddMethod(false);
  };

  const handleRemoveMethod = (methodId: string) => {
    onUpdatePaymentMethods(paymentMethods.filter(m => m.id !== methodId));
  };

  const handleSetDefault = (methodId: string) => {
    onUpdatePaymentMethods(paymentMethods.map(m => ({
      ...m,
      isDefault: m.id === methodId
    })));
  };

  const getMethodIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'credit_card':
      case 'debit_card':
        return <CreditCard className="w-5 h-5" />;
      default:
        return <Wallet className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <CreditCard className="w-6 h-6 mr-2" />
            Payment Methods
          </h2>
          <button
            onClick={() => setShowAddMethod(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Method
          </button>
        </div>

        {paymentMethods.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No payment methods</h3>
            <p className="mt-1 text-sm text-gray-500">Add a payment method to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`border rounded-lg p-4 ${
                  method.isDefault ? 'border-blue-500 shadow-md' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {getMethodIcon(method.type)}
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        {method.type === 'credit_card' || method.type === 'debit_card' ? (
                          <>
                            {method.brand?.toUpperCase()} •••• {method.last4}
                            <span className="ml-2 text-xs text-gray-500">
                              {method.expMonth}/{method.expYear}
                            </span>
                          </>
                        ) : method.type === 'bank_transfer' ? (
                          <>
                            {method.bankName}
                            <span className="ml-2 text-xs text-gray-500">
                              •••• {method.accountNumber?.slice(-4)}
                            </span>
                          </>
                        ) : method.type === 'store_credit' ? (
                          <>
                            Store Credit
                            <span className="ml-2 text-sm text-green-600">
                              ${method.creditBalance?.toFixed(2)}
                            </span>
                          </>
                        ) : (
                          method.type.replace('_', ' ').toUpperCase()
                        )}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!method.isDefault && (
                      <button
                        onClick={() => handleSetDefault(method.id)}
                        className="text-sm text-blue-600 hover:text-blue-800"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      onClick={() => handleRemoveMethod(method.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {method.isDefault && (
                  <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Default
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
        </div>

        {showAddMethod && (
          <PaymentMethodForm
            customerId={customerId}
            onClose={() => setShowAddMethod(false)}
            onSave={handleAddMethod}
          />
        )}
      </div>
    </div>
  );
}