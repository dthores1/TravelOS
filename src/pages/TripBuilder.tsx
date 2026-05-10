import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  MapPin,
  Calendar,
  Briefcase,
  Heart,
  Users,
  Zap,
  DollarSign,
  Coffee,
  Minus,
  Plus,
  ArrowRightLeft,
  ArrowRight as ArrowRightIcon } from
'lucide-react';
export default function TripBuilder() {
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway'>('roundtrip');
  const [travelers, setTravelers] = useState(1);
  const [purpose, setPurpose] = useState<'business' | 'leisure'>('business');
  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto pt-8">
      <h1 className="font-serif text-4xl text-ink mb-2">Plan your trip</h1>
      <p className="text-muted mb-8">
        Tell us where you're going and what matters most.
      </p>

      <div className="space-y-8 bg-surface p-6 md:p-8 rounded-2xl border border-warm shadow-subtle">
        {/* Trip type toggle */}
        <div className="inline-flex p-1 bg-cream/70 border border-warm rounded-full">
          <button
            onClick={() => setTripType('roundtrip')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${tripType === 'roundtrip' ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'}`}>
            
            <ArrowRightLeft size={14} /> Round trip
          </button>
          <button
            onClick={() => setTripType('oneway')}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${tripType === 'oneway' ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'}`}>
            
            <ArrowRightIcon size={14} /> One way
          </button>
        </div>

        {/* Route */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              From
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                size={18} />
              
              <input
                type="text"
                defaultValue="Seattle, WA"
                className="w-full pl-10 pr-4 py-3 bg-cream/50 border border-warm rounded-xl focus:bg-surface focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all" />
              
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-2">
              To
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                size={18} />
              
              <input
                type="text"
                defaultValue="Chicago, IL"
                className="w-full pl-10 pr-4 py-3 bg-cream/50 border border-warm rounded-xl focus:bg-surface focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all" />
              
            </div>
          </div>
        </div>

        {/* Dates */}
        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            {tripType === 'roundtrip' ? 'Dates' : 'Departure date'}
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              size={18} />
            
            <input
              type="text"
              defaultValue={
              tripType === 'roundtrip' ? 'Nov 18 - Nov 21' : 'Nov 18'
              }
              className="w-full pl-10 pr-4 py-3 bg-cream/50 border border-warm rounded-xl focus:bg-surface focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all" />
            
          </div>
        </div>

        {/* Purpose + Travelers row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div>
            <label className="block text-sm font-medium text-ink mb-3">
              Trip Purpose
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setPurpose('business')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${purpose === 'business' ? 'border-2 border-teal bg-teal-light/20 text-teal' : 'border border-warm bg-surface text-muted hover:border-ink/20'}`}>
                
                <Briefcase size={16} /> Business
              </button>
              <button
                onClick={() => setPurpose('leisure')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${purpose === 'leisure' ? 'border-2 border-teal bg-teal-light/20 text-teal' : 'border border-warm bg-surface text-muted hover:border-ink/20'}`}>
                
                <Heart size={16} /> Leisure
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-ink mb-3">
              Travelers
            </label>
            <div className="flex items-center justify-between bg-cream/50 border border-warm rounded-xl px-4 py-2.5">
              <div className="flex items-center gap-2 text-ink">
                <Users size={18} className="text-muted" />
                <span className="text-sm font-medium">
                  {travelers} {travelers === 1 ? 'traveler' : 'travelers'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  disabled={travelers <= 1}
                  aria-label="Decrease travelers"
                  className="w-8 h-8 rounded-full bg-surface border border-warm flex items-center justify-center text-ink hover:border-ink/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  
                  <Minus size={14} />
                </button>
                <button
                  onClick={() => setTravelers(Math.min(9, travelers + 1))}
                  disabled={travelers >= 9}
                  aria-label="Increase travelers"
                  className="w-8 h-8 rounded-full bg-surface border border-warm flex items-center justify-center text-ink hover:border-ink/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  
                  <Plus size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Priorities */}
        <div>
          <label className="block text-sm font-medium text-ink mb-3">
            What's most important?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-warm bg-surface hover:border-teal hover:bg-teal-light/10 transition-colors text-center group">
              <Zap
                size={24}
                className="text-muted group-hover:text-teal mb-2" />
              
              <span className="text-sm font-medium text-ink">Fastest</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-warm bg-surface hover:border-teal hover:bg-teal-light/10 transition-colors text-center group">
              <DollarSign
                size={24}
                className="text-muted group-hover:text-teal mb-2" />
              
              <span className="text-sm font-medium text-ink">Cheapest</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-teal bg-teal-light/10 transition-colors text-center">
              <Coffee size={24} className="text-teal mb-2" />
              <span className="text-sm font-medium text-ink">
                Least Stressful
              </span>
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-warm flex justify-end">
          <Link
            to="/plan/flights"
            className="bg-ink text-cream px-8 py-3 rounded-xl font-medium hover:bg-ink/90 transition-colors flex items-center gap-2">
            
            Find Flights <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>);

}