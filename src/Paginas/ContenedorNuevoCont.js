import React, { useState } from "react";

const ContenedorNuevoCont = ({ onClose, onAdd }) => {
  // Leer usuario desde localStorage
  const storedUser = JSON.parse(localStorage.getItem("usuarios"));
  console.log("Usuario guardado en localStorage:", storedUser);

  const [form, setForm] = useState({
    Nombre: "",
    Cargo: "",
    Telefono: "",
    Ciudad: "",
    Imagen: "",
    usuario_id: storedUser ? storedUser.Id_Usuario : "" // 👈 aquí toma el ID del usuario
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.usuario_id) {
      alert("No se encontró el usuario asociado, inicia sesión de nuevo.");
      return;
    }

    try {
      const response = await fetch(
  "https://apidirectoriotelefonico.vercel.app/api/contactos",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // 👈 MUY IMPORTANTE para que viaje la cookie
    body: JSON.stringify(form),
  }
);


      const data = await response.json();
      console.log("Respuesta del backend:", data);

      if (data.success) {
        alert("Contacto agregado con éxito");
        onAdd(data.data); // Notificar al padre
        onClose(); // Cerrar modal
      } else {
        alert(data.message || "Error al agregar contacto");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("Error al conectar con el servidor");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Agregar Contacto</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="Nombre"
            placeholder="Nombre"
            value={form.Nombre}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="Cargo"
            placeholder="Cargo"
            value={form.Cargo}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Telefono"
            placeholder="Teléfono"
            value={form.Telefono}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Ciudad"
            placeholder="Ciudad"
            value={form.Ciudad}
            onChange={handleChange}
          />
          <input
            type="text"
            name="Imagen"
            placeholder="URL Imagen"
            value={form.Imagen}
            onChange={handleChange}
          />

          <button type="submit">Guardar</button>
          <button type="button" onClick={onClose}>
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContenedorNuevoCont;
