"use client";

import { HeroSwiper } from "@/components/hero/HeroSwiper";
import { DesktopHeroSwiper } from "@/components/hero/DesktopHeroSwiper";
import { ProductCard } from "@/components/fans/ProductCard";
import { FAQItem } from "@/components/FAQItem";
import { useState, useEffect } from "react";

import { Footer } from "@/components/footer/Footer";
import { WhyChooseSection } from "@/components/WhyChooseSection";
import { CatalogSection } from "@/components/CatalogSection";
import { DigiShieldSection } from "@/components/DigiShieldSection";
import { ProductEnergyCard } from '@/components/product/ProductEnergyCard';

export default function Home() {
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

  const features = [
    {
      icon: "/home/icons/premium.svg",
      text: "PREMIUM AESTHETIC",
    },
    {
      icon: "/home/icons/air.svg",
      text: "SUPERIOR AIR DELIVERY",
    },
    {
      icon: "/home/icons/motor.svg",
      text: "100% COPPER MOTOR",
    },
  ];

  const heroSlides = [
    {
      desktopBg: "/home/AIroElevate Rosepink 2.png",
      mobileBg: "/home/slider-1.png",
      subheading: "ECOLINK AIROELEVATE",
      heading: "Unique Hollow Hub Design",
      buttonText: "Explore Product",
      buttonLink: "/products",
      features: features,
    },
    {
      desktopBg: "/home/AIroElevate Rosepink 2.png",
      mobileBg: "/home/slider-1.png",
      subheading: "ECOLINK AIROJEWEL",
      heading: "Premium Design with Power",
      buttonText: "Explore Product",
      buttonLink: "/products",
      features: features,
    },
    {
      desktopBg: "/home/AIroElevate Rosepink 2.png",
      mobileBg: "/home/slider-1.png",
      subheading: "ECOLINK AIROGEOMETRY",
      heading: "Modern Design Meets Efficiency",
      buttonText: "Explore Product",
      buttonLink: "/products",
      features: features,
    },
  ];

  const productFeatures = [
    {
      icon: "/home/icons/bldc.svg",
      text: "BLDC Technology",
    },
    {
      icon: "/home/icons/inverter.svg",
      text: "Premium Aesthetic",
    },
    {
      icon: "/home/icons/asthetics.svg",
      text: "2 Way Rotation",
    },
    {
      icon: "/home/icons/reverse.svg",
      text: "2 Way Rotation",
    },
  ];

  const bldcFans = [
    {
      name: "AiroElevate",
      price: 8000,
      image: "/home/product/AiroElevate.png",
      slug: "airoelevate"
    },
    {
      name: "Viroqua ",
      price: 8000,
      image: "/home/product/Viroqua.png",
      slug: "airojewel"
    },
    {
      name: "AiroJewel",
      price: 8000,
      image: "/home/product/AiroJewel.png",
      slug: "airojewel"
    },
    {
      name: "AiroGeometry",
      price: 8000,
      image: "/home/product/AiroGeometry.png",
      slug: "airogeometry"
    },
  ];

  const decorativeFans = [
    {
      name: "AiroZephyr",
      price: 8000,
      image: "/home/product/AiroZephyr.png",
      slug: "airozephyr"
    },
    {
      name: "AiroSerenada",
      price: 8000,
      image: "/home/product/AiroSerenada.png",
      slug: "airoserenada"
    },
    {
      name: "AiroSleek",
      price: 8000,
      image: "/home/product/AiroSleek.png",
      slug: "airosleek"
    },
    {
      name: "StarDust",
      price: 8000,
      image: "/home/product/StarDust.png",
      slug: "stardust"
    },
  ];

  const economyFans = [
    {
      name: "Vayu Pro (High)",
      price: 8000,
      image: "/home/product/vayupro.png",
      slug: "vayu-pro-high"
    },
    {
      name: "Vayu Pro",
      price: 8000,
      image: "/home/product/vayu-pro.png",
      slug: "vayu-pro"
    },
  ];

  const productFeaturesList = [
    {
      icon: "/home/icons/rotation.svg",
      title: "2-WAY ROTATION FOR SUMMER AND WINTER",
    },
    {
      icon: "/home/icons/point.svg",
      title: "POINT ANYWHERE RF REMOTE",
    },
    {
      icon: "/home/icons/turbo.svg",
      title: "TURBO MODE",
    },
    {
      icon: "/home/icons/timer.svg",
      title: "BUILT IN TIMER FOR 2, 4 AND 6 HOUR",
    },
    {
      icon: "/home/icons/copper.svg",
      title: "100% COPPER WINDING",
    },
    {
      icon: "/home/icons/speed.svg",
      title: "6 SPEED AIR FLOW",
    },
    {
      icon: "/home/icons/led.svg",
      title: "UNIQUE LED DISPLAY",
    },
    {
      icon: "/home/icons/energy.svg",
      title: "UP TO 50% ENERGY SAVING WITH BLDC MOTOR",
    },
  ];

  const faqs = [
    {
      question: "Q1: What types of fans are available?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Tristique id lacus a quam. Tortor ut in et orci feugiat duis elementum sapien. Adipiscing nascetur eu ut posuere consectetur. Maecenas id sed consequat gravida orci tristique.",

      isOpen: false,
    },
    {
      question: "Q2: What size fan is suitable for my room?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Tristique id lacus a quam. Tortor ut in et orci feugiat duis elementum sapien. Adipiscing nascetur eu ut posuere consectetur. Maecenas id sed consequat gravida orci tristique.",

      isOpen: false,
    },
    {
      question:
        "Q4: What is BLDC technology?",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Tristique id lacus a quam. Tortor ut in et orci feugiat duis elementum sapien. Adipiscing nascetur eu ut posuere consectetur. Maecenas id sed consequat gravida orci tristique.",
      isOpen: true,
    },
    {
      question:
        "Q5: How is BLDC technology different from older induction technology?",
      answer:
        "A: BLDC motors contain permanent magnets to generate EMF, whereas induction motors use electromagnetic induction. Permanent magnets generate less heat and use less energy compared to electromagnetic induction, making BLDC fans more efficient, quieter, and longer-lasting",
      isOpen: true,
    },
  ];

  

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleFaqClick = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <>
      <main className="mt-[-75px]">
        <div className="relative">
          {isMobile ? (
            <HeroSwiper slides={heroSlides} />
          ) : (
            <DesktopHeroSwiper slides={heroSlides} />
          )}
        </div>

        {/* BLDC Fans Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold section-heading  mb-8 text-center">
            Explore our BLDC Ceiling Fans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {bldcFans.map((fan, index) => (
              <ProductCard
                key={index}
                name={fan.name}
                features={productFeatures}
                price={fan.price}
                badgeImage="/home/icons/badge.png"
                productImage={fan.image}
                slug={fan.slug}
              />
            ))}
          </div>
        </section>

        {/* Decorative Fans Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold section-heading mb-8 text-center">
            Explore our Decorative Ceiling fans{" "}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {decorativeFans.map((fan, index) => (
              <ProductCard
                key={index}
                name={fan.name}
                features={productFeatures}
                price={fan.price}
                badgeImage="/home/icons/badge.png"
                productImage={fan.image}
                slug={fan.slug}
              />
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold section-heading mb-8 text-center">
            Explore our Economy Ceiling fans{" "}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {economyFans.map((fan, index) => (
              <ProductCard
                key={index}
                name={fan.name}
                features={productFeatures}
                price={fan.price}
                badgeImage="/home/icons/badge.png"
                productImage={fan.image}
                slug={fan.slug}
              />
            ))}
          </div>
        </section>

        <WhyChooseSection features={productFeaturesList} />

        <CatalogSection />

        <DigiShieldSection />

        {/* Energy Efficiency Feature */}
        <section className="w-full py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <ProductEnergyCard
              imageSrc="/home/product/AiroElevate.png" 
              iconSrc="/home/icons/inverter-energy.svg"
              title="Runs 3x longer on inverter"
              description="EcoLink AirElevate BLDC ceiling fan, features a powerful BLDC motor, maximizing energy savings and cooling performance."
              className="w-full max-w-md mx-auto"
              badgeText="RUN 3X LONGER ON INVERTER"
              priority={true}
            />
          </div>
        </section>

        <section className="my-8 px-8 max-w-[1000px] mx-auto">
          <h4 className="dark:text-white/90 text-[#3C3A53] text-center text-3xl font-bold mb-8 ">
            Answers to the frequently asked questions.
          </h4>

          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              {...faq}
              isOpen={openFaqIndex === index}
              onClick={() => handleFaqClick(index)}
            />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}
