import React from "react";

export default function ListSimple({ title, items = [], onDelete, renderItem }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <div>
        {items.length === 0 ? <div className="muted">No hay elementos</div> :
          items.map(it => (
            <div key={it._id || it.id} className="list-row">
              <div>{renderItem ? renderItem(it) : (it.nombre || it.name || it.email)}</div>
              {onDelete && <button className="btn ghost small" onClick={() => onDelete(it._id || it.id)}>Eliminar</button>}
            </div>
          ))
        }
      </div>
    </div>
  );
}
