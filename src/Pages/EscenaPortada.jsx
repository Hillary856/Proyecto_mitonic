import {
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";

import Escena1 from "./Comicc.jsx/Escena1";
import Escena2 from "./Comicc.jsx/Escena2";
import Escena3 from "./Comicc.jsx/Escena3";
import Escena4 from "./Comicc.jsx/Escena4";
import Escena5 from "./Comicc.jsx/Escena5";
import Escena6 from "./Comicc.jsx/Escena6";

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

  const [capituloActivo, setCapituloActivo] = useState(1);
  const [escenaIniciada, setEscenaIniciada] = useState(false);
  const [musicaActiva, setMusicaActiva] = useState(false);
  const [narradorActivo, setNarradorActivo] = useState(true);

  /* Los subtítulos comienzan activados. */
  const [textoNarracionActivo, setTextoNarracionActivo] = useState(true);


  /* =====================================================
     CAPÍTULOS DESBLOQUEADOS

     (Ahora están todos abiertos para poder probar.
      Para el lanzamiento, deja solo [1].)
  ===================================================== */

  const [capitulosDesbloqueados, setCapitulosDesbloqueados] =
    useState([1, 2, 3, 4, 5, 6, 7]);


  /* Capítulo que hace el PUM */
  const [capituloDesbloqueando, setCapituloDesbloqueando] = useState(null);

  /* Mensaje de desbloqueo */
  const [mensajeDesbloqueo, setMensajeDesbloqueo] = useState(null);

  /* Transición blanca */
  const [transicionBlanca, setTransicionBlanca] = useState(null);


  /* =====================================================
     REFERENCIAS
  ===================================================== */

  const audioMusicaRef = useRef(null);
  const escenaRef = useRef(null);
  const mensajeTimerRef = useRef(null);
  const transicionTimerRef = useRef(null);
  const ocultarTransicionTimerRef = useRef(null);


  /* =====================================================
     CAPÍTULOS
  ===================================================== */

  const capitulos = [
    { numero: "01", titulo: "EL COMIENZO" },
    { numero: "02", titulo: "PRÓXIMAMENTE" },
    { numero: "03", titulo: "PRÓXIMAMENTE" },
    { numero: "04", titulo: "PRÓXIMAMENTE" },
    { numero: "05", titulo: "EL COLISEO" },
    { numero: "06", titulo: "EL IMPERIO" },
    { numero: "07", titulo: "PRÓXIMAMENTE" }
  ];


  /* =====================================================
     LIMPIAR TEMPORIZADORES
  ===================================================== */

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
    };
  }, []);


  /* =====================================================
     MOSTRAR MENSAJE DE OBJETOS ENCONTRADOS

     IMPORTANTE:
     NO DESBLOQUEA EL CAPÍTULO.
  ===================================================== */

  const mostrarMensajeObjetos = useCallback((numero) => {
    setMensajeDesbloqueo(numero);

    if (mensajeTimerRef.current) {
      clearTimeout(mensajeTimerRef.current);
    }

    mensajeTimerRef.current = setTimeout(() => {
      setMensajeDesbloqueo(null);
    }, 5000);
  }, []);


  /* =====================================================
     DESBLOQUEAR CAPÍTULO

     ESTA FUNCIÓN SOLO SE LLAMA CUANDO
     EL USUARIO PULSA CONTINUAR.
  ===================================================== */

  const desbloquearCapitulo = useCallback(
    (numero) => {

      if (capitulosDesbloqueados.includes(numero)) {
        return;
      }

      setCapitulosDesbloqueados((anteriores) => {
        if (anteriores.includes(numero)) {
          return anteriores;
        }
        return [...anteriores, numero];
      });

      /* Animación PUM */
      setCapituloDesbloqueando(numero);

      setTimeout(() => {
        setCapituloDesbloqueando(null);
      }, 900);

    },
    [capitulosDesbloqueados]
  );


  /* =====================================================
     SELECCIONAR CAPÍTULO
  ===================================================== */

  const seleccionarCapitulo = useCallback(
    (capitulo) => {

      const numero = Number(capitulo.numero);

      /* No puede entrar a un capítulo bloqueado. */
      if (!capitulosDesbloqueados.includes(numero)) {
        return;
      }

      setCapituloActivo(numero);
      setEscenaIniciada(true);
      setNarradorActivo(false);

      /* Los subtítulos siempre comienzan activos al entrar a una escena. */
      setTextoNarracionActivo(true);

    },
    [capitulosDesbloqueados]
  );


  /* =====================================================
     IR A UN CAPÍTULO CON DESTELLO BLANCO

     Una sola función para todas las transiciones:
     detiene el narrador, hace el destello blanco,
     cambia de escena y vuelve a activar los subtítulos.
  ===================================================== */

  const irACapitulo = useCallback(
    (numero) => {

      /* Evitar doble clic. */
      if (transicionBlanca) {
        return;
      }

      setNarradorActivo(false);
      setTextoNarracionActivo(false);
      setMensajeDesbloqueo(null);

      /* El blanco cubre la ventana antes de cambiar de escena. */
      setTransicionBlanca("entrando");

      transicionTimerRef.current = setTimeout(() => {

        setCapituloActivo(numero);
        setEscenaIniciada(true);
        setTextoNarracionActivo(true);
        setTransicionBlanca("saliendo");

        ocultarTransicionTimerRef.current = setTimeout(() => {
          setTransicionBlanca(null);
        }, 900);

      }, 1250);

    },
    [transicionBlanca]
  );


  /* Una función por cada escena que termina */

  const pasarACapitulo2 = useCallback(() => irACapitulo(2), [irACapitulo]);
  const pasarACapitulo3 = useCallback(() => irACapitulo(3), [irACapitulo]);
  const pasarACapitulo4 = useCallback(() => irACapitulo(4), [irACapitulo]);
  const pasarACapitulo6 = useCallback(() => irACapitulo(6), [irACapitulo]);
  const pasarACapitulo7 = useCallback(() => irACapitulo(7), [irACapitulo]);


  /* =====================================================
     MÚSICA
  ===================================================== */

  const alternarMusica = () => {

    if (!audioMusicaRef.current) {
      return;
    }

    if (musicaActiva) {
      audioMusicaRef.current.pause();
      setMusicaActiva(false);
    } else {
      audioMusicaRef.current
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
     NARRADOR
  ===================================================== */

  const alternarNarrador = () => {

    if (!escenaRef.current) {
      return;
    }

    if (typeof escenaRef.current.toggleNarracion === "function") {
      escenaRef.current.toggleNarracion();
    }

  };


  /* =====================================================
     ESTADO DEL NARRADOR
  ===================================================== */

  const actualizarEstadoNarrador = useCallback((activo) => {
    setNarradorActivo(activo);
  }, []);


  /* =====================================================
     SUBTÍTULOS
  ===================================================== */

  const alternarTextoNarracion = () => {
    setTextoNarracionActivo((activo) => !activo);
  };


  /* =====================================================
     RENDER
  ===================================================== */

  return (

    <main className="comic-interface">


      {/* MÚSICA */}
      <audio
        ref={audioMusicaRef}
        loop
        src="/BOMBIS.mp3"
      />


      {/* LOGO */}
      <a href="/" className="comic-logo">
        <img src="/public/Logo.png" alt="Mitonic" />
      </a>


      {/* CONTENEDOR PRINCIPAL */}
      <div className="comic-layout">


        {/* PANTALLA PRINCIPAL */}
        <section
          className={`comic-pantalla ${escenaIniciada ? "escena-activa" : ""}`}
        >


          {/* MENSAJE DE OBJETOS ENCONTRADOS
              (dentro del recuadro del cómic) */}
          {mensajeDesbloqueo && (
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


          {/* CONTROLES */}
          <div className="comic-controles">

            {/* MÚSICA */}
            <button
              className="comic-control"
              onClick={alternarMusica}
              aria-label={
                musicaActiva ? "Silenciar música" : "Activar música"
              }
            >
              {musicaActiva ? <FaVolumeUp /> : <FaVolumeMute />}
            </button>

            {/* NARRADOR */}
            <button
              className="comic-control"
              onClick={alternarNarrador}
              aria-label={
                narradorActivo ? "Detener narrador" : "Activar narrador"
              }
            >
              {narradorActivo ? <FaStop /> : <FaMicrophone />}
            </button>

            {/* SUBTÍTULOS */}
            <button
              className={`comic-control ${textoNarracionActivo ? "activo" : ""}`}
              onClick={alternarTextoNarracion}
              aria-label={
                textoNarracionActivo ? "Ocultar texto" : "Mostrar texto"
              }
            >
              <FaClosedCaptioning />
            </button>

          </div>


          {/* PORTADA */}
          {!escenaIniciada ? (

            <div className="comic-pantalla-contenido">

              <h1 className="comic-titulo">
                ADRIAN Y LAS
                <br />
                CRÓNICAS DEL IMPERIO
              </h1>

              <button
                className="comic-boton-comenzar"
                onClick={() => seleccionarCapitulo(capitulos[0])}
              >
                <span>▶</span>
                COMENZAR
              </button>

            </div>

          ) : (

            <div className="comic-escena">


              {/* ESCENA 1 */}
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


              {/* ESCENA 2 */}
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


              {/* ESCENA 3 */}
              {capituloActivo === 3 && (
                <Escena3
                  ref={escenaRef}
                  textoNarracionActivo={textoNarracionActivo}
                  onNarradorEstadoChange={actualizarEstadoNarrador}
                  onEscenaTerminada={pasarACapitulo4}
                />
              )}


              {/* ESCENA 5 (EL COLISEO) */}
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


              {/* ESCENA 6 (EL IMPERIO) */}
              {capituloActivo === 6 && (
                <Escena6
                  ref={escenaRef}
                  textoNarracionActivo={textoNarracionActivo}
                  onNarradorEstadoChange={actualizarEstadoNarrador}
                  onObjetosEncontrados={mostrarMensajeObjetos}
                  onCapituloDesbloqueado={desbloquearCapitulo}

                  /*
                    PASA AL CAPÍTULO 7.
                    (La Escena 7 todavía no existe: si no la
                    quieres usar aún, borra esta prop.)
                  */
                  onEscenaTerminada={pasarACapitulo7}
                />
              )}

            </div>

          )}

          {capituloActivo === 4 && (
            <Escena4 />
          )}

        </section>


        {/* PANEL DE CAPÍTULOS */}
        <aside className="comic-capitulos">

          <h2 className="comic-capitulos-titulo">
            CAPÍTULOS
          </h2>

          <div className="comic-capitulos-lista">

            {capitulos.map((capitulo) => {

              const numero = Number(capitulo.numero);

              const desbloqueado =
                capitulosDesbloqueados.includes(numero);

              const animando = capituloDesbloqueando === numero;

              return (

                <button
                  key={capitulo.numero}

                  className={`
                    comic-capitulo

                    ${desbloqueado ? "disponible" : "bloqueado"}

                    ${capituloActivo === numero ? "seleccionado" : ""}

                    ${animando ? "desbloqueando" : ""}
                  `}

                  onClick={() => seleccionarCapitulo(capitulo)}

                  disabled={!desbloqueado}
                >

                  <div className="comic-capitulo-numero">
                    {capitulo.numero}
                  </div>

                  <div className="comic-capitulo-info">
                    <span>CAPÍTULO {capitulo.numero}</span>
                    <strong>{capitulo.titulo}</strong>
                  </div>

                </button>

              );

            })}

          </div>

        </aside>

      </div>


      {/* DESTELLO BLANCO GLOBAL (fuera de comic-pantalla) */}
      {transicionBlanca && (
        <div
          className={`
            comic-transicion-blanca

            ${transicionBlanca === "entrando" ? "entrando" : "saliendo"}
          `}
        />
      )}

    </main>

  );

};


export default EscenaPortada;