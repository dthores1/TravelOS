export type DisruptionType = 'none' | 'delayed' | 'gateChange' | 'trafficDelay';

export type EventStatus =
'completed' |
'active' |
'upcoming' |
'delayed' |
'warning';

export type TransportMethod = 'rideshare' | 'transit' | 'flight' | 'walking';

export interface TimelineEvent {
  id: string;
  type:
  'departure' |
  'flight' |
  'arrival' |
  'transport' |
  'hotel' |
  'dining' |
  'baggage';
  title: string;
  subtitle: string;
  scheduledTime: string; // ISO string or formatted time for demo
  actualTime?: string; // If delayed/changed
  status: EventStatus;
  location?: string;
  details?: {
    flightNumber?: string;
    airline?: string;
    gate?: string;
    terminal?: string;
    seat?: string;
    bookingRef?: string;
    provider?: string;
    vehicle?: string;
    cost?: number;
    duration?: string;
    distance?: string;
  };
  recommendation?: {
    title: string;
    description: string;
    actionText: string;
    actionType: 'reschedule' | 'switch_transit' | 'book_dining';
  };
}

export interface Trip {
  id: string;
  origin: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  disruptionState: DisruptionType;
  events: TimelineEvent[];
}