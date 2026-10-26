import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { createPortal } from "react-dom";
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

import Reloj from "../../AssetsNuevos/reloj.svg";
import RelojCerrado from "../../AssetsNuevos/RelojCerrado.svg";

import Esc4Audio1 from "../../Audios/Esc4Audio1.mp3";
import Esc4Audio2 from "../../Audios/Esc4Audio2.mp3";
import Esc4Audio3 from "../../Audios/Esc4Audio3.mp3";
import Esc4Audio4 from "../../Audios/Esc4Audio4.mp3";
import Esc4Audio6 from "../../Audios/Esc4Audio6.mp3";
import Esc4Audio8 from "../../Audios/Esc4Audio8.mp3";
import Esc4Audio9 from "../../Audios/Esc4Audio9.mp3";
import Esc4Audio10 from "../../Audios/Esc4Audio10.mp3";

import Esc4ComercioDialogo from "../../Audios/Esc4ComercioDialogo.mp3";
import Esc4LeyesDialogo from "../../Audios/Esc4LeyesDialogo.mp3";
import Esc4ComercioRespuesta from "../../Audios/Esc4ComercioRespuesta.mp3";
import Esc4LeyesRespuesta from "../../Audios/Esc4LeyesRespuesta.mp3";

import "./Escenas.css";

const Lottie = lottieReact.default || lottieReact;

/* Recursos ubicados en public/. */
const Comerciante = "/comerciante.png";
const Leyes = "/leyes.png";

const Feliz = "/Feliz.svg";
const PensativoS = "/pensativoS.svg";
const SorprendidoS = "/SorprendidoS.svg";

const IMAGENES_ADRIAN = [
  img0,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
];

/* Se conectan las imágenes externas al Lottie de caminata. */
const ANIMACION_ADRIAN_CAMINANDO = {
  ...CicloAdrianBody,
  assets: CicloAdrianBody.assets.map((asset, index) => ({
    ...asset,
    u: "",
    p: IMAGENES_ADRIAN[index] || asset.p,
  })),
};

const AUDIOS_ESCENA_4 = {
  introduccion: Esc4Audio1,

  comercioInicial: Esc4ComercioDialogo,
  leyesInicial: Esc4LeyesDialogo,

  pregunta: Esc4Audio2,

  vistaPreviaComercio: Esc4Audio3,
  vistaPreviaLeyes: Esc4Audio4,

  respuestaComercio: Esc4ComercioRespuesta,
  respuestaLeyes: Esc4LeyesRespuesta,

  adrianComercio: Esc4Audio6,
  adrianLeyes: Esc4Audio8,

  reflexion: Esc4Audio9,
  reloj: Esc4Audio10,
};

const DIALOGOS = {
  introduccion:
    "Vaya, parece que hoy hay un debate interesante en el Ágora.",

  comercio:
    "Si queremos que nuestra ciudad prospere, debemos apoyar a los comerciantes. Gracias a ellos conseguimos productos, intercambiamos mercancías y mantenemos activa gran parte de nuestra vida cotidiana .",

  leyes:
    "¿Y de qué sirve impulsar el comercio si no existen reglas claras?. Sin acuerdos que se respeten, las disputas aumentarán y algunos terminarán aprovechandose de los demás.",

  pregunta:
    "Los dos tienen buenos argumentos. ¿Tú a quién apoyarías?",

  vistaPreviaComercio:
    "Apoyar a los comerciantes.",

  vistaPreviaLeyes:
    "Apoyar las leyes y los acuerdos.",

  respuestaComercio:
    "Me alegra que comprendas la importancia de esta propuesta. Si facilitamos los intercambios más personas podrán beneficiarse de los productos que llegan a nuestra ciudad.",

  adrianComercio:
    "El comercio es fundamental para nuestra ciudad",

  respuestaLeyes:
    "Es importante que lo comprendas. Una ciudad necesita normas claras para resolver sus disputas y evitar que los desacuerdos se conviertan en problemas mayores.",

  adrianLeyes:
    "Los acuerdos nos ayudan a convivir aunque no siempre pensemos igual.",

  reflexion:
    "Cada propuesta responde a una necesidad diferente. Vaya desición",

  reloj:
    "¡Otra vez esa luz! ¿A dónde me llevará ahora?",
};

const MOMENTOS_CAMINANDO = {
  entrada: "entrada",
  caminaDecision: "decision",
};

