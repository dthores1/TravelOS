import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Coffee,
  Train,
  Clock,
  Globe,
  WifiOff,
  Lightbulb,
  ArrowRight } from
'lucide-react';
import { useTrip } from '../context/TripContext';
interface Suggestion {
  id: string;
  icon: React.ReactNode;
  title: string;
  body: string;
  cta?: string;
  to?: string;
  tone?: 'default' | 'urgent';
}
function getSuggestions(tripId: string, disruption: string): Suggestion[] {
  if (disruption === 'delayed') {
    return [
    {
      id: 'push-uber',
      icon: <Clock size={16} />,
      title: 'Flight delayed 45 min',
      body: "Want us to push your Uber pickup so you don't pay wait fees?",
      cta: 'Push pickup',
      to: '/plan/transport',
      tone: 'urgent'
    },
    {
      id: 'transit-faster',
      icon: <Train size={16} />,
      title: 'Blue Line is now faster than rideshare',
      body: 'I-90 traffic peaks during your new arrival window. Transit saves ~12 min.',
      cta: 'Switch to transit',
      to: '/plan/transport'
    },
    {
      id: 'gate-coffee',
      icon: <Coffee size={16} />,
      title: 'You have time for coffee',
      body: "Beecher's near Gate A12 — 4 min walk, ~8 min wait.",
      cta: 'See dining',
      to: '/trip/dining'
    }];

  }
  if (disruption === 'gateChange') {
    return [
    {
      id: 'walk-time',
      icon: <Clock size={16} />,
      title: 'C4 is a 9 min walk from your current gate',
      body: 'Boarding starts at 7:12 AM. You have ~26 minutes — plenty of time.'
    },
    {
      id: 'closer-coffee',
      icon: <Coffee size={16} />,
      title: 'Coffee on the way to C4',
      body: 'Stumptown is right on your path between concourses.',
      cta: 'See dining',
      to: '/trip/dining'
    }];

  }
  if (tripId === 'trip-sea-ord') {
    return [
    {
      id: 'security-3',
      icon: <ShieldCheck size={16} />,
      title: 'Security is lighter at Checkpoint 3',
      body: 'Currently 6 min vs 18 min at Checkpoint 1. Worth the 4-min walk.'
    },
    {
      id: 'time-coffee',
      icon: <Coffee size={16} />,
      title: 'You have time for coffee before boarding',
      body: 'Boarding starts at 7:12 AM. Caffè Ladro is 2 min from your gate.',
      cta: 'See dining',
      to: '/trip/dining'
    }];

  }
  if (tripId === 'trip-ord-jfk') {
    return [
    {
      id: 'redeye-meal',
      icon: <Coffee size={16} />,
      title: 'Eat before boarding',
      body: 'In-flight meal service ends after 8 PM on this route.',
      cta: 'See dining',
      to: '/trip/dining'
    },
    {
      id: 'lirr-tip',
      icon: <Train size={16} />,
      title: 'LIRR is faster than rideshare at this hour',
      body: 'After 9 PM the AirTrain → LIRR combo beats road traffic by ~20 min.'
    }];

  }
  if (tripId === 'trip-jfk-ywg') {
    return [
    {
      id: 'currency',
      icon: <Globe size={16} />,
      title: 'Save ~$8 on currency exchange',
      body: 'Withdraw CAD at the YWG airport ATM (ATB) instead of FX kiosks.'
    },
    {
      id: 'arrivecan',
      icon: <ShieldCheck size={16} />,
      title: 'ArriveCAN ready?',
      body: 'Submit your declaration before landing — saves ~10 min in CBSA.',
      cta: 'Open ArriveCAN',
      tone: 'urgent'
    },
    {
      id: 'offline-maps',
      icon: <WifiOff size={16} />,
      title: 'Download offline maps',
      body: 'US carriers can be spotty crossing the border. Cache Winnipeg now.'
    }];

  }
  return [];
}
export function SmartSuggestions() {
  const { trip } = useTrip();
  const suggestions = getSuggestions(trip.id, trip.disruptionState);
  if (suggestions.length === 0) return null;
  return (
    <div className="bg-surface rounded-xl border border-warm shadow-subtle overflow-hidden">
      <div className="px-5 py-4 border-b border-warm flex items-center gap-2">
        <Lightbulb size={16} className="text-teal" />
        <h4 className="text-sm font-medium text-ink">Smart suggestions</h4>
        <span className="ml-auto text-xs text-muted">{suggestions.length}</span>
      </div>

      <ul className="divide-y divide-warm">
        <AnimatePresence initial={false}>
          {suggestions.map((s, i) =>
          <motion.li
            key={s.id}
            layout
            initial={{
              opacity: 0,
              x: -8
            }}
            animate={{
              opacity: 1,
              x: 0
            }}
            exit={{
              opacity: 0,
              x: 8
            }}
            transition={{
              duration: 0.25,
              delay: i * 0.04
            }}
            className="p-4 hover:bg-cream/30 transition-colors">
            
              <div className="flex items-start gap-3">
                <div
                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${s.tone === 'urgent' ? 'bg-amber-light text-amber' : 'bg-teal-light text-teal'}`}>
                
                  {s.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-ink mb-0.5">
                    {s.title}
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{s.body}</p>
                  {s.cta && (
                s.to ?
                <Link
                  to={s.to}
                  className="mt-2 text-xs font-medium text-teal hover:text-ink transition-colors inline-flex items-center gap-1">
                  
                        {s.cta} <ArrowRight size={12} />
                      </Link> :

                <button className="mt-2 text-xs font-medium text-teal hover:text-ink transition-colors flex items-center gap-1">
                        {s.cta} <ArrowRight size={12} />
                      </button>)
                }
                </div>
              </div>
            </motion.li>
          )}
        </AnimatePresence>
      </ul>
    </div>);

}