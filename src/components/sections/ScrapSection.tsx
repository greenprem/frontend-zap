import React, { useState } from 'react';
import { Camera, AlertTriangle, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Input } from '../shared/Input';
import { Button } from '../shared/Button';
import { Select } from '../shared/Select';

export function ScrapSection() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const materialTypes = [
    'Metal',
    'Electronics',
    'Plastic',
    'Glass',
    'Paper',
    'Other'
  ];

  const conditions = [
    'Functional',
    'Partially Functional',
    'Non-functional',
    'Damaged',
    'Beyond Repair'
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
      <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
        <AlertTriangle className="text-red-500 flex-shrink-0" />
        <p className="text-sm text-red-700">
          Items listed here will be recycled/scrapped and cannot be recovered. Please ensure you want to proceed with scrapping these items.
        </p>
      </div>

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
              <div className="w-full h-64 border-2 border-dashed border-red-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-red-500 transition-colors">
                <Camera size={48} className="text-red-400" />
                <p className="mt-2 text-sm text-red-500">Tap to capture or upload a photo</p>
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
          placeholder="Describe the item's condition and any relevant details"
          multiline
          rows={4}
        />

        <Select
          label="Material Type"
          required
          options={materialTypes}
        />

        <Input
          label="Approximate Weight (kg)"
          type="number"
          placeholder="0.00"
          required
          step="0.01"
        />

        <Select
          label="Condition Assessment"
          required
          options={conditions}
        />

        <Button
          type="submit"
          loading={loading}
          variant="danger"
          className="w-full"
        >
          Submit for Scrapping
        </Button>
      </form>
    </div>
  );
}