import { Helmet } from 'react-helmet-async'
import { useState } from 'react'
import Container from '../../Component/Shared/Container'
import Button from './../../Component/Shared/Button';
import PurchaseModal from './../../Component/Modal/PurchaseModal';
import Heading from './../../Component/Shared/Heading';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingSpinner from '../../Component/Shared/LoadinSpinner';
import axios from 'axios';
import useRole from '../../Hooks/useRole';
import useAuth from '../../Hooks/useAuth';

const MedDetails = () => {
  const [role] = useRole()
  const {user} = useAuth()
  let [isOpen, setIsOpen] = useState(false)
  const { id } = useParams()
  const {
    data: medicine = {},
    isLoading,
    refetch,
   } = useQuery({
    queryKey: ['medicine', id],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/medicines/${id}`)
      return data

     }
   })

  const closeModal = () => {
    setIsOpen(false)
  }
  const { name, category, description, image, price,quantity,seller } = medicine
  // console.log(medicine);
  if (isLoading) return <LoadingSpinner />
  return (
    <Container>
      <Helmet>
        <title>{name}</title>
      </Helmet>
      <div className='mx-auto flex flex-col lg:flex-row justify-between w-full gap-12'>
        {/* Header */}
        <div className='flex flex-col gap-6 flex-1'>
          <div>
            <div className='w-full overflow-hidden rounded-xl'>
              <img
                className='object-cover w-full'
                src={image}
                alt='header image'
              />
            </div>
          </div>
        </div>
        <div className='md:gap-10 flex-1'>
          {/* Medicine Info */}
          <Heading
            title={name}
            subtitle={`Category: ${category}`}
          />
          <hr className='my-6' />
          <div
            className='
          text-lg font-light text-neutral-500'
          >
            {description}
          </div>
          <hr className='my-6' />

          <div
            className='
                text-xl
                font-semibold
                flex
                flex-row
                items-center
                gap-2
              '
          >
            <div>Seller: {seller?.name} </div>

            <img
              className='rounded-full'
              height='30'
              width='30'
              alt='Avatar'
              referrerPolicy='no-referrer'
              src={seller.image}
            />
          </div>
          <hr className='my-6' />
          <div>
            <p
              className='
                gap-4
                font-light
                text-neutral-500
              '
            >
              Quantity: {quantity}  Units Left Only!
            </p>
          </div>
          <hr className='my-6' />
          <div className='flex justify-between'>
            <p className='font-bold text-3xl text-gray-500'>Price: {price}$</p>
            <div>
              <Button
                disabled ={!user ||
                  user?.email === seller?.email ||
                  role != "customer" ||
                  quantity === 0
                  }
               onClick={() => setIsOpen(true)}
               label={quantity > 0 ? 'Purchase' : 'Out Of Stock'} />
            </div>
          </div>
          <hr className='my-6' />

          <PurchaseModal medicine={medicine}
            closeModal={closeModal}
            refetch={refetch}
            isOpen={isOpen} />
        </div>
      </div>
    </Container>
  )
}

export default MedDetails