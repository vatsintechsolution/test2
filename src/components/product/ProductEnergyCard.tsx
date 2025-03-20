'use client';

import Image from 'next/image';
import { FC } from 'react';
import { motion } from 'framer-motion';

export interface ProductEnergyCardProps {
  imageSrc: string;
  iconSrc: string;
  title: string;
  description: string;
  className?: string;
  badgeText?: string;
  priority?: boolean;
}

export const ProductEnergyCard: FC<ProductEnergyCardProps> = ({
  imageSrc,
  iconSrc,
  title,
  description,
  className = '',
  badgeText = 'RUN 3X LONGER ON INVERTER',
  priority = false,
}) => {
  return (
    <motion.div 
      className={`rounded-2xl  aspect-square  overflow-hidden shadow-lg ${className} bg-gradient-to-br from-amber-950 to-[#2E1914]`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col h-full p-6">
        {/* Top Text Content */}
        <div className="text-center mb-6">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">{title}</h3>
          <p className="text-sm md:text-base text-white/90 max-w-xs mx-auto">{description}</p>
        </div>

        {/* Product Image */}
        <div className="flex">
        <div className="flex-1 flex w-3/4 items-center justify-center mb-6">
          <Image
            src={imageSrc}
            alt={title}
            width={300}
            height={300}
            priority={priority}
            className="object-contain"
          />
        </div>
        
        {/* Bottom Icon with Text */}
        <div className="self-end w-1/4 flex flex-col items-center">
          <Image 
            src={iconSrc} 
            alt="Energy Icon"
            width={40}
            height={40}
            className="mb-2"
          />
          <span className="text-xs text-center text-yellow-400 uppercase">{badgeText}</span>
        </div>
        </div>
      </div>
    </motion.div>
  );
}; 