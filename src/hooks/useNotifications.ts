import { useState, useEffect } from 'react';
import { Notification } from '../types';

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Low Stock Alert',
    message: 'Product "Wireless Mouse" is running low on stock (5 remaining)',
    type: 'warning',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
  },
  {
    id: '2',
    title: 'New Sale',
    message: 'Sale completed: $150.00 by John Doe',
    type: 'success',
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
  },
  {
    id: '3',
    title: 'System Update',
    message: 'System maintenance scheduled for tonight at 2 AM',
    type: 'info',
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
];

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    markAsRead,
    markAllAsRead,
    unreadCount,
  };
}