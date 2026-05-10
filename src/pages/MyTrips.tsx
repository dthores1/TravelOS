import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrip } from '../context/TripContext';
import { Plane, ArrowRight, Calendar, Plus } from 'lucide-react';
import { Trip } from '../types';
const tripImages: Record<string, string> = {
  'trip-sea-ord':
  'https://images.unsplash.com/photo-1494522855154-9297ac14b55f?auto=format&fit=crop&w=1200&q=80',
  'trip-ord-jfk':
  'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
  'trip-jfk-ywg':
  'https://images.unsplash.com/photo-1517935706615-2717063c2225?auto=format&fit=crop&w=1200&q=80'
};
type TabKey = 'all' | 'active' | 'upcoming' | 'past';
export default function MyTrips() {
  const { trips, activeTripId, bookedTripIds, setActiveTripId } = useTrip();
  const navigate = useNavigate();
  const [tab, setTab] = useState<TabKey>('all');
  // Only show booked trips on My Trips
  const bookedTrips = trips.filter((t) => bookedTripIds.includes(t.id));
  // Active is determined by activeTripId (and only if it's actually booked)
  const isActiveTrip = (t: Trip) => t.id === activeTripId;
  const filtered = bookedTrips.filter((t) => {
    if (tab === 'all') return true;
    if (tab === 'past') return t.status === 'completed';
    if (tab === 'active') return isActiveTrip(t);
    if (tab === 'upcoming') return !isActiveTrip(t) && t.status !== 'completed';
    return true;
  });
  const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
  const openTrip = (t: Trip) => {
    setActiveTripId(t.id);
    navigate('/trip/active');
  };
  // Find unbooked trips that can still be planned
  const planableTrips = trips.filter((t) => !bookedTripIds.includes(t.id));
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-4xl text-ink mb-2">My Trips</h1>
          <p className="text-muted">
            Your booked trips, coordinated end-to-end.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-warm mb-8 flex gap-1">
        {(
        [
        {
          key: 'all',
          label: 'All'
        },
        {
          key: 'active',
          label: 'Active'
        },
        {
          key: 'upcoming',
          label: 'Upcoming'
        },
        {
          key: 'past',
          label: 'Past'
        }] as
        {
          key: TabKey;
          label: string;
        }[]).
        map((t) =>
        <button
          key={t.key}
          onClick={() => setTab(t.key)}
          className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t.key ? 'border-ink text-ink' : 'border-transparent text-muted hover:text-ink'}`}>
          
            {t.label}
          </button>
        )}
      </div>

      {filtered.length === 0 ?
      <div className="bg-surface border border-warm rounded-2xl p-12 text-center text-muted">
          {tab === 'active' ?
        'No active trip right now.' :
        'No trips in this category.'}
        </div> :

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {filtered.map((t) => {
          const isActive = isActiveTrip(t);
          const flightEvent = t.events.find((e) => e.type === 'flight');
          const nextEvent =
          t.events.find((e) => e.status === 'active') ||
          t.events.find((e) => e.status === 'upcoming');
          return (
            <button
              key={t.id}
              onClick={() => openTrip(t)}
              className={`text-left bg-surface rounded-2xl overflow-hidden border transition-all hover:shadow-subtle group flex flex-col ${isActive ? 'border-teal shadow-subtle' : 'border-warm hover:border-ink/30'}`}>
              
                <div className="relative h-40 overflow-hidden bg-warm">
                  <img
                  src={tripImages[t.id]}
                  alt={`${t.destination}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur ${isActive ? 'bg-teal text-cream' : 'bg-surface/90 text-ink'}`}>
                    
                      {isActive ? 'Active now' : 'Upcoming'}
                    </span>
                    {t.id === 'trip-jfk-ywg' &&
                  <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface/90 text-ink backdrop-blur">
                        International
                      </span>
                  }
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-serif text-xl text-ink mb-1">
                    {t.origin.split(',')[0]} → {t.destination.split(',')[0]}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted mb-3 flex-wrap">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} /> {formatDate(t.startDate)} –{' '}
                      {formatDate(t.endDate)}
                    </span>
                    {flightEvent?.details?.flightNumber &&
                  <span className="flex items-center gap-1">
                        <Plane size={12} /> {flightEvent.details.flightNumber}
                      </span>
                  }
                  </div>

                  {nextEvent &&
                <div className="mt-auto pt-3 border-t border-warm">
                      <div className="text-xs text-muted uppercase tracking-wider mb-1">
                        {isActive ? 'Up next' : 'Starts with'}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-ink font-medium truncate">
                          {nextEvent.title}
                        </div>
                        <ArrowRight
                      size={16}
                      className="text-muted group-hover:text-teal transition-colors shrink-0 ml-2" />
                    
                      </div>
                    </div>
                }
                </div>
              </button>);

        })}
        </div>
      }

      {/* Plan a new trip — only when there are unbooked trips */}
      {planableTrips.length > 0 && tab !== 'past' &&
      <div className="mt-8">
          <h3 className="font-serif text-xl text-ink mb-3">Ready to plan</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {planableTrips.map((t) =>
          <button
            key={t.id}
            onClick={() => navigate('/plan')}
            className="text-left bg-cream/50 border border-dashed border-warm rounded-2xl p-5 hover:border-ink/40 hover:bg-cream transition-all group">
            
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-xs text-muted uppercase tracking-wider mb-1">
                      Not booked yet
                    </div>
                    <h4 className="font-serif text-xl text-ink mb-1">
                      {t.origin.split(',')[0]} → {t.destination.split(',')[0]}
                    </h4>
                    <p className="text-sm text-muted">
                      Plan and orchestrate this trip end-to-end.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-surface border border-warm flex items-center justify-center text-ink shrink-0 group-hover:border-teal group-hover:text-teal transition-colors">
                    <Plus size={18} />
                  </div>
                </div>
              </button>
          )}
          </div>
        </div>
      }
    </div>);

}