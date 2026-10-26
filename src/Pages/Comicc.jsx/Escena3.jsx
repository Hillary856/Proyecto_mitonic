import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import lottieReact from "lottie-react";
import AdrianHablando from "../../assets/AdrianHablando.json";
import Esc3Audio1 from "../../Audios/Esc3Audio1.mp3";
import Esc3Audio2 from "../../Audios/Esc3Audio2.mp3";
import Esc3Audio3 from "../../Audios/Esc3Audio3.mp3";
import Esc3Audio4 from "../../Audios/Esc3Audio4.mp3";
import Esc3Audio5 from "../../Audios/Esc3Audio5.mp3";
import Es3Campana from "../../AssetsNuevos/Es3Campana.svg";
import Es3corona from "../../AssetsNuevos/Es3corona.svg";
import Es3racimo from "../../AssetsNuevos/Es3racimo.svg";
import "./Escenas.css";


const Lottie = lottieReact.default;

// Pose quieta y expresiones ubicadas en la carpeta public.
const ADRIAN_QUIETO = "/Feliz.svg";
const EXPRESION_PENSATIVO = "/pensativoS.svg";
const EXPRESION_FELIZ = "/FelizS.svg";

const POSICIONES_ESCONDITE_ESCENA3 = {
  // 1. CORONA: esquina → parte inferior de la estatua → techo
  corona: [
    { left: "9%", top: "43%" },   // Esquina / columna
    { left: "86%", top: "76%" },  // Parte inferior de la estatua
    { left: "50%", top: "12%" }   // Techo
  ],

  // 2. BALANZA DE BRONCE: estatua → esquina → techo
  campana: [
    { left: "86%", top: "76%" },  // Parte inferior de la estatua
    { left: "9%", top: "43%" },   // Esquina / columna
    { left: "50%", top: "12%" }   // Techo
  ],

  // 3. RACIMO DE UVAS: techo → estatua → esquina
  racimo: [
    { left: "50%", top: "12%" },  // Techo
    { left: "86%", top: "76%" },  // Parte inferior de la estatua
    { left: "9%", top: "43%" }    // Esquina / columna
  ]
};

const TIEMPOS_BUSQUEDA_ESCENA3 = {
  entrada: 120,
  visible: 650,
  salida: 140,
  oculto: 130
};

