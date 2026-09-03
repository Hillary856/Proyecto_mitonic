import { useEffect, useRef, useState } from "react";

import Escena1 from "./Comicc.jsx/Escena1";
import Escena2 from "./Comicc.jsx/Escena2";
import Escena3 from "./Comicc.jsx/Escena3";

import {
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress,
  FaMicrophone,
  FaStop
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
     NARRACIONES DE LAS ESCENAS
  ===================================================== */

  const narraciones = {
    1: "/Narraciones/escena1.mp3",
    2: "/Narraciones/escena2.mp3",
    3: "/Narraciones/escena3.mp3"
  };


  /* =====================================================
     SELECCIONAR CAPÍTULO
  ===================================================== */

  const seleccionarCapitulo = (capitulo) => {

    if (!capitulo.disponible) return;

    const numero = Number(capitulo.numero);

    setCapituloActivo(numero);
    setEscenaIniciada(true);
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

    if (narradorActivo) {

      narradorRef.current.pause();
      setNarradorActivo(false);

    } else {

      narradorRef.current
        .play()
        .then(() => {
          setNarradorActivo(true);
        })
        .catch((error) => {
          console.error(
            "No se pudo reproducir la narración:",
            error
          );
        });

    }
  };


  /* =====================================================
     DETECTAR CUANDO TERMINA EL NARRADOR
  ===================================================== */

  const narradorTerminado = () => {
    setNarradorActivo(false);
  };


  /* =====================================================
     DETENER NARRADOR AL CAMBIAR DE CAPÍTULO
  ===================================================== */

  useEffect(() => {

    if (!narradorRef.current) return;

    narradorRef.current.pause();
    narradorRef.current.currentTime = 0;

    setNarradorActivo(false);

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


      {/* =====================================================
          AUDIO
      ===================================================== */}

      {/* Música de fondo */}

      <audio
        ref={audioRef}
        loop
        src="/BOMBIS.mp3"
      />


      {/* Narrador */}

      <audio
        ref={narradorRef}
        src={narraciones[capituloActivo]}
        onEnded={narradorTerminado}
      />


      {/* =====================================================
          LOGO MITONIC
      ===================================================== */}

      <a
        href="/"
        className="comic-logo"
      >

        <img
          src="/public/Logo.png"
          alt="Mitonic"
        />

      </a>


      {/* =====================================================
          CONTENEDOR PRINCIPAL
      ===================================================== */}

      <div className="comic-layout">


        {/* =================================================
            PANTALLA PRINCIPAL
        ================================================= */}

        <section
          ref={pantallaRef}
          className={`comic-pantalla ${
            escenaIniciada ? "escena-activa" : ""
          }`}
        >


          {/* =================================================
              CONTROLES DE LA ESCENA
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
                  : "Escuchar narrador"
              }
            >

              {narradorActivo
                ? <FaStop />
                : <FaMicrophone />
              }

            </button>


            {/* =================================================
                PANTALLA COMPLETA
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

            /* =================================================
               PORTADA
            ================================================= */

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


              {/* BOTÓN COMENZAR */}

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

            /* =================================================
               ESCENA ACTIVA
            ================================================= */

            <div className="comic-escena">


              {/* =================================================
                  CAPÍTULO 1
              ================================================= */}

              {capituloActivo === 1 && (
                <Escena1 />
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
                  ${capitulo.disponible
                    ? "disponible"
                    : "bloqueado"
                  }
                  ${capituloActivo ===
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


                {/* NÚMERO */}

                <div className="comic-capitulo-numero">

                  {capitulo.numero}

                </div>


                {/* INFORMACIÓN */}

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