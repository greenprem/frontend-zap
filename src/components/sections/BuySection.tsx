import React, { useState } from 'react';
import { Search, Grid, List, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Item } from '../../types';

interface BuySectionProps {
  items: Item[];
}

export function BuySection({ items }: BuySectionProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="p-4 pb-20">
      <div className="sticky top-0 bg-white z-10 space-y-4">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 border border-gray-300 rounded-lg"
          >
            {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
          </button>
          <button className="p-2 border border-gray-300 rounded-lg">
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      <motion.div
        layout
        className={`mt-6 ${
          viewMode === 'grid'
            ? 'grid grid-cols-2 gap-4'
            : 'space-y-4'
        }`}
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            className={`bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 ${
              viewMode === 'list' ? 'flex' : ''
            }`}
          >
            <div className={viewMode === 'list' ? 'w-24 h-24' : 'aspect-square'}>
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
              <h3 className="font-medium text-gray-900 line-clamp-1">{item.title}</h3>
              <p className="text-blue-600 font-semibold">${item.price}</p>
              <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
              <div className="mt-2 flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${
                      i < item.sellerRating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}