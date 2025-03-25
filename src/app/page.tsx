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
      name: "EcoLink AiroElevate BLDC Ceiling Fan",
      price: 8700,
      image: "/home/product/AiroElevate.png",
      slug: "airoelevate"
    },
    {
      name: "EcoLink AiroQuad BLDC Ceiling Fan",
      price: 7400,
      image: "/home/product/AiroQuad.png",
      slug: "airoquad"
    },
    {
      name: "EcoLink AiroJewel BLDC Ceiling Fan",
      price: 6550,
      image: "/home/product/AiroJewel.png",
      slug: "airojewel"
    },
    {
      name: "EcoLink AiroGeometry BLDC Ceiling Fan",
      price: 5850,
      image: "/home/product/AiroGeometry.png",
      slug: "airogeometry"
    },
  ];

  const smartbldcFans = [
   
    {
      name: "EcoLink AiroJewel BLDC Smart Ceiling Fan",
      price: 6550,
      image: "/home/product/AiroJewel.png",
      slug: "airojewel"
    },
    {
      name: "EcoLink AiroElevate BLDC Smart Ceiling Fan",
      price: 8700,
      image: "/home/product/AiroElevate.png",
      slug: "airoelevate"
    },
  ];

  const decorativeFans = [
    {
      name: "EcoLink AiroZephyr BLDC Ceiling Fan",
      price: 4395,
      image: "/home/product/AiroZephyr.png",
      slug: "airozephyr"
    },
    {
      name: "EcoLink AiroSerenade BLDC Ceiling Fan",
      price: 4395,
      image: "/home/product/AiroSerenada.png",
      slug: "airoserenade"
    },
    {
      name: "EcoLink AiroSleek BLDC Ceiling Fan",
      price: 4395,
      image: "/home/product/AiroSleek.png",
      slug: "airosleek"
    },
    {
      name: "EcoLink Stardust BLDC BLDC Ceiling Fan",
      price: 6499,
      image: "/home/product/StarDust.png",
      slug: "stardustbldc"
    },
  ];

  const economyFans = [
    {
      name: "EcoLink VayuPro HS BLDC Ceiling Fan",
      price: 2350,
      image: "/home/product/VayuPro.png",
      slug: "vayuprohs"
    },
    {
      name: "EcoLink VayuUltra BLDC Ceiling Fan",
      price: 2350,
      image: "/home/product/VayuUltra.png",
      slug: "vayuultra"
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
      "question": "Q1: What types of fans are available?",
      "answer": "<ul><li>Ceiling Fans: Ideal for large rooms and living areas.</li><li>Pedestal Fans: Perfect for medium-sized rooms and portability.</li><li>Table Fans: Compact and great for small spaces like desks or bedside tables.</li><li>Wall-Mounted Fans: Space-saving and ideal for rooms with limited floor space.</li><li>Exhaust Fans: Designed for ventilation in kitchens, bathrooms, and other enclosed spaces.</li></ul>",
      "isOpen": false
    },
    {
      "question": "Q2: What size fan is suitable for my room?",
      "answer": "<table><thead><tr><th>Sweep Size</th><th>Room Size</th></tr></thead><tbody><tr><td>600 mm (24\")</td><td>Up to 36 sq. ft.</td></tr><tr><td>900 mm (36\")</td><td>36\u201364 sq. ft.</td></tr><tr><td>1200 mm (48\")</td><td>65\u2013100 sq. ft.</td></tr><tr><td>1400 mm (56\")</td><td>>101 sq. ft.</td></tr></tbody></table>",
      "isOpen": false
    },
    {
      "question": "Q7: What are the benefits of BLDC technology?",
      "answer": "<ul><li>Energy Efficiency: Consumes up to 55% less electricity than induction motors.</li><li>Durability: Generates less heat, prolonging lifespan.</li><li>Quiet Operation: Reduced noise compared to induction fans.</li><li>Eco-Friendly: Lower power consumption contributes to energy savings.</li></ul>",
      "isOpen": false
    },
    {
      "question": "Q20: What is Breeze Mode in the WiZ App?",
      "answer": "<ul><li>Summer Breeze: Speed cycles between 1 and 5.</li><li>Winter Breeze: Speed cycles between 1 and 3 in reverse direction.</li></ul>",
      "isOpen": false
    },
    {
      "question": "Q21: How to pair the fan with the WiZ app if the product is not visible?",
      "answer": "<ul><li>Tap and hold the Sleep button for 5 seconds.</li><li>Wait for 'Device found' pop-up on the WiZ app screen.</li><li>Follow the standard pairing process in the app.</li></ul>",
      "isOpen": false
    },
    {
      "question": "Q3: How do energy-efficient fans help save on electricity bills?",
      "answer": "Energy-efficient fans, such as those with BLDC motors, consume significantly less power than conventional induction fans\u2014offering up to 55% energy savings. BLDC motors use permanent magnets, which are more efficient than electromagnetic induction motors.",
      "isOpen": false
    },
    {
      "question": "Q4: What is BLDC technology?",
      "answer": "BLDC stands for Brushless Direct Current. It converts AC to DC using PCB and uses a permanent magnet to generate EMF, reducing power consumption, heat loss, and wear and tear.",
      "isOpen": false
    },
    {
      "question": "Q5: How is BLDC technology different from older induction technology?",
      "answer": "BLDC motors use permanent magnets to generate EMF, while induction motors rely on electromagnetic induction. Permanent magnets generate less heat and consume less energy, making BLDC fans more efficient, quieter, and durable.",
      "isOpen": false
    },
    {
      "question": "Q6: Are BLDC fans noiseless?",
      "answer": "BLDC fans are quieter due to less friction and no humming like induction fans. However, they still produce some air-cutting noise.",
      "isOpen": false
    },
    {
      "question": "Q8: How much electricity does a BLDC motor save compared to an induction motor?",
      "answer": "BLDC fans save up to 55% electricity, making them a cost-effective and energy-efficient solution.",
      "isOpen": false
    },
    {
      "question": "Q9: Can BLDC fans be controlled with a regulator?",
      "answer": "No, they require their own remote control, mobile app, or smart device control.",
      "isOpen": false
    },
    {
      "question": "Q10: Why does my BLDC fan jerk when it starts?",
      "answer": "A slight jerk is normal as the magnet aligns itself during startup. This is not harmful to the fan.",
      "isOpen": false
    },
    {
      "question": "Q11: Can I operate different ceiling fans with the same remote?",
      "answer": "No, each fan is paired with a specific remote to prevent interference.",
      "isOpen": false
    },
    {
      "question": "Q12: What is Turbo Mode?",
      "answer": "Turbo Mode boosts the fan's speed to maximum for instant high airflow.",
      "isOpen": false
    },
    {
      "question": "Q13: Do BLDC fans have lower air delivery compared to normal ceiling fans?",
      "answer": "No, BLDC fans are designed for equal or better airflow than conventional fans while using less power.",
      "isOpen": false
    },
    {
      "question": "Q14: Do BLDC fans have a capacitor?",
      "answer": "No, they use electronic circuitry to manage motor speed and do not require capacitors.",
      "isOpen": false
    },
    {
      "question": "Q15: My area has voltage fluctuations. Will a BLDC fan function properly?",
      "answer": "Yes, BLDC fans operate efficiently between 125V and 290V, handling voltage fluctuations well.",
      "isOpen": false
    },
    {
      "question": "Q16: My area has power cut issues. Will a BLDC fan work with a generator?",
      "answer": "Yes, provided the generator supplies stable power within the fan\u2019s voltage range.",
      "isOpen": false
    },
    {
      "question": "Q17: Are BLDC fans star-rated?",
      "answer": "Yes, they are certified for energy efficiency by the relevant authorities.",
      "isOpen": false
    },
    {
      "question": "Q18: How do I connect my BLDC fan to Google Home or Alexa?",
      "answer": "Use the WiZ App:\n1. Go to Settings > Help Center > FAQ > Alexa/Google Home.\n2. Follow the pairing instructions.",
      "isOpen": false
    },
    {
      "question": "Q19: What functions can be controlled through Google Home or Alexa?",
      "answer": "You can control fan speed and power ON/OFF via voice assistants.",
      "isOpen": false
    }
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
        <section className="container mx-auto px-4 py-16" id="products">
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

         {/* BLDC Fans Section */}
         <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold section-heading  mb-8 text-center">
            Explore our Smart Ceiling Fans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {smartbldcFans.map((fan, index) => (
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
