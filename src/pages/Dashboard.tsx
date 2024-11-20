import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Building2, MapPin, Eye, Trash2 } from 'lucide-react';
import { useCampaignStore } from '../store/useCampaignStore';
import { useAuthStore } from '../store/useAuthStore';
import { demoCampaigns } from '../data/demoCampaigns';

export const Dashboard: React.FC = () => {
  const { user } = useAuthStore();
  const { campaigns, deleteCampaign } = useCampaignStore();

  // Combine user campaigns with demo campaigns
  const userCampaigns = Object.values(campaigns).filter(
    (campaign) => campaign.userId === user?.id
  );
  
  const allCampaigns = [...userCampaigns, ...demoCampaigns];

  // Group campaigns by business type
  const groupedCampaigns = allCampaigns.reduce((acc, campaign) => {
    const type = campaign.businessType;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(campaign);
    return acc;
  }, {} as Record<string, typeof allCampaigns>);

  const businessTypeLabels = {
    hotel: 'Hotels & Resorts',
    property: 'Real Estate',
    restaurant: 'Restaurants',
    retail: 'Retail',
    bank: 'Banking',
    other: 'Other',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing Campaigns</h1>
          <p className="mt-1 text-gray-600">
            Manage your campaigns or explore our demo campaigns
          </p>
        </div>
        <Link
          to="/create-campaign"
          className="flex items-center gap-2 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          New Campaign
        </Link>
      </div>

      {Object.entries(groupedCampaigns).map(([type, campaigns]) => (
        <div key={type} className="mb-12">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {businessTypeLabels[type as keyof typeof businessTypeLabels]}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{campaign.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{campaign.businessName}</p>
                    </div>
                    {campaign.userId !== 'demo' && (
                      <button
                        onClick={() => deleteCampaign(campaign.id)}
                        className="p-2 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <p className="mt-4 text-sm text-gray-600 line-clamp-2">
                    {campaign.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{campaign.properties.length} locations</span>
                  </div>

                  <div className="mt-6">
                    <Link
                      to={`/campaign/${campaign.id}`}
                      className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                    >
                      <Eye className="w-4 h-4" />
                      View Campaign
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};