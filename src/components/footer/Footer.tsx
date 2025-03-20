'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-radial-purple dark:bg-radial-black text-white px-2">
      <div className="container mx-auto py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Get in Touch and Policies - Left side on desktop */}
          <div className="md:col-span-5 md:col-start-1 md:col-end-6 order-3 md:order-1">
            <div className="grid grid-cols-3 gap-8">
              {/* Get in Touch Column - 2/3 width */}
              <div className="col-span-2">
                <h3 className="text-xl font-medium mb-4">Get in Touch</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="font-medium">Address :</p>
                    <p>Signify Innovations India Limited,</p>
                    <p>c/o Mangalam Business Center,</p>
                    <p>22, Camac Street, Block B, 6th</p>
                    <p>Floor, Kolkata - 700016,</p>
                    <p>West Bengal, India.</p>
                  </div>
                  <div>
                    <p className="font-medium">Phone :</p>
                    <p>1800 120 800 008 (Toll Free)</p>
                  </div>
                  <div>
                    <p className="font-medium">Email :</p>
                    <p>customercare_ecolinklighting@signify.com</p>
                  </div>
                </div>
              </div>

              {/* Policies Column - 1/3 width */}
              <div className="col-span-1">
                <h3 className="text-xl font-medium mb-4">Policies</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/privacy-policy" className="hover:underline">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-of-use" className="hover:underline">
                      Terms of Use
                    </Link>
                  </li>
                  <li>
                    <Link href="/product-security" className="hover:underline">
                      Product Security
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Logo and Social Icons - Middle on desktop, top on mobile */}
          <div className="md:col-span-2 md:col-start-6 md:col-end-8 order-1 md:order-2 flex flex-col items-center lg:mt-[-80px]">
            <div className="mb-6  bg-white rounded-lg p-4">
              <Image 
                src="/logo.svg" 
                alt="EcoLink Logo" 
                width={200} 
                height={80} 
                className="w-auto"
              />
            </div>
            
            <div className="flex space-x-4 mb-8">
              <Link href="https://facebook.com" aria-label="Facebook">
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <FaFacebook className="text-[#4A2570] text-xl" />
                </div>
              </Link>
              <Link href="https://instagram.com" aria-label="Instagram">
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <FaInstagram className="text-[#4A2570] text-xl" />
                </div>
              </Link>
              <Link href="https://twitter.com" aria-label="Twitter">
                <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center">
                  <FaTwitter className="text-[#4A2570] text-xl" />
                </div>
              </Link>
            </div>
          </div>

          {/* Product Menus - Right side on desktop */}
          <div className="md:col-span-5 md:col-start-8 md:col-end-13 order-2 md:order-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full text-center md:text-left">
              <div>
                <h4 className="font-medium mb-3">Products</h4>
                <ul className="space-y-1 text-sm">
                  <li><Link href="/products/led-downlighter" className="hover:underline">LED Downlighter</Link></li>
                  <li><Link href="/products/led-spotlight" className="hover:underline">LED Spotlight</Link></li>
                  <li><Link href="/products/led-cob-light" className="hover:underline">LED Cob Light</Link></li>
                  <li><Link href="/products/led-surface" className="hover:underline">LED Surface</Link></li>
                  <li><Link href="/products/led-strip-drivers" className="hover:underline">LED Strip & Drivers</Link></li>
                  <li><Link href="/products/led-rope" className="hover:underline">LED Rope</Link></li>
                  <li><Link href="/products/led-batten" className="hover:underline">LED Batten</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Products</h4>
                <ul className="space-y-1 text-sm">
                  <li><Link href="/products/led-bulb-t-bulb" className="hover:underline">LED Bulb & T-bulb</Link></li>
                  <li><Link href="/products/led-flood-light" className="hover:underline">LED Flood Light</Link></li>
                  <li><Link href="/products/led-street-light" className="hover:underline">LED Street Light</Link></li>
                  <li><Link href="/products/led-troffer" className="hover:underline">LED Troffer</Link></li>
                  <li><Link href="/products/led-desk-light" className="hover:underline">LED Desk Light</Link></li>
                  <li><Link href="/products/wall-light" className="hover:underline">Wall Light</Link></li>
                  <li><Link href="/products/product-catalogue" className="hover:underline">Product Catalogue</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-3">Products</h4>
                <ul className="space-y-1 text-sm">
                  <li><Link href="/products/airo-elevate" className="hover:underline">Airo Elevate</Link></li>
                  <li><Link href="/products/airo-jewel" className="hover:underline">Airo Jewel</Link></li>
                  <li><Link href="/products/airo-geometry" className="hover:underline">Airo Geometry</Link></li>
                  <li><Link href="/products/airo-zephyr" className="hover:underline">Airo Zephyr</Link></li>
                  <li><Link href="/products/airo-serenata" className="hover:underline">Airo Serenata</Link></li>
                  <li><Link href="/products/airo-sleek" className="hover:underline">Airo Sleek</Link></li>
                  <li><Link href="/products/vayu-pro" className="hover:underline">Vayu Pro</Link></li>
                  <li><Link href="/products/star-dusk" className="hover:underline">Star Dusk</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 text-center border-t border-white/20">
        <p className="text-sm">Copyright © EcoLink 2021. All rights reserved.</p>
      </div>
    </footer>
  );
} 