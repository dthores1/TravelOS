# TravelOS

**TravelOS** is a travel-day command center where users can manage their entire trip itinerary, from flight booking and hotel reservation to ground transportation and dining options — all in one place. 

It's a portfolio-grade concept product that replaces the five apps you open on a travel day — airline, rideshare, hotel, transit, maps — with **one coordinated timeline**.

> The job to be done isn't "book a trip." It's *"tell me what to do next."*


## Quick start

The app uses React + TypeScript with no build configuration required. Open the project and the entry point (`index.tsx`) renders `App.tsx`. There's a floating **Demo Control Panel** in the bottom-right of every screen — use it to switch between the three demo trips and trigger disruptions.


**Suggested demo path:**
1. Land on **Home** — `Chicago → New York` is your active trip.
2. Click **"Plan a sample trip"** to go through the planning funnel for `Seattle → Chicago` (flight → baggage → hotel → ground transport → review → confirmation).
3. Once booked, `Seattle → Chicago` becomes the active trip on the dashboard.
4. From the demo panel, **trigger a delay** to watch the timeline and Smart Suggestions cascade.


---


## Design decisions


### 1. Timeline as the spine
A vertical event timeline is the core mental model — the same one travelers already use ("first I do X, then Y"). Every screen either feeds the timeline or reads from it. The icon dots are vertically centered with each card so the rhythm of the timeline matches the rhythm of the journey.


### 2. Next-best-action card
A single, prominent "Up next" hero on the Active Trip dashboard. Travel-day anxiety drops dramatically when there's exactly one thing to do — not five.


### 3. Adaptive transport, not rigid pickups
Pickups, baggage estimates, and hotel check-in are expressed as **dependent events** ("fires X minutes after baggage claim"), not fixed times. When the flight moves, everything downstream re-times. This was the single highest-impact decision for travel-day calm.


### 4. Disruptions are first-class states
Delays don't hide in a settings menu — they animate the entire timeline (Framer Motion layout animations), surface a banner, fire a toast, flip dependent events to `warning`, and reshuffle Smart Suggestions. The interface tells one coherent story when something goes wrong.


### 5. Two modes: Plan and Travel-day
Most travel apps blur planning and active-trip into one giant tab. We separated them:
- **Plan** is a focused funnel: Trip Builder → Flight → Baggage → Hotel → Ground Transport → Review → Confirmation.
- **Travel-day** is a calm, sparse dashboard where everything is one tap away.


### 6. Contextual Smart Suggestions
Suggestions are computed from three inputs: trip stage, disruption state, and trip type (domestic vs international). Same product, different feeds:
- Happy-path domestic → "Security is lighter at Checkpoint 3"
- Delay mode → "Blue Line is now faster than rideshare"
- International → "ArriveCAN ready?"


### 7. Honesty in scarcity
Flight cards lead with seat scarcity ("Only 3 left at this price") instead of on-time %. Reliability, carbon emissions, seat pitch, and entertainment live in a progressive-disclosure panel — useful, but not noisy at the scan layer.


### 8. Comparison UX for ground transport
Rideshare, transit, rental car, and "I have my own ride" sit side-by-side with ETA, cost, transfers, and reliability framed as **"typically heavy at 2 PM weekdays"** (not "currently") — useful when you're planning ahead, not just reacting.


### 9. Editorial design language, not SaaS
- Warm cream background (`#FAF8F4`), deep ink text (`#1a1a1a`), one confident teal accent.
- **Fraunces** serif for trip names and times — the most-scanned data deserves to feel like a magazine pull-quote.
- **Inter** for everything else.
- Desaturated status colors (forest green, muted amber, soft red). Even the worst-case path stays calm.
- Restrained motion — reserved for state changes that matter.


### 10. Three curated demo trips, not free-form planning
- **`SEA → ORD`** — flagship, plannable, designed for the disruption demo.
- **`ORD → JFK`** — pre-booked business traveler scenario.
- **`JFK → YWG`** — pre-booked international, includes customs + ArriveCAN steps.


A real product needs full search and inventory; for a portfolio demo, three highly-polished trips tell a richer story than a generic blank-state planner.


---


## Technical overview


### Stack
- **React 18** + **TypeScript**
- **React Router** for client-side routing
- **Framer Motion** for timeline cascade animations and accordion transitions
- **Tailwind CSS** with a custom warm-neutral palette (`tailwind.config.js`)
- **Sonner** for toast notifications
- **Lucide React** for iconography
- **Google Fonts**: Fraunces + Inter (imported in `index.css`)


All data is mocked — no backend.


### Architecture


