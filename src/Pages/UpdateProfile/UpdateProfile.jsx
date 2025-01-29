import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import LoadingSpinner from '../../Component/Shared/LoadinSpinner';

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    photoURL: user?.photoURL || '',
    email: user?.email || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
        email: user.email || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Update profile in Firebase (or your authentication system)
      await updateUserProfile(formData.displayName, formData.photoURL);

      // Send updated data to the backend
      const response = await fetch('https://medi-quest-server-three.vercel.app/update-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: formData.displayName,
          photoURL: formData.photoURL,
          email: formData.email,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
        navigate('/dashboard/profile');
      } else {
        const errorData = await response.json();
        toast.error(`Failed to update profile: ${errorData.message}`);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      // toast.error('An error occurred while updating the profile.');
    } finally {
      setLoading(false);
    }
  };

  const coverImg = 'https://i.pinimg.com/736x/91/70/17/917017949818ccfe4475e5f7f65979b6.jpg';

  if (loading) return <LoadingSpinner />;

  return (
    <div className="flex justify-center items-center h-screen">
      <Helmet>
        <title>Update Profile | Dashboard</title>
      </Helmet>
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full mb-4 rounded-t-lg h-56"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={formData.photoURL || user.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
            />
          </a>

          <form onSubmit={handleSubmit} className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <div className="w-full md:w-1/2 p-2">
                <label htmlFor="displayName" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="displayName"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 p-2">
                <label htmlFor="photoURL" className="block text-gray-700">
                  Photo URL
                </label>
                <input
                  type="text"
                  id="photoURL"
                  name="photoURL"
                  value={formData.photoURL}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
                />
              </div>
              <div className="w-full md:w-1/2 p-2">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                type="button"
                onClick={() => navigate('/dashboard/profile')}
                className="bg-gray-500 px-6 py-2 rounded-lg text-white hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-lime-500 px-6 py-2 rounded-lg text-white hover:bg-lime-700 disabled:bg-lime-300"
              >
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;