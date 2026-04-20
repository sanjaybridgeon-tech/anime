import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductList from "./pages/ProductList";
import Cart from "./pages/Cart";
import ChatBot from "./components/ChatBot";
import Payment from "./pages/Payment";
import ProductDetails from "./pages/ProductDetails";

// 🔥 NEW COMPONENT (controls chatbot visibility)
function Layout() {
  const location = useLocation();

  // ❌ pages where bot should be hidden
  const hideBotRoutes = ["/login", "/register"];

  const shouldHideBot = hideBotRoutes.includes(location.pathname);

  return (
    <>
      <Navbar />

      {/* 🤖 Show bot only if NOT login/register */}
      {!shouldHideBot && <ChatBot />}

      <div className="flex-grow">
        <Routes>
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

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;