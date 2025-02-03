'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const menuItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="relative top-0 left-0 right-0 z-50 ">
      <div className="container mx-auto ">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <Image 
              src="/logo.svg" 
              alt="EcoLink Logo" 
              width={155} 
              height={75} 
              className="h-[75px] w-auto pl-4"
            />
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-50  pr-5 md:hidden"
            aria-label="Toggle menu"
          >
            <div className="w-7 flex flex-col gap-1">
              <span className={`block h-0.5 w-full bg-white transition-transform duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-1.5' : ''
              }`} />
              <span className={`block h-0.5 w-full bg-white transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`} />
              <span className={`block h-0.5 w-full bg-white transition-transform duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`} />
            </div>
          </button>

          {/* Mobile Menu Overlay */}
          <div className={`
            fixed inset-0 bg-black/80 backdrop-blur-sm transition-transform duration-300 md:hidden
            ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          `}>
            <nav className="flex flex-col items-center justify-center h-full gap-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-xl text-white/70 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
} 