import React from 'react';
import { Camera, ShoppingBag, Recycle } from 'lucide-react';
import { NavigationSection } from '../../types';
import { cn } from '../../utils/cn';

interface BottomNavigationProps {
  activeSection: NavigationSection;
  onSectionChange: (section: NavigationSection) => void;
}

export function BottomNavigation({ activeSection, onSectionChange }: BottomNavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="flex justify-around items-center max-w-md mx-auto">
        <button
          onClick={() => onSectionChange('sell')}
          className={cn(
            'flex flex-col items-center p-2 rounded-lg transition-colors',
            activeSection === 'sell' ? 'text-blue-600' : 'text-gray-600'
          )}
        >
          <Camera size={24} />
          <span className="text-xs mt-1">Sell</span>
        </button>
        
        <button
          onClick={() => onSectionChange('buy')}
          className={cn(
            'flex flex-col items-center p-2 rounded-lg transition-colors',
            activeSection === 'buy' ? 'text-blue-600' : 'text-gray-600'
          )}
        >
          <ShoppingBag size={24} />
          <span className="text-xs mt-1">Buy</span>
        </button>
        
        <button
          onClick={() => onSectionChange('scrap')}
          className={cn(
            'flex flex-col items-center p-2 rounded-lg transition-colors',
            activeSection === 'scrap' ? 'text-red-600' : 'text-gray-600'
          )}
        >
          <Recycle size={24} />
          <span className="text-xs mt-1">Scrap</span>
        </button>
      </div>
    </nav>
  );
}