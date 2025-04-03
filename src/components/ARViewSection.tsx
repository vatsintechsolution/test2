'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ARViewSectionProps {
  arLink: string;
}

export const ARViewSection = ({ arLink }: ARViewSectionProps) => {
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
    <section className="relative py-4 overflow-hidden">
      <div className="container mx-auto">
        <div 
          className={`
            w-full rounded-xl overflow-hidden relative
            ${isMobile ? 'flex flex-col' : 'flex flex-row'}
          `}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={isMobile ? "/home/ar-card-bg-mobile.png" : "/home/ar-bg-card-desktop.png"}
              alt="AR Background"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          {isMobile ? (
            // Mobile Layout
            <div className="relative z-10 min-h-[700px] px-5 py-12 flex flex-col justify-start items-start text-left">
              <h2 className="text-4xl font-bold text-white mb-2">
                Still Confused?
              </h2>
              <h3 className="text-2xl font-medium text-white mb-6">
                Experience EcoLink fan in your room!
              </h3>
              
              <Link 
                href={arLink}
                className="bg-white hover:bg-white/90 text-black py-3 px-8 rounded-full font-bold transition-all"
              >
                Try Now
              </Link>
            </div>
          ) : (
            // Desktop Layout
            <div className="relative min-h-[700px] z-10 flex flex-row w-full">
              {/* Left side - empty div to maintain layout */}
              <div className="w-1/2"></div>
              
              {/* Right side with content */}
              <div className="w-1/2 px-12 py-16 flex flex-col justify-end">
                <h2 className="text-[70px] font-medium text-right text-white mb-2">
                  Still Confused?
                </h2>
                <h3 className="text-3xl text-right font-medium text-white mb-8">
                  Experience EcoLink fan in your room!
                </h3>
                
                <div className="flex justify-end">
                  <Link 
                    href={arLink}
                    className="bg-white hover:bg-white/90 text-black py-3 px-8 rounded-full font-bold w-40 text-center transition-all"
                  >
                    Try Now
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}; 