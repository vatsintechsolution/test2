'use client';

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Feature {
  icon: string
  text: string
}

interface ProductCardProps {
  name: string
  features: Feature[]
  price: number
  badgeImage: string
  productImage: string
  backgroundImage?: string
  slug?: string
}

export const ProductCard = ({
  name,
  features,
  price,
  badgeImage,
  productImage,
  backgroundImage = '/home/fans-bg-upscaled.png',
  slug
}: ProductCardProps) => {
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

  const productUrl = `/products/${slug || name.toLowerCase().replace(/\s+/g, '-')}`;


// Change: Need to darken the gradient for Features visibility 

// Font and line heigh to be reduced for mobile version of product name 

  return (
    <Link href={productUrl} className="block">
      <div className="relative overflow-hidden rounded-xl group">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 lg:scale-x-[2]">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {slug?.includes('smart') && (
          <>
            <div className="absolute inset-0 z-1 w-20 h-20 top-0 left-2 lg:hidden">
              <Image
                src={'/home/wiz-banner-icon.svg'}
                alt=""
                fill
                className=""
              />
            </div>

            <div className="absolute z-1 w-20 h-20 top-0 right-2 hidden lg:block">
              <Image
                src={'/home/wiz-banner-icon.svg'}
                alt=""
                fill
                className=""
              />
            </div>
          </>
        )}

        {/* Card Content with Background Overlay */}
        <div className="relative z-10 rounded-lg overflow-hidden">
          {/* Add top-to-bottom gradient overlay */}
          
          {isMobile ? (
            // Mobile Layout
            <>
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black z-[1]"></div>

              {/* Product Image */}
              <div className="relative h-64 w-[80vw] m-auto">
                <Image
                  src={productImage}
                  alt={name}
                  fill
                  className="object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-4 relative z-[2]">
                {/* Features - Centered with 4 items */}
                <div className="flex justify-center items-center gap-0 mb-4">
                  {features.slice(0, 4).map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center w-1/4"
                      role="img"
                      aria-label={feature.text}
                    >
                      <Image
                        src={feature.icon}
                        alt=""
                        width={68}
                        height={71}
                        className=""
                      />
                      <span className="sr-only">{feature.text}</span>
                    </div>
                  ))}
                </div>

                {/* Product Name and Price */}
                <div className="flex items-end justify-between mb-2">
                  <div className='grow'>
                    <h3 className="text-[18px] font-medium leading-6 text-white mb-1">{name}</h3>
                    <div className="flex items-center gap-1 text-[16px]">
                      <span className="text-neutral-400">MRP</span>
                      <span className="font-semibold text-white">₹{price.toLocaleString()}</span>
                    </div>
                    {/* <p className="text-[#7D7D7D] text-[7px] mb-6">Lorem Ipsum Dolor Sit Amet</p> */}

                  </div>

                  {/* Badge Image */}
                  <div className="relative w-32 h-10">
                    <Image
                      src={badgeImage}
                      alt="Rating"
                      fill
                      className="object-contain"
                    />
                  </div>
                  
                  {/* Arrow Link */}
                  <Link 
                    href={productUrl}
                    className="inline-flex items-center justify-center w-8 h-8 
                              rounded-full transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <svg 
                      className="w-6 h-6 text-white transform rotate-[-30deg]" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M14 5l7 7m0 0l-7 7m7-7H3" 
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </>
          ) : (
            // Desktop Layout
            <div className="flex flex-col h-full min-h-[400px] bg-gradient-to-r from-[#e9e9e9]/10 to-[#f5f5f5]/10">
              {/* Add gradient overlay for desktop as well */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 z-[-1]"></div>
              
              {/* Content and image in flex row */}
              <div className="flex flex-row flex-grow relative z-[2]">
                {/* Content at the left */}
                <div className="p-8 w-1/2 flex flex-col justify-start text-[#383838]">
                  <h3 className="text-[28px] font-medium  mb-1">{name}</h3>
                  <div className="flex items-center gap-1 text-[16px] mb-4">
                    <span className="">MRP</span>
                    <span className="font-semibold ">₹{price.toLocaleString()}</span>
                  </div>
                  
                  {/* <p className="text-[#383838] text-sm mb-6">Lorem Ipsum Dolor Sit Amet</p> */}
                  
                  <Link 
                    href={productUrl}
                    className="inline-block bg-[#50287A] hover:bg-[#3D1E5E] text-white py-2 px-6 rounded-md transition-all duration-300 w-fit"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Learn More
                  </Link>
                </div>
                
                {/* Product Image on the right */}
                <div className="relative w-1/2">
                  <Image
                    src={productImage}
                    alt={name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105 p-4"
                  />
                </div>
              </div>
              
              {/* Features at the bottom */}
              <div className="mt-auto p- relative w-[70%] pl-4 pb-2">
                <div className="flex justify-start items-center px-4">
                  {features.slice(0, 4).map((feature, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center"
                      role="img"
                      aria-label={feature.text}
                    >
                      <Image
                        src={feature.icon}
                        alt=""
                        width={80}
                        height={60}
                        className=""
                      />
                      <span className="text-white/70 text-xs mt-1 sr-only">{feature.text}</span>
                    </div>
                  ))}
                </div>
                
                {/* Badge Image - positioned in bottom right corner */}
                <div className="absolute bottom-0 right-[-120px] w-36 h-36 translate-y-1/4 translate-x-1/4">
                  <Image
                    src={badgeImage}
                    alt="Rating"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
} 