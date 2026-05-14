import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useCart } from '../../Context/CartContext'
import useAuth from '../../Hooks/useAuth'
import useAxiosSecure from '../../Hooks/useAxiosSecure'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import LoadingSpinner from '../../Component/Shared/LoadinSpinner'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const CheckoutForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const navigate = useNavigate()
  const [clientSecret, setClientSecret] = useState('')
  const [processing, setProcessing] = useState(false)

  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  useEffect(() => {
    if (grandTotal > 0) {
      axiosSecure
        .post('/create-payment-intent', { amount: grandTotal })
        .then(({ data }) => setClientSecret(data.clientSecret))
        .catch((err) => console.error(err))
    }
  }, [grandTotal, axiosSecure])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)

    if (!stripe || !elements) {
      setProcessing(false)
      return
    }

    const card = elements.getElement(CardElement)
    if (!card) {
      setProcessing(false)
      return
    }

    const { error } = await stripe.createPaymentMethod({ type: 'card', card })
    if (error) {
      toast.error(error.message)
      setProcessing(false)
      return
    }

    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    })

    if (paymentIntent?.status === 'succeeded') {
      const paymentData = {
        transactionId: paymentIntent.id,
        buyerEmail: user?.email,
        buyerName: user?.displayName,
        totalAmount: grandTotal,
        items: cart.map((item) => ({
          medId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          sellerEmail: item.seller?.email || '',
          category: item.category,
        })),
      }

      try {
        await axiosSecure.post('/payments', paymentData)

        // Decrease quantities
        for (const item of cart) {
          await axiosSecure.patch(`/medicines/quantity/${item.id}`, {
            quantityToUpdate: item.quantity,
            status: 'decrease',
          })
        }

        clearCart()
        toast.success('Payment successful!')
        navigate('/invoice', {
          state: {
            transactionId: paymentIntent.id,
            items: paymentData.items,
            totalAmount: grandTotal,
            buyerName: user?.displayName,
            buyerEmail: user?.email,
            date: new Date().toISOString(),
          },
        })
      } catch (err) {
        console.error(err)
        toast.error('Payment recorded but an error occurred')
      }
    }

    setProcessing(false)
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-20 mt-16">
        <p className="text-gray-500 text-lg">No items in cart to checkout.</p>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <div className="mb-6 space-y-2">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.name} x {item.quantity}</span>
            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <hr />
        <div className="flex justify-between text-lg font-bold">
          <span>Grand Total</span>
          <span>${grandTotal.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="border p-4 rounded-md mb-6">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': { color: '#aab7c4' },
                },
                invalid: { color: '#9e2146' },
              },
            }}
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          className="w-full bg-lime-500 text-white py-3 rounded-lg font-semibold hover:bg-lime-600 transition disabled:opacity-50"
        >
          {processing ? 'Processing...' : `Pay $${grandTotal.toFixed(2)}`}
        </button>
      </form>
    </div>
  )
}

const Checkout = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Helmet>
        <title>Checkout | MediQuest</title>
      </Helmet>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  )
}

export default Checkout
