import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TripProvider } from './src/context/TripContext';
import { Layout } from './src/components/Layout';
import ActiveTrip from './src/pages/ActiveTrip';
import Home from './src/pages/Home';
import TripBuilder from './src/pages/TripBuilder';
import FlightResults from './src/pages/FlightResults';
import BaggageSelection from './src/pages/BaggageSelection';
import HotelResults from './src/pages/HotelResults';
import HotelDetail from './src/pages/HotelDetail';
import GroundTransport from './src/pages/GroundTransport';
import ReviewItinerary from './src/pages/ReviewItinerary';
import Dining from './src/pages/Dining';
import MyTrips from './src/pages/MyTrips';
import FlightDetail from './src/pages/FlightDetail';
import CaseStudy from './src/pages/CaseStudy';
import Confirmation from './src/pages/Confirmation';
export function App() {
  return (
    <TripProvider>
      <BrowserRouter>
        <Toaster position="top-center" richColors />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="plan" element={<TripBuilder />} />
            <Route path="plan/flights" element={<FlightResults />} />
            <Route path="plan/baggage" element={<BaggageSelection />} />
            <Route path="plan/hotels" element={<HotelResults />} />
            <Route path="plan/hotels/:id" element={<HotelDetail />} />
            <Route path="plan/transport" element={<GroundTransport />} />
            <Route path="plan/review" element={<ReviewItinerary />} />
            <Route path="plan/confirmation" element={<Confirmation />} />
            <Route path="trips" element={<MyTrips />} />
            <Route path="trip/active" element={<ActiveTrip />} />
            <Route path="trip/flight" element={<FlightDetail />} />
            <Route path="trip/dining" element={<Dining />} />
            <Route path="case-study" element={<CaseStudy />} />
            <Route path="*" element={<Navigate to="/trip/active" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TripProvider>);

}