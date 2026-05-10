import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Plane,
  Building,
  Car,
  Train,
  Key,
  Users,
  Sparkles,
  Shield,
  Bell,
  Repeat,
  Clock } from
'lucide-react';
import { toast } from 'sonner';
import { useTrip } from '../context/TripContext';
const choiceIcon = {
  rideshare: <Car size={18} />,
  transit: <Train size={18} />,
  rental: <Key size={18} />,
  own: <Users size={18} />
};
export default function ReviewItinerary() {
  const navigate = useNavigate();
  const { selectedTransport, bookTrip } = useTrip();
  const handleConfirm = () => {
    bookTrip('trip-sea-ord');
    toast.success('Trip booked successfully', {
      description: 'Confirmation details are on the next screen.'
    });
    navigate('/plan/confirmation');
  };
  const segments = [
  {
    icon: <Car size={18} />,
    label: 'Home → SEA',
    title: 'Uber pickup',
    time: '5:30 AM',
    sub: 'Auto-scheduled · 2h before flight',
    price: 34,
    adaptive: true
  },
  {
    icon: <Plane size={18} />,
    label: 'Flight',
    title: 'United UA 1234',
    time: '7:42 AM → 1:38 PM',
    sub: 'SEA → ORD · Nonstop · 4h 16m',
    price: 342
  },
  {
    icon: choiceIcon[selectedTransport.choice],
    label: 'ORD → Hotel',
    title: selectedTransport.label,
    time: selectedTransport.time,
    sub: selectedTransport.sub,
    price: selectedTransport.price,
    adaptive: selectedTransport.choice !== 'own'
  },
  {
    icon: <Building size={18} />,
    label: 'Stay',
    title: 'The Robey, Wicker Park',
    time: 'Check-in 3:00 PM',
    sub: '3 nights · Standard King',
    price: 867
  }];

  const total = segments.reduce((s, x) => s + x.price, 94); // + taxes/fees
  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto pt-4">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal-light text-teal mb-5">
          <Sparkles size={26} />
        </div>
        <h1 className="font-serif text-4xl text-ink mb-2">
          Coordinated automatically
        </h1>
        <p className="text-muted max-w-lg mx-auto">
          Every segment is timed against your flight. If anything moves, the
          rest moves with it — automatically.
        </p>
      </div>

      {/* Trip card */}
      <div className="bg-surface rounded-2xl border border-warm shadow-subtle overflow-hidden mb-6">
        <div className="p-6 border-b border-warm bg-cream/30 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-serif text-2xl text-ink">Seattle → Chicago</h3>
            <p className="text-sm text-muted">Nov 18 - 21 · 1 Adult</p>
          </div>
          <div className="flex items-center gap-2 text-xs px-3 py-1.5 bg-teal-light text-teal rounded-full font-medium">
            <Repeat size={12} /> Adaptive itinerary
          </div>
        </div>

        {/* Segments with dependency line */}
        <div className="p-6">
          <div className="space-y-5">
            {segments.map((s, i) => {
              const isLast = i === segments.length - 1;
              return (
                <div
                  key={i}
                  className="grid grid-cols-[32px_1fr] gap-4 items-start">
                  
                  {/* Icon column with connecting line */}
                  <div className="relative flex flex-col items-center self-stretch">
                    <div className="w-8 h-8 rounded-full bg-surface border-2 border-warm flex items-center justify-center text-ink z-10 shrink-0">
                      {s.icon}
                    </div>
                    {!isLast &&
                    <div className="w-px flex-1 bg-warm mt-1"></div>
                    }
                  </div>

                  {/* Content */}
                  <div
                    className={`flex justify-between items-start gap-4 ${isLast ? '' : 'pb-2'}`}>
                    
                    <div className="min-w-0">
                      <div className="text-xs text-muted uppercase tracking-wider mb-1 flex items-center gap-2 flex-wrap">
                        {s.label}
                        {s.adaptive &&
                        <span className="inline-flex items-center gap-1 text-teal normal-case tracking-normal text-[10px] font-medium px-1.5 py-0.5 bg-teal-light rounded">
                            <Repeat size={9} /> auto-adjusts
                          </span>
                        }
                      </div>
                      <div className="font-medium text-ink">{s.title}</div>
                      <div className="text-sm text-muted mt-0.5">{s.sub}</div>
                      <div className="text-xs text-ink/70 mt-1 flex items-center gap-1">
                        <Clock size={11} /> {s.time}
                      </div>
                    </div>
                    <div className="font-medium text-ink shrink-0">
                      {s.price === 0 ? 'Free' : `$${s.price}`}
                    </div>
                  </div>
                </div>);

            })}
          </div>
        </div>

        {/* Total */}
        <div className="p-6 bg-ink text-cream flex justify-between items-center flex-wrap gap-4">
          <div>
            <div className="text-sm text-cream/70 mb-1">
              Total Estimated Cost
            </div>
            <div className="text-3xl font-serif">${total.toLocaleString()}</div>
            <div className="text-xs text-cream/60 mt-1">
              Includes $94 in taxes & fees
            </div>
          </div>
          <button
            onClick={handleConfirm}
            className="bg-teal hover:bg-teal/90 text-cream px-8 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
            
            Confirm & Book <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Orchestration explainers */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <Explainer
          icon={<Repeat size={16} />}
          title="Adaptive transport"
          body="If your flight shifts, your Uber pickup auto-reschedules. No wait fees." />
        
        <Explainer
          icon={<Bell size={16} />}
          title="Live alerts"
          body="Gate changes, baggage carousels, and check-in availability arrive as they happen." />
        
        <Explainer
          icon={<Shield size={16} />}
          title="Plan B ready"
          body="If anything goes wrong, we surface alternatives before you have to ask." />
        
      </div>
    </div>);

}
function Explainer({
  icon,
  title,
  body




}: {icon: React.ReactNode;title: string;body: string;}) {
  return (
    <div className="bg-surface border border-warm rounded-xl p-4">
      <div className="w-8 h-8 rounded-full bg-teal-light text-teal flex items-center justify-center mb-3">
        {icon}
      </div>
      <div className="text-sm font-medium text-ink mb-1">{title}</div>
      <p className="text-xs text-muted leading-relaxed">{body}</p>
    </div>);

}