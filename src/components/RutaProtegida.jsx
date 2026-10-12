import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

/**
 * Sin sesión -> /login (recuerda a dónde quería ir).
 * Con `roles` -> si el rol del usuario no está en la lista, /no-autorizado.
 */
export default function RutaProtegida({ roles }) {
  const { usuario } = useAuth();
  const location = useLocation();

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  }
  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/no-autorizado" replace />;
  }
  return <Outlet />;
}
