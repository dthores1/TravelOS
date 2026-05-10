import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Plane,
  Clock,
  MapPin,
  Briefcase,
  QrCode,
  AlertTriangle,
  CheckCircle2,
  Wifi,
  Tv,
  Leaf,
  Cloud,
  ChevronRight } from
'lucide-react';
import { motion } from 'framer-motion';
import { useTrip } from '../context/TripContext';
export default function FlightDetail() {
  const navigate = useNavigate();
  const { trip } = useTrip();
  const flightEvent = trip.events.find((e) => e.type === 'flight');
  const arrivalEvent = trip.events.find(
    (e) =>
    e.type === 'arrival' &&
    flightEvent?.title.split(' to ')[1] &&
    e.title.includes(flightEvent.title.split(' to ')[1])
  );
  if (!flightEvent || !flightEvent.details) {
    return (
      <div className="text-center py-20">
        <p className="text-muted">No flight details available.</p>
      </div>);

  }
  const isDelayed = flightEvent.status === 'delayed';
  const hasGateChange = flightEvent.location?.includes('Changed');
  const scheduledDep = new Date(flightEvent.scheduledTime).toLocaleTimeString(
    [],
    {
      hour: 'numeric',
      minute: '2-digit'
    }
  );
  const actualDep = flightEvent.actualTime ?
  new Date(flightEvent.actualTime).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit'
  }) :
  null;
  const scheduledArr = arrivalEvent ?
  new Date(arrivalEvent.scheduledTime).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit'
  }) :
  '—';
  const actualArr = arrivalEvent?.actualTime ?
  new Date(arrivalEvent.actualTime).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit'
  }) :
  null;
  // Parse origin/destination from title (e.g. "Flight UA 1234 to ORD")
  const origin = trip.origin.split(',')[0].slice(0, 3).toUpperCase(); // SEA, ORD, NYC
  const codeMap: Record<string, string> = {
    SEA: 'SEA',
    CHI: 'ORD',
    NEW: 'JFK'
  };
  const originCode = codeMap[origin] || origin;
  const destinationCode =
  flightEvent.title.split(' to ')[1] || trip.destination.slice(0, 3);
  return (
    <div className="animate-in fade-in duration-500 max-w-4xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-6">
        
        <ArrowLeft size={16} /> Back
      </button>

      {/* Status banner */}
      {(isDelayed || hasGateChange) &&
      <motion.div
        initial={{
          opacity: 0,
          y: -8
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        className={`mb-6 rounded-xl p-4 border flex items-start gap-3 ${isDelayed ? 'bg-amber-light/50 border-amber/20' : 'bg-surface border-warm'}`}>
        
          <AlertTriangle
          size={18}
          className={isDelayed ? 'text-amber' : 'text-ink'} />
        
          <div>
            <div className="text-sm font-medium text-ink">
              {isDelayed ?
            'Flight delayed by 45 minutes' :
            'Gate changed to C4'}
            </div>
            <div className="text-xs text-muted mt-0.5">
              {isDelayed ?
            'New departure: ' +
            actualDep +
            ". We've adjusted your downstream itinerary." :
            'Allow ~9 minutes to walk to the new gate.'}
            </div>
          </div>
        </motion.div>
      }

      {/* Boarding pass */}
      <div className="bg-ink text-cream rounded-2xl overflow-hidden shadow-floating mb-6">
        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          {/* Origin */}
          <div>
            <div className="text-xs text-cream/60 uppercase tracking-wider mb-1">
              From
            </div>
            <div className="font-serif text-5xl md:text-6xl mb-1">
              {originCode}
            </div>
            <div className="text-sm text-cream/70">
              {trip.origin.split(',')[0]}
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-serif text-2xl">
                {actualDep || scheduledDep}
              </span>
              {actualDep &&
              <span className="text-xs text-cream/50 line-through">
                  {scheduledDep}
                </span>
              }
            </div>
          </div>

          {/* Plane animation */}
          <div className="hidden md:flex flex-col items-center">
            <div className="text-xs text-cream/60 uppercase tracking-wider mb-2">
              {flightEvent.details.duration}
            </div>
            <div className="relative w-32 h-6 flex items-center justify-center">
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-cream/30 border-dashed" />
              <motion.div
                animate={{
                  x: [0, 8, 0]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity
                }}
                className="relative z-10 flex items-center justify-center bg-ink px-1">
                <Plane size={20} className="text-teal-light rotate-90" />
              </motion.div>
            </div>
            <div className="text-xs text-cream/60 mt-2">
              {flightEvent.title.includes('Nonstop') ||
              flightEvent.subtitle?.includes('Nonstop') ?
              'Nonstop' :
              'Connection'}
            </div>
          </div>

          {/* Destination */}
          <div className="md:text-right">
            <div className="text-xs text-cream/60 uppercase tracking-wider mb-1">
              To
            </div>
            <div className="font-serif text-5xl md:text-6xl mb-1">
              {destinationCode}
            </div>
            <div className="text-sm text-cream/70">
              {trip.destination.split(',')[0]}
            </div>
            <div className="mt-3 flex items-baseline gap-2 md:justify-end">
              <span className="font-serif text-2xl">
                {actualArr || scheduledArr}
              </span>
              {actualArr &&
              <span className="text-xs text-cream/50 line-through">
                  {scheduledArr}
                </span>
              }
            </div>
          </div>
        </div>

        {/* Boarding pass detail strip */}
        <div className="border-t border-cream/10 px-6 md:px-8 py-5 grid grid-cols-2 md:grid-cols-5 gap-5 relative">
          {/* Notch decoration */}
          <div className="absolute -top-3 left-0 w-6 h-6 bg-cream rounded-full"></div>
          <div className="absolute -top-3 right-0 w-6 h-6 bg-cream rounded-full"></div>

          <PassField
            label="Flight"
            value={flightEvent.details.flightNumber || '—'} />
          
          <PassField
            label="Gate"
            value={flightEvent.details.gate || '—'}
            highlight={hasGateChange} />
          
          <PassField
            label="Terminal"
            value={flightEvent.details.terminal || '—'} />
          
          <PassField label="Seat" value={flightEvent.details.seat || '—'} />
          <PassField
            label="Booking"
            value={flightEvent.details.bookingRef || '—'} />
          
        </div>

        {/* QR strip */}
        <div className="border-t border-cream/10 px-6 md:px-8 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-cream text-ink rounded-lg flex items-center justify-center">
              <QrCode size={26} />
            </div>
            <div>
              <div className="text-sm font-medium">Mobile boarding pass</div>
              <div className="text-xs text-cream/60">
                Tap at the gate scanner
              </div>
            </div>
          </div>
          <button className="text-sm font-medium text-cream/80 hover:text-cream flex items-center gap-1">
            Add to wallet <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status timeline */}
          <div className="bg-surface border border-warm rounded-2xl p-6 shadow-subtle">
            <h3 className="font-serif text-xl text-ink mb-5">Flight status</h3>
            <div className="space-y-4">
              <StatusRow
                done
                label="Check-in open"
                detail="Online check-in available now" />
              
              <StatusRow
                done={!isDelayed}
                active={isDelayed}
                label="Boarding"
                detail={
                isDelayed ?
                'Pushed to ~7:57 AM (was 7:12 AM)' :
                'Begins 30 min before departure'
                } />
              
              <StatusRow
                label="Departure"
                detail={`${actualDep || scheduledDep} from Gate ${flightEvent.details.gate}`} />
              
              <StatusRow
                label="Arrival"
                detail={`${actualArr || scheduledArr} at ${destinationCode}`} />
              
              <StatusRow
                label="Baggage"
                detail="Carousel assigned ~10 min after landing"
                last />
              
            </div>
          </div>

          {/* Aircraft & amenities */}
          <div className="bg-surface border border-warm rounded-2xl p-6 shadow-subtle">
            <h3 className="font-serif text-xl text-ink mb-5">
              Aircraft & amenities
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <Amenity
                icon={<Plane size={16} />}
                label="Aircraft"
                value="Boeing 737-900" />
              
              <Amenity
                icon={<Wifi size={16} />}
                label="Wi-Fi"
                value="Available" />
              
              <Amenity
                icon={<Tv size={16} />}
                label="Entertainment"
                value="Seatback screens" />
              
              <Amenity
                icon={<Briefcase size={16} />}
                label="Baggage"
                value="1 carry-on" />
              
              <Amenity
                icon={<Leaf size={16} className="text-green" />}
                label="Carbon"
                value="182 kg CO₂" />
              
              <Amenity
                icon={<Cloud size={16} />}
                label="Forecast"
                value="Light turbulence" />
              
            </div>
          </div>
        </div>

        {/* Sidebar — gate info */}
        <aside className="space-y-6">
          <div className="bg-surface border border-warm rounded-2xl p-5 shadow-subtle">
            <h4 className="text-sm font-medium text-muted mb-4 uppercase tracking-wider">
              At the airport
            </h4>
            <div className="space-y-3">
              <SidebarRow
                label="Security wait"
                value="6 min · Checkpoint 3"
                tone="good" />
              
              <SidebarRow
                label="Walk to gate"
                value={
                hasGateChange ? '~9 min from current location' : '~5 min'
                }
                tone={hasGateChange ? 'warning' : 'default'} />
              
              <SidebarRow
                label="Lounge access"
                value="United Club, Concourse A"
                tone="default" />
              
            </div>
          </div>

          <div className="bg-cream/60 border border-warm rounded-2xl p-5">
            <div className="text-sm font-medium text-ink mb-2">
              Need to make a change?
            </div>
            <p className="text-xs text-muted mb-4">
              Within 24 hours of booking, changes are free on most fares.
            </p>
            <button className="w-full bg-surface border border-warm text-ink text-sm font-medium px-4 py-2 rounded-lg hover:border-ink/30 transition-colors">
              Manage flight
            </button>
          </div>
        </aside>
      </div>
    </div>);

}
function PassField({
  label,
  value,
  highlight




}: {label: string;value: string;highlight?: boolean;}) {
  return (
    <div>
      <div className="text-[10px] text-cream/60 uppercase tracking-wider mb-0.5">
        {label}
      </div>
      <div
        className={`font-serif text-lg ${highlight ? 'text-amber-light' : 'text-cream'}`}>
        
        {value}
      </div>
    </div>);

}
function StatusRow({
  done,
  active,
  label,
  detail,
  last






}: {done?: boolean;active?: boolean;label: string;detail: string;last?: boolean;}) {
  return (
    <div className="flex gap-3 items-start">
      <div className="flex flex-col items-center self-stretch">
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-teal text-cream' : active ? 'bg-amber text-cream' : 'bg-surface border-2 border-warm'}`}>
          
          {done && <CheckCircle2 size={12} />}
        </div>
        {!last && <div className="w-px flex-1 bg-warm mt-1 min-h-[16px]"></div>}
      </div>
      <div className="pb-3 -mt-0.5">
        <div className="text-sm font-medium text-ink">{label}</div>
        <div className="text-xs text-muted mt-0.5">{detail}</div>
      </div>
    </div>);

}
function Amenity({
  icon,
  label,
  value




}: {icon: React.ReactNode;label: string;value: string;}) {
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-7 h-7 rounded-lg bg-cream border border-warm flex items-center justify-center shrink-0 text-ink">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-[10px] text-muted uppercase tracking-wider mb-0.5">
          {label}
        </div>
        <div className="text-sm text-ink font-medium">{value}</div>
      </div>
    </div>);

}
function SidebarRow({
  label,
  value,
  tone




}: {label: string;value: string;tone: 'good' | 'warning' | 'default';}) {
  const dotColor =
  tone === 'good' ? 'bg-green' : tone === 'warning' ? 'bg-amber' : 'bg-warm';
  return (
    <div className="flex items-start gap-2.5">
      <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${dotColor}`}></div>
      <div className="min-w-0">
        <div className="text-xs text-muted">{label}</div>
        <div className="text-sm text-ink font-medium">{value}</div>
      </div>
    </div>);

}