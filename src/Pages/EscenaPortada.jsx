import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

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

  /* =====================================================
     ESTADOS GENERALES
  ===================================================== */

  const [
    capituloActivo,
    setCapituloActivo
  ] = useState(1);


  const [
    escenaIniciada,
    setEscenaIniciada
  ] = useState(false);


  const [
    musicaActiva,
    setMusicaActiva
  ] = useState(false);


  const [
    narradorActivo,
    setNarradorActivo
  ] = useState(false);


  /*
    AHORA LOS SUBTÍTULOS
    COMIENZAN ACTIVADOS.
  */

  const [
    textoNarracionActivo,
    setTextoNarracionActivo
  ] = useState(true);


  /* =====================================================
     CAPÍTULOS DESBLOQUEADOS

     SOLO EL 1 COMIENZA DESBLOQUEADO.
  ===================================================== */

  const [
    capitulosDesbloqueados,
    setCapitulosDesbloqueados
  ] = useState([1]);


  /* =====================================================
     CAPÍTULO QUE HACE EL PUM
  ===================================================== */

  const [
    capituloDesbloqueando,
    setCapituloDesbloqueando
  ] = useState(null);


  /* =====================================================
     MENSAJE DE DESBLOQUEO
  ===================================================== */

  const [
    mensajeDesbloqueo,
    setMensajeDesbloqueo
  ] = useState(null);


  /* =====================================================
     TRANSICIÓN BLANCA
  ===================================================== */

  const [
    transicionBlanca,
    setTransicionBlanca
  ] = useState(null);


  /* =====================================================
     REFERENCIAS
  ===================================================== */

  const audioMusicaRef =
    useRef(null);

  const escenaRef =
    useRef(null);

  const mensajeTimerRef =
    useRef(null);

  const transicionTimerRef =
    useRef(null);

  const ocultarTransicionTimerRef =
    useRef(null);


  /* =====================================================
     CAPÍTULOS
  ===================================================== */

  const capitulos = [

    {
      numero: "01",
      titulo: "EL COMIENZO"
    },

    {
      numero: "02",
      titulo: "PRÓXIMAMENTE"
    },

    {
      numero: "03",
      titulo: "PRÓXIMAMENTE"
    },

    {
      numero: "04",
      titulo: "PRÓXIMAMENTE"
    },

    {
      numero: "05",
      titulo: "PRÓXIMAMENTE"
    },

    {
      numero: "06",
      titulo: "PRÓXIMAMENTE"
    },

    {
      numero: "07",
      titulo: "PRÓXIMAMENTE"
    }

  ];


  /* =====================================================
     LIMPIAR TEMPORIZADORES
  ===================================================== */

  useEffect(() => {

    return () => {

      if (
        mensajeTimerRef.current
      ) {

        clearTimeout(
          mensajeTimerRef.current
        );

      }


      if (
        transicionTimerRef.current
      ) {

        clearTimeout(
          transicionTimerRef.current
        );

      }


      if (
        ocultarTransicionTimerRef.current
      ) {

        clearTimeout(
          ocultarTransicionTimerRef.current
        );

      }

    };

  }, []);


  /* =====================================================
     MOSTRAR MENSAJE DE OBJETOS ENCONTRADOS

     IMPORTANTE:
     NO DESBLOQUEA EL CAPÍTULO.
  ===================================================== */

  const mostrarMensajeObjetos =
    useCallback(
      (numero) => {

        setMensajeDesbloqueo(
          numero
        );


        if (
          mensajeTimerRef.current
        ) {

          clearTimeout(
            mensajeTimerRef.current
          );

        }


        mensajeTimerRef.current =
          setTimeout(() => {

            setMensajeDesbloqueo(
              null
            );

          }, 5000);

      },
      []
    );


  /* =====================================================
     DESBLOQUEAR CAPÍTULO

     ESTA FUNCIÓN SOLO SE LLAMA CUANDO
     EL USUARIO PULSA CONTINUAR.
  ===================================================== */

  const desbloquearCapitulo =
    useCallback(
      (numero) => {

        if (
          capitulosDesbloqueados
            .includes(numero)
        ) {

          return;

        }


        setCapitulosDesbloqueados(
          (anteriores) => {

            if (
              anteriores.includes(
                numero
              )
            ) {

              return anteriores;

            }


            return [
              ...anteriores,
              numero
            ];

          }
        );


        /* ===============================================
           ANIMACIÓN PUM
        =============================================== */

        setCapituloDesbloqueando(
          numero
        );


        setTimeout(() => {

          setCapituloDesbloqueando(
            null
          );

        }, 900);

      },
      [
        capitulosDesbloqueados
      ]
    );


  /* =====================================================
     SELECCIONAR CAPÍTULO
  ===================================================== */

  const seleccionarCapitulo =
    useCallback(
      (capitulo) => {

        const numero =
          Number(
            capitulo.numero
          );


        /*
          No puede entrar a un capítulo
          bloqueado.
        */

        if (
          !capitulosDesbloqueados
            .includes(numero)
        ) {

          return;

        }


        setCapituloActivo(
          numero
        );


        setEscenaIniciada(
          true
        );


        setNarradorActivo(
          false
        );


        /*
          LOS SUBTÍTULOS
          SIEMPRE COMIENZAN ACTIVOS
          AL ENTRAR A UNA ESCENA.
        */

        setTextoNarracionActivo(
          true
        );

      },
      [
        capitulosDesbloqueados
      ]
    );


  /* =====================================================
     PASAR A CAPÍTULO 2
     
     SOLO SE EJECUTA DESPUÉS DEL CLIC
     EN "CONTINUAR".
  ===================================================== */

  const pasarACapitulo2 =
    useCallback(() => {

      /*
        Evitar doble clic.
      */

      if (
        transicionBlanca
      ) {

        return;

      }


      /* ===============================================
         DETENER NARRADOR
      =============================================== */

      setNarradorActivo(
        false
      );


      setTextoNarracionActivo(
        false
      );


      /* ===============================================
         COMENZAR DESTELLO BLANCO
      =============================================== */

      setTransicionBlanca(
        "entrando"
      );


      /*
        El blanco cubre la ventana
        antes de cambiar de escena.
      */

      transicionTimerRef.current =
        setTimeout(() => {

          setCapituloActivo(
            2
          );


          setEscenaIniciada(
            true
          );


          /*
            Al entrar a Escena 2,
            los subtítulos empiezan activos.
          */

          setTextoNarracionActivo(
            true
          );


          setTransicionBlanca(
            "saliendo"
          );


          ocultarTransicionTimerRef.current =
            setTimeout(() => {

              setTransicionBlanca(
                null
              );

            }, 900);

        }, 1250);

    }, [
      transicionBlanca
    ]);


  /* =====================================================
     MÚSICA
  ===================================================== */

  const alternarMusica = () => {

    if (
      !audioMusicaRef.current
    ) {

      return;

    }


    if (
      musicaActiva
    ) {

      audioMusicaRef.current.pause();

      setMusicaActiva(
        false
      );

    } else {

      audioMusicaRef.current
        .play()
        .then(() => {

          setMusicaActiva(
            true
          );

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

    if (
      !escenaRef.current
    ) {

      return;

    }


    if (
      typeof escenaRef.current
        .toggleNarracion ===
      "function"
    ) {

      escenaRef.current
        .toggleNarracion();

    }

  };


  /* =====================================================
     ESTADO DEL NARRADOR
  ===================================================== */

  const actualizarEstadoNarrador =
    useCallback(
      (activo) => {

        setNarradorActivo(
          activo
        );

      },
      []
    );


  /* =====================================================
     SUBTÍTULOS
  ===================================================== */

  const alternarTextoNarracion =
    () => {

      setTextoNarracionActivo(
        (activo) =>
          !activo
      );

    };


  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <main
      className="comic-interface"
    >


      {/* =================================================
          MÚSICA
      ================================================= */}

      <audio
        ref={audioMusicaRef}
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

      <div
        className="comic-layout"
      >


        {/* =================================================
            PANTALLA PRINCIPAL
        ================================================= */}

        <section
          className={`comic-pantalla ${
            escenaIniciada
              ? "escena-activa"
              : ""
          }`}
        >


          {/* =================================================
              MENSAJE DE OBJETOS ENCONTRADOS
              
              ESTÁ DENTRO DEL RECUADRO DEL CÓMIC.
          ================================================= */}

          {mensajeDesbloqueo && (

            <div
              className="comic-mensaje-desbloqueo"
            >

              <div
                className="comic-mensaje-desbloqueo-superior"
              >

                <span>
                  ✓
                </span>

                <strong>
                  ¡OBJETOS ENCONTRADOS!
                </strong>

              </div>


              <div
                className="comic-mensaje-desbloqueo-inferior"
              >

                DESBLOQUEASTE EL CAPÍTULO{" "}

                {mensajeDesbloqueo}

              </div>

            </div>

          )}


          {/* =================================================
              CONTROLES
          ================================================= */}

          <div
            className="comic-controles"
          >


            {/* MÚSICA */}

            <button
              className="comic-control"
              onClick={
                alternarMusica
              }
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
              onClick={
                alternarNarrador
              }
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


            {/* SUBTÍTULOS */}

            <button
              className={`comic-control ${
                textoNarracionActivo
                  ? "activo"
                  : ""
              }`}
              onClick={
                alternarTextoNarracion
              }
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
              PORTADA
          ================================================= */}

          {!escenaIniciada ? (

            <div
              className="comic-pantalla-contenido"
            >

              <h1
                className="comic-titulo"
              >

                ADRIAN Y LAS

                <br />

                CRÓNICAS DEL IMPERIO

              </h1>


              <button
                className="comic-boton-comenzar"
                onClick={() =>
                  seleccionarCapitulo(
                    capitulos[0]
                  )
                }
              >

                <span>
                  ▶
                </span>

                COMENZAR

              </button>

            </div>

          ) : (

            <div
              className="comic-escena"
            >


              {/* =================================================
                  ESCENA 1
              ================================================= */}

              {capituloActivo === 1 && (

                <Escena1
                  ref={
                    escenaRef
                  }

                  textoNarracionActivo={
                    textoNarracionActivo
                  }

                  onNarradorEstadoChange={
                    actualizarEstadoNarrador
                  }

                  /*
                    SOLO MUESTRA EL MENSAJE.
                    NO DESBLOQUEA.
                  */

                  onObjetosEncontrados={
                    mostrarMensajeObjetos
                  }

                  /*
                    DESBLOQUEA DE VERDAD
                    CUANDO SE PULSA CONTINUAR.
                  */

                  onCapituloDesbloqueado={
                    desbloquearCapitulo
                  }

                  /*
                    INICIA EL DESTELLO
                    Y CAMBIA A ESCENA 2.
                  */

                  onEscenaTerminada={
                    pasarACapitulo2
                  }

                />

              )}


              {/* =================================================
                  ESCENA 2
              ================================================= */}

              {capituloActivo === 2 && (

                <Escena2 />

              )}


              {/* =================================================
                  ESCENA 3
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

        <aside
          className="comic-capitulos"
        >

          <h2
            className="comic-capitulos-titulo"
          >

            CAPÍTULOS

          </h2>


          <div
            className="comic-capitulos-lista"
          >

            {capitulos.map(
              (capitulo) => {

                const numero =
                  Number(
                    capitulo.numero
                  );


                const desbloqueado =
                  capitulosDesbloqueados
                    .includes(
                      numero
                    );


                const animando =
                  capituloDesbloqueando ===
                  numero;


                return (

                  <button
                    key={
                      capitulo.numero
                    }

                    className={`
                      comic-capitulo

                      ${
                        desbloqueado
                          ? "disponible"
                          : "bloqueado"
                      }

                      ${
                        capituloActivo ===
                        numero
                          ? "seleccionado"
                          : ""
                      }

                      ${
                        animando
                          ? "desbloqueando"
                          : ""
                      }
                    `}

                    onClick={() =>
                      seleccionarCapitulo(
                        capitulo
                      )
                    }

                    disabled={
                      !desbloqueado
                    }
                  >

                    <div
                      className="comic-capitulo-numero"
                    >

                      {
                        capitulo.numero
                      }

                    </div>


                    <div
                      className="comic-capitulo-info"
                    >

                      <span>

                        CAPÍTULO{" "}

                        {
                          capitulo.numero
                        }

                      </span>


                      <strong>

                        {
                          capitulo.titulo
                        }

                      </strong>

                    </div>

                  </button>

                );

              }
            )}

          </div>

        </aside>

      </div>


      {/* =====================================================
          DESTELLO BLANCO GLOBAL

          FUERA DE comic-pantalla.
      ===================================================== */}

      {transicionBlanca && (

        <div
          className={`
            comic-transicion-blanca

            ${
              transicionBlanca ===
              "entrando"
                ? "entrando"
                : "saliendo"
            }
          `}
        />

      )}

    </main>

  );

};


export default EscenaPortada;