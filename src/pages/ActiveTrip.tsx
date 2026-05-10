import React from 'react';
import { useTrip } from '../context/TripContext';
import { NextActionCard } from '../components/NextActionCard';
import { TripTimeline } from '../components/TripTimeline';
import { DisruptionBanner } from '../components/DisruptionBanner';
import { SmartSuggestions } from '../components/SmartSuggestions';
import {
  CloudSun,
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  Map,
  Info,
  Utensils } from
'lucide-react';
import { Link } from 'react-router-dom';
import { destinationWeather } from '../data/mockWeather';
import { ComingSoonPill } from '../components/ComingSoonPill';
const weatherIcons = {
  sun: Sun,
  cloud: Cloud,
  cloudSun: CloudSun,
  rain: CloudRain,
  snow: CloudSnow
};
export default function ActiveTrip() {
  const { trip } = useTrip();
  // Find the next active or warning event
  const nextEvent =
  trip.events.find((e) => e.status === 'active' || e.status === 'warning') ||
  trip.events.find((e) => e.status === 'upcoming');
  const weather =
  destinationWeather[trip.id] || destinationWeather['trip-sea-ord'];
  const WeatherIcon = weatherIcons[weather.iconName];
  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full bg-teal-light text-teal text-xs font-medium tracking-wide uppercase">
            Active Trip
          </span>
          <span className="text-sm text-muted">
            {new Date(trip.startDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}{' '}
            –{' '}
            {new Date(trip.endDate).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-ink">
          {trip.origin.split(',')[0]} to {trip.destination.split(',')[0]}
        </h1>
      </div>

      <DisruptionBanner />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content - Timeline & Actions */}
        <div className="lg:col-span-8 space-y-8">
          <NextActionCard event={nextEvent || null} />

          <div id="itinerary" className="bg-surface rounded-2xl p-6 md:p-8 border border-warm shadow-subtle scroll-mt-24">
            <h3 className="font-serif text-2xl text-ink mb-6">Itinerary</h3>
            <TripTimeline />
          </div>
        </div>

        {/* Right Rail - Context & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* Weather Card */}
          <div className="bg-surface rounded-xl p-5 border border-warm shadow-subtle">
            <h4 className="text-sm font-medium text-muted mb-4 uppercase tracking-wider">
              Destination Weather
            </h4>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-serif text-ink mb-1">
                  {weather.temp}°{weather.unit}
                </div>
                <div className="text-sm text-muted">{weather.city}</div>
              </div>
              <WeatherIcon
                size={40}
                className="text-ink/40"
                strokeWidth={1.5} />
              
            </div>
            <div className="mt-4 pt-4 border-t border-warm text-sm text-ink">
              {weather.summary}. {weather.pack}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-surface rounded-xl p-5 border border-warm shadow-subtle">
            <h4 className="text-sm font-medium text-muted mb-4 uppercase tracking-wider">
              Quick Actions
            </h4>
            <div className="space-y-2">
              <Link
                to="/trip/dining"
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-cream transition-colors text-left group">
                
                <div className="flex items-center gap-3 text-ink">
                  <Utensils
                    size={18}
                    className="text-muted group-hover:text-teal transition-colors" />
                  
                  <span className="font-medium text-sm">Find dining</span>
                </div>
              </Link>
              <button
                disabled
                aria-disabled="true"
                className="w-full flex items-center justify-between p-3 rounded-lg text-left cursor-not-allowed opacity-70">
                
                <div className="flex items-center gap-3 text-ink">
                  <Map size={18} className="text-muted" />
                  <span className="font-medium text-sm">View Route Map</span>
                </div>
                <ComingSoonPill />
              </button>
              <Link
                to="/trip/support"
                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-cream transition-colors text-left group">
                
                <div className="flex items-center gap-3 text-ink">
                  <Info
                    size={18}
                    className="text-muted group-hover:text-teal transition-colors" />
                  
                  <span className="font-medium text-sm">Trip Support</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Smart Suggestions */}
          <SmartSuggestions />

          {/* Dining Suggestion (Contextual) */}
          {trip.disruptionState === 'delayed' &&
          <div className="bg-teal-light/30 rounded-xl p-5 border border-teal/20">
              <h4 className="text-sm font-medium text-teal mb-2">
                Extra time at SEA?
              </h4>
              <p className="text-sm text-ink/80 mb-4">
                Since your flight is delayed, you have about 45 minutes to grab
                food near Gate A12.
              </p>
              <Link
              to="/trip/dining"
              className="block text-center text-sm font-medium bg-surface text-teal px-4 py-2 rounded-lg border border-teal/20 hover:bg-teal hover:text-cream transition-colors w-full">
              
                Find Dining Nearby
              </Link>
            </div>
          }
        </div>
      </div>
    </div>);

}