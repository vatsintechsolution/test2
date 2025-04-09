'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

export type Theme = 'light' | 'dark' | 'system';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  setTheme: () => null,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem('theme') as Theme | null;
      if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
        setTheme(storedTheme);
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
      // Default to dark if localStorage fails
      setTheme('dark');
    }
    setMounted(true);
  }, []);

  // Apply theme changes
  useEffect(() => {
    if (!mounted) return;

    try {
      // Save theme preference to localStorage
      localStorage.setItem('theme', theme);

      // Apply theme class to document
      const root = document.documentElement;
      root.classList.remove('light', 'dark');

      // Always use dark theme for system preference
      if (theme === 'system') {
        root.classList.add('dark');
      } else {
        root.classList.add(theme);
      }
    } catch (error) {
      console.error('Error setting theme:', error);
      // Fallback to dark theme if error occurs
      document.documentElement.classList.add('dark');
    }
  }, [theme, mounted]);

  // System theme is always dark, no need to listen for changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;
    
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add('dark');
  }, [theme, mounted]);

  const value = {
    theme,
    setTheme,
  };

  // Avoid rendering with incorrect theme on first render
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);