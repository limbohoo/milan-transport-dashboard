'use client';

import React, { useState, useEffect } from 'react';
import { Search, SortAsc, SortDesc, Filter, Plane, RefreshCw } from 'lucide-react';
import { Card } from './ui/card';

interface Flight {
  id: string;
  flightNo: string;
  airline: string;
  destination: string;
  scheduled: string;
  estimated: string;
  status: 'On Time' | 'Delayed' | 'Boarding' | 'Cancelled' | 'Departed';
  terminal: string;
  gate: string;
  airport: 'MXP' | 'LIN' | 'BGY';
}

export function FlightsTable() {
  const [flights, setFlights] = useState<Flight[]>([
    {
      id: '1',
      flightNo: 'AZ1234',
      airline: 'ITA Airways',
      destination: 'London Heathrow',
      scheduled: '11:30',
      estimated: '11:30',
      status: 'On Time',
      terminal: 'T1',
      gate: 'B15',
      airport: 'MXP'
    },
    // Add more sample flights
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'scheduled' | 'destination'>