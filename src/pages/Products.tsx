import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Package } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Product } from '../types';

// Mock products data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with USB receiver',
    sku: 'WM001',
    category: 'Electronics',
    price: 29.99,
    cost: 15.00,
    quantity: 150,
    minStock: 20,
    supplier: 'Tech Supplies Inc.',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches',
    sku: 'KB001',
    category: 'Electronics',
    price: 89.99,
    cost: 45.00,
    quantity: 75,
    minStock: 10,
    supplier: 'Keyboard Co.',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z',
  },
  {
    id: '3',
    name: 'USB-C Cable',
    description: '6ft USB-C to USB-A cable',
    sku: 'CB001',
    category: 'Accessories',
    price: 12.99,
    cost: 6.00,
    quantity: 200,
    minStock: 50,
    supplier: 'Cable World',
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-17T00:00:00Z',
  },
];

export function Products() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Products
        </h1>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                      <Package className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        SKU: {product.sku}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {product.description}
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Category
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Price
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Stock
                    </span>
                    <span className={`text-sm font-medium ${
                      product.quantity <= product.minStock
                        ? 'text-red-600 dark:text-red-400'
                        : 'text-green-600 dark:text-green-400'
                    }`}>
                      {product.quantity} units
                    </span>
                  </div>

                  {product.quantity <= product.minStock && (
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <p className="text-xs text-red-600 dark:text-red-400 font-medium">
                        Low Stock Alert
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No products found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first product.'}
          </p>
        </div>
      )}

      {/* Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Product Name" placeholder="Enter product name" />
            <Input label="SKU" placeholder="Enter SKU" />
          </div>
          <Input label="Description" placeholder="Enter product description" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Category" placeholder="Enter category" />
            <Input label="Supplier" placeholder="Enter supplier" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input label="Price ($)" type="number" placeholder="0.00" />
            <Input label="Cost ($)" type="number" placeholder="0.00" />
            <Input label="Quantity" type="number" placeholder="0" />
          </div>
          <Input label="Minimum Stock" type="number" placeholder="0" />
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button>
              {editingProduct ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}