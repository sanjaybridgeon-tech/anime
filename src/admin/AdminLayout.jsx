import { Link, Outlet, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col p-5">
        <h1 className="text-2xl font-bold mb-6 text-yellow-400">
          Anime Store ⚡
        </h1>

        <nav className="flex flex-col gap-4">
          <Link to="/admin" className="hover:text-yellow-400">Dashboard</Link>
          <Link to="/admin/products" className="hover:text-yellow-400">Products</Link>
          <Link to="/admin/users" className="hover:text-yellow-400">Users</Link>
          <Link to="/admin/orders" className="hover:text-yellow-400">Orders</Link>
        </nav>

        <button
          onClick={logout}
          className="mt-auto bg-red-500 p-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;