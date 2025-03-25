'use client';

import Image from 'next/image';
import { FC } from 'react';
import { motion } from 'framer-motion';

export interface ProductFeatureCardProps {
  imageSrc: string;
  title: string;
  description: string;
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
  priority?: boolean;
  darkBgClass?: string;
  lightBgClass?: string;
}

export const ProductFeatureCard: FC<ProductFeatureCardProps> = ({
  imageSrc,
  title,
  description,
  className = '',
  imageWidth = 300,
  imageHeight = 300,
  priority = false,
  darkBgClass = 'dark:bg-radial-black',
  lightBgClass = 'bg-radial-purple',
}) => {
  return (
    <motion.div 
      className={`rounded-2xl overflow-hidden aspect-square md:aspect-auto shadow-lg ${className} ${lightBgClass} ${darkBgClass}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center p-6 text-center h-full">
        <div className="relative mb-4 flex-1 flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={title}
            width={imageWidth}
            height={imageHeight}
            priority={priority}
            className="object-contain lg:w-[450px] lg:h-[250px]"
          />
        </div>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-white dark:text-white">{title}</h3>
        <p className="text-sm md:text-base text-white dark:text-white/80">{description}</p>
      </div>
    </motion.div>
  );
};

// Example simplified version without animation for easier testing
export const SimpleProductFeatureCard: FC<ProductFeatureCardProps> = ({
  imageSrc,
  title,
  description,
  className = '',
  imageWidth = 300,
  imageHeight = 300,
  priority = false,
  darkBgClass = 'bg-radial-black',
  lightBgClass = 'bg-gradient-to-br from-slate-100 to-slate-200',
}) => {
  return (
    <div className={`rounded-2xl overflow-hidden shadow-lg ${className} ${lightBgClass} dark:${darkBgClass}`}>
      <div className="flex flex-col items-center p-6 text-center h-full">
        <div className="relative mb-4 flex-1 flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={title}
            width={imageWidth}
            height={imageHeight}
            priority={priority}
            className="object-contain"
          />
        </div>
        <h3 className="text-xl md:text-2xl font-bold mb-2 text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm md:text-base text-slate-700 dark:text-white/80">{description}</p>
      </div>
    </div>
  );
}; 