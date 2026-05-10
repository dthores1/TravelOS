import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Clock,
  MapPin,
  Plane,
  ChevronDown,
  Phone,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Building,
  Hospital,
  HelpCircle,
  Train,
  Flag,
  Info } from
'lucide-react';
import { useTrip } from '../context/TripContext';
import { ComingSoonPill } from '../components/ComingSoonPill';
type CheckpointId = 'a' | 'b' | 'c';
interface Checkpoint {
  id: CheckpointId;
  label: string;
  waitMin: number;
  walkMin: number;
  note?: string;
}
const checkpoints: Checkpoint[] = [
{
  id: 'a',
  label: 'Checkpoint 1 (Main)',
  waitMin: 22,
  walkMin: 4
},
{
  id: 'b',
  label: 'Checkpoint 2 (TSA Pre)',
  waitMin: 6,
  walkMin: 8,
  note: 'TSA Pre members only'
},
{
  id: 'c',
  label: 'Checkpoint 3 (Side)',
  waitMin: 9,
  walkMin: 11,
  note: 'Often quietest'
}];

// FAQ entries shown across most trips
const baseFaqs: {
  q: string;
  a: string;
}[] = [
{
  q: 'Where do I pick up rideshare at ORD?',
  a: 'Domestic arrivals: Door 4 on the lower level outside Baggage Claim. Look for the rideshare lane signs. International arrivals: ground transportation center, accessible via the elevator near Carousel 9.'
},
{
  q: 'How early should I leave the hotel for my return flight?',
  a: 'Aim to arrive at the airport 90 minutes before departure for domestic, 2.5 hours for international. From your hotel, allow 45 min during the day and 60 min in rush hour. We will send a calibrated reminder closer to the day.'
},
{
  q: 'What if I miss my flight?',
  a: 'Stay calm — same-day rebooking is usually free if the delay was the airline\'s fault. Otherwise, a same-day standby fee applies. From the Active Trip page, the disruption banner exposes a "Rebook" CTA when relevant.'
},
{
  q: 'Where are luggage carts at ORD?',
  a: 'Smart Carte stations are located near every baggage carousel in Terminal 2. $7 per cart. Free in international arrivals (Terminal 5).'
}];

// Extra international FAQ — only shown for the YWG trip
const internationalFaqs: {
  q: string;
  a: string;
}[] = [
{
  q: 'Do I clear customs before baggage claim in Canada?',
  a: 'In Winnipeg (YWG), you collect your checked baggage first, then proceed through CBSA customs with your bags. Have your passport and ArriveCAN confirmation ready before you reach the agent.'
},
{
  q: 'Can I use my US phone in Canada?',
  a: 'Most US carriers offer a daily international plan ($10–12/day) that activates automatically when you connect to a Canadian network. You can also pre-purchase a travel pass before you fly to avoid surprise charges.'
}];

