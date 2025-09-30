import React from 'react';
import '../Css/Contactos.css';

function Contactos({ contactos, onAgregarClick, onContactoClick }) {
  return (
    <div className="contenedor">
      <div className="contenedor-boton">
        <button className="btnagregar" onClick={onAgregarClick}>
          + Agregar Contactos
        </button>
      </div>

      {contactos.length === 0 ? (
        <p>Cargando contactos...</p>
      ) : (
        contactos.map(contacto => (
          <div 
            key={contacto.Id_Contacto} 
            className="contacto-card"
            onClick={() => onContactoClick(contacto.Id_Contacto)}
            style={{ cursor: 'pointer' }}
          >
            <div className="imagen-container">
              <img 
                src={contacto.Imagen} 
                alt={`avatar${contacto.Id_Contacto}`} 
                className={`avatar${contacto.Id_Contacto}`} 
              />
            </div>
            <div className="info-container">
              <h3 className="nombre">{contacto.Nombre}</h3>
              <p className="cargo">{contacto.Cargo}</p>
              <p className="tel">{contacto.Telefono}</p>
              <p className="ciudad">📍 {contacto.Ciudad}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Contactos;
