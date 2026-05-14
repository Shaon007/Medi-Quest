import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import useAuth from '../../../Hooks/useAuth'
import LoadingSpinner from '../../Shared/LoadinSpinner'
import { FaDollarSign } from 'react-icons/fa'
import { MdPending } from 'react-icons/md'

const SellerStatistics = () => {
  const axiosSecure = useAxiosSecure()
  const { user } = useAuth()

  const { data: statData, isLoading } = useQuery({
    queryKey: ['seller-stat', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/seller-stat/${user?.email}`)
      return data
    },
  })

  if (isLoading) return <LoadingSpinner />

  const { paidTotal = 0, pendingTotal = 0 } = statData || {}

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-8">Seller Dashboard</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-green-600 to-green-400 text-white shadow-green-500/40">
            <FaDollarSign className="w-6 h-6" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Paid Total
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              ${paidTotal.toFixed(2)}
            </h4>
          </div>
        </div>

        <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
          <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center from-yellow-600 to-yellow-400 text-white shadow-yellow-500/40">
            <MdPending className="w-6 h-6" />
          </div>
          <div className="p-4 text-right">
            <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600">
              Pending Total
            </p>
            <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-blue-gray-900">
              ${pendingTotal.toFixed(2)}
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerStatistics
