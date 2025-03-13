import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function PublicRoute() {
  const isAuthenticated = !!localStorage.getItem("token");
  return !isAuthenticated ? <Outlet /> : <Navigate to="/dashboard" replace />;
}
