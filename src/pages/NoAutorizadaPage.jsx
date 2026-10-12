import { Link } from "react-router-dom";

export default function NoAutorizadaPage() {
  return (
    <div className="text-center py-5">
      <h1 className="display-5">403</h1>
      <p className="lead">No tienes permiso para ver esta página.</p>
      <Link to="/reservas" className="btn btn-kp">Volver a mis reservas</Link>
    </div>
  );
}
