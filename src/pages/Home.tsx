import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Plane, Sparkles, Calendar, MapPin } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { useTrackEvent } from '../analytics/trackEvent';
export default function Home() {
  const { trip, trips, setActiveTripId } = useTrip();
  const track = useTrackEvent();
  const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
  const otherTrips = trips.filter((t) => t.id !== trip.id);
  const nextEvent =
  trip.events.find((e) => e.status === 'active') ||
  trip.events.find((e) => e.status === 'upcoming');
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero */}
      <section className="text-center max-w-3xl mx-auto pt-12 md:pt-20 mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-light text-teal text-xs font-medium mb-6 max-w-[90vw]">
          <Sparkles size={12} className="shrink-0" />
          <span className="text-left">
            Portfolio demo ·  Explore one of three curated trips or plan a sample Seattle → Chicago itinerary
          </span>
        </div>
        <h1 className="font-serif text-5xl md:text-7xl text-ink mb-6 tracking-tight">
          Your travel day,
          <br />
          orchestrated.
        </h1>
        <p className="text-lg md:text-xl text-muted mb-8 max-w-2xl mx-auto">
          One timeline. No app switching. TravelOS anticipates delays,
          coordinates your transport, and tells you exactly what to do next.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/trip/active"
            onClick={() => track('cta_clicked', { cta: 'open_active_trip', source: 'home_hero', target_path: '/trip/active' })}
            className="bg-ink text-cream px-6 py-3 rounded-xl font-medium hover:bg-ink/90 transition-colors flex items-center gap-2">

            Open active trip <ArrowRight size={18} />
          </Link>
          <Link
            to="/plan"
            onClick={() => track('cta_clicked', { cta: 'plan_sample_trip', source: 'home_hero', target_path: '/plan' })}
            className="bg-surface text-ink border border-warm px-6 py-3 rounded-xl font-medium hover:border-ink/40 transition-colors">

            Plan a sample trip
          </Link>
          <Link
            to="/case-study"
            onClick={() => track('cta_clicked', { cta: 'read_case_study', source: 'home_hero', target_path: '/case-study' })}
            className="text-ink/70 hover:text-ink px-3 py-3 text-sm font-medium underline-offset-4 hover:underline transition-colors">

            Read the case study →
          </Link>
        </div>
      </section>

      {/* Active trip - featured */}
      <section className="max-w-4xl mx-auto mb-14">
        <div className="flex items-end justify-between mb-4">
          <h3 className="font-serif text-2xl text-ink">Continue active trip</h3>
          <Link
            to="/trips"
            onClick={() => track('cta_clicked', { cta: 'view_all_trips', source: 'home', target_path: '/trips' })}
            className="text-sm text-teal hover:underline font-medium">

            View all trips
          </Link>
        </div>

        <Link
          to="/trip/active"
          onClick={() => track('cta_clicked', { cta: 'active_trip_card', source: 'home', target_path: '/trip/active' })}
          className="block group bg-surface border border-warm rounded-2xl shadow-subtle hover:border-teal/50 transition-colors overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 p-6 items-center">
            <div className="flex items-center gap-5 min-w-0">
              <div className="w-14 h-14 rounded-full bg-teal-light flex items-center justify-center text-teal shrink-0">
                <Plane size={26} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="px-2 py-0.5 rounded-full bg-teal text-cream text-xs font-medium uppercase tracking-wide">
                    Active now
                  </span>
                  <span className="text-xs text-muted">
                    {formatDate(trip.startDate)} – {formatDate(trip.endDate)}
                  </span>
                </div>
                <h4 className="font-serif text-2xl md:text-3xl text-ink mb-1">
                  {trip.origin.split(',')[0]} → {trip.destination.split(',')[0]}
                </h4>
                {nextEvent &&
                <p className="text-sm text-muted truncate">
                    Up next:{' '}
                    <span className="text-ink font-medium">
                      {nextEvent.title}
                    </span>
                  </p>
                }
              </div>
            </div>
            <div className="flex items-center gap-2 text-ink group-hover:text-teal transition-colors md:justify-end">
              <span className="text-sm font-medium">Open dashboard</span>
              <ArrowRight size={18} />
            </div>
          </div>
        </Link>
      </section>

      {/* Other trips */}
      <section className="max-w-4xl mx-auto mb-14">
        <h3 className="font-serif text-2xl text-ink mb-4">Also in the demo</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {otherTrips.map((t) =>
          <button
            key={t.id}
            onClick={() => {
              track('trip_switched', { trip_id: t.id, source: 'home' });
              setActiveTripId(t.id);
            }}
            className="text-left bg-surface border border-warm rounded-xl p-5 hover:border-ink/30 transition-colors group">
            
              <div className="flex items-start justify-between mb-3 gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-xs text-muted uppercase tracking-wider">
                      Upcoming
                    </span>
                    {t.id === 'trip-jfk-ywg' &&
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-cream border border-warm text-ink">
                        International
                      </span>
                  }
                  </div>
                  <h4 className="font-serif text-xl text-ink">
                    {t.origin.split(',')[0]} → {t.destination.split(',')[0]}
                  </h4>
                </div>
                <ArrowRight
                size={18}
                className="text-muted group-hover:text-teal group-hover:translate-x-0.5 transition-all shrink-0" />
              
              </div>
              <div className="flex items-center gap-3 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> {formatDate(t.startDate)} –{' '}
                  {formatDate(t.endDate)}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={12} />{' '}
                  {t.events.find((e) => e.type === 'flight')?.details?.
                flightNumber || 'Flight'}
                </span>
              </div>
              <div className="mt-3 text-xs text-teal font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Make active →
              </div>
            </button>
          )}
        </div>
        <p className="text-xs text-muted mt-4 text-center">
          Tip: switch trips here, from the demo control panel (bottom-right), or
          on the My Trips page.
        </p>
      </section>
    </div>);

}