import React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "./mui-styles/theme.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Navbar2 from "./components/Navbar2.jsx";
import Footer from "./components/Footer.jsx";
import Products from "./pages/Products.jsx";
import ProductInfo from "./pages/ProductInfo.jsx";
import Cart from "./pages/Cart.jsx";
import Profile from "./pages/Profile.jsx";
import EditPassword from "./pages/EditPassword.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import AdminDashboard from "./admin/AdminDashboard.jsx";
import AllProducts from "./admin/AllProducts.jsx";
import AddProduct from "./admin/AddProduct.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProduct from "./admin/EditProduct.jsx";
import EditUser from "./admin/EditUser.jsx";
import AllUsers from "./admin/AllUsers.jsx";
import Shipping from "./pages/Shipping.jsx";
import ConfirmOrder from "./pages/ConfirmOrder.jsx";
import Payment from "./pages/Payment.jsx";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useGetStripeApiKeyQuery } from "./api/stripeapi.js";
import AllOrders from "./admin/AllOrders.jsx";
import EditOrder from "./admin/EditOrder.jsx";
import OrderSuccess from "./pages/OrderSuccessPage.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import ProtectedRoute from "./ProtectedRoutes.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";

function App() {
  const { data } = useGetStripeApiKeyQuery();

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Navbar2 />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductInfo />} />
            <Route path="/cart" element={<Cart />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/confirm" element={<ConfirmOrder />} />
              <Route path="/ordersuccess" element={<OrderSuccess />} />
              <Route path="/myorders" element={<MyOrders />} />
              <Route path="/changepassword" element={<EditPassword />} />
              <Route path="/profile" element={<Profile />} />
              {data?.stripeApiKey && (
                <Route
                  path="/payment"
                  element={
                    <Elements stripe={loadStripe(data?.stripeApiKey)}>
                      <Payment />
                    </Elements>
                  }
                ></Route>
              )}
            </Route>
            <Route element={<ProtectedRoute adminRoute={true} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/products" element={<AllProducts />} />
              <Route path="/admin/orders" element={<AllOrders />} />
              <Route path="/admin/order/:id" element={<EditOrder />} />
              <Route path="/admin/editproduct/:id" element={<EditProduct />} />
              <Route path="/admin/edituser/:id" element={<EditUser />} />
              <Route path="/admin/addproduct" element={<AddProduct />} />
              <Route path="/admin/users" element={<AllUsers />} />
            </Route>
          </Routes>
          <hr />
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
