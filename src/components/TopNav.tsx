import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, User, Menu, X } from 'lucide-react';
export function TopNav() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  const navItems = [
  {
    label: 'Plan',
    path: '/plan'
  },
  {
    label: 'My Trips',
    path: '/trips'
  },
  {
    label: 'Active',
    path: '/trip/active'
  },
  {
    label: 'Case Study',
    path: '/case-study'
  }];

  return (
    <nav className="sticky top-0 z-40 w-full bg-cream/80 backdrop-blur-md border-b border-warm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-ink text-cream p-1.5 rounded-md group-hover:bg-teal transition-colors">
                <Compass size={20} />
              </div>
              <span className="font-serif text-xl font-medium tracking-tight text-ink">
                TravelOS
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navItems.map((item) => {
                const isActive =
                location.pathname.startsWith(item.path) &&
                item.path !== '/' ||
                location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`text-sm font-medium transition-colors ${isActive ? 'text-teal' : 'text-muted hover:text-ink'}`}>
                    
                    {item.label}
                  </Link>);

              })}
            </div>
            <div className="h-4 w-px bg-warm"></div>
            <button className="flex items-center gap-2 text-sm font-medium text-ink hover:text-teal transition-colors">
              <div className="w-8 h-8 rounded-full bg-warm flex items-center justify-center overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64"
                  alt="User avatar"
                  className="w-full h-full object-cover" />
                
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
              className="text-ink p-2">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-warm py-3">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => {
                const isActive =
                  location.pathname.startsWith(item.path) &&
                  item.path !== '/' ||
                  location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-teal bg-teal-light/40' : 'text-muted hover:text-ink hover:bg-warm/40'}`}>
                    {item.label}
                  </Link>);
              })}
            </div>
          </div>
        )}
      </div>
    </nav>);

}