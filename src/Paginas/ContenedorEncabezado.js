import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Encabezado from '../Componentes/Encabezado';

function EncabezadoContainer() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState('');

  const cerrarSesion = () => {
    console.log("hola")
    fetch('https://apidirectoriotelefonico.vercel.app/api/cerrarsesi', {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) { 
          alert('Sesión cerrada correctamente');
          navigate('/');
        } else {
          alert('No se pudo cerrar la sesión');
        }
      })
      .catch(err => {
        console.error('Error al cerrar sesión:', err);
        alert('Error al cerrar sesión');
      });
  };

  const manejarBuscar = (e) => {
    e.preventDefault();
    if (busqueda.trim() !== '') {
      navigate(`/busqueda?q=${encodeURIComponent(busqueda)}`);
    }
  };

  return (
    <Encabezado
      busqueda={busqueda}
      onBusquedaChange={(e) => setBusqueda(e.target.value)}
      onBuscar={manejarBuscar}
      onCerrarSesion={cerrarSesion}
    />
  );
}

export default EncabezadoContainer;
