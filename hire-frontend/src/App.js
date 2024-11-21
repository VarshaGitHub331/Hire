import React from "react";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/footer.jsx";
import Home from "./pages/home/Home.jsx";
import Gigs from "./pages/MyGigs/MyGig.jsx";
import Gig from "./pages/gig/Gig.jsx";
import Order from "./pages/MyOrder/MyOrder.jsx";
import Add from "./pages/Add/Add.jsx";
import Messages from "./pages/MyMessages/MyMessage.jsx";
import Message from "./pages/Message/Message.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Login from "./pages/login/Login.jsx";
import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext.jsx";
import { toast, Toaster } from "react-hot-toast";

function App() {
  const Layout = () => {
    return (
      <div className="App">
        {/* Your app content */}

        <Toaster
          toastOptions={{
            position: "bottom-center",
            style: {
              backgroundColor: "#333",
              color: "#fff",
              padding: "16px",
              fontSize: "14px",
              borderRadius: "8px",

              zIndex: 9999, // Ensure the toast is above modal
            },
            success: {
              duration: 7000,
              style: {
                backgroundColor: "#4caf50",
                color: "#fff",
              },
            },
            error: {
              duration: 4000,
              style: {
                backgroundColor: "#dc3545",
                color: "#fff",
              },
            },
          }}
        />

        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };
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
          path: "/gigs",
          element: <Gig />,
        },
        {
          path: "/gig/:id",
          element: <Gigs />,
        },
        {
          path: "/orders",
          element: <Order />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/signUp",
          element: <SignUp />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {},
  ]);
  return (
    <>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
