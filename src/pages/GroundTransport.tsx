import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Car,
  Train,
  Key,
  Users,
  Clock,
  MapPin,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Plane,
  Shield,
  Minus,
  Plus } from
'lucide-react';
import { useTrip, TransportChoice } from '../context/TripContext';
// Demo trip context: UA 1234 lands at ORD 1:38 PM
// Add 20 min buffer for deplaning + baggage = pickup ~2:00 PM
const FLIGHT_ARRIVAL = '1:38 PM';
const RIDESHARE_PICKUP = '1:58 PM';
const RIDESHARE_DROPOFF = '2:43 PM';
const TRANSIT_BOARD = '2:05 PM';
const TRANSIT_ARRIVE = '2:57 PM';
type RideshareTier = 'standard' | 'premium';
type RentalClass = 'economy' | 'midsize' | 'suv';
const rentalClasses: {
  id: RentalClass;
  label: string;
  perDay: number;
  sub: string;
}[] = [
{
  id: 'economy',
  label: 'Economy',
  perDay: 38,
  sub: 'Toyota Corolla or similar'
},
{
  id: 'midsize',
  label: 'Mid-size SUV',
  perDay: 64,
  sub: 'Toyota RAV4 or similar'
},
{
  id: 'suv',
  label: 'Full-size SUV',
  perDay: 92,
  sub: 'Chevy Tahoe or similar'
}];

