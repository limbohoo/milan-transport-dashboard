'use client';

import React, { useState, useEffect } from 'react';
import { Train, Clock, CloudRain, Wind, Plane } from 'lucide-react';
import { Card } from './ui/card';

// 定义类型接口
interface NewsItem {
  en: string;
  it: string;
  zh: string;
  [key: string]: string; // 添加索引签名
}

export function MilanTransitDashboard() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'it' | 'zh'>('en');
  
  // 使用类型注解的新闻数据
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

  // 米兰地铁线路数据
  const [metroLines] = useState([
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

  // 机场快线信息
  const airportServices = [
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
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % breakingNews.length);
      setCurrentTime(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, [breakingNews.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* News Ticker with Language Selection */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 text-white shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-2" />
              <span className="font-bold text-xl">LIVE NEWS</span>
            </div>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-red-700 text-white border border-red-400 rounded px-2 py-1"
            >
              <option value="en">English</option>
              <option value="it">Italiano</option>
              <option value="zh">中文</option>
            </select>
          </div>
          <div className="overflow-hidden relative h-8">
           <div className="animate-marquee whitespace-nowrap absolute">
            {breakingNews[currentNewsIndex][selectedLanguage]}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Top Row - Time, Weather, and Air Quality */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4 col-span-1 hover:shadow-lg transition-shadow duration-200">
            <div className="flex justify-between items-center text-gray-800">
              <Clock className="text-blue-600 h-6 w-6" />
              <span className="text-2xl font-mono">{currentTime.toLocaleTimeString()}</span>
            </div>
          </Card>
          
          <Card className="p-4 col-span-1 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between text-gray-800">
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

          <Card className="p-4 col-span-1 hover:shadow-lg transition-shadow duration-200">
            <div className="flex items-center justify-between text-gray-800">
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
                    <div className="flex justify-between items-center text-gray-800">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-3 py-1 rounded-full ${
                        line.status === 'Normal' ? 'bg-green-100 text-green-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {line.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-800">
                      <span className="text-gray-600">Next Train:</span>
                      <span className="font-medium">{line.nextTrain}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      <div className="font-medium mb-1">Main Route:</div>
                      <div className="text-gray-500">{line.mainRoute}</div>
                      {line.branches.length > 0 && (
                        <div className="mt-2">
                          <div className="font-medium mb-1">Branches:</div>
                          {line.branches.map((branch, index) => (
                            <div key={index} className="text-gray-500 text-sm">
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
          <h2 className="text-3xl font-bold flex items-center text-gray-800">
            <Plane className="mr-3 text-blue-600" />
            Airport Connections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {airportServices.map((airport, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="bg-blue-600 p-5 text-white">
                  <h3 className="text-xl font-bold">{airport.airport}</h3>
                </div>
                <div className="p-5 bg-white">
                  <div className="space-y-4">
                    {airport.services.map((service, sIndex) => (
                      <div key={sIndex} className="text-gray-800">
                        <h4 className="font-bold text-lg mb-2">{service.name}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Route:</span>
                            <span>{service.route}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Frequency:</span>
                            <span>{service.frequency}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Next:</span>
                            <span>{service.nextDeparture}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4">
                      <h4 className="font-bold text-lg mb-2 text-gray-800">Next Flights</h4>
                      <div className="space-y-2">
                        {airport.flights.map((flight, fIndex) => (
                          <div key={fIndex} className="flex justify-between text-sm text-gray-800">
                            <span>{flight.flight} to {flight.destination}</span>
                            <span className={`${
                              flight.status === 'On Time' ? 'text-green-600' : 
                              flight.status === 'Boarding' ? 'text-blue-600' : 'text-yellow-600'
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