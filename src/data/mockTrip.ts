import { Trip, TimelineEvent } from '../types';

const today = new Date();
const baseDate = today.toISOString().split('T')[0];
const datePlus = (days: number) =>
new Date(today.getTime() + days * 24 * 60 * 60 * 1000).
toISOString().
split('T')[0];

// ─────────────────────────────────────────────────
// Trip 1: Seattle → Chicago (the flagship demo)
// Active, fully orchestrated, ready for disruption demos
// ─────────────────────────────────────────────────
const seaToOrdEvents: TimelineEvent[] = [
{
  id: 'sea-1',
  type: 'departure',
  title: 'Leave for SEA Airport',
  subtitle: 'From 1423 NW 56th St',
  scheduledTime: `${baseDate}T05:30:00`,
  status: 'completed',
  details: {
    provider: 'Uber',
    vehicle: 'Black SUV • WX 9281',
    duration: '28 min'
  }
},
{
  id: 'sea-2',
  type: 'arrival',
  title: 'Arrive at SEA',
  subtitle: 'Terminal 1, Door 4',
  scheduledTime: `${baseDate}T05:58:00`,
  status: 'completed'
},
{
  id: 'sea-3',
  type: 'flight',
  title: 'Flight UA 1234 to ORD',
  subtitle: 'United Airlines • Nonstop',
  scheduledTime: `${baseDate}T07:42:00`,
  status: 'active',
  location: 'Gate A12',
  details: {
    flightNumber: 'UA 1234',
    airline: 'United Airlines',
    gate: 'A12',
    terminal: '1',
    seat: '14B',
    bookingRef: 'X7B9Q2',
    duration: '4h 16m'
  }
},
{
  id: 'sea-4',
  type: 'arrival',
  title: 'Arrive at ORD',
  subtitle: 'Welcome to Chicago',
  scheduledTime: `${baseDate}T13:38:00`,
  status: 'upcoming',
  location: 'Terminal 2'
},
{
  id: 'sea-5',
  type: 'baggage',
  title: 'Baggage Claim',
  subtitle: 'Estimated 15 mins after arrival',
  scheduledTime: `${baseDate}T13:55:00`,
  status: 'upcoming',
  location: 'Carousel 4'
},
{
  id: 'sea-6',
  type: 'transport',
  title: 'Rideshare to Hotel',
  subtitle: 'Scheduled pickup',
  scheduledTime: `${baseDate}T14:15:00`,
  status: 'upcoming',
  location: 'Terminal 2, Zone D',
  details: { provider: 'Uber', duration: '45 min', cost: 52 }
},
{
  id: 'sea-7',
  type: 'hotel',
  title: 'Check-in at The Robey',
  subtitle: '2018 W North Ave',
  scheduledTime: `${baseDate}T15:00:00`,
  status: 'upcoming',
  details: { bookingRef: 'ROB-88291', provider: 'The Robey Hotel' }
}];


// ─────────────────────────────────────────────────
// Trip 2: Chicago → New York (upcoming, business)
// Showcases red-eye / business-traveler context
// ─────────────────────────────────────────────────
const ordToJfkEvents: TimelineEvent[] = [
{
  id: 'jfk-1',
  type: 'departure',
  title: 'Leave for ORD',
  subtitle: 'From The Robey Hotel',
  scheduledTime: `${datePlus(7)}T15:30:00`,
  status: 'upcoming',
  details: { provider: 'Uber', duration: '45 min' }
},
{
  id: 'jfk-2',
  type: 'arrival',
  title: 'Arrive at ORD',
  subtitle: 'Terminal 1',
  scheduledTime: `${datePlus(7)}T16:15:00`,
  status: 'upcoming'
},
{
  id: 'jfk-3',
  type: 'flight',
  title: 'Flight AA 312 to JFK',
  subtitle: 'American Airlines • Nonstop',
  scheduledTime: `${datePlus(7)}T18:00:00`,
  status: 'upcoming',
  location: 'Gate K5',
  details: {
    flightNumber: 'AA 312',
    airline: 'American Airlines',
    gate: 'K5',
    terminal: '3',
    seat: '7C',
    bookingRef: 'JK4N91',
    duration: '2h 35m'
  }
},
{
  id: 'jfk-4',
  type: 'arrival',
  title: 'Arrive at JFK',
  subtitle: 'Welcome to New York',
  scheduledTime: `${datePlus(7)}T21:35:00`,
  status: 'upcoming',
  location: 'Terminal 8'
},
{
  id: 'jfk-5',
  type: 'baggage',
  title: 'Baggage Claim',
  subtitle: 'Carry-on only — skip ahead',
  scheduledTime: `${datePlus(7)}T21:40:00`,
  status: 'upcoming'
},
{
  id: 'jfk-6',
  type: 'transport',
  title: 'AirTrain → LIRR to Manhattan',
  subtitle: 'Less stressful at this hour',
  scheduledTime: `${datePlus(7)}T22:00:00`,
  status: 'upcoming',
  location: 'JFK AirTrain',
  details: { provider: 'MTA', duration: '52 min', cost: 11 }
},
{
  id: 'jfk-7',
  type: 'hotel',
  title: 'Check-in at The Standard High Line',
  subtitle: '848 Washington St',
  scheduledTime: `${datePlus(7)}T23:15:00`,
  status: 'upcoming',
  details: { bookingRef: 'STD-44129', provider: 'The Standard' }
}];


