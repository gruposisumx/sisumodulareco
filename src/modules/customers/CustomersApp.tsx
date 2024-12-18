import React, { useState } from 'react';
import { Users, Plus, Gift, CreditCard } from 'lucide-react';
import type { Customer, PaymentMethod } from '../../types';
import { AddEditCustomer } from './components/AddEditCustomer';
import { CustomerBenefits } from './components/CustomerBenefits';
import { CustomerPayments } from './components/CustomerPayments';

const initialCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '555-0123',
    address: '123 Main St',
    type: 'regular',
    status: 'active'
  }
];

export function CustomersApp() {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [showBenefits, setShowBenefits] = useState(false);
  const [showPayments, setShowPayments] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const handleSaveCustomer = (customer: Customer) => {
    if (editingCustomer) {
      setCustomers(current =>
        current.map(c => c.id === editingCustomer.id ? { ...customer, id: editingCustomer.id } : c)
      );
      setEditingCustomer(null);
    } else {
      setCustomers(current => [...current, { ...customer, id: String(Date.now()) }]);
    }
    setShowAddCustomer(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
          <Users className="w-8 h-8" />
          Customer Management
        </h1>
        <button
          onClick={() => setShowAddCustomer(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Customer
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {customers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{customer.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{customer.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{customer.address}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    customer.type === 'vip'
                      ? 'bg-purple-100 text-purple-800'
                      : customer.type === 'preferred'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {customer.type.toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => {
                      setEditingCustomer(customer);
                      setShowAddCustomer(true);
                    }}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCustomerId(customer.id);
                      setShowBenefits(true);
                    }}
                    className="text-green-600 hover:text-green-900 mr-4"
                  >
                    <Gift className="w-5 h-5 inline" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCustomerId(customer.id);
                      setShowPayments(true);
                    }}
                    className="text-purple-600 hover:text-purple-900"
                  >
                    <CreditCard className="w-5 h-5 inline" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(showAddCustomer || editingCustomer) && (
        <AddEditCustomer
          customer={editingCustomer || undefined}
          onClose={() => {
            setShowAddCustomer(false);
            setEditingCustomer(null);
          }}
          onSave={handleSaveCustomer}
        />
      )}

      {showBenefits && selectedCustomerId && (
        <CustomerBenefits
          customerId={selectedCustomerId}
          onClose={() => {
            setShowBenefits(false);
            setSelectedCustomerId(null);
          }}
        />
      )}

      {showPayments && selectedCustomerId && (
        <CustomerPayments
          customerId={selectedCustomerId}
          paymentMethods={paymentMethods}
          onUpdatePaymentMethods={setPaymentMethods}
          onClose={() => {
            setShowPayments(false);
            setSelectedCustomerId(null);
          }}
        />
      )}
    </div>
  );
}