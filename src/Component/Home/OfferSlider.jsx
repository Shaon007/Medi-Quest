import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useCart } from '../../Context/CartContext'
import toast from 'react-hot-toast'

const OfferSlider = () => {
  const { addToCart } = useCart()

  const { data: discountMeds = [] } = useQuery({
    queryKey: ['discount-medicines'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/medicines/discount`)
      return data
    },
  })

  if (discountMeds.length === 0) return null

  const handleAdd = (med) => {
    addToCart({ id: med._id, ...med })
    toast.success(`${med.name} added to cart`)
  }

  return (
    <div className="py-12 px-4 bg-gradient-to-r from-lime-50 to-green-50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Discount Products
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Grab these amazing deals before they are gone!
        </p>
      </div>
      <div className="max-w-7xl mx-auto">
        <Swiper
          modules={[FreeMode, Autoplay]}
          freeMode
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          grabCursor
          loop
        >
          {discountMeds.map((med) => (
            <SwiperSlide key={med._id}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition group">
                <div className="relative">
                  <img
                    src={med.image}
                    alt={med.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {med.discount}% OFF
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 truncate">{med.name}</h3>
                  <p className="text-sm text-gray-500">{med.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-lime-600">
                      ${(med.price * (1 - med.discount / 100)).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">${med.price}</span>
                  </div>
                  <button
                    onClick={() => handleAdd(med)}
                    className="mt-3 w-full bg-lime-500 text-white py-2 rounded-lg text-sm hover:bg-lime-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default OfferSlider