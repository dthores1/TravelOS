import React from 'react';
import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';
import { DemoControlPanel } from './DemoControlPanel';
export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      <TopNav />
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
      <DemoControlPanel />
    </div>);

}