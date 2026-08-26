import { useState, useEffect, useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

import "./styleHillary.css";


export const Seccioncartelera = () => {

  const [desplazamiento, setDesplazamiento] = useState(0);

  const carteleraRef = useRef(null);

  const [visible, setVisible] = useState(false);


  /* =========================================
     DETECTAR SCROLL
  ========================================= */

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.target === carteleraRef.current) {
            setVisible(entry.isIntersecting);
          }

        });

      },
      {
        threshold: 0.15
      }
    );


    if (carteleraRef.current) {
      observer.observe(carteleraRef.current);
    }


    return () => {
      observer.disconnect();
    };

  }, []);


  return (

    <section
      ref={carteleraRef}
      className={`cartelera-mitonic ${
        visible ? "visible" : ""
      }`}
    >


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
              transform: `translateX(-${
                desplazamiento * 350
              }px)`
            }}
          >


            {/* =========================================
                FONDO 1
            ========================================= */}

            <div className="cartelera fondo-1">

              <div className="imagen-cartelera">

                <span className="etiqueta-capitulo">
                  CAPÍTULO 01
                </span>

                <img
                  src="/cueva1.png"
                  alt="Cueva"
                />

                <h3>
                  CUEVA
                </h3>

              </div>

            </div>



            {/* =========================================
                FONDO 2
            ========================================= */}

            <div className="cartelera fondo-2">

              <div className="imagen-cartelera">

                <span className="etiqueta-capitulo">
                  CAPÍTULO 02
                </span>

                <img
                  src="/imperio1.png"
                  alt="Atenas"
                />

                <h3>
                  ATENAS
                </h3>

              </div>

            </div>



            {/* =========================================
                FONDO 3
            ========================================= */}

            <div className="cartelera fondo-3">

              <div className="imagen-cartelera">

                <span className="etiqueta-capitulo">
                  CAPÍTULO 03
                </span>

                <img
                  src="/coliseo1.png"
                  alt="Coliseo"
                />

                <h3>
                  COLISEO
                </h3>

              </div>

            </div>



            {/* =========================================
                FONDO 4
            ========================================= */}

            <div className="cartelera fondo-4">

              <div className="imagen-cartelera">

                <span className="etiqueta-capitulo">
                  CAPÍTULO 04
                </span>

                <img
                  src="/cueva2.png"
                  alt="Cueva"
                />

                <h3>
                  CUEVA
                </h3>

              </div>

            </div>



            {/* =========================================
                FONDO 5
            ========================================= */}

            <div className="cartelera fondo-5">

              <div className="imagen-cartelera">

                <span className="etiqueta-capitulo">
                  CAPÍTULO 05
                </span>

                <img
                  src="/atenas1.png"
                  alt="Atenas"
                />

                <h3>
                  ATENAS
                </h3>

              </div>

            </div>


          </div>

        </div>


      </div>


    </section>
  );
};