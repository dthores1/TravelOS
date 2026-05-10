import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  MapPin,
  Waves,
  Dumbbell,
  Utensils,
  Wifi,
  PawPrint,
  Bell,
  Bed,
  Maximize,
  Check } from
'lucide-react';
import { hotelDetails } from '../data/mockHotels';
const amenityIcon: Record<string, React.ReactNode> = {
  pool: <Waves size={18} />,
  gym: <Dumbbell size={18} />,
  restaurant: <Utensils size={18} />,
  wifi: <Wifi size={18} />,
  pet: <PawPrint size={18} />,
  concierge: <Bell size={18} />
};
export default function HotelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotel = hotelDetails[id || 'robey'] || hotelDetails.robey;
  const [activeImage, setActiveImage] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState(hotel.rooms[0].id);
  const room = hotel.rooms.find((r) => r.id === selectedRoom) || hotel.rooms[0];
  return (
    <div className="animate-in fade-in duration-500 max-w-6xl mx-auto">
      <Link
        to="/plan/hotels"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-6">
        
        <ArrowLeft size={16} /> Back to results
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-3">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-ink mb-2">
              {hotel.name}
            </h1>
            <div className="flex items-center gap-3 text-sm text-muted flex-wrap">
              <div className="flex items-center gap-1 text-ink font-medium">
                <Star size={14} className="fill-amber text-amber" />
                {hotel.rating}
                <span className="text-muted font-normal">
                  ({hotel.reviewCount.toLocaleString()} reviews)
                </span>
              </div>
              <span className="text-warm">•</span>
              <div className="flex items-center gap-1">
                <MapPin size={14} /> {hotel.address}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Photo gallery */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 mb-8 h-[420px] rounded-2xl overflow-hidden">
        <div className="col-span-4 md:col-span-2 row-span-2 relative overflow-hidden bg-warm">
          <img
            src={hotel.images[activeImage]}
            alt={`${hotel.name} - photo ${activeImage + 1}`}
            className="w-full h-full object-cover" />
          
        </div>
        {hotel.images.slice(1, 5).map((img, i) =>
        <button
          key={i}
          onClick={() => setActiveImage(i + 1)}
          className="hidden md:block relative overflow-hidden bg-warm group"
          aria-label={`View photo ${i + 2}`}>
          
            <img
            src={img}
            alt={`${hotel.name} - photo ${i + 2}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          
            {i === 3 && hotel.images.length > 5 &&
          <div className="absolute inset-0 bg-ink/40 flex items-center justify-center text-cream font-medium text-sm">
                +{hotel.images.length - 5} more
              </div>
          }
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-10">
          {/* Description */}
          <section>
            <h2 className="font-serif text-2xl text-ink mb-3">About</h2>
            <p className="text-ink/80 leading-relaxed">{hotel.description}</p>
          </section>

          {/* Amenities */}
          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              What this place offers
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {hotel.amenities.map((a) =>
              <div
                key={a.label}
                className="flex items-center gap-3 p-3 bg-surface border border-warm rounded-xl text-ink">
                
                  <div className="text-teal">{amenityIcon[a.icon]}</div>
                  <span className="text-sm font-medium">{a.label}</span>
                </div>
              )}
            </div>
          </section>

          {/* Room types */}
          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">
              Choose your room
            </h2>
            <div className="space-y-3">
              {hotel.rooms.map((r) => {
                const isSelected = selectedRoom === r.id;
                return (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRoom(r.id)}
                    className={`w-full text-left flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border-2 transition-all ${isSelected ? 'border-teal bg-teal-light/10 shadow-subtle' : 'border-warm bg-surface hover:border-ink/20'}`}>
                    
                    <img
                      src={r.image}
                      alt={r.name}
                      className="w-full sm:w-32 h-32 sm:h-24 object-cover rounded-xl" />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="font-serif text-lg text-ink">
                          {r.name}
                        </h4>
                        {isSelected &&
                        <div className="text-teal shrink-0">
                            <Check size={18} />
                          </div>
                        }
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted mb-2 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Bed size={12} /> {r.beds}
                        </span>
                        <span className="flex items-center gap-1">
                          <Maximize size={12} /> {r.sqft} sqft
                        </span>
                      </div>
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex flex-wrap gap-1">
                          {r.perks.map((p) =>
                          <span
                            key={p}
                            className="text-xs text-muted px-2 py-0.5 bg-cream rounded">
                            
                              {p}
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-medium text-ink">
                            ${r.price}
                          </div>
                          <div className="text-xs text-muted">per night</div>
                        </div>
                      </div>
                    </div>
                  </button>);

              })}
            </div>
          </section>

          {/* Ratings breakdown */}
          <section>
            <h2 className="font-serif text-2xl text-ink mb-4">Guest ratings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hotel.ratingBreakdown.map((b) =>
              <div
                key={b.label}
                className="bg-surface border border-warm rounded-xl p-4">
                
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-ink font-medium">
                      {b.label}
                    </span>
                    <span className="text-sm font-medium text-ink">
                      {b.score.toFixed(1)}
                    </span>
                  </div>
                  <div className="h-1.5 bg-cream rounded-full overflow-hidden">
                    <div
                    className="h-full bg-teal rounded-full"
                    style={{
                      width: `${b.score / 5 * 100}%`
                    }}>
                  </div>
                  </div>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sticky booking sidebar */}
        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-20 bg-surface border border-warm rounded-2xl p-5 shadow-subtle">
            <div className="mb-4">
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-3xl font-serif text-ink">
                  ${room.price}
                </span>
                <span className="text-muted text-sm">/ night</span>
              </div>
              <div className="text-xs text-muted">{room.name} selected</div>
            </div>

            <div className="space-y-2 mb-4 pb-4 border-b border-warm text-sm">
              {hotel.policies.map((p) =>
              <div key={p.label} className="flex justify-between">
                  <span className="text-muted">{p.label}</span>
                  <span className="text-ink font-medium">{p.value}</span>
                </div>
              )}
            </div>

            <div className="space-y-2 mb-5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">${room.price} × 3 nights</span>
                <span className="text-ink">${room.price * 3}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Taxes & fees</span>
                <span className="text-ink">$94</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-warm font-medium">
                <span className="text-ink">Total</span>
                <span className="text-ink">${room.price * 3 + 94}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/plan/transport')}
              className="w-full bg-ink text-cream px-6 py-3 rounded-xl font-medium hover:bg-ink/90 transition-colors">
              
              Select this hotel
            </button>
            <p className="text-xs text-muted text-center mt-3">
              You won't be charged yet
            </p>
          </div>
        </aside>
      </div>
    </div>);

}