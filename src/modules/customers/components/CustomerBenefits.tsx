import React, { useState } from 'react';
import { Gift, Star, Shield } from 'lucide-react';

interface Benefit {
  id: string;
  name: string;
  description: string;
  type: 'discount' | 'reward' | 'service';
  value: string;
  active: boolean;
}

interface CustomerBenefitsProps {
  customerId: string;
  onClose: () => void;
}

const initialBenefits: Benefit[] = [
  {
    id: '1',
    name: '10% Off All Purchases',
    description: 'Permanent discount on all products',
    type: 'discount',
    value: '10',
    active: true
  },
  {
    id: '2',
    name: 'Priority Support',
    description: '24/7 dedicated customer service',
    type: 'service',
    value: 'priority',
    active: true
  }
];

export function CustomerBenefits({ customerId, onClose }: CustomerBenefitsProps) {
  const [benefits, setBenefits] = useState<Benefit[]>(initialBenefits);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Gift className="w-6 h-6 mr-2" />
            Customer Benefits & Privileges
          </h2>
          <button
            onClick={() => {}}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Benefit
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {benefit.type === 'discount' ? (
                    <Star className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <Shield className="w-5 h-5 text-blue-500" />
                  )}
                  <h3 className="ml-2 text-lg font-medium text-gray-900">{benefit.name}</h3>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={benefit.active}
                    onChange={() => {
                      setBenefits(benefits.map(b =>
                        b.id === benefit.id ? { ...b, active: !b.active } : b
                      ));
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
              <p className="mt-2 text-sm text-gray-500">{benefit.description}</p>
              {benefit.type === 'discount' && (
                <p className="mt-1 text-sm font-medium text-blue-600">
                  {benefit.value}% discount
                </p>
              )}
            </div>
          ))}
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
    </div>
  );
}