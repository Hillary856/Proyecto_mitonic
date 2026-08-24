import { useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

import "./styleHillary.css";


export const Seccioncartelera = () => {

  const [desplazamiento, setDesplazamiento] = useState(0);


  return (
    <section className="cartelera-mitonic">


      {/* =========================================
          FONDO DE TIERRA
      ========================================= */}

      <div className="tierra-cartelera">

        <img
          src="/tierra.svg"
          alt=""
        />

      </div>



      {/* =========================================
          CONTENIDO
      ========================================= */}

      <div className="contenido-cartelera">


        {/* =========================================
            BOTONES
        ========================================= */}

        <div className="controles-cartelera">


          {/* BOTÓN IZQUIERDO */}

          <button
            className="boton-cartelera"
            onClick={() => {
              setDesplazamiento(
                (valor) => Math.max(valor - 1, 0)
              );
            }}
          >

            <img
              src="/btn1.svg"
              alt="Anterior"
            />

            <FaChevronLeft />

          </button>



          {/* BOTÓN DERECHO */}

          <button
            className="boton-cartelera"
            onClick={() => {
              setDesplazamiento(
                (valor) => Math.min(valor + 1, 2)
              );
            }}
          >

            <img
              src="/btn2.svg"
              alt="Siguiente"
            />

            <FaChevronRight />

          </button>


        </div>



        {/* =========================================
            VENTANA DEL CARRUSEL
        ========================================= */}

        <div className="fondos-cartelera">


          {/* =========================================
              TRACK
          ========================================= */}

          <div
            className="fondos-track"
            style={{
              transform: `translateX(-${desplazamiento * 350}px)`
            }}
          >


            {/* =========================================
                FONDO 1
            ========================================= */}

            <div className="cartelera fondo-1">

              <img
                src="/cueva1.png"
                alt="Cueva"
              />

            </div>



            {/* =========================================
                FONDO 2
            ========================================= */}

            <div className="cartelera fondo-2">

              <img
                src="/imperio1.png"
                alt="Imperio"
              />

            </div>



            {/* =========================================
                FONDO 3
            ========================================= */}

            <div className="cartelera fondo-3">

              <img
                src="/coliseo1.png"
                alt="Coliseo"
              />

            </div>



            {/* =========================================
                FONDO 4
            ========================================= */}

            <div className="cartelera fondo-4">

              <img
                src="/cueva2.png"
                alt="Escenario"
              />

            </div>



            {/* =========================================
                FONDO 5
            ========================================= */}

            <div className="cartelera fondo-5">

              <img
                src="/atenas1.png"
                alt="Escenario"
              />

            </div>


          </div>

        </div>


      </div>


    </section>
  );
};