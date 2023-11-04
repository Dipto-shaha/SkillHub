import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navber from './assets/Navber.jsx';
import Context from './assets/Context.jsx';
import ErrorPage from './assets/ErrorPage.jsx';
import Login from './assets/Login.jsx';
import Signin from './assets/Signin.jsx';
import PrivateRoute from './assets/PrivateRoute.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navber></Navber>,
    errorElement:<ErrorPage></ErrorPage>,
    children:[
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path:'/signin',
        element:<Signin></Signin>
      },
      {
        path:'/addjob',
        element:<PrivateRoute></PrivateRoute>
      },
      {
        path:'/myjob',
        element:<PrivateRoute></PrivateRoute>
      },
      {
        path:'/mybid',
        element:<PrivateRoute></PrivateRoute>
      },
      {
        path:'/myreq',
        element:<PrivateRoute></PrivateRoute>
      },
      {
        path:'/jobdetails/:id',
        element:<PrivateRoute></PrivateRoute>
      },

    ]
  },
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Context>
        <RouterProvider router={router} />
      </Context>
  </React.StrictMode>,
)
