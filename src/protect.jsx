import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({authentication}) => {
  const { status, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <div>Checking authentication...</div>;
  }

  if(authentication && status){
    return  <Outlet />;
  }
  if(!authentication && !status){
    return  <Outlet />;
  }
  return <Navigate to={authentication ? "/user/login" : "/"} replace />;                


};

export default ProtectedRoute;
