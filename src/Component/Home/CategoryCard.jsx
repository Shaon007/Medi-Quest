import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategoryCard = () => {
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
      return data;
    },
  });

  return (
    <div className="py-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Medicine Categories
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Browse essential medicines by category.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-6 max-w-7xl mx-auto">
        {categories.map((cat) => (
          <Link
            to={`/category/${cat.name}`}
            key={cat._id}
            className="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-48 object-cover group-hover:scale-110 transition duration-300"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <p className="text-white text-lg font-bold">{cat.name}</p>
              <p className="text-white/80 text-sm">{cat.medicineCount} medicines</p>
            </div>
            <div className="p-3 bg-white text-center">
              <h3 className="font-semibold text-gray-800">{cat.name}</h3>
              <p className="text-sm text-gray-500">{cat.medicineCount} medicines</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
