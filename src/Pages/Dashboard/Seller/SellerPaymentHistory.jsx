import { Helmet } from 'react-helmet-async'
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import useAuth from '../../../Hooks/useAuth'
import LoadingSpinner from '../../../Component/Shared/LoadinSpinner'

const SellerPaymentHistory = () => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['seller-payments', user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/seller-payments/${user?.email}`)
      return data
    },
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <Helmet>
        <title>Payment History | Seller</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-6">Payment History</h2>
          <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Transaction ID</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Buyer</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Amount</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Date</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td className="px-5 py-5 border-b bg-white text-sm">
                      <p className="text-xs break-all">{payment.transactionId}</p>
                    </td>
                    <td className="px-5 py-5 border-b bg-white text-sm">{payment.buyerEmail}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm font-semibold">${payment.totalAmount?.toFixed(2)}</td>
                    <td className="px-5 py-5 border-b bg-white text-sm">
                      {new Date(payment.date).toLocaleDateString('en-GB')}
                    </td>
                    <td className="px-5 py-5 border-b bg-white text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        payment.status === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {payments.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No payment history found.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default SellerPaymentHistory
