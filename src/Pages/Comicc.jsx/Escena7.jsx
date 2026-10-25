import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import lottieReact from "lottie-react";
import AdrianHablando from "../../assets/AdrianHablando.json";
import "./Escenas.css";

const Lottie = lottieReact.default || lottieReact;

/* BUSCADOR DE AUDIOS */

const SONIDOS = import.meta.glob("../../Audios/*.mp3", {
  eager: true,
  import: "default",
});

const nombreSinExtension = (ruta) =>
  ruta.split("/").pop().replace(/\.[^.]+$/, "").toLowerCase();

const buscarAudio = (nombre) => {
  const ruta = Object.keys(SONIDOS).find(
    (rutaActual) =>
      nombreSinExtension(rutaActual) === nombre.toLowerCase()
  );

  if (ruta) return SONIDOS[ruta];

  console.warn("[Escena 7] No se encontró el audio:", nombre);
  return null;
};

const AUDIOS_ESCENA7 = {
  1: buscarAudio("Esc7Audio1"),
  2: buscarAudio("Esc7Audio2"),
  3: buscarAudio("Esc7Audio3"),
  4: buscarAudio("Esc7Audio4"),
  5: buscarAudio("Esc7Audio5"),
  6: buscarAudio("Esc7Audio6"),
  7: buscarAudio("Esc7Audio7"),
};

/* FONDO Y PERSONAJE */

const FONDOS_ESCENA7 = [
  "/Escenarios/cueva2.svg",
  "/cueva2.svg",
  "/Escenarios/Cueva2.svg",
  "/Cueva2.svg",
];

const EXPRESION_ASUSTADO = "/asustado.svg";

const URL_LINEA_TIEMPO =
  "https://runas-codex.chalkyroot.chatgpt.site/";

/*
 * Cronología:
 * 800 a. C. → 1 a. C. → 1 d. C. → 250 d. C.
 * No existe año cero en esta secuencia.
 */

const ANIOS_CRONOLOGICOS = [
  ...Array.from({ length: 800 }, (_, indice) => ({
    anio: 800 - indice,
    era: "a. C.",
  })),

  ...Array.from({ length: 150 }, (_, indice) => ({
    anio: indice + 1,
    era: "d. C.",
  })),
];

/* SUBTÍTULOS */

const TEXTOS_ESCENA7 = {
  1: "Estoy de vuelta ¿Qué acaba de pasar? El reloj no está...",

  2: "Claro, se quedó allí, en medio del Imperio romano.",

  3: "He recorrido Atenas, el Ágora y Roma. He visto lugares, personas y acontecimientos que forman parte de nuestra historia.",

  4: "He visto cómo pensamos, cómo vivimos, cómo luchamos y cómo construimos nuestra sociedad.",

  5: "Pero todavía hay algo que no logro comprender. ¿Qué es realmente ese reloj? ¿Por qué me llevó precisamente a esos momentos?",

  6: "Y ahora está allí, en algún lugar del Imperio romano. Supongo que algún día sabremos qué ocurrió con él.",

  7: "Por ahora, solo puedo quedarme con lo que he visto y con las preguntas que este viaje deja atrás.",
};

