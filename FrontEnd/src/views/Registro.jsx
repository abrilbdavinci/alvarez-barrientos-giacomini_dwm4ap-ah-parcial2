import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

export default function Registro() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm(s => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/usuarios/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: form.nombre, email: form.email, password: form.password })
      });
      const j = await res.json();
      if (!res.ok) throw j;
      alert("Registro exitoso. Inicia sesión.");
      navigate("/login");
    } catch (err) {
      console.error("Registro error:", err);
      alert(err.msg || err.message || "Error en registro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Registro en Kälm</h2>
      <form className="card form" onSubmit={handleSubmit}>
        <div className="field"><label>Nombre</label><input name="nombre" value={form.nombre} onChange={handleChange} /></div>
        <div className="field"><label>Email</label><input name="email" type="email" value={form.email} onChange={handleChange} /></div>
        <div className="field"><label>Contraseña</label><input name="password" type="password" value={form.password} onChange={handleChange} /></div>

        <div className="form-actions">
          <button className="btn primary" type="submit" disabled={loading}>{loading ? "Registrando..." : "Registrarme"}</button>
        </div>
      </form>
    </div>
  );
}
