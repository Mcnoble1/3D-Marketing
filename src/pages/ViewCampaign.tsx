import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, ArrowLeft, Edit } from 'lucide-react';
import { useCampaignStore } from '../store/useCampaignStore';
import { Map } from '../components/Map';
import { PropertyOverlay } from '../components/PropertyOverlay';
import { PropertyForm } from '../components/PropertyForm';
import { ShareCampaign } from '../components/ShareCampaign';
import { Property } from '../types/campaign';

export const ViewCampaign: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getCampaign, addProperty, removeProperty } = useCampaignStore();
  const campaign = getCampaign(id!);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const mapRef = useRef<any>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!campaign) {
      navigate('/dashboard');
    }
  }, [campaign, navigate]);

  useEffect(() => {
    if (isPlaying && campaign) {
      // Start orbiting the current location
      const orbitInterval = setInterval(() => {
        if (mapRef.current) {
          const currentHeading = parseFloat(mapRef.current.getAttribute('heading')) || 0;
          mapRef.current.setAttribute('heading', ((currentHeading + 1) % 360).toString());
        }
      }, 100);

      // Set timeout for next location
      transitionTimeoutRef.current = setTimeout(() => {
        if (currentIndex < campaign.properties.length - 1) {
          // Clear orbit before transition
          clearInterval(orbitInterval);
          
          // Move to next location
          setCurrentIndex(currentIndex + 1);
        } else {
          setIsPlaying(false);
          setCurrentIndex(0);
          clearInterval(orbitInterval);
        }
      }, 10000); // 10 seconds per location

      return () => {
        clearInterval(orbitInterval);
        if (transitionTimeoutRef.current) {
          clearTimeout(transitionTimeoutRef.current);
        }
      };
    }
  }, [isPlaying, currentIndex, campaign]);

  if (!campaign) return null;

  const currentProperty = campaign.properties[currentIndex];

  const handleNext = () => {
    if (currentIndex < campaign.properties.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePropertyAdd = (property: Property) => {
    addProperty(campaign.id, property);
    setShowPropertyForm(false);
  };

  const handlePropertyRemove = (propertyId: string) => {
    removeProperty(campaign.id, propertyId);
    if (currentIndex >= campaign.properties.length - 1) {
      setCurrentIndex(Math.max(0, campaign.properties.length - 2));
    }
  };

  return (
    <div className="fixed inset-0 top-16 bg-gray-50">
      <div className="h-full flex">
        {/* Sidebar */}
        <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
              <div className="flex items-center gap-4">
                <ShareCampaign
                  campaignId={campaign.id}
                  title={campaign.title}
                />
                {campaign.userId !== 'demo' && (
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700"
                  >
                    <Edit className="w-4 h-4" />
                    {isEditing ? 'Done' : 'Edit'}
                  </button>
                )}
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{campaign.title}</h1>
            <p className="mt-2 text-gray-600">{campaign.description}</p>

            {!isEditing && (
              <div className="mt-6 flex items-center justify-center gap-4">
                <button
                  onClick={handlePrevious}
                  disabled={currentIndex === 0}
                  className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                >
                  <SkipBack className="w-6 h-6" />
                </button>
                <button
                  onClick={handlePlayPause}
                  className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === campaign.properties.length - 1}
                  className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                >
                  <SkipForward className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {isEditing && campaign.userId !== 'demo' && (
              <button
                onClick={() => setShowPropertyForm(true)}
                className="w-full mb-4 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                Add New Property
              </button>
            )}

            {campaign.properties.map((property, index) => (
              <button
                key={property.id}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPlaying(false);
                }}
                className={`w-full text-left mb-4 p-4 rounded-lg border transition-colors ${
                  index === currentIndex
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-indigo-200'
                }`}
              >
                <div className="flex gap-4">
                  {property.images[0] && (
                    <img
                      src={property.images[0]}
                      alt={property.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <h3 className="font-medium">{property.name}</h3>
                      </div>
                      {isEditing && campaign.userId !== 'demo' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePropertyRemove(property.id);
                          }}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {property.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <Map
            center={currentProperty.coordinates}
            locationName={currentProperty.name}
            onMapLoad={(map) => {
              mapRef.current = map;
            }}
          />
          {showOverlay && currentProperty && (
            <PropertyOverlay
              property={currentProperty}
              onClose={() => setShowOverlay(false)}
            />
          )}
        </div>
      </div>

      {showPropertyForm && (
        <PropertyForm
          onSave={handlePropertyAdd}
          onClose={() => setShowPropertyForm(false)}
        />
      )}
    </div>
  );
};