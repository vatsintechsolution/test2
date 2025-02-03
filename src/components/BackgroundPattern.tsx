'use client'

import Image from 'next/image'

interface BackgroundPatternProps {
  children: React.ReactNode
}

export const BackgroundPattern = ({ children }: BackgroundPatternProps) => {
  return (
    <div className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 w-full pointer-events-none" style={{ height: '413px', width: '1280px' }}>
        <div className="flex absolute left-[-20%]">
          {/* Duplicate pattern for seamless appearance */}
          <Image
            src="/home/bg-dots.svg"
            alt=""
            width={1283}
            height={413}
            className="object-contain"
          />
          <Image
            src="/home/bg-dots.svg"
            alt=""
            width={1283}
            height={413}
            className="object-contain"
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