import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/layout/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Users } from './pages/Users';
import { Sales } from './pages/Sales';
import { Analytics } from './pages/Analytics';
import { Chat } from './pages/Chat';
import { Settings } from './pages/Settings';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route
                  path="products"
                  element={
                    <ProtectedRoute roles={['admin', 'assistant']}>
                      <Products />
                    </ProtectedRoute>
                  }
                />
                <Route path="sales" element={<Sales />} />
                <Route
                  path="analytics"
                  element={
                    <ProtectedRoute roles={['admin', 'assistant']}>
                      <Analytics />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="users"
                  element={
                    <ProtectedRoute roles={['admin']}>
                      <Users />
                    </ProtectedRoute>
                  }
                />
                <Route path="chat" element={<Chat />} />
                <Route
                  path="settings"
                  element={
                    <ProtectedRoute roles={['admin']}>
                      <Settings />
                    </ProtectedRoute>
                  }
                />
              </Route>
            </Routes>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                className: 'dark:bg-gray-800 dark:text-white',
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;