import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Eye, DollarSign, Calendar, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { Sale } from '../types';

// Mock sales data
const mockSales: Sale[] = [
  {
    id: '1',
    productId: '1',
    productName: 'Wireless Mouse',
    quantity: 2,
    unitPrice: 29.99,
    totalAmount: 59.98,
    cashierId: '3',
    cashierName: 'John Doe',
    createdAt: '2024-01-20T10:30:00Z',
  },
  {
    id: '2',
    productId: '2',
    productName: 'Mechanical Keyboard',
    quantity: 1,
    unitPrice: 89.99,
    totalAmount: 89.99,
    cashierId: '3',
    cashierName: 'John Doe',
    createdAt: '2024-01-20T09:15:00Z',
  },
  {
    id: '3',
    productId: '3',
    productName: 'USB-C Cable',
    quantity: 3,
    unitPrice: 12.99,
    totalAmount: 38.97,
    cashierId: '4',
    cashierName: 'Jane Smith',
    createdAt: '2024-01-19T16:45:00Z',
  },
  {
    id: '4',
    productId: '1',
    productName: 'Wireless Mouse',
    quantity: 1,
    unitPrice: 29.99,
    totalAmount: 29.99,
    cashierId: '3',
    cashierName: 'John Doe',
    createdAt: '2024-01-19T14:20:00Z',
  },
];

export function Sales() {
  const [sales, setSales] = useState<Sale[]>(mockSales);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);

  const filteredSales = sales.filter(sale =>
    sale.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.cashierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (sale: Sale) => {
    setSelectedSale(sale);
    setIsModalOpen(true);
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalAmount, 0);
  const totalSales = sales.length;
  const averageSale = totalRevenue / totalSales;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Sales
        </h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          New Sale
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Sales
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {totalSales}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Average Sale
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  ${averageSale.toFixed(2)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search sales..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Recent Sales
          </h3>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                    Sale ID
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                    Product
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                    Quantity
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                    Unit Price
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                    Total
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                    Cashier
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                    Date
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sale, index) => (
                  <motion.tr
                    key={sale.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                      #{sale.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                      {sale.productName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                      {sale.quantity}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                      ${sale.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                      ${sale.totalAmount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                      {sale.cashierName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {new Date(sale.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewDetails(sale)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSales.length === 0 && (
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No sales found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchTerm ? 'Try adjusting your search terms.' : 'No sales have been recorded yet.'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Sale Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Sale Details"
        size="md"
      >
        {selectedSale && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                  Sale ID
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  #{selectedSale.id}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                  Date
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {new Date(selectedSale.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                Product
              </label>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedSale.productName}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                  Quantity
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedSale.quantity}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                  Unit Price
                </label>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  ${selectedSale.unitPrice.toFixed(2)}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Amount
                </label>
                <p className="text-lg font-semibold text-primary-600 dark:text-primary-400">
                  ${selectedSale.totalAmount.toFixed(2)}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400">
                Cashier
              </label>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {selectedSale.cashierName}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}