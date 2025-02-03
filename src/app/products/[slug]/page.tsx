"use client";

import { ProductSwiper } from "@/components/products/ProductSwiper";
import { useState } from "react";
import Image from "next/image";
import { Footer } from "@/components/footer/Footer";
import Link from "next/link";

interface ColorOption {
  name: string;
  value: string;
}

interface SizeOption {
  label: string;
  value: number;
}

export default function ProductDetails() {
  const [selectedColor, setSelectedColor] = useState<string>("pink");
  const [selectedSize, setSelectedSize] = useState<number>(1200);

  const productImages = [
    "/home/product/demo/1.jpg",
    "/home/product/demo/2.jpg",
    "/home/product/demo/3.jpg",
    "/home/product/demo/4.jpg",
  ];

  const colorOptions: ColorOption[] = [
    { name: "Light Pink", value: "pink" },
    { name: "White", value: "white" },
  ];

  const sizeOptions: SizeOption[] = [
    { label: "1200mm", value: 1200 },
    { label: "1400mm", value: 1400 },
  ];

  const features = [
    {
      icon: "/home/product/icons/1.svg",
      title: "PREMIUM AESTHETIC",
    },
    {
      icon: "/home/product/icons/2.svg",
      title: "Superior air Delivery",
    },
    {
      icon: "/home/product/icons/3.svg",
      title: "100% Copper motor",
    },
    {
      icon: "/home/product/icons/4.svg",
      title: "Turbo mode & Timer",
    }
  ];

  return (
    <>
      <main className="min-h-screen py-2 lg:py-8">
        <div className="container mx-auto ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* Product Images */}
            <div>
              <ProductSwiper images={productImages} />
            </div>
            <div className="px-4">
              {/* Product Details */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl font-medium text-white mb-2">
                    EcoLink AiroElevate BLDC Ceiling Fan
                  </h1>
                  <p className="text-base text-white">
                    Industry&apos;s first ceiling fan with hollow hub design |
                    1200 mm Sweep size
                  </p>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-start gap-2">
                    <span className="text-base text-neutral-400">
                      Special Price
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-white">
                        19,999
                      </span>
                      <div className="bg-[#43B02A] px-4 py-1 rounded-md">
                        <span className="text-white ">10% off</span>
                      </div>
                    </div>
                  </div>
                  <div></div>
                  <div className="flex items-start flex-col gap-2">
                    <span className="text-sm text-white/70">MRP</span>
                    <span className="text-2xl font-bold text-white/70">
                      <del>22,000</del>
                    </span>
                  </div>
                </div>

                {/* Color Selection */}
                <div>
                  <h3 className="text-white text-lg mb-3">Color</h3>
                  <div className="flex gap-4">
                    {colorOptions.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 ${
                          selectedColor === color.value
                            ? `border border-${color.value}/50`
                            : "border border-white/10"
                        }`}
                      >
                        <div
                          className="w-[15px] h-[15px] rounded-full"
                          style={{ backgroundColor: color.value }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <h3 className="text-white text-base mb-3">Sweep Size</h3>
                  <div className="flex gap-4">
                    {sizeOptions.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setSelectedSize(size.value)}
                        className={`px-4 py-1 rounded-lg  text-base ${
                          selectedSize === size.value
                            ? "border-[#582C83] border text-white bg-white/10"
                            : "border-[#DBDBDB]/10 border text-white"
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>

               

                {/* Buy Button */}
                <button className="w-full bg-[#582C83] text-white py-4 text-center rounded-lg flex items-center justify-center gap-2 hover:bg-[#8A5F1F] transition-colors">
                  <Image
                    src="/home/buy-on-amazon.svg"
                    alt="Amazon"
                    className="text-center object-center"
                    width={254}
                    height={27}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Image
              src="/home/product/features/1.png"
              alt="Product Image"
              width={350}
              height={380}
              className="w-full h-full object-cover"
            />

            <Image
              src="/home/product/features/2.png"
              alt="Product Image"
              width={350}
              height={380}
              className="w-full h-full object-cover"
            />

            <Image
              src="/home/product/features/3.png"
              alt="Product Image"
              width={350}
              height={380}
              className="w-full h-full object-cover"
            />

            <Image
              src="/home/product/features/4.png"
              alt="Product Image"
              width={350}
              height={380}
              className="w-full h-full object-cover"
            />

            <div className="relative w-full py-16 lg:col-span-2 ">
              <div className="absolute inset-0 w-full">
                <Image
                  src="/home/product/product-features-bg.png"
                  alt="Features Background"
                  fill
                  className="object-cover lg:object-cover lg:rounded-xl  lg:w-full lg:aspect-video"
                />
              </div>
              
              <div className="relative z-10">
               
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
                  {features.map((feature, index) => (
                    <div 
                      key={index}
                      className="flex flex-col items-center text-center"
                    >
                      <div className="w-20 h-20 mb-4 relative">
                        <Image
                          src={feature.icon}
                          alt={feature.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <h3 className="text-white/70 font-medium font-xl uppercase">
                        {feature.title}
                      </h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-10">
            <Image
              src="/home/digi-shield.png"
              alt="Why Choose EcoLink"
              width={1000}
              height={1000}
              className="rounded-xl"
            />

        <Link href="/alternate">
              <Image
              src="/home/product/ar.png"
              alt="Why Choose EcoLink"
              width={1000}
              height={1000}
              className="rounded-xl"
            />
          </Link>
          </section>

              <section className="py-16">
                <h2 className="text-4xl font-bold text-white mb-8">
                  Product specifications
                </h2>
                
                <div className="rounded-2xl bg-black/20 backdrop-blur-sm p-8 border border-white/70">
                  <div className="space-y-4">
                    {[
                      { label: "Brand", value: "EcoLink" },
                      { label: "Model", value: "AiroElevate" },
                      { label: "Color", value: "Espresso Brown - Copper/ Silk White - Rose Gold" },
                      { label: "Type", value: "BLDC Ceiling fan" },
                      { label: "Star rating", value: "5 star" },
                      { label: "Sweep Size", value: "1200 mm" },
                      { label: "Speed", value: "370 RPM" },
                      { label: "Air Delivery (CMM)", value: "230" },
                      { label: "Warranty", value: "5 (3+2*) years" },
                      { label: "Dimensions", value: "xx mm X yy mm X zz mm (length X width X height)" },
                    ].map((spec, index) => (
                      <div 
                        key={index}
                        className="flex flex-col sm:flex-row py-4 border-b border-white/10"
                      >
                        <div className="w-full sm:w-1/3 text-white/70">
                          {spec.label}
                        </div>
                        <div className="w-full sm:w-2/3 text-white">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-sm text-white/50 mt-6">
                    * Get 2 years extended warranty with 3 years standard warranty on EcoLink BLDC Ceiling fan. To activate extended warranty, register product on Signify DigiShield App
                  </p>
                </div>
              </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
