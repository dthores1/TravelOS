import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TripProvider } from './context/TripContext';
import { Layout } from './components/Layout';
import ActiveTrip from './pages/ActiveTrip';
import Home from './pages/Home';
import TripBuilder from './pages/TripBuilder';
import FlightResults from './pages/FlightResults';
import BaggageSelection from './pages/BaggageSelection';
import HotelResults from './pages/HotelResults';
import HotelDetail from './pages/HotelDetail';
import GroundTransport from './pages/GroundTransport';
import ReviewItinerary from './pages/ReviewItinerary';
import Dining from './pages/Dining';
import MyTrips from './pages/MyTrips';
import FlightDetail from './pages/FlightDetail';
import CaseStudy from './pages/CaseStudy';
import Confirmation from './pages/Confirmation';
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