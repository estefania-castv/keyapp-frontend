import { useMemo, useState } from "react";
import { normalizar } from "../utils/texto";

/**
 * Filtra `items` por un texto libre.
 * `extraerTexto(item)` debe devolver el texto donde se busca (definirla fuera del componente).
 */
export function useBusqueda(items, extraerTexto) {
  const [texto, setTexto] = useState("");

  const resultado = useMemo(() => {
    const t = normalizar(texto).trim();
    if (!t) return items;
    return items.filter((item) => normalizar(extraerTexto(item)).includes(t));
  }, [items, texto, extraerTexto]);

  return { texto, setTexto, resultado };
}
