import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import LoadingSpinner from '../../Component/Shared/LoadinSpinner'
import useAuth from '../../Hooks/useAuth'

const getAuthErrorMessage = (error) => {
  if (error?.code === 'auth/account-exists-with-different-credential') {
    return 'An account already exists with this email using a different sign-in method. Please use your original sign-in method.'
  }
  return error?.message || 'Something went wrong'
}

const Login = () => {
  const { signIn, signInWithGoogle, signInWithGithub, loading, user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state?.from?.pathname || '/'
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()

  if (user) return <Navigate to={from} replace={true} />
  if (loading) return <LoadingSpinner />

  // form submit handler
  const onSubmit = async (data) => {
    setSubmitting(true)
    try {
      await signIn(data.email, data.password)
      navigate('/', { replace: true })
      toast.success('Welcome back! 🎉')
    } catch (err) {
      console.log(err)
      toast.error(err?.message)
    } finally {
      setSubmitting(false)
    }
  }

  // Handle Google Signin
  const handleGoogleSignIn = async () => {
    setSubmitting(true)
    try {
      //User Registration using google
      await signInWithGoogle()
      navigate('/', { replace: true })
      toast.success('Welcome back! 🎉')
    } catch (err) {
      console.log(err)
      toast.error(getAuthErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  // Handle GitHub Signin
  const handleGithubSignIn = async () => {
    setSubmitting(true)
    try {
      await signInWithGithub()
      navigate('/', { replace: true })
      toast.success('Welcome back! 🎉')
    } catch (err) {
      console.log(err)
      toast.error(getAuthErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen bg-white'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate=''
          className='space-y-6'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                {...register('email', { required: 'Email is required' })}
                id='email'
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
              />
              {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email.message}</p>}
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                {...register('password', { required: 'Password is required' })}
                autoComplete='current-password'
                id='password'
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-lime-500 bg-gray-200 text-gray-900'
              />
              {errors.password && <p className='text-red-500 text-xs mt-1'>{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <button
              disabled={submitting}
              type='submit'
              className='bg-lime-500 w-full rounded-md py-3 text-white disabled:opacity-50'
            >
              {submitting ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button className='text-xs hover:underline hover:text-lime-500 text-gray-400'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <div
          onClick={handleGoogleSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FcGoogle size={32} />

          <p>Continue with Google</p>
        </div>
        <div
          onClick={handleGithubSignIn}
          className='flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'
        >
          <FaGithub size={32} />

          <p>Continue with GitHub</p>
        </div>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-lime-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login