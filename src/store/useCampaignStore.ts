import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Campaign, Property } from '../types/campaign';
import { demoCampaigns } from '../data/demoCampaigns';

interface CampaignState {
  campaigns: Record<string, Campaign>;
  currentCampaign: Campaign | null;
  createCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt' | 'updatedAt'>) => Campaign;
  updateCampaign: (id: string, updates: Partial<Campaign>) => void;
  deleteCampaign: (id: string) => void;
  setCurrentCampaign: (campaign: Campaign | null) => void;
  addProperty: (campaignId: string, property: Omit<Property, 'id'>) => void;
  removeProperty: (campaignId: string, propertyId: string) => void;
  updateProperty: (campaignId: string, propertyId: string, updates: Partial<Property>) => void;
  getCampaign: (id: string) => Campaign | null;
}

export const useCampaignStore = create<CampaignState>()(
  persist(
    (set, get) => ({
      campaigns: {},
      currentCampaign: null,
      createCampaign: (campaignData) => {
        const campaign: Campaign = {
          ...campaignData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        set((state) => ({
          campaigns: {
            ...state.campaigns,
            [campaign.id]: campaign,
          },
        }));
        return campaign;
      },
      updateCampaign: (id, updates) => {
        set((state) => ({
          campaigns: {
            ...state.campaigns,
            [id]: {
              ...state.campaigns[id],
              ...updates,
              updatedAt: new Date().toISOString(),
            },
          },
        }));
      },
      deleteCampaign: (id) => {
        set((state) => {
          const { [id]: _, ...rest } = state.campaigns;
          return { campaigns: rest };
        });
      },
      setCurrentCampaign: (campaign) => {
        set({ currentCampaign: campaign });
      },
      addProperty: (campaignId, propertyData) => {
        const property: Property = {
          ...propertyData,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          campaigns: {
            ...state.campaigns,
            [campaignId]: {
              ...state.campaigns[campaignId],
              properties: [...state.campaigns[campaignId].properties, property],
              updatedAt: new Date().toISOString(),
            },
          },
        }));
      },
      removeProperty: (campaignId, propertyId) => {
        set((state) => ({
          campaigns: {
            ...state.campaigns,
            [campaignId]: {
              ...state.campaigns[campaignId],
              properties: state.campaigns[campaignId].properties.filter(
                (p) => p.id !== propertyId
              ),
              updatedAt: new Date().toISOString(),
            },
          },
        }));
      },
      updateProperty: (campaignId, propertyId, updates) => {
        set((state) => ({
          campaigns: {
            ...state.campaigns,
            [campaignId]: {
              ...state.campaigns[campaignId],
              properties: state.campaigns[campaignId].properties.map(p =>
                p.id === propertyId ? { ...p, ...updates } : p
              ),
              updatedAt: new Date().toISOString(),
            },
          },
        }));
      },
      getCampaign: (id) => {
        // Check user campaigns first
        const userCampaign = get().campaigns[id];
        if (userCampaign) return userCampaign;

        // If not found, check demo campaigns
        return demoCampaigns.find(campaign => campaign.id === id) || null;
      },
    }),
    {
      name: 'campaign-storage',
    }
  )
);