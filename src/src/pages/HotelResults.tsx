import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ArrowRight, Bed, X } from 'lucide-react';
interface Hotel {
  id: string;
  name: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  neighborhood: string;
  distance: string;
  beds: number;
  amenities: string[];
  freeCancellation: boolean;
  recommended: boolean;
}
const hotels: Hotel[] = [
{
  id: 'robey',
  name: 'The Robey',
  image:
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  price: 289,
  rating: 4.5,
  reviewCount: 1284,
  neighborhood: 'Wicker Park',
  distance: '3.2 mi from center',
  beds: 1,
  amenities: ['Pool', 'Gym', 'Restaurant', 'Wi-Fi'],
  freeCancellation: true,
  recommended: true
},
{
  id: 'pendry',
  name: 'Pendry Chicago',
  image:
  'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  price: 345,
  rating: 4.8,
  reviewCount: 892,
  neighborhood: 'The Loop',
  distance: '0.5 mi from center',
  beds: 2,
  amenities: ['Spa', 'Gym', 'Restaurant', 'Wi-Fi', 'Bar'],
  freeCancellation: true,
  recommended: false
},
{
  id: 'freehand',
  name: 'Freehand Chicago',
  image:
  'https://images.unsplash.com/photo-1522798514-97ceb8c4f1c8?auto=format&fit=crop&w=800&q=80',
  price: 185,
  rating: 4.2,
  reviewCount: 2104,
  neighborhood: 'River North',
  distance: '1.1 mi from center',
  beds: 1,
  amenities: ['Bar', 'Wi-Fi', 'Restaurant'],
  freeCancellation: false,
  recommended: false
},
{
  id: 'thompson',
  name: 'Thompson Chicago',
  image:
  'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=800&q=80',
  price: 312,
  rating: 4.6,
  reviewCount: 1567,
  neighborhood: 'Gold Coast',
  distance: '1.8 mi from center',
  beds: 2,
  amenities: ['Pool', 'Gym', 'Spa', 'Wi-Fi', 'Restaurant'],
  freeCancellation: true,
  recommended: false
}];

