import React, { useState, useEffect, useRef } from "react";

const OfferSlider = () => {
  const containerRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  const slides = [
    { id: 1, image: "https://i.pinimg.com/736x/fc/42/b1/fc42b1eeb4c4e89c5b6bd4309ff19253.jpg", text: "General" },
    { id: 2, image: "https://i.pinimg.com/736x/c6/65/3e/c6653ed6a898e7930fd32314bccbebd9.jpg", text: "Prescribed" },
    { id: 3, image: "https://i.pinimg.com/736x/65/0e/9b/650e9b057cc715ffe1128759fcd2c281.jpg", text: "Infectious" },
    { id: 4, image: "https://i.pinimg.com/736x/18/34/73/183473729e7a9756f1444c7ecb58c7b0.jpg", text: "Veterinary" },
    { id: 5, image: "https://i.pinimg.com/736x/39/a9/24/39a924f9673764fbbc5f7cd1c2a8ad67.jpg", text: "5" },
    { id: 6, image: "https://i.pinimg.com/736x/67/73/34/67733401c8f5d95d1cc46dbffdc9ef43.jpg", text: "6" },
    { id: 7, image: "https://i.pinimg.com/736x/8a/76/d3/8a76d348f5e96a24a0cc6fb1fcf3b5d1.jpg", text: "7" },
  ];

  const updateActiveDot = () => {
    const container = containerRef.current;
    if (!container) return;
    const slideWidth = container.offsetWidth / slides.length;
    const centerSlideIndex = Math.round(container.scrollLeft / slideWidth);
    setActiveDot(centerSlideIndex);
  };

  const handleScroll = () => {
    updateActiveDot();
  };

  const handlePrev = () => {
    const container = containerRef.current;
    const slideWidth = container.offsetWidth / slides.length;
    container.scrollBy({ left: -slideWidth, behavior: "smooth" });
  };

  const handleNext = () => {
    const container = containerRef.current;
    const slideWidth = container.offsetWidth / slides.length;
    container.scrollBy({ left: slideWidth, behavior: "smooth" });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center">
      {/* Slider */}
      <div
        ref={containerRef}
        className="OfferSlider flex w-full snap-x snap-mandatory gap-4 overflow-x-scroll scroll-smooth scrollbar-hide"
        onScroll={handleScroll}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative aspect-[1/1] w-[85%] shrink-0 snap-start snap-always rounded-xl md:w-[calc(33.33%-(32px/3))]"
            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            <div className="absolute inset-0 flex items-end justify-center">
              <div className="text-4xl font-bold text-gray-700">{slide.text}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination my-4 flex gap-2">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`h-3 w-3 rounded-full bg-black ease-out duration-300 ${index === activeDot ? "w-8" : ""}`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default OfferSlider;
