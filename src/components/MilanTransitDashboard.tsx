'use client';

import React, { useState, useEffect } from 'react';
import { Train, Clock } from 'lucide-react';
import { Card } from './ui/card';

export function MilanTransitDashboard() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const breakingNews = [
    "Breaking: Major Cultural Festival Announced in Central Milan",
    "Update: New Metro Line Extension Project Approved",
    "Alert: International Tech Conference Coming to Milano",
  ];

  const [metroLines] = useState([
    { line: 'M1', color: 'bg-red-500', status: 'Normal', nextTrain: '2 min' },
    { line: 'M2', color: 'bg-green-500', status: 'Delayed', nextTrain: '4 min' },
    { line: 'M3', color: 'bg-yellow-500', status: 'Normal', nextTrain: '1 min' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNewsIndex((prev) => (prev + 1) % breakingNews.length);
      setCurrentTime(new Date());
    }, 5000);
    return () => clearInterval(interval);
  }, [breakingNews.length]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* News Ticker */}
      <div className="bg-red-600 p-4 text-white">
        <div className="max-w-6xl mx-auto flex items-center">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-2" />
          <span className="font-bold">BREAKING:</span>
          <span className="ml-2">{breakingNews[currentNewsIndex]}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 space-y-6">
        {/* Time */}
        <div className="text-right text-xl font-mono">
          <Clock className="inline mr-2" />
          {currentTime.toLocaleTimeString()}
        </div>

        {/* Metro Lines */}
        <div className="grid gap-4">
          <h2 className="text-2xl font-bold flex items-center">
            <Train className="mr-2" />
            Metro Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {metroLines.map(line => (
              <Card key={line.line} className="overflow-hidden">
                <div className={`${line.color} p-4 text-white`}>
                  <h3 className="text-lg font-semibold">Line {line.line}</h3>
                </div>
                <div className="p-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span>{line.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Next Train:</span>
                      <span>{line.nextTrain}</span>
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