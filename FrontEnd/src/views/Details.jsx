import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

export default function Details() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE}/productos/${id}`, { headers: { "Content-Type": "application/json", Authorization: token ? `Bearer ${token}` : "" } });
        if (!res.ok) {
          const e = await res.json().catch(() => ({}));
          throw e;
        }
        const j = await res.json();
        setItem(j.data || j);
      } catch (err) {
        console.error("Error detalle:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, token]);

  if (loading) return <div className="card">Cargando...</div>;
  if (!item) return <div className="card">Elemento no encontrado</div>;

  return (
    <div className="card">
      <h2>{item.nombre}</h2>
      <div className="meta">{item.marca} • {item.tipo}</div>
      <img className="detail-img" src={item.foto || "/placeholder.png"} alt={item.nombre} />
      <p>{item.descripcion}</p>

      <h4>Activos principales</h4>
      <p>{item.activos || "No especificado"}</p>

      <h4>Recomendación de uso</h4>
      <p className="muted">Usar según indicaciones. Consulta a un especialista en caso de duda.</p>
    </div>
  );
}
