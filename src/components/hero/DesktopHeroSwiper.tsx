'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
  // const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full desktop-hero-swiper overflow-hidden">
      {/* Green accent circle */}
      <div className="absolute top-0 right-0 w-[500px] h-[600px] rounded-full border-[20px] border-[#5FD068]/20 -translate-y-1/2 translate-x-1/2 z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[600px] rounded-full border-[20px] border-[#5FD068]/20 translate-y-1/2 -translate-x-1/2 z-10"></div>
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        // onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            {!slide.heading ? (
              // Full-scale background image only when there's no heading
              <div className="relative w-full min-h-[850px]">
                <Image
                  src={slide.desktopBg || "/home/slider-1.png"}
                  alt="Slide background"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            ) : (
              // Regular content slide with heading and content
              <div className="bg-radial-purple dark:bg-radial-black min-h-[90vh] container mx-auto flex flex-col md:flex-row items-center">
                {/* Left Content */}
                <div className="w-full md:w-1/2  py-16 flex flex-col justify-center">
                  <div className="max-w-xl mx-auto md:mx-0 space-y-10">
                    <p className="text-white/70 tracking-widest mb-2 uppercase">{slide.subheading}</p>
                    <h1 className="text-white text-4xl md:text-6xl font-medium mb-6">{slide.heading}</h1>
                    
                    {slide.buttonText && slide.buttonLink && (
                      <Link 
                        href={slide.buttonLink}
                        className="inline-block bg-white hover:bg-white/90 text-[#50287A] py-3 px-8 font-medium rounded-md transition-all duration-300 mb-12"
                      >
                        {slide.buttonText}
                      </Link>
                    )}
                    
                    {slide.features && (
                      <div className="flex items-center space-x-8">
                        {slide.features.map((feature, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <Image 
                              src={feature.icon} 
                              alt={feature.text} 
                              width={200} 
                              height={70}
                              className="mb-2"
                            />
                            <span className="text-white/70 text-xs text-center sr-only">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Right Image */}
                <div className="w-full md:w-1/2 relative h-[50vh] md:h-[90vh] flex items-center justify-center">
                  <div className="relative w-[90%] h-[90%]">
                    <Image
                      src={slide.desktopBg || "/home/slider-1.png"}
                      alt={slide.heading}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority
                      className="drop-shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      
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