const colores = {
  ACTIVA: "success",
  TRANSFERIDA: "info",
  CANCELADA: "secondary",
  MODIFICADA: "warning",
  FINALIZADA: "dark",
  DISPONIBLE: "success",
};

export default function EstadoBadge({ estado }) {
  return <span className={`badge bg-${colores[estado] || "secondary"}`}>{estado}</span>;
}
