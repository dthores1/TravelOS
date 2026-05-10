export interface DiningOption {
  id: string;
  name: string;
  cuisine: string;
  serviceType: 'quick' | 'sit-down';
  rating: number;
  reviewCount: number;
  priceLevel: 1 | 2 | 3;
  walkMin: number;
  prepMin: number;
  closesAt: string;
  open: boolean;
  image: string;
  description: string;
  near: 'gate' | 'hotel';
}

export const diningOptions: DiningOption[] = [
{
  id: 'beecher',
  name: "Beecher's Handmade Cheese",
  cuisine: 'American · Mac & Cheese',
  serviceType: 'quick',
  rating: 4.4,
  reviewCount: 612,
  priceLevel: 2,
  walkMin: 4,
  prepMin: 8,
  closesAt: '9:00 PM',
  open: true,
  image:
  'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=800&q=80',
  description: 'Famous Seattle mac & cheese, fast counter service.',
  near: 'gate'
},
{
  id: 'skillet',
  name: 'Skillet Diner',
  cuisine: 'American · Diner',
  serviceType: 'sit-down',
  rating: 4.5,
  reviewCount: 1180,
  priceLevel: 2,
  walkMin: 6,
  prepMin: 22,
  closesAt: '8:30 PM',
  open: true,
  image:
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  description: 'Classic PNW diner with bacon jam burgers.',
  near: 'gate'
},
{
  id: 'evergreens',
  name: 'Evergreens',
  cuisine: 'Salads · Healthy',
  serviceType: 'quick',
  rating: 4.3,
  reviewCount: 287,
  priceLevel: 2,
  walkMin: 3,
  prepMin: 6,
  closesAt: '10:00 PM',
  open: true,
  image:
  'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
  description: 'Fresh, build-your-own salad bowls.',
  near: 'gate'
},
{
  id: 'anthonys',
  name: "Anthony's Restaurant",
  cuisine: 'Seafood',
  serviceType: 'sit-down',
  rating: 4.2,
  reviewCount: 542,
  priceLevel: 3,
  walkMin: 9,
  prepMin: 35,
  closesAt: '6:45 PM',
  open: true,
  image:
  'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80',
  description: 'PNW seafood with a tarmac view.',
  near: 'gate'
},
{
  id: 'big-star',
  name: 'Big Star',
  cuisine: 'Mexican · Tacos',
  serviceType: 'quick',
  rating: 4.6,
  reviewCount: 2104,
  priceLevel: 1,
  walkMin: 4,
  prepMin: 12,
  closesAt: '2:00 AM',
  open: true,
  image:
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=80',
  description: 'Wicker Park taco institution. Walk-up window.',
  near: 'hotel'
},
{
  id: 'piece',
  name: 'Piece Brewery & Pizzeria',
  cuisine: 'Pizza · Brewery',
  serviceType: 'sit-down',
  rating: 4.5,
  reviewCount: 1890,
  priceLevel: 2,
  walkMin: 8,
  prepMin: 25,
  closesAt: '11:00 PM',
  open: true,
  image:
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
  description: 'New Haven-style pizza, in-house brews.',
  near: 'hotel'
}];