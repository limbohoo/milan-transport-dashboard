'use client';

import React, { useState, useEffect } from 'react';
import { Train, Clock, Plane, TrainFront } from 'lucide-react';
import { Card } from './ui/card';

// 定义类型接口
interface NewsItem {
  en: string;
  it: string;
  zh: string;
  [key: string]: string;
}

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
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'it' | 'zh'>('en');

  const breakingNews: NewsItem[] = [
    {
      en: "Major Cultural Festival at Piazza Duomo",
      it: "Grande Festival Culturale in Piazza Duomo",
      zh: "米兰大教堂广场文化节",
    },
    {
      en: "Metro Line M4 Extension Project Approved",
      it: "Approvato il Progetto di Estensione della Linea M4",
      zh: "地铁4号线延伸工程获批",
    },
    {
      en: "International Tech Week Coming to Milano",
      it: "Settimana Internazionale della Tecnologia a Milano",
      zh: "国际科技周即将在米兰举办",
    },
  ];

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
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
          {/* LED Clock */}
          <div className="col-span-12 lg:col-span-4">
            <Card className="bg-black border-gray-800">
              <div className="p-6">
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="font-mono text-6xl font-bold text-yellow-400 tabular-nums tracking-wider filter drop-shadow-lg animate-pulse">
                    {currentTime.toLocaleTimeString('en-US', {
                      hour12: false,
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </div>
                  <div className="text-gray-500 mt-2 font-mono">
                    {currentTime.toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
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
              <Card key={line.line} className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className={`${line.color.replace('bg-[', 'bg-').replace(']', '')} p-5 text-white`}>
                  <h3 className="text-xl font-bold">Line {line.line}</h3>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-gray-200">
                      <span className="text-gray-400">Status:</span>
                      <span className={`px-3 py-1 rounded-full ${
                        line.status === 'Normal' ? 'bg-green-900 text-green-200' : 
                        'bg-yellow-900 text-yellow-200'
                      }`}>
                        {line.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-200">
                      <span className="text-gray-400">Next Train:</span>
                      <span className="font-medium">{line.nextTrain}</span>
                    </div>
                    <div className="text-sm text-gray-400">
                      <div className="font-medium mb-1">Main Route:</div>
                      <div className="text-gray-300">{line.mainRoute}</div>
                      {line.branches.length > 0 && (
                        <div className="mt-2">
                          <div className="font-medium mb-1">Branches:</div>
                          {line.branches.map((branch, index) => (
                            <div key={index} className="text-gray-300 text-sm">
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
              <Card key={index} className="bg-gray-800 border-gray-700 overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="bg-blue-900 p-5 text-white">
                  <h3 className="text-xl font-bold">{airport.airport}</h3>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    {airport.services.map((service, sIndex) => (
                      <div key={sIndex} className="text-gray-200">
                        <h4 className="font-bold text-lg mb-2">{service.name}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Route:</span>
                            <span>{service.route}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Frequency:</span>
                            <span>{service.frequency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Duration:</span>
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Next:</span>
                            <span>{service.nextDeparture}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4">
                      <h4 className="font-bold text-lg mb-2 text-gray-200">Next Flights</h4>
                      <div className="space-y-2">
                        {airport.flights.map((flight, fIndex) => (
                          <div key={fIndex} className="flex justify-between text-sm text-gray-200">
                            <span>{flight.flight} to {flight.destination}</span>
                            <span className={`${
                              flight.status === 'On Time' ? 'text-green-400' : 
                              flight.status === 'Boarding' ? 'text-blue-400' : 'text-yellow-400'
                            }`}>
                              {flight.status} {flight.time}
                            </span>
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