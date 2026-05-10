import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { useTrackEvent } from '../analytics/trackEvent';
export function DisruptionBanner() {
  const { trip } = useTrip();
  const track = useTrackEvent();
  if (trip.disruptionState === 'none') return null;
  const isDelay = trip.disruptionState === 'delayed';
  const isGate = trip.disruptionState === 'gateChange';
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          opacity: 0,
          height: 0,
          marginBottom: 0
        }}
        animate={{
          opacity: 1,
          height: 'auto',
          marginBottom: 24
        }}
        exit={{
          opacity: 0,
          height: 0,
          marginBottom: 0
        }}
        className="overflow-hidden">
        
        <div
          className={`rounded-xl p-4 border flex flex-col md:flex-row gap-4 items-start md:items-center justify-between ${isDelay ? 'bg-amber-light/50 border-amber/20' : 'bg-surface border-warm shadow-subtle'}`}>
          
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-full mt-0.5 ${isDelay ? 'bg-amber/10 text-amber' : 'bg-warm text-ink'}`}>
              
              {isDelay ? <Clock size={20} /> : <AlertTriangle size={20} />}
            </div>
            <div>
              <h3 className="font-medium text-ink flex items-center gap-2">
                {isDelay ? 'Flight Delayed' : 'Gate Change'}
                <span className="text-xs px-2 py-0.5 rounded-full bg-ink text-cream font-normal">
                  Active Alert
                </span>
              </h3>
              <p className="text-sm text-muted mt-1">
                {isDelay ?
                'UA 1234 is delayed by 45 minutes. We have updated your timeline below.' :
                'Your departure gate has changed. Please proceed to the new gate.'}
              </p>
            </div>
          </div>

          {isDelay &&
          <a
            href="#itinerary"
            onClick={() => track('cta_clicked', { cta: 'review_adjustments', source: 'disruption_banner', target_path: '#itinerary' })}
            className="whitespace-nowrap text-sm font-medium text-ink bg-surface border border-warm px-4 py-2 rounded-lg hover:bg-warm/50 transition-colors flex items-center gap-2 w-full md:w-auto justify-center">
              Review adjustments <ArrowRight size={16} />
            </a>
          }
        </div>
      </motion.div>
    </AnimatePresence>);

}