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

import "./Escenas.css";

const Lottie = lottieReact.default;

const Escena1 = () => {

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
     ESTADO
  ===================================================== */

  const [adrianHabla, setAdrianHabla] = useState(false);


  /* =====================================================
     CUANDO TERMINA LA CAMINATA
  ===================================================== */

  const terminarCaminata = () => {
    setAdrianHabla(true);
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


      </div>

    </div>
  );
};

export default Escena1;