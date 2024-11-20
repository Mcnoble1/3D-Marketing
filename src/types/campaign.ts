export interface Property {
  id: string;
  name: string;
  type: 'hotel' | 'property' | 'restaurant' | 'retail' | 'bank' | 'other';
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  details: {
    [key: string]: string | number | boolean;
  };
  placeId?: string;
}

export interface Campaign {
  id: string;
  userId: string;
  title: string;
  description: string;
  businessName: string;
  businessType: 'hotel' | 'property' | 'restaurant' | 'retail' | 'bank' | 'other';
  properties: Property[];
  createdAt: string;
  updatedAt: string;
}