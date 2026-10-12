import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useDatos } from "../hooks/useDatos";

export default function TransferirPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { usuario, esAdmin } = useAuth();
  const { reservas, profesores, cargando, transferirReserva } = useDatos();
  const [destino, setDestino] = useState("");
  const [motivo, setMotivo] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (cargando) return <p className="text-muted">Cargando...</p>;

  const reserva = reservas.find((r) => String(r.idReserva) === id);
  if (!reserva) return <Navigate to="/reservas" replace />;

  // Un profesor solo puede transferir sus propias reservas.
  if (!esAdmin && reserva.profesor?.idUsuario !== usuario.idUsuario) {
    return <Navigate to="/no-autorizado" replace />;
  }

  const confirmar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    const ok = await transferirReserva(reserva.idReserva, destino, motivo);
    setEnviando(false);
    if (ok) navigate("/reservas");
  };

  return (
    <div className="card shadow-sm border-0 border-start border-4 border-info">
      <div className="card-body">
        <h6 className="card-title">
          Transferir <strong>{reserva.aula?.nombre}</strong> ({reserva.fecha})
        </h6>
        <form onSubmit={confirmar} className="row g-2 align-items-end mt-1">
          <div className="col-md">
            <label className="form-label small">Profesor destino</label>
            <select className="form-select" value={destino} onChange={(e) => setDestino(e.target.value)} required>
              <option value="">Profesor...</option>
              {profesores
                .filter((p) => p.idUsuario !== reserva.profesor?.idUsuario)
                .map((p) => (
                  <option key={p.idUsuario} value={p.idUsuario}>{p.nombre}</option>
                ))}
            </select>
          </div>
          <div className="col-md">
            <label className="form-label small">Motivo (opcional)</label>
            <input
              type="text"
              className="form-control"
              value={motivo}
              maxLength={200}
              onChange={(e) => setMotivo(e.target.value)}
            />
          </div>
          <div className="col-md-auto">
            <button type="submit" className="btn btn-kp" disabled={enviando}>
              {enviando ? "Transfiriendo..." : "Confirmar"}
            </button>
          </div>
          <div className="col-md-auto">
            <Link to="/reservas" className="btn btn-outline-secondary">Cancelar</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
