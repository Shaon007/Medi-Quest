import { Helmet } from 'react-helmet-async'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import LoadingSpinner from '../../../Component/Shared/LoadinSpinner'
import toast from 'react-hot-toast'

const PaymentManagement = () => {
  const axiosSecure = useAxiosSecure()
  const queryClient = useQueryClient()

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ['admin-payments'],
    queryFn: async () => {
      const { data } = await axiosSecure('/admin/payments')
      return data
    },
  })

  const acceptMutation = useMutation({
    mutationFn: (id) => axiosSecure.patch(`/admin/payments/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-payments'] })
      toast.success('Payment accepted')
    },
    onError: () => toast.error('Failed to accept payment'),
  })

  if (isLoading) return <LoadingSpinner />

  return (
    <>
      <Helmet>
        <title>Payment Management | Admin</title>
      </Helmet>
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <h2 className="text-2xl font-bold mb-6">Payment Management</h2>
          <div className="overflow-x-auto shadow rounded-lg">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Transaction ID</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Buyer</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Amount</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Date</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Status</th>
                  <th className="px-5 py-3 bg-white border-b text-left text-sm uppercase font-normal text-gray-800">Action</th>
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
                    <td className="px-5 py-5 border-b bg-white text-sm">
                      {payment.status === 'pending' ? (
                        <button
                          onClick={() => acceptMutation.mutate(payment._id)}
                          className="px-3 py-1 bg-lime-500 text-white rounded-lg text-sm hover:bg-lime-600"
                        >
                          Accept Payment
                        </button>
                      ) : (
                        <span className="text-green-600 text-sm">Accepted</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {payments.length === 0 && (
            <p className="text-center text-gray-500 mt-8">No payment records found.</p>
          )}
        </div>
      </div>
    </>
  )
}

export default PaymentManagement
