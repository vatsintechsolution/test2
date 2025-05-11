'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useEffect, useState, useRef } from 'react';

interface Feature {
  icon: string;
  text: string;
}

interface Slide {
  desktopBg?: string;
  subheading: string;
  heading: string;
  buttonText: string;
  buttonLink: string;
  features?: Feature[] | null;
}

interface DesktopHeroSwiperProps {
  slides: Slide[];
}

export function DesktopHeroSwiper({ slides }: DesktopHeroSwiperProps) {
  // Calculate height based on aspect ratio and viewport width
  const [sliderHeight, setSliderHeight] = useState('calc(100vh - 75px)');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateHeight = () => {
      // Original image aspect ratio: 6000 / 3805 ≈ 1.577
      const aspectRatio = 6000 / 3805;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate height based on aspect ratio
      let calculatedHeight = viewportWidth / aspectRatio;
      
      // Ensure the height doesn't exceed viewport height minus header (75px)
      const maxHeight = viewportHeight - 75;
      calculatedHeight = Math.min(calculatedHeight, maxHeight);
      
      // Ensure minimum height for smaller screens
      calculatedHeight = Math.max(calculatedHeight, 500);
      
      // Set the final height
      setSliderHeight(`${calculatedHeight}px`);
    };

    // Initial calculation
    calculateHeight();
    
    // Recalculate on resize
    window.addEventListener('resize', calculateHeight);
    
    return () => {
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  // Add class to body to help with full-width slider
  useEffect(() => {
    document.body.classList.add('has-fullwidth-slider');
    
    return () => {
      document.body.classList.remove('has-fullwidth-slider');
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full desktop-hero-swiper overflow-hidden" 
      style={{ height: sliderHeight }}
    >
      {/* Green accent circle */}
      {/* <div className="absolute top-0 right-0 w-[500px] h-[600px] rounded-full border-[20px] border-[#5FD068]/20 -translate-y-1/2 translate-x-1/2 z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[600px] rounded-full border-[20px] border-[#5FD068]/20 translate-y-1/2 -translate-x-1/2 z-10"></div>
       */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        loop={true}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="w-full h-full">
            {!slide.heading ? (
              // Full-scale background image only when there's no heading
              <div className="relative w-full h-full">
                {slide.buttonLink ? (
                  <Link href={slide.buttonLink} className="block w-full h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src={slide.desktopBg || "/home/slider-1.png"}
                        alt="Slide background"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                        quality={90}
                      />
                    </div>
                  </Link>
                ) : (
                  <Link href={'#'} className="block w-full h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src={slide.desktopBg || "/home/slider-1.png"}
                        alt="Slide background"
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover object-center"
                        quality={90}
                      />
                    </div>
                  </Link>
                )}
              </div>
            ) : (
              // Regular content slide with heading and content
              <div className="relative w-full h-full">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={slide.desktopBg || "/home/slider-1.png"}
                    alt={slide.heading}
                    fill
                    sizes="100vw"
                    priority
                    className="z-0 object-cover object-center"
                    quality={90}
                  />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 bg-black/20 w-full h-full">
                  <div className="container mx-auto flex flex-col md:flex-row items-center h-full px-4">
                    {/* Left Content */}
                    <div className="w-full md:w-1/2 py-8 md:py-16 flex flex-col justify-center">
                      <div className="max-w-xl mx-auto md:mx-0 space-y-6 md:space-y-10">
                        <p className="text-[#fff] tracking-[0.2em] mb-2 text-lg md:text-xl font-medium">{slide.subheading}</p>
                        <h1 className="text-[#fff] text-4xl md:text-5xl lg:text-[68px] leading-tight lg:leading-[72px] font-bold mb-4 md:mb-6">{slide.heading}</h1>
                        
                        {slide.buttonText && slide.buttonLink && (
                          <Link 
                            href={slide.buttonLink}
                            className="inline-block bg-white hover:bg-white/90 text-[#50287A] py-2 md:py-3 px-6 md:px-8 font-medium rounded-md transition-all duration-300 mb-8 md:mb-12"
                          >
                            {slide.buttonText}
                          </Link>
                        )}
                        
                        {slide.features && (
                          <div className="flex flex-wrap items-center gap-4 md:gap-8">
                            {slide.features.map((feature, idx) => (
                              <div key={idx} className="flex flex-col items-center">
                                <Image 
                                  src={feature.icon} 
                                  alt={feature.text} 
                                  width={300} 
                                  height={100}
                                  className="mb-2 w-auto md:w-96"
                                />
                                <span className="text-white/70 text-xs text-center sr-only">{feature.text}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Right side - empty to maintain layout */}
                    <div className="w-full md:w-1/2" />
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Navigation Arrows */}
      <button className="swiper-button-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-colors">
      </button>
      <button className="swiper-button-next absolute right-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-colors">
      </button>
      {/* Custom Pagination */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeIndex === index ? 'bg-white scale-125' : 'bg-white/40'
            }`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}
    </div>
  );
} 