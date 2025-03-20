'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BackgroundPattern } from './BackgroundPattern';

export const CatalogSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <section className="relative">
      <BackgroundPattern>
        {isMobile ? (
          // Mobile version


          <div className="px-4 py-8">
            <Image
              src="/home/fans-catalog-new.png"
              alt="Fans Catalog - Mobile"
              width={1000}
              height={1000}
              className="w-full rounded-lg shadow-md"
            />
          </div>
        ) : (
          // Desktop version
          <div className="container mx-auto px-4 py-16">
            <div className="w-full">
              <Image
                src="/home/download-catalog.png"
                alt="Fans Catalog - Desktop"
                width={1000}
                height={1000}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}
      </BackgroundPattern>
    </section>
  );
}; 