import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import useAuth from '../../../Hooks/useAuth'
import LoadingSpinner from '../../../Component/Shared/LoadinSpinner'
import toast from 'react-hot-toast'
import { AiOutlinePlus } from 'react-icons/ai'

const AskForAdvertisement = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    medicineName: '',
    image: '',
    description: '',
  })

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ['seller-ads', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/advertisements/seller/${user?.email}`)
      return data
    },
  })

  const addMutation = useMutation({
    mutationFn: (adData) => axiosSecure.post('/advertisements', adData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-ads'] })
      toast.success('Advertisement submitted successfully')
      setShowModal(false)
      setFormData({ medicineName: '', image: '', description: '' })
    },
    onError: () => toast.error('Failed to submit advertisement'),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addMutation.mutate({
      ...formData,
      sellerEmail: user?.email,
      sellerName: user?.displayName,
    })
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <Helmet>
        <title>Ask For Advertisement | Seller</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">My Advertisements</h2>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition"
            >
              <AiOutlinePlus /> Add Advertise
            </button>
          </div>

          <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Image</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Medicine</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Description</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Slider Status</th>
                </tr>
              </thead>
              <tbody>
                {ads.map((ad) => (
                  <tr key={ad._id}>
                    <td className="px-5 py-5 border-b bg-white text-sm">
                      <img src={ad.image} alt={ad.medicineName} className="w-16 h-12 rounded object-cover" />
                    </td>
                    <td className="px-5 py-5 border-b bg-white text-sm font-medium">{ad.medicineName}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm max-w-xs truncate">{ad.description}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        ad.inSlider ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {ad.inSlider ? 'In Slider' : 'Not in Slider'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {ads.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No advertisements submitted yet.</p>
          )}
        </div>
      </div>

      {/* Add Ad Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4">Submit Advertisement</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name</label>
                <input
                  type="text"
                  required
                  value={formData.medicineName}
                  onChange={(e) => setFormData({ ...formData, medicineName: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-lime-500"
                  placeholder="Enter medicine name"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md focus:outline-lime-500 h-24"
                  placeholder="Enter advertisement description"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default AskForAdvertisement
