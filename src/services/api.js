// En la nube se define VITE_API_URL al compilar (ver .env.example); en local usa el backend de tu equipo.
export const API = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// AuthProvider registra aquí qué hacer cuando el backend responde 401 (token vencido o inválido).
let alSesionExpirada = null;
export function registrarSesionExpirada(funcion) {
  alSesionExpirada = funcion;
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// Si el backend devuelve un token (JWT) en el login, se envía automáticamente.
function leerToken() {
  try {
    return JSON.parse(sessionStorage.getItem("usuario"))?.token ?? null;
  } catch {
    return null;
  }
}

async function request(path, { method = "GET", body, mensajeError } = {}) {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const token = leerToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let resp;
  try {
    resp = await fetch(`${API}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError("No se pudo conectar con el backend", 0);
  }

  const data = await resp.json().catch(() => null);
  if (!resp.ok) {
    if (resp.status === 401 && path !== "/auth/login") alSesionExpirada?.();
    throw new ApiError(
      data?.mensaje || mensajeError || "Error del servidor, intenta de nuevo",
      resp.status
    );
  }
  return data;
}

export const api = {
  get: (path, opciones) => request(path, opciones),
  post: (path, body, opciones) => request(path, { ...opciones, method: "POST", body }),
  put: (path, body, opciones) => request(path, { ...opciones, method: "PUT", body }),
};
