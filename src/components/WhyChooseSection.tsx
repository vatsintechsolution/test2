'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface Feature {
  icon: string;
  title: string;
}

interface WhyChooseSectionProps {
  features: Feature[];
}

export const WhyChooseSection = ({ features }: WhyChooseSectionProps) => {
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
    <section className="bg-radial-purple dark:bg-radial-black relative overflow-hidden">
      {/* Green accent circle - visible on both layouts */}
      
      {isMobile ? (
        // Mobile Layout
        <div className='bg-[#170D0B]'>
          <Image
            src="/home/why-choose.png"
            alt="Why Choose EcoLink"
            width={1000}
            height={1000}
            className="w-full"
          />
          <div className="dark:text-white/70 text-[#3C3A53] px-6 py-8 leading-[154%] text-sm">
            <p>
              EcoLink, a global brand from the house of Signify in
              technologically advanced home luminaires, has been illuminating
              spaces with advanced and affordable luminaires. Beyond lighting,
              EcoLink now breezes into homes, offering innovative, reliable and
              award winning ceiling fans, fulfilling its vision of comfort and
              illumination. EcoLink&apos;s luminaires and fans are engineered to
              be durable, ensuring homes stay bright and breezy, with
              long-lasting, efficient products that complement any budget!
            </p>

            <p className="pt-6">
              Powered by cutting-edge BLDC inverter technology, EcoLink fans
              save up to 55% on energy expenditures, while offering modern
              features like superior air delivery and high-powered motor. These
              unique designs are carefully crafted with Indian homes in mind,
              effortlessly complementing any budget and decor of your choosing.
              Experience EcoLink&apos;s visionary cooling solutions for a breath
              of fresh air in any space.
            </p>
          </div>
<div className='relative'>

<Image
            src="/home/motor-bg-lines.png"
            alt="Remote Control"
            width={1000}
            height={1000}
            className="absolute top-0 left-0"
          />

<Image
            src="/home/motor-mobile.png"
            alt="Remote Control"
            width={1000}
            height={1000}
            className="mt-[20px] mb-[25px]"
          />

</div>
         
          {/* Features Section - Mobile */}
          <section className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start text-left space-y-4"
                >
                  <div className="rounded-full items-start justify-start">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={48}
                      height={48}
                      className="w-14 h-14"
                    />
                    
                  </div>
                  <h3 className="dark:text-white/70 text-[#3C3A53] font-medium text-base tracking-wider">
                    {feature.title}
                  </h3>
                </div>
              ))}
            </div>
          </section>
          
          {/* BLDC Savings Banner - Mobile */}
          <div className="bg-[#4A2570] text-white p-6 hidden md:block">
            <div className="border-l-4 border-[#5FD068] pl-4">
              <h3 className="text-xl font-medium mb-2">BLDC Ceiling Fans Save up to</h3>
              <p className="text-4xl font-bold">55% on your electricity bill</p>
            </div>
          </div>
        </div>
      ) : (
        // Desktop Layout

        <div className='relative'>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border-[40px] border-[#5FD068]/20 -translate-y-1/2 translate-x-1/2 z-10"></div>
                <div className="container mx-auto py-16">
          <div className="flex flex-col md:flex-row">
            {/* Left Column - Title and Fan Image */}
            <div className="w-full md:w-2/5 relative">
              <div className="pr-8 pl-4 pb-8">
                <h2 className="text-6xl font-bold dark:text-white text-white mb-8">
                  Why choose<br />
                  EcoLink Ceiling<br />
                  fans?
                </h2>
                
                <div className="relative h-[500px] w-full">
                  <Image
                    src="/home/why-choose-desktop.png"
                    alt="EcoLink Ceiling Fan"
                    fill
                    className="object-cover scale-125 -ml-10"
                  />
                </div>
                
                {/* BLDC Savings Banner - Desktop */}
                <div className="mt-8 bg-[#4A2570] text-white p-6 rounded-md">
                  <div className="border-l-4 border-[#5FD068] pl-4">
                    <h3 className="text-xl font-medium mb-2">BLDC Ceiling Fans Save up to</h3>
                    <p className="text-4xl font-bold">55% on your electricity bill</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Text and Features */}
            <div className="w-full md:w-3/5 pl-10 pr-10">
              <div className="dark:text-white/70 text-[white] leading-[154%] text-base mb-10">
                <p className="mb-6">
                  EcoLink, a global brand from the house of Signify in technologically advanced
                  home luminaires, has been illuminating spaces with advanced and affordable
                  luminaires. Beyond lighting, EcoLink now breezes into homes, offering
                  innovative, reliable and award winning ceiling fans, fulfilling its vision of comfort
                  and illumination. EcoLink&apos;s luminaires and fans are engineered to be durable,
                  ensuring homes stay bright and breezy, with long-lasting, efficient products that
                  complement any budget!
                </p>
                
                <p>
                  Powered by cutting-edge BLDC inverter technology, EcoLink fans save up to
                  55% on energy expenditures, while offering modern features like superior air
                  delivery and high-powered motor. These unique designs are carefully crafted
                  with Indian homes in mind, effortlessly complementing any budget and decor
                  of your choosing. Experience EcoLink&apos;s visionary cooling solutions for a breath
                  of fresh air in any space.
                </p>
              </div>
              
              {/* Fan Components Image */}
              <div className="relative h-[300px] w-[80%] m-auto mb-12">
                <Image
                  src="/home/motor.png"
                  alt="Fan Components"
                  fill
                  className=" object-cover"
                />
              </div>
              
              {/* Features Grid - Desktop */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {features.slice(0, 8).map((feature, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start text-left"
                  >
                    <div className="mb-2">
                      <Image
                        src={feature.icon}
                        alt={feature.title}
                        width={64}
                        height={64}
                        className="w-16 h-16"
                      />
                    </div>
                    <h3 className="text-white/70  text-xs font-medium tracking-wider px-2">
                      {feature.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        </div>
      
      )}
    </section>
  );
}; 