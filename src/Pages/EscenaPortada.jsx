import { useEffect, useRef, useState } from "react";

import Escena1 from "./Comicc.jsx/Escena1";
import Escena2 from "./Comicc.jsx/Escena2";
import Escena3 from "./Comicc.jsx/Escena3";

import Esc1Audio1 from "../Audios/Esc1Audio1.mp3";
import Esc1Audio2 from "../Audios/Esc1Audio2.mp3";
import Esc1Audio3 from "../Audios/Esc1Audio3.mp3";

import {
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaMicrophone,
  FaStop,
  FaClosedCaptioning
} from "react-icons/fa";

import "./EscenaPortada.css";


export const EscenaPortada = () => {

  /* =====================================================
     ESTADOS
  ===================================================== */

  const [capituloActivo, setCapituloActivo] = useState(1);

  const [escenaIniciada, setEscenaIniciada] = useState(false);

  const [musicaActiva, setMusicaActiva] = useState(false);

  const [narradorActivo, setNarradorActivo] = useState(false);

  const [textoNarracionActivo, setTextoNarracionActivo] = useState(false);

  const [momentoNarracion, setMomentoNarracion] = useState(1);

  const [caminataTerminada, setCaminataTerminada] = useState(false);

  const [audio1Terminado, setAudio1Terminado] = useState(false);

  const [pantallaCompleta, setPantallaCompleta] = useState(false);


  /* =====================================================
     REFERENCIAS
  ===================================================== */

  const pantallaRef = useRef(null);

  const audioRef = useRef(null);

  const narradorRef = useRef(null);


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
     AUDIOS DE LA ESCENA 1
  ===================================================== */

  const narracionesEscena1 = {

    1: Esc1Audio1,

    2: Esc1Audio2,

    3: Esc1Audio3

  };


  /* =====================================================
     TEXTOS DE LA ESCENA 1
  ===================================================== */

  const textosEscena1 = {

    1:
      "Un nuevo día de investigación. Nunca sé qué voy a encontrar cuando entro en una cueva como esta... y eso es justamente lo que hace interesante mi trabajo.",

    2:
      "Por lo que puedo ver, este lugar lleva bastante tiempo sin ser explorado. Quizás todavía quede algo entre estos escombros.",

    3:
      ""

  };


  /* =====================================================
     SELECCIONAR CAPÍTULO
  ===================================================== */

  const seleccionarCapitulo = (capitulo) => {

    if (!capitulo.disponible) return;

    const numero = Number(capitulo.numero);

    setCapituloActivo(numero);

    setEscenaIniciada(true);

    /*
      Reiniciar secuencia.
    */

    setCaminataTerminada(false);

    setAudio1Terminado(false);

    setMomentoNarracion(1);

    setTextoNarracionActivo(false);

    /*
      El narrador comienza automáticamente
      en el capítulo 1.
    */

    setNarradorActivo(numero === 1);

  };


  /* =====================================================
     MÚSICA
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

    if (!narradorRef.current) return;


    /*
      Detener narrador.
    */

    if (narradorActivo) {

      narradorRef.current.pause();

      narradorRef.current.currentTime = 0;

      setNarradorActivo(false);

      return;

    }


    /*
      Volver a activar desde el momento actual.
    */

    const audioActual = caminataTerminada
      ? 2
      : momentoNarracion;

    setMomentoNarracion(audioActual);

    setNarradorActivo(true);

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
     CUANDO ADRIÁN TERMINA DE CAMINAR
  ===================================================== */

  const cambiarAAudio2 = () => {

    /*
      Adrián ya llegó a su posición.
    */

    setCaminataTerminada(true);

  };


  /* =====================================================
     REPRODUCCIÓN DEL NARRADOR
  ===================================================== */

  useEffect(() => {

    if (!narradorRef.current) return;


    if (!narradorActivo) {

      narradorRef.current.pause();

      return;

    }


    const reproducirNarracion = async () => {

      try {

        narradorRef.current.currentTime = 0;

        await narradorRef.current.play();

      } catch (error) {

        console.error(
          "No se pudo reproducir la narración:",
          error
        );

      }

    };


    reproducirNarracion();

  }, [
    momentoNarracion,
    narradorActivo
  ]);


  /* =====================================================
     CUANDO TERMINA UN AUDIO
  ===================================================== */

  const narradorTerminado = () => {

    /*
      AUDIO 1
    */

    if (momentoNarracion === 1) {

      setAudio1Terminado(true);

      return;

    }


    /*
      AUDIO 2
      → pasar al AUDIO 3
    */

    if (momentoNarracion === 2) {

      setMomentoNarracion(3);

      return;

    }


    /*
      AUDIO 3
      → termina la secuencia
    */

    if (momentoNarracion === 3) {

      setNarradorActivo(false);

    }

  };


  /* =====================================================
     PASAR DE AUDIO 1 A AUDIO 2
  ===================================================== */

  useEffect(() => {

    /*
      Audio 2 comienza solamente cuando:

      1. Terminó Adrián de caminar.
      2. Terminó Audio 1.
      3. El narrador está activo.
    */

    if (
      caminataTerminada &&
      audio1Terminado &&
      momentoNarracion === 1 &&
      narradorActivo
    ) {

      setAudio1Terminado(false);

      setMomentoNarracion(2);

    }

  }, [
    caminataTerminada,
    audio1Terminado,
    momentoNarracion,
    narradorActivo
  ]);


  /* =====================================================
     DETENER NARRADOR AL CAMBIAR CAPÍTULO
  ===================================================== */

  useEffect(() => {

    if (!narradorRef.current) return;

    narradorRef.current.pause();

    narradorRef.current.currentTime = 0;

    setNarradorActivo(false);

    setCaminataTerminada(false);

    setAudio1Terminado(false);

    setMomentoNarracion(1);

    setTextoNarracionActivo(false);

  }, [capituloActivo]);


  /* =====================================================
     PANTALLA COMPLETA
  ===================================================== */

  const alternarPantallaCompleta = async () => {

    if (!pantallaRef.current) return;


    try {

      if (!document.fullscreenElement) {

        await pantallaRef.current.requestFullscreen();

        setPantallaCompleta(true);

      } else {

        await document.exitFullscreen();

        setPantallaCompleta(false);

      }

    } catch (error) {

      console.error(
        "No se pudo activar pantalla completa:",
        error
      );

    }

  };


  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <main className="comic-interface">


      {/* =================================================
          MÚSICA
      ================================================= */}

      <audio
        ref={audioRef}
        loop
        src="/BOMBIS.mp3"
      />


      {/* =================================================
          NARRADOR
      ================================================= */}

      <audio
        ref={narradorRef}
        src={
          capituloActivo === 1
            ? narracionesEscena1[momentoNarracion]
            : ""
        }
        onEnded={narradorTerminado}
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


            {/* =================================================
                MÚSICA
            ================================================= */}

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


            {/* =================================================
                NARRADOR
            ================================================= */}

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


            {/* =================================================
                TEXTO
            ================================================= */}

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


            {/* =================================================
                FULLSCREEN
            ================================================= */}

            <button
              className="comic-control"
              onClick={alternarPantallaCompleta}
              aria-label={
                pantallaCompleta
                  ? "Salir de pantalla completa"
                  : "Pantalla completa"
              }
            >

              {pantallaCompleta
                ? <FaCompress />
                : <FaExpand />
              }

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


              <p className="comic-descripcion">

                Acompaña a nuestro personaje en una aventura
                donde la historia cobra vida de una manera
                diferente e interactiva.

              </p>


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
                  TEXTO DE NARRACIÓN
              ================================================= */}

              {textoNarracionActivo &&
                capituloActivo === 1 &&
                momentoNarracion !== 3 && (

                  <div className="comic-texto-narracion">

                    {textosEscena1[momentoNarracion]}

                  </div>

              )}


              {/* =================================================
                  CAPÍTULO 1
              ================================================= */}

              {capituloActivo === 1 && (

                <Escena1
                  onCaminataTerminada={cambiarAAudio2}
                  momentoNarracion={momentoNarracion}
                />

              )}


              {/* =================================================
                  CAPÍTULO 2
              ================================================= */}

              {capituloActivo === 2 && (

                <Escena2 />

              )}


              {/* =================================================
                  CAPÍTULO 3
              ================================================= */}

              {capituloActivo === 3 && (

                <Escena3 />

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