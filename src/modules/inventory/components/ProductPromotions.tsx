import React, { useState } from 'react';
import { Calendar, Tag, Bell, Megaphone } from 'lucide-react';

interface Promotion {
  id: string;
  name: string;
  type: 'discount' | 'bogo' | 'bundle';
  startDate: string;
  endDate: string;
  discount?: number;
  conditions: string[];
  active: boolean;
}

interface ProductPromotionsProps {
  productId: string;
  onClose: () => void;
}

const initialPromotions: Promotion[] = [
  {
    id: '1',
    name: 'Summer Sale',
    type: 'discount',
    startDate: '2024-06-01',
    endDate: '2024-08-31',
    discount: 20,
    conditions: ['Minimum purchase: $50'],
    active: true
  }
];

export function ProductPromotions({ productId, onClose }: ProductPromotionsProps) {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [showNewPromotion, setShowNewPromotion] = useState(false);

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Megaphone className="w-6 h-6 mr-2" />
            Product Promotions
          </h2>
          <button
            onClick={() => setShowNewPromotion(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Promotion
          </button>
        </div>

        <div className="space-y-4">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{promo.name}</h3>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(promo.startDate).toLocaleDateString()} - {new Date(promo.endDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {promo.type === 'discount' ? `${promo.discount}% OFF` : promo.type.toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={promo.active}
                      onChange={() => {
                        setPromotions(promotions.map(p =>
                          p.id === promo.id ? { ...p, active: !p.active } : p
                        ));
                      }}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
              <div className="mt-2">
                <h4 className="text-sm font-medium text-gray-700">Conditions:</h4>
                <ul className="mt-1 list-disc list-inside text-sm text-gray-600">
                  {promo.conditions.map((condition, index) => (
                    <li key={index}>{condition}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {showNewPromotion && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">New Promotion</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Promotion Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Promotion Type
                  </label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                    <option value="discount">Percentage Discount</option>
                    <option value="bogo">Buy One Get One</option>
                    <option value="bundle">Bundle Deal</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowNewPromotion(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowNewPromotion(false)}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Create Promotion
                </button>
              </div>
            </div>
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
      </div>
    </div>
  );
}