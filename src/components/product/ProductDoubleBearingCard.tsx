'use client';

import { FC } from 'react';
import { ProductFeatureCard } from './ProductExtraFeature';

interface ProductDoubleBearingCardProps {
  title: string;
  description: string;
  imageSrc: string;
  className?: string;
  priority?: boolean;
}

export const ProductDoubleBearingCard: FC<ProductDoubleBearingCardProps> = ({
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
      darkBgClass="dark:bg-gradient-to-b dark:from-[#384A55] dark:to-[#1A232A]"
      lightBgClass="bg-radial-teal"
    />
  );
}; 