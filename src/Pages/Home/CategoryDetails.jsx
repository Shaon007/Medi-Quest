import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import MedicineModal from '../components/MedicineModal';
import { useCart } from '../../Context/CartContext';

const CategoryDetails = () => {
  const { name } = useParams();
  const [medicines, setMedicines] = useState([]);
  const [selectedMed, setSelectedMed] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/category/${name}`)
      .then((res) => setMedicines(res.data));
  }, [name]);

  return (
    <div>
      <table className="w-full table-auto border">
        <thead><tr><th>Name</th><th>Company</th><th>Price</th><th>Actions</th></tr></thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med.id} className="border-t">
              <td>{med.name}</td>
              <td>{med.company}</td>
              <td>${med.price}</td>
              <td>
                <button onClick={() => setSelectedMed(med)}>👁️</button>
                <button onClick={() => addToCart(med)}>➕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedMed && <MedicineModal medicine={selectedMed} onClose={() => setSelectedMed(null)} />}
    </div>
  );
};

export default CategoryDetails;