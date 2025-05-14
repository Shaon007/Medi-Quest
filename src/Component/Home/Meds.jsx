import Card from "./Card";
import Container from "../Shared/Container";
import axios from "axios";
import { useState, useEffect } from "react";
import LoadingSpinner from "../Shared/LoadinSpinner";
import CategoryCard from "./CategoryCard"; // Import Category Image Carousel

const Meds = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/medicines`);
        setMedicines(data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  // Filter medicines based on selected category
  const filteredMedicines =
    selectedCategory === "All"
      ? medicines
      : medicines.filter((med) => med.category === selectedCategory);

  return (
    <div className="my-4">
      <div className="bg-gray-800 text-center py-10">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Medicine Categories</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">Browse essential medicines by category.</p>
      </div>
      <div >
        {/* Category Image Carousel as Filter */}
        <CategoryCard setSelectedCategory={setSelectedCategory} />

        {/* Medicines Grid */}
        {filteredMedicines.length > 0 ? (
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {filteredMedicines.map((medicine) => (
              <Card key={medicine._id} medicine={medicine} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No Data To Show</p>
        )}
      </div>
    </div>

  );
};

export default Meds;
