export interface HotelDetail {
  id: string;
  name: string;
  neighborhood: string;
  address: string;
  price: number;
  rating: number;
  reviewCount: number;
  description: string;
  images: string[];
  amenities: {label: string;icon: string;}[];
  rooms: {
    id: string;
    name: string;
    beds: string;
    sqft: number;
    price: number;
    perks: string[];
    image: string;
  }[];
  ratingBreakdown: {label: string;score: number;}[];
  policies: {label: string;value: string;}[];
}

export const hotelDetails: Record<string, HotelDetail> = {
  robey: {
    id: 'robey',
    name: 'The Robey',
    neighborhood: 'Wicker Park',
    address: '2018 W North Ave, Chicago, IL',
    price: 289,
    rating: 4.5,
    reviewCount: 1284,
    description:
    'A landmark Art Deco tower in the heart of Wicker Park. Floor-to-ceiling windows, a rooftop pool with skyline views, and a quiet design-forward sensibility throughout.',
    images: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80'],

    amenities: [
    { label: 'Rooftop pool', icon: 'pool' },
    { label: 'Fitness center', icon: 'gym' },
    { label: 'Restaurant & bar', icon: 'restaurant' },
    { label: 'Free Wi-Fi', icon: 'wifi' },
    { label: 'Pet friendly', icon: 'pet' },
    { label: 'Concierge', icon: 'concierge' }],

    rooms: [
    {
      id: 'std-king',
      name: 'Standard King',
      beds: '1 King bed',
      sqft: 280,
      price: 289,
      perks: ['Free Wi-Fi', 'City view', 'Free cancellation'],
      image:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'dlx-double',
      name: 'Deluxe Double',
      beds: '2 Queen beds',
      sqft: 340,
      price: 339,
      perks: ['Free Wi-Fi', 'Skyline view', 'Free cancellation'],
      image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'suite',
      name: 'Tower Suite',
      beds: '1 King bed + Living area',
      sqft: 540,
      price: 489,
      perks: ['Living area', 'Bathtub', 'Premium toiletries'],
      image:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80'
    }],

    ratingBreakdown: [
    { label: 'Location', score: 4.8 },
    { label: 'Cleanliness', score: 4.6 },
    { label: 'Service', score: 4.5 },
    { label: 'Value', score: 4.2 }],

    policies: [
    { label: 'Check-in', value: 'After 3:00 PM' },
    { label: 'Check-out', value: 'Before 11:00 AM' },
    { label: 'Cancellation', value: 'Free until Nov 16' }]

  }
};