import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Phone, Globe, Clock, ChevronUp, ChevronDown } from 'lucide-react';
import { Property } from '../types/campaign';

interface PropertyOverlayProps {
  property: Property;
  onClose: () => void;
}

export const PropertyOverlay: React.FC<PropertyOverlayProps> = ({ property, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="absolute top-4 left-4 right-4 bg-white rounded-lg shadow-lg max-w-2xl mx-auto overflow-hidden"
    >
      {/* Header - Always visible */}
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-gray-900">{property.name}</h2>
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="truncate max-w-[300px]">{property.address}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            )}
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-6">
              <div className="flex gap-6">
                <div className="w-1/3">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {property.images.slice(1, 4).map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`${property.name} ${index + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1">
                  {property.details.phone && (
                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{property.details.phone}</span>
                    </div>
                  )}

                  {property.details.website && (
                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                      <Globe className="w-4 h-4" />
                      <a
                        href={property.details.website as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-700"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}

                  {property.details.hours && (
                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{property.details.hours as string}</span>
                    </div>
                  )}

                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900">About</h3>
                    <p className="mt-2 text-gray-600">{property.description}</p>
                  </div>

                  {/* Additional details based on property type */}
                  {property.type === 'hotel' && property.details.amenities && (
                    <div className="mt-4">
                      <h3 className="font-medium text-gray-900">Amenities</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(property.details.amenities as string[]).map((amenity, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Property-specific details */}
                  {property.type === 'property' && (
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {property.details.price && (
                        <div>
                          <h3 className="font-medium text-gray-900">Price</h3>
                          <p className="mt-1 text-gray-600">{property.details.price}</p>
                        </div>
                      )}
                      {property.details.bedrooms && (
                        <div>
                          <h3 className="font-medium text-gray-900">Bedrooms</h3>
                          <p className="mt-1 text-gray-600">{property.details.bedrooms}</p>
                        </div>
                      )}
                      {property.details.bathrooms && (
                        <div>
                          <h3 className="font-medium text-gray-900">Bathrooms</h3>
                          <p className="mt-1 text-gray-600">{property.details.bathrooms}</p>
                        </div>
                      )}
                      {property.details.sqft && (
                        <div>
                          <h3 className="font-medium text-gray-900">Square Feet</h3>
                          <p className="mt-1 text-gray-600">{property.details.sqft}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};