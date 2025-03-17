'use client';

import { useTheme } from '@/lib/ThemeProvider';

export function ThemeTest() {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="p-4 mb-8 rounded-lg border dark:border-white/10 border-gray-200">
      <h2 className="text-xl font-bold mb-4 dark:text-white text-black">Theme Test</h2>
      <p className="mb-4 dark:text-white/70 text-gray-800">
        Current theme: <span className="font-bold">{theme}</span>
      </p>
      <div className="flex gap-2">
        <button 
          onClick={() => setTheme('light')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Light
        </button>
        <button 
          onClick={() => setTheme('dark')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Dark
        </button>
        <button 
          onClick={() => setTheme('system')}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          System
        </button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg dark:bg-white/10 bg-gray-100 dark:text-white text-black">
          This is dark:bg-white/10 in dark mode and bg-gray-100 in light mode
        </div>
        <div className="p-4 rounded-lg dark:bg-gray-800 bg-white dark:text-white text-black border dark:border-white/10 border-gray-200">
          This is dark:bg-gray-800 in dark mode and bg-white in light mode
        </div>
      </div>
    </div>
  );
} 