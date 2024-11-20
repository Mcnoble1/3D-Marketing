import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Building2, MapPin, Save, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCampaignStore } from '../store/useCampaignStore';
import { useAuthStore } from '../store/useAuthStore';
import { PropertyForm } from '../components/PropertyForm';
import { PropertyList } from '../components/PropertyList';
import { Campaign, Property } from '../types/campaign';

const campaignSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  businessType: z.enum(['hotel', 'property', 'restaurant', 'retail', 'bank', 'other']),
});

type CampaignFormData = z.infer<typeof campaignSchema>;

export const CreateCampaign: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { createCampaign } = useCampaignStore();
  const [properties, setProperties] = useState<Property[]>([]);
  const [showPropertyForm, setShowPropertyForm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CampaignFormData>({
    resolver: zodResolver(campaignSchema),
  });

  const handlePropertyAdd = (property: Property) => {
    setProperties([...properties, property]);
    setShowPropertyForm(false);
  };

  const handlePropertyRemove = (propertyId: string) => {
    setProperties(properties.filter((p) => p.id !== propertyId));
  };

  const onSubmit = (data: CampaignFormData) => {
    if (properties.length === 0) {
      alert('Please add at least one property to your campaign');
      return;
    }

    const campaign = createCampaign({
      ...data,
      userId: user!.id,
      properties,
    });

    navigate(`/campaign/${campaign.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create Marketing Campaign</h1>
          <Link
            to="/dashboard"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Campaign Title</label>
            <input
              {...register('title')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Business Name</label>
            <input
              {...register('businessName')}
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.businessName && (
              <p className="mt-1 text-sm text-red-600">{errors.businessName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Business Type</label>
            <select
              {...register('businessType')}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="hotel">Hotel & Resort</option>
              <option value="property">Real Estate</option>
              <option value="restaurant">Restaurant</option>
              <option value="retail">Retail</option>
              <option value="bank">Banking</option>
              <option value="other">Other</option>
            </select>
            {errors.businessType && (
              <p className="mt-1 text-sm text-red-600">{errors.businessType.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Campaign Description</label>
            <textarea
              {...register('description')}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
              <button
                type="button"
                onClick={() => setShowPropertyForm(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              >
                <Plus className="w-4 h-4" />
                Add Property
              </button>
            </div>

            <PropertyList
              properties={properties}
              onRemove={handlePropertyRemove}
            />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <Link
              to="/dashboard"
              className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              <Save className="w-4 h-4" />
              Create Campaign
            </button>
          </div>
        </form>
      </motion.div>

      {showPropertyForm && (
        <PropertyForm
          onSave={handlePropertyAdd}
          onClose={() => setShowPropertyForm(false)}
        />
      )}
    </div>
  );
};