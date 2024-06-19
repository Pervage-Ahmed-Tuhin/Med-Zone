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
        loader: () => fetch('http://localhost:5000/medicine')
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
      }
    ]
  },
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
