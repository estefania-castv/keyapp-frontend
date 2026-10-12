import { useCallback, useEffect, useMemo, useState } from "react";
import { DatosContext } from "./datosContext";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

export function DatosProvider({ children }) {
  const { usuario } = useAuth();
  const [aulas, setAulas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [cargando, setCargando] = useState(true);
  // { tipo: "error" | "ok", texto, ruta }  -> solo se muestra en la ruta indicada
  const [mensaje, setMensaje] = useState(null);

  const notificar = useCallback((tipo, texto, ruta = window.location.pathname) => {
    setMensaje({ tipo, texto, ruta });
  }, []);
  const cerrarMensaje = useCallback(() => setMensaje(null), []);

  const cargarReservas = useCallback(async () => {
    try {
      setReservas(await api.get("/reservas"));
    } catch (e) {
      notificar("error", e.message);
    }
  }, [notificar]);

  // Carga inicial de aulas, usuarios y reservas.
  useEffect(() => {
    let activo = true;
    Promise.all([api.get("/aulas"), api.get("/usuarios"), api.get("/reservas")])
      .then(([a, u, r]) => {
        if (!activo) return;
        setAulas(a);
        setUsuarios(u);
        setReservas(r);
      })
      .catch((e) => activo && notificar("error", e.message))
      .finally(() => activo && setCargando(false));
    return () => {
      activo = false;
    };
  }, [notificar]);

  const profesores = useMemo(() => usuarios.filter((u) => u.rol === "PROFESOR"), [usuarios]);

  const crearReserva = useCallback(
    async ({ idAula, idProfesor, fecha, horaInicio, horaFin }) => {
      try {
        await api.post(
          "/reservas",
          {
            fecha,
            horaInicio,
            horaFin,
            aula: { idAula: Number(idAula) },
            profesor: { idUsuario: Number(idProfesor) },
          },
          { mensajeError: "No se pudo crear la reserva" }
        );
        notificar("ok", "Reserva creada", "/reservas");
        await cargarReservas();
        return true;
      } catch (e) {
        notificar("error", e.message);
        return false;
      }
    },
    [notificar, cargarReservas]
  );

  const cancelarReserva = useCallback(
    async (id) => {
      try {
        await api.put(`/reservas/${id}/cancelar`, undefined, {
          mensajeError: "No se pudo cancelar la reserva",
        });
        notificar("ok", "Reserva cancelada");
        await cargarReservas();
      } catch (e) {
        notificar("error", e.message);
      }
    },
    [notificar, cargarReservas]
  );

  const abrirPuerta = useCallback(
    async (id) => {
      try {
        const data = await api.post(
          `/reservas/${id}/abrir`,
          { idUsuario: usuario.idUsuario },
          { mensajeError: "No se pudo abrir la puerta" }
        );
        notificar("ok", data?.mensaje || "Puerta abierta");
      } catch (e) {
        notificar("error", e.message);
      }
    },
    [notificar, usuario]
  );

  const transferirReserva = useCallback(
    async (id, idProfesorDestino, motivo) => {
      try {
        const data = await api.post(
          `/reservas/${id}/transferir`,
          {
            idUsuario: usuario.idUsuario,
            idProfesorDestino: Number(idProfesorDestino),
            motivo,
          },
          { mensajeError: "No se pudo transferir la reserva" }
        );
        notificar("ok", data?.mensaje || "Reserva transferida", "/reservas");
        await cargarReservas();
        return true;
      } catch (e) {
        notificar("error", e.message);
        return false;
      }
    },
    [notificar, cargarReservas, usuario]
  );

  const value = useMemo(
    () => ({
      aulas,
      usuarios,
      profesores,
      reservas,
      cargando,
      mensaje,
      cerrarMensaje,
      crearReserva,
      cancelarReserva,
      abrirPuerta,
      transferirReserva,
    }),
    [
      aulas, usuarios, profesores, reservas, cargando, mensaje, cerrarMensaje,
      crearReserva, cancelarReserva, abrirPuerta, transferirReserva,
    ]
  );

  return <DatosContext.Provider value={value}>{children}</DatosContext.Provider>;
}
