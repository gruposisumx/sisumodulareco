import React, { useState } from 'react';
import { Package, Plus, Filter, Search, Upload, Bell } from 'lucide-react';
import type { Product, StockMovement } from '../../types';
import { StockAnalytics } from './components/StockAnalytics';
import { StockMovementLog } from './components/StockMovementLog';
import { ProductDetails } from './components/ProductDetails';
import { AddProduct } from './components/AddProduct';
import { ProductPromotions } from './components/ProductPromotions';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Example Product',
    description: 'This is an example product',
    price: 99.99,
    stock: 100,
    category: 'General',
    sku: 'EP001',
    location: 'Warehouse A',
    minimumStock: 20,
    maximumStock: 200,
    reorderPoint: 50,
    unitOfMeasure: 'units',
    supplier: 'Main Supplier Inc.',
    lastRestocked: new Date().toISOString(),
    stockHistory: [],
    status: 'in_stock',
    tags: ['electronics', 'featured'],
    dimensions: {
      length: 10,
      width: 5,
      height: 2,
      weight: 0.5,
      unit: 'cm'
    }
  }
];

const initialMovements: StockMovement[] = [
  {
    id: '1',
    productId: '1',
    type: 'in',
    quantity: 100,
    reason: 'Initial stock',
    date: new Date().toISOString(),
    performedBy: 'John Doe',
    reference: 'PO-001'
  }
];
export function InventoryApp() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [movements, setMovements] = useState<StockMovement[]>(initialMovements);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [addMode, setAddMode] = useState<'single' | 'bulk'>('single');
  const [showPromotions, setShowPromotions] = useState(false);
  
  const categories = Array.from(new Set(products.map(p => p.category)));
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Package className="w-8 h-8" />
          Inventory Management
        </h1>
        <div className="flex space-x-2">
          <div className="relative">
            <button
              onClick={() => setShowAddProduct(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </button>
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
              <div className="py-1">
                <button
                  onClick={() => { setAddMode('single'); setShowAddProduct(true); }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Add Single Product
                </button>
                <button
                  onClick={() => { setAddMode('bulk'); setShowAddProduct(true); }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Bulk Add Products
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <StockAnalytics products={products} />

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-400 mr-2" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500">${product.price}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{product.stock} {product.unitOfMeasure}</div>
                  {product.stock <= product.reorderPoint && (
                    <div className="text-xs text-red-600">Below reorder point</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    product.status === 'in_stock'
                      ? 'bg-green-100 text-green-800'
                      : product.status === 'low_stock'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status.replace('_', ' ').toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.location}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-6">
        <StockMovementLog movements={movements} />
      </div>

      {selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          onClose={() => {
            setSelectedProduct(null);
            setShowPromotions(false);
          }}
          onEdit={() => {/* Handle edit */}}
          onPromotions={() => setShowPromotions(true)}
        />
      )}

      {showAddProduct && (
        <AddProduct
          mode={addMode}
          onClose={() => setShowAddProduct(false)}
          onAdd={(product) => {
            // Handle adding product
            setShowAddProduct(false);
          }}
        />
      )}

      {showPromotions && selectedProduct && (
        <ProductPromotions
          productId={selectedProduct.id}
          onClose={() => setShowPromotions(false)}
        />
      )}
    </div>
  );
}