const Escena3 = forwardRef(
  (
    {
      textoNarracionActivo = true,
      onNarradorEstadoChange,
      onNarracionTerminada,
      onEscenaTerminada
    },
    ref
  ) => {
    /* ======================== AUDIOS ======================== */

    const audiosEscena3 = {
      1: Esc3Audio1,
      2: Esc3Audio2,
      3: Esc3Audio3,
      4: Esc3Audio4,
      5: Esc3Audio5
    };

    /* ====================== SUBTÍTULOS ====================== */

    const subtitulosEscena3 = {
      1: "El Ágora. Este lugar es mucho más que una plaza. Aquí nos reunimos para comerciar, conversar y discutir sobre los asuntos que afectan a nuestra ciudad. Si prestan atención, pueden escuchar cómo las personas intercambian ideas, opiniones y argumentos. La vida pública de Atenas ocurre aquí, frente a todos.",
      2: "¡Ahh, la corona de laurel!.Servía para premiar y dar la máxima distinción de respeto a los líderes, jueces y sabios. Llevarla puesta durante las reuniones daba una protección especial, por lo que nadie podía atacar ni callar a esa persona mientras daba su discurso, también se usaba como premio para los ganadores de los concursos de poesía y talento que se hacían en la plaza.",
      3: "Cada cosa que encontramos aquí parece mostrarnos una parte diferente de cómo funciona nuestra sociedad.",
      4: " La balanza de bronce. Era obligatoria para todos los comerciantes y debían pesar sus productos frente al cliente, ya fueran sacos de trigo, olivas o polvo de oro.",
      5: "Un racimo de uvas no era una simple fruta: era el motor de la economía local, el ingrediente estrella de las grandes discusiones filosóficas impulsadas por el vino y un amuleto vivo consagrado a Dioniso para atraer la buena suerte a los negocios.",
      6: "",
    };

    /* ========================== ESTADOS ===================== */

    const [adrianVisible, setAdrianVisible] = useState(false);
    const [mostrarResplandor, setMostrarResplandor] = useState(false);
    const [audioActual, setAudioActual] = useState(0);
    const [tipoAudio, setTipoAudio] = useState("espera");
    const [narradorActivo, setNarradorActivo] = useState(true);
    const [expresionAdrian, setExpresionAdrian] = useState(null);
    const [versionExpresionAdrian, setVersionExpresionAdrian] = useState(0);

    // Adrián habla mientras el audio está reproduciéndose.
    // Cuando el audio termina o está pausado, aparece su pose quieta.
    const adrianEstaHablando =
      narradorActivo && tipoAudio !== "espera";

    const adrianEstaQuieto = !adrianEstaHablando;

    const [objetoVisible, setObjetoVisible] = useState(null);
    const [objetoDescubierto, setObjetoDescubierto] = useState(null);
    const [objetoPulsando, setObjetoPulsando] = useState(null);
    const [objetoActivo, setObjetoActivo] = useState(null);
    const [objetoEnAudio, setObjetoEnAudio] = useState(null);
    const [objetosDescubiertos, setObjetosDescubiertos] = useState([]);
    const [faseBusqueda, setFaseBusqueda] = useState("entrada");
    const [indiceEscondite, setIndiceEscondite] = useState(0);
    const [momentoTexto, setMomentoTexto] = useState(null);
    const [mostrarContinuar, setMostrarContinuar] = useState(false);

    const audioRef = useRef(null);
    const busquedaTimerRef = useRef(null);
    const expresionTimerRef = useRef(null);
    const expresionObjetoRef = useRef({
      objeto: null,
      disparada: false
    });

    /* ====================== ENTRADA DE ESCENA ================= */

    useEffect(() => {
      setAdrianVisible(true);
      setMostrarResplandor(true);

      const timer = setTimeout(() => {
        setMostrarResplandor(false);
      }, 900);

      return () => clearTimeout(timer);
    }, []);

    /* =================== ESTADO DEL NARRADOR ================= */

    useEffect(() => {
      onNarradorEstadoChange?.(narradorActivo);
    }, [narradorActivo, onNarradorEstadoChange]);

    /* ====================== REPRODUCIR AUDIO ================= */

    const reproducirAudio = (
      audio,
      numero,
      tipo,
      objeto = null,
      momento = null
    ) => {
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
        console.error(
          "No se pudo reproducir el audio de Escena 3:",
          error
        );

        setNarradorActivo(false);
      });
    };

    /* ======================== AUDIO INICIAL ================== */

    useEffect(() => {
      if (!adrianVisible) return;

      reproducirAudio(
        audiosEscena3[1],
        1,
        "principal",
        null,
        1
      );

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [adrianVisible]);

    /* =========================== LIMPIEZA ==================== */

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

        if (expresionTimerRef.current) {
          clearTimeout(expresionTimerRef.current);
          expresionTimerRef.current = null;
        }
      };
    }, []);

    /* ======================= CICLO DE BÚSQUEDA =============== */

    useEffect(() => {
      const posiciones =
        POSICIONES_ESCONDITE_ESCENA3[objetoVisible];

      if (
        !objetoVisible ||
        !posiciones ||
        objetoDescubierto ||
        objetoActivo
      ) {
        if (busquedaTimerRef.current) {
          clearTimeout(busquedaTimerRef.current);
          busquedaTimerRef.current = null;
        }

        return undefined;
      }

      if (busquedaTimerRef.current) {
        clearTimeout(busquedaTimerRef.current);
      }

      const duracion =
        TIEMPOS_BUSQUEDA_ESCENA3[faseBusqueda] ?? 220;

      busquedaTimerRef.current = setTimeout(() => {
        if (faseBusqueda === "entrada") {
          setFaseBusqueda("visible");
        } else if (faseBusqueda === "visible") {
          setFaseBusqueda("salida");
        } else if (faseBusqueda === "salida") {
          setFaseBusqueda("oculto");
        } else {
          setIndiceEscondite(
            (actual) => (actual + 1) % posiciones.length
          );

          setFaseBusqueda("entrada");
        }
      }, duracion);

      return () => {
        if (busquedaTimerRef.current) {
          clearTimeout(busquedaTimerRef.current);
          busquedaTimerRef.current = null;
        }
      };
    }, [
      objetoVisible,
      objetoDescubierto,
      objetoActivo,
      faseBusqueda
    ]);

    /* =================== REGISTRAR OBJETO ==================== */

    const registrarObjetoEncontrado = (objeto) => {
      setObjetosDescubiertos((anteriores) =>
        anteriores.includes(objeto)
          ? anteriores
          : [...anteriores, objeto]
      );
    };

    /* ================= MOSTRAR OBJETO EN BÚSQUEDA ============ */

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

    /* ================= EXPRESIONES DE ADRIÁN ================= */

    const mostrarExpresion = (tipo, lado = "derecha") => {
      if (expresionTimerRef.current) {
        clearTimeout(expresionTimerRef.current);
      }

      setVersionExpresionAdrian((actual) => actual + 1);
      setExpresionAdrian({ tipo, lado });

      expresionTimerRef.current = setTimeout(() => {
        setExpresionAdrian(null);
        expresionTimerRef.current = null;
      }, 4400);
    };

    const mostrarExpresionObjeto = (objeto) => {
      const registro = expresionObjetoRef.current;

      if (
        registro.objeto !== objeto ||
        registro.disparada
      ) {
        return;
      }

      registro.disparada = true;

      // Adrián conoce estos objetos: no reacciona con sorpresa.
      if (objeto === "corona") {
        mostrarExpresion("pensativo", "izquierda");
      } else if (objeto === "campana") {
        mostrarExpresion("pensativo", "derecha");
      } else if (objeto === "racimo") {
        mostrarExpresion("feliz", "derecha");
      }
    };

    /* =========================== FIN AUDIO ================== */

    const manejarFinAudio = () => {
      // Audio de la corona terminado: continuar con la narración del Ágora.
      if (
        tipoAudio === "objeto" &&
        objetoEnAudio === "corona"
      ) {
        mostrarExpresionObjeto("corona");

        setObjetoActivo(null);
        setObjetoVisible(null);
        setObjetoDescubierto(null);
        setObjetoPulsando(null);
        setObjetoEnAudio(null);
        setMomentoTexto(null);

        reproducirAudio(
          audiosEscena3[3],
          3,
          "principal",
          null,
          3
        );

        return;
      }

      // Audio de la balanza terminado: mostrar el siguiente objeto.
      if (
        tipoAudio === "objeto" &&
        objetoEnAudio === "campana"
      ) {
        mostrarExpresionObjeto("campana");
        mostrarObjetoEnBusqueda("racimo");
        return;
      }

      // Audio del racimo terminado: habilitar el botón para continuar.
      if (
        tipoAudio === "objeto" &&
        objetoEnAudio === "racimo"
      ) {
        mostrarExpresionObjeto("racimo");

        setObjetoActivo(null);
        setObjetoVisible(null);
        setObjetoDescubierto(null);
        setObjetoPulsando(null);
        setObjetoEnAudio(null);
        setMomentoTexto(null);
        setNarradorActivo(false);
        setTipoAudio("espera");
        setMostrarContinuar(true);

        return;
      }

      // Audio inicial terminado: mostrar la corona.
      if (
        tipoAudio === "principal" &&
        audioActual === 1
      ) {
        mostrarObjetoEnBusqueda("corona");
        return;
      }

      // Narración del Ágora terminada: mostrar la balanza.
      if (
        tipoAudio === "principal" &&
        audioActual === 3
      ) {
        mostrarObjetoEnBusqueda("campana");
      }
    };

    /* ======================== CLIC EN OBJETO ================= */

    const reproducirObjeto = (objeto) => {
      const configuracion = {
        corona: {
          audio: audiosEscena3[2],
          numero: 2,
          momento: 2
        },
        campana: {
          audio: audiosEscena3[4],
          numero: 4,
          momento: 4
        },
        racimo: {
          audio: audiosEscena3[5],
          numero: 5,
          momento: 5
        }
      }[objeto];

      if (!configuracion) return;

      if (busquedaTimerRef.current) {
        clearTimeout(busquedaTimerRef.current);
        busquedaTimerRef.current = null;
      }

      registrarObjetoEncontrado(objeto);

      expresionObjetoRef.current = {
        objeto,
        disparada: false
      };

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

    /* ======================== CERRAR MODAL =================== */

    const cerrarModal = () => {
      setObjetoActivo(null);

      if (objetoVisible) {
        setObjetoPulsando(objetoVisible);
      }
    };

    /* ===================== CONTINUAR CAPÍTULO 4 ============== */

    const continuarCapitulo4 = () => {
      setMostrarContinuar(false);
      onEscenaTerminada?.();
    };

    /* ======================= BOTÓN NARRADOR ================== */

    const toggleNarracion = () => {
      const audio = audioRef.current;

      if (!audio || tipoAudio === "espera") return;

      if (!audio.paused) {
        audio.pause();
        setNarradorActivo(false);
        return;
      }

      audio.play()
        .then(() => setNarradorActivo(true))
        .catch((error) => {
          console.error(
            "No se pudo reanudar la narración:",
            error
          );
        });
    };

    useImperativeHandle(
      ref,
      () => ({ toggleNarracion }),
      [tipoAudio, narradorActivo]
    );

    /* ===================== POSICIÓN ACTUAL =================== */

    const posicionesActuales =
      POSICIONES_ESCONDITE_ESCENA3[objetoVisible];

    const posicionActual = posicionesActuales?.length
      ? posicionesActuales[
          indiceEscondite % posicionesActuales.length
        ]
      : { left: "50%", top: "50%" };

    const clasesBusqueda =
      `escena-3-objeto-busqueda ${faseBusqueda} ${
        objetoDescubierto === objetoVisible
          ? "descubierto"
          : ""
      } ${
        objetoPulsando === objetoVisible
          ? "pulsando"
          : ""
      }`;

    /* ============================ RENDER ==================== */

    return (
      <div className="escena-3">
        <div className="escena-3-contenido">
          {/* FONDO */}
          <img
            src="/Escenarios/FondoAgora.svg"
            alt="Ágora"
            className="escena-3-fondo"
          />

          {/* CORONA */}
          {objetoVisible === "corona" && (
            <button
              key={`corona-${indiceEscondite}`}
              type="button"
              className={`${clasesBusqueda} escena-3-corona-boton`}
              style={{
                left: posicionActual.left,
                top: posicionActual.top
              }}
              onClick={() => reproducirObjeto("corona")}
              aria-label="Explorar corona"
            >
              <img
                src={Es3corona}
                alt="Corona"
                className="escena-3-corona"
                draggable="false"
              />
            </button>
          )}

          {/* CAMPANA / BALANZA */}
          {objetoVisible === "campana" && (
            <button
              key={`campana-${indiceEscondite}`}
              type="button"
              className={`${clasesBusqueda} escena-3-campana-boton`}
              style={{
                left: posicionActual.left,
                top: posicionActual.top
              }}
              onClick={() => reproducirObjeto("campana")}
              aria-label="Explorar balanza de bronce"
            >
              <img
                src={Es3Campana}
                alt="Balanza de bronce"
                className="escena-3-campana"
                draggable="false"
              />
            </button>
          )}

          {/* RACIMO */}
          {objetoVisible === "racimo" && (
            <button
              key={`racimo-${indiceEscondite}`}
              type="button"
              className={`${clasesBusqueda} escena-3-racimo-boton`}
              style={{
                left: posicionActual.left,
                top: posicionActual.top
              }}
              onClick={() => reproducirObjeto("racimo")}
              aria-label="Explorar racimo de uvas"
            >
              <img
                src={Es3racimo}
                alt="Racimo de uvas"
                className="escena-3-racimo"
                draggable="false"
              />
            </button>
          )}

          {/* PIEZAS DEL ESCENARIO */}
          <img
            src="/Escenarios/EsquinaEsc2.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="escena-3-pieza-frontal escena-3-esquina2"
          />

          <img
            src="/Escenarios/techo.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="escena-3-pieza-frontal escena-3-techo"
          />

          <img
            src="/Escenarios/estatua.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="escena-3-pieza-frontal escena-3-estatua"
          />

          <img
            src="/Escenarios/estatuabajo.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="escena-3-pieza-frontal escena-3-estatuabajo"
          />

          <img
            src="/Escenarios/esquinaEsc.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="escena-3-pieza-frontal escena-3-esquina"
          />

          {/* ADRIÁN Y RESPLANDOR */}
          {adrianVisible && (
            <div
              className={`escena-3-adrian-aparicion ${
                adrianEstaHablando
                  ? "escena-3-adrian--hablando"
                  : "escena-3-adrian--quieto"
              }`}
            >
              {mostrarResplandor && (
                <div className="escena-3-resplandor-adrian" />
              )}

              {adrianEstaHablando ? (
                <div className="escena-3-adrian-hablando">
                  <Lottie
                    animationData={AdrianHablando}
                    loop
                    autoplay
                  />
                </div>
              ) : adrianEstaQuieto ? (
                <img
                  src={ADRIAN_QUIETO}
                  alt="Adrián esperando"
                  className="escena-3-adrian-quieto"
                  draggable="false"
                />
              ) : null}
            </div>
          )}

          {/* EXPRESIÓN TEMPORAL DE ADRIÁN */}
          {expresionAdrian && (
            <img
              key={versionExpresionAdrian}
              src={
                expresionAdrian.tipo === "pensativo"
                  ? EXPRESION_PENSATIVO
                  : EXPRESION_FELIZ
              }
              alt={
                expresionAdrian.tipo === "pensativo"
                  ? "Adrián pensativo"
                  : "Adrián feliz"
              }
              className={`escena-3-expresion escena-3-expresion--${expresionAdrian.tipo} escena-3-expresion--${expresionAdrian.lado}`}
              draggable="false"
              aria-hidden="true"
            />
          )}

          {/* SUBTÍTULOS */}
          {textoNarracionActivo &&
            momentoTexto !== null &&
            subtitulosEscena3[momentoTexto] && (
              <div
                className="escena-3-subtitulos"
                key={momentoTexto}
              >
                {subtitulosEscena3[momentoTexto]}
              </div>
            )}

          {/* CONTINUAR AL CAPÍTULO 4 */}
          {mostrarContinuar && (
            <div className="escena-1-continuar-contenedor escena-3-continuar-contenedor">
              <div className="escena-1-continuar-texto">
                <span>CONTINUAR AL CAPÍTULO 4</span>
                <button
                  type="button"
                  className="escena-1-continuar-boton"
                  onClick={continuarCapitulo4}
                >
                  CONTINUAR →
                </button>
              </div>
            </div>
          )}

          {/* MODAL DE LOS OBJETOS */}
          {objetoActivo && (
            <div
              className="escena-3-modal-fondo"
              onClick={cerrarModal}
            >
              <div
                className="escena-3-modal"
                onClick={(evento) => evento.stopPropagation()}
              >
                <div className="escena-3-modal-imagen">
                  {objetoActivo === "corona" && (
                    <img src={Es3corona} alt="Corona" />
                  )}

                  {objetoActivo === "campana" && (
                    <img
                      src={Es3Campana}
                      alt="Balanza de bronce"
                    />
                  )}

                  {objetoActivo === "racimo" && (
                    <img
                      src={Es3racimo}
                      alt="Racimo de uvas"
                    />
                  )}
                </div>

                <div className="escena-3-modal-info">
                  {objetoActivo === "corona" && (
                    <>
                      <h2>CORONA</h2>
                      <p>
                        Llevarla puesta durante las reuniones daba una
                        protección especial, por lo que nadie podía atacar
                        ni callar a esa persona mientras daba su discurso.
                        También se usaba como premio para los ganadores de
                        los concursos de poesía y talento que se hacían
                        en la plaza.
                      </p>
                    </>
                  )}

                  {objetoActivo === "campana" && (
                    <>
                      <h2>Balanza de bronce</h2>
                      <p>
                        La balanza de bronce del Ágora, revisada por el
                        inspector oficial llamado Metronomos con pesas
                        de piedra selladas con la lechuza de Atenas, era
                        obligatoria para todos los comerciantes y debían
                        pesar sus productos frente al cliente.
                      </p>
                    </>
                  )}

                  {objetoActivo === "racimo" && (
                    <>
                      <h2>RACIMO</h2>
                      <p>
                        En una plaza donde todo se negociaba y se debatía,
                        vender uvas frescas o pasas significaba mover el
                        comercio diario y alimentar a los ciudadanos que
                        pasaban horas arreglando la política de la ciudad.
                      </p>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  className="escena-3-modal-cerrar"
                  onClick={cerrarModal}
                  aria-label="Cerrar información"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          <audio
            ref={audioRef}
            onEnded={manejarFinAudio}
            preload="auto"
          />
        </div>
      </div>
    );
  }
);

Escena3.displayName = "Escena3";

export default Escena3;