import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, updateQty, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      <table className="w-full table-auto border">
        <thead><tr><th>Name</th><th>Price</th><th>Qty</th><th>Total</th><th>Actions</th></tr></thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item.id} className="border-t">
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>
                <input type="number" value={item.quantity} min={1}
                  onChange={(e) => updateQty(item.id, parseInt(e.target.value))} />
              </td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button onClick={() => removeFromCart(item.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between items-center">
        <button onClick={clearCart} className="bg-red-500 text-white px-4 py-2 rounded">Clear Cart</button>
        <button onClick={() => navigate('/checkout')} className="bg-green-500 text-white px-4 py-2 rounded">Checkout</button>
      </div>
    </div>
  );
};

export default Cart;