'use client';

import { FC } from 'react';
import { ProductFeatureCard } from './ProductExtraFeature';

interface ProductRobustMotorCardProps {
  title: string;
  description: string;
  imageSrc: string;
  className?: string;
  priority?: boolean;
}

export const ProductRobustMotorCard: FC<ProductRobustMotorCardProps> = ({
  title,
  description,
  imageSrc,
  className = '',
  priority = false,
}) => {
  return (
    <ProductFeatureCard
      imageSrc={imageSrc}
      title={title}
      description={description}
      imageWidth={450}
      imageHeight={300}
      className={`md:min-h-[300px] ${className}`}
      priority={priority}
      darkBgClass="dark:bg-gradient-to-b dark:from-[#573A27] dark:to-[#2A1B12]"
      lightBgClass="bg-radial-amber"
    />
  );
}; 