const MOMENTOS_ADRIAN_HABLANDO = new Set([
  "introduccion",
  "pregunta",
  "adrianComercio",
  "adrianLeyes",
  "reflexion",
]);

const Escena4 = ({ onEscenaTerminada }) => {
  const [momento, setMomento] = useState("entrada");
  const momentoRef = useRef("entrada");

  const [posicionAdrian, setPosicionAdrian] = useState("inicio");

  const [mostrarComerciante, setMostrarComerciante] =
    useState(false);

  const [mostrarLeyes, setMostrarLeyes] = useState(false);

  const [puedeContinuar, setPuedeContinuar] = useState(false);

  const [relojActivado, setRelojActivado] = useState(false);
  const [relojMoviendose, setRelojMoviendose] = useState(false);

  const [destelloRelojGlobal, setDestelloRelojGlobal] =
    useState(false);

  const [iniciandoFundido, setIniciandoFundido] = useState(false);

  const [audioError, setAudioError] = useState(false);
  const [subtitulo, setSubtitulo] = useState("");

  const audioRef = useRef(null);
  const numeroAudioRef = useRef(null);
  const ultimoAudioRequestRef = useRef(null);
  const destelloTimerRef = useRef(null);

  const animacionCaminando = useMemo(
    () => ANIMACION_ADRIAN_CAMINANDO,
    []
  );

  const estaCaminando = Object.prototype.hasOwnProperty.call(
    MOMENTOS_CAMINANDO,
    momento
  );

  const adrianHabla =
    MOMENTOS_ADRIAN_HABLANDO.has(momento) ||
    (momento === "reloj" && relojActivado);

  const expresionRostro =
    momento === "pregunta"
      ? "pensativo"
      : momento === "reloj" && relojActivado
        ? "sorprendido"
        : null;

  const cambiarMomento = useCallback((nuevoMomento) => {
    momentoRef.current = nuevoMomento;
    setMomento(nuevoMomento);
  }, []);

  const detenerAudio = useCallback(() => {
    const audioActual = audioRef.current;

    if (audioActual) {
      audioActual.onended = null;
      audioActual.onerror = null;
      audioActual.pause();
      audioActual.currentTime = 0;
    }

    audioRef.current = null;
    numeroAudioRef.current = null;
  }, []);

  const reproducirAudio = useCallback(
    (claveAudio, alTerminar) => {
      detenerAudio();
      setAudioError(false);

      ultimoAudioRequestRef.current = {
        claveAudio,
        alTerminar,
      };

      const fuente = AUDIOS_ESCENA_4[claveAudio];

      if (!fuente) {
        console.error(
          `No se encontró el audio de Escena 4: ${claveAudio}`
        );
        setAudioError(true);
        return;
      }

      const audio = new Audio(fuente);

      audio.preload = "auto";
      audioRef.current = audio;
      numeroAudioRef.current = claveAudio;

      audio.onended = () => {
        if (audioRef.current !== audio) return;

        audioRef.current = null;
        numeroAudioRef.current = null;

        alTerminar?.();
      };

      audio.onerror = () => {
        if (audioRef.current !== audio) return;

        audioRef.current = null;
        numeroAudioRef.current = null;
        setAudioError(true);
      };

      const promesa = audio.play();

      if (promesa && typeof promesa.catch === "function") {
        promesa.catch((error) => {
          if (audioRef.current !== audio) return;

          console.warn(
            `No se pudo reproducir ${claveAudio}.`,
            error
          );

          audio.pause();
          audioRef.current = null;
          numeroAudioRef.current = null;
          setAudioError(true);
        });
      }
    },
    [detenerAudio]
  );

  /* INTRODUCCIÓN Y DEBATE INICIAL */

  const iniciarDialogoIntroduccion = () => {
    cambiarMomento("introduccion");
    setSubtitulo(DIALOGOS.introduccion);

    reproducirAudio("introduccion", () => {
      setMostrarComerciante(true);
      setMostrarLeyes(false);

      cambiarMomento("comercioInicial");
      setSubtitulo(DIALOGOS.comercio);

      reproducirAudio("comercioInicial", () => {
        setMostrarLeyes(true);

        cambiarMomento("leyesInicial");
        setSubtitulo(DIALOGOS.leyes);

        reproducirAudio("leyesInicial", () => {
          cambiarMomento("pregunta");
          setSubtitulo(DIALOGOS.pregunta);

          reproducirAudio("pregunta", () => {
            setMostrarComerciante(false);
            setMostrarLeyes(false);

            cambiarMomento("caminaDecision");
          });
        });
      });
    });
  };

  /* RESPUESTA DE ADRIÁN DESPUÉS DEL CIUDADANO ELEGIDO */

  const mostrarRespuestaDeAdrian = (opcion) => {
    setMostrarComerciante(false);
    setMostrarLeyes(false);

    const esComercio = opcion === "comercio";

    const claveAudio = esComercio
      ? "adrianComercio"
      : "adrianLeyes";

    const texto = esComercio
      ? DIALOGOS.adrianComercio
      : DIALOGOS.adrianLeyes;

    cambiarMomento(claveAudio);
    setSubtitulo(texto);

    reproducirAudio(claveAudio, iniciarTransicion);
  };

  const reproducirRespuestaCiudadano = (opcion) => {
    const esComercio = opcion === "comercio";

    const claveAudio = esComercio
      ? "respuestaComercio"
      : "respuestaLeyes";

    const texto = esComercio
      ? DIALOGOS.respuestaComercio
      : DIALOGOS.respuestaLeyes;

    cambiarMomento(claveAudio);
    setSubtitulo(texto);

    reproducirAudio(claveAudio, () => {
      mostrarRespuestaDeAdrian(opcion);
    });
  };

  /* FIN DE LAS ANIMACIONES DE CAMINATA */

  const manejarFinCaminata = (evento) => {
    if (evento.target !== evento.currentTarget) return;

    const animacionesEsperadas = {
      entrada: "escena4EntradaAdrian",
      caminaDecision: "escena4CaminaDecision",
    };

    if (
      evento.animationName !==
      animacionesEsperadas[momentoRef.current]
    ) {
      return;
    }

    switch (momentoRef.current) {
      case "entrada":
        setPosicionAdrian("inicio");
        iniciarDialogoIntroduccion();
        break;

      case "caminaDecision":
        setPosicionAdrian("decision");
        cambiarMomento("decision");
        setSubtitulo(DIALOGOS.pregunta);
        break;

      default:
        break;
    }
  };

  /* AUDIO DE VISTA PREVIA AL PASAR EL CURSOR */

  const previsualizarPropuesta = (opcion) => {
    if (momentoRef.current !== "decision") return;

    const claveAudio =
      opcion === "comercio"
        ? "vistaPreviaComercio"
        : "vistaPreviaLeyes";

    const texto =
      opcion === "comercio"
        ? DIALOGOS.vistaPreviaComercio
        : DIALOGOS.vistaPreviaLeyes;

    if (
      audioRef.current &&
      numeroAudioRef.current === claveAudio &&
      !audioRef.current.ended
    ) {
      return;
    }

    setSubtitulo(texto);

    reproducirAudio(claveAudio, () => {
      if (momentoRef.current === "decision") {
        setSubtitulo(DIALOGOS.pregunta);
      }
    });
  };

  /* SELECCIÓN DE A O B */

  const elegirPropuesta = (opcion) => {
    if (momentoRef.current !== "decision") return;

    detenerAudio();
    setPuedeContinuar(false);

    /* Adrián no vuelve a caminar hacia atrás. */

    if (opcion === "comercio") {
      setPosicionAdrian("inicio");
      setMostrarComerciante(true);
      setMostrarLeyes(false);
    } else {
      setPosicionAdrian("leyes");
      setMostrarComerciante(false);
      setMostrarLeyes(true);
    }

    reproducirRespuestaCiudadano(opcion);
  };

  /* REFLEXIÓN FINAL */

  const iniciarTransicion = () => {
    setMostrarComerciante(false);
    setMostrarLeyes(false);

    cambiarMomento("reflexion");
    setSubtitulo(DIALOGOS.reflexion);

    reproducirAudio("reflexion", () => {
      cambiarMomento("reloj");
      setPuedeContinuar(false);
      setRelojActivado(false);
      setRelojMoviendose(false);
      setSubtitulo("");
    });
  };

  /* CLIC SOBRE EL RELOJ CERRADO: INICIA SU MOVIMIENTO */

  const activarRelojFinal = () => {
    if (
      momentoRef.current !== "reloj" ||
      relojActivado ||
      relojMoviendose
    ) {
      return;
    }

    setRelojMoviendose(true);
  };

  /* EL RELOJ TERMINA DE MOVERSE, SE ABRE Y PROVOCA EL DESTELLO */

  const terminarMovimientoReloj = (evento) => {
    if (evento.target !== evento.currentTarget) return;

    if (
      !evento.animationName.startsWith("escena4MoverReloj")
    ) {
      return;
    }

    setRelojMoviendose(false);
    setRelojActivado(true);
    setDestelloRelojGlobal(true);
    setSubtitulo(DIALOGOS.reloj);

    if (destelloTimerRef.current) {
      clearTimeout(destelloTimerRef.current);
    }

    destelloTimerRef.current = setTimeout(() => {
      setDestelloRelojGlobal(false);
    }, 1100);

    reproducirAudio("reloj", () => {
      setSubtitulo("");
      setPuedeContinuar(true);
    });
  };

  /* CLIC EN CONTINUAR: PIDE AL COMPONENTE PADRE EL CAMBIO DE CAPÍTULO */

  const comenzarFundidoBlanco = () => {
    if (!puedeContinuar || iniciandoFundido) return;

    setIniciandoFundido(true);
    detenerAudio();

    if (onEscenaTerminada) {
      onEscenaTerminada();
    }
  };

  const reintentarAudio = () => {
    const ultimaSolicitud = ultimoAudioRequestRef.current;

    if (ultimaSolicitud) {
      reproducirAudio(
        ultimaSolicitud.claveAudio,
        ultimaSolicitud.alTerminar
      );
    }
  };

  useEffect(() => {
    return () => {
      detenerAudio();

      if (destelloTimerRef.current) {
        clearTimeout(destelloTimerRef.current);
      }
    };
  }, [detenerAudio]);

  const clasesCaminata = estaCaminando
    ? `escena-4-adrian-caminando escena-4-caminata-${MOMENTOS_CAMINANDO[momento]}`
    : "";

  return (
    <div className={`escena-4 escena-4-momento-${momento}`}>
      <div className="escena-4-contenido">
        <img
          src="/Escenarios/FondoAgora2.svg"
          alt="Ampliación del Ágora de Atenas"
          className="escena-4-fondo"
          draggable="false"
        />

        {/* CIUDADANO DEL COMERCIO */}

        {mostrarComerciante && (
          <div className="escena-4-ciudadano escena-4-ciudadano--comercio">
            <div
              className="escena-4-ciudadano-resplandor"
              aria-hidden="true"
            />
            <img
              src={Comerciante}
              alt="Defensor del comercio"
              draggable="false"
            />
          </div>
        )}

        {/* CIUDADANO DE LAS LEYES */}

        {mostrarLeyes && (
          <div className="escena-4-ciudadano escena-4-ciudadano--leyes">
            <div
              className="escena-4-ciudadano-resplandor"
              aria-hidden="true"
            />
            <img
              src={Leyes}
              alt="Defensor de las leyes y los acuerdos"
              draggable="false"
            />
          </div>
        )}

        {/* ADRIÁN CAMINANDO */}

        {estaCaminando && (
          <div
            className={clasesCaminata}
            onAnimationEnd={manejarFinCaminata}
            aria-hidden="true"
          >
            <Lottie
              animationData={animacionCaminando}
              loop
              autoplay
            />
          </div>
        )}

        {/* ADRIÁN HABLANDO */}

        {!estaCaminando && adrianHabla && (
          <div
            className={`escena-4-adrian-hablando escena-4-adrian--${posicionAdrian}`}
            aria-hidden="true"
          >
            <Lottie
              animationData={AdrianHablando}
              loop
              autoplay
            />
          </div>
        )}

        {/* ADRIÁN QUIETO */}

        {!estaCaminando && !adrianHabla && (
          <img
            src={Feliz}
            alt="Adrián espera mientras escucha"
            className={`escena-4-adrian-quieto escena-4-adrian--${posicionAdrian}`}
            draggable="false"
          />
        )}

        {/* EXPRESIÓN PENSATIVA */}

        {expresionRostro === "pensativo" && (
          <img
            src={PensativoS}
            alt="Expresión pensativa de Adrián"
            className={`escena-4-expresionS escena-4-expresionS--pensativo escena-4-expresionS--${posicionAdrian}`}
            draggable="false"
          />
        )}

        {/* EXPRESIÓN DE SORPRESA */}

        {expresionRostro === "sorprendido" && (
          <img
            src={SorprendidoS}
            alt="Expresión sorprendida de Adrián"
            className={`escena-4-expresionS escena-4-expresionS--sorprendido escena-4-expresionS--${posicionAdrian}`}
            draggable="false"
          />
        )}

        {/* PROPUESTAS: A A LA IZQUIERDA, B A LA DERECHA */}

        {momento === "decision" && (
          <div
            className="escena-4-opciones"
            aria-label="Elige qué propuesta apoyar"
          >
            <button
              type="button"
              className="escena-4-opcion"
              onMouseEnter={() => previsualizarPropuesta("comercio")}
              onFocus={() => previsualizarPropuesta("comercio")}
              onClick={() => elegirPropuesta("comercio")}
              aria-label="Apoyar a los comerciantes"
            >
              <strong>A. Apoyar a los comerciantes</strong>
              <span>
                Dar prioridad al intercambio de mercancías y a la
                actividad económica de la ciudad.
              </span>
              <small>Escuchar propuesta</small>
            </button>

            <button
              type="button"
              className="escena-4-opcion"
              onMouseEnter={() => previsualizarPropuesta("leyes")}
              onFocus={() => previsualizarPropuesta("leyes")}
              onClick={() => elegirPropuesta("leyes")}
              aria-label="Apoyar las leyes y los acuerdos"
            >
              <strong>B. Apoyar las leyes y los acuerdos</strong>
              <span>
                Dar prioridad a las reglas claras y a la resolución
                de conflictos.
              </span>
              <small>Escuchar propuesta</small>
            </button>
          </div>
        )}

        {/* RELOJ CERRADO: SOLO SE ACTIVA AL HACER CLIC */}

        {momento === "reloj" && !relojActivado && (
          <button
            type="button"
            className={[
              "escena-4-reloj-boton",
              `escena-4-reloj-boton--${posicionAdrian}`,
              relojMoviendose ? "moviendose" : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={activarRelojFinal}
            onAnimationEnd={terminarMovimientoReloj}
            disabled={relojMoviendose}
            aria-label="Activar el reloj de Adrián"
          >
            <img
              src={RelojCerrado}
              alt="Reloj cerrado"
              draggable="false"
            />
          </button>
        )}

        {/* RELOJ ABIERTO, COLOCADO CERCA DE ADRIÁN */}

        {momento === "reloj" && relojActivado && (
          <div
            className={[
              "escena-4-reloj-contenedor",
              `escena-4-reloj-contenedor--${posicionAdrian}`,
            ].join(" ")}
            aria-hidden="true"
          >
            <div className="escena-4-reloj-resplandor" />

            <img
              src={Reloj}
              alt=""
              className="escena-4-reloj"
              draggable="false"
            />
          </div>
        )}

        {/* DESTELLO BLANCO EN TODA LA PÁGINA */}

        {destelloRelojGlobal &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              className="escena-4-destello-blanco-global"
              aria-hidden="true"
            />,
            document.body
          )}

        {/* BOTÓN DE CONTINUAR: REUTILIZA LOS ESTILOS DE ESCENA 1 */}

        {momento === "reloj" &&
          puedeContinuar &&
          !iniciandoFundido && (
            <div className="escena-1-continuar-contenedor escena-4-continuar-contenedor">
              <div className="escena-1-continuar-texto escena-4-continuar-texto">
                <span>CONTINUAR AL CAPÍTULO 5</span>

                <button
                  type="button"
                  className="escena-1-continuar-boton"
                  onClick={comenzarFundidoBlanco}
                >
                  CONTINUAR →
                </button>
              </div>
            </div>
          )}

        {/* SUBTÍTULOS */}

        {subtitulo && (
          <div
            className="escena-4-subtitulos"
            key={subtitulo}
            aria-live="polite"
            aria-atomic="true"
          >
            {subtitulo}
          </div>
        )}

        {/* RECUPERAR AUDIO SI EL NAVEGADOR LO BLOQUEA */}

        {audioError && (
          <div className="escena-4-control escena-4-control-error">
            <button
              type="button"
              className="escena-4-accion"
              onClick={reintentarAudio}
            >
              Reproducir audio de nuevo ↻
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Escena4;