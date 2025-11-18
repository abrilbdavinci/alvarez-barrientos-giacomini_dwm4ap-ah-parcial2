import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../utils/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

export default function Perfil() {
  const { token } = useContext(AuthContext);
  const [usuarios, setUsuarios] = useState([]);
  const [me, setMe] = useState(null);

  useEffect(() => {
    async function loadMe() {
      if (!token) return;
      try {
        // Intentamos cargar perfil (si tu backend tiene /usuarios/perfil)
        const res = await fetch(`${API_BASE}/usuarios/perfil`, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const j = await res.json();
          setMe(j.data || j);
        }
      } catch (err) {
        console.warn("No se pudo cargar perfil:", err);
      }
    }

    async function loadUsuarios() {
      if (!token) return;
      try {
        const res = await fetch(`${API_BASE}/usuarios`, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
        });
        if (!res.ok) return;
        const j = await res.json();
        setUsuarios(Array.isArray(j) ? j : (j.data || []));
      } catch (err) {
        console.warn("No se pudo cargar usuarios:", err);
      }
    }

    loadMe();
    loadUsuarios();
  }, [token]);

  return (
    <div>
      <h2>Mi perfil — Kälm</h2>
      <div className="grid-3">
        <div>
          <div className="card">
            <h3>Datos</h3>
            {me ? (
              <>
                <div><strong>{me.nombre}</strong></div>
                <div className="muted">{me.email}</div>
              </>
            ) : (
              <div className="muted">No disponible</div>
            )}
          </div>
        </div>

        <div>
          <div className="card">
            <h3>Mis rutinas</h3>
            <p className="muted">Las rutinas personales se guardan desde la versión completa del producto.</p>
          </div>
        </div>

        <aside>
          <div className="card">
            <h3>Usuarios del sistema</h3>
            {usuarios.length === 0 ? <div className="muted">Sin información o no tienes permisos</div> : (
              usuarios.map(u => <div key={u._id} className="list-row">{u.nombre} <span className="mini muted">{u.email}</span></div>)
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