const amenityFilters = ['Pool', 'Gym', 'Spa', 'Restaurant', 'Bar'];
export default function HotelResults() {
  const [maxPrice, setMaxPrice] = useState(500);
  const [minRating, setMinRating] = useState(0);
  const [bedFilter, setBedFilter] = useState<number | null>(null);
  const [activeAmenities, setActiveAmenities] = useState<string[]>([]);
  const [freeCancelOnly, setFreeCancelOnly] = useState(false);
  const toggleAmenity = (a: string) => {
    setActiveAmenities((prev) =>
    prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]
    );
  };
  const clearFilters = () => {
    setMaxPrice(500);
    setMinRating(0);
    setBedFilter(null);
    setActiveAmenities([]);
    setFreeCancelOnly(false);
  };
  const filtered = useMemo(() => {
    return hotels.filter((h) => {
      if (h.price > maxPrice) return false;
      if (h.rating < minRating) return false;
      if (bedFilter && h.beds !== bedFilter) return false;
      if (freeCancelOnly && !h.freeCancellation) return false;
      if (
      activeAmenities.length > 0 &&
      !activeAmenities.every((a) => h.amenities.includes(a)))

      return false;
      return true;
    });
  }, [maxPrice, minRating, bedFilter, activeAmenities, freeCancelOnly]);
  const hasActiveFilters =
  maxPrice < 500 ||
  minRating > 0 ||
  bedFilter !== null ||
  activeAmenities.length > 0 ||
  freeCancelOnly;
  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto">
      <div className="mb-8 flex items-end justify-between">
        <div>
          <div className="text-sm text-muted mb-2">Step 3 of 5</div>
          <h1 className="font-serif text-4xl text-ink mb-2">Choose a hotel</h1>
          <p className="text-muted">Chicago, IL • Nov 18 - 21 • 3 nights</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters sidebar */}
        <aside className="lg:col-span-1 lg:sticky lg:top-20 lg:self-start bg-surface border border-warm rounded-2xl p-5 space-y-6 h-fit">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-lg text-ink">Filters</h3>
            {hasActiveFilters &&
            <button
              onClick={clearFilters}
              className="text-xs text-muted hover:text-ink flex items-center gap-1">
              
                <X size={12} /> Clear
              </button>
            }
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-2">
              Max price / night
            </label>
            <input
              type="range"
              min="100"
              max="500"
              step="25"
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-teal" />
            
            <div className="text-sm text-ink mt-1 font-medium">
              ${maxPrice}+
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-2">
              Minimum rating
            </label>
            <div className="flex gap-1">
              {[0, 4, 4.5].map((r) =>
              <button
                key={r}
                onClick={() => setMinRating(r)}
                className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium border transition-all ${minRating === r ? 'border-teal bg-teal-light/20 text-teal' : 'border-warm text-muted hover:border-ink/20'}`}>
                
                  {r === 0 ? 'Any' : `${r}+`}
                </button>
              )}
            </div>
          </div>

          {/* Beds */}
          <div>
            <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-2">
              Beds
            </label>
            <div className="flex gap-1">
              {[1, 2].map((b) =>
              <button
                key={b}
                onClick={() => setBedFilter(bedFilter === b ? null : b)}
                className={`flex-1 px-2 py-1.5 rounded-lg text-xs font-medium border transition-all ${bedFilter === b ? 'border-teal bg-teal-light/20 text-teal' : 'border-warm text-muted hover:border-ink/20'}`}>
                
                  {b} {b === 1 ? 'bed' : 'beds'}
                </button>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-xs font-medium text-muted uppercase tracking-wider mb-2">
              Amenities
            </label>
            <div className="flex flex-wrap gap-1.5">
              {amenityFilters.map((a) =>
              <button
                key={a}
                onClick={() => toggleAmenity(a)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${activeAmenities.includes(a) ? 'border-teal bg-teal-light/20 text-teal' : 'border-warm text-muted hover:border-ink/20'}`}>
                
                  {a}
                </button>
              )}
            </div>
          </div>

          {/* Free cancellation */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={freeCancelOnly}
              onChange={(e) => setFreeCancelOnly(e.target.checked)}
              className="accent-teal w-4 h-4" />
            
            <span className="text-sm text-ink">Free cancellation</span>
          </label>
        </aside>

        {/* Results */}
        <div className="lg:col-span-3">
          <div className="text-sm text-muted mb-4">
            {filtered.length} {filtered.length === 1 ? 'hotel' : 'hotels'} match
          </div>

          {filtered.length === 0 ?
          <div className="bg-surface border border-warm rounded-2xl p-12 text-center">
              <p className="text-muted mb-4">No hotels match your filters.</p>
              <button
              onClick={clearFilters}
              className="text-teal font-medium hover:underline">
              
                Clear filters
              </button>
            </div> :

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filtered.map((hotel) =>
            <div
              key={hotel.id}
              className={`bg-surface rounded-2xl overflow-hidden border transition-all hover:shadow-subtle flex flex-col ${hotel.recommended ? 'border-teal shadow-subtle' : 'border-warm hover:border-ink/20'}`}>
              
                  <div className="h-48 overflow-hidden relative">
                    {hotel.recommended &&
                <div className="absolute top-3 left-3 bg-teal text-cream text-xs font-medium px-3 py-1 rounded-full z-10 shadow-sm">
                        Great Location
                      </div>
                }
                    {hotel.freeCancellation &&
                <div className="absolute top-3 right-3 bg-surface/95 backdrop-blur text-ink text-xs font-medium px-2.5 py-1 rounded-full z-10">
                        Free cancellation
                      </div>
                }
                    <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="font-serif text-xl text-ink">
                        {hotel.name}
                      </h3>
                      <div className="flex items-center gap-1 text-sm font-medium text-ink shrink-0">
                        <Star size={14} className="fill-amber text-amber" />
                        {hotel.rating}
                        <span className="text-muted font-normal text-xs">
                          ({hotel.reviewCount.toLocaleString()})
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-muted flex items-center gap-1 mb-3">
                      <MapPin size={14} /> {hotel.neighborhood} •{' '}
                      {hotel.distance}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-cream border border-warm rounded text-xs text-ink">
                        <Bed size={12} /> {hotel.beds}{' '}
                        {hotel.beds === 1 ? 'bed' : 'beds'}
                      </span>
                      {hotel.amenities.slice(0, 3).map((a) =>
                  <span
                    key={a}
                    className="px-2 py-0.5 bg-cream border border-warm rounded text-xs text-ink">
                    
                          {a}
                        </span>
                  )}
                      {hotel.amenities.length > 3 &&
                  <span className="px-2 py-0.5 text-xs text-muted">
                          +{hotel.amenities.length - 3} more
                        </span>
                  }
                    </div>

                    <div className="mt-auto pt-4 border-t border-warm flex items-end justify-between gap-3">
                      <div>
                        <div className="text-2xl font-medium text-ink">
                          ${hotel.price}
                        </div>
                        <div className="text-xs text-muted">per night</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                      to={`/plan/hotels/${hotel.id}`}
                      className="px-4 py-2.5 rounded-lg text-sm font-medium border border-warm text-ink hover:border-ink/40 transition-colors">
                      
                          Details
                        </Link>
                        <Link
                      to="/plan/transport"
                      className="bg-ink text-cream px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-ink/90 transition-colors">
                      
                          Select
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
            )}
            </div>
          }
        </div>
      </div>
    </div>);

}