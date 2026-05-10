import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Mail,
  ArrowRight,
  Plane,
  Calendar,
  Copy } from
'lucide-react';
import { toast } from 'sonner';
import { useTrip } from '../context/TripContext';
function generateConfirmationNumber() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < 6; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `TVO-${out}`;
}
export default function Confirmation() {
  const { trip, selectedTransport } = useTrip();
  const confirmationNumber = useMemo(() => generateConfirmationNumber(), []);
  const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
  const flightEvent = trip.events.find((e) => e.type === 'flight');
  const hotelEvent = trip.events.find((e) => e.type === 'hotel');
  const copyConfirmation = () => {
    navigator.clipboard.writeText(confirmationNumber);
    toast.success('Confirmation number copied');
  };
  return (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto pt-8 pb-12">
      {/* Success header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-light text-teal mb-5">
          <CheckCircle2 size={32} />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">
          You're all set.
        </h1>
        <p className="text-muted text-lg max-w-md mx-auto">
          Your trip is booked and we've started orchestrating it.
        </p>
      </div>

      {/* Confirmation card */}
      <div className="bg-surface rounded-2xl border border-warm shadow-subtle overflow-hidden mb-6">
        <div className="p-6 border-b border-warm flex items-center justify-between gap-4 flex-wrap">
          <div>
            <div className="text-xs text-muted uppercase tracking-wider mb-1">
              Confirmation number
            </div>
            <div className="font-serif text-2xl text-ink tracking-wide">
              {confirmationNumber}
            </div>
          </div>
          <button
            onClick={copyConfirmation}
            className="flex items-center gap-2 text-sm font-medium text-ink/80 hover:text-ink bg-cream border border-warm px-3 py-2 rounded-lg transition-colors">
            
            <Copy size={14} /> Copy
          </button>
        </div>

        <div className="p-6 space-y-5">
          <Row
            icon={<Plane size={16} />}
            label="Flight"
            value={flightEvent?.title.replace('Flight ', '') || 'Flight'}
            sub={flightEvent?.subtitle} />
          
          <Row
            icon={<Calendar size={16} />}
            label="Dates"
            value={`${formatDate(trip.startDate)} – ${formatDate(trip.endDate)}`} />
          
          {hotelEvent &&
          <Row
            icon={<CheckCircle2 size={16} />}
            label="Hotel"
            value={hotelEvent.title.replace('Check-in at ', '')}
            sub={hotelEvent.subtitle} />

          }
          <Row
            icon={<CheckCircle2 size={16} />}
            label="Ground transport"
            value={selectedTransport.label}
            sub={selectedTransport.sub} />
          
        </div>
      </div>

      {/* Email reassurance */}
      <div className="bg-cream/40 border border-warm rounded-xl p-5 flex items-start gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-surface border border-warm flex items-center justify-center text-teal shrink-0">
          <Mail size={18} />
        </div>
        <div>
          <div className="font-medium text-ink mb-1">Check your inbox</div>
          <p className="text-sm text-muted leading-relaxed">
            We've sent a full itinerary, receipts, and your boarding pass to
            your email. You can also access everything from the active trip
            dashboard.
          </p>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex items-center gap-3 flex-wrap">
        <Link
          to="/trip/active"
          className="bg-ink text-cream px-6 py-3 rounded-xl font-medium hover:bg-ink/90 transition-colors flex items-center gap-2">
          
          Open active trip <ArrowRight size={18} />
        </Link>
        <Link
          to="/trips"
          className="bg-surface text-ink border border-warm px-6 py-3 rounded-xl font-medium hover:border-ink/40 transition-colors">
          
          View all trips
        </Link>
      </div>
    </div>);

}
function Row({
  icon,
  label,
  value,
  sub





}: {icon: React.ReactNode;label: string;value: string;sub?: string;}) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-9 h-9 rounded-lg bg-cream border border-warm flex items-center justify-center text-ink shrink-0">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-muted uppercase tracking-wider mb-0.5">
          {label}
        </div>
        <div className="font-medium text-ink">{value}</div>
        {sub && <div className="text-sm text-muted mt-0.5">{sub}</div>}
      </div>
    </div>);

}