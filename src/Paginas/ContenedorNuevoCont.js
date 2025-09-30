import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NuevoContacto from '../Componentes/Nuevocontacto';

function ContenedorNuevo() {
  const [form, setForm] = useState({
    Nombre: '',
    Cargo: '',
    Telefono: '',
    Ciudad: '',
    Imagen: '',
    usuario_id: localStorage.getItem('Id_Usuario') || ''  // 🔑 aquí
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.Nombre || !form.Cargo || !form.Telefono || !form.Ciudad) {
      alert('Por favor completa todos los campos obligatorios.');
      return;
    }

    if (!form.usuario_id) {
      alert('No se encontró el usuario asociado, inicia sesión de nuevo.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://apidirectoriotelefonico.vercel.app/api/contactos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // si usas cookies de sesión
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (data.success) {
        alert('Contacto creado con éxito');
        navigate('/Principal');
      } else {
        alert('Error al crear contacto: ' + data.message);
      }
    } catch (error) {
      console.error('Error al crear contacto:', error);
      alert('Error al crear contacto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <NuevoContacto
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
}

export default ContenedorNuevo;
