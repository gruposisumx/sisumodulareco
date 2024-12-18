import React from 'react';
import { Package, Truck, Tag, MapPin, AlertTriangle } from 'lucide-react';
import type { Product } from '../../../types';

interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
  onEdit: () => void;
}

export function ProductDetails({ product, onClose, onEdit }: ProductDetailsProps) {
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <p className="text-sm text-gray-500">SKU: {product.sku}</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Edit Product
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Stock Information</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Current Stock</span>
                  <span className={`font-medium ${
                    product.stock <= product.minimumStock
                      ? 'text-red-600'
                      : 'text-gray-900'
                  }`}>
                    {product.stock} {product.unitOfMeasure}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Minimum Stock</span>
                  <span className="font-medium text-gray-900">
                    {product.minimumStock} {product.unitOfMeasure}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Maximum Stock</span>
                  <span className="font-medium text-gray-900">
                    {product.maximumStock} {product.unitOfMeasure}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Reorder Point</span>
                  <span className="font-medium text-gray-900">
                    {product.reorderPoint} {product.unitOfMeasure}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Category: {product.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Location: {product.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Supplier Information</h3>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500">
                    Supplier: {product.supplier}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Last Restocked: {new Date(product.lastRestocked).toLocaleDateString()}
                </div>
              </div>
            </div>

            {product.dimensions && (
              <div>
                <h3 className="text-lg font-medium text-gray-900">Dimensions</h3>
                <div className="mt-2 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Length:</span>
                      <span className="ml-2 text-gray-900">
                        {product.dimensions.length} {product.dimensions.unit}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Width:</span>
                      <span className="ml-2 text-gray-900">
                        {product.dimensions.width} {product.dimensions.unit}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Height:</span>
                      <span className="ml-2 text-gray-900">
                        {product.dimensions.height} {product.dimensions.unit}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">Weight:</span>
                      <span className="ml-2 text-gray-900">
                        {product.dimensions.weight} {product.dimensions.unit}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-medium text-gray-900">Tags</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {product.stock <= product.minimumStock && (
          <div className="mt-6 p-4 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-sm text-red-700">
                Stock level is below minimum threshold. Consider restocking soon.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}