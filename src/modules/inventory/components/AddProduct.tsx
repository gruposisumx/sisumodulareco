import React, { useState } from 'react';
import { Plus, X, Upload, Link as LinkIcon } from 'lucide-react';
import type { Product } from '../../../types';

interface AddProductProps {
  onClose: () => void;
  onAdd: (product: Partial<Product>) => void;
  mode: 'single' | 'bulk';
}

interface CustomField {
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean';
  required: boolean;
}

export function AddProduct({ onClose, onAdd, mode }: AddProductProps) {
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [imageType, setImageType] = useState<'upload' | 'link'>('upload');
  const [bulkFile, setBulkFile] = useState<File | null>(null);
  const [product, setProduct] = useState<Partial<Product>>({
    name: '',
    sku: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    minimumStock: 0,
    maximumStock: 0,
    reorderPoint: 0,
    unitOfMeasure: 'units',
    location: '',
    supplier: '',
    status: 'in_stock',
    tags: []
  });

  const handleAddCustomField = () => {
    setCustomFields([...customFields, { name: '', type: 'text', required: false }]);
  };

  const handleRemoveCustomField = (index: number) => {
    setCustomFields(customFields.filter((_, i) => i !== index));
  };

  const handleBulkUpload = (file: File) => {
    setBulkFile(file);
    // Here you would handle parsing the CSV/Excel file
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === 'single' ? 'Add New Product' : 'Bulk Add Products'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        {mode === 'bulk' ? (
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept=".csv,.xlsx"
                onChange={(e) => e.target.files?.[0] && handleBulkUpload(e.target.files[0])}
                className="hidden"
                id="bulk-upload"
              />
              <label
                htmlFor="bulk-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="w-12 h-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Click to upload CSV or Excel file
                </p>
                <p className="text-xs text-gray-400">
                  Download template for bulk upload
                </p>
              </label>
            </div>
            {bulkFile && (
              <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
                <span className="text-sm text-blue-700">{bulkFile.name}</span>
                <button
                  onClick={() => setBulkFile(null)}
                  className="text-blue-700 hover:text-blue-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name *
                </label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SKU *
                </label>
                <input
                  type="text"
                  value={product.sku}
                  onChange={(e) => setProduct({ ...product, sku: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price *
                </label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Initial Stock *
                </label>
                <input
                  type="number"
                  value={product.stock}
                  onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  value={product.category}
                  onChange={(e) => setProduct({ ...product, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Minimum Stock
                </label>
                <input
                  type="number"
                  value={product.minimumStock}
                  onChange={(e) => setProduct({ ...product, minimumStock: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Maximum Stock
                </label>
                <input
                  type="number"
                  value={product.maximumStock}
                  onChange={(e) => setProduct({ ...product, maximumStock: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Reorder Point
                </label>
                <input
                  type="number"
                  value={product.reorderPoint}
                  onChange={(e) => setProduct({ ...product, reorderPoint: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Product Image</h3>
              <div className="flex items-center space-x-4 mb-4">
                <button
                  onClick={() => setImageType('upload')}
                  className={`px-4 py-2 rounded-lg ${
                    imageType === 'upload'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <Upload className="w-4 h-4 inline-block mr-2" />
                  Upload Image
                </button>
                <button
                  onClick={() => setImageType('link')}
                  className={`px-4 py-2 rounded-lg ${
                    imageType === 'link'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <LinkIcon className="w-4 h-4 inline-block mr-2" />
                  Image URL
                </button>
              </div>
              {imageType === 'upload' ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="w-12 h-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Click to upload product image
                    </p>
                  </label>
                </div>
              ) : (
                <input
                  type="url"
                  placeholder="Enter image URL"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              )}
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Custom Fields</h3>
              <button
                onClick={handleAddCustomField}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Custom Field
              </button>

              <div className="mt-4 space-y-4">
                {customFields.map((field, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <input
                      type="text"
                      placeholder="Field Name"
                      value={field.name}
                      onChange={(e) => {
                        const newFields = [...customFields];
                        newFields[index].name = e.target.value;
                        setCustomFields(newFields);
                      }}
                      className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    <select
                      value={field.type}
                      onChange={(e) => {
                        const newFields = [...customFields];
                        newFields[index].type = e.target.value as any;
                        setCustomFields(newFields);
                      }}
                      className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="date">Date</option>
                      <option value="boolean">Yes/No</option>
                    </select>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => {
                          const newFields = [...customFields];
                          newFields[index].required = e.target.checked;
                          setCustomFields(newFields);
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Required</span>
                    </label>
                    <button
                      onClick={() => handleRemoveCustomField(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onAdd(product)}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            {mode === 'single' ? 'Add Product' : 'Upload Products'}
          </button>
        </div>
      </div>
    </div>
  );
}