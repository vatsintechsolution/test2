import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper/modules'
import { HeroSlide } from './HeroSlide'
import 'swiper/css'
import 'swiper/css/navigation'

interface Feature {
  icon: string
  text: string
}

interface HeroSwiperProps {
  slides: Array<{
    desktopBg: string
    mobileBg: string
    heading: string
    subheading: string
    buttonText: string
    buttonLink: string
    features: Feature[]
  }>
}

export const HeroSwiper = ({ slides }: HeroSwiperProps) => {
  return (
    <div className="relative">
      <Swiper
        modules={[EffectFade,Navigation]}
        
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        loop={true}
        className="relative"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <HeroSlide {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button className="swiper-button-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-colors">
       
      </button>
      <button className="swiper-button-next absolute right-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-colors">
        
      </button>
    </div>
  )
} 