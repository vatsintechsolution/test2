"use client";

import { useState, useEffect } from "react";
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
import { DigiShieldSection } from "@/components/DigiShieldSection";
import { ARViewSection } from "@/components/ARViewSection";
import { WizAppSection } from "@/components/wizAppSection";

// Map of product slugs to their Amazon links
const amazonLinks: { [key: string]: string } = {
  airogeometry: "https://www.amazon.in/dp/B0D7D1G6MG?th=1",
  airojewel: "https://www.amazon.in/dp/B0D7D127ZV?th=1",
  airoserenade: "https://www.amazon.in/dp/B0D7CWN7W4",
  airosleek: "https://www.amazon.in/dp/B0D7CYXX9C?th=1",
  airozephyr: "https://www.amazon.in/dp/B0D7CZP5Y8?th=1"
};

// Map of product slugs to their dimensions
const productDimensions: { [key: string]: string } = {
  airoquad: "574mm X 260mm X 264mm (Length X Width X Height)",
  airoelevate: "652mm X 238mm X 258mm (Length X Width X Height)",
  airojewel: "578mm X 270mm X 295mm (Length X Width X Height)",
  airogeometry: "578mm X 270mm X 295mm (Length X Width X Height)",
  vayuultra: "258mm X 200mm X 285mm (Length X Width X Height)",
  vayuprohs: "260mm X 210mm X 165mm (Length X Width X Height)",
  airofreshnew: "267mm X 212mm X 160mm (Length X Width X Height)"
};

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    try {
      // Find the product that matches the slug
      const foundProduct = productsData.products.find(p => p.slug === params.slug);
      
      if (foundProduct) {
        // Update dimensions if available
        if (productDimensions[params.slug]) {
          foundProduct.specifications.dimensions = productDimensions[params.slug];
        }
        setProduct(foundProduct);
        // Set the default selected color to the first color option
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0].name);
        }
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

  // Handle color selection change
  const handleColorChange = (colorValue: string) => {
    if (product) {
      const newSelectedColor = product.colors.find(c => c.primary === colorValue)?.name || "";
      setSelectedColor(newSelectedColor);
    }
  };

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
              <ProductSwiper 
                images={product.images.gallery} 
                slug={params.slug}
                selectedColor={selectedColor}
                productData={product}
              />
            </div>

            {/* Product Details */}
            <ProductDetails
              name={product.fullName}
              description={product.tagline}
              regularPrice={product.price}
              colorOptions={colorOptions}
              sizeOptions={product.sizes}
              amazonLink={amazonLinks[params.slug]}
              onColorChange={handleColorChange}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">

        {product.keyFeature &&
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
        }

          {/* Featured Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10">
           
          {product.energyEfficiency.icon &&
            <ProductEnergyCard
              imageSrc={product.images.main}
              iconSrc={product.energyEfficiency.icon}
              title={product.energyEfficiency.title}
              description={`${product.fullName}, features a powerful BLDC motor, maximizing energy savings and cooling performance.`}
              badgeText={`RUNS 3X LONGER`}
              className="h-full"
              priority={true}
            />}

          {product.aesthetics.title && 
            <ProductVideoCard
              bgImageSrc={product.images.main}
              videoSrc={product.videos.promotional}
              title={product.aesthetics.title}
              description={product.aesthetics.description}
              className="max-w-3xl mx-auto"
              priority={true}
            />
          }
          
        
{product.seasonalFeatures.summer.image &&
            <ProductSeasonCard
              summerImage={product.seasonalFeatures.summer.image}
              winterImage={product.seasonalFeatures.winter.image}
              title="Enjoy benefits of 2-way rotation!"
              description={`Experience year-round comfort with ${product.fullName}, featuring 2-way rotation- a reverse mode to circulate warm air during winter.`}
              className="max-w-3xl mx-auto"
              priority={true}
            />
          }

          <ProductRemoteCard
              title={product.remoteFeatures.title}
              description={product.remoteFeatures.description}
              className="h-full"
              priority={true}
            />
          
          </div>

          <div className="py-10">
            <ProductPremiumAestheticsCard
              className=" mx-auto"
              priority={true}
            />
          </div>

         

          <section className="grid grid-cols-1 gap-4 py-10">
            <div className="col-span-1 h-full">
              {params.slug.includes('smart') ? <WizAppSection /> : <DigiShieldSection />}
            </div>

            {product.arLink && (
              <div className="col-span-1 h-full">
                <ARViewSection arLink={product.arLink} />
              </div>
            )}
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
                  ...(product.specifications.dimensions !== "xx mm X yy mm X zz mm (length X width X height)" ? [{ label: "Dimensions", value: product.specifications.dimensions }] : []),
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
