"use client";

import { HeroSwiper } from "@/components/hero/HeroSwiper";
import { ProductCard } from "@/components/fans/ProductCard";
import Image from "next/image";
import { BackgroundPattern } from "@/components/BackgroundPattern";
import { FAQItem } from "@/components/FAQItem";
import { useState } from "react";

import { Footer } from "@/components/footer/Footer";

export default function Home() {
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
      desktopBg: "/home/slider-1.png",
      mobileBg: "/home/slider-1.png",
      subheading: "ECOLINK AIROELEVATE",
      heading: "Unique Hollow Hub Design",
      buttonText: "Learn More",
      buttonLink: "/products",
      features: features,
    },
    {
      desktopBg: "/home/slider-1.png",
      mobileBg: "/home/slider-1.png",
      subheading: "ECOLINK AIROJEWEL",
      heading: "Premium Design with Power",
      buttonText: "Learn More",
      buttonLink: "/products",
      features: features,
    },
    {
      desktopBg: "/home/slider-1.png",
      mobileBg: "/home/slider-1.png",
      subheading: "ECOLINK AIROGEOMETRY",
      heading: "Modern Design Meets Efficiency",
      buttonText: "Learn More",
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
      image: "/home/product/AIroElevate-Rosepink-25.png",
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
      title: "2-WAY ROTATION",
    },
    {
      icon: "/home/icons/timer.svg",
      title: "2H/4H/6H TIMER",
    },
    {
      icon: "/home/icons/turbo.svg",
      title: "TURBO MODE",
    },
    {
      icon: "/home/icons/led.svg",
      title: "LED DISPLAY",
    },
    {
      icon: "/home/icons/speed.svg",
      title: "6 SPEED AIR FLOW",
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
      <main>
        <HeroSwiper slides={heroSlides} />

        {/* BLDC Fans Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Explore our BLDC Ceiling Fans
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bldcFans.map((fan, index) => (
              <ProductCard
                key={index}
                name={fan.name}
                features={productFeatures}
                price={fan.price}
                link={`/products/${fan.slug}`}
                badgeImage="/home/icons/badge.png"
                productImage={fan.image}
                slug={fan.slug}
              />
            ))}
          </div>
        </section>

        {/* Decorative Fans Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Explore our Decorative Ceiling fans{" "}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {decorativeFans.map((fan, index) => (
              <ProductCard
                key={index}
                name={fan.name}
                features={productFeatures}
                price={fan.price}
                link={`/products/${fan.slug}`}
                badgeImage="/home/icons/badge.png"
                productImage={fan.image}
                slug={fan.slug}
              />
            ))}
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Explore our Economy Ceiling fans{" "}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {economyFans.map((fan, index) => (
              <ProductCard
                key={index}
                name={fan.name}
                features={productFeatures}
                price={fan.price}
                link={`/products/${fan.slug}`}
                badgeImage="/home/icons/badge.png"
                productImage={fan.image}
                slug={fan.slug}
              />
            ))}
          </div>
        </section>

        <section>
          <Image
            src="/home/why-choose.png"
            alt="Why Choose EcoLink"
            width={1000}
            height={1000}
          />
          <div className="text-white/70 pl-8 pr-6 leading--154%] text-sm">
            <p>
              EcoLink, a global brand from the house of Signify in
              technologically advanced home luminaires, has been illuminating
              spaces with advanced and affordable luminaires. Beyond lighting,
              EcoLink now breezes into homes, offering innovative, reliable and
              award winning ceiling fans, fulfilling its vision of comfort and
              illumination. EcoLink&#39;s luminaires and fans are engineered to
              be durable, ensuring homes stay bright and breezy, with
              long-lasting, efficient products that complement any budget!
            </p>

            <p className="pt-6">
              Powered by cutting-edge BLDC inverter technology, EcoLink fans
              save up to 55% on energy expenditures, while offering modern
              features like superior air delivery and high-powered motor. These
              unique designs are carefully crafted with Indian homes in mind,
              effortlessly complementing any budget and decor of your choosing.
              Experience EcoLink&#39;s visionary cooling solutions for a breath
              of fresh air in any space.
            </p>
          </div>

          <Image
            src="/home/remote.png"
            alt="Why Choose EcoLink"
            width={1000}
            height={1000}
            className="mt-[-200px] mb-[-250px]"
          />

          {/* Features Section */}
          <section className="container mx-auto px-8 py-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {productFeaturesList.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start text-left space-y-4"
                >
                  <div className=" rounded-full  items-start justify-start">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      width={48}
                      height={48}
                      className="w-20 h-20"
                    />
                  </div>
                  <h3 className="text-white/70 font-bold text-base tracking-wider">
                    {feature.title}
                  </h3>
                </div>
              ))}
            </div>
          </section>
        </section>

        <section>
          <BackgroundPattern>
            <Image
              src="/home/fans-catalog.png"
              alt="Pattern"
              width={1000}
              height={1000}
            />
          </BackgroundPattern>
        </section>

        <section>
          <Image
            src="/home/digi-shield.png"
            alt="Why Choose EcoLink"
            width={1000}
            height={1000}
            className=""
          />
        </section>

        <section className="my-8 px-8">
          <h4 className="text-white/90 text-center text-3xl font-bold mb-8 ">
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
