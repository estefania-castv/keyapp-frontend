import { Navigate, Route, Routes } from "react-router-dom";
import LayoutPrivado from "./components/LayoutPrivado";
import RutaProtegida from "./components/RutaProtegida";
import LoginPage from "./pages/LoginPage";
import ReservasPage from "./pages/ReservasPage";
import NuevaReservaPage from "./pages/NuevaReservaPage";
import TransferirPage from "./pages/TransferirPage";
import AulasPage from "./pages/AulasPage";
import UsuariosPage from "./pages/UsuariosPage";
import NoAutorizadaPage from "./pages/NoAutorizadaPage";
import NoEncontradaPage from "./pages/NoEncontradaPage";

export default function App() {
  return (
    <Routes>
      {/* Pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* Requieren sesión */}
      <Route element={<RutaProtegida />}>
        <Route element={<LayoutPrivado />}>
          <Route index element={<Navigate to="/reservas" replace />} />
          <Route path="reservas" element={<ReservasPage />} />
          <Route path="reservas/nueva" element={<NuevaReservaPage />} />
          <Route path="reservas/:id/transferir" element={<TransferirPage />} />
          <Route path="aulas" element={<AulasPage />} />
          <Route path="no-autorizado" element={<NoAutorizadaPage />} />

          {/* Solo ADMINISTRADOR */}
          <Route element={<RutaProtegida roles={["ADMINISTRADOR"]} />}>
            <Route path="usuarios" element={<UsuariosPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NoEncontradaPage />} />
    </Routes>
  );
}
