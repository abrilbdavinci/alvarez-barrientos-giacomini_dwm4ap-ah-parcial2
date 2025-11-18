import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="card">
      <h2>No encontrado</h2>
      <p className="muted">La ruta solicitada no existe.</p>
      <Link to="/" className="btn">Volver al inicio</Link>
    </div>
  );
}
