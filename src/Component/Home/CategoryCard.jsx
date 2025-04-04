import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

const categoryImages = {
  "General": "https://i.pinimg.com/736x/ab/dd/86/abdd86bdf15f836984614d9632f767af.jpg",
  "Prescribed": "https://i.pinimg.com/736x/d1/a6/89/d1a68989dd575390ef9d18d0e11fcc7d.jpg",
  "Infectious": "https://i.pinimg.com/736x/65/0e/9b/650e9b057cc715ffe1128759fcd2c281.jpg",
  "Veterinary": "https://i.pinimg.com/736x/27/ee/92/27ee92a68141a60fd923d5f8eb23c13f.jpg",
  "Ointment": "https://i.pinimg.com/736x/83/41/14/834114c36b2de6e52ba34b25e38666dd.jpg",
  "Suppliment": "https://i.pinimg.com/736x/89/8f/14/898f14df25a037b725c607af884a022f.jpg",
};

const CategoryCard = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/medicines`);
        console.log("Fetched data:", data);

        if (!Array.isArray(data)) {
          throw new Error("Invalid API response: Expected an array");
        }

        const uniqueCategories = [
          ...new Map(
            data.map((med) => [med.category, { name: med.category }])
          ).values(),
        ];

        // Assign hardcoded images to categories
        const categoriesWithImages = uniqueCategories.map((category) => ({
          ...category,
          image: categoryImages[category.name] || "/fallback.jpg",
        }));

        setCategories(categoriesWithImages);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <Carousel responsive={responsive} autoPlay autoPlaySpeed={2000} infinite>
      {categories.length > 0 ? (
        categories.map((category) => (
          <div
            key={category.name}
            className="relative p-2 cursor-pointer text-center"
            onClick={() => setSelectedCategory(category.name)}
          >
            <div className="relative w-full h-60">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover rounded-lg"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-lg">
                <p className="text-white text-lg font-semibold">{category.name}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No Categories Found</p>
      )}
    </Carousel>
  );
};

export default CategoryCard;
