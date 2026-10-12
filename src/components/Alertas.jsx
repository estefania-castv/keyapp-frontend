import { useLocation } from "react-router-dom";
import { useDatos } from "../hooks/useDatos";

export default function Alertas() {
  const { mensaje, cerrarMensaje } = useDatos();
  const { pathname } = useLocation();

  if (!mensaje || mensaje.ruta !== pathname) return null;

  const clase = mensaje.tipo === "error" ? "alert-danger" : "alert-success";
  return (
    <div className={`alert ${clase} alert-dismissible`} role="alert">
      {mensaje.texto}
      <button type="button" className="btn-close" onClick={cerrarMensaje} aria-label="Cerrar" />
    </div>
  );
}
