import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Plane,
  Clock,
  ChevronDown,
  Tv,
  Leaf,
  Armchair,
  Wifi,
  Flame } from
'lucide-react';
type CabinClass = 'economy' | 'premium' | 'business' | 'first';
type SortKey = 'recommended' | 'price' | 'duration' | 'departure';
interface Flight {
  id: number;
  airline: string;
  airlineCode: string;
  number: string;
  dep: string;
  arr: string;
  depMinutes: number;
  durMinutes: number;
  dur: string;
  price: number;
  type: string;
  reliability: string;
  seatsLeft: number;
  entertainment: string;
  carbonKg: number;
  carbonNote: string;
  seatPitch: string;
  seatWidth: string;
  wifi: boolean;
  recommended: boolean;
}
const flights: Flight[] = [
{
  id: 1,
  airline: 'United Airlines',
  airlineCode: 'UA',
  number: '1234',
  dep: '7:42 AM',
  arr: '1:38 PM',
  depMinutes: 7 * 60 + 42,
  durMinutes: 4 * 60 + 16,
  dur: '4h 16m',
  price: 342,
  type: 'Nonstop',
  reliability: '94% on-time',
  seatsLeft: 3,
  entertainment: 'Seatback screens, free messaging',
  carbonKg: 182,
  carbonNote: '12% lower than average',
  seatPitch: '31"',
  seatWidth: '17.3"',
  wifi: true,
  recommended: true
},
{
  id: 2,
  airline: 'Alaska Airlines',
  airlineCode: 'AS',
  number: '892',
  dep: '9:15 AM',
  arr: '3:20 PM',
  depMinutes: 9 * 60 + 15,
  durMinutes: 4 * 60 + 5,
  dur: '4h 05m',
  price: 389,
  type: 'Nonstop',
  reliability: '88% on-time',
  seatsLeft: 9,
  entertainment: 'Stream to your device, power outlets',
  carbonKg: 174,
  carbonNote: '15% lower than average',
  seatPitch: '32"',
  seatWidth: '17.6"',
  wifi: true,
  recommended: false
},
{
  id: 3,
  airline: 'Delta',
  airlineCode: 'DL',
  number: '4126',
  dep: '6:00 AM',
  arr: '1:45 PM',
  depMinutes: 6 * 60,
  durMinutes: 5 * 60 + 45,
  dur: '5h 45m',
  price: 285,
  type: '1 Stop',
  reliability: '82% on-time',
  seatsLeft: 12,
  entertainment: 'Delta Studio, USB power',
  carbonKg: 218,
  carbonNote: '5% higher than average',
  seatPitch: '30"',
  seatWidth: '17.2"',
  wifi: true,
  recommended: false
}];

const cabinOptions: {
  id: CabinClass;
  label: string;
  multiplier: number;
}[] = [
{
  id: 'economy',
  label: 'Economy',
  multiplier: 1
},
{
  id: 'premium',
  label: 'Premium Economy',
  multiplier: 1.6
},
{
  id: 'business',
  label: 'Business',
  multiplier: 2.8
},
{
  id: 'first',
  label: 'First',
  multiplier: 4.2
}];

const sortOptions: {
  id: SortKey;
  label: string;
}[] = [
{
  id: 'recommended',
  label: 'Recommended'
},
{
  id: 'price',
  label: 'Price: Low to High'
},
{
  id: 'duration',
  label: 'Duration: Shortest'
},
{
  id: 'departure',
  label: 'Departure: Earliest'
}];

