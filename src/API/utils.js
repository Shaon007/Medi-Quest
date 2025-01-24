import axios from 'axios';

export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      formData
    );

    if (data.success) {
      return data.data.url;
    } else {
      throw new Error('Image upload failed');
    }
  } catch (error) {
    console.error('Error uploading image:', error.message);
    throw error; 
  }
};
