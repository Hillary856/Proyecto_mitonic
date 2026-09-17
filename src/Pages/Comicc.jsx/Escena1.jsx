import { useState } from "react";

import lottieReact from "lottie-react";

import CicloAdrianBody from "../../assets/CicloAdrianBody.json";
import AdrianHablando from "../../assets/AdrianHablando.json";

import img0 from "../../assets/AdrianBody/img_0.png";
import img1 from "../../assets/AdrianBody/img_1.png";
import img2 from "../../assets/AdrianBody/img_2.png";
import img3 from "../../assets/AdrianBody/img_3.png";
import img4 from "../../assets/AdrianBody/img_4.png";
import img5 from "../../assets/AdrianBody/img_5.png";
import img6 from "../../assets/AdrianBody/img_6.png";
import img7 from "../../assets/AdrianBody/img_7.png";

import Es1Moneda from "../../AssetsNuevos/Es1Moneda.svg";
import Es1Jarron from "../../AssetsNuevos/Es1Jarron.svg";
import Es1Lanza from "../../AssetsNuevos/Es1Lanza.svg";

import "./Escenas.css";

const Lottie = lottieReact.default;

const Escena1 = ({
  onCaminataTerminada,
  momentoNarracion
}) => {

  /* =====================================================
     IMÁGENES DEL CICLO DE CAMINATA
  ===================================================== */

  const imagenesAdrian = [
    img0,
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7
  ];


  /* =====================================================
     PREPARAR JSON DE ADRIÁN CAMINANDO
  ===================================================== */

  const animacionAdrian = {
    ...CicloAdrianBody,

    assets: CicloAdrianBody.assets.map((asset, index) => ({
      ...asset,
      u: "",
      p: imagenesAdrian[index]
    }))
  };


  /* =====================================================
     ESTADOS DE ADRIÁN
  ===================================================== */

  const [adrianHabla, setAdrianHabla] = useState(false);


  /* =====================================================
     ESTADO DEL MODAL
  ===================================================== */

  const [objetoActivo, setObjetoActivo] = useState(null);


  /* =====================================================
     TERMINAR CAMINATA
  ===================================================== */

  const terminarCaminata = () => {

    setAdrianHabla(true);

    if (onCaminataTerminada) {
      onCaminataTerminada();
    }

  };


  /* =====================================================
     ABRIR MODAL
  ===================================================== */

  const abrirModal = (objeto) => {

    setObjetoActivo(objeto);

  };


  /* =====================================================
     CERRAR MODAL
  ===================================================== */

  const cerrarModal = () => {

    setObjetoActivo(null);

  };


  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <div className="escena-1">

      <div className="escena-1-contenido">


        {/* =================================================
            FONDO DE LA CUEVA
        ================================================= */}

        <img
          src="/Escenarios/FondoCueva.svg"
          alt="Cueva"
          className="escena-1-fondo"
        />


        {/* =================================================
            FUEGO
        ================================================= */}

        <svg
          className="escena-1-overlay"
          viewBox="0 0 1024 598"
          preserveAspectRatio="none"
        >

          <image
            href="/Escenarios/fuegoAnto.svg"
            x="302"
            y="185"
            width="35"
            height="75"
          />

        </svg>


        {/* =================================================
            ADRIÁN CAMINANDO
        ================================================= */}

        {!adrianHabla && (

          <div
            className="escena-1-adrian-prueba"
            onAnimationEnd={terminarCaminata}
          >

            <Lottie
              animationData={animacionAdrian}
              loop={true}
              autoplay={true}
            />

          </div>

        )}


        {/* =================================================
            ADRIÁN HABLANDO
        ================================================= */}

        {adrianHabla && (

          <div className="escena-1-adrian-hablando">

            <Lottie
              animationData={AdrianHablando}
              loop={true}
              autoplay={true}
            />

          </div>

        )}


        {/* =================================================
            MONEDA
            MOMENTO 3
        ================================================= */}

        {momentoNarracion === 3 && (

          <button
            className="escena-1-moneda-boton"
            onClick={() => abrirModal("moneda")}
            aria-label="Explorar moneda"
          >

            <img
              src={Es1Moneda}
              alt="Moneda antigua"
              className="escena-1-moneda"
            />

          </button>

        )}


        {/* =================================================
            JARRÓN
            MOMENTO 4 Y 5
        ================================================= */}

        {(
          momentoNarracion === 4 ||
          momentoNarracion === 5
        ) && (

          <button
            className="escena-1-jarron-boton"
            onClick={() => abrirModal("jarron")}
            aria-label="Explorar jarrón"
          >

            <img
              src={Es1Jarron}
              alt="Jarrón antiguo"
              className="escena-1-jarron"
            />

          </button>

        )}


        {/* =================================================
            LANZA
            MOMENTO 6
        ================================================= */}

        {momentoNarracion === 6 && (

          <button
            className="escena-1-lanza-boton"
            onClick={() => abrirModal("lanza")}
            aria-label="Explorar lanza"
          >

            <img
              src={Es1Lanza}
              alt="Lanza antigua"
              className="escena-1-lanza"
            />

          </button>

        )}


        {/* =================================================
            MODAL
        ================================================= */}

        {objetoActivo && (

          <div
            className="escena-1-modal-fondo"
            onClick={cerrarModal}
          >

            <div
              className="escena-1-modal"
              onClick={(evento) =>
                evento.stopPropagation()
              }
            >


              {/* =================================================
                  IMAGEN DEL OBJETO
              ================================================= */}

              <div className="escena-1-modal-imagen">

                {objetoActivo === "moneda" && (

                  <img
                    src={Es1Moneda}
                    alt="Moneda antigua"
                  />

                )}

                {objetoActivo === "jarron" && (

                  <img
                    src={Es1Jarron}
                    alt="Jarrón antiguo"
                  />

                )}

                {objetoActivo === "lanza" && (

                  <img
                    src={Es1Lanza}
                    alt="Lanza antigua"
                  />

                )}

              </div>


              {/* =================================================
                  INFORMACIÓN DEL OBJETO
              ================================================= */}

              <div className="escena-1-modal-info">

                {objetoActivo === "moneda" && (
                  <>
                    <h2>MONEDA</h2>

                    <p>
                      Las monedas son mucho más que una forma de pagar.
                      Gracias a ellas podemos comerciar con mayor facilidad
                      y conocer quién tiene el poder en una determinada época.
                    </p>
                  </>
                )}


                {objetoActivo === "jarron" && (
                  <>
                    <h2>JARRÓN</h2>

                    <p>
                      Aunque parece un objeto cotidiano, estos jarrones pueden contar muchísimo sobre nosotros. Podemos encontrar escenas de nuestras costumbres, guerras, creencias y hasta momentos de nuestra vida diaria.
                    </p>
                  </>
                )}


                {objetoActivo === "lanza" && (
                  <>
                    <h2>LANZA</h2>

                    <p>
                      Es una de las armas principales de nuestros guerreros. Los hoplitas la utilizan junto con su escudo para enfrentarse al enemigo y proteger su ciudad.
                    </p>
                  </>
                )}

              </div>


              {/* =================================================
                  CERRAR
              ================================================= */}

              <button
                className="escena-1-modal-cerrar"
                onClick={cerrarModal}
                aria-label="Cerrar información"
              >
                ×
              </button>


            </div>

          </div>

        )}

      </div>

    </div>

  );
};

export default Escena1;