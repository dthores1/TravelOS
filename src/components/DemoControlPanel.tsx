import React, { useState } from 'react';
import {
  Settings,
  AlertTriangle,
  Clock,
  RotateCcw,
  X,
  ChevronDown,
  Plane } from
'lucide-react';
import { useTrip } from '../context/TripContext';
import { motion, AnimatePresence } from 'framer-motion';
export function DemoControlPanel() {
  const {
    trip,
    trips,
    setActiveTripId,
    simulateDelay,
    simulateGateChange,
    resetTrip
  } = useTrip();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen &&
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
            scale: 0.95
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }}
          exit={{
            opacity: 0,
            y: 20,
            scale: 0.95
          }}
          transition={{
            duration: 0.2
          }}
          className="bg-ink text-cream rounded-xl shadow-floating p-4 mb-4 w-80 border border-ink/80">
          
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-serif text-lg flex items-center gap-2">
                <Settings size={18} className="text-teal-light" />
                Demo Controls
              </h3>
              <button
              onClick={() => setIsOpen(false)}
              className="text-cream/60 hover:text-cream">
              
                <X size={18} />
              </button>
            </div>

            {/* Trip switcher */}
            <div className="mb-4">
              <div className="text-xs uppercase tracking-wider text-cream/60 mb-2 flex items-center gap-1.5">
                <Plane size={12} /> Active Trip
              </div>
              <div className="space-y-1">
                {trips.map((t) => {
                const isActive = t.id === trip.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTripId(t.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${isActive ? 'bg-teal text-cream' : 'bg-cream/5 hover:bg-cream/15 text-cream/90'}`}>
                    
                      <div className="font-medium">
                        {t.origin.split(',')[0]} → {t.destination.split(',')[0]}
                      </div>
                      <div
                      className={`text-xs ${isActive ? 'text-cream/80' : 'text-cream/50'}`}>
                      
                        {t.status === 'active' ? 'Active now' : 'Upcoming'}
                      </div>
                    </button>);

              })}
              </div>
            </div>

            <div className="h-px w-full bg-cream/20 my-2"></div>

            <div className="space-y-2">
              <div className="text-xs uppercase tracking-wider text-cream/60 mb-1">
                Disruption simulation
              </div>
              <button
              onClick={simulateDelay}
              className="w-full flex items-center gap-3 px-3 py-2.5 bg-cream/10 hover:bg-cream/20 rounded-lg text-sm transition-colors text-left">
              
                <Clock size={16} className="text-amber-light" />
                <span>Simulate 45m Delay</span>
              </button>

              <button
              onClick={simulateGateChange}
              className="w-full flex items-center gap-3 px-3 py-2.5 bg-cream/10 hover:bg-cream/20 rounded-lg text-sm transition-colors text-left">
              
                <AlertTriangle size={16} className="text-amber-light" />
                <span>Trigger Gate Change</span>
              </button>

              <div className="h-px w-full bg-cream/20 my-2"></div>

              <button
              onClick={resetTrip}
              className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-cream/10 rounded-lg text-sm transition-colors text-left text-cream/80">
              
                <RotateCcw size={16} />
                <span>Reset Trip State</span>
              </button>
            </div>
          </motion.div>
        }
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-teal hover:bg-teal/90 text-cream rounded-full p-3 shadow-floating transition-transform hover:scale-105 flex items-center justify-center"
        aria-label="Toggle demo controls">
        
        {isOpen ? <ChevronDown size={24} /> : <Settings size={24} />}
      </button>
    </div>);

}