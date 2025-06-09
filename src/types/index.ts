export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'assistant' | 'cashier';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  category: string;
  price: number;
  cost: number;
  quantity: number;
  minStock: number;
  supplier: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sale {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  cashierId: string;
  cashierName: string;
  createdAt: string;
}

export interface Purchase {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  totalAmount: number;
  supplier: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalProducts: number;
  lowStockProducts: number;
  totalSales: number;
  totalRevenue: number;
  recentSales: Sale[];
  topProducts: Array<{
    name: string;
    sales: number;
    revenue: number;
  }>;
}