import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { apiFetch } from "../api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setError("");
  }

  function validateForm() {
    if (!form.email || !form.password) return "Por favor completá email y contraseña.";
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
      const data = await apiFetch("/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      if (typeof login === "function") {
        try {
          login("ok", data.token); // login(status, token)
        } catch (ctxErr) {
          console.warn("AuthContext.login fallo:", ctxErr);
        }
      }
      navigate("/", { replace: true });
    } catch (err) {
      setError(err.message || "Error de conexión con el servidor");
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
        </div>
      </form>
    </div>
  );
}
