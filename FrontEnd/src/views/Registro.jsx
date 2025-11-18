import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";

export default function Registro() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm(s => ({ ...s, [e.target.name]: e.target.value }));
    setError("");
  }

  function validateForm() {
    if (!form.nombre || !form.email || !form.password) return "Todos los campos son obligatorios.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Email inválido.";
    if (form.password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const validation = validateForm();
    if (validation) {
      setError(validation);
      return;
    }
    setLoading(true);
    try {
      await apiFetch("/usuarios/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: form.nombre, email: form.email, password: form.password })
      });
      alert("Registro exitoso. Inicia sesión.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Error en registro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Registro en Kälm</h2>
      {error && (
        <div style={{ marginBottom: 12 }}>
          <p style={{ color: "var(--danger, #ef4444)", margin: 0 }}>{error}</p>
        </div>
      )}
      <form className="card form" onSubmit={handleSubmit} autoComplete="off">
        <div className="field"><label>Nombre</label><input name="nombre" value={form.nombre} onChange={handleChange} autoComplete="name" /></div>
        <div className="field"><label>Email</label><input name="email" type="email" value={form.email} onChange={handleChange} autoComplete="username" /></div>
        <div className="field"><label>Contraseña</label><input name="password" type="password" value={form.password} onChange={handleChange} autoComplete="new-password" /></div>

        <div className="form-actions">
          <button className="btn primary" type="submit" disabled={loading}>{loading ? "Registrando..." : "Registrarme"}</button>
        </div>
      </form>
    </div>
  );
}
