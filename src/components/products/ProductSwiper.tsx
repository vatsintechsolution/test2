'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

interface ProductSwiperProps {
  images: string[]
}

export const ProductSwiper = ({ images }: ProductSwiperProps) => {
  return (
    <div className="product-swiper">
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        className="md:rounded-lg overflow-hidden"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-[360px] lg:h-[550px] w-full">
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                fill
                className=""
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
} 