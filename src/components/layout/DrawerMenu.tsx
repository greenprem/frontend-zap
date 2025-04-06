import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Settings,
  Bell,
  CreditCard,
  Clock,
  HelpCircle,
  FileText,
  LogOut,
  X
} from 'lucide-react';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: { name: string; email: string; avatar: string };
  onLogout: () => void;
}

export function DrawerMenu({ isOpen, onClose, user, onLogout }: DrawerMenuProps) {
  const menuItems = [
    { icon: Settings, label: 'Account Settings' },
    { icon: Bell, label: 'Notifications' },
    { icon: CreditCard, label: 'Payment Methods' },
    { icon: Clock, label: 'Order History' },
    { icon: HelpCircle, label: 'Help & Support' },
    { icon: FileText, label: 'Terms & Conditions' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="p-4 flex justify-end">
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold text-lg">{user.name}</h2>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
              </div>
            </div>

            <nav className="p-4">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <item.icon size={20} className="text-gray-600" />
                  <span>{item.label}</span>
                </button>
              ))}

              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-4 p-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-4"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}