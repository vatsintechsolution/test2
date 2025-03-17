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
      image: "/home/fan-design.png",
      slug: "airoelevate"
    },
    {
      name: "AiroJewel",
      price: 8000,
      image: "/home/product/AIroElevate-Rosepink-25.png",
      slug: "airojewel"
    },
    {
      name: "AiroGeometry",
      price: 8000,
      image: "/home/product/AIroElevate-Rosepink-25.png",
      slug: "airogeometry"
    },
  ];

  const decorativeFans = [
    {
      name: "AiroZephyr",
      price: 8000,
      image: "/home/product/AIroElevate-Rosepink-25.png",
      slug: "airozephyr"
    },
    {
      name: "AiroSerenada",
      price: 8000,
      image: "/home/product/AIroElevate-Rosepink-25.png",
      slug: "airoserenada"
    },
    {
      name: "AiroSleek",
      price: 8000,
      image: "/home/product/AIroElevate-Rosepink-25.png",
      slug: "airosleek"
    },
    {
      name: "StarDust",
      price: 8000,
      image: "/home/product/AIroElevate-Rosepink-25.png",
      slug: "stardust"
    },
  ];

  const economyFans = [
    {
      name: "Vayu Pro (High)",
      price: 8000,
      image: "/home/product/AIroElevate-Rosepink-25.png",
      slug: "vayu-pro-high"
    },
    {
      name: "Vayu Pro",
      price: 8000,
      image: "/home/product/AIroElevate-Rosepink-25.png",
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
      question: "Lorem ipsum dolor sit amet consectetur. Id consequat ut.",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Tristique id lacus a quam. Tortor ut in et orci feugiat duis elementum sapien. Adipiscing nascetur eu ut posuere consectetur. Maecenas id sed consequat gravida orci tristique.",

      isOpen: false,
    },
    {
      question: "Lorem ipsum dolor sit amet consectetur. Platea ut gravida.",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Tristique id lacus a quam. Tortor ut in et orci feugiat duis elementum sapien. Adipiscing nascetur eu ut posuere consectetur. Maecenas id sed consequat gravida orci tristique.",

      isOpen: false,
    },
    {
      question:
        "Lorem ipsum dolor sit amet consectetur. Sed ultricies faucibus lacinia nullam.",
      answer:
        "Lorem ipsum dolor sit amet consectetur. Tristique id lacus a quam. Tortor ut in et orci feugiat duis elementum sapien. Adipiscing nascetur eu ut posuere consectetur. Maecenas id sed consequat gravida orci tristique.",
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
