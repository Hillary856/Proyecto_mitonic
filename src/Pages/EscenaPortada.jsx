import { useRef, useState } from "react";

import Escena1 from "./Comicc.jsx/Escena1";
import Escena2 from "./Comicc.jsx/Escena2";
import Escena3 from "./Comicc.jsx/Escena3";

import {
  FaVolumeUp,
  FaVolumeMute,
  FaMicrophone,
  FaStop,
  FaClosedCaptioning
} from "react-icons/fa";

import "./EscenaPortada.css";


export const EscenaPortada = () => {


  const [capituloActivo, setCapituloActivo] = useState(1);

  const [escenaIniciada, setEscenaIniciada] = useState(false);

  const [musicaActiva, setMusicaActiva] = useState(false);

  const [narradorActivo, setNarradorActivo] = useState(false);

  const [textoNarracionActivo, setTextoNarracionActivo] = useState(false);


  

  const pantallaRef = useRef(null);

  const audioRef = useRef(null);

  const escenaRef = useRef(null);


  /* =====================================================
     CAPÍTULOS
  ===================================================== */

  const capitulos = [

    {
      numero: "01",
      titulo: "EL COMIENZO",
      disponible: true
    },

    {
      numero: "02",
      titulo: "PRÓXIMAMENTE",
      disponible: true
    },

    {
      numero: "03",
      titulo: "PRÓXIMAMENTE",
      disponible: true
    },

    {
      numero: "04",
      titulo: "PRÓXIMAMENTE",
      disponible: true
    },

    {
      numero: "05",
      titulo: "PRÓXIMAMENTE",
      disponible: true
    },

    {
      numero: "06",
      titulo: "PRÓXIMAMENTE",
      disponible: true
    }

  ];


  /* =====================================================
     SELECCIONAR CAPÍTULO
  ===================================================== */

  const seleccionarCapitulo = (capitulo) => {

    if (!capitulo.disponible) return;

    const numero = Number(capitulo.numero);

    setCapituloActivo(numero);

    setEscenaIniciada(true);

    /*
      El audio lo inicia la propia escena.
    */

    setNarradorActivo(false);

    setTextoNarracionActivo(false);

  };


  /* =====================================================
     MÚSICA GENERAL
  ===================================================== */

  const alternarMusica = () => {

    if (!audioRef.current) return;


    if (musicaActiva) {

      audioRef.current.pause();

      setMusicaActiva(false);

    } else {

      audioRef.current
        .play()
        .then(() => {

          setMusicaActiva(true);

        })
        .catch((error) => {

          console.error(
            "No se pudo reproducir la música:",
            error
          );

        });

    }

  };


  /* =====================================================
     NARRADOR
  ===================================================== */

  const alternarNarrador = () => {

    if (!escenaRef.current) return;

    if (
      typeof escenaRef.current.toggleNarracion ===
      "function"
    ) {

      escenaRef.current.toggleNarracion();

    }

  };


  /* =====================================================
     ESTADO DEL NARRADOR
  ===================================================== */

  const actualizarEstadoNarrador = (activo) => {

    setNarradorActivo(activo);

  };


  /* =====================================================
     TEXTO
  ===================================================== */

  const alternarTextoNarracion = () => {

    setTextoNarracionActivo(
      (activo) => !activo
    );

  };


  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <main className="comic-interface">


      {/* =================================================
          MÚSICA GENERAL
      ================================================= */}

      <audio
        ref={audioRef}
        loop
        src="/BOMBIS.mp3"
      />


      {/* =================================================
          LOGO
      ================================================= */}

      <a
        href="/"
        className="comic-logo"
      >

        <img
          src="/public/Logo.png"
          alt="Mitonic"
        />

      </a>


      {/* =================================================
          CONTENEDOR PRINCIPAL
      ================================================= */}

      <div className="comic-layout">


        {/* =================================================
            PANTALLA PRINCIPAL
        ================================================= */}

        <section
          ref={pantallaRef}
          className={`comic-pantalla ${
            escenaIniciada
              ? "escena-activa"
              : ""
          }`}
        >


          {/* =================================================
              CONTROLES
          ================================================= */}

          <div className="comic-controles">


            {/* MÚSICA */}

            <button
              className="comic-control"
              onClick={alternarMusica}
              aria-label={
                musicaActiva
                  ? "Silenciar música"
                  : "Activar música"
              }
            >

              {musicaActiva
                ? <FaVolumeUp />
                : <FaVolumeMute />
              }

            </button>


            {/* NARRADOR */}

            <button
              className="comic-control"
              onClick={alternarNarrador}
              aria-label={
                narradorActivo
                  ? "Detener narrador"
                  : "Activar narrador"
              }
            >

              {narradorActivo
                ? <FaStop />
                : <FaMicrophone />
              }

            </button>


            {/* TEXTO */}

            <button
              className={`comic-control ${
                textoNarracionActivo
                  ? "activo"
                  : ""
              }`}
              onClick={alternarTextoNarracion}
              aria-label={
                textoNarracionActivo
                  ? "Ocultar texto"
                  : "Mostrar texto"
              }
            >

              <FaClosedCaptioning />

            </button>


          </div>


          {/* =================================================
              PORTADA / ESCENA
          ================================================= */}

          {!escenaIniciada ? (

            <div className="comic-pantalla-contenido">

              <h1 className="comic-titulo">

                ADRIAN Y LAS

                <br />

                CRÓNICAS DEL IMPERIO

              </h1>


              <button
                className="comic-boton-comenzar"
                onClick={() =>
                  seleccionarCapitulo(capitulos[0])
                }
              >

                <span>▶</span>

                COMENZAR

              </button>

            </div>

          ) : (

            <div className="comic-escena">


              {/* =================================================
                  ESCENA 1
              ================================================= */}

              {capituloActivo === 1 && (

                <Escena1
                  ref={escenaRef}
                  textoNarracionActivo={
                    textoNarracionActivo
                  }
                  onNarradorEstadoChange={
                    actualizarEstadoNarrador
                  }
                />

              )}


              {/* =================================================
                  ESCENA 2
              ================================================= */}

              {capituloActivo === 2 && (

                <Escena2
                  ref={escenaRef}
                  onNarradorEstadoChange={
                    actualizarEstadoNarrador
                  }
                />

              )}


              {/* =================================================
                  ESCENA 3
              ================================================= */}

              {capituloActivo === 3 && (

                <Escena3
                  ref={escenaRef}
                  onNarradorEstadoChange={
                    actualizarEstadoNarrador
                  }
                />

              )}


            </div>

          )}

        </section>


        {/* =================================================
            PANEL DE CAPÍTULOS
        ================================================= */}

        <aside className="comic-capitulos">

          <h2 className="comic-capitulos-titulo">

            CAPÍTULOS

          </h2>


          <div className="comic-capitulos-lista">

            {capitulos.map((capitulo) => (

              <button
                key={capitulo.numero}
                className={`
                  comic-capitulo
                  ${
                    capitulo.disponible
                      ? "disponible"
                      : "bloqueado"
                  }
                  ${
                    capituloActivo ===
                    Number(capitulo.numero)
                      ? "seleccionado"
                      : ""
                  }
                `}
                onClick={() =>
                  seleccionarCapitulo(capitulo)
                }
                disabled={!capitulo.disponible}
              >

                <div className="comic-capitulo-numero">

                  {capitulo.numero}

                </div>


                <div className="comic-capitulo-info">

                  <span>

                    CAPÍTULO {capitulo.numero}

                  </span>

                  <strong>

                    {capitulo.titulo}

                  </strong>

                </div>

              </button>

            ))}

          </div>

        </aside>


      </div>

    </main>

  );
};


export default EscenaPortada;