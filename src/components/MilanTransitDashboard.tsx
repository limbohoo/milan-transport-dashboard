'use client';

import React, { useState, useEffect } from 'react';
import { Train, Clock, CloudRain, Wind, Plane, ChevronDown, Search, ExternalLink, Bus } from 'lucide-react';

// Card Component
interface CardProps {
  className?: string;
  children: React.ReactNode;
}

function Card({ className = "", children }: CardProps) {
  return (
    <div className={`rounded-lg border bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

// Main Dashboard Component
export function MilanTransitDashboard() {
  // States
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'it' | 'zh'>('en');
  const [activeAirport, setActiveAirport] = useState('MXP');
  const [isWeatherExpanded, setIsWeatherExpanded] = useState(true);

  // News Data
  const breakingNews = [
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

  // Metro Lines Data
  const metroLines = [
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
  ];

  // Airport Data
  const airports = [
    {
      code: 'MXP',
      name: 'Milano Malpensa',
      transports: [
        {
          name: 'Malpensa Express',
          type: 'train' as const,
          route: 'Milano Centrale ↔ Malpensa T1/T2',
          frequency: 'Every 30 min',
          duration: '52 min',
          price: '€13',
          nextDeparture: '10:25',
          bookingUrl: 'https://www.trenord.it/en/'
        }
      ],
      flights: [
        {
          id: '1',
          flightNo: 'AZ1234',
          destination: 'London',
          scheduled: '11:30',
          status: 'On Time',
          terminal: 'T1',
          gate: 'B15'
        }
      ]
    },
    {
      code: 'LIN',
      name: 'Milano Linate',
      transports: [
        {
          name: 'Metro M4',
          type: 'metro' as const,
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
          destination: 'Rome',
          scheduled: '10:45',
          status: 'Boarding',
          terminal: 'Main',
          gate: '12'
        }
      ]
    }
  ];

  // Weather Data
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

  // Effects
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % breakingNews.length);
      setCurrentTime(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, [breakingNews.length]);

  // Utility Functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'bg-green-100 text-green-800';
      case 'Delayed': return 'bg-yellow-100 text-yellow-800';
      case 'Boarding': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* News Ticker */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 text-white shadow-lg">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-2" />
              <span className="font-bold text-xl">LIVE NEWS</span>
            </div>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as 'en' | 'it' | 'zh')}
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Weather and Time Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-4">
            <div className="flex justify-between items-center text-gray-800">
              <Clock className="text-blue-600 h-6 w-6" />
              <span className="text-2xl font-mono">{currentTime.toLocaleTimeString('it-IT')}</span>
            </div>
          </Card>
          
          <Card className="p-4">
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

          <Card className="p-4">
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
                      <span className={`px-3 py-1 rounded-full ${getStatusColor(line.status)}`}>
                        {line.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-800">
                      <span className="text-gray-600">Next Train:</span>
                      <span className="font-medium">{line.nextTrain}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="font-medium mb-1">Route:</div>
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

        {/* Airport Information */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold flex items-center text-gray-800">
            <Plane className="mr-3 text-blue-600" />
            Airport Connections
          </h2>
          <div className="flex space-x-4 mb-4">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {airports
              .filter(airport => airport.code === activeAirport)
              .map(airport => (
                <React.Fragment key={airport.code}>
                  {airport.transports.map((transport, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          {transport.type === 'train' && <Train className="h-5 w-5 mr-2" />}
                          {transport.type === 'metro' && <Train className="h-5 w-5 mr-2" />}
                          {transport.type === 'bus' && <Bus className="h-5 w-5 mr-2" />}
                          <span className="font-medium">{transport.name}</span>
                        </div>
                        <a
                          href={transport.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center"
                        >
                          Book <ExternalLink className="h-4 w-4 ml-1" />
                        </a>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Route:</span>
                          <span>{transport.route}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Frequency:</span>
                          <span>{transport.frequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span>{transport.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span>{transport.price}</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span className="text-gray-600">Next:</span>
                          <span>{transport.nextDeparture}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </React.Fragment>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}