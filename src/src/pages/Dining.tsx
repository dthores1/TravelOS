import React, { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  Clock,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  X,
  Soup,
  Salad,
  Pizza,
  Filter } from
'lucide-react';
import { motion } from 'framer-motion';
import { diningOptions, DiningOption } from '../data/mockDining';
// Demo travel-day context. In a real app this comes from the trip state.
// For the polished demo, surface a "45 min available before boarding".
const AVAILABLE_MIN = 45;
const CONTEXT_LABEL = 'Before boarding at Gate A12';
type ServiceFilter = 'all' | 'quick' | 'sit-down';
export default function Dining() {
  const [searchParams] = useSearchParams();
  const initialNear = searchParams.get('near') as 'gate' | 'hotel' || 'gate';
  const [near, setNear] = useState<'gate' | 'hotel'>(initialNear);
  const [serviceFilter, setServiceFilter] = useState<ServiceFilter>('all');
  const [openNow, setOpenNow] = useState(true);
  const [activeCuisine, setActiveCuisine] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(3);
  const cuisines = useMemo(() => {
    const set = new Set<string>();
    diningOptions.
    filter((d) => d.near === near).
    forEach((d) => set.add(d.cuisine.split(' · ')[0]));
    return Array.from(set);
  }, [near]);
  const filtered = useMemo(() => {
    return diningOptions.filter((d) => {
      if (d.near !== near) return false;
      if (serviceFilter !== 'all' && d.serviceType !== serviceFilter)
      return false;
      if (openNow && !d.open) return false;
      if (activeCuisine && !d.cuisine.startsWith(activeCuisine)) return false;
      if (d.priceLevel > maxPrice) return false;
      return true;
    });
  }, [near, serviceFilter, openNow, activeCuisine, maxPrice]);
  const clearFilters = () => {
    setServiceFilter('all');
    setOpenNow(true);
    setActiveCuisine(null);
    setMaxPrice(3);
  };
  const hasActiveFilters =
  serviceFilter !== 'all' ||
  !openNow ||
  activeCuisine !== null ||
  maxPrice < 3;
  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      <Link
        to="/trip/active"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-6">
        
        <ArrowLeft size={16} /> Back to trip
      </Link>

      {/* Context header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-full bg-teal-light text-teal text-xs font-medium tracking-wide uppercase">
            Dining
          </span>
          <span className="text-sm text-muted">{CONTEXT_LABEL}</span>
        </div>
        <h1 className="font-serif text-4xl md:text-5xl text-ink mb-3">
          You have <span className="text-teal">{AVAILABLE_MIN} minutes</span>.
        </h1>
        <p className="text-muted max-w-2xl">
          We'll only show places where you can comfortably eat and be back at
          the gate in time.
        </p>
      </div>

      {/* Near toggle */}
      <div className="inline-flex p-1 bg-surface border border-warm rounded-full mb-6">
        <button
          onClick={() => setNear('gate')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${near === 'gate' ? 'bg-ink text-cream' : 'text-muted hover:text-ink'}`}>
          
          Near gate
        </button>
        <button
          onClick={() => setNear('hotel')}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${near === 'hotel' ? 'bg-ink text-cream' : 'text-muted hover:text-ink'}`}>
          
          Near hotel
        </button>
      </div>

      {/* Filters bar */}
      <div className="bg-surface border border-warm rounded-2xl p-4 mb-6 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-muted">
          <Filter size={14} /> Filter
        </div>

        {/* Service type */}
        <div className="inline-flex p-0.5 bg-cream/60 border border-warm rounded-full">
          {(['all', 'quick', 'sit-down'] as ServiceFilter[]).map((s) =>
          <button
            key={s}
            onClick={() => setServiceFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all capitalize ${serviceFilter === s ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'}`}>
            
              {s === 'all' ? 'All' : s === 'quick' ? 'Quick' : 'Sit-down'}
            </button>
          )}
        </div>

        {/* Open now */}
        <label className="flex items-center gap-1.5 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={openNow}
            onChange={(e) => setOpenNow(e.target.checked)}
            className="accent-teal w-4 h-4" />
          
          <span className="text-ink">Open now</span>
        </label>

        {/* Cuisine */}
        <div className="flex items-center gap-1 flex-wrap">
          {cuisines.map((c) =>
          <button
            key={c}
            onClick={() => setActiveCuisine(activeCuisine === c ? null : c)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${activeCuisine === c ? 'border-teal bg-teal-light/20 text-teal' : 'border-warm text-muted hover:border-ink/20'}`}>
            
              {c}
            </button>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-1.5 text-sm">
          <span className="text-muted">Max</span>
          <div className="inline-flex">
            {[1, 2, 3].map((p) =>
            <button
              key={p}
              onClick={() => setMaxPrice(p)}
              className={`px-2 py-0.5 text-xs font-medium transition-all ${maxPrice >= p ? 'text-ink' : 'text-warm'}`}
              aria-label={`Max price level ${p}`}>
              
                {'$'.repeat(p)}
              </button>
            )}
          </div>
        </div>

        {hasActiveFilters &&
        <button
          onClick={clearFilters}
          className="ml-auto text-xs text-muted hover:text-ink flex items-center gap-1">
          
            <X size={12} /> Clear
          </button>
        }
      </div>

      {/* Results */}
      {filtered.length === 0 ?
      <div className="bg-surface border border-warm rounded-2xl p-12 text-center">
          <p className="text-muted mb-4">
            No dining options match your filters.
          </p>
          <button
          onClick={clearFilters}
          className="text-teal font-medium hover:underline">
          
            Clear filters
          </button>
        </div> :

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((option, i) =>
        <DiningCard
          key={option.id}
          option={option}
          available={AVAILABLE_MIN}
          index={i} />

        )}
        </div>
      }
    </div>);

}
function DiningCard({
  option,
  available,
  index




}: {option: DiningOption;available: number;index: number;}) {
  // Total time = walk to + prep + eat (~15) + walk back
  const totalNeeded = option.walkMin * 2 + option.prepMin + 15;
  const buffer = available - totalNeeded;
  let timing: {
    label: string;
    tone: 'good' | 'warning' | 'risky';
    icon: React.ReactNode;
  };
  if (buffer >= 10) {
    timing = {
      label: `Comfortable — ${buffer} min buffer`,
      tone: 'good',
      icon: <CheckCircle2 size={14} />
    };
  } else if (buffer >= 0) {
    timing = {
      label: `Tight — only ${buffer} min buffer`,
      tone: 'warning',
      icon: <Clock size={14} />
    };
  } else {
    timing = {
      label: `Risky — runs ${Math.abs(buffer)} min over`,
      tone: 'risky',
      icon: <AlertTriangle size={14} />
    };
  }
  const toneStyles = {
    good: 'text-green bg-green/10 border-green/20',
    warning: 'text-amber bg-amber-light border-amber/20',
    risky: 'text-red bg-red/5 border-red/20'
  };
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
      transition={{
        duration: 0.3,
        delay: index * 0.04
      }}
      className="bg-surface border border-warm rounded-2xl overflow-hidden flex flex-col hover:shadow-subtle transition-shadow">
      
      <div className="relative h-40 overflow-hidden bg-warm">
        <img
          src={option.image}
          alt={option.name}
          className="w-full h-full object-cover" />
        
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface/95 backdrop-blur text-xs font-medium text-ink capitalize">
          {option.serviceType === 'quick' ? 'Quick service' : 'Sit-down'}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-serif text-xl text-ink">{option.name}</h3>
          <div className="flex items-center gap-1 text-sm font-medium text-ink shrink-0">
            <Star size={13} className="fill-amber text-amber" />
            {option.rating}
          </div>
        </div>
        <div className="text-sm text-muted mb-3">
          {option.cuisine} • {'$'.repeat(option.priceLevel)}
        </div>

        <p className="text-sm text-ink/80 mb-4">{option.description}</p>

        <div className="flex items-center gap-3 text-xs text-muted mb-4">
          <span className="flex items-center gap-1">
            <MapPin size={12} /> {option.walkMin} min walk
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> ~{option.prepMin} min prep
          </span>
          <span>Closes {option.closesAt}</span>
        </div>

        {/* Timing risk pill */}
        <div
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium mb-4 ${toneStyles[timing.tone]}`}>
          
          {timing.icon}
          {timing.label}
        </div>

        <div className="mt-auto pt-3 border-t border-warm flex items-center justify-between">
          <span className="text-xs text-muted">
            {option.reviewCount.toLocaleString()} reviews
          </span>
          <button
            disabled={timing.tone === 'risky'}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${timing.tone === 'risky' ? 'bg-warm text-muted cursor-not-allowed' : 'bg-ink text-cream hover:bg-ink/90'}`}>
            
            {option.serviceType === 'quick' ? 'Order ahead' : 'Reserve'}
          </button>
        </div>
      </div>
    </motion.div>);

}