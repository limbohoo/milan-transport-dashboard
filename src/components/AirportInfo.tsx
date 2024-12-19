'use client';

import React, { useState } from 'react';
import { Plane, Train, Bus, Clock, ExternalLink, Search } from 'lucide-react';
import { Card } from './ui/card';

interface Flight {
  id: string;
  flightNo: string;
  airline: string;
  destination: string;
  scheduled: string;
  status: 'On Time' | 'Delayed' | 'Boarding' | 'Cancelled' | 'Departed';
  terminal: string;
  gate: string;
}

interface AirportTransport {
  name: string;
  type: 'train' | 'bus' | 'metro';
  route: string;
  frequency: string;
  duration: string;
  price: string;
  nextDeparture: string;
  bookingUrl: string;
}

interface Airport {
  code: string;
  name: string;
  transports: AirportTransport[];
  flights: Flight[];
}

export function AirportInfo() {
  const [activeAirport, setActiveAirport] = useState<string>('MXP');
  const [searchTerm, setSearchTerm] = useState('');

  const airports: Airport[] = [
    {
      code: 'MXP',
      name: 'Milano Malpensa',
      transports: [
        {
          name: 'Malpensa Express',
          type: 'train',
          route: 'Milano Centrale ↔ Malpensa T1/T2',
          frequency: 'Every 30 min',
          duration: '52 min',
          price: '€13',
          nextDeparture: '10:25',
          bookingUrl: 'https://www.trenord.it/en/tickets/'
        },
        {
          name: 'Malpensa Shuttle',
          type: 'bus',
          route: 'Milano Centrale ↔ Malpensa',
          frequency: 'Every 20 min',
          duration: '60 min',
          price: '€10',
          nextDeparture: '10:20',
          bookingUrl: 'https://www.malpensashuttle.it'
        }
      ],
      flights: [
        {
          id: '1',
          flightNo: 'AZ1234',
          airline: 'ITA Airways',
          destination: 'London Heathrow',
          scheduled: '11:30',
          status: 'On Time',
          terminal: 'T1',
          gate: 'B15'
        },
        // Add more flights
      ]
    },
    {
      code: 'LIN',
      name: 'Milano Linate',
      transports: [
        {
          name: 'Metro M4',
          type: 'metro',
          route: 'Linate ↔ San Babila',
          frequency: 'Every 3 min',
          duration: '15 min',
          price: '€2.20',
          nextDeparture: 'Continuous',
          bookingUrl: 'https://www.atm.it'
        }
      ],
      flights: [
        {
          id: '2',
          flightNo: 'AZ2468',
          airline: 'ITA Airways',
          destination: 'Rome Fiumicino',
          scheduled: '10:45',
          status: 'Boarding',
          terminal: 'Main',
          gate: '12'
        },
        // Add more flights
      ]
    },
    {
      code: 'BGY',
      name: 'Bergamo Orio al Serio',
      transports: [
        {
          name: 'Orio Shuttle',
          type: 'bus',
          route: 'Milano Centrale ↔ Bergamo Airport',
          frequency: 'Every 20 min',
          duration: '50 min',
          price: '€10',
          nextDeparture: '10:40',
          bookingUrl: 'https://www.orioshuttle.com'
        }
      ],
      flights: [
        {
          id: '3',
          flightNo: 'FR1357',
          airline: 'Ryanair',
          destination: 'Barcelona',
          scheduled: '11:15',
          status: 'On Time',
          terminal: 'Main',
          gate: '8'
        },
        // Add more flights
      ]
    }
  ];

  const getStatusStyle = (status: Flight['status']) => {
    switch (status) {
      case 'On Time': return 'bg-green-100 text-green-800';
      case 'Delayed': return 'bg-yellow-100 text-yellow-800';
      case 'Boarding': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      case 'Departed': return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransportIcon = (type: AirportTransport['type']) => {
    switch (type) {
      case 'train': return <Train className="h-5 w-5" />;
      case 'bus': return <Bus className="h-5 w-5" />;
      case 'metro': return <Train className="h-5 w-5" />;
    }
  };

  const filteredFlights = searchTerm
    ? airports
        .find(a => a.code === activeAirport)
        ?.flights.filter(f => 
          f.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
          f.flightNo.toLowerCase().includes(searchTerm.toLowerCase())
        )
    : airports.find(a => a.code === activeAirport)?.flights;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold flex items-center text-gray-800">
          <Plane className="mr-3 text-blue-600" />
          Airport Connections
        </h2>
        <div className="flex space-x-4">
          {airports.map((airport) => (
            <button
              key={airport.code}
              onClick={() => setActiveAirport(airport.code)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeAirport === airport.code
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {airport.code}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transport Options */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Transport Options</h3>
          {airports
            .find(a => a.code === activeAirport)
            ?.transports.map((transport, index) => (
              <Card key={index} className="p-4 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getTransportIcon(transport.type)}
                    <span className="font-medium text-gray-800">{transport.name}</span>
                  </div>
                  <a
                    href={transport.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm hover:bg-blue-700 transition-colors flex items-center"
                  >
                    Book <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Route:</span>
                    <span>{transport.route}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frequency:</span>
                    <span>{transport.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{transport.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span>{transport.price}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Next departure:</span>
                    <span>{transport.nextDeparture}</span>
                  </div>
                </div>
              </Card>
            ))}
        </div>

        {/* Flights Table */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-xl font-semibold text-gray-800">Departures</h3>
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search flights..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Flight</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Destination</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Time</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Terminal</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Gate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredFlights?.map((flight) => (
                  <tr key={flight.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-800">{flight.flightNo}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{flight.destination}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{flight.scheduled}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(flight.status)}`}>
                        {flight.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-800">{flight.terminal}</td>
                    <td className="px-4 py-3 text-sm text-gray-800">{flight.gate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}