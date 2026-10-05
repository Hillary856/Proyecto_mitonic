import React from "react";

import Adrianpatras from "../../assets/Adrianpatras.svg";

import "./Escenas.css";


const Escena4 = () => {

  return (

    <div className="escena-4">

      <div className="escena-4-contenido">


        {/* =================================================
           FONDO
        ================================================= */}

        <img
          src="/Escenarios/FondoAgora2.svg"
          alt="Ágora"
          className="escena-4-fondo"
        />


        {/* =================================================
           ADRIÁN DE ESPALDAS
        ================================================= */}

        <img
          src={Adrianpatras}
          alt="Adrián de espaldas"
          className="escena-4-adrian-atras"
        />


      </div>

    </div>

  );

};


export default Escena4;