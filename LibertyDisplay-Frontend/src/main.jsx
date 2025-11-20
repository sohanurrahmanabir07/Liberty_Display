import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './Home/Home.jsx'
import { Root } from './Root/Root.jsx'
import { persistor, store } from './Redux/store.js'
import { Product } from './Product/Product.jsx'
import { About } from './About/About.jsx'
import { Services } from './Services/Services.jsx'
import ContactSection from './Contact Section/ContactSection.jsx'
import { Blog } from './Blog/Blog.jsx'
import { ProtectedRoute } from './Protected Route/ProtectedRoute.jsx'
import { Dashboard } from './Dashboard/Dashboard.jsx'
import AdminDashboard from './Dashboard/Home/AdminDashboard.jsx'
import { AllProducts } from './Product/AllProducts.jsx'
import { DashboardCategories } from './Dashboard/Dashboard Categories/DashboardCategories.jsx'
import { Queries } from './Queries/Queries.jsx'
import { DashboardBanner } from './Dashboard/Dashboar Banner/DashboardBanner.jsx'
import { DashboardServices } from './Dashboard/Dashboard Services/DashboardServices.jsx'
import { DashboardBlog } from './Dashboard/Dashboard Blog/DashboardBlog.jsx'
import { DashboardCertificate } from './Dashboard/Dashboard Certificate/DashboardCertificate.jsx'
import { Login } from './Login-Register/Login.jsx'
import { Category } from './Category/Category.jsx'
import { DashboardCountry } from './Dashboard/Dashboard Country/DashboardCountry.jsx'

// import { Product } from './Product/Product.jsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root></Root>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: "/products/:model",
        element: <Product></Product>
      },
      {
        path: "/about",
        element: <About></About>
      },
      {
        path: "/services",
        element: <Services></Services>
      },
      {
        path: "/contact",
        element: <ContactSection></ContactSection>
      },
      {
        path: "/category/:categoryName",
        element: <Category></Category>
      },
      {
        path: "/blog",
        element: <Blog></Blog>
      },
      {
        path: "/blog/:blogId",
        element: <Blog></Blog>
      },
      {
        path: "/all-products",
        element: <AllProducts></AllProducts>
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>,
        children: [
          {
            path: "/dashboard",
            element: <AdminDashboard></AdminDashboard>
          },
          {
            path: "/dashboard/products",
            element: <AllProducts></AllProducts>
          },


          {
            path: '/dashboard/categories',
            element: <DashboardCategories></DashboardCategories>
          },
          {
            path: '/dashboard/queries',
            element: <Queries></Queries>
          },
          {
            path: '/dashboard/banners',
            element: <DashboardBanner></DashboardBanner>
          },
          {
            path: '/dashboard/services',
            element: <DashboardServices></DashboardServices>
          },
          {
            path: '/dashboard/blog',
            element: <DashboardBlog></DashboardBlog>
          },
          {
            path: '/dashboard/certificate',
            element: <DashboardCertificate></DashboardCertificate>
          },
          {
            path: '/dashboard/country',
            element: <DashboardCountry></DashboardCountry>
          },


        ],

      }
    ]
  },
  {
    path: "/admin-login",
    element: <Login></Login>
  }
])
createRoot(document.getElementById('root')).render(

  <Provider store={store}>

    <PersistGate loading={<p>Loading From Redux.....</p>} persistor={persistor} >


      <RouterProvider router={router} />

    </PersistGate>
  </Provider>

)
