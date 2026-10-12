import { Link } from "react-router-dom";

export default function NoEncontradaPage() {
  return (
    <div className="text-center py-5">
      <h1 className="display-5">404</h1>
      <p className="lead">La página que buscas no existe.</p>
      <Link to="/reservas" className="btn btn-kp">Ir al inicio</Link>
    </div>
  );
}
