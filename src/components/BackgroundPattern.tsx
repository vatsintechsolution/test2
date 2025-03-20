'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

interface BackgroundPatternProps {
  children: React.ReactNode
}

export const BackgroundPattern = ({ children }: BackgroundPatternProps) => {
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
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 w-full pointer-events-none " 
        style={{ 
          height: isMobile ? '413px' : '0px', 
          width: '100%' 
        }}
      >
        <div className="flex absolute left-[-20%] bottom-[-200px] w-[230%]">
          {/* Duplicate pattern for seamless appearance */}
          <Image
            src="/home/bg-dots.svg"
            alt=""
            width={1283}
            height={413}
            className="object-cover md:hidden "
          />
         
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
} 