import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm(s => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const j = await res.json();
      if (!res.ok) throw j;
      const token = j.data?.jwt || j.token || j.jwt;
      if (!token) throw new Error("Token no recibido");
      login("ok", token);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      alert(err.msg || err.message || "Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2>Iniciar sesión en Kälm</h2>
      <form className="card form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="field">
          <label>Contraseña</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} />
        </div>

        <div className="form-actions">
          <button className="btn primary" type="submit" disabled={loading}>{loading ? "Ingresando..." : "Ingresar"}</button>
        </div>
      </form>
    </div>
  );
}
