import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// OfferSlider Component
const OfferSlider = ({ slides }) => {
  const containerRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

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

// CategoryCard Component
const CategoryCard = () => {
  const [categories, setCategories] = useState([]);
  const [medicines, setMedicines] = useState({});

  useEffect(() => {
    axios.get("/medicines").then((response) => {
      const allMedicines = response.data;
      const categoryMap = {};
      allMedicines.forEach((med) => {
        if (!categoryMap[med.category]) {
          categoryMap[med.category] = [];
        }
        categoryMap[med.category].push(med);
      });
      setCategories(Object.keys(categoryMap));
      setMedicines(categoryMap);
    });
  }, []);

  return (
    <div className="w-full dark:bg-gray-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Medicine Categories
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Browse essential medicines by category.
          </p>
        </div>
        {categories.map((category) => (
          <div key={category} className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {category}
            </h3>
            <OfferSlider
              slides={medicines[category].map((med) => ({
                image: med.image,
                text: med.name,
              }))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
