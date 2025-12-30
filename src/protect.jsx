import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { status, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  return status ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
