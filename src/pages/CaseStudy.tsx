import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Compass,
  Layers,
  Repeat,
  Lightbulb,
  ShieldAlert,
  Clock,
  Plane,
  Sparkles } from
'lucide-react';
export default function CaseStudy() {
  return (
    <div className="animate-in fade-in duration-500 max-w-3xl mx-auto pb-16">
      {/* Header */}
      <div className="pt-8 pb-12 border-b border-warm mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-light text-teal text-xs font-medium mb-6">
          <Sparkles size={12} /> Case study
        </div>
        <h1 className="font-serif text-5xl md:text-6xl text-ink mb-5 tracking-tight leading-[1.05]">
          Traveling is fun. Getting from point A to point B isn't.
        </h1>
        <p className="text-lg text-muted leading-relaxed mb-6">
          TravelOS is a concept product that replaces the five apps you open on
          a travel day with one coordinated timeline. This page documents the
          product decisions, design choices, and trade-offs.
        </p>
        <div className="flex items-center gap-4 text-sm text-muted">
          <span>Concept · 2024</span>
          <span className="w-1 h-1 rounded-full bg-warm"></span>
          <span>Solo design + prototype</span>
        </div>
      </div>

      <Section number="01" title="The problem">
        <p>
          Travel-day anxiety doesn't come from any single thing going wrong — it
          comes from{' '}
          <strong className="text-ink font-medium">app-switching</strong> and{' '}
          <strong className="text-ink font-medium">unclear next steps</strong>.
          A typical traveler holds the airline app, the rideshare app, the hotel
          app, the transit app, and a maps app in working memory, then mentally
          synchronizes them across a six-hour window.
        </p>
        <p>
          When something moves — a delay, a gate change, traffic — every app
          becomes stale at the same time, and the traveler has to manually
          rebuild the plan. That's the moment most experiences fail.
        </p>
        <Quote>
          The job to be done isn't "book a trip." It's{' '}
          <em className="font-serif">"tell me what to do next."</em>
        </Quote>
      </Section>

      <Section number="02" title="North star">
        <p>
          One timeline, one plan, one next-best-action. Every other product
          decision rolled out from this anchor.
        </p>
        <DecisionGrid
          decisions={[
          {
            icon: <Compass size={18} />,
            title: 'Timeline as the spine',
            body: 'A vertical event timeline makes complex logistics legible — the same mental model travelers already use ("first I do X, then Y").'
          },
          {
            icon: <Lightbulb size={18} />,
            title: 'Next-best-action card',
            body: 'A single, prominent "Up next" surface anchors the dashboard. Anxiety drops when there\'s exactly one thing to do.'
          },
          {
            icon: <Repeat size={18} />,
            title: 'Adaptive by default',
            body: 'Pickups, baggage estimates, and check-in are all expressed as dependent events that re-time when upstream changes.'
          },
          {
            icon: <ShieldAlert size={18} />,
            title: 'Disruptions are first-class',
            body: "Delays don't hide in a settings menu — they animate the entire timeline and surface concrete recommendations."
          }]
          } />
        
      </Section>

      <Section number="03" title="Key product decisions">
        <DecisionItem
          tag="Information architecture"
          title="Two modes: Plan and Travel-day"
          body="Most travel apps blur planning and active-trip into one giant tab. We separated them. Planning is a focused funnel (Trip Builder → Flight → Hotel → Transport → Review). The Active Trip is a calm, sparse dashboard where everything is one tap away." />
        
        <DecisionItem
          tag="Coordinated booking"
          title="Adaptive transport instead of rigid pickups"
          body={
          <>
              Standard rideshare booking forces you to pick a fixed time before
              your flight even lands. We treat the pickup as{' '}
              <strong className="text-ink font-medium">
                "fires X minutes after baggage claim"
              </strong>{' '}
              — the actual time recomputes against live arrival. This was the
              single highest-impact decision for travel-day calm.
            </>
          } />
        
        <DecisionItem
          tag="Smart suggestions"
          title="Contextual, not generic"
          body={
          <>
              Suggestions are computed from <em>three</em> inputs: trip stage,
              disruption state, and trip type (domestic vs international). Same
              product, three different feeds: a domestic happy-path traveler
              sees "Security is lighter at Checkpoint 3"; the same traveler in
              delay mode sees "Blue Line is now faster than rideshare"; the
              international traveler sees "ArriveCAN ready?".
            </>
          } />
        
        <DecisionItem
          tag="Comparison UX"
          title="Rideshare vs Transit, side-by-side"
          body="Travelers usually choose between rideshare and transit by feel. We made it explicit — the Ground Transport screen shows both options with ETA, cost, transfers, and reliability framed as 'typically' (not 'currently') so it's useful when planning ahead." />
        
        <DecisionItem
          tag="Honesty in scarcity"
          title="On-time % moved into expandable details"
          body="Reliability matters but it's noisy at the scan-and-pick layer. We replaced it on flight cards with seat scarcity (a real conversion driver) and tucked the on-time number, carbon footprint, and seat pitch into a progressive-disclosure panel." />
        
      </Section>

      <Section number="04" title="The disruption story">
        <p>
          The flagship interaction. One tap on the demo control panel simulates
          a 45-minute flight delay. From there:
        </p>
        <ol className="list-none space-y-3 my-6">
          {[
          'A toast and a banner announce the delay',
          'Every dependent event in the timeline animates to its new time (framer-motion layout animations)',
          'The rideshare event flips from "upcoming" to "warning" with a recommendation card',
          'Smart Suggestions reshuffles to surface "Blue Line is now faster" and "Push your Uber pickup"',
          'A contextual dining card appears: 45 minutes is now an opportunity, not a problem'].
          map((step, i) =>
          <li
            key={i}
            className="flex items-start gap-4 bg-surface border border-warm rounded-xl p-4">
            
              <span className="font-serif text-xl text-teal w-6 shrink-0">
                {i + 1}
              </span>
              <span className="text-ink/90 leading-relaxed">{step}</span>
            </li>
          )}
        </ol>
        <p>
          The point isn't any single state — it's that the entire interface
          tells the same coherent story when something goes wrong. That's the
          case for orchestration over standalone booking.
        </p>
      </Section>

      <Section number="05" title="Design language">
        <DecisionGrid
          decisions={[
          {
            icon: <Layers size={18} />,
            title: 'Editorial, not SaaS',
            body: 'Warm cream background, deep ink text, a single confident teal accent. Fraunces serif for trip names and times; Inter for everything else. Avoids the generic purple-gradient AI aesthetic.'
          },
          {
            icon: <Clock size={18} />,
            title: 'Time is the headline',
            body: "Times use the serif at large sizes. They're the most-scanned data on the page and deserve to feel like a magazine pull-quote."
          },
          {
            icon: <Plane size={18} />,
            title: 'Restrained motion',
            body: 'Motion is reserved for state changes that matter — timeline cascades, suggestion reshuffles, page transitions. Hover effects are limited to genuinely interactive elements.'
          },
          {
            icon: <ShieldAlert size={18} />,
            title: 'Desaturated status colors',
            body: 'Forest green for on-time, muted amber for warning, soft red for critical. The interface stays calm even in the worst-case path.'
          }]
          } />
        
      </Section>

      <Section number="06" title="Trade-offs & what's next">
        <DecisionItem
          tag="Trade-off"
          title="Three hardcoded demo trips, not free-form planning"
          body="A real product needs full search and inventory. For a portfolio demo, three highly-polished trips (SEA→ORD, ORD→JFK, JFK→YWG with customs) tell a richer story than a generic blank-state planner. The free-form Plan flow demos the funnel; the trip-switcher in the demo panel covers breadth." />
        
        <DecisionItem
          tag="Next"
          title="Group travel"
          body="Single-traveler is a forgiving design problem. Adding companions multiplies state — different gates, different bags, different pickups. The timeline metaphor would need a layered version (per-traveler swim-lanes)." />
        
        <DecisionItem
          tag="Next"
          title="Loyalty & wallet integration"
          body="Real travelers optimize against status, points, and lounges. A future version surfaces these constraints in Trip Builder ('cheapest within United') and on Active Trip ('Sky Club is 4 min from your gate')." />
        
        <DecisionItem
          tag="Next"
          title="Real-time data"
          body="The current prototype simulates state changes via the demo panel. Productionizing requires reliable feeds for flight status, traffic, transit, and dining wait times — an integration problem more than a design one." />
        
      </Section>

      {/* CTA back to product */}
      <div className="mt-16 bg-ink text-cream rounded-2xl p-8 md:p-10 text-center">
        <h3 className="font-serif text-3xl mb-3">See it in action</h3>
        <p className="text-cream/70 mb-6 max-w-md mx-auto">
          Open the active trip dashboard, then trigger a delay from the demo
          panel in the bottom-right.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link
            to="/trip/active"
            className="bg-teal hover:bg-teal/90 text-cream px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2">
            
            Open active trip <ArrowRight size={18} />
          </Link>
          <Link
            to="/"
            className="border border-cream/20 text-cream/90 hover:bg-cream/10 px-6 py-3 rounded-xl font-medium transition-colors">
            
            Back to home
          </Link>
        </div>
      </div>
    </div>);

}
function Section({
  number,
  title,
  children




}: {number: string;title: string;children: React.ReactNode;}) {
  return (
    <section className="mb-16">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-serif text-sm text-teal tracking-wider">
          {number}
        </span>
        <h2 className="font-serif text-3xl md:text-4xl text-ink">{title}</h2>
      </div>
      <div className="space-y-4 text-ink/85 leading-relaxed text-base md:text-lg [&_p]:leading-relaxed">
        {children}
      </div>
    </section>);

}
function Quote({ children }: {children: React.ReactNode;}) {
  return (
    <blockquote className="my-8 pl-6 border-l-2 border-teal font-serif text-xl md:text-2xl text-ink italic leading-snug">
      {children}
    </blockquote>);

}
function DecisionItem({
  tag,
  title,
  body




}: {tag: string;title: string;body: React.ReactNode;}) {
  return (
    <div className="my-6 bg-surface border border-warm rounded-2xl p-6">
      <div className="text-xs font-medium uppercase tracking-wider text-teal mb-2">
        {tag}
      </div>
      <h3 className="font-serif text-xl text-ink mb-3">{title}</h3>
      <div className="text-base text-ink/80 leading-relaxed">{body}</div>
    </div>);

}
function DecisionGrid({
  decisions






}: {decisions: {icon: React.ReactNode;title: string;body: string;}[];}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-6">
      {decisions.map((d) =>
      <div
        key={d.title}
        className="bg-surface border border-warm rounded-xl p-5">
        
          <div className="w-9 h-9 rounded-lg bg-teal-light text-teal flex items-center justify-center mb-3">
            {d.icon}
          </div>
          <div className="font-medium text-ink mb-1.5">{d.title}</div>
          <p className="text-sm text-muted leading-relaxed">{d.body}</p>
        </div>
      )}
    </div>);

}