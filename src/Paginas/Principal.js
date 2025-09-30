import React from "react";
import ContenedorContactos from "./ContenedorContactos";
import ContenedorEncabezado from './ContenedorEncabezado';
import ContenedorNuevoCont from "./ContenedorNuevoCont";

function Principal(){
    return(
        <>
        <ContenedorEncabezado/>
        <ContenedorContactos/>
        <ContenedorNuevoCont/>
        </>
    )
}
export default Principal;