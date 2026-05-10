import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Briefcase,
  Luggage,
  Minus,
  Plus,
  Check,
  Info } from
'lucide-react';
type BagChoice = 'carryon' | 'checked' | null;
const CHECKED_BAG_PRICE = 35;
export default function BaggageSelection() {
  const [choice, setChoice] = useState<BagChoice>(null);
  const [checkedCount, setCheckedCount] = useState(1);
  const total = choice === 'checked' ? CHECKED_BAG_PRICE * checkedCount : 0;
  return (
    <div className="animate-in fade-in duration-500 max-w-2xl mx-auto pt-4">
      <div className="mb-8">
        <div className="text-sm text-muted mb-2">Step 2 of 5</div>
        <h1 className="font-serif text-4xl text-ink mb-2">
          Checking any bags?
        </h1>
        <p className="text-muted">
          You can always add bags later, but it's cheaper to add them now.
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {/* Carry-on only */}
        <button
          onClick={() => setChoice('carryon')}
          className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 ${choice === 'carryon' ? 'border-teal bg-teal-light/15 shadow-subtle' : 'border-warm bg-surface hover:border-ink/20'}`}>
          
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${choice === 'carryon' ? 'bg-teal text-cream' : 'bg-cream text-ink'}`}>
            
            <Briefcase size={22} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-ink">Carry-on items only</div>
            <div className="text-sm text-muted mt-0.5">
              One personal item + one carry-on bag included
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-sm font-medium text-ink">Free</div>
          </div>
          {choice === 'carryon' &&
          <div className="text-teal shrink-0">
              <Check size={20} />
            </div>
          }
        </button>

        {/* Checked bags */}
        <button
          onClick={() => setChoice('checked')}
          className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${choice === 'checked' ? 'border-teal bg-teal-light/15 shadow-subtle' : 'border-warm bg-surface hover:border-ink/20'}`}>
          
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${choice === 'checked' ? 'bg-teal text-cream' : 'bg-cream text-ink'}`}>
              
              <Luggage size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-ink">Yes, I'm checking bags</div>
              <div className="text-sm text-muted mt-0.5">
                Up to 50 lb (23 kg) per bag
              </div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-sm font-medium text-ink">
                ${CHECKED_BAG_PRICE}{' '}
                <span className="text-muted font-normal">/ bag</span>
              </div>
            </div>
            {choice === 'checked' &&
            <div className="text-teal shrink-0 ml-2">
                <Check size={20} />
              </div>
            }
          </div>

          {/* Stepper, only when checked is selected */}
          {choice === 'checked' &&
          <motion.div
            initial={{
              opacity: 0,
              height: 0
            }}
            animate={{
              opacity: 1,
              height: 'auto'
            }}
            className="overflow-hidden">
            
              <div className="mt-4 pt-4 border-t border-warm flex items-center justify-between">
                <span className="text-sm text-ink">Number of checked bags</span>
                <div className="flex items-center gap-3">
                  <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCheckedCount(Math.max(1, checkedCount - 1));
                  }}
                  aria-label="Decrease bag count"
                  disabled={checkedCount <= 1}
                  className="w-8 h-8 rounded-full bg-surface border border-warm flex items-center justify-center text-ink hover:border-ink/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  
                    <Minus size={14} />
                  </button>
                  <span className="font-medium text-ink min-w-[1.5ch] text-center">
                    {checkedCount}
                  </span>
                  <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCheckedCount(Math.min(5, checkedCount + 1));
                  }}
                  aria-label="Increase bag count"
                  disabled={checkedCount >= 5}
                  className="w-8 h-8 rounded-full bg-surface border border-warm flex items-center justify-center text-ink hover:border-ink/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          }
        </button>
      </div>

      <div className="bg-cream/60 border border-warm rounded-xl p-4 flex items-start gap-3 mb-8">
        <Info size={16} className="text-muted shrink-0 mt-0.5" />
        <p className="text-xs text-muted">
          Adding bags at the airport costs $50 per bag. Bag fees are
          non-refundable.
        </p>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-warm">
        <Link
          to="/plan/flights"
          className="text-ink font-medium hover:text-teal transition-colors">
          
          Back
        </Link>
        <div className="flex items-center gap-4">
          {choice &&
          <div className="text-sm text-muted">
              Bag fees:{' '}
              <span className="font-medium text-ink">
                {total === 0 ? 'Free' : `$${total}`}
              </span>
            </div>
          }
          <Link
            to={choice ? '/plan/hotels' : '#'}
            onClick={(e) => {
              if (!choice) e.preventDefault();
            }}
            aria-disabled={!choice}
            className={`px-8 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 ${choice ? 'bg-ink text-cream hover:bg-ink/90' : 'bg-warm text-muted cursor-not-allowed'}`}>
            
            Continue <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>);

}