export default function GroundTransport() {
  const navigate = useNavigate();
  const { setSelectedTransport } = useTrip();
  const [selected, setSelected] = useState<TransportChoice>('rideshare');
  const [rideshareTier, setRideshareTier] = useState<RideshareTier>('standard');
  const [rentalDays, setRentalDays] = useState(3);
  const [rentalClass, setRentalClass] = useState<RentalClass>('midsize');
  const ridesharePrice = rideshareTier === 'standard' ? 52 : 84;
  const rentalPerDay = rentalClasses.find((c) => c.id === rentalClass)!.perDay;
  const rentalTotal = rentalPerDay * rentalDays;
  const handleContinue = () => {
    if (selected === 'rideshare') {
      setSelectedTransport({
        choice: 'rideshare',
        label: rideshareTier === 'standard' ? 'Uber (UberX)' : 'Uber Black',
        price: ridesharePrice,
        sub: 'Auto-timed to baggage claim',
        time: RIDESHARE_PICKUP
      });
    } else if (selected === 'transit') {
      setSelectedTransport({
        choice: 'transit',
        label: 'CTA Blue Line + walk',
        price: 5,
        sub: 'Boards 27 min after landing',
        time: TRANSIT_BOARD
      });
    } else if (selected === 'rental') {
      const cls = rentalClasses.find((c) => c.id === rentalClass)!;
      setSelectedTransport({
        choice: 'rental',
        label: `${cls.label} rental car`,
        price: rentalTotal,
        sub: `${rentalDays} days · ${cls.sub}`,
        time: 'Pickup at ORD on arrival'
      });
    } else if (selected === 'own') {
      setSelectedTransport({
        choice: 'own',
        label: 'Personal pickup',
        price: 0,
        sub: 'Friend or family meeting you at ORD',
        time: 'Coordinate at arrival'
      });
    }
    navigate('/plan/review');
  };
  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="mb-8">
        <div className="text-sm text-muted mb-2">Step 4 of 5</div>
        <h1 className="font-serif text-4xl text-ink mb-2">Airport to Hotel</h1>
        <p className="text-muted">
          Compare ground transportation from ORD to The Robey.
        </p>
      </div>

      {/* Flight context strip */}
      <div className="mb-6 bg-surface border border-warm rounded-xl p-4 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-cream border border-warm flex items-center justify-center">
            <Plane size={16} className="text-ink" />
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wider">
              Your flight lands
            </div>
            <div className="text-sm font-medium text-ink">
              UA 1234 at {FLIGHT_ARRIVAL} (ORD)
            </div>
          </div>
        </div>
        <div className="hidden md:block h-8 w-px bg-warm"></div>
        <div className="flex items-start gap-2 text-sm text-muted flex-1 min-w-[240px]">
          <Shield size={16} className="text-teal shrink-0 mt-0.5" />
          <span>
            <span className="font-medium text-ink">Reserve now —</span> we'll
            time everything to your flight. Pickups auto-adjust if you're
            delayed, so you won't pay wait fees.
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {/* Rideshare Option */}
        <button
          onClick={() => setSelected('rideshare')}
          className={`text-left relative p-6 rounded-2xl border-2 transition-all ${selected === 'rideshare' ? 'border-teal bg-teal-light/10 shadow-subtle' : 'border-warm bg-surface hover:border-ink/20'}`}>
          
          {selected === 'rideshare' &&
          <div className="absolute top-4 right-4 text-teal">
              <CheckCircle2 size={24} />
            </div>
          }
          <div className="w-12 h-12 rounded-full bg-ink text-cream flex items-center justify-center mb-6">
            <Car size={24} />
          </div>
          <h3 className="font-serif text-2xl text-ink mb-2">Rideshare</h3>
          <div className="flex items-center gap-4 text-sm text-muted mb-5">
            <div className="flex items-center gap-1">
              <Clock size={16} /> ~45 min
            </div>
            <div>From $52</div>
          </div>

          <div className="bg-cream/60 border border-warm rounded-xl p-3 mb-5">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <div className="text-xs text-muted uppercase tracking-wider mb-1">
                  Pickup
                </div>
                <div className="font-serif text-lg text-ink">
                  {RIDESHARE_PICKUP}
                </div>
                <div className="text-xs text-muted">ORD Terminal 2</div>
              </div>
              <div className="px-2 text-muted">
                <ArrowRight size={14} />
              </div>
              <div className="text-center flex-1">
                <div className="text-xs text-muted uppercase tracking-wider mb-1">
                  At hotel
                </div>
                <div className="font-serif text-lg text-ink">
                  {RIDESHARE_DROPOFF}
                </div>
                <div className="text-xs text-muted">The Robey</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelected('rideshare');
                setRideshareTier('standard');
              }}
              className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${rideshareTier === 'standard' && selected === 'rideshare' ? 'border-ink bg-surface' : 'border-warm bg-surface hover:border-ink/30'}`}>
              
              <div>
                <div className="font-medium text-ink">Standard (UberX)</div>
                <div className="text-xs text-muted">Up to 4 passengers</div>
              </div>
              <div className="font-medium">$52</div>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setSelected('rideshare');
                setRideshareTier('premium');
              }}
              className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${rideshareTier === 'premium' && selected === 'rideshare' ? 'border-ink bg-surface' : 'border-transparent hover:border-warm'}`}>
              
              <div>
                <div className="font-medium text-ink">Premium (Black)</div>
                <div className="text-xs text-muted">Luxury vehicle</div>
              </div>
              <div className="font-medium">$84</div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-warm flex items-start gap-2 text-sm text-muted">
            <AlertCircle size={16} className="text-amber shrink-0 mt-0.5" />
            <p>
              I-90 is{' '}
              <span className="font-medium text-ink">
                typically heavy at 2 PM weekdays
              </span>
              . Estimate includes a 15 min buffer.
            </p>
          </div>
        </button>

        {/* Transit Option */}
        <button
          onClick={() => setSelected('transit')}
          className={`text-left relative p-6 rounded-2xl border-2 transition-all ${selected === 'transit' ? 'border-teal bg-teal-light/10 shadow-subtle' : 'border-warm bg-surface hover:border-ink/20'}`}>
          
          {selected === 'transit' &&
          <div className="absolute top-4 right-4 text-teal">
              <CheckCircle2 size={24} />
            </div>
          }
          <div className="w-12 h-12 rounded-full bg-teal text-cream flex items-center justify-center mb-6">
            <Train size={24} />
          </div>
          <h3 className="font-serif text-2xl text-ink mb-2">Public Transit</h3>
          <div className="flex items-center gap-4 text-sm text-muted mb-5">
            <div className="flex items-center gap-1">
              <Clock size={16} /> ~52 min
            </div>
            <div>$5.00</div>
          </div>

          <div className="bg-cream/60 border border-warm rounded-xl p-3 mb-5">
            <div className="flex items-center justify-between">
              <div className="text-center flex-1">
                <div className="text-xs text-muted uppercase tracking-wider mb-1">
                  Board
                </div>
                <div className="font-serif text-lg text-ink">
                  {TRANSIT_BOARD}
                </div>
                <div className="text-xs text-muted">Blue Line</div>
              </div>
              <div className="px-2 text-muted">
                <ArrowRight size={14} />
              </div>
              <div className="text-center flex-1">
                <div className="text-xs text-muted uppercase tracking-wider mb-1">
                  At hotel
                </div>
                <div className="font-serif text-lg text-ink">
                  {TRANSIT_ARRIVE}
                </div>
                <div className="text-xs text-muted">via 8 min walk</div>
              </div>
            </div>
          </div>

          <div className="relative pl-6 space-y-5 before:absolute before:inset-y-2 before:left-[11px] before:w-0.5 before:bg-warm">
            <div className="relative">
              <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-surface border-2 border-ink"></div>
              <div className="font-medium text-ink text-sm">
                ORD Airport Station
              </div>
              <div className="text-xs text-muted mt-1 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded font-medium">
                  Blue Line
                </span>
                Towards Forest Park
              </div>
            </div>
            <div className="relative">
              <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-surface border-2 border-ink"></div>
              <div className="font-medium text-ink text-sm">Damen Station</div>
              <div className="text-xs text-muted mt-1">14 stops • 42 min</div>
            </div>
            <div className="relative">
              <div className="absolute -left-[18px] top-1 w-3 h-3 rounded-full bg-ink"></div>
              <div className="font-medium text-ink text-sm">
                The Robey Hotel
              </div>
              <div className="text-xs text-muted mt-1 flex items-center gap-1">
                <MapPin size={12} /> 8 min walk
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-warm flex items-start gap-2 text-sm text-muted">
            <Users size={16} className="text-green shrink-0 mt-0.5" />
            <p>
              Blue Line is{' '}
              <span className="font-medium text-ink">
                usually half empty at 2 PM weekdays
              </span>
              . Easy with luggage.
            </p>
          </div>
        </button>

        {/* Rental Car Option */}
        <button
          onClick={() => setSelected('rental')}
          className={`text-left relative p-6 rounded-2xl border-2 transition-all ${selected === 'rental' ? 'border-teal bg-teal-light/10 shadow-subtle' : 'border-warm bg-surface hover:border-ink/20'}`}>
          
          {selected === 'rental' &&
          <div className="absolute top-4 right-4 text-teal">
              <CheckCircle2 size={24} />
            </div>
          }
          <div className="w-12 h-12 rounded-full bg-amber text-cream flex items-center justify-center mb-6">
            <Key size={24} />
          </div>
          <h3 className="font-serif text-2xl text-ink mb-2">Rental Car</h3>
          <div className="flex items-center gap-4 text-sm text-muted mb-5">
            <div className="flex items-center gap-1">
              <Clock size={16} /> Flexible
            </div>
            <div>From $38/day</div>
          </div>

          {/* Days stepper */}
          <div className="bg-cream/60 border border-warm rounded-xl p-3 mb-4 flex items-center justify-between">
            <div>
              <div className="text-xs text-muted uppercase tracking-wider mb-0.5">
                Rental days
              </div>
              <div className="text-sm text-ink">{rentalDays} days</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected('rental');
                  setRentalDays(Math.max(1, rentalDays - 1));
                }}
                className="w-8 h-8 rounded-full border border-warm bg-surface hover:border-ink/40 flex items-center justify-center text-ink"
                aria-label="Fewer days">
                
                <Minus size={14} />
              </button>
              <span className="w-6 text-center font-medium text-ink">
                {rentalDays}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected('rental');
                  setRentalDays(Math.min(14, rentalDays + 1));
                }}
                className="w-8 h-8 rounded-full border border-warm bg-surface hover:border-ink/40 flex items-center justify-center text-ink"
                aria-label="More days">
                
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Vehicle classes */}
          <div className="space-y-2">
            {rentalClasses.map((cls) =>
            <div
              key={cls.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelected('rental');
                setRentalClass(cls.id);
              }}
              className={`flex items-center justify-between p-3 rounded-lg border transition-colors cursor-pointer ${rentalClass === cls.id && selected === 'rental' ? 'border-ink bg-surface' : 'border-transparent hover:border-warm'}`}>
              
                <div>
                  <div className="font-medium text-ink">{cls.label}</div>
                  <div className="text-xs text-muted">{cls.sub}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium">${cls.perDay}</div>
                  <div className="text-xs text-muted">/day</div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-5 pt-4 border-t border-warm flex items-start justify-between gap-3 text-sm">
            <span className="text-muted">
              Total · {rentalDays} days,{' '}
              {rentalClasses.find((c) => c.id === rentalClass)!.label}
            </span>
            <span className="font-medium text-ink">${rentalTotal}</span>
          </div>
        </button>

        {/* Own Transportation Option */}
        <button
          onClick={() => setSelected('own')}
          className={`text-left relative p-6 rounded-2xl border-2 transition-all ${selected === 'own' ? 'border-teal bg-teal-light/10 shadow-subtle' : 'border-warm bg-surface hover:border-ink/20'}`}>
          
          {selected === 'own' &&
          <div className="absolute top-4 right-4 text-teal">
              <CheckCircle2 size={24} />
            </div>
          }
          <div className="w-12 h-12 rounded-full bg-ink/80 text-cream flex items-center justify-center mb-6">
            <Users size={24} />
          </div>
          <h3 className="font-serif text-2xl text-ink mb-2">
            I have my own ride
          </h3>
          <div className="flex items-center gap-4 text-sm text-muted mb-5">
            <div className="flex items-center gap-1">
              <Clock size={16} /> Coordinate yourself
            </div>
            <div>Free</div>
          </div>

          <p className="text-sm text-ink/80 leading-relaxed mb-5">
            Friend or family meeting you at ORD? Skip booking transport — we'll
            still send them your live arrival time so they can time the pickup.
          </p>

          <div className="bg-cream/60 border border-warm rounded-xl p-4 space-y-3">
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="text-teal shrink-0 mt-0.5" />
              <span className="text-ink/80">
                Share live flight status with your driver
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="text-teal shrink-0 mt-0.5" />
              <span className="text-ink/80">
                Auto-notify if your flight is delayed
              </span>
            </div>
            <div className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="text-teal shrink-0 mt-0.5" />
              <span className="text-ink/80">
                Suggested ORD pickup zone for arrivals
              </span>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-warm flex items-start gap-2 text-sm text-muted">
            <Shield size={16} className="text-teal shrink-0 mt-0.5" />
            <p>
              We'll still{' '}
              <span className="font-medium text-ink">orchestrate around</span>{' '}
              your arrival — no upcharge.
            </p>
          </div>
        </button>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-warm">
        <Link
          to="/plan/hotels"
          className="text-ink font-medium hover:text-teal transition-colors">
          
          Back
        </Link>
        <button
          onClick={handleContinue}
          className="bg-ink text-cream px-8 py-3 rounded-xl font-medium hover:bg-ink/90 transition-colors flex items-center gap-2">
          
          Reserve & Continue <ArrowRight size={18} />
        </button>
      </div>
    </div>);

}