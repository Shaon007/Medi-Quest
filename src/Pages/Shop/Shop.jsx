import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { AiOutlineEye } from 'react-icons/ai'
import { FaCartPlus } from 'react-icons/fa'
import LoadingSpinner from '../../Component/Shared/LoadinSpinner'
import { useCart } from '../../Context/CartContext'
import MedicineModal from '../../Component/Modal/MedicineModal'
import toast from 'react-hot-toast'

const Shop = () => {
  const { addToCart } = useCart()
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('')
  const [selectedMed, setSelectedMed] = useState(null)
  const limit = 10

  const { data, isLoading } = useQuery({
    queryKey: ['shop-medicines', page, search, sort],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/medicines?page=${page}&limit=${limit}&search=${search}&sort=${sort}`
      )
      return data
    },
  })

  const medicines = data?.medicines || []
  const total = data?.total || 0
  const totalPages = Math.ceil(total / limit)

  const handleSelect = (med) => {
    addToCart({ id: med._id, ...med })
    toast.success(`${med.name} added to cart`)
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Helmet>
        <title>Shop | MediQuest</title>
      </Helmet>

      <h2 className="text-3xl font-bold text-center mb-6">All Medicines</h2>

      {/* Search and Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <input
          type="text"
          placeholder="Search medicines..."
          className="border px-4 py-2 rounded-md w-full md:w-1/3 focus:outline-lime-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />
        <select
          className="border px-4 py-2 rounded-md focus:outline-lime-500"
          value={sort}
          onChange={(e) => {
            setSort(e.target.value)
            setPage(1)
          }}
        >
          <option value="">Default Sort</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full leading-normal">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-5 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Image</th>
              <th className="px-5 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Name</th>
              <th className="px-5 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Category</th>
              <th className="px-5 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Company</th>
              <th className="px-5 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Price</th>
              <th className="px-5 py-3 border-b text-left text-sm font-semibold text-gray-700 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr key={med._id} className="bg-white hover:bg-gray-50">
                <td className="px-5 py-3 border-b">
                  <img src={med.image} alt={med.name} className="w-12 h-12 rounded object-cover" />
                </td>
                <td className="px-5 py-3 border-b text-sm">{med.name}</td>
                <td className="px-5 py-3 border-b text-sm">{med.category}</td>
                <td className="px-5 py-3 border-b text-sm">{med.company || 'N/A'}</td>
                <td className="px-5 py-3 border-b text-sm font-semibold">${med.price}</td>
                <td className="px-5 py-3 border-b text-sm">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedMed(med)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                      title="View Details"
                    >
                      <AiOutlineEye size={18} />
                    </button>
                    <button
                      onClick={() => handleSelect(med)}
                      className="p-2 bg-lime-100 text-lime-600 rounded-full hover:bg-lime-200"
                      title="Add to Cart"
                    >
                      <FaCartPlus size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {medicines.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No medicines found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-4 py-2 border rounded-md ${page === num ? 'bg-lime-500 text-white' : 'hover:bg-gray-100'}`}
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50 hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      )}

      {/* Medicine Detail Modal */}
      {selectedMed && (
        <MedicineModal medicine={selectedMed} onClose={() => setSelectedMed(null)} />
      )}
    </div>
  )
}

export default Shop
