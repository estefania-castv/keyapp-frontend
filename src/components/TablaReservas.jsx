import { Link } from "react-router-dom";
import EstadoBadge from "./EstadoBadge";

export default function TablaReservas({ reservas, onAbrir, onCancelar }) {
  if (reservas.length === 0) {
    return <p className="text-muted mb-0">No hay reservas que coincidan.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table align-middle">
        <thead>
          <tr>
            <th>Aula</th>
            <th>Profesor</th>
            <th>Fecha</th>
            <th>Horario</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reservas.map((r) => (
            <tr key={r.idReserva}>
              <td>{r.aula?.nombre}</td>
              <td>{r.profesor?.nombre}</td>
              <td>{r.fecha}</td>
              <td>
                {r.horaInicio?.slice(0, 5)} - {r.horaFin?.slice(0, 5)}
              </td>
              <td>
                <EstadoBadge estado={r.estado} />
              </td>
              <td className="text-end">
                {(r.estado === "ACTIVA" || r.estado === "TRANSFERIDA") && (
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-kp" onClick={() => onAbrir(r.idReserva)}>
                      Abrir puerta
                    </button>
                    <Link className="btn btn-outline-secondary" to={`/reservas/${r.idReserva}/transferir`}>
                      Transferir
                    </Link>
                    <button className="btn btn-outline-danger" onClick={() => onCancelar(r.idReserva)}>
                      Cancelar
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
