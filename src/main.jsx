import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from './login'
import Message from "./message";
import ContactList from "./contactList";
import Register from './register'
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/main",
    element: <Message />
  },
  {
    path: "/contacts",
    element: <ContactList />
  },
  {
    path: "/register",
    element: <Register />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);