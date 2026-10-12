import { useMemo, useState } from "react";
import Buscador from "../components/Buscador";
import EstadoBadge from "../components/EstadoBadge";
import { useDatos } from "../hooks/useDatos";
import { useBusqueda } from "../hooks/useBusqueda";

const textoAula = (a) => a.nombre ?? "";

export default function AulasPage() {
  const { aulas, cargando } = useDatos();
  const [estado, setEstado] = useState("");

  const estados = useMemo(() => [...new Set(aulas.map((a) => a.estado).filter(Boolean))], [aulas]);
  const porEstado = useMemo(() => aulas.filter((a) => !estado || a.estado === estado), [aulas, estado]);
  const { texto, setTexto, resultado } = useBusqueda(porEstado, textoAula);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title mb-3">Aulas</h5>
        <div className="row g-2 mb-3">
          <div className="col-md">
            <Buscador valor={texto} onChange={setTexto} placeholder="Buscar aula por nombre..." />
          </div>
          <div className="col-md-auto">
            <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option value="">Todos los estados</option>
              {estados.map((e) => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          </div>
        </div>

        {cargando ? (
          <p className="text-muted mb-0">Cargando aulas...</p>
        ) : resultado.length === 0 ? (
          <p className="text-muted mb-0">No hay aulas que coincidan.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr><th>Aula</th><th>Estado</th></tr>
              </thead>
              <tbody>
                {resultado.map((a) => (
                  <tr key={a.idAula}>
                    <td>{a.nombre}</td>
                    <td><EstadoBadge estado={a.estado} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
