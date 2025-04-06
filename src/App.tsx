import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { NavigationSection } from './types';
import { BottomNavigation } from './components/layout/BottomNavigation';
import { DrawerMenu } from './components/layout/DrawerMenu';
import { SellSection } from './components/sections/SellSection';
import { BuySection } from './components/sections/BuySection';
import { ScrapSection } from './components/sections/ScrapSection';

// Mock data
const mockItems = [
  {
    id: '1',
    title: 'iPhone 12 Pro',
    description: 'Excellent condition, comes with original box and accessories',
    price: 699.99,
    condition: 'Like New',
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1605637064671-c03a5fae76cd?auto=format&fit=crop&q=80&w=400',
    sellerRating: 4.5,
    createdAt: new Date()
  },
  {
    id: '2',
    title: 'Nike Air Max',
    description: 'Size 10, worn only once',
    price: 89.99,
    condition: 'Like New',
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400',
    sellerRating: 5,
    createdAt: new Date()
  },
  // Add more mock items as needed
];

const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100'
};

function App() {
  const [activeSection, setActiveSection] = useState<NavigationSection>('buy');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    // Implement logout logic
    console.log('Logging out...');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-semibold">
            {activeSection === 'sell' && 'Sell Item'}
            {activeSection === 'buy' && 'Browse Items'}
            {activeSection === 'scrap' && 'Scrap Item'}
          </h1>
          <div className="w-10" /> {/* Spacer for alignment */}
        </div>
      </header>

      <DrawerMenu
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        user={mockUser}
        onLogout={handleLogout}
      />

      <main className="pt-16">
        {activeSection === 'sell' && <SellSection />}
        {activeSection === 'buy' && <BuySection items={mockItems} />}
        {activeSection === 'scrap' && <ScrapSection />}
      </main>

      <BottomNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
    </div>
  );
}

export default App;