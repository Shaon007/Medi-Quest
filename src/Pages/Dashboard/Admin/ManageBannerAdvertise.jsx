import { Helmet } from 'react-helmet-async'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import LoadingSpinner from '../../../Component/Shared/LoadinSpinner'
import toast from 'react-hot-toast'

const ManageBannerAdvertise = () => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()

  const { data: ads = [], isLoading } = useQuery({
    queryKey: ['admin-advertisements'],
    queryFn: async () => {
      const { data } = await axiosSecure('/admin/advertisements')
      return data
    },
  })

  const toggleMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/admin/advertisements/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-advertisements'] })
      toast.success('Slider status updated')
    },
    onError: () => toast.error('Failed to update'),
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <Helmet>
        <title>Manage Banner Advertise | Admin</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-6">Manage Banner Advertisements</h2>
          <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Image</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Medicine</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Description</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Seller</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">In Slider</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Toggle</th>
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
                    <td className="px-5 py-5 border-b bg-white text-sm">{ad.sellerEmail}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        ad.inSlider ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {ad.inSlider ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b bg-white text-sm">
                      <button
                        onClick={() => toggleMutation.mutate(ad._id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                          ad.inSlider ? 'bg-lime-500' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            ad.inSlider ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {ads.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No advertisements found.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default ManageBannerAdvertise
