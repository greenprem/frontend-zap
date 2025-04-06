import React, { useState } from 'react';
import { Camera, Upload, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { Select } from '../shared/Select';

export function SellSection() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const conditions = [
    'New',
    'Like New',
    'Good',
    'Fair',
    'Poor'
  ];

  const categories = [
    'Electronics',
    'Clothing',
    'Home & Garden',
    'Sports',
    'Toys',
    'Other'
  ];

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    setImage(null);
    e.currentTarget.reset();
  };

  return (
    <div className="p-4 pb-20">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          {image ? (
            <div className="relative">
              <img
                src={image}
                alt="Preview"
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => setImage(null)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <label className="block">
              <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors">
                <Camera size={48} className="text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Tap to capture or upload a photo</p>
              </div>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageCapture}
                className="hidden"
              />
            </label>
          )}
        </div>

        <Input
          label="Title"
          required
          placeholder="Enter item title"
        />

        <Input
          label="Description"
          placeholder="Describe your item"
          multiline
          rows={4}
        />

        <Input
          label="Price"
          type="number"
          placeholder="0.00"
          required
          startAdornment="$"
        />

        <Select
          label="Condition"
          required
          options={conditions}
        />

        <Select
          label="Category"
          required
          options={categories}
        />

        <Button
          type="submit"
          loading={loading}
          className="w-full"
        >
          Submit Listing
        </Button>
      </form>
    </div>
  );
}