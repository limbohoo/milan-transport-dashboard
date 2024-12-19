'use client';

import React, { useState } from 'react';
import { CloudRain, Wind, ChevronDown, Thermometer, Droplets } from 'lucide-react';
import { Card } from './ui/card';

interface WeatherData {
  temperature: string;
  condition: string;
  humidity: string;
  precipitation: string;
  forecast: {
    time: string;
    temp: string;
    condition: string;
  }[];
}

interface AirQualityData {
  index: number;
  status: string;
  pm25: number;
  pm10: number;
  no2: number;
  o3: number;
}

export function WeatherPanel() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<'weather' | 'air'>('weather');

  // Mock data - replace with API data
  const [weatherData] = useState<WeatherData>({
    temperature: '22°C',
    condition: 'Partly Cloudy',
    humidity: '65%',
    precipitation: '30%',
    forecast: [
      { time: '12:00', temp: '23°C', condition: 'Sunny' },
      { time: '15:00', temp: '24°C', condition: 'Cloudy' },
      { time: '18:00', temp: '21°C', condition: 'Rain' },
      { time: '21:00', temp: '19°C', condition: 'Clear' },
    ]
  });

  const [airQuality] = useState<AirQualityData>({
    index: 45,
    status: 'Good',
    pm25: 15,
    pm10: 25,
    no2: 40,
    o3: 30
  });

  const getAirQualityColor = (index: number) => {
    if (index <= 50) return 'text-green-600';
    if (index <= 100) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3 text-white">
          <button
            onClick={() => setActiveTab('weather')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'weather' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <CloudRain className="inline-block mr-2 h-5 w-5" />
            Weather
          </button>
          <button
            onClick={() => setActiveTab('air')}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === 'air' ? 'bg-white/20' : 'hover:bg-white/10'
            }`}
          >
            <Wind className="inline-block mr-2 h-5 w-5" />
            Air Quality
          </button>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-white p-2 hover:bg-white/10 rounded-lg transition-all"
        >
          <ChevronDown 
            className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
          />
        </button>
      </div>

      {/* Content */}
      <div className={`
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        {activeTab === 'weather' ? (
          <div className="p-6 space-y-6">
            {/* Current Weather */}
            <div className="flex justify-between items-center">
              <div>
                <div className="text-4xl font-bold text-gray-800">{weatherData.temperature}</div>
                <div className="text-gray-600">{weatherData.condition}</div>
              </div>
              <div className="text-right space-y-2">
                <div className="flex items-center justify-end text-gray-600">
                  <Droplets className="h-4 w-4 mr-2" />
                  <span>Humidity: {weatherData.humidity}</span>
                </div>
                <div className="flex items-center justify-end text-gray-600">
                  <CloudRain className="h-4 w-4 mr-2" />
                  <span>Precipitation: {weatherData.precipitation}</span>
                </div>
              </div>
            </div>

            {/* Forecast */}
            <div>
              <h3 className="text-gray-600 mb-4">Today's Forecast</h3>
              <div className="grid grid-cols-4 gap-4">
                {weatherData.forecast.map((forecast, index) => (
                  <div 
                    key={index}
                    className="text-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="text-sm text-gray-600">{forecast.time}</div>
                    <div className="font-bold text-gray-800">{forecast.temp}</div>
                    <div className="text-sm text-gray-600">{forecast.condition}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Air Quality Index */}
            <div className="flex justify-between items-center">
              <div>
                <div className={`text-4xl font-bold ${getAirQualityColor(airQuality.index)}`}>
                  {airQuality.index} AQI
                </div>
                <div className="text-gray-600">{airQuality.status}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Updated hourly</div>
              </div>
            </div>

            {/* Pollutants */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="text-sm text-gray-600">PM2.5</div>
                <div className="text-xl font-bold text-gray-800">{airQuality.pm25} µg/m³</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="text-sm text-gray-600">PM10</div>
                <div className="text-xl font-bold text-gray-800">{airQuality.pm10} µg/m³</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="text-sm text-gray-600">NO₂</div>
                <div className="text-xl font-bold text-gray-800">{airQuality.no2} µg/m³</div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50">
                <div className="text-sm text-gray-600">O₃</div>
                <div className="text-xl font-bold text-gray-800">{airQuality.o3} µg/m³</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}