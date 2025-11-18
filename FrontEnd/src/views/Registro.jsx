import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { apiFetch } from "../api";
=======

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257

export default function Registro() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD
  const [error, setError] = useState("");
=======
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
  const navigate = useNavigate();

  function handleChange(e) {
    setForm(s => ({ ...s, [e.target.name]: e.target.value }));
<<<<<<< HEAD
    setError("");
  }

  function validateForm() {
    if (!form.nombre || !form.email || !form.password) return "Todos los campos son obligatorios.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Email inválido.";
    if (form.password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    return null;
=======
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
  }

  async function handleSubmit(e) {
    e.preventDefault();
<<<<<<< HEAD
    setError("");
    const validation = validateForm();
    if (validation) {
      setError(validation);
      return;
    }
    setLoading(true);
    try {
      await apiFetch("/usuarios/", {
=======
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/usuarios/`, {
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: form.nombre, email: form.email, password: form.password })
      });
<<<<<<< HEAD
      alert("Registro exitoso. Inicia sesión.");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Error en registro");
=======
      const j = await res.json();
      if (!res.ok) throw j;
      alert("Registro exitoso. Inicia sesión.");
      navigate("/login");
    } catch (err) {
      console.error("Registro error:", err);
      alert(err.msg || err.message || "Error en registro");
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Registro en Kälm</h2>
<<<<<<< HEAD
      {error && (
        <div style={{ marginBottom: 12 }}>
          <p style={{ color: "var(--danger, #ef4444)", margin: 0 }}>{error}</p>
        </div>
      )}
      <form className="card form" onSubmit={handleSubmit} autoComplete="off">
        <div className="field"><label>Nombre</label><input name="nombre" value={form.nombre} onChange={handleChange} autoComplete="name" /></div>
        <div className="field"><label>Email</label><input name="email" type="email" value={form.email} onChange={handleChange} autoComplete="username" /></div>
        <div className="field"><label>Contraseña</label><input name="password" type="password" value={form.password} onChange={handleChange} autoComplete="new-password" /></div>
=======
      <form className="card form" onSubmit={handleSubmit}>
        <div className="field"><label>Nombre</label><input name="nombre" value={form.nombre} onChange={handleChange} /></div>
        <div className="field"><label>Email</label><input name="email" type="email" value={form.email} onChange={handleChange} /></div>
        <div className="field"><label>Contraseña</label><input name="password" type="password" value={form.password} onChange={handleChange} /></div>
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257

        <div className="form-actions">
          <button className="btn primary" type="submit" disabled={loading}>{loading ? "Registrando..." : "Registrarme"}</button>
        </div>
      </form>
    </div>
  );
}
