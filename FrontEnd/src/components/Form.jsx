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
