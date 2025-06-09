import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Package,
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertTriangle,
  ShoppingCart,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

// Mock data
const salesData = [
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 2000, revenue: 9800 },
  { name: 'Apr', sales: 2780, revenue: 3908 },
  { name: 'May', sales: 1890, revenue: 4800 },
  { name: 'Jun', sales: 2390, revenue: 3800 },
];

const categoryData = [
  { name: 'Electronics', value: 400, color: '#3b82f6' },
  { name: 'Clothing', value: 300, color: '#10b981' },
  { name: 'Books', value: 200, color: '#f59e0b' },
  { name: 'Home', value: 100, color: '#ef4444' },
];

const recentSales = [
  { id: '1', product: 'Wireless Mouse', quantity: 2, amount: 59.98, customer: 'John Doe' },
  { id: '2', product: 'Keyboard', quantity: 1, amount: 89.99, customer: 'Jane Smith' },
  { id: '3', product: 'Monitor', quantity: 1, amount: 299.99, customer: 'Bob Johnson' },
  { id: '4', product: 'Headphones', quantity: 3, amount: 179.97, customer: 'Alice Brown' },
];

const lowStockProducts = [
  { name: 'Wireless Mouse', stock: 5, minStock: 10 },
  { name: 'USB Cable', stock: 3, minStock: 15 },
  { name: 'Phone Case', stock: 2, minStock: 8 },
];

export function Dashboard() {
  const stats = [
    {
      title: 'Total Products',
      value: '1,234',
      change: '+12%',
      changeType: 'positive' as const,
      icon: Package,
    },
    {
      title: 'Total Sales',
      value: '856',
      change: '+8%',
      changeType: 'positive' as const,
      icon: ShoppingCart,
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+15%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: 'Low Stock Items',
      value: '23',
      change: '-5%',
      changeType: 'negative' as const,
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <div className="flex items-center mt-2">
                      {stat.changeType === 'positive' ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          stat.changeType === 'positive'
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Sales Overview
              </h3>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Product Categories
              </h3>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Sales
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {sale.product}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {sale.customer} • Qty: {sale.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900 dark:text-white">
                        ${sale.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Low Stock Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Low Stock Alert
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lowStockProducts.map((product, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                  >
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Min: {product.minStock}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-red-600 dark:text-red-400">
                        {product.stock} left
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}