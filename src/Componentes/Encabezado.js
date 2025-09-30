import React from 'react';
import lupa from '../Img/lupa.png'; 
import logo from '../Img/knd.png';
import '../Css/Encabezado.css';

function Encabezado({ busqueda, onBusquedaChange, onBuscar, onCerrarSesion }) {
  return (
    <header className="encabezado">
      <div className="encabezado-top">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="titulo">Directorio Telefonico</h1>
        <button className="btncerrar" onClick={onCerrarSesion}>
          Cerrar sesión
        </button>
      </div>

      <form onSubmit={onBuscar} className="barra-busqueda">
        <input
          type="text"
          value={busqueda}
          onChange={onBusquedaChange}
          placeholder="Search"
          className="input-busqueda"
        />
        <button type="submit" className="boton-busqueda">
          <img src={lupa} alt="Buscar" className="icono-lupa" />
        </button>
      </form>
    </header>
  );
}

export default Encabezado;
