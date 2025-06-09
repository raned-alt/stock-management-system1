import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Bell, Shield, Database, Mail, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import toast from 'react-hot-toast';

export function Settings() {
  const [settings, setSettings] = useState({
    // General Settings
    companyName: 'Stock Management System',
    companyEmail: 'admin@stockms.com',
    timezone: 'UTC-5',
    currency: 'USD',
    
    // Notification Settings
    emailNotifications: true,
    lowStockAlerts: true,
    salesReports: true,
    systemUpdates: false,
    
    // Security Settings
    sessionTimeout: '30',
    passwordExpiry: '90',
    twoFactorAuth: false,
    
    // System Settings
    backupFrequency: 'daily',
    dataRetention: '365',
    maintenanceMode: false,
  });

  const handleSave = () => {
    // Simulate saving settings
    toast.success('Settings saved successfully!');
  };

  const handleInputChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  General Settings
                </h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Company Name"
                value={settings.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
              />
              <Input
                label="Company Email"
                type="email"
                value={settings.companyEmail}
                onChange={(e) => handleInputChange('companyEmail', e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Timezone
                </label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleInputChange('timezone', e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="UTC-8">Pacific Time (UTC-8)</option>
                  <option value="UTC-7">Mountain Time (UTC-7)</option>
                  <option value="UTC-6">Central Time (UTC-6)</option>
                  <option value="UTC-5">Eastern Time (UTC-5)</option>
                  <option value="UTC+0">UTC</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Currency
                </label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleInputChange('currency', e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="GBP">British Pound (GBP)</option>
                  <option value="CAD">Canadian Dollar (CAD)</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Bell className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Notifications
                </h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { key: 'emailNotifications', label: 'Email Notifications' },
                { key: 'lowStockAlerts', label: 'Low Stock Alerts' },
                { key: 'salesReports', label: 'Daily Sales Reports' },
                { key: 'systemUpdates', label: 'System Update Notifications' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.label}
                  </label>
                  <button
                    onClick={() => handleInputChange(item.key, !settings[item.key as keyof typeof settings])}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings[item.key as keyof typeof settings]
                        ? 'bg-primary-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings[item.key as keyof typeof settings] ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Security Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Security
                </h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                label="Session Timeout (minutes)"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleInputChange('sessionTimeout', e.target.value)}
              />
              <Input
                label="Password Expiry (days)"
                type="number"
                value={settings.passwordExpiry}
                onChange={(e) => handleInputChange('passwordExpiry', e.target.value)}
              />
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Two-Factor Authentication
                </label>
                <button
                  onClick={() => handleInputChange('twoFactorAuth', !settings.twoFactorAuth)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.twoFactorAuth
                      ? 'bg-primary-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Database className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  System
                </h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Backup Frequency
                </label>
                <select
                  value={settings.backupFrequency}
                  onChange={(e) => handleInputChange('backupFrequency', e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <Input
                label="Data Retention (days)"
                type="number"
                value={settings.dataRetention}
                onChange={(e) => handleInputChange('dataRetention', e.target.value)}
              />
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Maintenance Mode
                </label>
                <button
                  onClick={() => handleInputChange('maintenanceMode', !settings.maintenanceMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.maintenanceMode
                      ? 'bg-red-600'
                      : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.maintenanceMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex justify-end space-x-3"
      >
        <Button variant="outline">
          Reset to Defaults
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save All Changes
        </Button>
      </motion.div>
    </div>
  );
}