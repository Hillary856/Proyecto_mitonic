import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";

import lottieReact from "lottie-react";
import AdrianHablando from "../../assets/AdrianHablando.json";

import Esc2Audio1 from "../../Audios/Esc2Audio1.mp3";
import Esc2Audio2 from "../../Audios/Esc2Audio2.mp3";
import Esc2Audio3 from "../../Audios/Esc2Audio3.mp3";
import Esc2Audio4 from "../../Audios/Esc2Audio4.mp3";
import Esc2Audio5 from "../../Audios/Esc2Audio5.mp3";
import Esc2Audio6 from "../../Audios/Esc2Audio6.mp3";
import Esc2Audio7 from "../../Audios/Esc2Audio7.mp3";
import Esc2Audio8 from "../../Audios/Esc2Audio8.mp3";

import Es1Platon from "../../AssetsNuevos/Es1Platon.svg";
import Es1Pergamino from "../../AssetsNuevos/Es1Pergamino.svg";
import Es1copa from "../../AssetsNuevos/Es1copa.svg";
import reloj from "../../AssetsNuevos/reloj.svg";

import "./Escenas.css";

const Lottie = lottieReact.default;

/*
  Coordenadas de los escondites en porcentajes del marco de la escena.
  Los cambios de posición suceden únicamente mientras el asset está oculto.
  Estos puntos están distribuidos sobre los tres techos del foreground.
*/
const POSICIONES_ESCONDITE_ESCENA2 = {
  platon: [
    { left: "16%", top: "35%" },
    { left: "31%", top: "34.5%" },
    { left: "9%", top: "43.5%" },
    { left: "73%", top: "53%" },
    { left: "88%", top: "52.5%" },
    { left: "39%", top: "35%" }
  ],
  pergamino: [
    { left: "37%", top: "35%" },
    { left: "17%", top: "43.5%" },
    { left: "68%", top: "53%" },
    { left: "91%", top: "51.8%" },
    { left: "12%", top: "44.5%" },
    { left: "28%", top: "35.5%" }
  ],
  copa: [
    { left: "11%", top: "43.5%" },
    { left: "26%", top: "35%" },
    { left: "73%", top: "52.5%" },
    { left: "85%", top: "53.5%" },
    { left: "34%", top: "35.5%" },
    { left: "94%", top: "51.8%" }
  ]
};

const TIEMPOS_BUSQUEDA = {
  entrada: 220,
  visible: 750,
  salida: 240,
  oculto: 130
};

