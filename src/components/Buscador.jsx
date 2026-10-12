export default function Buscador({ valor, onChange, placeholder = "Buscar..." }) {
  return (
    <div className="input-group">
      <input
        type="search"
        className="form-control"
        placeholder={placeholder}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      />
      {valor && (
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => onChange("")}
          aria-label="Limpiar búsqueda"
        >
          ✕
        </button>
      )}
    </div>
  );
}
