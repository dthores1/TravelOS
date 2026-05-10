import React from 'react';
import { Sparkles } from 'lucide-react';
export function ComingSoonPill({ className = '' }: {className?: string;}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-light/40 text-amber text-[10px] font-medium uppercase tracking-wider ${className}`}>
      
      <Sparkles size={11} className="shrink-0" />
      Coming soon
    </span>);

}