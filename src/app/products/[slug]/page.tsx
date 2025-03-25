"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ProductSwiper } from "@/components/products/ProductSwiper";
import { Footer } from "@/components/footer/Footer";
import Link from "next/link";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductFeatureCard } from "@/components/product/ProductFeatureCard";
import { ProductVideoCard } from "@/components/product/ProductVideoCard";
import { ProductEnergyCard } from "@/components/product/ProductEnergyCard";
import { ProductSeasonCard } from "@/components/product/ProductSeasonCard";
import { ProductRemoteCard } from "@/components/product/ProductRemoteCard";
import { ProductPremiumAestheticsCard } from "@/components/product/ProductPremiumAestheticsCard";
import productsData, { Product } from "@/lib/products";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Find the product that matches the slug
      const foundProduct = productsData.products.find(p => p.slug === params.slug);
      
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        setError(`Product with slug "${params.slug}" not found`);
      }
    } catch (err) {
      setError("Error loading product data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-gray-700 dark:text-gray-300">{error || "Product not found"}</p>
        <Link href="/products" className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Back to Products
        </Link>
      </div>
    );
  }

  // Transform color options for the product details component
  const colorOptions = product.colors.map(color => ({
    label: color.name,
    value: color.primary
  }));

  return (
    <>
      <main className="min-h-screen py-2 lg:py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* Product Images */}
            <div>
              <ProductSwiper images={product.images.gallery} />
            </div>

            {/* Product Details */}
            <ProductDetails
              name={product.fullName}
              description={product.tagline}
              regularPrice={product.price}
              colorOptions={colorOptions}
              sizeOptions={product.sizes}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">
          <ProductFeatureCard
            imageSrc={product.images.main}
            title={product.keyFeature}
            description={product.description}
            imageWidth={250}
            imageHeight={250}
            className="md:min-h-[300px] mb-4"
            darkBgClass="dark:bg-gradient-to-b dark:from-[#6E4427] dark:to-[#2B1D12]"
            lightBgClass="bg-radial-purple"
          />

          {/* Featured Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10">
            <ProductEnergyCard
              imageSrc={product.images.main}
              iconSrc={product.energyEfficiency.icon}
              title={`Save up to ${product.energyEfficiency.savingsPercentage}% Energy`}
              description={product.energyEfficiency.description}
              badgeText={`SAVE ₹${product.energyEfficiency.annualSavings}/YEAR`}
              className="h-full"
              priority={true}
            />
            <ProductVideoCard
              bgImageSrc={product.videos.thumbnail}
              videoSrc={product.videos.promotional}
              title={product.aesthetics.title}
              description={product.aesthetics.description}
              className="max-w-3xl mx-auto"
              priority={true}
            />
          
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10">

            <ProductSeasonCard
              summerImage={product.seasonalFeatures.summer.image}
              winterImage={product.seasonalFeatures.winter.image}
              title="2-way rotation"
              description="Making it ideal choice for Summers & winters!"
              className="max-w-3xl mx-auto"
              priority={true}
            />
          

          <ProductRemoteCard
              title={product.remoteFeatures.type}
              description={`Control your fan from anywhere with ${product.remoteFeatures.range}. ${product.remoteFeatures.functions.join(", ")}.`}
              className="h-full"
              priority={true}
            />
          
          </div>

          <div className="py-10">
            <ProductPremiumAestheticsCard
              className="max-w-3xl lg:max-w-6xl mx-auto"
              priority={true}
            />
          </div>

         

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-10">
            <Image
              src="/home/digi-shield.png"
              alt="DigiShield"
              width={1000}
              height={1000}
              className="rounded-xl"
            />

            <Link href={`/ar/${product.slug}`}>
              <Image
                src="/home/product/ar.png"
                alt="View in AR"
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
                  { label: "Brand", value: product.specifications.brand },
                  { label: "Model", value: product.modelName },
                  {
                    label: "Color",
                    value: product.colors.map(c => c.name).join(', ')
                  },
                  { label: "Type", value: product.specifications.type },
                  { label: "Star rating", value: `${product.starRating} star` },
                  { label: "Sweep Size", value: product.specifications.sweepSize },
                  { label: "Speed", value: product.specifications.speed },
                  { label: "Air Delivery (CMM)", value: product.specifications.airDelivery },
                  { label: "Power", value: product.specifications.power },
                  { label: "Warranty", value: `${product.warranty.standard}+${product.warranty.extended}* years` },
                  { label: "Dimensions", value: product.specifications.dimensions },
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
                {product.warranty.note}
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
