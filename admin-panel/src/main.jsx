import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./components/nav/Home.jsx";
import About from "./components/nav/About.jsx";
import Contact from "./components/nav/Contact.jsx";
import AdminLayout from "./components/adminPanel/AdminLayout.jsx";
import AdminHome from "./components/adminPanel/AdminHome.jsx";
import AdminLevel from "./components/adminPanel/AdminLevel.jsx";
import AdminLevels from "./components/adminPanel/AdminLevels.jsx";
import AdminSublevel from "./components/adminPanel/AdminSublevel.jsx";
import AdminSublevels from "./components/adminPanel/AdminSublevels.jsx";
import AdminCards from "./components/adminPanel/AdminCards.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <AdminLayout />,
    children: [
      { path: "/admin/dashboard", element: <AdminHome /> },
      { path: "/admin/dashboard/levels", element: <AdminLevels /> },
      { path: "/admin/dashboard/levels/:levelId", element: <AdminLevel /> },
      {
        path: "/admin/dashboard/levels/:levelId/sublevels",
        element: <AdminSublevels />,
      },
      {
        path: "/admin/dashboard/levels/:levelId/sublevels/:sublevelId",
        element: <AdminSublevel />,
      },
      {
        path: "/admin/dashboard/cards",
        element: <AdminCards />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
