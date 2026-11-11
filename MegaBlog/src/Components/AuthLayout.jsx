import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "./Container/Container.jsx";

export default function AuthLayout({ children, authentication = true }) {
  const { status } = useSelector((state) => state.auth);
  if (authentication && !status) return <Navigate to="/login" replace />;
  if (!authentication && status) return <Navigate to="/" replace />;
  return <Container className="auth-layout">{children}</Container>;
}