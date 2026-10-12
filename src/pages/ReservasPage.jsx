import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Buscador from "../components/Buscador";
import TablaReservas from "../components/TablaReservas";
import { useAuth } from "../hooks/useAuth";
import { useDatos } from "../hooks/useDatos";
import { useBusqueda } from "../hooks/useBusqueda";

const ESTADOS = ["ACTIVA", "TRANSFERIDA", "CANCELADA", "MODIFICADA", "FINALIZADA"];

const textoReserva = (r) => `${r.aula?.nombre ?? ""} ${r.profesor?.nombre ?? ""} ${r.fecha ?? ""}`;

export default function ReservasPage() {
  const { usuario, esAdmin } = useAuth();
  const { reservas, cargando, abrirPuerta, cancelarReserva } = useDatos();
  const [estado, setEstado] = useState("");
  const [fecha, setFecha] = useState("");

  // El profesor solo ve sus reservas; el administrador ve todas.
  const visibles = useMemo(
    () => (esAdmin ? reservas : reservas.filter((r) => r.profesor?.idUsuario === usuario.idUsuario)),
    [reservas, esAdmin, usuario]
  );

  const porFiltros = useMemo(
    () => visibles.filter((r) => (!estado || r.estado === estado) && (!fecha || r.fecha === fecha)),
    [visibles, estado, fecha]
  );

  const { texto, setTexto, resultado } = useBusqueda(porFiltros, textoReserva);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title mb-0">{esAdmin ? "Reservas" : "Mis reservas"}</h5>
          <Link to="/reservas/nueva" className="btn btn-kp btn-sm">+ Nueva reserva</Link>
        </div>

        <div className="row g-2 mb-3">
          <div className="col-md">
            <Buscador valor={texto} onChange={setTexto} placeholder="Buscar por aula, profesor o fecha..." />
          </div>
          <div className="col-md-auto">
            <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="">Todos los estados</option>
              {ESTADOS.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
          <div className="col-md-auto">
            <input type="date" className="form-control" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </div>
        </div>

        {cargando ? (
          <p className="text-muted mb-0">Cargando reservas...</p>
        ) : (
          <TablaReservas reservas={resultado} onAbrir={abrirPuerta} onCancelar={cancelarReserva} />
        )}
      </div>
    </div>
  );
}
