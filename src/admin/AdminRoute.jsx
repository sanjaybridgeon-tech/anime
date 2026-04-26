import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  // ❌ If not admin → block access
  if (role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // ✅ If admin → allow
  return children;
};

export default AdminRoute;