import { Campaign } from '../types/campaign';

export const demoCampaigns: Campaign[] = [
  {
    id: 'marriott-campaign',
    userId: 'demo',
    title: 'Marriott Hotels & Resorts Collection',
    description: 'Experience luxury and comfort at Marriott\'s finest locations across the United States.',
    businessName: 'Marriott International',
    businessType: 'hotel',
    properties: [
      {
        id: 'marriott-times-square',
        name: 'New York Marriott Marquis',
        type: 'hotel',
        description: 'Iconic hotel in the heart of Times Square featuring spectacular city views, multiple restaurants, and state-of-the-art meeting spaces.',
        address: '1535 Broadway, New York, NY 10036',
        coordinates: { lat: 40.758438, lng: -73.986094 }, // Exact coordinates
        images: [
          'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
          'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
          'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800',
        ],
        details: {
          amenities: ['Spa', 'Fitness Center', 'Restaurants', 'Business Center'],
          phone: '(212) 398-1900',
          website: 'https://www.marriott.com',
        }
      },
      {
        id: 'marriott-beverly-hills',
        name: 'Beverly Hills Marriott',
        type: 'hotel',
        description: 'Luxury hotel offering elegant accommodations, a rooftop pool, and prime location near Rodeo Drive.',
        address: '1150 S Beverly Dr, Los Angeles, CA 90035',
        coordinates: { lat: 34.056397, lng: -118.399537 }, // Exact coordinates
        images: [
          'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
          'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
          'https://images.unsplash.com/photo-1630660664869-c9d3cc676880?w=800',
        ],
        details: {
          amenities: ['Pool', 'Spa', 'Restaurant', 'Fitness Center'],
          phone: '(310) 553-6561',
          website: 'https://www.marriott.com',
        }
      },
    ],
    createdAt: '2024-03-20T00:00:00.000Z',
    updatedAt: '2024-03-20T00:00:00.000Z',
  },
  {
    id: 'chase-campaign',
    userId: 'demo',
    title: 'Chase Bank Locations',
    description: 'Discover Chase Bank branches and ATMs near you with our convenient locations across the country.',
    businessName: 'JPMorgan Chase',
    businessType: 'bank',
    properties: [
      {
        id: 'chase-park-ave',
        name: 'Chase Bank - Park Avenue',
        type: 'bank',
        description: 'Full-service branch offering personal and business banking, investments, and mortgages.',
        address: '270 Park Avenue, New York, NY 10017',
        coordinates: { lat: 40.755901, lng: -73.975772 }, // Exact coordinates
        images: [
          'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=800',
          'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800',
        ],
        details: {
          hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
          phone: '(212) 270-6000',
          website: 'https://www.chase.com',
        }
      },
      {
        id: 'chase-chicago',
        name: 'Chase Tower Chicago',
        type: 'bank',
        description: 'Flagship location in downtown Chicago offering comprehensive banking services.',
        address: '10 S Dearborn St, Chicago, IL 60603',
        coordinates: { lat: 41.881832, lng: -87.629491 }, // Exact coordinates
        images: [
          'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?w=800',
          'https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?w=800',
        ],
        details: {
          hours: 'Mon-Fri: 9:00 AM - 5:00 PM',
          phone: '(312) 732-4000',
          website: 'https://www.chase.com',
        }
      },
    ],
    createdAt: '2024-03-20T00:00:00.000Z',
    updatedAt: '2024-03-20T00:00:00.000Z',
  },
  {
    id: 'mcdonalds-campaign',
    userId: 'demo',
    title: 'McDonald\'s Flagship Locations',
    description: 'Explore our iconic McDonald\'s restaurants featuring unique designs and experiences.',
    businessName: 'McDonald\'s Corporation',
    businessType: 'restaurant',
    properties: [
      {
        id: 'mcdonalds-times-square',
        name: 'McDonald\'s Times Square',
        type: 'restaurant',
        description: 'Flagship location featuring a massive billboard, modern design, and multiple floors of dining space.',
        address: '1528 Broadway, New York, NY 10036',
        coordinates: { lat: 40.758463, lng: -73.985761 }, // Exact coordinates
        images: [
          'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
          'https://images.unsplash.com/photo-1619454016518-697bc231e7cb?w=800',
        ],
        details: {
          hours: '24/7',
          phone: '(212) 302-3696',
          website: 'https://www.mcdonalds.com',
        }
      },
      {
        id: 'mcdonalds-chicago',
        name: 'McDonald\'s Chicago Flagship',
        type: 'restaurant',
        description: 'Modern eco-friendly design featuring a steel and wood interior with vertical gardens.',
        address: '600 N Clark St, Chicago, IL 60654',
        coordinates: { lat: 41.892714, lng: -87.631024 }, // Exact coordinates
        images: [
          'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800',
          'https://images.unsplash.com/photo-1619454016518-697bc231e7cb?w=800',
        ],
        details: {
          hours: '24/7',
          phone: '(312) 867-0455',
          website: 'https://www.mcdonalds.com',
        }
      },
    ],
    createdAt: '2024-03-20T00:00:00.000Z',
    updatedAt: '2024-03-20T00:00:00.000Z',
  },
  {
    id: 'century21-campaign',
    userId: 'demo',
    title: 'Century 21 Luxury Properties',
    description: 'Discover exceptional luxury properties across prime locations in the United States.',
    businessName: 'Century 21 Real Estate',
    businessType: 'property',
    properties: [
      {
        id: 'luxury-manhattan-penthouse',
        name: 'Manhattan Luxury Penthouse',
        type: 'property',
        description: 'Stunning penthouse with panoramic views of Central Park, featuring 5 bedrooms and premium finishes.',
        address: '157 W 57th St, New York, NY 10019',
        coordinates: { lat: 40.765136, lng: -73.979427 }, // Exact coordinates
        images: [
          'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
          'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
        ],
        details: {
          price: '$15,000,000',
          bedrooms: 5,
          bathrooms: 5.5,
          sqft: 4500,
          website: 'https://www.century21.com',
        }
      },
      {
        id: 'beverly-hills-estate',
        name: 'Beverly Hills Modern Estate',
        type: 'property',
        description: 'Contemporary mansion with infinity pool, home theater, and spectacular city views.',
        address: '1000 Elden Way, Beverly Hills, CA 90210',
        coordinates: { lat: 34.090069, lng: -118.406513 }, // Exact coordinates
        images: [
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800',
          'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        ],
        details: {
          price: '$28,500,000',
          bedrooms: 7,
          bathrooms: 9,
          sqft: 12000,
          website: 'https://www.century21.com',
        }
      },
    ],
    createdAt: '2024-03-20T00:00:00.000Z',
    updatedAt: '2024-03-20T00:00:00.000Z',
  },
];