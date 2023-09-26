import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Booking from './Booking/booking';
import Dashboard from './Dashboard/dashboard';

function App() {
  return (
    <div>
        <div className="container mx-auto px-2 max-w-5xl pt-10 md:pt-32">
      <Routes>
        <Route path="/" element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
    </div>
  );
}

export default App;
