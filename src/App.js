import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Login from "./Page/Login";
import Register from "./Page/Register";
import Home from "./Page/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
