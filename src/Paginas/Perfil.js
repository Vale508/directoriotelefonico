import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import telefono from '../Img/telefono.png';
import camara from '../Img/camara.png';
import mensaje from '../Img/mensaje.png';
import correo from '../Img/correo.png';
import '../Css/Perfil.css';

function Perfil() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editando, setEditando] = useState(false);
  const [datosContacto, setDatosContacto] = useState(null);

  useEffect(() => {
    fetch(`https://apidirectoriotelefonico.vercel.app/api/contactos/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setDatosContacto(data.data);
        } else {
          alert('Error al cargar contacto');
          navigate('/Principal');
        }
      })
      .catch(err => {
        console.error('Error al obtener contacto:', err);
        alert('Error al obtener contacto');
        navigate('/Principal');
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setDatosContacto({
      ...datosContacto,
      [e.target.name]: e.target.value,
    });
  };

  const handleGuardarEdicion = async () => {
    try {
      const response = await fetch(`https://apidirectoriotelefonico.vercel.app/api/contactos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosContacto),
      });

      const data = await response.json();

      if (data.success) {
        alert('Contacto actualizado con éxito');
        setEditando(false);
      } else {
        alert('Error al actualizar contacto');
      }
    } catch (error) {
      console.error('Error al editar contacto:', error);
      alert('Error al editar contacto');
    }
  };

  const handleEliminar = async () => {
    if (!window.confirm("¿Seguro que quieres eliminar este contacto?")) return;

    try {
      const response = await fetch(`https://apidirectoriotelefonico.vercel.app/api/contactos/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert('Contacto eliminado con éxito');
        navigate('/Principal');
      } else {
        alert('Error al eliminar contacto');
      }
    } catch (error) {
      console.error('Error al eliminar contacto:', error);
      alert('Error al eliminar contacto');
    }
  };

  if (!datosContacto) return <p>Cargando perfil...</p>;

  return (
    <div className="perfil-container">
      <button onClick={() => navigate('/Principal')} className="btn-volver">
        ← Volver a Contactos
      </button>

      <div className="perfil-card">
        <div className="perfil-header">
          <div className="perfil-imagen">
            <img src={datosContacto.Imagen || 'https://via.placeholder.com/150'} alt={datosContacto.Nombre} />
          </div>
          <div className="perfil-info-basica">
            {editando ? (
              <>
                <input
                  type="text"
                  name="Nombre"
                  value={datosContacto.Nombre}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Cargo"
                  value={datosContacto.Cargo}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Telefono"
                  value={datosContacto.Telefono}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="Ciudad"
                  value={datosContacto.Ciudad}
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <h1>{datosContacto.Nombre}</h1>
                <h2>{datosContacto.Cargo}</h2>
                <p className="departamento">{datosContacto.Telefono}</p>
                <p className="ubicacion">📍 {datosContacto.Ciudad}</p>
              </>
            )}
          </div>
        </div>

        <div className="perfil-contenido">
          <div className="seccion">
            <h3>Acciones</h3>
            <div className="acciones">
              <div className="botonera">
                <button className='botones'><img src={telefono} alt="Llamar" /></button>
                <button className='botones'><img src={mensaje} alt="Mensaje" /></button>
                <button className='botones'><img src={camara} alt="Video" /></button>
                <button className='botones'><img src={correo} alt="Correo" /></button>
              </div>
            </div>
          </div>

          <div className="seccion">
            <h3>Actividad reciente</h3>
            <img className='telefono' src={telefono} alt="Actividad" />
            <p className="biografia">Duración de la llamada: 1 min 13 s</p>
          </div>

          <div className="seccion">
            <h3>Configuración de los contactos</h3>
            <div className="opciones">
              <span className="opcion" onClick={() => setEditando(true)}>
                <img className='img1' src="https://cdn-icons-png.freepik.com/512/9143/9143985.png" alt="Editar" />
                Editar contacto
              </span>
              <span className="opcion" onClick={handleEliminar}>
                <img className='img1' src="https://cdn-icons-png.flaticon.com/512/1214/1214594.png" alt="Borrar" />
                Borrar contacto
              </span>
            </div>

            {editando && (
              <div style={{ marginTop: '10px' }}>
                <button className='btnguardar' onClick={handleGuardarEdicion}>Guardar</button>
                <button className='btnguardar' onClick={() => setEditando(false)}>Cancelar</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
