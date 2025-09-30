import React from 'react';
import '../Css/Nuevocontacto.css';

function NuevoContacto({ form, onChange, onSubmit, loading }) {
  return (
    <div className="nuevo-contacto-container">
      <h2>Agregar Nuevo Contacto</h2>
      <form onSubmit={onSubmit} className="form-nuevo-contacto">
        <label>
          Nombre*:
          <input
            type="text"
            name="Nombre"
            value={form.Nombre}
            onChange={onChange}
            required
          />
        </label>
        <label>
          Cargo*:
          <input
            type="text"
            name="Cargo"
            value={form.Cargo}
            onChange={onChange}
            required
          />
        </label>
        <label>
          Teléfono*:
          <input
            type="text"
            name="Telefono"
            value={form.Telefono}
            onChange={onChange}
            required
          />
        </label>
        <label>
          Ciudad*:
          <input
            type="text"
            name="Ciudad"
            value={form.Ciudad}
            onChange={onChange}
            required
          />
        </label>
        <label>
          URL Imagen:
          <input
            type="text"
            name="Imagen"
            value={form.Imagen}
            onChange={onChange}
            required
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </form>
    </div>
  );
}

export default NuevoContacto;
