'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import Image from 'next/image'
import 'swiper/css'
import 'swiper/css/pagination'

interface ProductSwiperProps {
  images: string[]
}

export const ProductSwiper = ({ images }: ProductSwiperProps) => {
  return (
    <div className="product-swiper-container">
      <style jsx global>{`
        .swiper-pagination-bullet {
          width: 11px !important;
          height: 11px !important;
          background: transparent !important;
          border: 1px solid white !important;
          opacity: 1 !important;
        }

        .swiper-pagination-bullet-active {
          background: white !important;
        }
      `}</style>

      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        className="h-[347px] w-full rounded-lg bg-neutral-900"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                fill
                className="object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
} 