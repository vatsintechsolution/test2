'use client';

import { FC } from 'react';
import { ProductFeatureCard } from './ProductExtraFeature';

interface ProductAirDeliveryCardProps {
  title: string;
  description: string;
  imageSrc: string;
  className?: string;
  priority?: boolean;
}

export const ProductAirDeliveryCard: FC<ProductAirDeliveryCardProps> = ({
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
      darkBgClass="dark:bg-gradient-to-b dark:from-[#6E4427] dark:to-[#2B1D12]"
      lightBgClass="bg-radial-blue"
    />
  );
}; 