import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, User, Shield, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Modal } from '../components/ui/Modal';
import { User as UserType } from '../types';

// Mock users data
const mockUsers: UserType[] = [
  {
    id: '1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: '2024-01-01T00:00:00Z',
    lastLogin: '2024-01-20T10:30:00Z',
  },
  {
    id: '2',
    email: 'assistant@example.com',
    name: 'Assistant User',
    role: 'assistant',
    createdAt: '2024-01-02T00:00:00Z',
    lastLogin: '2024-01-19T14:15:00Z',
  },
  {
    id: '3',
    email: 'cashier@example.com',
    name: 'Cashier User',
    role: 'cashier',
    createdAt: '2024-01-03T00:00:00Z',
    lastLogin: '2024-01-18T09:45:00Z',
  },
  {
    id: '4',
    email: 'john.doe@example.com',
    name: 'John Doe',
    role: 'cashier',
    createdAt: '2024-01-04T00:00:00Z',
    lastLogin: '2024-01-17T16:20:00Z',
  },
];

export function Users() {
  const [users, setUsers] = useState<UserType[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserType | null>(null);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user: UserType) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleAddNew = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return Shield;
      case 'assistant':
        return UserCheck;
      case 'cashier':
        return User;
      default:
        return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20';
      case 'assistant':
        return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20';
      case 'cashier':
        return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Users Management
        </h1>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user, index) => {
          const RoleIcon = getRoleIcon(user.role);
          return (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-white">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {user.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Role
                      </span>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        <RoleIcon className="h-3 w-3" />
                        <span className="capitalize">{user.role}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Created
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Last Login
                      </span>
                      <span className="text-sm text-gray-900 dark:text-white">
                        {user.lastLogin
                          ? new Date(user.lastLogin).toLocaleDateString()
                          : 'Never'
                        }
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No users found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first user.'}
          </p>
        </div>
      )}

      {/* User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Add New User'}
        size="md"
      >
        <div className="space-y-4">
          <Input label="Full Name" placeholder="Enter full name" />
          <Input label="Email Address" type="email" placeholder="Enter email address" />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Role
            </label>
            <select className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-gray-100 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500">
              <option value="cashier">Cashier</option>
              <option value="assistant">Assistant</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {!editingUser && (
            <Input label="Password" type="password" placeholder="Enter password" />
          )}
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button>
              {editingUser ? 'Update User' : 'Add User'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}