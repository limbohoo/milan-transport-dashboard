'use client';

import React from 'react';
import { NewsHeader } from './NewsHeader';
import { WeatherPanel } from './WeatherPanel';
import { MetroStatus } from './MetroStatus';
import { AirportInfo } from './AirportInfo';
import { FlightsTable } from './FlightsTable';

export function MilanTransitDashboard() {
  return (
    <div>
      {/* News Header */}
      <NewsHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
        {/* Weather and Air Quality Section */}
        <section>
          <WeatherPanel />
        </section>

        {/* Metro Status Section */}
        <section>
          <MetroStatus />
        </section>

        {/* Airport Information Section */}
        <section>
          <AirportInfo />
        </section>

        {/* Flights Table Section */}
        <section>
          <FlightsTable />
        </section>
      </div>
    </div>
  );
}