const Escena2 = forwardRef(
  (
    {
      textoNarracionActivo = true,
      onNarradorEstadoChange,
      onObjetosEncontrados,
      onCapituloDesbloqueado,
      onEscenaTerminada
    },
    ref
  ) => {
    /* ======================== AUDIOS ======================== */
    const audiosEscena2 = {
      1: Esc2Audio1,
      2: Esc2Audio2,
      3: Esc2Audio3,
      4: Esc2Audio4,
      5: Esc2Audio5,
      6: Esc2Audio6,
      7: Esc2Audio7,
      8: Esc2Audio8
    };

    /* ====================== SUBTÍTULOS ====================== */
    const subtitulosEscena2 = {
      1: "Estoy en Atenas... Pero este no es el lugar donde estaba hace un momento. Ese extraño objeto me ha traído hasta aquí. Estamos en una de las zonas donde se concentra gran parte de nuestra vida cultural e intelectual. Atenas es hogar de pensadores que cuestionan, enseñan y buscan comprender el mundo que nos rodea. Y si el reloj me ha traído hasta aquí, quizás haya una razón.",
      2: "Reconozco este libro. Es La República, de Platón. Platón reflexiona aquí sobre la justicia, la educación y la manera en que debería organizarse una sociedad.",
      3: "Sus ideas generan debates que siguen muy presentes entre quienes buscan comprender cómo debería funcionar nuestra ciudad.",
      4: "Y este pergamino pertenece a Aristóteles. Él estudia prácticamente todo lo que despierta su curiosidad: la filosofía, la política, la naturaleza y la lógica.",
      5: "Su objetivo es comprender cómo funciona el mundo, no simplemente aceptar las cosas como son.",
      6: "Esta copa tiene una historia mucho más difícil. Está relacionada con Sócrates y con uno de los momentos más recordados de nuestra historia.",
      7: "Después de ser condenado a muerte en Atenas, Sócrates bebe la cicuta y permanece fiel a sus principios hasta el final. Su historia nos recuerda que cuestionar lo que creemos saber también puede tener consecuencias.",
      8: "Otra vez... Cada vez que este objeto se activa, me lleva a otro lugar. Pero ¿por qué me está mostrando estos momentos?"
    };

    /* ========================= ADRIÁN ======================= */
    const [adrianVisible, setAdrianVisible] = useState(false);
    const [mostrarResplandor, setMostrarResplandor] = useState(false);

    /* ========================== AUDIO ======================= */
    const [audioActual, setAudioActual] = useState(0);
    const [tipoAudio, setTipoAudio] = useState("espera");
    const [narradorActivo, setNarradorActivo] = useState(true);

    /* ========================== OBJETOS ===================== */
    const [objetoVisible, setObjetoVisible] = useState(null);
    const [objetoDescubierto, setObjetoDescubierto] = useState(null);
    const [objetoPulsando, setObjetoPulsando] = useState(null);
    const [objetoActivo, setObjetoActivo] = useState(null);
    const [objetoEnAudio, setObjetoEnAudio] = useState(null);
    const [objetosDescubiertos, setObjetosDescubiertos] = useState([]);

    /* Fases de búsqueda: entrada → visible → salida → oculto. */
    const [faseBusqueda, setFaseBusqueda] = useState("entrada");
    const [indiceEscondite, setIndiceEscondite] = useState(0);
    const busquedaTimerRef = useRef(null);

    const [momentoTexto, setMomentoTexto] = useState(null);
    const [mostrarContinuar, setMostrarContinuar] = useState(false);
    const audioRef = useRef(null);

    /* ====================== ENTRADA ESCENA ================== */
    useEffect(() => {
      setAdrianVisible(true);
      setMostrarResplandor(true);
      const timer = setTimeout(() => setMostrarResplandor(false), 900);
      return () => clearTimeout(timer);
    }, []);

    /* =================== INFORMAR ESTADO NARRADOR ============ */
    useEffect(() => {
      onNarradorEstadoChange?.(narradorActivo);
    }, [narradorActivo, onNarradorEstadoChange]);

    /* =========================== AUDIO ====================== */
    const reproducirAudio = (audio, numero, tipo, objeto = null, momento = null) => {
      const reproductor = audioRef.current;
      if (!reproductor) return;

      reproductor.pause();
      reproductor.src = audio;
      reproductor.load();
      reproductor.currentTime = 0;

      setAudioActual(numero);
      setTipoAudio(tipo);
      setObjetoEnAudio(objeto);
      setMomentoTexto(momento);
      setNarradorActivo(true);

      reproductor.play().catch((error) => {
        console.error("No se pudo reproducir el audio de Escena 2:", error);
        setNarradorActivo(false);
      });
    };

    useEffect(() => {
      if (!adrianVisible) return;
      reproducirAudio(audiosEscena2[1], 1, "principal", null, 1);
      // El primer audio debe comenzar una sola vez cuando aparece Adrián.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adrianVisible]);

    useEffect(() => {
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        if (busquedaTimerRef.current) {
          clearTimeout(busquedaTimerRef.current);
          busquedaTimerRef.current = null;
        }
      };
    }, []);

    /* ===================== CICLO DE BÚSQUEDA =================
       Un objeto solo se mueve cuando ya está oculto. Al encontrarlo
       se cancela el temporizador y permanece en la posición actual.
    */
    useEffect(() => {
      const posiciones = POSICIONES_ESCONDITE_ESCENA2[objetoVisible];
      const objetoEnBusqueda = Boolean(objetoVisible && objetoVisible !== "reloj" && posiciones);

      if (!objetoEnBusqueda || objetoDescubierto || objetoActivo) {
        if (busquedaTimerRef.current) {
          clearTimeout(busquedaTimerRef.current);
          busquedaTimerRef.current = null;
        }
        return undefined;
      }

      if (busquedaTimerRef.current) {
        clearTimeout(busquedaTimerRef.current);
      }

      const duracion = TIEMPOS_BUSQUEDA[faseBusqueda] ?? TIEMPOS_BUSQUEDA.entrada;
      busquedaTimerRef.current = setTimeout(() => {
        if (faseBusqueda === "entrada") {
          setFaseBusqueda("visible");
        } else if (faseBusqueda === "visible") {
          setFaseBusqueda("salida");
        } else if (faseBusqueda === "salida") {
          setFaseBusqueda("oculto");
        } else {
          setIndiceEscondite((actual) => (actual + 1) % posiciones.length);
          setFaseBusqueda("entrada");
        }
      }, duracion);

      return () => {
        if (busquedaTimerRef.current) {
          clearTimeout(busquedaTimerRef.current);
          busquedaTimerRef.current = null;
        }
      };
    }, [objetoVisible, objetoDescubierto, objetoActivo, faseBusqueda]);

    /* =================== REGISTRAR ENCONTRADO ================= */
    const registrarObjetoEncontrado = (objeto) => {
      if (objetosDescubiertos.includes(objeto)) return;
      const nuevos = [...objetosDescubiertos, objeto];
      setObjetosDescubiertos(nuevos);
      if (nuevos.length === 3) onObjetosEncontrados?.(3);
    };

    /* ========================== FIN AUDIO ==================== */
    const mostrarObjetoEnBusqueda = (objeto) => {
      setObjetoActivo(null);
      setObjetoVisible(objeto);
      setObjetoDescubierto(null);
      setObjetoPulsando(null);
      setObjetoEnAudio(null);
      setIndiceEscondite(0);
      setFaseBusqueda("entrada");
      setMomentoTexto(null);
      setTipoAudio("espera");
      setNarradorActivo(false);
    };

    const manejarFinAudio = () => {
      if (tipoAudio === "objeto") {
        if (objetoEnAudio === "platon") {
          setObjetoActivo(null);
          setObjetoPulsando(null);
          reproducirAudio(audiosEscena2[3], 3, "principal", null, 3);
          return;
        }

        if (objetoEnAudio === "pergamino") {
          setObjetoActivo(null);
          setObjetoPulsando(null);
          reproducirAudio(audiosEscena2[5], 5, "principal", null, 5);
          return;
        }

        if (objetoEnAudio === "copa") {
          setObjetoActivo(null);
          setObjetoPulsando(null);
          reproducirAudio(audiosEscena2[7], 7, "principal", null, 7);
          return;
        }
      }

      if (tipoAudio === "principal" && audioActual === 1) {
        mostrarObjetoEnBusqueda("platon");
        return;
      }

      if (tipoAudio === "principal" && audioActual === 3) {
        mostrarObjetoEnBusqueda("pergamino");
        return;
      }

      if (tipoAudio === "principal" && audioActual === 5) {
        mostrarObjetoEnBusqueda("copa");
        return;
      }

      if (tipoAudio === "principal" && audioActual === 7) {
        setObjetoVisible("reloj");
        setObjetoDescubierto(null);
        setObjetoPulsando(null);
        setObjetoActivo(null);
        reproducirAudio(audiosEscena2[8], 8, "principal", null, 8);
        return;
      }

      if (tipoAudio === "principal" && audioActual === 8) {
        setNarradorActivo(false);
        setTipoAudio("espera");
        setMostrarContinuar(true);
        setMomentoTexto(8);
      }
    };

    /* ====================== CLIC EN OBJETO =================== */
    const reproducirObjeto = (objeto) => {
      const configuracion = {
        platon: { audio: audiosEscena2[2], numero: 2, momento: 2 },
        pergamino: { audio: audiosEscena2[4], numero: 4, momento: 4 },
        copa: { audio: audiosEscena2[6], numero: 6, momento: 6 }
      }[objeto];

      if (!configuracion) return;

      if (busquedaTimerRef.current) {
        clearTimeout(busquedaTimerRef.current);
        busquedaTimerRef.current = null;
      }

      // La primera vez lo registra; al volver a pulsarlo solo se repite el audio/modal.
      registrarObjetoEncontrado(objeto);
      setObjetoDescubierto(objeto);
      setFaseBusqueda("encontrado");
      setObjetoPulsando(null);
      setObjetoActivo(objeto);

      reproducirAudio(
        configuracion.audio,
        configuracion.numero,
        "objeto",
        objeto,
        configuracion.momento
      );
    };

    /* ==================== CERRAR MODAL ======================= */
    const cerrarModal = () => {
      setObjetoActivo(null);
      if (objetoVisible && objetoVisible !== "reloj") {
        setObjetoPulsando(objetoVisible);
      }
    };

    /* ================= CONTINUAR AL CAPÍTULO 3 ================ */
    const continuarCapitulo3 = () => {
      if (objetosDescubiertos.length < 3) return;
      onCapituloDesbloqueado?.(3);
      setMostrarContinuar(false);
      onEscenaTerminada?.();
    };

    /* ====================== BOTÓN NARRADOR =================== */
    const toggleNarracion = () => {
      const audio = audioRef.current;
      if (!audio || tipoAudio === "espera") return;

      if (!audio.paused) {
        audio.pause();
        setNarradorActivo(false);
        return;
      }

      audio.play().then(() => setNarradorActivo(true)).catch((error) => {
        console.error("No se pudo reanudar la narración:", error);
      });
    };

    useImperativeHandle(ref, () => ({ toggleNarracion }), [tipoAudio, narradorActivo]);

    const posicionesActuales = POSICIONES_ESCONDITE_ESCENA2[objetoVisible];
    const posicionActual = posicionesActuales?.length
      ? posicionesActuales[indiceEscondite % posicionesActuales.length]
      : { left: "50%", top: "50%" };

    const clasesBusqueda = `escena-2-objeto-busqueda ${faseBusqueda} ${
      objetoDescubierto === objetoVisible ? "descubierto" : ""
    } ${objetoPulsando === objetoVisible ? "pulsando" : ""}`;

    return (
      <div className="escena-2">
        <div className="escena-2-contenido">
          {/* Fondo nuevo sin los techos. */}
          <img
            src="/Escenarios/FondoAtenas(2).svg"
            alt="Atenas"
            className="escena-2-fondo"
          />

          {/* Vegetación que ya formaba parte de la composición anterior. */}
          <svg
            className="escena-2-overlay"
            viewBox="0 0 1024 598"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <image href="/Escenarios/arbol1.svg" x="923" y="62" width="108" height="292" />
            <image href="/Escenarios/arbol2.svg" x="884" y="94" width="82" height="265" />
            <image href="/Escenarios/arbusto1.svg" x="850" y="296" width="174" height="120" />
            <image href="/Escenarios/arbusto2.svg" x="398" y="322" width="100" height="92" />
            <image href="/Escenarios/arbusto3.svg" x="180" y="298" width="120" height="110" />
          </svg>

          {/* PLATÓN */}
          {objetoVisible === "platon" && (
            <button
              key={`platon-${indiceEscondite}`}
              className={`${clasesBusqueda} escena-2-platon-boton`}
              style={{ left: posicionActual.left, top: posicionActual.top }}
              onClick={() => reproducirObjeto("platon")}
              aria-label="Explorar Platón"
            >
              <img src={Es1Platon} alt="La República de Platón" className="escena-2-platon" />
            </button>
          )}

          {/* PERGAMINO */}
          {objetoVisible === "pergamino" && (
            <button
              key={`pergamino-${indiceEscondite}`}
              className={`${clasesBusqueda} escena-2-pergamino-boton`}
              style={{ left: posicionActual.left, top: posicionActual.top }}
              onClick={() => reproducirObjeto("pergamino")}
              aria-label="Explorar pergamino"
            >
              <img src={Es1Pergamino} alt="Pergamino" className="escena-2-pergamino" />
            </button>
          )}

          {/* COPA */}
          {objetoVisible === "copa" && (
            <button
              key={`copa-${indiceEscondite}`}
              className={`${clasesBusqueda} escena-2-copa-boton`}
              style={{ left: posicionActual.left, top: posicionActual.top }}
              onClick={() => reproducirObjeto("copa")}
              aria-label="Explorar copa"
            >
              <img src={Es1copa} alt="Copa" className="escena-2-copa" />
            </button>
          )}

          {/* FOREGROUND: los techos tapan parcialmente los assets. */}
          <img
            src="/Escenarios/ForegroundAtenas.svg"
            alt=""
            aria-hidden="true"
            className="escena-2-foreground"
          />

          {/* ADRIÁN Y SU RESPLANDOR DE ENTRADA */}
          {adrianVisible && (
            <div className="escena-2-adrian-aparicion">
              {mostrarResplandor && <div className="escena-2-resplandor-adrian" />}
              <div className="escena-2-adrian-hablando">
                <Lottie animationData={AdrianHablando} loop autoplay />
              </div>
            </div>
          )}

          {/* SUBTÍTULOS */}
          {textoNarracionActivo && momentoTexto !== null && subtitulosEscena2[momentoTexto] && (
            <div className="escena-2-subtitulos" key={momentoTexto}>
              {subtitulosEscena2[momentoTexto]}
            </div>
          )}

          {/* RELOJ: se mantiene la lógica existente de la escena. */}
          {objetoVisible === "reloj" && (
            <div className="escena-2-reloj">
              <img src={reloj} alt="Reloj" />
            </div>
          )}

          {/* CONTINUAR */}
          {mostrarContinuar && (
            <div className="escena-2-continuar-contenedor">
              <div className="escena-2-continuar-texto">
                <span>CONTINUAR AL CAPÍTULO 3</span>
                <button
                  className="escena-2-continuar-boton"
                  onClick={continuarCapitulo3}
                  disabled={objetosDescubiertos.length < 3}
                >
                  CONTINUAR →
                </button>
              </div>
            </div>
          )}

          {/* MODAL REUTILIZABLE: cerrar y volver a pulsar repite el audio. */}
          {objetoActivo && (
            <div className="escena-2-modal-fondo" onClick={cerrarModal}>
              <div className="escena-2-modal" onClick={(evento) => evento.stopPropagation()}>
                <div className="escena-2-modal-imagen">
                  {objetoActivo === "platon" && <img src={Es1Platon} alt="Platón" />}
                  {objetoActivo === "pergamino" && <img src={Es1Pergamino} alt="Pergamino" />}
                  {objetoActivo === "copa" && <img src={Es1copa} alt="Copa" />}
                </div>
                <div className="escena-2-modal-info">
                  {objetoActivo === "platon" && (
                    <>
                      <h2>PLATÓN</h2>
                      <p>Platón reflexiona aquí sobre la justicia, la educación y la manera en que debería organizarse una sociedad. Sus ideas generan debates que siguen muy presentes entre quienes buscan comprender cómo debería funcionar nuestra ciudad.</p>
                    </>
                  )}
                  {objetoActivo === "pergamino" && (
                    <>
                      <h2>PERGAMINO</h2>
                      <p>Él estudia prácticamente todo lo que despierta su curiosidad: la filosofía, la política, la naturaleza y la lógica. Su objetivo es comprender cómo funciona el mundo, no simplemente aceptar las cosas como son.</p>
                    </>
                  )}
                  {objetoActivo === "copa" && (
                    <>
                      <h2>COPA</h2>
                      <p>Después de ser condenado a muerte en Atenas, Sócrates bebe la cicuta y permanece fiel a sus principios hasta el final. Su historia nos recuerda que cuestionar lo que creemos saber también puede tener consecuencias.</p>
                    </>
                  )}
                </div>
                <button className="escena-2-modal-cerrar" onClick={cerrarModal} aria-label="Cerrar información">×</button>
              </div>
            </div>
          )}

          <audio ref={audioRef} onEnded={manejarFinAudio} preload="auto" />
        </div>
      </div>
    );
  }
);

Escena2.displayName = "Escena2";
export default Escena2;
