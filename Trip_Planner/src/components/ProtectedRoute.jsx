import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useContext(AuthContext);

  // ⏳ WAIT until AuthContext is ready
  if (loading) {
    return null; // or loader
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
