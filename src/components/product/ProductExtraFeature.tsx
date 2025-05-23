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
      className={`rounded-2xl overflow-hidden aspect-square shadow-lg ${className} ${lightBgClass} ${darkBgClass}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center p-6 md:px-10 md:pt-0 text-center justify-center h-full">
        <div className="relative mb-4 flex-1 md:mb-8 flex items-center ">
          <Image
            src={imageSrc}
            alt={title}
            width={imageWidth}
            height={imageHeight}
            priority={priority}
            className="object-cover lg:w-[450px] lg:h-[250px] scale-150 lg:scale-150"
            quality={100}
          />
        </div>
        <h3 className="text-lg md:text-2xl lg:text-3xl font-bold mb-2 text-white dark:text-white">{title}</h3>
        <p className="text-sm md:text-lg text-white dark:text-white/80">{description}</p>
      </div>
    </motion.div>
  );
};
