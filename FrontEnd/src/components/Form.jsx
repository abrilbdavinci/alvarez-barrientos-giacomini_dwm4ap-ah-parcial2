import React, { useState } from "react";

export default function Form({ fields = [], onSubmit, submitLabel = "Enviar" }) {
  const initial = fields.reduce((acc, f) => ({ ...acc, [f.name]: f.default || "" }), {});
  const [form, setForm] = useState(initial);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(s => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
    // caller can reset if desired
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      {fields.map(f => (
        <div key={f.name} className="field">
          <label>{f.label}</label>
          {f.type === "textarea" ? (
            <textarea name={f.name} value={form[f.name]} onChange={handleChange} />
          ) : f.type === "select" ? (
            <select name={f.name} value={form[f.name]} onChange={handleChange}>
              <option value="">Seleccionar...</option>
              {Array.isArray(f.options) && f.options.map(opt => (
                <option key={opt.value || opt._id || opt} value={opt.value || opt._id || opt}>
                  {opt.label || opt.nombre || opt}
                </option>
              ))}
            </select>
          ) : (
            <input name={f.name} value={form[f.name]} onChange={handleChange} type={f.type || "text"} />
          )}
        </div>
      ))}
      <div className="form-actions">
        <button className="btn primary" type="submit">{submitLabel}</button>
      </div>
    </form>
  );
}
