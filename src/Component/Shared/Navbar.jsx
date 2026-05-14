import { AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from './Container';
import useAuth from '../../Hooks/useAuth';
import { useCart } from '../../Context/CartContext';

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { cart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const avatarImg = 'https://i.pinimg.com/736x/cd/4b/d9/cd4bd9b0ea2807611ba3a67c331bff0b.jpg';
  const logo = 'https://i.ibb.co.com/LNtr7fC/Screenshot-2025-01-29-000715-removebg-preview.png';
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='fixed w-full max-w-[100vw] bg-white z-10 shadow-sm'>
      <div className='py-3 border-b-[1px]'>
        <Container>
          <div className='flex justify-between items-center gap-3 md:gap-0'>
            {/* Logo */}
            <Link to='/'>
              <img src={logo} alt='logo' width='150' height='100' />
            </Link>

            {/* Nav Links */}
            <div className='hidden md:flex items-center gap-6'>
              <Link to='/' className='font-semibold hover:text-lime-500 transition'>Home</Link>
              <Link to='/shop' className='font-semibold hover:text-lime-500 transition'>Shop</Link>
            </div>

            {/* Right Side */}
            <div className='flex items-center gap-4'>
              {/* Digital Clock */}
              <div className='hidden lg:flex items-center bg-gray-100 px-3 py-1 rounded-md'>
                <span className='text-sm font-mono font-semibold text-gray-700'>
                  {currentTime.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                </span>
              </div>

              {/* Join Us button (when not logged in) */}
              {!user && (
                <Link
                  to='/signup'
                  className='hidden md:block bg-lime-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-lime-600 transition'
                >
                  Join Us
                </Link>
              )}

              {/* Cart Icon */}
              <Link to='/cart' className='relative'>
                <AiOutlineShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className='absolute top-[-8px] right-[-8px] bg-red-500 text-white rounded-full px-2 text-xs'>
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Language Dropdown */}
              <select className='p-2 border rounded-md'>
                <option value='en'>English</option>
                <option value='bn'>বাংলা</option>
                {/* Add more languages as needed */}
              </select>

              {/* Profile Dropdown */}
              <div className='relative'>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className='p-2 border flex items-center gap-2 rounded-full cursor-pointer hover:shadow-md transition'
                >
                  <AiOutlineMenu />
                  <img
                    className='rounded-full'
                    referrerPolicy='no-referrer'
                    src={user && user.photoURL ? user.photoURL : avatarImg}
                    alt='profile'
                    height='30'
                    width='30'
                  />
                </div>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className='absolute rounded-xl shadow-md w-[200px] bg-white overflow-hidden right-0 top-12 text-sm'>
                    <div className='flex flex-col cursor-pointer'>
                      <Link
                        to='/'
                        className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                      >
                        Home
                      </Link>

                      {user ? (
                        <>
                          <Link
                            to='/dashboard'
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          >
                            Dashboard
                          </Link>
                          <Link
                            to='/dashboard/update-profile'
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          >
                            Update Profile
                          </Link>
                          <div
                            onClick={logOut}
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold cursor-pointer'
                          >
                            Logout
                          </div>
                        </>
                      ) : (
                        <>
                          <Link
                            to='/login'
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          >
                            Login
                          </Link>
                          <Link
                            to='/signup'
                            className='px-4 py-3 hover:bg-neutral-100 transition font-semibold'
                          >
                            Sign Up
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;