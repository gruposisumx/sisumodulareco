import React, { useState } from 'react';
import { DollarSign, CreditCard, AlertTriangle, Wallet } from 'lucide-react';
import { PaymentMethods } from './PaymentMethods';

interface Payment {
  id: string;
  amount: number;
  type: 'payment' | 'credit' | 'debit';
  status: 'completed' | 'pending' | 'failed';
  date: string;
  reference: string;
}

interface CustomerPaymentsProps {
  customerId: string;
  paymentMethods: PaymentMethod[];
  onUpdatePaymentMethods: (methods: PaymentMethod[]) => void;
  onClose: () => void;
}

const initialPayments: Payment[] = [
  {
    id: '1',
    amount: 500,
    type: 'payment',
    status: 'completed',
    date: new Date().toISOString(),
    reference: 'PAY-001'
  }
];

export function CustomerPayments({ 
  customerId, 
  paymentMethods,
  onUpdatePaymentMethods,
  onClose 
}: CustomerPaymentsProps) {
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [balance, setBalance] = useState({
    current: 1500,
    pending: 500,
    credit: 200
  });

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <DollarSign className="w-6 h-6 mr-2" />
            Customer Payments
          </h2>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowPaymentMethods(true)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Payment Methods
            </button>
            <button
              onClick={() => {}}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Record Payment
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Current Balance</h3>
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              ${balance.current.toFixed(2)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Pending Payments</h3>
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="mt-2 text-3xl font-bold text-yellow-600">
              ${balance.pending.toFixed(2)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow border">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">Available Credit</h3>
              <CreditCard className="w-5 h-5 text-green-400" />
            </div>
            <p className="mt-2 text-3xl font-bold text-green-600">
              ${balance.credit.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${payment.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      payment.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : payment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.reference}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
      {showPaymentMethods && (
        <PaymentMethods
          customerId={customerId}
          paymentMethods={paymentMethods}
          onUpdatePaymentMethods={onUpdatePaymentMethods}
          onClose={() => setShowPaymentMethods(false)}
        />
      )}
    </div>
  );
}