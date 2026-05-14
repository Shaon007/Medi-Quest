import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { uploadImage } from '../../API/utils';
import useAuth from '../../Hooks/useAuth';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';

const SignUp = () => {
  const { createUser, signInWithGoogle, signInWithGithub, loading } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      const imageUrl = await uploadImage(data.image[0]);
      const result = await createUser(data.email, data.password);
      await updateProfile(result.user, {
        displayName: data.name,
        photoURL: imageUrl,
      });

      // Save user with selected role
      await axios.post(`${import.meta.env.VITE_API_URL}/users/${data.email}`, {
        name: data.name,
        email: data.email,
        image: imageUrl,
        role: data.role === 'seller' ? 'seller' : 'customer',
      });

      // If seller role selected, automatically send seller request to admin
      if (data.role === 'seller') {
        try {
          await axios.patch(
            `${import.meta.env.VITE_API_URL}/users/${data.email}`,
            {},
            { withCredentials: true }
          );
        } catch (e) {
          console.error('Seller request failed:', e);
        }
      }

      navigate('/');
      toast.success('Welcome to MediQuest! 🎉');
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    try {
      await signInWithGoogle();
      navigate('/');
      toast.success('Welcome to MediQuest! 🎉');
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleGithubSignIn = async () => {
    setSubmitting(true);
    try {
      await signInWithGithub();
      navigate('/');
      toast.success('Welcome to MediQuest! 🎉');
    } catch (err) {
      console.log(err);
      toast.error(err?.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
          <p className="text-sm text-gray-400">Welcome to MediQuest</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=""
          className="space-y-6"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                {...register('name', { required: 'Name is required' })}
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm">
                Select Image:
              </label>
              <input
                type="file"
                id="image"
                {...register('image', { required: 'Image is required' })}
                accept="image/*"
              />
              {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image.message}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                autoComplete="new-password"
                id="password"
                placeholder="*******"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label htmlFor="role" className="block mb-2 text-sm">
                Select Role
              </label>
              <select
                {...register('role')}
                id="role"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900"
              >
                <option value="user">User</option>
                <option value="seller">Seller</option>
              </select>
            </div>
          </div>

          <div>
            <button
              disabled={submitting}
              type="submit"
              className="bg-lime-500 w-full rounded-md py-3 text-white disabled:opacity-50"
            >
              {submitting ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Signup with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <div
          onClick={handleGithubSignIn}
          className="flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer"
        >
          <FaGithub size={32} />

          <p>Continue with GitHub</p>
        </div>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="hover:underline hover:text-lime-500 text-gray-600"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default SignUp;
