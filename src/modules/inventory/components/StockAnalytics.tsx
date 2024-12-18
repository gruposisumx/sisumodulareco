import React from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, Package, RefreshCw } from 'lucide-react';
import type { Product } from '../../../types';

interface StockAnalyticsProps {
  products: Product[];
}

export function StockAnalytics({ products }: StockAnalyticsProps) {
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStockItems = products.filter(p => p.stock <= p.minimumStock).length;
  const outOfStockItems = products.filter(p => p.stock === 0).length;
  const reorderNeeded = products.filter(p => p.stock <= p.reorderPoint).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Stock</p>
            <p className="text-2xl font-bold text-gray-900">{totalStock}</p>
          </div>
          <Package className="w-8 h-8 text-blue-500" />
        </div>
        <p className="mt-2 text-sm text-gray-500">Across all products</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
            <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
          </div>
          <TrendingDown className="w-8 h-8 text-yellow-500" />
        </div>
        <p className="mt-2 text-sm text-gray-500">Below minimum threshold</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Out of Stock</p>
            <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
          </div>
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        <p className="mt-2 text-sm text-gray-500">Requires immediate attention</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Reorder Needed</p>
            <p className="text-2xl font-bold text-indigo-600">{reorderNeeded}</p>
          </div>
          <RefreshCw className="w-8 h-8 text-indigo-500" />
        </div>
        <p className="mt-2 text-sm text-gray-500">Below reorder point</p>
      </div>
    </div>
  );
}