'use client';

import React, { useState, useEffect } from 'react';
import React, { useState, useEffect, useCallback } from 'react';
import { Card } from './ui/card';

export function MilanTransitDashboard() {
  // State management
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weatherData, setWeatherData] = useState({
    temperature: '--°C',
    condition: 'Loading...',
    humidity: '--',
    precipitation: '--'
  });
  const [airQuality, setAirQuality] = useState({
    index: 0,
    status: 'Loading...',
    pm25: 0,
    pm10: 0
  });

  const [metroLines, setMetroLines] = useState([
    { line: 'M1', color: 'bg-red-500', status: 'Loading...', nextTrain: '--', route: 'Sesto FS ↔ Rho Fiera' },
    { line: 'M2', color: 'bg-green-500', status: 'Loading...', nextTrain: '--', route: 'Assago Forum ↔ Gessate' },
    { line: 'M3', color: 'bg-yellow-500', status: 'Loading...', nextTrain: '--', route: 'Comasina ↔ San Donato' },
    { line: 'M4', color: 'bg-blue-500', status: 'Loading...', nextTrain: '--', route: 'Linate ↔ San Babila' },
    { line: 'M5', color: 'bg-purple-500', status: 'Loading...', nextTrain: '--', route: 'Bignami ↔ San Siro' }
  ]);

  const breakingNews = [
    "Breaking: Major Cultural Festival Announced in Central Milan",
    "Update: New Metro Line Extension Project Approved",
    "Alert: International Tech Conference Coming to Milano",
  ];

  // Weather API
  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=Milan,IT&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      const data = await response.json();
      
      setWeatherData({
        temperature: `${Math.round(data.main.temp)}°C`,
        condition: data.weather[0].main,
        humidity: `${data.main.humidity}%`,
        precipitation: data.rain ? `${data.rain['1h']}mm` : '0mm'
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setWeatherData(prev => ({
        ...prev,
        condition: 'Error loading weather'
      }));
    }
  };

  // Air Quality API
  const fetchAirQuality = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=45.4642&lon=9.1900&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY}`
      );
      const data = await response.json();
      
      const aqi = data.list[0].main.aqi;
      const status = getAQIStatus(aqi);
      
      setAirQuality({
        index: aqi,
        status: status,
        pm25: Math.round(data.list[0].components.pm2_5),
        pm10: Math.round(data.list[0].components.pm10)
      });
    } catch (error) {
      console.error('Error fetching air quality:', error);
      setAirQuality(prev => ({
        ...prev,
        status: 'Error loading AQI'
      }));
    }
  };

  // Helper function for AQI status
  const getAQIStatus = (aqi: number) => {
    switch(aqi) {
      case 1: return 'Good';
      case 2: return 'Fair';
      case 3: return 'Moderate';
      case 4: return 'Poor';
      case 5: return 'Very Poor';
      default: return 'Unknown';
    }
  };

  // ATM Milano Metro API (example - replace with actual API)
  const fetchMetroData = async () => {
    try {
      // This is a placeholder - replace with actual ATM API endpoint
      // const response = await fetch('https://api.atm-mi.it/lines/status');
      // const data = await response.json();
      
      // Simulated data - replace with actual API data
      const mockData = [
        { id: 'M1', status: 'Normal', nextTrain: '2 min' },
        { id: 'M2', status: 'Delayed', nextTrain: '4 min' },
        { id: 'M3', status: 'Normal', nextTrain: '1 min' },
        { id: 'M4', status: 'Normal', nextTrain: '3 min' },
        { id: 'M5', status: 'Normal', nextTrain: '2 min' }
      ];
      
      const updatedLines = mockData.map(line => ({
        line: line.id,
        color: getLineColor(line.id),
        status: line.status,
        nextTrain: line.nextTrain,
        route: getLineRoute(line.id)
      }));
      
      setMetroLines(updatedLines);
    } catch (error) {
      console.error('Error fetching metro data:', error);
      setMetroLines(prev => prev.map(line => ({
        ...line,
        status: 'Error loading status'
      })));
    }
  };

  // Helper functions for metro data
  const getLineColor = (line: string) => {
    const colors = {
      'M1': 'bg-red-500',
      'M2': 'bg-green-500',
      'M3': 'bg-yellow-500',
      'M4': 'bg-blue-500',
      'M5': 'bg-purple-500'
    };
    return colors[line] || 'bg-gray-500';
  };

  const getLineRoute = (line: string) => {
    const routes = {
      'M1': 'Sesto FS ↔ Rho Fiera',
      'M2': 'Assago Forum ↔ Gessate',
      'M3': 'Comasina ↔ San Donato',
      'M4': 'Linate ↔ San Babila',
      'M5': 'Bignami ↔ San Siro'
    };
    return routes[line] || '';
  };

// Add this before the useEffect
const fetchWeatherData = useCallback(async () => {
  // ... rest of the weather fetch code ...
}, []);

const fetchAirQuality = useCallback(async () => {
  // ... rest of the air quality fetch code ...
}, []);

const fetchMetroData = useCallback(async () => {
  // ... rest of the metro fetch code ...
}, []);

// Update the useEffect with dependencies
useEffect(() => {
  // Initial fetch
  const fetchData = async () => {
    await Promise.all([
      fetchWeatherData(),
      fetchAirQuality(),
      fetchMetroData()
    ]);
  };

  fetchData();

  // Set up intervals for updates
  const weatherInterval = setInterval(fetchWeatherData, 300000);
  const aqiInterval = setInterval(fetchAirQuality, 300000);
  const metroInterval = setInterval(fetchMetroData, 60000);

  return () => {
    clearInterval(weatherInterval);
    clearInterval(aqiInterval);
    clearInterval(metroInterval);
  };
}, [fetchWeatherData, fetchAirQuality, fetchMetroData]);

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