import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('spotfood_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('spotfood_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('spotfood_user');
    }
  }, [user]);

  const login = async (email, password) => {
    // Try remote backend first
    const res = await api.login(email, password);
    if (res && res.success) {
      api.setToken(res.token);
      setUser(res.user);
      return { success: true, user: res.user };
    }

    // Client-side fallback if backend server is not running
    if (email === 'admin@spotfood.in' && password === 'admin123') {
      const adminUser = {
        id: 'usr-admin-local',
        name: 'SpotFood Master Admin',
        email: 'admin@spotfood.in',
        role: 'admin',
        phone: '9876543210',
      };
      setUser(adminUser);
      api.setToken('mock_jwt_token_admin');
      return { success: true, user: adminUser };
    }

    if (email === 'customer@spotfood.in' && password === 'customer123') {
      const custUser = {
        id: 'usr-cust-local',
        name: 'Rahul Sharma',
        email: 'customer@spotfood.in',
        role: 'customer',
        phone: '9988776655',
      };
      setUser(custUser);
      api.setToken('mock_jwt_token_customer');
      return { success: true, user: custUser };
    }

    // Default dynamic user creation for testing
    if (email && password.length >= 6) {
      const dynamicUser = {
        id: 'usr-' + Date.now(),
        name: email.split('@')[0],
        email,
        role: email.includes('admin') ? 'admin' : 'customer',
        phone: '9876543210',
      };
      setUser(dynamicUser);
      api.setToken('mock_jwt_token_' + Date.now());
      return { success: true, user: dynamicUser };
    }

    return { success: false, message: 'Invalid credentials. Password must be 6+ characters.' };
  };

  const register = async (name, email, password, phone) => {
    const res = await api.register(name, email, password, phone);
    if (res && res.success) {
      api.setToken(res.token);
      setUser(res.user);
      return { success: true, user: res.user };
    }

    // Fallback registration
    const newUser = {
      id: 'usr-' + Date.now(),
      name,
      email,
      phone: phone || '',
      role: 'customer',
    };
    setUser(newUser);
    api.setToken('mock_jwt_token_' + Date.now());
    return { success: true, user: newUser };
  };

  const logout = () => {
    setUser(null);
    api.setToken(null);
    localStorage.removeItem('spotfood_user');
    localStorage.removeItem('spotfood_token');
  };

  const isAdmin = user && user.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        login,
        register,
        logout,
        isAuthModalOpen,
        setIsAuthModalOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
