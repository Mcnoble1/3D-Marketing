import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Trash2 } from 'lucide-react';
import { Property } from '../types/campaign';

interface PropertyListProps {
  properties: Property[];
  onRemove: (id: string) => void;
}

export const PropertyList: React.FC<PropertyListProps> = ({ properties, onRemove }) => {
  if (properties.length === 0) {
    return (
      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
        <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-500">No properties added yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {properties.map((property, index) => (
        <motion.div
          key={property.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
        >
          {property.images[0] && (
            <img
              src={property.images[0]}
              alt={property.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
          )}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{property.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{property.address}</p>
              </div>
              <button
                onClick={() => onRemove(property.id)}
                className="p-1 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">{property.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};