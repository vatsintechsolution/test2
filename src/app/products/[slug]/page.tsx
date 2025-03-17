"use client";

import Image from "next/image";
import { ProductSwiper } from "@/components/products/ProductSwiper";
import { Footer } from "@/components/footer/Footer";
import Link from "next/link";
import { ProductDetails } from '@/components/product/ProductDetails';
import { DigiShieldSection } from "@/components/DigiShieldSection";

export default function ProductPage({ params }: { params: { slug: string } }) {
  // Use the slug parameter for future dynamic data fetching
  console.log(`Loading product details for: ${params.slug}`);

  // Product images for the swiper
  const productImages = [
    "/home/product/demo/1.jpg",
    "/home/product/demo/2.jpg",
    "/home/product/demo/3.jpg",
  ];

  // Define color and size options
  const colorOptions = [
    { label: 'Rose Pink', value: '#FF69B4' },
    { label: 'White', value: '#FFFFFF' },
    { label: 'Brown', value: '#8B4513' },
    { label: 'Black', value: '#000000' },
  ];

  const sizeOptions = [
    { label: '1200mm', value: '1200' },
    { label: '1400mm', value: '1400' },
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
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* Product Images */}
            <div>
              <ProductSwiper images={productImages} />
            </div>
            
            {/* Product Details */}
            <ProductDetails 
              name="EcoLink AiroElevate BLDC Ceiling Fan"
              description="Industry's first ceiling fan with hollow hub design | 1200 mm Sweep size"
              regularPrice={22000}
              colorOptions={colorOptions}
              sizeOptions={sizeOptions}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 py-10 md:hidden">
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

        <div className="container mx-auto px-4 py-10 hidden md:block ">
          <Image src="/home/product/demo/desktop.png" alt="Product Image" width={1536} height={1000}
            className="mx-auto" />

<Image src="/home/product/demo/features.png" alt="Product Image" width={1536} height={1000}
            className="mx-auto py-10" />


<DigiShieldSection />

<Link href="/alternate">
              <Image
              src="/home/product/demo/vr-link.png"
              alt="Why Choose EcoLink"
            width={1536} height={1000}
            className="mx-auto py-0"
            />
          </Link>

<div className="py-16 container mx-auto px-4 max-w-5xl">

<h2 className="text-4xl font-bold dark:text-white text-[#3C3A53] text-center mb-8">
                  Product specifications
                </h2>
<div className="rounded-2xl dark:bg-black/20 dark:border-white/70 bg-white backdrop-blur-sm p-8 border border-[#555369]/50">
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
                        className="flex flex-col sm:flex-row py-4 border-b border-[#555369]/50 dark:border-white/10"
                      >
                        <div className="w-full sm:w-1/3 text-[#3C3A53] dark:text-white/70">
                          {spec.label}
                        </div>
                        <div className="w-full sm:w-2/3 text-[#3C3A53] dark:text-white">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-sm text-[#3C3A53] dark:text-white/50 mt-6">
                    * Get 2 years extended warranty with 3 years standard warranty on EcoLink BLDC Ceiling fan. To activate extended warranty, register product on Signify DigiShield App
                  </p>
                </div>
</div>



        </div>
      </main>
      <Footer />
    </>
  );
}
