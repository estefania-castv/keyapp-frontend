import { useState } from "react";

const formVacio = { idAula: "", idProfesor: "", fecha: "", horaInicio: "", horaFin: "" };

export default function FormReserva({ aulas, profesores, esAdmin, onSubmit }) {
  const [form, setForm] = useState(formVacio);
  const [enviando, setEnviando] = useState(false);

  const cambiar = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const enviar = async (e) => {
    e.preventDefault();
    setEnviando(true);
    await onSubmit(form);
    setEnviando(false);
  };

  return (
    <form onSubmit={enviar} className="row g-2 align-items-end">
      <div className="col-md">
        <label className="form-label small">Aula</label>
        <select name="idAula" className="form-select" value={form.idAula} onChange={cambiar} required>
          <option value="">Aula...</option>
          {aulas
            .filter((a) => a.estado === "DISPONIBLE")
            .map((a) => (
              <option key={a.idAula} value={a.idAula}>{a.nombre}</option>
            ))}
        </select>
      </div>

      {esAdmin && (
        <div className="col-md">
          <label className="form-label small">Profesor</label>
          <select
            name="idProfesor"
            className="form-select"
            value={form.idProfesor}
            onChange={cambiar}
            required
          >
            <option value="">Profesor...</option>
            {profesores.map((p) => (
              <option key={p.idUsuario} value={p.idUsuario}>{p.nombre}</option>
            ))}
          </select>
        </div>
      )}

      <div className="col-md-auto">
        <label className="form-label small">Fecha</label>
        <input type="date" name="fecha" className="form-control" value={form.fecha} onChange={cambiar} required />
      </div>
      <div className="col-md-auto">
        <label className="form-label small">Hora inicio</label>
        <input type="time" name="horaInicio" className="form-control" value={form.horaInicio} onChange={cambiar} required />
      </div>
      <div className="col-md-auto">
        <label className="form-label small">Hora fin</label>
        <input type="time" name="horaFin" className="form-control" value={form.horaFin} onChange={cambiar} required />
      </div>
      <div className="col-md-auto">
        <button type="submit" className="btn btn-kp" disabled={enviando}>
          {enviando ? "Reservando..." : "Reservar"}
        </button>
      </div>
    </form>
  );
}
