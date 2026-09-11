import { useState, useEffect, useRef } from "react";

import lottieReact from "lottie-react";

import AdrianHablando from "../../assets/AdrianHablando.json";

import Esc2Audio1 from "../../Audios/Esc2Audio1.mp3";
import Esc2Audio2 from "../../Audios/Esc2Audio2.mp3";
import Esc2Audio3 from "../../Audios/Esc2Audio3.mp3";
import Esc2Audio4 from "../../Audios/Esc2Audio4.mp3";
import Esc2Audio5 from "../../Audios/Esc2Audio5.mp3";
import Esc2Audio6 from "../../Audios/Esc2Audio6.mp3";
import Esc2Audio7 from "../../Audios/Esc2Audio7.mp3";
import Esc2Audio8 from "../../Audios/Esc2Audio8.mp3";

import "./Escenas.css";

const Lottie = lottieReact.default;

const Escena2 = ({
  onNarracionTerminada
}) => {

  /* =====================================================
     AUDIOS DE ADRIÁN HABLANDO (EN SECUENCIA)
  ===================================================== */

  const audiosAdrian = [
    Esc2Audio1,
    Esc2Audio2,
    Esc2Audio3,
    Esc2Audio4,
    Esc2Audio5,
    Esc2Audio6,
    Esc2Audio7,
    Esc2Audio8
  ];


  /* =====================================================
     ESTADO DE ADRIÁN
  ===================================================== */

  const [adrianVisible, setAdrianVisible] = useState(false);

  const [mostrarFlash, setMostrarFlash] = useState(false);

  const [audioActual, setAudioActual] = useState(0);

  const audioRef = useRef(null);


  /* =====================================================
     ENTRADA "PUM" DE ADRIÁN CON FLASH
  ===================================================== */

  useEffect(() => {

    setMostrarFlash(true);
    setAdrianVisible(true);

    const quitarFlash = setTimeout(() => {
      setMostrarFlash(false);
    }, 250);

    return () => clearTimeout(quitarFlash);

  }, []);


  /* =====================================================
     REPRODUCIR CADA AUDIO CUANDO CAMBIA
  ===================================================== */

  useEffect(() => {

    if (!adrianVisible) return;

    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

  }, [adrianVisible, audioActual]);


  /* =====================================================
     PASAR AL SIGUIENTE AUDIO O TERMINAR
  ===================================================== */

  const manejarFinAudio = () => {

    if (audioActual < audiosAdrian.length - 1) {
      setAudioActual((anterior) => anterior + 1);
    } else if (onNarracionTerminada) {
      onNarracionTerminada();
    }

  };


  return (

    <div className="escena-2">

      <div className="escena-2-contenido">

        {/* =================================================
            FONDO DE ATENAS
            Sistema de coordenadas: 1024 × 598
        ================================================= */}

        <img
          src="/Escenarios/FondoAtenas.svg"
          alt="Atenas"
          className="escena-2-fondo"
        />

        {/* =================================================
            ELEMENTOS DE LA ESCENA
            Todos utilizan el mismo sistema de
            coordenadas del fondo.
        ================================================= */}

        <svg
          className="escena-2-overlay"
          viewBox="0 0 1024 598"
          preserveAspectRatio="none"
        >

          {/* =================================================
              ÁRBOL 1
          ================================================= */}

          <image
            href="/Escenarios/arbol1.svg"
            x="939"
            y="79"
            width="120"
            height="278"
          />

          {/* =================================================
              ÁRBOL 2
          ================================================= */}

          <image
            href="/Escenarios/arbol2.svg"
            x="914"
            y="105"
            width="70"
            height="250"
          />

          {/* =================================================
              ARBUSTO 1
          ================================================= */}

          <image
            href="/Escenarios/arbusto1.svg"
            x="890"
            y="300"
            width="150"
            height="100"
          />

          {/* =================================================
              ARBUSTO 2
          ================================================= */}

          <image
            href="/Escenarios/arbusto2.svg"
            x="425"
            y="323"
            width="90"
            height="85"
          />

          {/* =================================================
              ARBUSTO 3
          ================================================= */}

          <image
            href="/Escenarios/arbusto3.svg"
            x="223"
            y="300"
            width="110"
            height="105"
          />

        </svg>


        {/* =================================================
            FLASH DE ENTRADA "PUM"
        ================================================= */}

        {mostrarFlash && (
          <div className="escena-2-flash" />
        )}


        {/* =================================================
            ADRIÁN HABLANDO (ENTRA DE GOLPE)
        ================================================= */}

        {adrianVisible && (

          <div className="escena-2-adrian-hablando">

            <Lottie
              animationData={AdrianHablando}
              loop={true}
              autoplay={true}
            />

          </div>

        )}


        {/* =================================================
            AUDIO OCULTO — REPRODUCE EN SECUENCIA
        ================================================= */}

        <audio
          ref={audioRef}
          src={audiosAdrian[audioActual]}
          onEnded={manejarFinAudio}
        />

      </div>

    </div>

  );
};

export default Escena2;