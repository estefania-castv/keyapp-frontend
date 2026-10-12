// Minúsculas y sin tildes, para que "Matemáticas" coincida con "matematicas".
export function normalizar(valor) {
  return String(valor ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
