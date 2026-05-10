import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Plane,
  Car,
  Home,
  Building,
  Utensils,
  BaggageClaim,
  MapPin,
  CheckCircle2,
  AlertCircle,
  ChevronRight } from
'lucide-react';
import { TimelineEvent } from '../types';
import { useTrip } from '../context/TripContext';
const iconMap = {
  departure: Home,
  flight: Plane,
  arrival: MapPin,
  transport: Car,
  hotel: Building,
  dining: Utensils,
  baggage: BaggageClaim
};
export function TripTimeline() {
  const { trip, resolveDisruption } = useTrip();
  const navigate = useNavigate();
  const eventLink = (event: TimelineEvent): string | null => {
    if (event.type === 'flight') return '/trip/flight';
    if (event.type === 'transport') return '/plan/transport';
    if (event.type === 'hotel') return '/plan/hotels/robey';
    return null;
  };
  return (
    <div className="relative ml-2 md:ml-4 mt-4">
      <div className="space-y-5">
        {trip.events.map((event, index) => {
          const Icon = iconMap[event.type];
          const isCompleted = event.status === 'completed';
          const isActive = event.status === 'active';
          const isDelayed = event.status === 'delayed';
          const hasWarning = event.status === 'warning';
          const isLast = index === trip.events.length - 1;
          const timeToDisplay = event.actualTime || event.scheduledTime;
          const formattedTime = new Date(timeToDisplay).toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit'
          });
          return (
            <motion.div
              key={event.id}
              layout
              initial={{
                opacity: 0,
                x: -10
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.3,
                delay: index * 0.05
              }}
              className="relative grid grid-cols-[32px_1fr] gap-4 group">
              
              {/* Timeline Node column — icon vertically centered with card */}
              <div className="relative flex flex-col items-center self-stretch">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors shrink-0 my-auto ${isCompleted ? 'bg-surface border-teal text-teal' : isActive ? 'bg-teal border-teal text-cream shadow-[0_0_0_4px_var(--accent-teal-light)]' : isDelayed || hasWarning ? 'bg-surface border-amber text-amber' : 'bg-surface border-warm text-muted group-hover:border-ink'}`}>
                  
                  {isCompleted ?
                  <CheckCircle2 size={16} /> :

                  <Icon size={16} />
                  }
                </div>
                {!isLast &&
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-warm -z-10">
                </div>
                }
              </div>

              {/* Content Card */}
              <div
                className={`flex-1 ${isActive ? '' : 'opacity-90 hover:opacity-100 transition-opacity'}`}>
                
                <div
                  className={`bg-surface border rounded-xl p-4 transition-shadow ${isActive ? 'border-teal/30 shadow-subtle' : hasWarning ? 'border-amber/30 bg-amber-light/10' : 'border-warm hover:border-ink/20'} ${eventLink(event) ? 'cursor-pointer' : ''}`}
                  onClick={() => {
                    const link = eventLink(event);
                    if (link) navigate(link);
                  }}
                  role={eventLink(event) ? 'button' : undefined}
                  tabIndex={eventLink(event) ? 0 : undefined}
                  onKeyDown={(e) => {
                    const link = eventLink(event);
                    if (link && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      navigate(link);
                    }
                  }}>
                  
                  {/* Time row inside card */}
                  <div className="flex items-baseline gap-2 mb-1.5">
                    <span
                      className={`font-serif text-base ${isDelayed || hasWarning ? 'text-amber' : isActive ? 'text-teal' : 'text-ink'}`}>
                      
                      {formattedTime}
                    </span>
                    {event.actualTime &&
                    <span className="text-xs text-muted line-through">
                        {new Date(event.scheduledTime).toLocaleTimeString([], {
                        hour: 'numeric',
                        minute: '2-digit'
                      })}
                      </span>
                    }
                    {(isDelayed || hasWarning) &&
                    <span className="text-[10px] uppercase tracking-wider font-medium text-amber">
                        {isDelayed ? 'Delayed' : 'Action needed'}
                      </span>
                    }
                  </div>

                  <div className="flex justify-between items-start gap-3">
                    <div className="min-w-0">
                      <h4 className="font-medium text-ink flex items-center gap-1.5">
                        {event.title}
                        {eventLink(event) &&
                        <ChevronRight
                          size={14}
                          className="text-muted shrink-0" />

                        }
                      </h4>
                      <p className="text-sm text-muted mt-0.5">
                        {event.subtitle}
                      </p>
                    </div>
                    {event.location &&
                    <div className="text-xs font-medium bg-cream px-2 py-1 rounded text-ink border border-warm shrink-0">
                        {event.location}
                      </div>
                    }
                  </div>

                  {/* Recommendation / Warning Block */}
                  {event.recommendation &&
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0
                    }}
                    animate={{
                      opacity: 1,
                      height: 'auto'
                    }}
                    className="mt-4 p-3 bg-surface border border-amber/20 rounded-lg">
                    
                      <div className="flex items-start gap-2 mb-3">
                        <AlertCircle size={16} className="text-amber mt-0.5" />
                        <div>
                          <div className="text-sm font-medium text-ink">
                            {event.recommendation.title}
                          </div>
                          <div className="text-xs text-muted mt-0.5">
                            {event.recommendation.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                        onClick={(e) => {
                          e.stopPropagation();
                          resolveDisruption(
                            event.id,
                            event.recommendation!.actionType
                          );
                        }}
                        className="text-xs font-medium bg-ink text-cream px-3 py-1.5 rounded hover:bg-ink/90 transition-colors">
                        
                          {event.recommendation.actionText}
                        </button>
                        <button
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs font-medium text-ink bg-warm/50 px-3 py-1.5 rounded hover:bg-warm transition-colors">
                        
                          Compare options
                        </button>
                      </div>
                    </motion.div>
                  }
                </div>
              </div>
            </motion.div>);

        })}
      </div>
    </div>);

}