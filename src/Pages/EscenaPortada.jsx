import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import Escena1 from "./Comicc.jsx/Escena1";
import Escena2 from "./Comicc.jsx/Escena2";
import Escena3 from "./Comicc.jsx/Escena3";
import Escena4 from "./Comicc.jsx/Escena4";
import Escena5 from "./Comicc.jsx/Escena5";
import * as Escena6Module from "./Comicc.jsx/Escena6";
import Escena7 from "./Comicc.jsx/Escena7";

import {
  FaVolumeUp,
  FaVolumeMute,
  FaMicrophone,
  FaStop,
  FaClosedCaptioning,
} from "react-icons/fa";

import "./EscenaPortada.css";

// Compatibilidad con las exportaciones de Escena6.
const Escena6Component =
  Escena6Module.default ?? Escena6Module.Escena6;

export const EscenaPortada = () => {
  const [capituloActivo, setCapituloActivo] = useState(1);

  const [escenaIniciada, setEscenaIniciada] = useState(false);

  const [musicaActiva, setMusicaActiva] = useState(false);

  const [narradorActivo, setNarradorActivo] = useState(true);

  const [textoNarracionActivo, setTextoNarracionActivo] =
    useState(true);

  const [
    capitulosDesbloqueados,
    setCapitulosDesbloqueados,
  ] = useState([1, 2, 3, 4, 5, 6, 7]);

  const [capituloDesbloqueando, setCapituloDesbloqueando] =
    useState(null);

  const [mensajeDesbloqueo, setMensajeDesbloqueo] =
    useState(null);

  const [transicionBlanca, setTransicionBlanca] =
    useState(null);

  const audioMusicaRef = useRef(null);
  const escenaRef = useRef(null);

  const mensajeTimerRef = useRef(null);
  const transicionTimerRef = useRef(null);
  const ocultarTransicionTimerRef = useRef(null);
  const desbloqueoTimerRef = useRef(null);

  // Información de los capítulos.
  const capitulos = [
    { numero: "01", titulo: "CUEVA" },
    { numero: "02", titulo: "ATENAS" },
    { numero: "03", titulo: "ÁGORA" },
    { numero: "04", titulo: "EL DEBATE" },
    { numero: "05", titulo: "EL COLISEO" },
    { numero: "06", titulo: "EL IMPERIO" },
    { numero: "07", titulo: "DE VUELTA" },
  ];

  // Limpiar temporizadores al desmontar el componente.
  useEffect(() => {
    return () => {
      if (mensajeTimerRef.current) {
        clearTimeout(mensajeTimerRef.current);
      }

      if (transicionTimerRef.current) {
        clearTimeout(transicionTimerRef.current);
      }

      if (ocultarTransicionTimerRef.current) {
        clearTimeout(ocultarTransicionTimerRef.current);
      }

      if (desbloqueoTimerRef.current) {
        clearTimeout(desbloqueoTimerRef.current);
      }

      if (audioMusicaRef.current) {
        audioMusicaRef.current.pause();
      }
    };
  }, []);

  // Mostrar mensaje de objetos encontrados.
  const mostrarMensajeObjetos = useCallback((numero) => {
    setMensajeDesbloqueo(numero);

    if (mensajeTimerRef.current) {
      clearTimeout(mensajeTimerRef.current);
    }

    mensajeTimerRef.current = setTimeout(() => {
      setMensajeDesbloqueo(null);
      mensajeTimerRef.current = null;
    }, 5000);
  }, []);

  // Desbloquear capítulo.
  const desbloquearCapitulo = useCallback((numero) => {
    setCapitulosDesbloqueados((anteriores) => {
      if (anteriores.includes(numero)) {
        return anteriores;
      }

      return [...anteriores, numero];
    });

    setCapituloDesbloqueando(numero);

    if (desbloqueoTimerRef.current) {
      clearTimeout(desbloqueoTimerRef.current);
    }

    desbloqueoTimerRef.current = setTimeout(() => {
      setCapituloDesbloqueando(null);
      desbloqueoTimerRef.current = null;
    }, 900);
  }, []);

  // Comenzar la historia desde la portada.
  const comenzarComic = useCallback(() => {
    setCapituloActivo(1);
    setEscenaIniciada(true);
    setNarradorActivo(false);
    setTextoNarracionActivo(true);
  }, []);

  // Seleccionar capítulo desde el panel lateral.
  const seleccionarCapitulo = useCallback(
    (capitulo) => {
      const numero = Number(capitulo.numero);

      if (!capitulosDesbloqueados.includes(numero)) {
        return;
      }

      setCapituloActivo(numero);
      setEscenaIniciada(true);
      setNarradorActivo(false);
      setTextoNarracionActivo(true);
    },
    [capitulosDesbloqueados]
  );

  // Transición blanca entre capítulos.
  const irACapitulo = useCallback(
    (numero) => {
      if (transicionBlanca !== null) {
        return;
      }

      setNarradorActivo(false);
      setTextoNarracionActivo(false);
      setMensajeDesbloqueo(null);

      setTransicionBlanca("entrando");

      transicionTimerRef.current = setTimeout(() => {
        setCapituloActivo(numero);
        setEscenaIniciada(true);
        setTextoNarracionActivo(true);
        setNarradorActivo(false);

        setTransicionBlanca("saliendo");

        ocultarTransicionTimerRef.current = setTimeout(() => {
          setTransicionBlanca(null);
          ocultarTransicionTimerRef.current = null;
        }, 900);

        transicionTimerRef.current = null;
      }, 1250);
    },
    [transicionBlanca]
  );

  // Navegación entre capítulos.
  const pasarACapitulo2 = useCallback(
    () => irACapitulo(2),
    [irACapitulo]
  );

  const pasarACapitulo3 = useCallback(
    () => irACapitulo(3),
    [irACapitulo]
  );

  const pasarACapitulo4 = useCallback(
    () => irACapitulo(4),
    [irACapitulo]
  );

  const pasarACapitulo5 = useCallback(
    () => irACapitulo(5),
    [irACapitulo]
  );

  const pasarACapitulo6 = useCallback(
    () => irACapitulo(6),
    [irACapitulo]
  );

  const pasarACapitulo7 = useCallback(
    () => irACapitulo(7),
    [irACapitulo]
  );

  // Activar o pausar música de fondo.
  const alternarMusica = () => {
    const audio = audioMusicaRef.current;

    if (!audio) {
      return;
    }

    if (musicaActiva) {
      audio.pause();
      setMusicaActiva(false);
    } else {
      audio
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

  // Activar o detener el narrador.
  const alternarNarrador = () => {
    if (!escenaRef.current) {
      return;
    }

    if (
      typeof escenaRef.current.toggleNarracion === "function"
    ) {
      escenaRef.current.toggleNarracion();
    }
  };

  // Actualizar el estado del narrador desde cada escena.
  const actualizarEstadoNarrador = useCallback((activo) => {
    setNarradorActivo(activo);
  }, []);

  // Mostrar u ocultar subtítulos.
  const alternarTextoNarracion = () => {
    setTextoNarracionActivo((activo) => !activo);
  };

  return (
    <main className="comic-interface">

      {/* Música de fondo */}
      <audio
        ref={audioMusicaRef}
        loop
        src="/BOMBIS.mp3"
      />

      {/* Logo MITONIC */}
      <a href="/" className="comic-logo">
        <img src="/Logo.png" alt="Mitonic" />
      </a>

      <div className="comic-layout">

        {/* PANTALLA PRINCIPAL DEL CÓMIC */}
        <section
          className={`comic-pantalla ${
            escenaIniciada ? "escena-activa" : ""
          }`}
        >

          {/* PORTADA INICIAL */}
          {!escenaIniciada ? (
            <div className="comic-pantalla-contenido">

              <img
                src="/Portada.png"
                alt="Portada de Adrián y las Crónicas del Imperio"
                className="comic-portada-imagen"
              />

              <button
                type="button"
                className="comic-boton-comenzar"
                onClick={comenzarComic}
              >
                COMENZAR
                <span aria-hidden="true"> </span>
              </button>

            </div>
          ) : (

            /* ESCENAS DEL CÓMIC */
            <div className="comic-escena">

              {/* ESCENA 1 — EL COMIENZO */}
              {capituloActivo === 1 && (
                <Escena1
                  ref={escenaRef}
                  textoNarracionActivo={textoNarracionActivo}
                  onNarradorEstadoChange={actualizarEstadoNarrador}
                  onObjetosEncontrados={mostrarMensajeObjetos}
                  onCapituloDesbloqueado={desbloquearCapitulo}
                  onEscenaTerminada={pasarACapitulo2}
                />
              )}

              {/* ESCENA 2 — ATENAS */}
              {capituloActivo === 2 && (
                <Escena2
                  ref={escenaRef}
                  textoNarracionActivo={textoNarracionActivo}
                  onNarradorEstadoChange={actualizarEstadoNarrador}
                  onObjetosEncontrados={mostrarMensajeObjetos}
                  onCapituloDesbloqueado={desbloquearCapitulo}
                  onEscenaTerminada={pasarACapitulo3}
                />
              )}

              {/* ESCENA 3 — ÁGORA */}
              {capituloActivo === 3 && (
                <Escena3
                  ref={escenaRef}
                  textoNarracionActivo={textoNarracionActivo}
                  onNarradorEstadoChange={actualizarEstadoNarrador}
                  onEscenaTerminada={pasarACapitulo4}
                />
              )}

              {/* ESCENA 4 — EL DEBATE */}
              {capituloActivo === 4 && (
                <Escena4
                  textoNarracionActivo={textoNarracionActivo}
                  onNarradorEstadoChange={actualizarEstadoNarrador}
                  onEscenaTerminada={pasarACapitulo5}
                />
              )}

              {/* ESCENA 5 — EL COLISEO ROMANO */}
              {capituloActivo === 5 && (
                <Escena5
                  ref={escenaRef}
                  textoNarracionActivo={textoNarracionActivo}
                  onNarradorEstadoChange={actualizarEstadoNarrador}
                  onObjetosEncontrados={mostrarMensajeObjetos}
                  onCapituloDesbloqueado={desbloquearCapitulo}
                  onEscenaTerminada={pasarACapitulo6}
                />
              )}

              {/* ESCENA 6 — EL IMPERIO ROMANO */}
              {capituloActivo === 6 && Escena6Component && (
                <Escena6Component
                  ref={escenaRef}
                  textoNarracionActivo={textoNarracionActivo}
                  onNarradorEstadoChange={actualizarEstadoNarrador}
                  onObjetosEncontrados={mostrarMensajeObjetos}
                  onCapituloDesbloqueado={desbloquearCapitulo}
                  onEscenaTerminada={pasarACapitulo7}
                />
              )}

              {/* ESCENA 7 — REGRESO A LA CUEVA */}
              {capituloActivo === 7 && (
                <Escena7
                  ref={escenaRef}
                  textoNarracionActivo={textoNarracionActivo}
                  onNarradorEstadoChange={actualizarEstadoNarrador}
                />
              )}

            </div>
          )}

          {/* MENSAJE DE OBJETOS ENCONTRADOS */}
          {mensajeDesbloqueo && escenaIniciada && (
            <div className="comic-mensaje-desbloqueo">

              <div className="comic-mensaje-desbloqueo-superior">
                <span>✓</span>
                <strong>¡OBJETOS ENCONTRADOS!</strong>
              </div>

              <div className="comic-mensaje-desbloqueo-inferior">
                DESBLOQUEASTE EL CAPÍTULO{" "}
                {mensajeDesbloqueo}
              </div>

            </div>
          )}

          {/* CONTROLES GLOBALES */}
          <div className="comic-controles">

            {/* Música */}
            <button
              type="button"
              className="comic-control"
              onClick={alternarMusica}
              aria-label={
                musicaActiva
                  ? "Silenciar música"
                  : "Activar música"
              }
            >
              {musicaActiva ? (
                <FaVolumeUp />
              ) : (
                <FaVolumeMute />
              )}
            </button>

            {/* Narrador */}
            <button
              type="button"
              className="comic-control"
              onClick={alternarNarrador}
              aria-label={
                narradorActivo
                  ? "Detener narrador"
                  : "Activar narrador"
              }
            >
              {narradorActivo ? (
                <FaStop />
              ) : (
                <FaMicrophone />
              )}
            </button>

            {/* Subtítulos */}
            <button
              type="button"
              className={`comic-control ${
                textoNarracionActivo ? "activo" : ""
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

        </section>

        {/* PANEL LATERAL DE CAPÍTULOS */}
        <aside className="comic-capitulos">

          <h2 className="comic-capitulos-titulo">
            CAPÍTULOS
          </h2>

          <div className="comic-capitulos-lista">

            {capitulos.map((capitulo) => {
              const numero = Number(capitulo.numero);

              const desbloqueado =
                capitulosDesbloqueados.includes(numero);

              const animando =
                capituloDesbloqueando === numero;

              return (
                <button
                  type="button"
                  key={capitulo.numero}
                  className={[
                    "comic-capitulo",
                    desbloqueado ? "disponible" : "bloqueado",
                    capituloActivo === numero ? "seleccionado" : "",
                    animando ? "desbloqueando" : "",
                  ].join(" ")}
                  onClick={() => seleccionarCapitulo(capitulo)}
                  disabled={!desbloqueado}
                >

                  <div className="comic-capitulo-numero">
                    {capitulo.numero}
                  </div>

                  <div className="comic-capitulo-info">

                    <span>
                      CAPÍTULO {capitulo.numero}
                    </span>

                    <strong>
                      {desbloqueado
                        ? capitulo.titulo
                        : "POR DESCUBRIR"}
                    </strong>

                  </div>

                </button>
              );
            })}

          </div>

        </aside>

      </div>

      {/* TRANSICIÓN BLANCA ENTRE CAPÍTULOS */}
      {transicionBlanca && (
        <div
          className={[
            "comic-transicion-blanca",
            transicionBlanca === "entrando"
              ? "entrando"
              : "saliendo",
          ].join(" ")}
        />
      )}

    </main>
  );
};

export default EscenaPortada;