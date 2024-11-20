import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X, Upload, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Property } from '../types/campaign';

interface PropertyFormProps {
  onSave: (property: Property) => void;
  onClose: () => void;
}

const propertySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  type: z.enum(['hotel', 'property', 'restaurant', 'retail', 'bank', 'other']),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
});

type PropertyFormData = z.infer<typeof propertySchema>;

export const PropertyForm: React.FC<PropertyFormProps> = ({ onSave, onClose }) => {
  const [images, setImages] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [placeId, setPlaceId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
  });

  useEffect(() => {
    if (!searchInputRef.current || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(searchInputRef.current, {
      fields: ['geometry', 'formatted_address', 'place_id', 'photos'],
    });

    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry?.location) {
        setCoordinates({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        });
        setValue('address', place.formatted_address || '');
        setPlaceId(place.place_id || null);
        
        if (place.photos) {
          const photoUrls = place.photos.slice(0, 5).map(photo => photo.getUrl());
          setImages(photoUrls);
        }
      }
    });

    autocompleteRef.current = autocomplete;
  }, [setValue]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const onSubmit = (data: PropertyFormData) => {
    if (!coordinates) {
      alert('Please select a valid location');
      return;
    }

    const property: Property = {
      id: crypto.randomUUID(),
      ...data,
      coordinates,
      images,
      details: {},
      ...(placeId && { placeId }),
    };

    onSave(property);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Add Property</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Search Location</label>
            <div className="mt-1 relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search for a place..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Property Name</label>
            <input
              {...register('name')}
              className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Property Type</label>
            <select
              {...register('type')}
              className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="hotel">Hotel</option>
              <option value="property">Property</option>
              <option value="restaurant">Restaurant</option>
              <option value="retail">Retail</option>
              <option value="bank">Bank</option>
              <option value="other">Other</option>
            </select>
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              {...register('description')}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input
              {...register('address')}
              className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
            <div className="grid grid-cols-5 gap-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Property ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
              ))}
              <label className="w-full h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-500 cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Plus className="w-6 h-6 text-gray-400" />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md border border-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Add Property
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};