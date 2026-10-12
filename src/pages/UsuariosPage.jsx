import { useMemo, useState } from "react";
import Buscador from "../components/Buscador";
import { useDatos } from "../hooks/useDatos";
import { useBusqueda } from "../hooks/useBusqueda";

const correoDe = (u) => u.email ?? u.correo ?? "";
const textoUsuario = (u) => `${u.nombre ?? ""} ${correoDe(u)} ${u.rol ?? ""}`;

export default function UsuariosPage() {
  const { usuarios, cargando } = useDatos();
  const [rol, setRol] = useState("");

  const porRol = useMemo(() => usuarios.filter((u) => !rol || u.rol === rol), [usuarios, rol]);
  const { texto, setTexto, resultado } = useBusqueda(porRol, textoUsuario);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title mb-3">Usuarios</h5>
        <div className="row g-2 mb-3">
          <div className="col-md">
            <Buscador valor={texto} onChange={setTexto} placeholder="Buscar por nombre, correo o rol..." />
          </div>
          <div className="col-md-auto">
            <select className="form-select" value={rol} onChange={(e) => setRol(e.target.value)}>
              <option value="">Todos los roles</option>
              <option value="PROFESOR">PROFESOR</option>
              <option value="ADMINISTRADOR">ADMINISTRADOR</option>
            </select>
          </div>
        </div>

        {cargando ? (
          <p className="text-muted mb-0">Cargando usuarios...</p>
        ) : resultado.length === 0 ? (
          <p className="text-muted mb-0">No hay usuarios que coincidan.</p>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr><th>Nombre</th><th>Correo</th><th>Rol</th></tr>
              </thead>
              <tbody>
                {resultado.map((u) => (
                  <tr key={u.idUsuario}>
                    <td>{u.nombre}</td>
                    <td>{correoDe(u) || "—"}</td>
                    <td><span className="badge bg-light text-dark border">{u.rol}</span></td>
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
