import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = () => {
  const params = {
    modules: [Navigation, Pagination, Autoplay],
    spaceBetween: 30,
    pagination: {
      clickable: true,
    },
    navigation: true,
    autoplay: {
      delay: 3000, // Change slide every 3 seconds
      disableOnInteraction: false, // Keeps autoplay running even after interaction
    },
    loop: true, // Optional: loops slides infinitely
  };

  return (
    <Swiper {...params}>
      <SwiperSlide><img className='w-full h-screen object-cover' src="https://cdn.dribbble.com/users/1277944/screenshots/4835678/attachments/1086266/health_illustration_by_hamam_zai_dribbble_attachment.png" alt="" /></SwiperSlide>
      <SwiperSlide><img className='w-full h-screen object-cover' src="https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-equipe-de-profissionais-de-saude_114360-2711.jpg?t=st=1746638874~exp=1746642474~hmac=de5b1845220208ce78f0358e793ae45fa4385df5ee86e6bb246768f081643ed1&w=1380" alt="" /></SwiperSlide>
      <SwiperSlide><img className='w-full h-screen object-cover' src="https://i.pinimg.com/736x/3f/b9/30/3fb930b0c9eec6a29434d78f980e0e19.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img className='w-full h-screen object-cover' src="https://i.pinimg.com/736x/c5/55/2e/c5552ec36a305142841f8c61ba2dd002.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img className='w-full h-screen object-cover' src="https://i.pinimg.com/736x/d1/67/5e/d1675e08705d719893b1e258d7263877.jpg" alt="" /></SwiperSlide>
    </Swiper>
  );
};

export default Banner;
