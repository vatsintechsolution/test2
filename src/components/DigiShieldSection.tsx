'use client';

import Image from 'next/image';
import Link from 'next/link';
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

  const googlePlayLink = "https://play.google.com/store/apps/details?id=com.signify.signify_warranty";
  const appStoreLink = "https://apps.apple.com/in/app/digi-shield/id6480319068";

  return (
    <section className="relative py-8 md:py-16 overflow-hidden">
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
              src={isMobile ? "/home/digimobile.jpg" : "/home/digidesktop.jpg"}
              alt="DigiShield Background"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          {isMobile ? (
            // Mobile Layout
            <div className="relative z-10 min-h-[500px] px-5 py-12 flex flex-col justify-end items-center text-center">
             
              
              <h2 className="text-4xl font-bold text-white mb-2">
                Get 3+2 Year*
              </h2>
              <h3 className="text-4xl font-bold text-white mb-6">
                Extended Warranty
              </h3>
              
              <p className="text-white/80 mb-8 max-w-md">
                Activate extended product warranty with Signify DigiShield App.
              </p>
              
              <div className="flex space-x-4 mb-6">
                <Link href={googlePlayLink} target="_blank" rel="noopener noreferrer">
                  <Image 
                    src="/home/icons/android.svg" 
                    alt="Get it on Google Play" 
                    width={150} 
                    height={45}
                    className="h-12 w-auto"
                  />
                </Link>
                <Link href={appStoreLink} target="_blank" rel="noopener noreferrer">
                  <Image 
                    src="/home/icons/apple.svg" 
                    alt="Download on the App Store" 
                    width={150} 
                    height={45}
                    className="h-12 w-auto"
                  />
                </Link>
              </div>
              
            
            </div>
          ) : (
            // Desktop Layout
            <div className="relative min-h-[700px] z-10 flex flex-row w-full">
              <div className="w-1/2 px-12 py-16 flex flex-col justify-start">
                <h2 className="text-5xl font-bold text-white mb-2">
                  Get 3+2 Year*
                </h2>
                <h3 className="text-5xl font-bold text-white mb-8">
                  Extended Warranty
                </h3>
                
                <p className="text-white/80 mb-10 max-w-md text-lg">
                  Activate extended product warranty with Signify DigiShield App.
                </p>
                
                <div className="flex space-x-6 mb-10">
                  <Link href={googlePlayLink} target="_blank" rel="noopener noreferrer">
                    <Image 
                      src="/home/icons/android.svg" 
                      alt="Get it on Google Play" 
                      width={180} 
                      height={54}
                      className="h-14 w-auto"
                    />
                  </Link>
                  <Link href={appStoreLink} target="_blank" rel="noopener noreferrer">
                    <Image 
                      src="/home/icons/apple.svg" 
                      alt="Download on the App Store" 
                      width={180} 
                      height={54}
                      className="h-14 w-auto"
                    />
                  </Link>
                </div>
                
                
              </div>
              
              {/* Right side with image - empty div to maintain layout */}
              <div className="w-1/2"></div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}; 