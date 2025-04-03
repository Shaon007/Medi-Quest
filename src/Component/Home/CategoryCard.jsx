import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import { useEffect, useState } from "react";

const CategoryCard = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/medicines`);
        console.log("Fetched data:", data); // Debugging line

        if (!Array.isArray(data)) {
          throw new Error("Invalid API response: Expected an array");
        }

        const uniqueCategories = [
          ...new Map(
            data.map((med) => [med.category, { name: med.category, image: med.image }])
          ).values(),
        ];

        setCategories(uniqueCategories);
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
            className="p-4 cursor-pointer text-center"
            onClick={() => setSelectedCategory(category.name)}
          >
            <img
              src={category.image || "/fallback.jpg"} // Prevent errors if image is missing
              alt={category.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <p className="mt-2 text-lg font-semibold">{category.name}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No Categories Found</p>
      )}
    </Carousel>
  );
};

export default CategoryCard;
