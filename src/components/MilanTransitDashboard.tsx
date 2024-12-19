'use client';

import React, { useState, useEffect } from 'react';
import { Train, Clock, CloudRain, Wind } from 'lucide-react';
import { Card } from './ui/card';

export function MilanTransitDashboard() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Mock data for demo
  const [weatherData] = useState({
    temperature: '22°C',
    condition: 'Partly Cloudy',
    humidity: '65%',
    precipitation: '30%'
  });

  const [airQuality] = useState({
    index: 45,
    status: 'Good',
    pm25: 15,
    pm10: 25
  });

  const [metroLines] = useState([
    { line: 'M1', color: 'bg-red-500', status: 'Normal', nextTrain: '2 min', route: 'Sesto FS ↔ Rho Fiera' },
    { line: 'M2', color: 'bg-green-500', status: 'Delayed', nextTrain: '4 min', route: 'Assago Forum ↔ Gessate' },
    { line: 'M3', color: 'bg-yellow-500', status: 'Normal', nextTrain: '1 min', route: 'Comasina ↔ San Donato' },
    { line: 'M4', color: 'bg-blue-500', status: 'Normal', nextTrain: '3 min', route: 'Linate ↔ San Babila' },
    { line: 'M5', color: 'bg-purple-500', status: 'Normal', nextTrain: '2 min', route: 'Bignami ↔ San Siro' }
  ]);

  const breakingNews = [
    "Breaking: Major Cultural Festival Announced in Central Milan",
    "Update: New Metro Line Extension Project Approved",
    "Alert: International Tech Conference Coming to Milano",
  ];

  // News rotation and time update
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % breakingNews.length);
      setCurrentTime(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, [breakingNews.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* News Ticker */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 text-white shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-2" />
          <span className="font-bold text-xl">BREAKING:</span>
          <span className="ml-2 text-lg font-medium">{breakingNews[currentNewsIndex]}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Top Row - Time, Weather, and Air Quality */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4 col-span-1">
            <div className="flex justify-between items-center">
              <Clock className="text-blue-600 h-6 w-6" />
              <span className="text-2xl font-mono">{currentTime.toLocaleTimeString()}</span>
            </div>
          </Card>
          
          <Card className="p-4 col-span-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <CloudRain className="text-purple-500 h-6 w-6 mr-2" />
                <span className="text-lg font-medium">Weather</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{weatherData.temperature}</div>
                <div className="text-gray-600">{weatherData.condition}</div>
                <div className="text-sm text-gray-500">
                  Humidity: {weatherData.humidity} • Rain: {weatherData.precipitation}
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4 col-span-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Wind className="text-green-500 h-6 w-6 mr-2" />
                <span className="text-lg font-medium">Air Quality</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{airQuality.index} AQI</div>
                <div className="text-green-600 font-medium">{airQuality.status}</div>
                <div className="text-sm text-gray-500">
                  PM2.5: {airQuality.pm25} • PM10: {airQuality.pm10}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Metro Lines */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center text-gray-800">
            <Train className="mr-3 text-blue-600" />
            Metro Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {metroLines.map(line => (
              <Card key={line.line} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className={`${line.color} p-5 text-white`}>
                  <h3 className="text-xl font-bold">Line {line.line}</h3>
                </div>
                <div className="p-5 bg-white">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-3 py-1 rounded-full ${
                        line.status === 'Normal' ? 'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {line.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Next Train:</span>
                      <span className="font-medium">{line.nextTrain}</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-2 text-center">
                      {line.route}
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