import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import lottieReact from "lottie-react";

import CicloAdrianBody from "../../assets/CicloAdrianBody.json";
import AdrianHablando from "../../assets/AdrianHablando.json";

/* Imágenes utilizadas por el Lottie de caminata. */
import img0 from "../../assets/AdrianBody/img_0.png";
import img1 from "../../assets/AdrianBody/img_1.png";
import img2 from "../../assets/AdrianBody/img_2.png";
import img3 from "../../assets/AdrianBody/img_3.png";
import img4 from "../../assets/AdrianBody/img_4.png";
import img5 from "../../assets/AdrianBody/img_5.png";
import img6 from "../../assets/AdrianBody/img_6.png";
import img7 from "../../assets/AdrianBody/img_7.png";

/* Apariencia quieta de Adrián y rostros expresivos. */

/* Recursos de la escena. */
import Reloj from "../../AssetsNuevos/reloj.svg";

/* Audios originales de Adrián. */
import Esc4Audio1 from "../../Audios/Esc4Audio1.mp3";
import Esc4Audio2 from "../../Audios/Esc4Audio2.mp3";
import Esc4Audio3 from "../../Audios/Esc4Audio3.mp3";
import Esc4Audio4 from "../../Audios/Esc4Audio4.mp3";
import Esc4Audio6 from "../../Audios/Esc4Audio6.mp3";
import Esc4Audio8 from "../../Audios/Esc4Audio8.mp3";
import Esc4Audio9 from "../../Audios/Esc4Audio9.mp3";
import Esc4Audio10 from "../../Audios/Esc4Audio10.mp3";

/* Voces de Efraín (comercio) y Martín (leyes). */
import Esc4ComercioDialogo from "../../Audios/Esc4ComercioDialogo.mp3";
import Esc4LeyesDialogo from "../../Audios/Esc4LeyesDialogo.mp3";
import Esc4ComercioRespuesta from "../../Audios/Esc4ComercioRespuesta.mp3";
import Esc4LeyesRespuesta from "../../Audios/Esc4LeyesRespuesta.mp3";

import "./Escenas.css";

const Lottie = lottieReact.default || lottieReact;

/* Los PNG y SVG dentro de public/ se cargan desde la raíz del sitio. */
const Comerciante = "/comerciante.png";
const Leyes = "/leyes.png";

/* Estos SVG están en public/, por eso se referencian desde la raíz del sitio.
   Respeta exactamente las mayúsculas y minúsculas de los nombres de archivo. */
const Feliz = "/Feliz.svg";
const PensativoS = "/pensativoS.svg";
const SorprendidoS = "/SorprendidoS.svg";

const IMAGENES_ADRIAN = [img0, img1, img2, img3, img4, img5, img6, img7];

/*
 * CicloAdrianBody.json referencia ocho imágenes externas.
 * Se reemplazan esas rutas por las imágenes importadas, igual que en Escena 1.
 */
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
    "Si queremos que nuestra ciudad prospere, debemos apoyar a los comerciantes. Gracias a ellos conseguimos productos, intercambiamos mercancías y mantenemos activa gran parte de nuestra vida cotidiana.",
  leyes:
    "¿Y de qué sirve impulsar el comercio si no existen reglas claras? Sin acuerdos que se respeten, las disputas aumentarán y algunos terminarán aprovechándose de los demás.",
  pregunta:
    "Los dos tienen buenos argumentos. ¿Tú a quién apoyarías?",
  vistaPreviaComercio: "Apoyar a los comerciantes.",
  vistaPreviaLeyes: "Apoyar las leyes y los acuerdos.",
  respuestaComercio:
    "Me alegra que comprendas la importancia de esta propuesta. Si facilitamos los intercambios, más personas podrán beneficiarse de los productos que llegan a nuestra ciudad.",
  adrianComercio:
    "Tiene sentido. Si el comercio prospera, muchas personas se benefician. El comercio es fundamental para nuestra ciudad.",
  respuestaLeyes:
    "Es importante que lo comprendas. Una ciudad necesita normas claras para resolver sus disputas y evitar que los desacuerdos se conviertan en problemas mayores.",
  adrianLeyes:
    "Es cierto. Necesitamos reglas para resolver nuestros conflictos. Los acuerdos nos ayudan a convivir, aunque no siempre pensemos igual.",
  reflexion:
    "Cada propuesta responde a una necesidad diferente. ¡Vaya decisión!",
  reloj: "¡Otra vez esa luz! ¿A dónde me llevará ahora?",
};

const MOMENTOS_CAMINANDO = {
  entrada: "entrada",
  caminaDecision: "decision",
  caminaComercio: "comercio",
  caminaLeyes: "leyes",
};

const MOMENTOS_ADRIAN_HABLANDO = new Set([
  "introduccion",
  "pregunta",
  "adrianComercio",
  "adrianLeyes",
  "reflexion",
  "reloj",
]);

