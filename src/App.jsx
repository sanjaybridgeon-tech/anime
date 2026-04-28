import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ChatBot from "./components/ChatBot";
import Payment from "./pages/Payment";
import React, { Suspense } from "react";
import AnimatedLoader from "./components/AnimatedLoader";
import AdminRoute from "./admin/AdminRoute";
import Dashboard from "./admin/Dashboard";
import AdminLayout from "./admin/AdminLayout";
import Users from "./admin/Users";
import Orders from "./admin/Orders";
import AdminProducts from "./admin/AdminProducts";
import { Toaster } from "sonner";

// ✅ FIXED Lazy Loading
const Home = React.lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => resolve(import("./pages/Home")), 2000);
  })
);

const ProductList = React.lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => resolve(import("./pages/ProductList")), 2000);
  })
);
const ProductDetails = React.lazy(() =>
  new Promise((resolve) => {
    setTimeout(() => resolve(import("./pages/ProductDetails")), 2000);
  })
);
// 🔥 Layout Component
function Layout() {
  const location = useLocation();

  const hideBotRoutes = ["/login", "/register"];
  const shouldHideBot = hideBotRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />

      {!shouldHideBot && <ChatBot />}

      <div className="flex-grow">
        <Routes>
         <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
              <Route path="orders" element={<Orders/>} />
<Route path="products" element={<AdminProducts />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

// 🚀 App Component
function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
              <Toaster position="top-right" richColors />


        <Suspense fallback={<AnimatedLoader />}>
          <Layout />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;