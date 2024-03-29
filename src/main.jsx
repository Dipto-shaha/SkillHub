import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Context from "./assets/Context.jsx";
import ErrorPage from "./assets/ErrorPage.jsx";
import Login from "./assets/Login.jsx";
import Signin from "./assets/Signin.jsx";
import PrivateRoute from "./assets/PrivateRoute.jsx";
import Home from "./assets/Home.jsx";
import HomeCategory from "./assets/HomeCategory.jsx";
import Addjob from "./assets/PrivateRoute/Addjob.jsx";
import MyPostedJob from "./assets/PrivateRoute/MyPostedJob.jsx";
import Updatejob from "./assets/PrivateRoute/Updatejob.jsx";
import JobDetails from "./assets/PrivateRoute/JobDetails.jsx";
import MyBid from "./assets/PrivateRoute/MyBid.jsx";
import BidRequet from "./assets/PrivateRoute/BidRequet.jsx";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <HomeCategory></HomeCategory>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signin",
        element: <Signin></Signin>,
      },
      {
        path: "/addjob",
        element: (
          <PrivateRoute>
            <Addjob></Addjob>
          </PrivateRoute>
        ),
      },
      {
        path: "/myjob",
        element: (
          <PrivateRoute>
            <MyPostedJob></MyPostedJob>
          </PrivateRoute>
        ),
      },
      {
        path: "/mybid",
        element: (
          <PrivateRoute>
            <MyBid></MyBid>
          </PrivateRoute>
        ),
      },
      {
        path: "/myreq",
        element: (
          <PrivateRoute>
            <BidRequet></BidRequet>
          </PrivateRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <PrivateRoute>
            <JobDetails></JobDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://skillhub-server.vercel.app/job/${params.id}`),
      },
      {
        path: "/updatejob/:id",
        element: (
          <PrivateRoute>
            <Updatejob></Updatejob>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://skillhub-server.vercel.app/job/${params.id}`),
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <Context>
        <RouterProvider router={router} />
      </Context>
    </HelmetProvider>
  </React.StrictMode>
);
