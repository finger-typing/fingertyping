"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextType {
  language: string;
  setLanguage: (lang: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  customTime: number;
  customText: string;
  onCustomTextSubmit: (text: string) => void;
  onCustomTimeSubmit: (time: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('English');
  const [darkMode, setDarkMode] = useState(true);
  const [customTime, setCustomTime] = useState(60);
  const [customText, setCustomText] = useState('');

  const onCustomTextSubmit = (text: string) => {
    setCustomText(text);
  };

  const onCustomTimeSubmit = (time: number) => {
    setCustomTime(time);
  };

  const value = {
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    customTime,
    customText,
    onCustomTextSubmit,
    onCustomTimeSubmit,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
} 