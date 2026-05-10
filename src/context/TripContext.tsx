import React, { useState, createContext, useContext } from 'react';
import { Trip } from '../types';
import { trips as initialTrips } from '../data/mockTrip';
import { toast } from 'sonner';
export type TransportChoice = 'rideshare' | 'transit' | 'rental' | 'own';
export interface TransportSelection {
  choice: TransportChoice;
  label: string;
  price: number;
  sub: string;
  time: string;
}
const defaultTransport: TransportSelection = {
  choice: 'rideshare',
  label: 'Uber pickup',
  price: 52,
  sub: 'Auto-timed to baggage claim',
  time: '2:15 PM'
};
interface TripContextType {
  trip: Trip;
  trips: Trip[];
  activeTripId: string;
  bookedTripIds: string[];
  selectedTransport: TransportSelection;
  setSelectedTransport: (s: TransportSelection) => void;
  bookTrip: (id: string) => void;
  setActiveTripId: (id: string) => void;
  simulateDelay: () => void;
  simulateGateChange: () => void;
  resolveDisruption: (eventId: string, action: string) => void;
  resetTrip: () => void;
}
const TripContext = createContext<TripContextType | undefined>(undefined);
export function TripProvider({ children }: {children: ReactNode;}) {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  // SEA→ORD is the "plannable" trip — not yet booked. ORD→JFK and JFK→YWG are pre-booked.
  const [bookedTripIds, setBookedTripIds] = useState<string[]>([
  'trip-ord-jfk',
  'trip-jfk-ywg']
  );
  // Default active trip is the first booked one so My Trips' Active tab matches.
  const [activeTripId, setActiveTripIdState] = useState<string>('trip-ord-jfk');
  const [selectedTransport, setSelectedTransport] =
  useState<TransportSelection>(defaultTransport);
  const trip = trips.find((t) => t.id === activeTripId) || trips[0];
  const setActiveTripId = (id: string) => {
    setActiveTripIdState(id);
    const next = trips.find((t) => t.id === id);
    if (next) {
      toast.message(`Switched to ${next.origin} → ${next.destination}`);
    }
  };
  const bookTrip = (id: string) => {
    setBookedTripIds((prev) => prev.includes(id) ? prev : [...prev, id]);
    // Silently make the booked trip the active one so it appears on the Active dashboard.
    setActiveTripIdState(id);
  };
  const updateActiveTrip = (updater: (t: Trip) => Trip) => {
    setTrips((prev) =>
    prev.map((t) => t.id === activeTripId ? updater(t) : t)
    );
  };
  const simulateDelay = () => {
    updateActiveTrip((prev) => {
      const newEvents = prev.events.map((event) => {
        if (event.type === 'flight') {
          const actual = new Date(event.scheduledTime);
          actual.setMinutes(actual.getMinutes() + 45);
          return {
            ...event,
            status: 'delayed' as const,
            actualTime: actual.toISOString(),
            subtitle: `Delayed 45m • ${event.details?.airline || 'Airline'}`
          };
        }
        if (
        event.type === 'arrival' && (
        event.title.includes('ORD') ||
        event.title.includes('JFK') ||
        event.title.includes('YWG')))
        {
          const actual = new Date(event.scheduledTime);
          actual.setMinutes(actual.getMinutes() + 45);
          return {
            ...event,
            actualTime: actual.toISOString(),
            status: 'delayed' as const
          };
        }
        if (event.type === 'baggage') {
          const actual = new Date(event.scheduledTime);
          actual.setMinutes(actual.getMinutes() + 45);
          return {
            ...event,
            actualTime: actual.toISOString(),
            status: 'delayed' as const
          };
        }
        if (event.type === 'transport') {
          return {
            ...event,
            status: 'warning' as const,
            recommendation: {
              title: 'Rideshare timing mismatch',
              description:
              'Your flight is delayed. Reschedule your pickup to avoid wait fees — or switch to transit (now faster).',
              actionText: 'Update pickup time',
              actionType: 'reschedule' as const
            }
          };
        }
        return event;
      });
      toast.error(
        `Flight ${prev.events.find((e) => e.type === 'flight')?.details?.flightNumber || ''} is delayed by 45 minutes.`,
        {
          description: 'We are updating your downstream itinerary.'
        }
      );
      return {
        ...prev,
        disruptionState: 'delayed' as const,
        events: newEvents
      };
    });
  };
  const simulateGateChange = () => {
    updateActiveTrip((prev) => {
      const newEvents = prev.events.map((event) => {
        if (event.type === 'flight') {
          return {
            ...event,
            location: 'Gate C4 (Changed)',
            status: 'warning' as const
          };
        }
        return event;
      });
      toast.warning('Gate changed to C4', {
        description: 'Your departure gate has been updated.'
      });
      return {
        ...prev,
        disruptionState: 'gateChange' as const,
        events: newEvents
      };
    });
  };
  const resolveDisruption = (eventId: string, action: string) => {
    updateActiveTrip((prev) => {
      const newEvents = prev.events.map((event) => {
        if (event.id === eventId) {
          if (action === 'reschedule' && event.type === 'transport') {
            const newTime = new Date(event.scheduledTime);
            newTime.setMinutes(newTime.getMinutes() + 45);
            return {
              ...event,
              status: 'upcoming' as const,
              scheduledTime: newTime.toISOString(),
              actualTime: undefined,
              recommendation: undefined,
              subtitle: 'Rescheduled pickup'
            };
          }
        }
        return event;
      });
      toast.success('Itinerary updated', {
        description: 'Your rideshare has been successfully rescheduled.'
      });
      const hasWarnings = newEvents.some((e) => e.status === 'warning');
      return {
        ...prev,
        disruptionState: hasWarnings ? prev.disruptionState : 'none',
        events: newEvents
      };
    });
  };
  const resetTrip = () => {
    setTrips(initialTrips);
    toast.success('Trip reset to initial state');
  };
  return (
    <TripContext.Provider
      value={{
        trip,
        trips,
        activeTripId,
        bookedTripIds,
        selectedTransport,
        setSelectedTransport,
        bookTrip,
        setActiveTripId,
        simulateDelay,
        simulateGateChange,
        resolveDisruption,
        resetTrip
      }}>
      
      {children}
    </TripContext.Provider>);

}
export function useTrip() {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error('useTrip must be used within a TripProvider');
  }
  return context;
}