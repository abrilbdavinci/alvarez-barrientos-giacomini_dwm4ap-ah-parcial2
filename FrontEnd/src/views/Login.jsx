import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
<<<<<<< HEAD
import { apiFetch } from "../api";
=======

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
<<<<<<< HEAD
    setError("");
  }

  function validateForm() {
    if (!form.email || !form.password) return "Por favor completá email y contraseña.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "Email inválido.";
    if (form.password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    return null;
=======
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
<<<<<<< HEAD
    const validation = validateForm();
    if (validation) {
      setError(validation);
      return;
    }
    setLoading(true);
    try {
      const data = await apiFetch("/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      if (typeof login === "function") {
        try {
          login("ok", data.token); // login(status, token)
=======

    // validación simple antes de enviar
    if (!form.email || !form.password) {
      setError("Por favor completá email y contraseña.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // mantener si usás cookies; si no, podés quitarlo
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      // intentar parsear JSON aunque venga error
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // mostrar mensaje claro dependiendo del status
        const msg = data?.msg || (res.status === 401 ? "Credenciales inválidas" : "Error en el servidor");
        console.error("Login error:", data, "status:", res.status);
        setError(msg);
        return;
      }

      // Login exitoso
      console.log("Login success:", data);

      // Si tu AuthContext espera token o user, adaptá esto:
      // ejemplo: login(data.token, data.user) o login(data)
      if (typeof login === "function") {
        try {
          login(data); // ajustar según la implementación de AuthContext
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
        } catch (ctxErr) {
          console.warn("AuthContext.login fallo:", ctxErr);
        }
      }
<<<<<<< HEAD
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Error de conexión con el servidor");
=======

      // redirigir a home o dashboard
      navigate("/", { replace: true });
    } catch (err) {
      console.error("Login fetch error:", err);
      setError("Error de conexión con el servidor");
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Iniciar sesión en Kälm</h2>

      {error && (
        <div style={{ marginBottom: 12 }}>
          <p style={{ color: "var(--danger, #ef4444)", margin: 0 }}>{error}</p>
        </div>
      )}

<<<<<<< HEAD
      <form className="card form" onSubmit={handleSubmit} autoComplete="off">
        <div className="field">
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} autoComplete="username" />
        </div>
        <div className="field">
          <label>Contraseña</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} autoComplete="current-password" />
        </div>

        <div className="form-actions">
          <button className="btn primary" type="submit" disabled={loading}>{loading ? "Iniciando..." : "Iniciar sesión"}</button>
=======
      <form className="card form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>

        <div className="field">
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>

        <div className="form-actions" style={{ marginTop: 8 }}>
          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
>>>>>>> e8f5d083fd2c79bae1034b9d916da85eb4035257
        </div>
      </form>
    </div>
  );
}
