import { Outlet } from "react-router-dom";
import { DatosProvider } from "../context/DatosProvider";
import Navbar from "./Navbar";
import Alertas from "./Alertas";

// Solo se monta con sesión iniciada: al cerrar sesión los datos se descartan solos.
export default function LayoutPrivado() {
  return (
    <DatosProvider>
      <Navbar />
      <div className="container pb-5">
        <Alertas />
        <Outlet />
      </div>
    </DatosProvider>
  );
}
