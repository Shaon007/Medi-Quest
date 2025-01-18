import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  const params = {
    modules: [Navigation, Pagination],
    spaceBetween: 30,
    pagination: {
      clickable: true,
    },
    navigation: true,
  };

  return (
    <Swiper {...params}>
      <SwiperSlide><img className='w-full h-screen object-cover' src="https://i.pinimg.com/736x/c6/31/2c/c6312c7b7a540608947d27629fbf1e2d.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img className='w-full h-screen object-cover' src="https://i.pinimg.com/736x/ed/24/5d/ed245d8b417707b189254d7b79772d72.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img className='w-full h-screen object-cover' src="https://i.pinimg.com/736x/3f/b9/30/3fb930b0c9eec6a29434d78f980e0e19.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img className='w-full h-screen object-cover' src="https://i.pinimg.com/736x/c5/55/2e/c5552ec36a305142841f8c61ba2dd002.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img className='w-full h-screen object-cover' src="https://i.pinimg.com/736x/d1/67/5e/d1675e08705d719893b1e258d7263877.jpg" alt="" /></SwiperSlide>
    </Swiper>
  );
};

export default Banner;
