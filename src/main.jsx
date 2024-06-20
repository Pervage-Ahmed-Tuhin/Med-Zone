import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { HelmetProvider } from 'react-helmet-async';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root/Root.jsx';
import ErrorPage from './components/Error/ErrorPage.jsx';
import Home from './components/Home/Home.jsx';
import AuthProvider from './components/Provider/AuthProvider.jsx';
import Register from './components/Register/Register.jsx';
import Login from './components/Login/Login.jsx';
import PrivateRoute from './components/Private/PrivateRoute.jsx';
import UpdateUser from './components/Update/UpdateUser.jsx';

import {

  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Shop from './components/Shop/Shop.jsx';
import UniqueCategoryHolder from './components/UniqueCategoryHolder/UniqueCategoryHolder.jsx';
import Cart from './components/Cart/Cart.jsx';
import CheckOutPage from './components/CheckOutPage/CheckOutPage.jsx';
import InvoicePage from './components/InnovacePage/InvoicePage.jsx';
import DashBoardLayout from './DashBoard/layout/DashBoardLayout.jsx';
import AdminHomePage from './DashBoard/Admin/AdminHomePage.jsx';
import AdminRoute from './components/Hooks/AdminRoute .jsx';
import ManageUsers from './DashBoard/Admin/ManageUsers.jsx';
import ManageCategory from './DashBoard/Admin/ManageCategory.jsx';
import PaymentManage from './DashBoard/Admin/PaymentManage.jsx';
import SalesReport from './DashBoard/Admin/SalesReport.jsx';
import ManageBanner from './DashBoard/Admin/ManageBanner.jsx';
import PaymentHistory from './DashBoard/user/PaymentHistory.jsx';


const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/bannerData')
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/updateUser',
        element: <PrivateRoute><UpdateUser></UpdateUser></PrivateRoute>
      },
      {
        path: '/shop',
        element: <Shop></Shop>,
        loader: () => fetch('http://localhost:5000/productCount')
      },
      {
        path: '/UniqueCategory/:category',
        element: <PrivateRoute><UniqueCategoryHolder></UniqueCategoryHolder></PrivateRoute>
      },
      {
        path: '/cart',
        element: <PrivateRoute><Cart></Cart></PrivateRoute>
      },
      {
        path: '/checkOut',
        element: <PrivateRoute><CheckOutPage></CheckOutPage></PrivateRoute>
      },
      {
        path: '/InvoicePage',
        element: <PrivateRoute><InvoicePage></InvoicePage></PrivateRoute>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashBoardLayout></DashBoardLayout></PrivateRoute>,
    children: [
      {
        index: true,
        element: <PrivateRoute><AdminRoute><AdminHomePage></AdminHomePage></AdminRoute></PrivateRoute>
      },
      {
        path: 'manage-users',
        element: <PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>
      },
      {
        path: 'manage-category',
        element: <PrivateRoute><AdminRoute><ManageCategory></ManageCategory></AdminRoute></PrivateRoute>
      },
      {
        path: 'payment-manage',
        element: <PrivateRoute><AdminRoute><PaymentManage></PaymentManage></AdminRoute></PrivateRoute>
      },
      {
        path: 'sales-report',
        element: <PrivateRoute><AdminRoute><SalesReport></SalesReport></AdminRoute></PrivateRoute>
      },
      {
        path: 'manage-banner',
        element: <PrivateRoute><AdminRoute><ManageBanner></ManageBanner></AdminRoute></PrivateRoute>,
        loader: () => fetch('http://localhost:5000/productCount')
      },
      {
        path: 'payment-history',
        element: <PrivateRoute><PaymentHistory></PaymentHistory></PrivateRoute>
      }
    ]
  }
]);






ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>

          <RouterProvider router={router} />

        </HelmetProvider>
      </AuthProvider>

    </QueryClientProvider>

  </React.StrictMode>,
)
