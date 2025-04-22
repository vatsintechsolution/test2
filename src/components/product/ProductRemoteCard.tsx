'use client';

import Image from 'next/image';
import { FC, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export interface ProductRemoteCardProps {
  title: string;
  description: string;
  className?: string;
  priority?: boolean;
}

export const ProductRemoteCard: FC<ProductRemoteCardProps> = ({
  title,
  description,
  className = '',
  priority = false,
}) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Setup observer to watch for class changes on the html element
  useEffect(() => {
    setMounted(true);
    
    // Initial check
    const htmlElement = document.documentElement;
    setIsDark(htmlElement.classList.contains('dark'));
    
    // Set up observer for class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(htmlElement.classList.contains('dark'));
        }
      });
    });
    
    observer.observe(htmlElement, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  if (!mounted) return null;

  const imageSrc = isDark ? '/home/dark-remote-feat.png' : '/home/light-remote-feat.png';

  return (
    <motion.div 
      className={`rounded-2xl overflow-hidden shadow-lg relative aspect-square ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image 
          src={imageSrc}
          alt="RF Remote Control"
          fill
          priority={priority}
          className="object-cover"
        />
      </div>

      {/* Text Content Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 lg:p-4 bg-gradient-to-t from-black/80 to-transparent z-10">
        <div className="text-center">
          <h3 className="text-xl md:text-3xl font-medium mb-2 text-white">{title}</h3>
          <p className="text-sm md:text-xl text-white/90">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}; 