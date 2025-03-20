'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export const DigiShieldSection = () => {
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
    <section className="relative bg-radial-purple dark:bg-radial-black py-8 md:py-16">
      <div className="container mx-auto">
        {isMobile ? (
          // Mobile version
          <div className="w-full px-4">
            <Image
              src="/home/digi-shield.png"
              alt="DigiShield Protection - Mobile"
              width={1000}
              height={1000}
              className="w-full rounded-lg shadow-md"
            />
          </div>
        ) : (
          // Desktop version
          <div className="w-full px-4">
            <Image
              src="/home/download.png"
              alt="DigiShield Protection - Desktop"
              width={1000}
              height={1000}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}; 