'use client';

import { ProductFeatureCard } from '@/components/product/ProductFeatureCard';
import { ProductVideoCard } from '@/components/product/ProductVideoCard';
import { ProductEnergyCard } from '@/components/product/ProductEnergyCard';
import { ProductSeasonCard } from '@/components/product/ProductSeasonCard';
import { ProductRemoteCard } from '@/components/product/ProductRemoteCard';
import { ProductPremiumAestheticsCard } from '@/components/product/ProductPremiumAestheticsCard';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export default function ProductFeaturesPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Use the same image for all features
  const productImage = '/home/product/AiroElevate.png';
  const winterImage = '/home/winters.png';
  const summerImage = '/home/summer.png';

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6">
      <div className="container mx-auto">
        {/* Theme Toggle Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="px-4 py-2 rounded-md bg-foreground/10 text-foreground hover:bg-foreground/20 transition-colors"
          >
            {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-foreground">
          EcoLink Fan Features
        </h1>

        {/* Inverter Demo Card */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-foreground">
            Featured Technology
          </h2>
          <ProductEnergyCard
            imageSrc={productImage} 
            iconSrc="/home/icons/inverter-energy.svg"
            title="Runs 3x longer on inverter"
            description="EcoLink AirElevate BLDC ceiling fan, features a powerful BLDC motor, maximizing energy savings and cooling performance."
            className="max-w-3xl mx-auto"
            badgeText="RUN 3X LONGER ON INVERTER"
            priority={true}
          />
        </div>

        {/* Seasonal Benefits Card */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-foreground">
            All-Season Comfort
          </h2>
          <ProductSeasonCard
            summerImage={summerImage}
            winterImage={winterImage}
            title="2-way rotation"
            description="Making it ideal choice for Summers & winters!"
            className="max-w-3xl mx-auto"
            priority={true}
          />
        </div>

        {/* Remote Control Card */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-foreground">
            Smart Control
          </h2>
          <ProductRemoteCard
            title="Point anywhere RF remote"
            description="Experience year-round comfort with EcoLink AiroElevate BLDC ceiling fan, featuring 2-way rotation- a reverse mode to circulate warm air during winter."
            className="max-w-3xl mx-auto"
            priority={true}
          />
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {/* Premium Aesthetics Card */}
          <ProductPremiumAestheticsCard
             className="min-h-[400px]"
            priority={true}
          />
          
          {/* Video Card: Hassle-free Installation */}
          <ProductVideoCard
            bgImageSrc="/home/video-card-bg.png"
            videoSrc="https://youtu.be/CWAxGi9PZz0?si=tdTCh871nVOUcVgv"
            title="Hassle-free Installation"
            description="EcoLink AirElevate BLDC ceiling fan features adjustable mounting, making it suitable for any ceiling type in your home"
            className="min-h-[400px]"
            priority={true}
            gradientClass="bg-gradient-to-t from-black/90 via-black/50 to-transparent"
          />

          {/* Unique Hollow Hub Design */}
          <ProductFeatureCard
            imageSrc={productImage}
            title="Unique Hollow Hub Design"
            description="Innovative design of EcoLink AirElevate BLDC ceiling fan enhances both functionality and style, making it a must-have for modern interiors!"
            imageWidth={250}
            imageHeight={250}
            className="min-h-[400px]"
            darkBgClass="dark:bg-gradient-to-b dark:from-[#6E4427] dark:to-[#2B1D12]"
            lightBgClass="bg-radial-purple"
          />

          {/* Energy Efficient */}
          <ProductFeatureCard
            imageSrc={productImage}
            title="Energy Efficient"
            description="Our BLDC motor technology consumes 65% less electricity than conventional fans while delivering superior air circulation."
            imageWidth={250}
            imageHeight={250}
            className="min-h-[400px]"
            darkBgClass="bg-gradient-to-br from-emerald-900 to-emerald-900/80"
            lightBgClass="bg-gradient-to-br from-emerald-50 to-emerald-100"
          />

          {/* Silent Operation */}
          <ProductFeatureCard
            imageSrc={productImage}
            title="Silent Operation"
            description="Experience whisper-quiet performance with our advanced fan blades and precision-engineered motor design."
            imageWidth={250}
            imageHeight={250}
            className="min-h-[400px]"
            darkBgClass="bg-gradient-to-br from-slate-800 to-slate-800/80"
            lightBgClass="bg-gradient-to-br from-blue-50 to-blue-100"
          />

          {/* Remote Control */}
          <ProductFeatureCard
            imageSrc={productImage}
            title="Smart Remote Control"
            description="Control speed, direction, and lighting with our ergonomic remote featuring intuitive button layout and extended range."
            imageWidth={250}
            imageHeight={250}
            className="min-h-[400px]"
            darkBgClass="bg-gradient-to-br from-violet-900 to-violet-900/80"
            lightBgClass="bg-gradient-to-br from-violet-50 to-violet-100"
          />

          {/* Sleek Design */}
          <ProductFeatureCard
            imageSrc={productImage}
            title="Sleek Modern Design"
            description="The minimalist aesthetic and premium finishes complement any interior design style from contemporary to transitional."
            imageWidth={250}
            imageHeight={250}
            className="min-h-[400px]"
            darkBgClass="bg-gradient-to-br from-stone-700 to-stone-700/80"
            lightBgClass="bg-gradient-to-br from-stone-50 to-stone-100"
          />

          {/* Durable Construction */}
          <ProductFeatureCard
            imageSrc={productImage}
            title="Durable Construction"
            description="Built with high-grade materials and rigorously tested to ensure years of reliable performance and customer satisfaction."
            imageWidth={250}
            imageHeight={250}
            className="min-h-[400px]"
            darkBgClass="bg-radial-black"
            lightBgClass="bg-gradient-to-br from-gray-50 to-gray-100"
          />
        </div>
      </div>
    </div>
  );
}