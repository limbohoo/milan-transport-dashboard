'use client';

import React, { useState, useEffect } from 'react';
import { Train, Plane, TrainFront } from 'lucide-react';
import { Card } from './ui/card';

// 定义类型接口
interface MetroLine {
  line: string;
  color: string;
  status: string;
  nextTrain: string;
  mainRoute: string;
  branches: string[];
}

interface Airport {
  airport: string;
  services: {
    name: string;
    route: string;
    frequency: string;
    duration: string;
    nextDeparture: string;
  }[];
  flights: {
    flight: string;
    destination: string;
    status: string;
    time: string;
  }[];
}

export function MilanTransitDashboard() {
  const [metroLines] = useState<MetroLine[]>([
    { 
      line: 'M1', 
      color: 'bg-[#FF0000]',
      status: 'Normal', 
      nextTrain: '2 min',
      mainRoute: 'Sesto FS ↔ Rho Fiera',
      branches: [
        'Sesto FS - Rho Fiera',
        'Sesto FS - Bisceglie'
      ]
    },
    { 
      line: 'M2', 
      color: 'bg-[#00A067]',
      status: 'Delayed', 
      nextTrain: '4 min',
      mainRoute: 'Assago Forum ↔ Gessate',
      branches: [
        'Assago Forum - Gessate',
        'Assago Forum - Cologno Nord'
      ]
    },
    { 
      line: 'M3', 
      color: 'bg-[#FFDD00] text-black',
      status: 'Normal', 
      nextTrain: '1 min',
      mainRoute: 'Comasina ↔ San Donato',
      branches: []
    },
    { 
      line: 'M4', 
      color: 'bg-[#0066CC]',
      status: 'Normal', 
      nextTrain: '3 min',
      mainRoute: 'Linate ↔ San Babila',
      branches: []
    },
    { 
      line: 'M5', 
      color: 'bg-[#A85BA7]',
      status: 'Normal', 
      nextTrain: '2 min',
      mainRoute: 'Bignami ↔ San Siro',
      branches: []
    }
  ]);

  const [airportServices] = useState<Airport[]>([
    {
      airport: 'Malpensa Airport (MXP)',
      services: [
        {
          name: 'Malpensa Express',
          route: 'Milano Centrale ↔ Malpensa T1/T2',
          frequency: '30 min',
          duration: '52 min',
          nextDeparture: '10:25'
        }
      ],
      flights: [
        { flight: 'AZ1234', destination: 'London', status: 'On Time', time: '11:30' },
        { flight: 'LH5678', destination: 'Frankfurt', status: 'Delayed', time: '12:15' }
      ]
    },
    {
      airport: 'Linate Airport (LIN)',
      services: [
        {
          name: 'M4 Metro',
          route: 'Linate ↔ San Babila',
          frequency: '3 min',
          duration: '15 min',
          nextDeparture: 'Continuous Service'
        }
      ],
      flights: [
        { flight: 'AZ2468', destination: 'Paris', status: 'On Time', time: '10:45' },
        { flight: 'BA3579', destination: 'Rome', status: 'Boarding', time: '11:00' }
      ]
    },
    {
      airport: 'Bergamo Orio al Serio (BGY)',
      services: [
        {
          name: 'Airport Bus',
          route: 'Milano Centrale ↔ Bergamo Airport',
          frequency: '20 min',
          duration: '50 min',
          nextDeparture: '10:40'
        }
      ],
      flights: [
        { flight: 'FR1357', destination: 'Barcelona', status: 'On Time', time: '11:15' },
        { flight: 'W63456', destination: 'Madrid', status: 'Delayed', time: '12:30' }
      ]
    }
  ]);

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-black border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center space-x-3">
            <TrainFront className="h-8 w-8 text-blue-500" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">Milano Transit</span>
              <span className="text-sm text-gray-400">Real-time Transportation Hub</span>
            </div>
          </div>
        </div>
      </div>
            
      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Top Section with Clock and Live TV */}
        <div className="grid grid-cols-12 gap-6">
          {/* LED Clocks */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="bg-black border-gray-800">
              <div className="p-6">
                <div className="space-y-6">
                  {/* Italian Time */}
                  <div className="flex flex-col items-center">
                    <div className="text-gray-400 mb-1 font-medium">Milano</div>
                    <div className="font-mono text-5xl font-bold text-yellow-400 tabular-nums tracking-wider filter drop-shadow-lg animate-pulse">
                      {time.toLocaleTimeString('it-IT', {
                        hour12: false,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                        timeZone: 'Europe/Rome'
                      })}
                    </div>
                    <div className="text-gray-500 mt-2 font-mono text-sm">
                      {new Date().toLocaleDateString('it-IT', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        timeZone: 'Europe/Rome'
                      })}
                    </div>
                  </div>

                  <div className="border-t border-gray-800"></div>

                  {/* Local Time */}
                  <div className="flex flex-col items-center">
                    <div className="text-gray-400 mb-1 font-medium">Local Time</div>
                    <div className="font-mono text-5xl font-bold text-green-400 tabular-nums tracking-wider filter drop-shadow-lg animate-pulse">
                      {time.toLocaleTimeString('en-US', {
                        hour12: false,
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                      })}
                    </div>
                    <div className="text-gray-500 mt-2 font-mono text-sm">
                      {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long'
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Live TV */}
          <div className="col-span-12 lg:col-span-8">
            <Card className="bg-black border-gray-800 overflow-hidden">
              <div className="relative">
                <div className="absolute top-4 left-4 z-10 flex items-center space-x-2">
                  <div className="flex items-center bg-red-600 bg-opacity-75 backdrop-blur-sm text-white px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse mr-2" />
                    <span className="text-sm font-semibold">LIVE</span>
                  </div>
                </div>
                <div className="w-full aspect-video">
                  <iframe
                    className="w-full h-full"
                    src="https://www.dailymotion.com/embed/video/x8u05e4?autoplay=1"
                    title="Live Stream"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Metro Lines */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center text-white">
            <Train className="mr-3 text-blue-500" />
            Metro Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {metroLines.map(line => (
              <Card key={line.line} className="bg-white overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className={`${
                  line.line === 'M1' ? 'bg-red-600' :
                  line.line === 'M2' ? 'bg-green-600' :
                  line.line === 'M3' ? 'bg-yellow-400' :
                  line.line === 'M4' ? 'bg-blue-600' :
                  'bg-purple-600'
                } p-5 ${line.line === 'M3' ? 'text-black' : 'text-white'}`}>
                  <h3 className="text-xl font-bold">Line {line.line}</h3>
                </div>
                <div className="p-5 bg-gray-50">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">Status:</span>
                      <span className={`px-3 py-1 rounded-full ${
                        line.status === 'Normal' ? 'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {line.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-800 font-medium">Next Train:</span>
                      <span className="font-bold text-gray-900">{line.nextTrain}</span>
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold text-gray-800 mb-1">Main Route:</div>
                      <div className="text-gray-700">{line.mainRoute}</div>
                      {line.branches.length > 0 && (
                        <div className="mt-2">
                          <div className="font-semibold text-gray-800 mb-1">Branches:</div>
                          {line.branches.map((branch, index) => (
                            <div key={index} className="text-gray-700 text-sm">
                              {branch}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Airport Services */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center text-white">
            <Plane className="mr-3 text-blue-500" />
            Airport Connections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {airportServices.map((airport, index) => (
              <Card key={index} className="bg-white border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="bg-blue-700 p-5 text-white">
                  <h3 className="text-xl font-bold">{airport.airport}</h3>
                </div>
                <div className="p-5 bg-gray-50">
                  <div className="space-y-6">
                    {airport.services.map((service, sIndex) => (
                      <div key={sIndex} className="text-gray-900">
                        <h4 className="font-bold text-lg mb-3 text-blue-800">{service.name}</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                            <span className="font-medium text-gray-700">Route:</span>
                            <span className="text-gray-900">{service.route}</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                            <span className="font-medium text-gray-700">Frequency:</span>
                            <span className="text-gray-900">{service.frequency}</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                            <span className="font-medium text-gray-700">Duration:</span>
                            <span className="text-gray-900">{service.duration}</span>
                          </div>
                          <div className="flex justify-between items-center bg-white p-2 rounded-lg">
                            <span className="font-medium text-gray-700">Next:</span>
                            <span className="font-bold text-blue-800">{service.nextDeparture}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-gray-200">
                      <h4 className="font-bold text-lg mb-3 text-blue-800">Next Flights</h4>
                      <div className="space-y-2">
                        {airport.flights.map((flight, fIndex) => (
                          <div key={fIndex} className="flex justify-between items-center bg-white p-3 rounded-lg text-sm">
                            <div className="flex flex-col">
                              <span className="font-bold text-gray-900">{flight.flight}</span>
                              <span className="text-gray-600">to {flight.destination}</span>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className={`font-medium ${
                                flight.status === 'On Time' ? 'text-green-600' : 
                                flight.status === 'Boarding' ? 'text-blue-600' : 
                                'text-yellow-600'
                              }`}>
                                {flight.status}
                              </span>
                              <span className="font-bold text-gray-900">{flight.time}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}