```
App.tsx                       # Router + provider tree + Toaster
src/
├── context/
│   └── TripContext.tsx       # Global state: trips, activeTripId, bookedTripIds,
│                             # selectedTransport, disruption simulation, bookTrip
├── data/
│   ├── mockTrip.ts           # 3 trip fixtures (events, statuses, details)
│   ├── mockHotels.ts         # Hotel inventory + room types
│   ├── mockDining.ts         # Dining options near gate / near hotel
│   └── mockWeather.ts        # Weather keyed by trip ID
├── types.ts                  # Trip, TimelineEvent, EventStatus, DisruptionType
├── components/
│   ├── Layout.tsx            # Outlet wrapper + TopNav + DemoControlPanel
│   ├── TopNav.tsx            # Home / Plan / Trips / Active / Case Study
│   ├── DemoControlPanel.tsx  # Floating panel: switch trips, trigger disruptions
│   ├── NextActionCard.tsx    # "Up next" hero on Active Trip
│   ├── DisruptionBanner.tsx  # Reactive banner shown when disruptionState ≠ 'none'
│   ├── TripTimeline.tsx      # Vertical event timeline with layout animations
│   └── SmartSuggestions.tsx  # Context-aware tips
└── pages/
   ├── Home.tsx              # Hero + active trip card + other trips
   ├── TripBuilder.tsx       # Step 0 of plan flow
   ├── FlightResults.tsx     # Sortable flight list, cabin toggle, expandable details
   ├── BaggageSelection.tsx
   ├── HotelResults.tsx      # Filterable hotel list
   ├── HotelDetail.tsx       # Photo gallery + room types + sticky booking
   ├── GroundTransport.tsx   # Rideshare / Transit / Rental / Own ride
   ├── ReviewItinerary.tsx   # Orchestration messaging + "auto-adjusts" badges
   ├── Confirmation.tsx      # Confirmation # + email reassurance
   ├── ActiveTrip.tsx        # Flagship dashboard
   ├── FlightDetail.tsx      # Boarding pass + flight status timeline
   ├── Dining.tsx            # Near-gate / near-hotel + timing-risk pills
   ├── MyTrips.tsx           # Booked trips, "Active" tab driven by activeTripId
   └── CaseStudy.tsx         # Full portfolio narrative
```


### State model — `TripContext`


A single `TripProvider` exposes everything global:


| Field | Purpose |
|---|---|
| `trip` | The currently active `Trip` (derived from `activeTripId`) |
| `trips` | All trips (mutable for disruption simulation) |
| `activeTripId` | Drives both the Active Trip dashboard and My Trips' Active tab — single source of truth |
| `bookedTripIds` | Which trips show up in My Trips. `SEA→ORD` is added on confirm |
| `selectedTransport` | Persisted choice from Ground Transport → consumed by Review + Confirmation |
| `simulateDelay()` | Cascades `delayed`/`warning` statuses through dependent events, fires toasts |
| `simulateGateChange()` | Updates flight location + status |
| `resolveDisruption(eventId, action)` | Reschedules the rideshare segment |
| `bookTrip(id)` | Adds to `bookedTripIds` + silently makes it the active trip |
| `resetTrip()` | Restores initial fixture state |


### Key interaction: the disruption cascade


When `simulateDelay()` fires:
1. The flight event flips to `delayed` with a 45-min `actualTime`.
2. Downstream `arrival` and `baggage` events also re-time.
3. The `transport` event flips to `warning` and gains a `recommendation` block with a CTA.
4. `disruptionState: 'delayed'` triggers `DisruptionBanner` and a contextual dining card on the Active Trip.
5. `SmartSuggestions` reads the new state and reshuffles its feed.
6. Framer Motion's `layout` prop on each timeline node animates positions smoothly.


### Routing map


| Route | Page |
|---|---|
| `/` | Home |
| `/plan` | Trip Builder |
| `/plan/flights` | Flight Results |
| `/plan/baggage` | Baggage Selection |
| `/plan/hotels` | Hotel Results |
| `/plan/hotels/:id` | Hotel Detail |
| `/plan/transport` | Ground Transport |
| `/plan/review` | Review Itinerary |
| `/plan/confirmation` | Confirmation |
| `/trips` | My Trips |
| `/trip/active` | Active Trip dashboard |
| `/trip/flight` | Flight Detail / boarding pass |
| `/trip/dining` | Dining sub-flow |
| `/case-study` | Portfolio case study |


---


## Trade-offs and what's next


- **Mock data only.** Productionizing requires reliable feeds for flight status, traffic, transit, and dining wait times — an integration problem more than a design one.
- **Single traveler.** Group travel multiplies state (different gates, bags, pickups) and the timeline metaphor would need per-traveler swim-lanes.
- **No loyalty/wallet.** Real travelers optimize against status, points, and lounges. A future version surfaces these in Trip Builder ("cheapest within United") and on Active Trip ("Sky Club is 4 min from your gate").


---


For the full narrative, see the in-app **Case Study** at `/case-study`.