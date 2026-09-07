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
     ESTADO DE ADRIÁN
  ===================================================== */

  const [adrianHabla, setAdrianHabla] = useState(false);


  /* =====================================================
     ESTADO DEL MODAL
  ===================================================== */

  const [modalMoneda, setModalMoneda] = useState(false);


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
     ABRIR MODAL DE LA MONEDA
  ===================================================== */

  const abrirModalMoneda = () => {

    setModalMoneda(true);

  };


  /* =====================================================
     CERRAR MODAL DE LA MONEDA
  ===================================================== */

  const cerrarModalMoneda = () => {

    setModalMoneda(false);

  };


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
            APARECE AL LLEGAR AL MOMENTO 3
        ================================================= */}

        {momentoNarracion === 3 && (

          <button
            className="escena-1-moneda-boton"
            onClick={abrirModalMoneda}
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
            MODAL DE LA MONEDA
        ================================================= */}

        {modalMoneda && (

          <div
            className="escena-1-modal-fondo"
            onClick={cerrarModalMoneda}
          >

            <div
              className="escena-1-modal"
              onClick={(evento) =>
                evento.stopPropagation()
              }
            >


              {/* =================================================
                  IMAGEN
              ================================================= */}

              <div className="escena-1-modal-imagen">

                <img
                  src={Es1Moneda}
                  alt="Moneda antigua"
                />

              </div>


              {/* =================================================
                  INFORMACIÓN
              ================================================= */}

              <div className="escena-1-modal-info">

                <h2>
                  MONEDA
                </h2>

                <p>
                  Las monedas son mucho más que una forma de pagar. Gracias a ellas podemos comerciar con mayor facilidad y conocer quién tiene el poder en una determinada época
                </p>

              </div>


              {/* =================================================
                  BOTÓN CERRAR
              ================================================= */}

              <button
                className="escena-1-modal-cerrar"
                onClick={cerrarModalMoneda}
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