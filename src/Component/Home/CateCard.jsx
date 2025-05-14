import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const CateCard = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/medicines`).then(({ data }) => {
      const grouped = {};
      data.forEach((med) => {
        if (!grouped[med.category]) grouped[med.category] = [];
        grouped[med.category].push(med);
      });

      const cards = Object.entries(grouped).map(([name, items]) => ({
        name,
        count: items.length,
        image: '/some/image.jpg', // placeholder image per category
      }));

      setCategories(cards);
    });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {categories.map((cat) => (
        <div onClick={() => navigate(`/category/${cat.name}`)} className="cursor-pointer border p-4 rounded shadow">
          <img src={cat.image} className="w-full h-40 object-cover rounded" />
          <h2 className="text-xl font-bold mt-2">{cat.name}</h2>
          <p>{cat.count} Medicines</p>
        </div>
      ))}
    </div>
  );
};

export default CateCard;