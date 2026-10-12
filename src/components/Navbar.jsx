import { NavLink } from "react-router-dom";
import icon from "../assets/keyapp-icon.png";
import { useAuth } from "../hooks/useAuth";

const claseLink = ({ isActive }) => `nav-link text-white ${isActive ? "fw-bold border-bottom" : ""}`;

export default function Navbar() {
  const { usuario, esAdmin, logout } = useAuth();

  return (
    <nav className="navbar navbar-kp navbar-dark navbar-expand-md mb-4">
      <div className="container py-2">
        <NavLink to="/reservas" className="navbar-brand d-flex align-items-center gap-2">
          <img src={icon} alt="" className="kp-logo" />
          <span className="fs-4 fw-semibold">KeyApp</span>
        </NavLink>

        <ul className="navbar-nav me-auto flex-row gap-3 ms-3">
          <li className="nav-item">
            <NavLink to="/reservas" end className={claseLink}>Reservas</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/reservas/nueva" className={claseLink}>Nueva reserva</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/aulas" className={claseLink}>Aulas</NavLink>
          </li>
          {esAdmin && (
            <li className="nav-item">
              <NavLink to="/usuarios" className={claseLink}>Usuarios</NavLink>
            </li>
          )}
        </ul>

        <div className="d-flex align-items-center gap-3 text-white">
          <span>
            {usuario.nombre} <span className="badge bg-light text-dark">{usuario.rol}</span>
          </span>
          <button className="btn btn-outline-light btn-sm" onClick={logout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
}
