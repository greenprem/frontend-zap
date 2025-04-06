import React from 'react';
import { Building2, User } from 'lucide-react';
import { UserType } from '../types';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  userType?: UserType;
  onUserTypeChange?: (type: UserType) => void;
}

export function AuthLayout({ children, title, subtitle, userType, onUserTypeChange }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">{title}</h1>
        {subtitle && (
          <p className="text-gray-600 text-center mb-6">{subtitle}</p>
        )}
        
        {onUserTypeChange && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">Are you a business?</h2>
            <div className="flex gap-4">
              <button
                onClick={() => onUserTypeChange('individual')}
                className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  userType === 'individual'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <User size={24} />
                <span>Individual</span>
              </button>
              <button
                onClick={() => onUserTypeChange('business')}
                className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-lg border-2 transition-all ${
                  userType === 'business'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-600'
                }`}
              >
                <Building2 size={24} />
                <span>Business</span>
              </button>
            </div>
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
}