// ─────────────────────────────────────────────────
// Trip 3: New York → Winnipeg (upcoming, international)
// Demonstrates customs, currency, immigration steps
// ─────────────────────────────────────────────────
const jfkToYwgEvents: TimelineEvent[] = [
{
  id: 'ywg-1',
  type: 'departure',
  title: 'Leave for JFK',
  subtitle: 'From The Standard High Line',
  scheduledTime: `${datePlus(14)}T07:00:00`,
  status: 'upcoming',
  details: { provider: 'Uber', duration: '52 min' }
},
{
  id: 'ywg-2',
  type: 'arrival',
  title: 'Arrive at JFK',
  subtitle: 'Terminal 7 — international check-in',
  scheduledTime: `${datePlus(14)}T07:55:00`,
  status: 'upcoming'
},
{
  id: 'ywg-3',
  type: 'flight',
  title: 'Flight AC 7142 to YWG',
  subtitle: 'Air Canada • 1 stop in YYZ',
  scheduledTime: `${datePlus(14)}T10:25:00`,
  status: 'upcoming',
  location: 'Gate 4',
  details: {
    flightNumber: 'AC 7142',
    airline: 'Air Canada',
    gate: '4',
    terminal: '7',
    seat: '12A',
    bookingRef: 'AC9P2X',
    duration: '5h 45m'
  }
},
{
  id: 'ywg-4',
  type: 'arrival',
  title: 'Arrive at YWG',
  subtitle: 'Welcome to Winnipeg, Canada',
  scheduledTime: `${datePlus(14)}T17:10:00`,
  status: 'upcoming',
  location: 'Terminal 1'
},
{
  id: 'ywg-5',
  type: 'baggage',
  title: 'Customs & Immigration',
  subtitle: 'Have passport + ArriveCAN ready',
  scheduledTime: `${datePlus(14)}T17:25:00`,
  status: 'upcoming',
  location: 'CBSA Hall',
  details: { duration: '~25 min typical wait' }
},
{
  id: 'ywg-6',
  type: 'baggage',
  title: 'Baggage Claim',
  subtitle: 'After clearing customs',
  scheduledTime: `${datePlus(14)}T17:55:00`,
  status: 'upcoming',
  location: 'Carousel 2'
},
{
  id: 'ywg-7',
  type: 'transport',
  title: 'Taxi to Hotel',
  subtitle: 'Local taxi — Uber limited in YWG',
  scheduledTime: `${datePlus(14)}T18:15:00`,
  status: 'upcoming',
  location: 'Taxi rank, Door 5',
  details: { provider: 'Winnipeg Taxi', duration: '18 min', cost: 28 }
},
{
  id: 'ywg-8',
  type: 'hotel',
  title: 'Check-in at Inn at the Forks',
  subtitle: '75 Forks Market Rd',
  scheduledTime: `${datePlus(14)}T18:45:00`,
  status: 'upcoming',
  details: { bookingRef: 'IAF-77231', provider: 'Inn at the Forks' }
}];


export const trips: Trip[] = [
{
  id: 'trip-sea-ord',
  origin: 'Seattle, WA',
  destination: 'Chicago, IL',
  startDate: baseDate,
  endDate: datePlus(3),
  status: 'active',
  disruptionState: 'none',
  events: seaToOrdEvents
},
{
  id: 'trip-ord-jfk',
  origin: 'Chicago, IL',
  destination: 'New York, NY',
  startDate: datePlus(7),
  endDate: datePlus(10),
  status: 'upcoming',
  disruptionState: 'none',
  events: ordToJfkEvents
},
{
  id: 'trip-jfk-ywg',
  origin: 'New York, NY',
  destination: 'Winnipeg, MB',
  startDate: datePlus(14),
  endDate: datePlus(18),
  status: 'upcoming',
  disruptionState: 'none',
  events: jfkToYwgEvents
}];


export const initialTrip = trips[0];