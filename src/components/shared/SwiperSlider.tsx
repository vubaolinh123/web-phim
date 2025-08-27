'use client';

import { Swiper } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface SwiperSliderProps {
  children: React.ReactNode;
  className?: string;
}

export default function SwiperSlider({ children, className }: SwiperSliderProps) {
  return (
    <Swiper
      modules={[Navigation, A11y]}
      spaceBetween={20}
      slidesPerView={2.5}
      navigation
      breakpoints={{
        640: {
          slidesPerView: 3.5,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 4.5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 5.5,
          spaceBetween: 20,
        },
        1280: {
          slidesPerView: 6.5,
          spaceBetween: 20,
        },
        1536: {
          slidesPerView: 7.5,
          spaceBetween: 20,
        },
      }}
      // Ensure hover-scaled slides are not clipped by Swiper's default overflow: hidden
      onBeforeInit={(swiper: SwiperType) => {
        try {
          swiper.el.style.overflow = 'visible';
          swiper.wrapperEl.style.overflow = 'visible';
        } catch {}
      }}
      style={{ overflow: 'visible' }}
      className={`w-full h-full py-8 !overflow-visible ${className || ''}`}
    >
      {children}
    </Swiper>
  );
}
