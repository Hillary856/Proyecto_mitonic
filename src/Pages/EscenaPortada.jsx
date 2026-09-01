import { useRef, useState } from "react";
import Escena1 from "./Comicc.jsx/Escena1";

import {
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
  FaCompress
} from "react-icons/fa";

import "./EscenaPortada.css";


export const EscenaPortada = () => {

  /* =====================================================
     ESTADOS
  ===================================================== */

  const [capituloActivo, setCapituloActivo] = useState(1);

  const [escenaIniciada, setEscenaIniciada] = useState(false);

  const [musicaActiva, setMusicaActiva] = useState(false);

  const [pantallaCompleta, setPantallaCompleta] = useState(false);


  /* =====================================================
     REFERENCIAS
  ===================================================== */

  const pantallaRef = useRef(null);

  const audioRef = useRef(null);


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
      disponible: false
    },
    {
      numero: "03",
      titulo: "PRÓXIMAMENTE",
      disponible: false
    },
    {
      numero: "04",
      titulo: "PRÓXIMAMENTE",
      disponible: false
    },
    {
      numero: "05",
      titulo: "PRÓXIMAMENTE",
      disponible: false
    },
    {
      numero: "06",
      titulo: "PRÓXIMAMENTE",
      disponible: false
    }
  ];


  /* =====================================================
     SELECCIONAR CAPÍTULO
  ===================================================== */

  const seleccionarCapitulo = (capitulo) => {

    if (!capitulo.disponible) return;

    setCapituloActivo(Number(capitulo.numero));

    /*
      Por ahora solamente iniciamos el capítulo 1.
      Más adelante aquí conectaremos las escenas.
    */

    if (Number(capitulo.numero) === 1) {
      setEscenaIniciada(true);
    }

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
          console.error("No se pudo reproducir la música:", error);
        });

    }

  };


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

      <audio
        ref={audioRef}
        loop
        src="/musica-comic.mp3"
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
          className={`comic-pantalla ${escenaIniciada ? "escena-activa" : ""
            }`}
        >


          {/* =================================================
              CONTROLES DE LA ESCENA
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



            {/* PANTALLA COMPLETA */}

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
               ESCENA DEL CAPÍTULO 1
            ================================================= */

            <div className="comic-escena">

              <Escena1 />

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
                    : "bloqueado"}

                  ${capituloActivo ===
                    Number(capitulo.numero)
                    ? "seleccionado"
                    : ""}
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