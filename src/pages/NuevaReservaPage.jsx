import { useNavigate } from "react-router-dom";
import FormReserva from "../components/FormReserva";
import { useAuth } from "../hooks/useAuth";
import { useDatos } from "../hooks/useDatos";

export default function NuevaReservaPage() {
  const { usuario, esAdmin } = useAuth();
  const { aulas, profesores, crearReserva } = useDatos();
  const navigate = useNavigate();

  const enviar = async (datos) => {
    const idProfesor = esAdmin ? datos.idProfesor : usuario.idUsuario;
    const ok = await crearReserva({ ...datos, idProfesor });
    if (ok) navigate("/reservas");
  };

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h5 className="card-title mb-3">Nueva reserva</h5>
        <FormReserva aulas={aulas} profesores={profesores} esAdmin={esAdmin} onSubmit={enviar} />
      </div>
    </div>
  );
}
