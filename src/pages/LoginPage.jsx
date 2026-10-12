import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import logo from "../assets/keyapp-logo.png";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { usuario, login } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // Si ya hay sesión, vuelve a la página que se quería visitar.
  if (usuario) {
    return <Navigate to={location.state?.desde || "/reservas"} replace />;
  }

  const enviar = async (e) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message);
      setCargando(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 p-3">
      <img src={logo} alt="KeyApp" className="kp-login-logo mb-4" />
      <div className="card kp-login-card shadow-sm border-0">
        <div className="card-body p-4">
          <h5 className="card-title text-center mb-3">Iniciar sesión</h5>
          <form onSubmit={enviar}>
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <button type="submit" className="btn btn-kp w-100" disabled={cargando}>
              {cargando ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
