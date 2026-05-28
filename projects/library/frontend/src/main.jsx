import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import { Provider } from "react-redux";
import { store } from "./store/store.js";

import Hero from "./components/Hero.jsx";
import Books from "./components/Books.jsx";
import About from "./components/About.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import AuthLayout from "./components/AuthLayout.jsx";

// main.jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Hero />,
      },
      {
        path: "books",
        element: <Books />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup", // Moved out to be a sibling
        element: <Signup />,
      },
      {
        path: "account",
        element: <AuthLayout />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {" "}
    {/* */}
    <RouterProvider router={router} />
  </Provider>,
);