export default function FlightResults() {
  const [cabin, setCabin] = useState<CabinClass>('economy');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('recommended');
  const multiplier = cabinOptions.find((c) => c.id === cabin)?.multiplier || 1;
  const sortedFlights = useMemo(() => {
    const copy = [...flights];
    switch (sortKey) {
      case 'price':
        return copy.sort((a, b) => a.price - b.price);
      case 'duration':
        return copy.sort((a, b) => a.durMinutes - b.durMinutes);
      case 'departure':
        return copy.sort((a, b) => a.depMinutes - b.depMinutes);
      case 'recommended':
      default:
        return copy.sort((a, b) =>
        a.recommended === b.recommended ? 0 : a.recommended ? -1 : 1
        );
    }
  }, [sortKey]);
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-sm text-muted mb-2">Step 1 of 5</div>
          <h1 className="font-serif text-4xl text-ink mb-2">Select a flight</h1>
          <p className="text-muted">SEA to ORD • Nov 18</p>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="text-muted">Sort by</span>
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="bg-surface border border-warm rounded-lg px-3 py-2 text-sm text-ink outline-none focus:border-ink/40 cursor-pointer">
            
            {sortOptions.map((o) =>
            <option key={o.id} value={o.id}>
                {o.label}
              </option>
            )}
          </select>
        </label>
      </div>

      {/* Cabin class toggle */}
      <div className="mb-6">
        <div className="inline-flex p-1 bg-surface border border-warm rounded-full overflow-x-auto max-w-full">
          {cabinOptions.map((option) =>
          <button
            key={option.id}
            onClick={() => setCabin(option.id)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${cabin === option.id ? 'bg-ink text-cream' : 'text-muted hover:text-ink'}`}>
            
              {option.label}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {sortedFlights.map((flight) => {
          const adjustedPrice = Math.round(flight.price * multiplier);
          const isExpanded = expandedId === flight.id;
          const isUrgent = flight.seatsLeft <= 3;
          return (
            <div
              key={flight.id}
              className={`relative bg-surface rounded-xl border transition-all ${flight.recommended ? 'border-teal shadow-subtle' : 'border-warm hover:border-ink/20'}`}>
              
              {flight.recommended &&
              <div className="absolute -top-3 left-6 bg-teal text-cream text-xs font-medium px-3 py-1 rounded-full">
                  Least Stressful Pick
                </div>
              }

              <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Airline + flight number */}
                <div className="flex items-center gap-3 md:w-40 shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-cream border border-warm flex items-center justify-center font-serif text-sm font-medium text-ink shrink-0">
                    {flight.airlineCode}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ink truncate">
                      {flight.airline}
                    </div>
                    <div className="text-xs text-muted">
                      {flight.airlineCode} {flight.number}
                    </div>
                  </div>
                </div>

                {/* Times */}
                <div className="flex-1 grid grid-cols-3 gap-4 items-center">
                  <div>
                    <div className="text-2xl font-serif text-ink">
                      {flight.dep}
                    </div>
                    <div className="text-sm text-muted">SEA</div>
                  </div>
                  <div className="flex flex-col items-center px-2">
                    <div className="text-xs text-muted mb-1">{flight.dur}</div>
                    <div className="w-full h-px bg-warm relative flex items-center justify-center">
                      <Plane
                        size={14}
                        className="text-muted absolute bg-surface px-1" />
                      
                    </div>
                    <div className="text-xs text-teal font-medium mt-1">
                      {flight.type}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-serif text-ink">
                      {flight.arr}
                    </div>
                    <div className="text-sm text-muted">ORD</div>
                  </div>
                </div>

                <div className="hidden md:block w-px h-12 bg-warm"></div>

                {/* Price + scarcity */}
                <div className="flex items-center justify-between md:flex-col md:items-end gap-2 md:w-40">
                  <div className="text-2xl font-medium text-ink">
                    ${adjustedPrice}
                  </div>
                  <div
                    className={`text-xs font-medium flex items-center gap-1 ${isUrgent ? 'text-amber' : 'text-muted'}`}>
                    
                    {isUrgent && <Flame size={12} />}
                    {flight.seatsLeft <= 3 ?
                    `Only ${flight.seatsLeft} left at this price` :
                    `${flight.seatsLeft}+ seats available`}
                  </div>
                </div>

                <Link
                  to="/plan/baggage"
                  className="bg-ink text-cream px-6 py-3 rounded-lg font-medium hover:bg-ink/90 transition-colors text-center whitespace-nowrap">
                  
                  Select
                </Link>
              </div>

              {/* Expand toggle */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : flight.id)}
                aria-expanded={isExpanded}
                className="w-full px-5 py-2.5 border-t border-warm flex items-center justify-center gap-2 text-xs font-medium text-muted hover:text-ink transition-colors">
                
                {isExpanded ? 'Hide details' : 'Show flight details'}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                
              </button>

              <AnimatePresence initial={false}>
                {isExpanded &&
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0
                  }}
                  animate={{
                    height: 'auto',
                    opacity: 1
                  }}
                  exit={{
                    height: 0,
                    opacity: 0
                  }}
                  transition={{
                    duration: 0.25
                  }}
                  className="overflow-hidden border-t border-warm bg-cream/30">
                  
                    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <DetailRow
                      icon={<Clock size={16} className="text-ink" />}
                      label="On-time performance"
                      value={flight.reliability} />
                    
                      <DetailRow
                      icon={<Leaf size={16} className="text-green" />}
                      label="Carbon emissions"
                      value={`${flight.carbonKg} kg CO₂`}
                      sub={flight.carbonNote}
                      accent={flight.carbonKg < 200} />
                    
                      <DetailRow
                      icon={<Tv size={16} className="text-ink" />}
                      label="Entertainment"
                      value={flight.entertainment} />
                    
                      <DetailRow
                      icon={<Armchair size={16} className="text-ink" />}
                      label="Seat (economy)"
                      value={`${flight.seatPitch} pitch · ${flight.seatWidth} width`} />
                    
                      {flight.wifi &&
                    <DetailRow
                      icon={<Wifi size={16} className="text-ink" />}
                      label="Wi-Fi"
                      value="Available for purchase" />

                    }
                    </div>
                  </motion.div>
                }
              </AnimatePresence>
            </div>);

        })}
      </div>
    </div>);

}
function DetailRow({
  icon,
  label,
  value,
  sub,
  accent






}: {icon: React.ReactNode;label: string;value: string;sub?: string;accent?: boolean;}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${accent ? 'bg-green/10' : 'bg-surface border border-warm'}`}>
        
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted uppercase tracking-wider mb-0.5">
          {label}
        </div>
        <div className="text-sm font-medium text-ink">{value}</div>
        {sub &&
        <div
          className={`text-xs mt-0.5 ${accent ? 'text-green' : 'text-muted'}`}>
          
            {sub}
          </div>
        }
      </div>
    </div>);

}