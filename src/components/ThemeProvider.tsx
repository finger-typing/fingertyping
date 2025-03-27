'use client';

import { useEffect } from 'react';
import { useApp } from '@/context/AppContext';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { darkMode, setDarkMode } = useApp();

  useEffect(() => {
    // Check localStorage and system preference on mount
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialDarkMode = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    // Update context state
    setDarkMode(initialDarkMode);
  }, [setDarkMode]);

  useEffect(() => {
    // Update DOM and localStorage when darkMode changes
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return children;
}