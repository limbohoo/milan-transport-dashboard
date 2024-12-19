'use client';

import React from 'react';
import { NewsHeader } from '@/components/NewsHeader';
import { WeatherPanel } from '@/components/WeatherPanel';
import { MetroStatus } from '@/components/MetroStatus';
import { AirportInfo } from '@/components/AirportInfo';
import { FlightsTable } from '@/components/FlightsTable';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
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