import { useState, useEffect, useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

import "./styleHillary.css";


/* =========================================
   DATOS DEL REVERSO
========================================= */

const CARAS = {
  1: {
    cifra: "1",
    etiqueta: "dios principal que, según el mito, fue criado en una cueva",
    dato: "Según una leyenda griega, Rea escondió al bebé Zeus en una cueva de Creta para protegerlo de su padre, Cronos, quien temía que uno de sus hijos lo destronara. La cueva se convirtió en un lugar sagrado."
  },
  2: {
    cifra: "6,000+",
    etiqueta: "Años de historia tiene Atenas",
    dato: "En la antigua Atenas nació una de las primeras formas de democracia. Sin embargo, las mujeres, las personas esclavizadas y los extranjeros no podían participar como ciudadanos en las decisiones políticas."
  },
  3: {
    cifra: "50,000+",
    etiqueta: "Espectadores podían asistir al Coliseo romano",
    dato: "La entrada a los espectáculos era gratuita, pero los asientos dependían de la posición social. Los más poderosos se sentaban cerca de la arena y los ciudadanos más humildes ocupaban las zonas superiores."
  },
  4: {
    cifra: "100,000+ km",
    etiqueta: "De caminos llegó a tener la red vial romana, según estimaciones históricas",
    dato: "Los romanos construyeron caminos para mover ejércitos, comerciantes y mensajes por enormes territorios. Algunas rutas fueron tan importantes que ayudaron a conectar Europa, el norte de África y partes de Asia durante siglos."
  },
  5: {
    cifra: "30,000+",
    etiqueta: "años tienen las pinturas de la cueva Chauvet, en Francia",
    dato: "Dato de ejemplo: cámbialo cuando tengas el capítulo 5."
  },
  6: {
    cifra: "000",
    etiqueta: "texto de ejemplo del capítulo 6",
    dato: "Dato de ejemplo: cámbialo cuando tengas el capítulo 6."
  },
  7: {
    cifra: "000",
    etiqueta: "texto de ejemplo del capítulo 7",
    dato: "Dato de ejemplo: cámbialo cuando tengas el capítulo 7."
  }
};


export const Seccioncartelera = () => {

  const [desplazamiento, setDesplazamiento] = useState(0);

  const carteleraRef = useRef(null);

  const [visible, setVisible] = useState(false);

  // Guarda cuál capítulo está volteado (null = ninguno)
  const [volteada, setVolteada] = useState(null);

  // Guarda el temporizador para poder limpiarlo
  const temporizadorRef = useRef(null);


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


  // Limpia el temporizador si el componente se desmonta
  useEffect(() => {
    return () => {
      if (temporizadorRef.current) {
        clearTimeout(temporizadorRef.current);
      }
    };
  }, []);


  // Voltea la tarjeta y la regresa sola después de 18 segundos
  const manejarClick = (numero) => {

    if (temporizadorRef.current) {
      clearTimeout(temporizadorRef.current);
    }

    // Si tocas la que ya está volteada, regresa
    if (volteada === numero) {
      setVolteada(null);
      return;
    }

    setVolteada(numero);

    temporizadorRef.current = setTimeout(() => {
      setVolteada(null);
    }, 18000);

  };


  // Reverso de cada tarjeta
  const reverso = (numero) => (

    <div className="cara-atras">

      <span className="atras-pregunta">
        ¿SABÍAS QUE…?
      </span>

      <strong className="atras-cifra">
        {CARAS[numero].cifra}
      </strong>

      <p className="atras-etiqueta">
        {CARAS[numero].etiqueta}
      </p>

      <p className="atras-dato">
        {CARAS[numero].dato}
      </p>

      <span className="atras-volver">
        Toca para volver
      </span>

    </div>

  );


  return (

    <section
      ref={carteleraRef}
      className={`cartelera-mitonic ${
        visible ? "visible" : ""
      }`}
    >


      {/* =========================================
          FONDO DE PERGAMINO
      ========================================= */}

      <div className="pergamino-cartelera">

        <img
          src="/pergamino.svg"
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
                desplazamiento * 700
              }px)`
            }}
          >


            {/* =========================================
                FONDO 1
            ========================================= */}

            <div
              className={`cartelera fondo-1 ${volteada === 1 ? "volteada" : ""}`}
              onClick={() => manejarClick(1)}
            >

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

              {reverso(1)}

            </div>



            {/* =========================================
                FONDO 2
            ========================================= */}

            <div
              className={`cartelera fondo-2 ${volteada === 2 ? "volteada" : ""}`}
              onClick={() => manejarClick(2)}
            >

              <div className="imagen-cartelera">

                <span className="etiqueta-capitulo">
                  CAPÍTULO 02
                </span>

                <img
                  src="/atenas1.png"
                  alt="Atenas"
                />

                <h3>
                  ATENAS
                </h3>

              </div>

              {reverso(2)}

            </div>



            {/* =========================================
                FONDO 3
            ========================================= */}

            <div
              className={`cartelera fondo-3 ${volteada === 3 ? "volteada" : ""}`}
              onClick={() => manejarClick(3)}
            >

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

              {reverso(3)}

            </div>



            {/* =========================================
                FONDO 4
            ========================================= */}

            <div
              className={`cartelera fondo-4 ${volteada === 4 ? "volteada" : ""}`}
              onClick={() => manejarClick(4)}
            >

              <div className="imagen-cartelera">

                <span className="etiqueta-capitulo">
                  CAPÍTULO 04
                </span>

                <img
                  src="/imperio1.png"
                  alt="Imperio"
                />

                <h3>
                  IMPERIO
                </h3>

              </div>

              {reverso(4)}

            </div>



            {/* =========================================
                FONDO 5
            ========================================= */}

            <div
              className={`cartelera fondo-5 ${volteada === 5 ? "volteada" : ""}`}
              onClick={() => manejarClick(5)}
            >

              <div className="imagen-cartelera">

                <span className="etiqueta-capitulo">
                  CAPÍTULO 05
                </span>

                <img
                  src="/cueva1.png"
                  alt="Atenas"
                />

                <h3>
                  CUEVA
                </h3>

              </div>

              {reverso(5)}

            </div>



            {/* =========================================
                FONDO 6
            ========================================= */}

            <div
              className={`cartelera fondo-6 ${volteada === 6 ? "volteada" : ""}`}
              onClick={() => manejarClick(6)}
            >

              <div className="imagen-cartelera">

                <span className="etiqueta-capitulo">
                  CAPÍTULO 06
                </span>

                <img
                  src="/cueva1.png"
                  alt="Capítulo 6"
                />

                <h3>
                  NOMBRE 6
                </h3>

              </div>

              {reverso(6)}

            </div>



            {/* =========================================
                FONDO 7
            ========================================= */}

            <div
              className={`cartelera fondo-7 ${volteada === 7 ? "volteada" : ""}`}
              onClick={() => manejarClick(7)}
            >

              <div className="imagen-cartelera">

                <span className="etiqueta-capitulo">
                  CAPÍTULO 07
                </span>

                <img
                  src="/cueva2.png"
                  alt="Capítulo 7"
                />

                <h3>
                  CUEVA
                </h3>

              </div>

              {reverso(7)}

            </div>


          </div>

        </div>


      </div>


    </section>
  );
};