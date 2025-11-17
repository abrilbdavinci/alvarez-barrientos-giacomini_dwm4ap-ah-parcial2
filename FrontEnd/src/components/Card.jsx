import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

export default function Card({ id, title, subtitle, image, meta }) {
  return (
    <article className="card product-card">
      <div className="card-media">
        <img src={image || "/placeholder.png"} alt={title} />
      </div>
      <div className="card-body">
        <h4>{title}</h4>
        {subtitle && <div className="muted">{subtitle}</div>}
        {meta && <div className="meta mini">{meta}</div>}
        <div className="card-actions">
          <Button text="Favorito" color="ghost" />
          <Link to={`/details/${id}`} className="btn btn-outline">Ver</Link>
        </div>
      </div>
    </article>
  );
}