const Escena4 = ({ onEscenaTerminada }) => {
  const [momento, setMomento] = useState("entrada");
  const momentoRef = useRef("entrada");

  const [posicionAdrian, setPosicionAdrian] = useState("inicio");
  const [mostrarComerciante, setMostrarComerciante] = useState(false);
  const [mostrarLeyes, setMostrarLeyes] = useState(false);
  const [ramaTerminada, setRamaTerminada] = useState(false);
  const [puedeContinuar, setPuedeContinuar] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [subtitulo, setSubtitulo] = useState("");

  const audioRef = useRef(null);
  const numeroAudioRef = useRef(null);
  const ultimoAudioRequestRef = useRef(null);

  const animacionCaminando = useMemo(() => ANIMACION_ADRIAN_CAMINANDO, []);
  const estaCaminando = Object.prototype.hasOwnProperty.call(
    MOMENTOS_CAMINANDO,
    momento
  );
  const adrianHabla = MOMENTOS_ADRIAN_HABLANDO.has(momento);
  const expresionRostro =
    momento === "pregunta"
      ? "pensativo"
      : momento === "reloj"
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

      ultimoAudioRequestRef.current = { claveAudio, alTerminar };
      const fuente = AUDIOS_ESCENA_4[claveAudio];
      if (!fuente) {
        console.error(`No se encontró el audio de Escena 4: ${claveAudio}`);
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
          console.warn(`No se pudo reproducir ${claveAudio}.`, error);
          audio.pause();
          audioRef.current = null;
          numeroAudioRef.current = null;
          setAudioError(true);
        });
      }
    },
    [detenerAudio]
  );

  /* Se inicia cuando termina la caminata de entrada. */
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
            /* Para la decisión desaparecen los dos ciudadanos. */
            setMostrarComerciante(false);
            setMostrarLeyes(false);
            cambiarMomento("caminaDecision");
          });
        });
      });
    });
  };

  const mostrarRespuestaDeAdrian = (opcion) => {
    const esComercio = opcion === "comercio";
    const claveAudio = esComercio ? "adrianComercio" : "adrianLeyes";
    const texto = esComercio ? DIALOGOS.adrianComercio : DIALOGOS.adrianLeyes;

    cambiarMomento(claveAudio);
    setSubtitulo(texto);

    reproducirAudio(claveAudio, () => {
      setRamaTerminada(true);
      cambiarMomento("resultadoListo");
    });
  };

  const reproducirRespuestaCiudadano = (opcion) => {
    const esComercio = opcion === "comercio";
    const claveAudio = esComercio ? "respuestaComercio" : "respuestaLeyes";
    const texto = esComercio ? DIALOGOS.respuestaComercio : DIALOGOS.respuestaLeyes;

    cambiarMomento(claveAudio);
    setSubtitulo(texto);

    reproducirAudio(claveAudio, () => mostrarRespuestaDeAdrian(opcion));
  };

  const manejarFinCaminata = (evento) => {
    if (evento.target !== evento.currentTarget) return;

    const animacionesEsperadas = {
      entrada: "escena4EntradaAdrian",
      caminaDecision: "escena4CaminaDecision",
      caminaComercio: "escena4CaminaComercio",
      caminaLeyes: "escena4CaminaLeyes",
    };

    if (evento.animationName !== animacionesEsperadas[momentoRef.current]) return;

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

      case "caminaComercio":
        setPosicionAdrian("inicio");
        setMostrarComerciante(true);
        setMostrarLeyes(false);
        reproducirRespuestaCiudadano("comercio");
        break;

      case "caminaLeyes":
        setPosicionAdrian("leyes");
        setMostrarComerciante(false);
        setMostrarLeyes(true);
        reproducirRespuestaCiudadano("leyes");
        break;

      default:
        break;
    }
  };

  const previsualizarPropuesta = (opcion) => {
    if (momentoRef.current !== "decision") return;

    const claveAudio =
      opcion === "comercio" ? "vistaPreviaComercio" : "vistaPreviaLeyes";
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
      if (momentoRef.current === "decision") setSubtitulo(DIALOGOS.pregunta);
    });
  };

  const elegirPropuesta = (opcion) => {
    if (momentoRef.current !== "decision") return;

    detenerAudio();
    setRamaTerminada(false);
    setPuedeContinuar(false);
    setMostrarComerciante(false);
    setMostrarLeyes(false);
    setSubtitulo("");

    if (opcion === "comercio") {
      cambiarMomento("caminaComercio");
    } else {
      cambiarMomento("caminaLeyes");
    }
  };

  const iniciarTransicion = () => {
    setMostrarComerciante(true);
    setMostrarLeyes(true);
    cambiarMomento("reflexion");
    setSubtitulo(DIALOGOS.reflexion);

    reproducirAudio("reflexion", () => {
      cambiarMomento("reloj");
      setPuedeContinuar(false);
      setSubtitulo(DIALOGOS.reloj);

      reproducirAudio("reloj", () => setPuedeContinuar(true));
    });
  };

  const continuarAlColiseo = () => {
    detenerAudio();
    if (onEscenaTerminada) onEscenaTerminada();
  };

  const reintentarAudio = () => {
    const ultimaSolicitud = ultimoAudioRequestRef.current;
    if (ultimaSolicitud) reproducirAudio(ultimaSolicitud.claveAudio, ultimaSolicitud.alTerminar);
  };

  useEffect(() => () => detenerAudio(), [detenerAudio]);

  const clasesCaminata = estaCaminando
    ? `escena-4-adrian-caminando escena-4-caminata-${MOMENTOS_CAMINANDO[momento]}`
    : "";

  return (
    <div className={`escena-4 escena-4-momento-${momento}`}>
      <div className="escena-4-contenido">
        {/* Fondo de la ampliación del Ágora. */}
        <img
          src="/Escenarios/FondoAgora2.svg"
          alt="Ampliación del Ágora de Atenas"
          className="escena-4-fondo"
          draggable="false"
        />

        {/* Comerciante: aparece con resplandor y se mantiene visible. */}
        {mostrarComerciante && (
          <div className="escena-4-ciudadano escena-4-ciudadano--comercio">
            <div className="escena-4-ciudadano-resplandor" aria-hidden="true" />
            <img src={Comerciante} alt="Defensor del comercio" draggable="false" />
          </div>
        )}

        {/* Defensor de las leyes: aparece después del comerciante. */}
        {mostrarLeyes && (
          <div className="escena-4-ciudadano escena-4-ciudadano--leyes">
            <div className="escena-4-ciudadano-resplandor" aria-hidden="true" />
            <img src={Leyes} alt="Defensor de las leyes y los acuerdos" draggable="false" />
          </div>
        )}

        {/* Caminata de entrada y desplazamientos entre posiciones. */}
        {estaCaminando && (
          <div
            className={clasesCaminata}
            onAnimationEnd={manejarFinCaminata}
            aria-hidden="true"
          >
            <Lottie animationData={animacionCaminando} loop autoplay />
          </div>
        )}

        {/* Adrián hablando: solo se renderiza durante sus diálogos. */}
        {!estaCaminando && adrianHabla && (
          <div
            className={`escena-4-adrian-hablando escena-4-adrian--${posicionAdrian}`}
            aria-hidden="true"
          >
            <Lottie animationData={AdrianHablando} loop autoplay />
          </div>
        )}

        {/* Adrián quieto: Feliz.svg se usa cuando no está hablando. */}
        {!estaCaminando && !adrianHabla && (
          <img
            src={Feliz}
            alt="Adrián espera mientras escucha"
            className={`escena-4-adrian-quieto escena-4-adrian--${posicionAdrian}`}
            draggable="false"
          />
        )}

        {/* Solo el rostro: pensativo al preguntar y sorprendido ante el reloj. */}
        {expresionRostro === "pensativo" && (
          <img
            src={PensativoS}
            alt="Expresión pensativa de Adrián"
            className={`escena-4-expresionS escena-4-expresionS--pensativo escena-4-expresionS--${posicionAdrian}`}
            draggable="false"
          />
        )}

        {expresionRostro === "sorprendido" && (
          <img
            src={SorprendidoS}
            alt="Expresión sorprendida de Adrián"
            className={`escena-4-expresionS escena-4-expresionS--sorprendido escena-4-expresionS--${posicionAdrian}`}
            draggable="false"
          />
        )}

        {/* Opciones: A a la izquierda y B a la derecha. */}
        {momento === "decision" && (
          <div className="escena-4-opciones" aria-label="Elige qué propuesta apoyar">
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
                Dar prioridad al intercambio de mercancías y a la actividad
                económica de la ciudad.
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
                Dar prioridad a las reglas claras y a la resolución de conflictos.
              </span>
              <small>Escuchar propuesta</small>
            </button>
          </div>
        )}

        {/* Continuación después de la respuesta de la ruta elegida. */}
        {momento === "resultadoListo" && ramaTerminada && (
          <div className="escena-4-control escena-4-control-resultado">
            <button type="button" className="escena-4-accion" onClick={iniciarTransicion}>
              Continuar →
            </button>
          </div>
        )}

        {/* Reloj brillante: aparece después de la reflexión común. */}
        {momento === "reloj" && (
          <>
            <div className="escena-4-reloj-contenedor" aria-hidden="true">
              <div className="escena-4-reloj-resplandor" />
              <img src={Reloj} alt="" className="escena-4-reloj" />
            </div>

            {puedeContinuar && (
              <div className="escena-4-control escena-4-control-reloj">
                <button type="button" className="escena-4-accion" onClick={continuarAlColiseo}>
                  Continuar al Coliseo romano →
                </button>
              </div>
            )}
          </>
        )}

        {/* Subtítulos inferiores con el mismo tratamiento visual de las escenas 1–3. */}
        {subtitulo && (
          <div className="escena-4-subtitulos" key={subtitulo} aria-live="polite" aria-atomic="true">
            {subtitulo}
          </div>
        )}

        {/* Si el navegador bloquea un audio automático, permite reintentarlo. */}
        {audioError && (
          <div className="escena-4-control escena-4-control-error">
            <button type="button" className="escena-4-accion" onClick={reintentarAudio}>
              Reproducir audio de nuevo ↻
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Escena4;
