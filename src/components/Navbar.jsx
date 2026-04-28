import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

function Navbar() {
  const { userId, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const isLoggedIn = !!userId;

  // 🚪 Logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent text-white px-6 py-4 flex justify-between items-center">

      
<Link to="/">
  <img
    src="/images/Logo.png"
    alt="Anime Store"
    className="h-12 md:h-14 object-contain hover:scale-105 transition"
  />
</Link>

      <div className="flex gap-6 items-center">

        <Link to="/">Home</Link>
        <Link to="/products">Books</Link>
        <Link to="/cart">Cart</Link>

        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout}>
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;