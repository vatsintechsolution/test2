import Image from 'next/image'
import Link from 'next/link'

interface Feature {
  icon: string
  text: string
}

interface ProductCardProps {
  name: string
  features: Feature[]
  price: number
  link: string
  badgeImage: string
  productImage: string
  backgroundImage?: string
  slug?: string
}

export const ProductCard = ({
  name,
  features,
  price,
  link,
  badgeImage,
  productImage,
  backgroundImage = '/home/fans-bg.png',
  slug
}: ProductCardProps) => {
  return (
    <Link 
      href={`/products/${slug || name.toLowerCase().replace(/\s+/g, '-')}`} 
      className="block"
    >
      <div className="relative overflow-hidden rounded-xl group">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        {/* Card Content with Background Overlay */}
        <div className="relative z-10 rounded-lg overflow-hidden">
          {/* Product Image */}
          <div className="relative h-64 w-full">
            <Image
              src={productImage}
              alt={name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Features - Centered with 4 items */}
            <div className="flex justify-center items-center gap-0 mb-4">
              {features.slice(0, 4).map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-1/4"
                  role="img"
                  aria-label={feature.text}
                >
                  <Image
                    src={feature.icon}
                    alt=""
                    width={68}
                    height={71}
                    className=""
                  />
                  <span className="sr-only">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Product Name */}

            {/* Price */}
            <div className="flex items-end justify-between  mb-2">
              <div className='grow '>
              <h3 className="text-[24px] font-bold text-white mb-1">{name}</h3>
              <div className="flex items-center gap-1  text-[16px]">
                <span className=" text-neutral-400">MRP</span>
                <span className=" font-semibold text-white">₹{price.toLocaleString()}</span>
              </div>

              </div>
            

              {/* Badge Image */}
              <div className="relative w-32 h-10">
                <Image
                  src={badgeImage}
                  alt="Rating"
                  fill
                  className="object-contain"
                />
              </div>
              <Link 
              href={link}
              className="inline-flex items-center justify-center w-8 h-8 
                         rounded-full  transition-colors"
            >
              <svg 
                className="w-6 h-6 text-white transform rotate-[-30deg]" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M14 5l7 7m0 0l-7 7m7-7H3" 
                />
              </svg>
            </Link>
            </div>

            {/* Link/Arrow */}
          
          </div>
        </div>
      </div>
    </Link>
  )
} 