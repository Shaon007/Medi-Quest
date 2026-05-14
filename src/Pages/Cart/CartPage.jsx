import { Helmet } from 'react-helmet-async'
import { useCart } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import toast from 'react-hot-toast'

const CartPage = () => {
  const { cart, updateQty, removeFromCart, clearCart } = useCart()

  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleRemove = (id, name) => {
    removeFromCart(id)
    toast.success(`${name} removed from cart`)
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Helmet>
        <title>Cart | MediQuest</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center mb-6">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
          <Link to="/shop" className="bg-lime-500 text-white px-6 py-3 rounded-lg hover:bg-lime-600 transition">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto shadow rounded-lg mb-6">
            <table className="min-w-full leading-normal">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-5 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Name</th>
                  <th className="px-5 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Company</th>
                  <th className="px-5 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Price/Unit</th>
                  <th className="px-5 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Quantity</th>
                  <th className="px-5 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Subtotal</th>
                  <th className="px-5 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="bg-white hover:bg-gray-50">
                    <td className="px-5 py-3 border-b text-sm font-medium">{item.name}</td>
                    <td className="px-5 py-3 border-b text-sm">{item.company || 'N/A'}</td>
                    <td className="px-5 py-3 border-b text-sm">${item.price}</td>
                    <td className="px-5 py-3 border-b text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
                          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          <AiOutlineMinus size={14} />
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          className="p-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          <AiOutlinePlus size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-3 border-b text-sm font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="px-5 py-3 border-b text-sm">
                      <button
                        onClick={() => handleRemove(item.id, item.name)}
                        className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                      >
                        <AiOutlineDelete size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <button
              onClick={() => {
                clearCart()
                toast.success('Cart cleared')
              }}
              className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Clear All
            </button>
            <div className="flex items-center gap-6">
              <p className="text-2xl font-bold">Grand Total: ${grandTotal.toFixed(2)}</p>
              <Link
                to="/checkout"
                className="px-6 py-3 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition font-semibold"
              >
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CartPage
