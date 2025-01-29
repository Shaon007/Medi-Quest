

import React, { useEffect, useState } from 'react';
import { CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import './Checkoutform.css'
import Button from '../Shared/Button';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CheckOutForm = ({ purchaseInfo, refetch, totalQuantity, closeModal }) => {
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const [clientSecret, setClientSecret] = useState('')
  const [processing, setProcessing]=useState(false)

  useEffect(() => {
    getPaymentIntent()
  }, [purchaseInfo])
  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post('/create-payment-intent', {
        quantity: purchaseInfo?.quantity,
        medId: purchaseInfo?.medId
      })
      setClientSecret(data.clientSecret)
      console.log(clientSecret);
    } catch (err) {
      console.log(err);
    }
  }
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    // Block native form submission.
    setProcessing(true)
    event.preventDefault();

    if (!stripe || !elements) {

      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      setProcessing(false)
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setProcessing(false)
      console.log('[error]', error);
    } else {
      console.log('[PaymentMethod]', paymentMethod);
    }
    // confirm payment
    const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: purchaseInfo?.customer?.name,
          email: purchaseInfo?.customer?.email
        }
      }
    })
    if (paymentIntent.status === 'succeeded') {
      try {
        axiosSecure.post('/order', { ...purchaseInfo, transactionId: paymentIntent?.id })
        // decrease medicine count
        axiosSecure.patch(`/medicines/quantity/${purchaseInfo?.medId}`, {
          quantityToUpdate: totalQuantity,
          status: 'decrease',
        })
        toast.success('Order Successful')
        refetch()
        navigate('/dashboard/my-orders')
      }
      catch (err) {
        console.log(err);
      }
      finally {
        setProcessing(false)
        closeModal()
      }
    }
    // console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <div className='mt-3'>
        <Button
          type="submit"
          disabled={!stripe || !clientSecret || processing}
          label={` Pay Total ${purchaseInfo?.price}$`} />
      </div>
    </form>
  );
};
export default CheckOutForm;