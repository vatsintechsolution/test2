'use client';

import Image from 'next/image';
import { FC } from 'react';
import { motion } from 'framer-motion';

export interface ProductSeasonCardProps {
  summerImage: string;
  winterImage: string;
  title: string;
  description: string;
  className?: string;
  priority?: boolean;
}

export const ProductSeasonCard: FC<ProductSeasonCardProps> = ({
  summerImage,
  winterImage,
  title,
  description,
  className = '',
  priority = false,
}) => {
  return (
    <motion.div 
      className={`rounded-2xl md:aspect-square  overflow-hidden shadow-lg ${className} bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))]

from-black
via-[#2E1914]
to-black`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col h-full p-2">
        {/* Top Text Content */}
        <div className="text-center mb-4 pt-2">
          <h3 className="text-2xl md:text-3xl font-medium mb-2 text-white">{title}</h3>
          <p className="text-base md:text-base text-white/90 max-w-md mx-auto">{description}</p>
        </div>

        {/* Summer/Winter Comparison */}
        <div className="flex flex-row md:flex-row  pt-4">
          {/* Summer Side */}
          <div className="flex-1 flex flex-col items-center border-r md:border-b-0 md:border-r border-white/90 pr-3 pb-4 md:pb-0 md:pr-4">
            <h4 className="text-xl font-bold text-white mb-3">SUMMER</h4> 
            <div className="relative h-32 w-full mb-3">
              <Image
                src={summerImage}
                alt="Summer mode fan"
                fill
                priority={priority}
                className="object-contain"
              />
              {/* Motion Arrows */}
             
            </div>
            <div className="text-center">
              <p className="text-xs text-white/70 mb-1">Anti Clock-Wise Rotation</p>
              <div className="flex flex-col items-center justify-center space-x-2 mb-2">
                <Image 
                  src="/home/icons/cold.svg" 
                  alt="Cool" 
                  className="py-4"
                  width={32} 
                  height={32}
                />
                <span className="text-white text-base">Cool Air Circulation in Summer</span>
              </div>
            </div>
          </div>

          {/* Winter Side */}
          <div className="flex-1 flex flex-col items-center  md:pt-0 md:pl-4">
            <h4 className="text-xl font-medium text-white mb-3">WINTER</h4>
            <div className="relative h-32 w-full mb-3">
              <Image
                src={winterImage}
                alt="Winter mode fan"
                fill
                priority={priority}
                className="object-contain"
              />
              {/* Motion Arrows */}
              
            </div>
            <div className="text-center">
              <p className="text-xs text-white/70 mb-1">Clock-Wise Rotation</p>
              <div className="flex flex-col items-center justify-center space-x-2 mb-2">
                <Image 
                  src="/home/icons/hot.svg" 
                  className="py-4"
                  alt="Warm" 
                  width={32} 
                  height={32}
                />
                <span className="text-white text-base">Hot Air Circulation in Winter</span>
              </div>  
             
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}; 