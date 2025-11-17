import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

export default function Navbar() {
  const { authStatus, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="nav card" aria-label="Main navigation">
      <div className="nav-left">
        <Link to="/" className="brand">
          <strong>Kälm</strong>
          <span className="small muted">Bienestar & Rutinas</span>
        </Link>
      </div>

      <ul className="nav-links">
        <li><NavLink to="/" end>Inicio</NavLink></li>
        <li><NavLink to="/perfil">Perfil</NavLink></li>
        <li><NavLink to="/contact">Contacto</NavLink></li>
      </ul>

      <div className="nav-actions">
        {authStatus === "ok" ? (
          <>
            <button className="btn ghost small" onClick={() => navigate("/perfil")}>Mi cuenta</button>
            <button className="btn small" onClick={handleLogout}>Cerrar sesión</button>
          </>
        ) : (
          <>
            <button className="btn ghost small" onClick={() => navigate("/registro")}>Registro</button>
            <button className="btn primary small" onClick={() => navigate("/login")}>Iniciar</button>
          </>
        )}
      </div>
    </nav>
  );
}
