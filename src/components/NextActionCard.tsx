import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Clock,
  MapPin,
  PlaneTakeoff,
  Car,
  Building,
  Utensils } from
'lucide-react';
import { Link } from 'react-router-dom';
import { TimelineEvent } from '../types';
import { useTrackEvent } from '../analytics/trackEvent';
interface NextActionCardProps {
  event: TimelineEvent | null;
}
interface CTAConfig {
  label: string;
  icon: React.ReactNode;
  to: string;
}
function getCTA(event: TimelineEvent): CTAConfig {
  switch (event.type) {
    case 'flight':
      return {
        label: 'View Boarding Pass',
        icon: <PlaneTakeoff size={18} />,
        to: '/trip/flight'
      };
    case 'transport':
      return {
        label: 'View Pickup Details',
        icon: <Car size={18} />,
        to: '/plan/transport'
      };
    case 'hotel':
      return {
        label: 'View Hotel',
        icon: <Building size={18} />,
        to: '/plan/hotels/robey'
      };
    case 'dining':
      return {
        label: 'View Dining',
        icon: <Utensils size={18} />,
        to: '/trip/dining'
      };
    default:
      return {
        label: 'View Itinerary',
        icon: <ArrowRight size={18} />,
        to: '#itinerary'
      };
  }
}
export function NextActionCard({ event }: NextActionCardProps) {
  const track = useTrackEvent();
  if (!event) return null;
  const isFlight = event.type === 'flight';
  const isTransport = event.type === 'transport';
  const timeString = new Date(
    event.actualTime || event.scheduledTime
  ).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit'
  });
  const cta = getCTA(event);
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 10
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      className="bg-surface border border-warm rounded-2xl p-6 shadow-subtle relative overflow-hidden">
      
      {/* Decorative accent bar */}
      <div className="absolute top-0 left-0 w-1 h-full bg-teal"></div>

      <div className="flex items-center gap-2 text-teal font-medium text-sm mb-4">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal"></span>
        </span>
        UP NEXT
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-ink mb-2">
            {event.title}
          </h2>
          <div className="flex items-center gap-4 text-muted">
            <div className="flex items-center gap-1.5">
              <Clock size={16} />
              <span className="font-medium text-ink">{timeString}</span>
            </div>
            {event.location &&
            <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>{event.location}</span>
              </div>
            }
          </div>
        </div>

        {cta.to.startsWith('#') ? (
          <a
            href={cta.to}
            onClick={() => track('next_action_clicked', { event_type: event.type, label: cta.label, target: cta.to })}
            className="flex items-center justify-center gap-2 bg-ink text-cream px-6 py-3 rounded-lg font-medium hover:bg-ink/90 transition-colors w-full md:w-auto whitespace-nowrap">
            {cta.label} {cta.icon}
          </a>
        ) : (
          <Link
            to={cta.to}
            onClick={() => track('next_action_clicked', { event_type: event.type, label: cta.label, target: cta.to })}
            className="flex items-center justify-center gap-2 bg-ink text-cream px-6 py-3 rounded-lg font-medium hover:bg-ink/90 transition-colors w-full md:w-auto whitespace-nowrap">
            {cta.label} {cta.icon}
          </Link>
        )}
      </div>

      {event.details &&
      <div className="mt-6 pt-6 border-t border-warm grid grid-cols-2 md:grid-cols-4 gap-4">
          {event.details.flightNumber &&
        <div>
              <div className="text-xs text-muted mb-1 uppercase tracking-wider">
                Flight
              </div>
              <div className="font-medium">{event.details.flightNumber}</div>
            </div>
        }
          {event.details.gate &&
        <div>
              <div className="text-xs text-muted mb-1 uppercase tracking-wider">
                Gate
              </div>
              <div className="font-medium">{event.details.gate}</div>
            </div>
        }
          {event.details.seat &&
        <div>
              <div className="text-xs text-muted mb-1 uppercase tracking-wider">
                Seat
              </div>
              <div className="font-medium">{event.details.seat}</div>
            </div>
        }
          {event.details.provider &&
        <div>
              <div className="text-xs text-muted mb-1 uppercase tracking-wider">
                Provider
              </div>
              <div className="font-medium">{event.details.provider}</div>
            </div>
        }
        </div>
      }
    </motion.div>);

}