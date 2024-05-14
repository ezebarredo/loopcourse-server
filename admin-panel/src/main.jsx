import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPageLayout from "../components/LandingPageLayout.jsx";
import Nav from "../components/nav/nav.jsx";
import Home from "../components/nav/Home.jsx";
import About from "../components/nav/About.jsx";
import Contact from "../components/nav/Contact.jsx";
import AdminPanel from "../components/AdminPanel.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
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
    element: <AdminPanel />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
