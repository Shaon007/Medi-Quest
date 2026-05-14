import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fallbackSlides = [
  'https://cdn.dribbble.com/users/1277944/screenshots/4835678/attachments/1086266/health_illustration_by_hamam_zai_dribbble_attachment.png',
  'https://img.freepik.com/vetores-gratis/ilustracao-do-conceito-de-equipe-de-profissionais-de-saude_114360-2711.jpg',
  'https://i.pinimg.com/736x/3f/b9/30/3fb930b0c9eec6a29434d78f980e0e19.jpg',
];

const Banner = () => {
  const { data: sliderBanners = [] } = useQuery({
    queryKey: ['slider-banners'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/slider-banners`);
      return data;
    },
  });

  const slides = sliderBanners.length > 0
    ? sliderBanners.map((b) => ({ image: b.image, name: b.medicineName, description: b.description }))
    : fallbackSlides.map((img) => ({ image: img, name: '', description: '' }));

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={30}
      pagination={{ clickable: true }}
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <div className="relative">
            <img className="w-full h-[70vh] md:h-screen object-cover" src={slide.image} alt={slide.name || 'Banner'} />
            {slide.name && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-8">
                <h3 className="text-white text-2xl font-bold">{slide.name}</h3>
                {slide.description && <p className="text-white/80 mt-1">{slide.description}</p>}
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
