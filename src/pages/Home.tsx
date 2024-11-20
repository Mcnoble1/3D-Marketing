import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Hotel, Store, MapPin, Building, Utensils } from 'lucide-react';

const businessTypes = [
  { icon: Hotel, label: 'Hotels & Resorts', color: 'bg-blue-500' },
  { icon: Building2, label: 'Real Estate', color: 'bg-green-500' },
  { icon: Store, label: 'Retail Chains', color: 'bg-purple-500' },
  { icon: Building, label: 'Banking', color: 'bg-yellow-500' },
  { icon: Utensils, label: 'Restaurants', color: 'bg-red-500' },
];

export const Home: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-gray-900 mb-6"
        >
          Immersive 3D Marketing Platform
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
        >
          Transform your business presence with stunning 3D visualizations and virtual tours
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/create-campaign"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Create Your Campaign
          </Link>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {businessTypes.map((business, index) => (
          <motion.div
            key={business.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className={`w-12 h-12 ${business.color} rounded-lg flex items-center justify-center mb-4`}>
              <business.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{business.label}</h3>
            <p className="text-gray-600">
              Create immersive 3D tours and showcase your locations worldwide with our cutting-edge platform.
            </p>
          </motion.div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-2xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Why Choose Our Platform?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
            <p className="text-gray-600">
              Showcase your properties and businesses to a worldwide audience
            </p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Immersive Experience</h3>
            <p className="text-gray-600">
              Engage customers with stunning 3D visualizations and virtual tours
            </p>
          </div>
          <div className="text-center">
            <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiple Locations</h3>
            <p className="text-gray-600">
              Manage and showcase all your business locations in one platform
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};