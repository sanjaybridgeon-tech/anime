import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 🔥 important

  // 🔄 Check login whenever route changes
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, [location.pathname]); // 🔥 re-run when page changes

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
<nav className="fixed top-0 left-0 w-full z-50 bg-transparent text-white px-6 py-4 flex justify-between items-center">
      {/* 🏴 Logo */}
      <h1
        className="text-4xl md:text-5xl text-yellow-300 tracking-widest"
        style={{
          fontFamily: "'ZCOOL KuaiLe', cursive",
          textShadow: "2px 2px 0px #000, 4px 4px 10px rgba(255,0,0,0.6)"
        }}
      >
        Anime Store
      </h1>

      {/* 🔗 Links */}
      <div className="flex gap-6 items-center">

        <Link to="/" className="hover:text-yellow-400 transition">
          Home
        </Link>

        <Link to="/products" className="hover:text-yellow-400 transition">
          Books
        </Link>

        <Link to="/cart" className="hover:text-yellow-400 transition">
          Cart
        </Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login" className="hover:text-yellow-400 transition">
              Login
            </Link>

            <Link to="/register" className="hover:text-yellow-400 transition">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-600 transition"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;