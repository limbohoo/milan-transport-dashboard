'use client';

import React, { useState, useEffect } from 'react';

interface NewsItem {
  en: string;
  it: string;
  zh: string;
}

export function NewsHeader() {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'it' | 'zh'>('en');
  const [isHovered, setIsHovered] = useState(false);

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

  // Auto rotate news unless hovered
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentNewsIndex((prev) => (prev + 1) % breakingNews.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, breakingNews.length]);

  // Create combined news text with all languages
  const getCombinedNewsText = (newsItem: NewsItem) => {
    return `${newsItem.it} | ${newsItem.en} | ${newsItem.zh}`;
  };

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 py-8 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header with Live indicator and language selector */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse mr-3" />
            <span className="font-bold text-3xl tracking-wide">LIVE NEWS</span>
          </div>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as 'en' | 'it' | 'zh')}
            className="bg-red-700 text-white border border-red-400 rounded-lg px-4 py-2 text-lg 
                     focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
          >
            <option value="en">English</option>
            <option value="it">Italiano</option>
            <option value="zh">中文</option>
          </select>
        </div>

        {/* News ticker */}
        <div 
          className="relative overflow-hidden h-16 rounded-lg bg-red-700/30 backdrop-blur-sm"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Current news */}
          <div className="h-full flex items-center px-6">
            <div className="text-2xl font-medium whitespace-nowrap animate-marquee">
              {getCombinedNewsText(breakingNews[currentNewsIndex])}
            </div>
          </div>

          {/* Progress bar */}
          {!isHovered && (
            <div className="absolute bottom-0 left-0 h-1 bg-white/20 w-full">
              <div 
                className="h-full bg-white/60 transition-all duration-100"
                style={{ 
                  wi