'use client';

import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BackgroundPattern } from '../BackgroundPattern';

export interface ProductPremiumAestheticsCardProps {
  className?: string;
  priority?: boolean;
}

export const ProductPremiumAestheticsCard: FC<ProductPremiumAestheticsCardProps> = ({
  className = '',
  priority = false,
}) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Icons for the premium aesthetics
  const icons = [
    { name: 'premium-asthetics', alt: 'Premium Aesthetics' },
    { name: 'superior-air', alt: 'Superior Air Flow' },
    { name: 'copper-motor', alt: 'Copper Motor' },
    { name: 'turbo-motor', alt: 'Turbo Motor' }
  ];

  // Check for theme changes
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkTheme(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', checkTheme);
    
    // Observer for theme toggle changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkTheme();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', checkTheme);
      observer.disconnect();
    };
  }, []);

  const Content = (
    <div className="p-6 h-full flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-grow">
        {icons.map((icon) => (
          <div key={icon.name} className="flex flex-col items-center justify-center p-4 rounded-lg">
            <div className="relative h-16 w-full mb-3 flex items-center justify-center">
              <Image
                src={`/home/icons/${icon.name}.svg`}
                alt={icon.alt}
                width={80}
                height={40}
                priority={priority}
                className={`object-contain light-svg-fix invert-[1]`}
              />
            </div>
            <span className="text-sm text-slate-800 dark:text-slate-200 font-medium text-center">
              {icon.alt}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div 
      className={`rounded-2xl overflow-hidden shadow-lg ${className} bg-white dark:bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] dark:from-black dark:via-[#2E1914] dark:to-black`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {isDarkTheme ? (
        <BackgroundPattern>
          {Content}
        </BackgroundPattern>
      ) : (
        Content
      )}
    </motion.div>
  );
}; 