export default function TripSupport() {
  const { trip, resolveDisruption } = useTrip();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const isInternational = trip.id === 'trip-jfk-ywg';
  const faqs = isInternational ? [...baseFaqs, ...internationalFaqs] : baseFaqs;
  const flightEvent = trip.events.find((e) => e.type === 'flight');
  const arrivalEvent = trip.events.find(
    (e) => e.type === 'arrival' && e.id !== trip.events[1]?.id
  );
  const baggageEvent = trip.events.find((e) => e.type === 'baggage');
  const transportEvent = trip.events.find((e) => e.type === 'transport');
  // Best checkpoint = lowest wait
  const bestCheckpoint = [...checkpoints].sort(
    (a, b) => a.waitMin - b.waitMin
  )[0];
  // Pre-set helper for hotel name
  const hotelEvent = trip.events.find((e) => e.type === 'hotel');
  const hotelName =
  hotelEvent?.title.replace('Check-in at ', '') || 'your hotel';
  // Airline contact mapping
  const airlineContacts: Record<
    string,
    {
      name: string;
      phone: string;
    }> =
  {
    'United Airlines': {
      name: 'United Airlines',
      phone: '1-800-864-8331'
    },
    'American Airlines': {
      name: 'American Airlines',
      phone: '1-800-433-7300'
    },
    'Air Canada': {
      name: 'Air Canada',
      phone: '1-888-247-2262'
    }
  };
  const airline = flightEvent?.details?.airline || 'United Airlines';
  const airlineContact =
  airlineContacts[airline] || airlineContacts['United Airlines'];
  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto pb-12">
      <div className="mb-8">
        <Link
          to="/trip/active"
          className="text-sm text-muted hover:text-ink transition-colors inline-flex items-center gap-1.5 mb-4">
          
          ← Back to active trip
        </Link>
        <h1 className="font-serif text-4xl md:text-5xl text-ink mb-2">
          Trip Support
        </h1>
        <p className="text-muted">
          Calm recovery tools for your travel day — no chat bubbles, just
          answers.
        </p>
      </div>

      {/* 1. Disruption Recovery */}
      <Section
        icon={<ShieldAlert size={18} />}
        title="Disruption Recovery"
        accent={trip.disruptionState !== 'none'}>
        
        {trip.disruptionState === 'none' &&
        <div className="bg-cream/40 border border-warm rounded-xl p-5 flex items-start gap-3">
            <CheckCircle2 size={18} className="text-teal mt-0.5 shrink-0" />
            <div>
              <div className="font-medium text-ink mb-0.5">
                Everything is on track
              </div>
              <p className="text-sm text-muted">
                If anything changes — delay, gate change, traffic — we'll
                surface concrete recovery actions here. Try the demo panel to
                preview.
              </p>
            </div>
          </div>
        }

        {trip.disruptionState === 'delayed' &&
        <div className="space-y-3">
            <div className="bg-amber-light/20 border border-amber/30 rounded-xl p-5">
              <div className="flex items-start gap-3 mb-1">
                <AlertCircle size={18} className="text-amber mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-ink">
                    {flightEvent?.details?.flightNumber || 'Your flight'}{' '}
                    delayed 45 minutes
                  </div>
                  <p className="text-sm text-muted mt-0.5">
                    New ETA at {arrivalEvent?.location || 'destination'}:{' '}
                    {arrivalEvent?.actualTime ?
                  new Date(arrivalEvent.actualTime).toLocaleTimeString(
                    [],
                    {
                      hour: 'numeric',
                      minute: '2-digit'
                    }
                  ) :
                  'recalculating'}
                  </p>
                </div>
              </div>
            </div>

            <RecoveryAction
            icon={<Clock size={16} />}
            title="Push your rideshare pickup"
            body="Your driver was originally booked for the on-time arrival. Push it 45 min so you don't pay wait fees."
            actionText="Reschedule pickup"
            onClick={() => {
              if (transportEvent && transportEvent.recommendation) {
                resolveDisruption(transportEvent.id, 'reschedule');
              }
            }}
            disabled={!transportEvent?.recommendation}
            disabledHint={
            !transportEvent?.recommendation ?
            'Already rescheduled' :
            undefined
            } />
          

            <RecoveryAction
            icon={<Train size={16} />}
            title="Switch to transit (now faster)"
            body="With the delay, the Blue Line beats rideshare by ~12 min. No surge pricing either."
            actionText="Compare options"
            to="/plan/transport" />
          

            <RecoveryAction
            icon={<Building size={16} />}
            title={`Notify ${hotelName} of late arrival`}
            body="They hold the room until midnight if we let them know — we'll send a courtesy note."
            actionText="Send notice"
            successText="Sent — desk has been notified" />
          

            <RecoveryAction
            icon={<Info size={16} />}
            title="Will you miss check-in?"
            body={`Hotel cutoff is midnight. Your new ETA arrives well before. You're fine.`}
            variant="info" />
          
          </div>
        }

        {trip.disruptionState === 'gateChange' &&
        <div className="space-y-3">
            <div className="bg-amber-light/20 border border-amber/30 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertCircle size={18} className="text-amber mt-0.5 shrink-0" />
                <div>
                  <div className="font-medium text-ink">
                    Gate changed to {flightEvent?.location || 'C4'}
                  </div>
                  <p className="text-sm text-muted mt-0.5">
                    11 min walk from your current location. You have time.
                  </p>
                </div>
              </div>
            </div>

            <RecoveryAction
            icon={<MapPin size={16} />}
            title="Walking directions to new gate"
            body="Take the moving walkway in Concourse C past the food court. Restrooms on the left at the midpoint."
            actionText="View route"
            comingSoon />
          

            <RecoveryAction
            icon={<Info size={16} />}
            title="Will you make boarding?"
            body="Boarding at the new gate starts in 38 min. 11 min walk + ~5 min buffer. You're fine."
            variant="info" />
          
          </div>
        }
      </Section>

      {/* 2. Airport Guidance */}
      <Section icon={<Plane size={18} />} title="Airport Guidance">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          {checkpoints.map((cp) => {
            const isBest = cp.id === bestCheckpoint.id;
            return (
              <div
                key={cp.id}
                className={`relative bg-surface border rounded-xl p-4 ${isBest ? 'border-teal shadow-subtle' : 'border-warm'}`}>
                
                {isBest &&
                <div className="absolute -top-2 left-3 text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-teal text-cream">
                    Best right now
                  </div>
                }
                <div className="text-xs text-muted uppercase tracking-wider mb-1">
                  {cp.label}
                </div>
                <div className="font-serif text-2xl text-ink">
                  {cp.waitMin}{' '}
                  <span className="text-base text-muted font-sans">
                    min wait
                  </span>
                </div>
                <div className="text-xs text-muted mt-1 flex items-center gap-1">
                  <MapPin size={11} /> {cp.walkMin} min walk from you
                </div>
                {cp.note &&
                <div className="text-xs text-ink/70 mt-2">{cp.note}</div>
                }
              </div>);

          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard
            icon={<Plane size={16} />}
            label="Walk to your gate"
            value="6 min"
            sub={`Gate ${flightEvent?.details?.gate || 'A12'} via Concourse A`} />
          
          <InfoCard
            icon={<MapPin size={16} />}
            label="Baggage at arrival"
            value={baggageEvent?.location || 'Carousel 4'}
            sub="Updated when you land" />
          
        </div>
      </Section>

      {/* 3. Travel-Day FAQ */}
      <Section icon={<HelpCircle size={18} />} title="Travel-Day FAQ">
        <div className="space-y-2">
          {faqs.map((f, i) => {
            const open = openFaq === i;
            return (
              <div
                key={i}
                className="bg-surface border border-warm rounded-xl overflow-hidden">
                
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-cream/30 transition-colors">
                  
                  <span className="font-medium text-ink">{f.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-muted shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                  
                </button>
                <AnimatePresence initial={false}>
                  {open &&
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
                      duration: 0.2
                    }}
                    className="overflow-hidden">
                    
                      <p className="px-4 pb-4 text-sm text-ink/80 leading-relaxed">
                        {f.a}
                      </p>
                    </motion.div>
                  }
                </AnimatePresence>
              </div>);

          })}
        </div>
      </Section>

      {/* 4. Travel Essentials */}
      <Section icon={<Phone size={18} />} title="Travel Essentials">
        <p className="text-sm text-muted mb-4">
          Direct lines if you need a human. Tap any number to call.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <ContactCard
            icon={<Plane size={16} />}
            label="Airline support"
            name={airlineContact.name}
            phone={airlineContact.phone} />
          
          <ContactCard
            icon={<Building size={16} />}
            label="Hotel direct"
            name={hotelName}
            phone="1-773-340-4006" />
          
          <ContactCard
            icon={<HelpCircle size={16} />}
            label="Airport help desk"
            name={isInternational ? 'YWG Information' : 'ORD Information'}
            phone={isInternational ? '1-204-987-9402' : '1-800-832-6352'} />
          
          <ContactCard
            icon={<Hospital size={16} />}
            label="Local emergency"
            name={isInternational ? 'Emergency (Canada)' : 'Emergency (US)'}
            phone="911"
            urgent />
          
          {isInternational &&
          <ContactCard
            icon={<Flag size={16} />}
            label="Embassy"
            name="US Consulate, Winnipeg"
            phone="1-204-940-1800" />

          }
        </div>
      </Section>

      {/* CTA back */}
      <div className="mt-12 bg-ink text-cream rounded-2xl p-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="font-serif text-2xl mb-1">Back to your day</h3>
          <p className="text-cream/70 text-sm">
            All these tools also surface contextually as your trip unfolds.
          </p>
        </div>
        <Link
          to="/trip/active"
          className="bg-teal hover:bg-teal/90 text-cream px-5 py-2.5 rounded-xl font-medium transition-colors flex items-center gap-2">
          
          Open active trip <ArrowRight size={18} />
        </Link>
      </div>
    </div>);

}
// ─── Helper components ─────────────────────────────────────────
function Section({
  icon,
  title,
  accent,
  children





}: {icon: React.ReactNode;title: string;accent?: boolean;children: React.ReactNode;}) {
  return (
    <section className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${accent ? 'bg-amber-light/40 text-amber' : 'bg-teal-light text-teal'}`}>
          
          {icon}
        </div>
        <h2 className="font-serif text-2xl text-ink">{title}</h2>
      </div>
      <div>{children}</div>
    </section>);

}
function RecoveryAction({
  icon,
  title,
  body,
  actionText,
  onClick,
  to,
  variant = 'default',
  disabled,
  disabledHint,
  comingSoon,
  successText












}: {icon: React.ReactNode;title: string;body: string;actionText?: string;onClick?: () => void;to?: string;variant?: 'default' | 'info';disabled?: boolean;disabledHint?: string;comingSoon?: boolean;successText?: string;}) {
  const [done, setDone] = useState(false);
  const isInfo = variant === 'info';
  const handleClick = () => {
    if (onClick) onClick();
    if (successText) setDone(true);
  };
  return (
    <div
      className={`bg-surface border rounded-xl p-4 flex items-start gap-3 ${isInfo ? 'border-teal/30 bg-teal-light/10' : 'border-warm'}`}>
      
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${isInfo ? 'bg-teal text-cream' : 'bg-cream border border-warm text-ink'}`}>
        
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="font-medium text-ink">{title}</div>
          {comingSoon && <ComingSoonPill />}
        </div>
        <p className="text-sm text-muted mt-0.5 leading-relaxed">{body}</p>
        {actionText && !isInfo &&
        <div className="mt-3">
            {done && successText ?
          <span className="text-xs font-medium text-teal flex items-center gap-1">
                <CheckCircle2 size={14} /> {successText}
              </span> :
          to ?
          <Link
            to={to}
            className="text-xs font-medium text-ink bg-cream border border-warm hover:border-ink/40 px-3 py-1.5 rounded transition-colors inline-flex items-center gap-1">
            
                {actionText} <ArrowRight size={12} />
              </Link> :

          <button
            onClick={handleClick}
            disabled={disabled || comingSoon}
            className="text-xs font-medium bg-ink text-cream hover:bg-ink/90 px-3 py-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            
                {disabled && disabledHint ? disabledHint : actionText}
              </button>
          }
          </div>
        }
      </div>
    </div>);

}
function InfoCard({
  icon,
  label,
  value,
  sub





}: {icon: React.ReactNode;label: string;value: string;sub?: string;}) {
  return (
    <div className="bg-surface border border-warm rounded-xl p-4 flex items-start gap-3">
      <div className="w-9 h-9 rounded-lg bg-cream border border-warm text-ink flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs text-muted uppercase tracking-wider mb-0.5">
          {label}
        </div>
        <div className="font-medium text-ink">{value}</div>
        {sub && <div className="text-xs text-muted mt-0.5">{sub}</div>}
      </div>
    </div>);

}
function ContactCard({
  icon,
  label,
  name,
  phone,
  urgent






}: {icon: React.ReactNode;label: string;name: string;phone: string;urgent?: boolean;}) {
  return (
    <a
      href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
      className={`group bg-surface border rounded-xl p-4 flex items-center gap-3 transition-colors ${urgent ? 'border-amber/30 hover:border-amber' : 'border-warm hover:border-ink/30'}`}>
      
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${urgent ? 'bg-amber text-cream' : 'bg-cream border border-warm text-ink'}`}>
        
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-muted uppercase tracking-wider mb-0.5">
          {label}
        </div>
        <div className="font-medium text-ink truncate">{name}</div>
        <div className="text-sm text-teal font-medium">{phone}</div>
      </div>
      <Phone
        size={16}
        className="text-muted group-hover:text-teal transition-colors shrink-0" />
      
    </a>);

}