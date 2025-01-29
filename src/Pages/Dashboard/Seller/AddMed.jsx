import { Helmet } from 'react-helmet-async'
import AddMedForm from './../../../Component/Form/AddMedForm';
import useAuth from './../../../Hooks/useAuth';
import { uploadImage } from '../../../API/utils';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AddMed = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image')

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const name = form.name.value
    const description = form.description.value
    const category = form.category.value
    const price = parseFloat(form.price.value)
    const quantity = parseInt(form.quantity.value)
    const image = form.image.files[0]
    const imageUrl = await uploadImage(image)

    // seller info
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email,
    }

    const medData = {
      name,
      description,
      category,
      price,
      quantity,
      image: imageUrl,
      seller,
    }

    try {
      const response = await fetch('https://medi-quest-server-three.vercel.app/medicines', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medData),
        credentials: 'include',
      })

      if (response.ok) {
        toast.success("Data Added Successfully.")
      } else {
        const errorData = await response.json()
        toast.error(`Failed to add data: ${errorData.message}`)
      }
      navigate('/dashboard/my-inventory')
    }
    catch (err) {
      console.error("Error adding data:", err)
      toast.error("An error occurred while adding data.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Helmet>
        <title>Add Medicine | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddMedForm
        handleSubmit={handleSubmit}
        uploadButtonText={uploadButtonText}
        setUploadButtonText={setUploadButtonText}
        loading={loading}
      />
    </div>
  )
}

export default AddMed
