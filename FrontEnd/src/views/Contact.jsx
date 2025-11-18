import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  function handleChange(e) {
    setForm(s => ({ ...s, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Gracias. Tu mensaje fue enviado (simulado).");
    setForm({ nombre: "", email: "", mensaje: "" });
  }

  return (
    <div>
      <h2>Contacto — Kälm</h2>
      <form className="card form" onSubmit={handleSubmit}>
        <div className="field"><label>Nombre</label><input name="nombre" value={form.nombre} onChange={handleChange} /></div>
        <div className="field"><label>Email</label><input name="email" type="email" value={form.email} onChange={handleChange} /></div>
        <div className="field"><label>Mensaje</label><textarea name="mensaje" value={form.mensaje} onChange={handleChange} /></div>
        <div className="form-actions"><button className="btn primary" type="submit">Enviar</button></div>
      </form>
    </div>
  );
}
