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
  AreaChart,
  Area,
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, Users, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';

// Mock data
const monthlyData = [
  { month: 'Jan', sales: 4000, revenue: 24000, profit: 8000 },
  { month: 'Feb', sales: 3000, revenue: 18000, profit: 6000 },
  { month: 'Mar', sales: 5000, revenue: 30000, profit: 10000 },
  { month: 'Apr', sales: 4500, revenue: 27000, profit: 9000 },
  { month: 'May', sales: 6000, revenue: 36000, profit: 12000 },
  { month: 'Jun', sales: 5500, revenue: 33000, profit: 11000 },
];

const categoryData = [
  { name: 'Electronics', value: 45, color: '#3b82f6' },
  { name: 'Clothing', value: 25, color: '#10b981' },
  { name: 'Books', value: 15, color: '#f59e0b' },
  { name: 'Home & Garden', value: 10, color: '#ef4444' },
  { name: 'Sports', value: 5, color: '#8b5cf6' },
];

const topProducts = [
  { name: 'Wireless Mouse', sales: 245, revenue: 7350 },
  { name: 'Keyboard', sales: 189, revenue: 17010 },
  { name: 'Monitor', sales: 156, revenue: 46800 },
  { name: 'Headphones', sales: 134, revenue: 8040 },
  { name: 'USB Cable', sales: 298, revenue: 3870 },
];

const dailySales = [
  { day: 'Mon', sales: 120 },
  { day: 'Tue', sales: 150 },
  { day: 'Wed', sales: 180 },
  { day: 'Thu', sales: 200 },
  { day: 'Fri', sales: 250 },
  { day: 'Sat', sales: 300 },
  { day: 'Sun', sales: 220 },
];

export function Analytics() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$168,000',
      change: '+12.5%',
      changeType: 'positive' as const,
      icon: DollarSign,
    },
    {
      title: 'Total Sales',
      value: '28,000',
      change: '+8.2%',
      changeType: 'positive' as const,
      icon: ShoppingCart,
    },
    {
      title: 'Products Sold',
      value: '1,420',
      change: '+15.3%',
      changeType: 'positive' as const,
      icon: Package,
    },
    {
      title: 'Active Customers',
      value: '892',
      change: '-2.1%',
      changeType: 'negative' as const,
      icon: Users,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last 6 months
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

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Revenue Trend
              </h3>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Sales by Category */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Sales by Category
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
                    label={({ name, value }) => `${name}: ${value}%`}
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

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Top Products by Revenue
              </h3>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topProducts} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Daily Sales */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Daily Sales (This Week)
              </h3>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailySales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Monthly Performance
            </h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  name="Sales"
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  name="Profit"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}