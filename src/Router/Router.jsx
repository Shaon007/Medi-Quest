import { createBrowserRouter } from 'react-router-dom'
import Root from './../Layout/Root';
import ErrorPage from './../Pages/ErrorPage';
import Home from './../Pages/Home/Home';
import MedDetails from './../Pages/MedDetails/MedDetails';
import Login from './../Pages/Login/Login';
import SignUp from './../Pages/SignUp/SignUp';
import PrivateRoute from './PrivateRoute';
import DashboardLayout from './../Layout/DashboardLayout';
import Statistics from './../Pages/Dashboard/Common/Statistics';
import AddMed from './../Pages/Dashboard/Seller/AddMed';
import MyInventory from './../Pages/Dashboard/Seller/MyInventory';
import ManageUsers from './../Pages/Dashboard/Admin/ManageUsers';
import Profile from './../Pages/Dashboard/Common/Profile';
import MyOrders from './../Pages/Dashboard/Customer/MyOrders';
import ManageOrders from './../Pages/Dashboard/Seller/ManageOrders';
import SellerRoute from './SellerRoute';
import AdminRoute from './AdminRoute';
import UpdateProfile from '../Pages/UpdateProfile/UpdateProfile';
import Shop from '../Pages/Shop/Shop';
import CategoryDetails from '../Pages/Home/CategoryDetails';
import CartPage from '../Pages/Cart/CartPage';
import Checkout from '../Pages/Checkout/Checkout';
import Invoice from '../Pages/Invoice/Invoice';
import ManageCategories from '../Pages/Dashboard/Admin/ManageCategories';
import PaymentManagement from '../Pages/Dashboard/Admin/PaymentManagement';
import SalesReport from '../Pages/Dashboard/Admin/SalesReport';
import ManageBannerAdvertise from '../Pages/Dashboard/Admin/ManageBannerAdvertise';
import SellerPaymentHistory from '../Pages/Dashboard/Seller/SellerPaymentHistory';
import AskForAdvertisement from '../Pages/Dashboard/Seller/AskForAdvertisement';
import UserPaymentHistory from '../Pages/Dashboard/Customer/UserPaymentHistory';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/medicine/:id',
        element: <MedDetails />,
      },
      {
        path: '/shop',
        element: <Shop />,
      },
      {
        path: '/category/:category',
        element: <CategoryDetails />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
    ],
  },
  {
    path: '/checkout',
    element: (
      <PrivateRoute>
        <Checkout />
      </PrivateRoute>
    ),
  },
  {
    path: '/invoice',
    element: (
      <PrivateRoute>
        <Invoice />
      </PrivateRoute>
    ),
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'add-med',
        element: (
          <PrivateRoute>
            <SellerRoute>
              <AddMed />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-inventory',
        element: (
          <PrivateRoute>
            <SellerRoute>
              <MyInventory />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-categories',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageCategories />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'payment-management',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <PaymentManagement />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'sales-report',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <SalesReport />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-banners',
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageBannerAdvertise />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'seller-payment-history',
        element: (
          <PrivateRoute>
            <SellerRoute>
              <SellerPaymentHistory />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'ask-for-advertisement',
        element: (
          <PrivateRoute>
            <SellerRoute>
              <AskForAdvertisement />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'manage-orders',
        element: (
          <PrivateRoute>
            <SellerRoute>
              <ManageOrders />
            </SellerRoute>
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: 'payment-history',
        element: (
          <PrivateRoute>
            <UserPaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'update-profile',
        element: (
          <PrivateRoute>
            <UpdateProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
])