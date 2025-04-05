'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const WizAppSection = () => {
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
              src={isMobile ? "/home/wiz-bg.png" : "/home/wiz-desktop-bg.jpg"}
              alt="DigiShield Background"
              fill
              className="object-cover "
            />
          </div>

          {/* Content */}
          {isMobile ? (
            // Mobile Layout
            <div className="relative z-10 min-h-[500px] px-5 py-12 flex flex-col justify-end items-center text-center">
             
              
              <h2 className="text-2xl font-bold text-white mb-2">
                Get 3+2 Year*
              </h2>
              <h3 className="text-2xl font-bold text-white mb-2">
                Extended Warranty
              </h3>
              
              <p className="text-white/80 mb-2 max-w-md">
              Activate extended product warranty with Signify Wiz App.
              </p>
              
              <div className="flex space-x-4 mb-2">
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
                              <div className="w-1/2"></div>

              <div className="w-1/2 px-12 py-16 flex flex-col justify-center">

              <Image 
                    src="/home/icons/wiz.svg" 
                    alt="Download on the App Store" 
                    width={150} 
                    height={45}
                    className="h-16 w-auto mx-auto absolute top-10 right-10"
                  />

                <h2 className="text-5xl font-bold text-white mb-2 text-center">
                  Get 3+2 Year*
                </h2>
                <h3 className="text-5xl font-bold text-white mb-8 text-center">
                  Extended Warranty
                </h3>
                
                <p className="text-white/80 mb-10  text-lg text-center">
                Activate extended product warranty with Signify Wiz App.
                </p>
                
                <div className="flex space-x-6 mb-10 justify-center">
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
}; 