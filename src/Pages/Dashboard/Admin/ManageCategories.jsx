import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import LoadingSpinner from '../../../Component/Shared/LoadinSpinner'
import toast from 'react-hot-toast'
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai'

const ManageCategories = () => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false)
  const [editCategory, setEditCategory] = useState(null)
  const [formData, setFormData] = useState({ name: '', image: '' })

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await axiosSecure('/categories')
      return data
    },
  })

  const addMutation = useMutation({
    mutationFn: (newCat) => axiosSecure.post('/categories', newCat),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Category added successfully')
      closeModal()
    },
    onError: (err) => toast.error(err.response?.data?.message || 'Failed to add'),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => axiosSecure.patch(`/categories/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Category updated successfully')
      closeModal()
    },
    onError: () => toast.error('Failed to update'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Category deleted successfully')
    },
    onError: () => toast.error('Failed to delete'),
  })

  const closeModal = () => {
    setShowModal(false)
    setEditCategory(null)
    setFormData({ name: '', image: '' })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editCategory) {
      updateMutation.mutate({ id: editCategory._id, data: formData })
    } else {
      addMutation.mutate(formData)
    }
  }

  const handleEdit = (cat) => {
    setEditCategory(cat)
    setFormData({ name: cat.name, image: cat.image })
    setShowModal(true)
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <Helmet>
        <title>Manage Categories | Admin</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Manage Categories</h2>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition"
            >
              <AiOutlinePlus /> Add Category
            </button>
          </div>

          <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Image</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Name</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Medicines</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat._id}>
                    <td className="px-5 py-5 border-b bg-white text-sm">
                      <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded object-cover" />
                    </td>
                    <td className="px-5 py-5 border-b bg-white text-sm font-medium">{cat.name}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">{cat.medicineCount}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(cat)}
                          className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200"
                        >
                          <AiOutlineEdit size={18} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm('Are you sure you want to delete this category?')) {
                              deleteMutation.mutate(cat._id)
                            }
                          }}
                          className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                        >
                          <AiOutlineDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">
              {editCategory ? 'Update Category' : 'Add Category'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-lime-500"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-lime-500"
                  placeholder="Enter image URL"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600"
                >
                  {editCategory ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ManageCategories
