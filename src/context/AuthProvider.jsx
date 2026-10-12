import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContext";
import { api, ApiError, registrarSesionExpirada } from "../services/api";

function leerSesion() {
  try {
    return JSON.parse(sessionStorage.getItem("usuario"));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesion);

  // Mantiene la sesión sincronizada con sessionStorage.
  useEffect(() => {
    if (usuario) sessionStorage.setItem("usuario", JSON.stringify(usuario));
    else sessionStorage.removeItem("usuario");
  }, [usuario]);

  // Si el token venció o es inválido, el backend responde 401 y se cierra la sesión.
  useEffect(() => {
    registrarSesionExpirada(() => setUsuario(null));
    return () => registrarSesionExpirada(null);
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const u = await api.post("/auth/login", { email, password });
      setUsuario(u);
      return u;
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) {
        throw new Error("Correo o contraseña incorrectos", { cause: e });
      }
      throw e;
    }
  }, []);

  const logout = useCallback(() => setUsuario(null), []);

  const value = useMemo(
    () => ({
      usuario,
      login,
      logout,
      esAdmin: usuario?.rol === "ADMINISTRADOR",
    }),
    [usuario, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
