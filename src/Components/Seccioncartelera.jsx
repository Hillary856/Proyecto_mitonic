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
    etiqueta: "El rey de los dioses se escondió en una cueva",
    dato: "Según el mito griego, la diosa Rea escondió al bebé Zeus en una cueva de Creta para que su padre, Cronos, no lo devorara. Por eso los griegos consideraron sagradas varias cuevas de la isla y les llevaban ofrendas."
  },
  2: {
    etiqueta: "Las leyes de Atenas se decidían a mano alzada",
    dato: "En la Asamblea, que se reunía al aire libre en la colina de la Pnyx, cualquier ciudadano varón podía hablar y votar levantando la mano. Allí se decidían la guerra, la paz y las leyes de la ciudad. Las mujeres, los extranjeros y las personas esclavizadas no podían participar."
  },
  3: {
    etiqueta: "Sócrates no daba clases: se pasaba el día conversando en el Ágora",
    dato: "El filósofo recorría la plaza haciéndole preguntas difíciles a quien se cruzara, desde artesanos hasta políticos. Nunca escribió un libro. Lo que sabemos de su forma de pensar viene de sus discípulos, sobre todo de Platón."
  },
  4: {
    etiqueta: "En los juicios del Ágora, el tiempo para hablar se medía con agua",
    dato: "Un reloj de agua llamado clepsidra marcaba cuánto podía hablar cada persona en el tribunal. Cuando se vaciaba, había que callar, aunque el discurso no hubiera terminado. En las excavaciones del Ágora se encontró uno."
  },
  5: {
    etiqueta: "Cada espectador del Coliseo tenía una entrada numerada",
    dato: "Para llenar el edificio sin caos, cada persona recibía una ficha con su puerta, su sección y su asiento. Tenía unas 80 entradas, y se calcula que podía caber y vaciarse con mucha rapidez para su época. El lugar dependía de la clase social."
  },
  6: {
    etiqueta: "Los romanos calentaban el suelo de sus casas y baños",
    dato: "Usaban un sistema llamado hipocausto: el aire caliente de un horno circulaba bajo el piso, sostenido por pequeños pilares de ladrillo, y subía por conductos dentro de las paredes. Se usaba en baños públicos y en casas de gente adinerada. Quedan restos en muchas ciudades del antiguo Imperio, de Italia a Britania."
  },
  7: {
    etiqueta: "Los romanos tumbaban montañas con agua para sacar oro",
    dato: "En Las Médulas, al noroeste de España, los romanos cavaban túneles dentro de la montaña y los llenaban de agua traída por canales desde lejos. La presión derrumbaba la roca y el agua arrastraba el oro."
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

      
      {CARAS[numero].cifra && (
        <strong className="atras-cifra">
          {CARAS[numero].cifra}
        </strong>
      )}

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
                FONDO 3 (ÁGORA DE CERCA)
            ========================================= */}

            <div
              className={`cartelera fondo-3 ${volteada === 3 ? "volteada" : ""}`}
              onClick={() => manejarClick(3)}
            >

              <div
                className="imagen-cartelera"
                style={{ overflow: "hidden" }}
              >

                <span className="etiqueta-capitulo">
                  CAPÍTULO 03
                </span>

                <img
                  src="/agoranormal.png"
                  alt="Ágora de cerca"
                  style={{
                    transform: "scale(1.8)",
                    transformOrigin: "100% 55%"
                  }}
                />

                <h3>
                  ÁGORA
                </h3>

              </div>

              {reverso(3)}

            </div>



            {/* =========================================
                FONDO 4 (ÁGORA AMPLIADA)
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
                  src="/ágora(ampliado).png"
                  alt="Ágora ampliado"
                />

                <h3>
                  ÁGORA II
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
                  src="/coliseo.png"
                  alt="Coliseo"
                />

                <h3>
                  COLISEO
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
                  src="/imperio1.png"
                  alt="Imperio"
                />

                <h3>
                  IMPERIO
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
                  alt="Cueva II"
                />

                <h3>
                  CUEVA II
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