'use client';

import React, { useState } from 'react';
import { Train, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { Card } from './ui/card';

interface MetroLine {
  id: string;
  color: string;
  textColor: string;
  name: string;
  status: 'Normal' | 'Delayed' | 'Disrupted' | 'Planned Work';
  nextTrain: string;
  mainRoute: string;
  branches: string[];
  stations: {
    name: string;
    crowding: 'Low' | 'Medium' | 'High';
    facilities: string[];
  }[];
  alerts?: string[];
}

export function MetroStatus() {
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [showStations, setShowStations] = useState(false);

  const metroLines: MetroLine[] = [
    {
      id: 'M1',
      color: '#FF0000',
      textColor: 'white',
      name: 'Red Line',
      status: 'Normal',
      nextTrain: '2 min',
      mainRoute: 'Sesto FS ↔ Rho Fiera',
      branches: [
        'Sesto FS - Rho Fiera',
        'Sesto FS - Bisceglie'
      ],
      stations: [
        { name: 'Duomo', crowding: 'High', facilities: ['wheelchair', 'parking'] },
        { name: 'Centrale', crowding: 'Medium', facilities: ['wheelchair', 'parking', 'bike'] }
      ]
    },
    {
      id: 'M2',
      color: '#00A067',
      textColor: 'white',
      name: 'Green Line',
      status: 'Normal',
      nextTrain: '3 min',
      mainRoute: 'Assago Forum ↔ Gessate',
      branches: [
        'Assago Forum - Gessate',
        'Assago Forum - Cologno Nord'
      ],
      stations: [
        { name: 'Cadorna', crowding: 'Medium', facilities: ['wheelchair', 'parking'] },
        { name: 'Garibaldi', crowding: 'High', facilities: ['wheelchair', 'parking', 'bike'] }
      ]
    },
    {
      id: 'M3',
      color: '#FFDD00',
      textColor: 'black',
      name: 'Yellow Line',
      status: 'Normal',
      nextTrain: '1 min',
      mainRoute: 'Comasina ↔ San Donato',
      branches: [],
      stations: [
        { name: 'Duomo', crowding: 'High', facilities: ['wheelchair', 'parking'] }
      ]
    },
    {
      id: 'M4',
      color: '#0066CC',
      textColor: 'white',
      name: 'Blue Line',
      status: 'Normal',
      nextTrain: '4 min',
      mainRoute: 'Linate ↔ San Babila',
      branches: [],
      stations: [
        { name: 'Linate', crowding: 'Medium', facilities: ['wheelchair', 'parking'] }
      ],
      alerts: ['Limited service on weekends due to planned work']
    },
    {
      id: 'M5',
      color: '#A85BA7',
      textColor: 'white',
      name: 'Lilac Line',
      status: 'Normal',
      nextTrain: '2 min',
      mainRoute: 'Bignami ↔ San Siro',
      branches: [],
      stations: [
        { name: 'San Siro', crowding: 'High', facilities: ['wheelchair', 'parking'] }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'bg-green-100 text-green-800';
      case 'Delayed': return 'bg-yellow-100 text-yellow-800';
      case 'Disrupted': return 'bg-red-100 text-red-800';
      case 'Planned Work': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCrowdingIcon = (level: string) => {
    switch (level) {
      case 'Low': return '●';
      case 'Medium': return '●●';
      case 'High': return '●●●';
      default: return '○';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold flex items-center text-gray-800">
          <Train className="mr-3 text-blue-600" />
          Metro Status
        </h2>
        <div className="text-right text-sm text-gray-600">
          <Clock className="inline mr-1 h-4 w-4" />
          Last updated: {new Date().toLocaleTimeString('it-IT')}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {metroLines.map((line) => (
          <Card 
            key={line.id}
            className={`overflow-hidden transition-all duration-300 ${
              selectedLine === line.id ? 'col-span-full' : ''
            }`}
          >
            <button
              onClick={() => setSelectedLine(selectedLine === line.id ? null : line.id)}
              className="w-full text-left"
            >
              <div 
                className="p-4 flex items-center justify-between"
                style={{ backgroundColor: line.color, color: line.textColor }}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl font-bold">{line.id}</div>
                  <div className="text-sm opacity-90">{line.name}</div>
                </div>
                <ChevronRight 
                  className={`h-5 w-5 transition-transform ${
                    selectedLine === line.id ? 'rotate-90' : ''
                  }`}
                />
              </div>
            </button>

            <div className="p-4 bg-white">
              <div className="flex justify-between items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(line.status)}`}>
                  {line.status}
                </span>
                <span className="text-gray-600">
                  Next train: <span className="font-bold">{line.nextTrain}</span>
                </span>
              </div>

              {selectedLine === line.id && (
                <div className="space-y-4 pt-2">
                  {line.alerts && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                        <div className="text-sm text-yellow-700">{line.alerts[0]}</div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Route Information</h3>
                    <div className="text-sm text-gray-600">
                      <div>{line.mainRoute}</div>
                      {line.branches.map((branch, index) => (
                        <div key={index} className="text-gray-500 ml-4">
                          • {branch}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-700">Major Stations</h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowStations(!showStations);
                        }}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        {showStations ? 'Hide Details' : 'Show Details'}
                      </button>
                    </div>
                    {showStations && (
                      <div className="mt-2 space-y-2">
                        {line.stations.map((station, index) => (
                          <div 
                            key={index}
                            className="p-2 bg-gray-50 rounded flex justify-between items-center"
                          >
                            <div>
                              <div className="font-medium text-gray-800">{station.name}</div>
                              <div className="text-sm text-gray-500">
                                {station.facilities.join(' • ')}
                              </div>
                            </div>
                            <div className="text-sm">
                              Crowding: 
                              <span className={`ml-2 ${
                                station.crowding === 'High' ? 'text-red-500' :
                                station.crowding === 'Medium' ? 'text-yellow-500' : 'text-green-500'
                              }`}>
                                {getCrowdingIcon(station.crowding)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}