const Escena7 = forwardRef(
  (
    {
      textoNarracionActivo = true,
      onNarradorEstadoChange,
    },
    ref
  ) => {
    /* INTRODUCCIÓN */

    const [adrianHabla, setAdrianHabla] = useState(false);
    const [mostrarAsustado, setMostrarAsustado] = useState(false);
    const [mostrarRelampago, setMostrarRelampago] = useState(true);

    /* AUDIO Y SUBTÍTULOS */

    const [audioActual, setAudioActual] = useState(0);
    const [tipoAudio, setTipoAudio] = useState("espera");
    const [narradorActivo, setNarradorActivo] = useState(false);
    const [momentoTexto, setMomentoTexto] = useState(null);

    /* FONDO */

    const [fondoIndice, setFondoIndice] = useState(0);

    /* CONTADOR FINAL */

    const [mostrarContador, setMostrarContador] = useState(false);
    const [indiceAnio, setIndiceAnio] = useState(0);
    const [contadorFinalizado, setContadorFinalizado] = useState(false);

    /* REFERENCIAS */

    const audioRef = useRef(null);
    const habloRef = useRef(false);

    /* ESTADO DEL NARRADOR */

    useEffect(() => {
      onNarradorEstadoChange?.(narradorActivo);
    }, [narradorActivo, onNarradorEstadoChange]);

    /* LIMPIEZA AL SALIR DE LA ESCENA */

    useEffect(() => {
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      };
    }, []);

    /* REPRODUCIR AUDIO Y MOSTRAR SU SUBTÍTULO */

    const reproducirAudio = (audio, numero) => {
      const reproductor = audioRef.current;

      /*
       * Cambiamos el número de audio y el subtítulo
       * en la misma transición, sin usar temporizadores.
       */

      setAudioActual(numero);
      setMomentoTexto(numero);
      setTipoAudio("principal");

      if (!reproductor || !audio) {
        console.warn(
          `[Escena 7] No se puede reproducir el audio ${numero}.`
        );
        setNarradorActivo(false);
        return;
      }

      reproductor.pause();
      reproductor.src = audio;
      reproductor.load();
      reproductor.currentTime = 0;

      setNarradorActivo(true);

      reproductor.play().catch((error) => {
        console.error(
          `No se pudo reproducir el audio ${numero} de Escena 7:`,
          error
        );

        setNarradorActivo(false);
      });
    };

    const siguienteAudio = (numero) => {
      reproducirAudio(AUDIOS_ESCENA7[numero], numero);
    };

    /* FIN DEL EFECTO DE RELÁMPAGOS */

    const terminarRelampagoInicial = (evento) => {
      if (evento.target !== evento.currentTarget) return;

      if (evento.animationName !== "relampagoEntradaEscena7") {
        return;
      }

      setMostrarRelampago(false);
      setMostrarAsustado(true);
    };

    /* FIN DE LA APARICIÓN DE ADRIÁN ASUSTADO */

    const terminarEntradaAsustado = (evento) => {
      if (evento.target !== evento.currentTarget) return;

      if (
        evento.animationName !== "entradaAdrianAsustadoEscena7"
      ) {
        return;
      }

      if (habloRef.current) return;

      habloRef.current = true;

      setMostrarAsustado(false);
      setAdrianHabla(true);

      siguienteAudio(1);
    };

    /* TRANSICIÓN INMEDIATA ENTRE AUDIOS */

    const manejarFinAudio = () => {
      if (audioActual >= 1 && audioActual < 7) {
        siguienteAudio(audioActual + 1);
        return;
      }

      /*
       * Cuando termina el séptimo audio,
       * la escena pasa a negro y comienza el contador.
       */

      if (audioActual === 7) {
        setMomentoTexto(null);
        setTipoAudio("espera");
        setNarradorActivo(false);

        setIndiceAnio(0);
        setContadorFinalizado(false);
        setMostrarContador(true);
      }
    };

    /* CONTADOR HISTÓRICO */

    useEffect(() => {
      if (!mostrarContador || contadorFinalizado) {
        return undefined;
      }

      // Duración total de la animación del contador.
      const duracion = 8500;

      let instanteInicial = null;
      let frameId = null;

      const actualizarContador = (instanteActual) => {
        if (instanteInicial === null) {
          instanteInicial = instanteActual;
        }

        const progreso = Math.min(
          (instanteActual - instanteInicial) / duracion,
          1
        );

        const nuevoIndice = Math.min(
          Math.round(
            progreso * (ANIOS_CRONOLOGICOS.length - 1)
          ),
          ANIOS_CRONOLOGICOS.length - 1
        );

        setIndiceAnio(nuevoIndice);

        if (progreso < 1) {
          frameId = window.requestAnimationFrame(
            actualizarContador
          );
        } else {
          setIndiceAnio(ANIOS_CRONOLOGICOS.length - 1);
          setContadorFinalizado(true);
        }
      };

      frameId = window.requestAnimationFrame(actualizarContador);

      return () => {
        if (frameId !== null) {
          window.cancelAnimationFrame(frameId);
        }
      };
    }, [mostrarContador, contadorFinalizado]);

    /* CONTROL DE NARRACIÓN DESDE EL COMPONENTE PADRE */

    const toggleNarracion = () => {
      const reproductor = audioRef.current;

      if (!reproductor || tipoAudio === "espera") return;

      if (!reproductor.paused) {
        reproductor.pause();
        setNarradorActivo(false);
        return;
      }

      reproductor
        .play()
        .then(() => setNarradorActivo(true))
        .catch((error) => {
          console.error(
            "No se pudo reanudar la narración:",
            error
          );
        });
    };

    useImperativeHandle(ref, () => ({
      toggleNarracion,
    }));

    /* CAMBIAR DE RUTA SI EL FONDO NO CARGA */

    const probarOtroFondo = () => {
      if (fondoIndice < FONDOS_ESCENA7.length - 1) {
        setFondoIndice((actual) => actual + 1);
      } else {
        console.warn(
          "[Escena 7] No se encontró el fondo cueva2.svg."
        );
      }
    };

    /* DATOS DEL CONTADOR */

    const anioActual =
      ANIOS_CRONOLOGICOS[indiceAnio] ||
      ANIOS_CRONOLOGICOS[0];

    const progresoContador =
      (indiceAnio / (ANIOS_CRONOLOGICOS.length - 1)) * 100;

    /* RENDER */

    return (
      <div className="escena-5 escena-7">
        <div className="escena-5-contenido">

          {/* FONDO ESTABLE */}

          <div className="escena-7-camara">
            <img
              src={FONDOS_ESCENA7[fondoIndice]}
              alt="Cueva donde Adrián regresa"
              className="escena-5-fondo"
              onError={probarOtroFondo}
              draggable="false"
            />

            {/* ADRIÁN ASUSTADO */}

            {mostrarAsustado && (
              <div
                className="escena-5-adrian-hablando escena-7-adrian-asustado"
                onAnimationEnd={terminarEntradaAsustado}
              >
                <img
                  src={EXPRESION_ASUSTADO}
                  alt="Adrián asustado"
                  draggable="false"
                />
              </div>
            )}

            {/* ADRIÁN HABLANDO */}

            {adrianHabla && (
              <div className="escena-5-adrian-hablando">
                <Lottie
                  animationData={AdrianHablando}
                  loop
                  autoplay
                />
              </div>
            )}
          </div>

          {/* RELÁMPAGOS INICIALES */}

          {mostrarRelampago && (
            <div
              className="escena-7-relampago-intro"
              onAnimationEnd={terminarRelampagoInicial}
              aria-hidden="true"
            />
          )}

          {/* AUDIO */}

          <audio
            ref={audioRef}
            onEnded={manejarFinAudio}
            preload="auto"
          />

          {/* SUBTÍTULOS */}

          {textoNarracionActivo &&
            momentoTexto !== null &&
            TEXTOS_ESCENA7[momentoTexto] && (
              <div
                className="escena-5-texto-narracion"
                key={momentoTexto}
              >
                {TEXTOS_ESCENA7[momentoTexto]}
              </div>
            )}

          {/* CONTADOR SOBRE FONDO NEGRO */}

          {mostrarContador && (
            <section
              className="escena-7-linea-tiempo"
              aria-label="Cierre y contador histórico"
            >
              <div className="escena-7-tiempo-panel">

                <p className="escena-7-tiempo-eyebrow">
                  ADRIÁN Y LAS CRÓNICAS DEL IMPERIO
                </p>

                <h2 className="escena-7-tiempo-titulo">
                  El tiempo sigue avanzando
                </h2>

                {/* AÑO ACTUAL */}

                <div
                  className="escena-7-tiempo-anio"
                  aria-label={`Año ${anioActual.anio} ${anioActual.era}`}
                  aria-live="off"
                >
                  <span className="escena-7-tiempo-numero">
                    {anioActual.anio}
                  </span>

                  <span className="escena-7-tiempo-era">
                    {anioActual.era}
                  </span>
                </div>

                {/* BARRA DE AVANCE */}

                <div
                  className="escena-7-tiempo-barra"
                  role="progressbar"
                  aria-label="Avance del tiempo histórico"
                  aria-valuemin={0}
                  aria-valuemax={ANIOS_CRONOLOGICOS.length - 1}
                  aria-valuenow={indiceAnio}
                >
                  <span
                    className="escena-7-tiempo-barra-progreso"
                    style={{
                      width: `${progresoContador}%`,
                    }}
                  />
                </div>

                {/* MENSAJE FINAL */}

                {contadorFinalizado ? (
                  <>
                    <p className="escena-7-tiempo-llegada">
                      Hemos llegado al año 150 d. C.
                    </p>

                    <a
                      className="escena-7-continuar"
                      href={URL_LINEA_TIEMPO}
                    >
                      Continuar con la línea del tiempo
                    </a>
                  </>
                ) : (
                  <p className="escena-7-tiempo-espera">
                    El viaje por la historia continúa…
                  </p>
                )}

              </div>
            </section>
          )}

        </div>
      </div>
    );
  }
);

Escena7.displayName = "Escena7";

export default Escena7;