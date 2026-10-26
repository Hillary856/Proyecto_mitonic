import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
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
import RelojCerrado from "../../AssetsNuevos/RelojCerrado.svg";
import RelojAbierto from "../../AssetsNuevos/reloj.svg";

import "./Escenas.css";

const Lottie = lottieReact.default || lottieReact;

/* Expresiones ubicadas dentro de public/. */
const ADRIAN_QUIETO = "/Feliz.svg";
const ADRIAN_SORPRENDIDO_COMPLETO = "/sorprendido.svg";
const EXPRESION_PENSATIVO = "/pensativoS.svg";
const EXPRESION_FELIZ = "/FelizS.svg";

/* Posiciones actuales de los árboles y arbustos. */
const DECORATIVOS_ESCENA2 = [
  {
    id: "arbol1",
    tipo: "arbol",
    src: "/Escenarios/arbol1.svg",
    left: "92.285%",
    top: "10.368%",
    width: "10.547%",
    height: "48.829%",
  },
  {
    id: "arbol2",
    tipo: "arbol",
    src: "/Escenarios/arbol2.svg",
    left: "89.844%",
    top: "15.719%",
    width: "8.008%",
    height: "44.314%",
  },
  {
    id: "arbusto1",
    tipo: "arbusto",
    src: "/Escenarios/arbusto1.svg",
    left: "86.914%",
    top: "49.498%",
    width: "16.992%",
    height: "20.067%",
  },
  {
    id: "arbusto2",
    tipo: "arbusto",
    src: "/Escenarios/arbusto2.svg",
    left: "64.453%",
    top: "56.02%",
    width: "9.766%",
    height: "15.385%",
  },
  {
    id: "arbusto3",
    tipo: "arbusto",
    src: "/Escenarios/arbusto3.svg",
    left: "24.414%",
    top: "50.167%",
    width: "11.719%",
    height: "18.395%",
  },
];

/* Ritmo actual de la búsqueda. */
const TIEMPOS_BUSQUEDA = {
  entrada: 100,
  visible: 500,
  salida: 120,
  oculto: 110,
};

/* Escondites actuales de cada objeto. */
const POSICIONES_ESCONDITE_ESCENA2 = {
  platon: [
    { left: "9%", top: "39%" },
    { left: "23%", top: "53%" },
    { left: "36%", top: "26%" },
    { left: "24%", top: "55%" },
  ],
  pergamino: [
    { left: "17%", top: "40%" },
    { left: "53%", top: "55%" },
    { left: "38%", top: "28%" },
    { left: "85%", top: "55%" },
  ],
  copa: [
    { left: "27%", top: "40%" },
    { left: "83%", top: "53%" },
    { left: "28%", top: "27.5%" },
    { left: "87%", top: "55%" },
  ],
};

const Escena2 = forwardRef(
  (
    {
      textoNarracionActivo = true,
      onNarradorEstadoChange,
      onObjetosEncontrados,
      onCapituloDesbloqueado,
      onEscenaTerminada,
    },
    ref
  ) => {
    const audiosEscena2 = {
      1: Esc2Audio1,
      2: Esc2Audio2,
      3: Esc2Audio3,
      4: Esc2Audio4,
      5: Esc2Audio5,
      6: Esc2Audio6,
      7: Esc2Audio7,
      8: Esc2Audio8,
    };

    const subtitulosEscena2 = {
      1: "Estoy en Atenas... Pero este no es el lugar donde estaba hace un momento. Ese extraño objeto me ha traído hasta aquí. Estamos en una de las zonas donde se concentra gran parte de nuestra vida cultural e intelectual. Atenas es hogar de pensadores que cuestionan, enseñan y buscan comprender el mundo que nos rodea. Y si el reloj me ha traído hasta aquí, quizás haya una razón.",
      2: "Reconozco este libro. Es La República, de Platón. Platón reflexiona aquí sobre la justicia, la educación y la manera en que debería organizarse una sociedad.",
      3: "Sus ideas generan debates que siguen muy presentes entre quienes buscan comprender cómo debería funcionar nuestra ciudad.",
      4: "Y este pergamino pertenece a Aristóteles. Él estudia prácticamente todo lo que despierta su curiosidad: la filosofía, la política, la naturaleza y la lógica.",
      5: "Su objetivo es comprender cómo funciona el mundo, no simplemente aceptar las cosas como son.",
      6: "Esta copa tiene una historia mucho más difícil. Está relacionada con Sócrates y con uno de los momentos más recordados de nuestra historia.",
      7: "Después de ser condenado a muerte en Atenas, Sócrates bebe la cicuta y permanece fiel a sus principios hasta el final. Su historia nos recuerda que cuestionar lo que creemos saber también puede tener consecuencias.",
      8: "Otra vez... Cada vez que este objeto se activa, me lleva a otro lugar. Pero ¿por qué me está mostrando estos momentos?",
      9: "",
    };

    /* Adrián: entrada, sorpresa y conversación. */
    const [adrianVisible, setAdrianVisible] = useState(true);
    const [mostrarResplandor, setMostrarResplandor] = useState(false);
    const [mostrarAdrianSorprendido, setMostrarAdrianSorprendido] =
      useState(false);

    /* Audio y narración. */
    const [audioActual, setAudioActual] = useState(0);
    const [tipoAudio, setTipoAudio] = useState("espera");
    const [narradorActivo, setNarradorActivo] = useState(false);

    /* Objetos y búsqueda. */
    const [objetoVisible, setObjetoVisible] = useState(null);
    const [objetoDescubierto, setObjetoDescubierto] = useState(null);
    const [objetoPulsando, setObjetoPulsando] = useState(null);
    const [objetoActivo, setObjetoActivo] = useState(null);
    const [objetoEnAudio, setObjetoEnAudio] = useState(null);
    const [objetosDescubiertos, setObjetosDescubiertos] = useState([]);
    const [faseBusqueda, setFaseBusqueda] = useState("entrada");
    const [indiceEscondite, setIndiceEscondite] = useState(0);

    /* Subtítulos y botón final. */
    const [momentoTexto, setMomentoTexto] = useState(null);
    const [mostrarContinuar, setMostrarContinuar] = useState(false);

    /* El reloj abierto solo aparece al terminar el audio 8. */
    const [relojAbierto, setRelojAbierto] = useState(false);

    /* Expresiones faciales. */
    const [expresionAdrian, setExpresionAdrian] = useState(null);
    const [versionExpresionAdrian, setVersionExpresionAdrian] =
      useState(0);

    /* Movimiento de árboles y arbustos. */
    const [decorativoAnimando, setDecorativoAnimando] = useState(null);
    const [versionDecorativo, setVersionDecorativo] = useState(0);

    const audioRef = useRef(null);
    const busquedaTimerRef = useRef(null);
    const expresionTimerRef = useRef(null);
    const decorativoTimerRef = useRef(null);

    const expresionesMostradasRef = useRef(new Set());
    const relojAudioIniciadoRef = useRef(false);

    /* Sincronizar el estado de narración con EscenaPortada. */
    useEffect(() => {
      onNarradorEstadoChange?.(narradorActivo);
    }, [narradorActivo, onNarradorEstadoChange]);

    /* Reproducir audio y mostrar el subtítulo correspondiente. */
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
          `No se pudo reproducir el audio ${numero} de la escena 2:`,
          error
        );
        setNarradorActivo(false);
      });
    };

    /* Entrada de Adrián; después empieza el audio 1. */
    useEffect(() => {
      setAdrianVisible(true);
      setMostrarResplandor(true);
      setMostrarAdrianSorprendido(true);

      const timerResplandor = setTimeout(() => {
        setMostrarResplandor(false);
      }, 900);

      const timerEntrada = setTimeout(() => {
        setMostrarAdrianSorprendido(false);
        reproducirAudio(audiosEscena2[1], 1, "principal", null, 1);
      }, 620);

      return () => {
        clearTimeout(timerResplandor);
        clearTimeout(timerEntrada);
      };

      // La introducción debe ejecutarse una sola vez al montar la escena.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* Limpieza al salir de la escena. */
    useEffect(() => {
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        if (busquedaTimerRef.current) {
          clearTimeout(busquedaTimerRef.current);
        }

        if (expresionTimerRef.current) {
          clearTimeout(expresionTimerRef.current);
        }

        if (decorativoTimerRef.current) {
          clearTimeout(decorativoTimerRef.current);
        }
      };
    }, []);

    /* Búsqueda: el objeto se mueve mientras está oculto. */
    useEffect(() => {
      const posiciones = POSICIONES_ESCONDITE_ESCENA2[objetoVisible];

      const objetoEnBusqueda = Boolean(
        objetoVisible &&
          objetoVisible !== "reloj" &&
          posiciones
      );

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

      const duracion =
        TIEMPOS_BUSQUEDA[faseBusqueda] ??
        TIEMPOS_BUSQUEDA.entrada;

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
      faseBusqueda,
    ]);

    /* Registrar los objetos que el usuario ha encontrado. */
    const registrarObjetoEncontrado = (objeto) => {
      if (objetosDescubiertos.includes(objeto)) return;

      const nuevosObjetos = [...objetosDescubiertos, objeto];
      setObjetosDescubiertos(nuevosObjetos);

      if (nuevosObjetos.length === 3) {
        onObjetosEncontrados?.(3);
      }
    };

    /* Mostrar el siguiente objeto de búsqueda. */
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

    /* Animar árboles y arbustos cuando se pulsan. */
    const animarDecorativo = (id) => {
      if (decorativoTimerRef.current) {
        clearTimeout(decorativoTimerRef.current);
      }

      setDecorativoAnimando(id);
      setVersionDecorativo((actual) => actual + 1);

      decorativoTimerRef.current = setTimeout(() => {
        setDecorativoAnimando(null);
        decorativoTimerRef.current = null;
      }, 950);
    };

    /* Mostrar cada expresión facial una sola vez por objeto. */
    const mostrarExpresionObjeto = (objeto) => {
      if (expresionesMostradasRef.current.has(objeto)) return;

      const expresiones = {
        platon: { tipo: "pensativo", lado: "derecha" },
        pergamino: { tipo: "feliz", lado: "izquierda" },
        copa: { tipo: "pensativo", lado: "izquierda" },
      };

      const expresion = expresiones[objeto];
      if (!expresion) return;

      expresionesMostradasRef.current.add(objeto);

      if (expresionTimerRef.current) {
        clearTimeout(expresionTimerRef.current);
      }

      setExpresionAdrian(expresion);
      setVersionExpresionAdrian((actual) => actual + 1);

      expresionTimerRef.current = setTimeout(() => {
        setExpresionAdrian(null);
        expresionTimerRef.current = null;
      }, 3800);
    };

    /* Gestionar el final de cada audio. */
    const manejarFinAudio = () => {
      if (tipoAudio === "objeto") {
        if (objetoEnAudio === "platon") {
          mostrarExpresionObjeto("platon");
          setObjetoActivo(null);
          setObjetoPulsando(null);
          reproducirAudio(audiosEscena2[3], 3, "principal", null, 3);
          return;
        }

        if (objetoEnAudio === "pergamino") {
          mostrarExpresionObjeto("pergamino");
          setObjetoActivo(null);
          setObjetoPulsando(null);
          reproducirAudio(audiosEscena2[5], 5, "principal", null, 5);
          return;
        }

        if (objetoEnAudio === "copa") {
          mostrarExpresionObjeto("copa");
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

      /* Final del audio 7: mostrar reloj cerrado. */
      if (tipoAudio === "principal" && audioActual === 7) {
        relojAudioIniciadoRef.current = false;
        setRelojAbierto(false);
        setObjetoVisible("reloj");
        setObjetoDescubierto(null);
        setObjetoPulsando(null);
        setObjetoActivo(null);
        setObjetoEnAudio(null);
        setMomentoTexto(null);
        setTipoAudio("espera");
        setNarradorActivo(false);
        setMostrarContinuar(false);
        return;
      }

      /* Final del audio 8: abrir reloj y mostrar continuar. */
      if (tipoAudio === "principal" && audioActual === 8) {
        setMomentoTexto(null);
        setNarradorActivo(false);
        setTipoAudio("espera");
        setObjetoVisible(null);
        setObjetoDescubierto(null);
        setObjetoPulsando(null);
        setObjetoActivo(null);
        setRelojAbierto(true);
        setMostrarContinuar(true);
      }
    };

    /* Clic en el reloj cerrado: reproduce el audio 8. */
    const activarReloj = () => {
      if (relojAudioIniciadoRef.current) return;
      if (tipoAudio !== "espera" || narradorActivo) return;

      relojAudioIniciadoRef.current = true;

      reproducirAudio(
        audiosEscena2[8],
        8,
        "principal",
        null,
        8
      );
    };

    /* Clic en un objeto de la búsqueda. */
    const reproducirObjeto = (objeto) => {
      const configuracion = {
        platon: {
          audio: audiosEscena2[2],
          numero: 2,
          momento: 2,
        },
        pergamino: {
          audio: audiosEscena2[4],
          numero: 4,
          momento: 4,
        },
        copa: {
          audio: audiosEscena2[6],
          numero: 6,
          momento: 6,
        },
      }[objeto];

      if (!configuracion) return;

      if (busquedaTimerRef.current) {
        clearTimeout(busquedaTimerRef.current);
        busquedaTimerRef.current = null;
      }

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

    /* Cerrar el modal no vuelve a activar la expresión. */
    const cerrarModal = () => {
      const objetoCerrado = objetoActivo;
      setObjetoActivo(null);

      if (objetoCerrado && objetoCerrado !== "reloj") {
        setObjetoPulsando(objetoCerrado);
      }
    };

    /* Al continuar, EscenaPortada activa el destello blanco global. */
    const continuarCapitulo3 = () => {
      if (objetosDescubiertos.length < 3) return;

      setMostrarContinuar(false);
      onCapituloDesbloqueado?.(3);
      onEscenaTerminada?.();
    };

    /* Control de narración desde el componente padre. */
    const toggleNarracion = () => {
      const audio = audioRef.current;
      if (!audio || tipoAudio === "espera") return;

      if (!audio.paused) {
        audio.pause();
        setNarradorActivo(false);
        return;
      }

      audio
        .play()
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

    const posicionesActuales =
      POSICIONES_ESCONDITE_ESCENA2[objetoVisible];

    const posicionActual = posicionesActuales?.length
      ? posicionesActuales[
          indiceEscondite % posicionesActuales.length
        ]
      : { left: "50%", top: "50%" };

    const clasesBusqueda = `escena-2-objeto-busqueda ${faseBusqueda} ${
      objetoDescubierto === objetoVisible ? "descubierto" : ""
    } ${
      objetoPulsando === objetoVisible ? "pulsando" : ""
    }`;

    const adrianHabla =
      narradorActivo && tipoAudio !== "espera";

    return (
      <div className="escena-2">
        <div className="escena-2-contenido">
          {/* Fondo de Atenas. */}
          <img
            src="/Escenarios/FondoAtenas.svg"
            alt="Atenas"
            className="escena-2-fondo"
          />

          {/* Árboles y arbustos interactivos. */}
          <div className="escena-2-decoraciones">
            {DECORATIVOS_ESCENA2.map((decorativo) => (
              <button
                key={`${decorativo.id}-${
                  decorativoAnimando === decorativo.id
                    ? versionDecorativo
                    : "quieto"
                }`}
                type="button"
                className={[
                  "escena-2-decorativo-boton",
                  `escena-2-decorativo--${decorativo.tipo}`,
                  decorativoAnimando === decorativo.id ? "animando" : "",
                ].join(" ")}
                style={{
                  left: decorativo.left,
                  top: decorativo.top,
                  width: decorativo.width,
                  height: decorativo.height,
                }}
                onClick={() => animarDecorativo(decorativo.id)}
                aria-label={
                  decorativo.tipo === "arbol"
                    ? "Mover árbol"
                    : "Mover arbusto"
                }
                title="Haz clic para mover"
              >
                <img
                  src={decorativo.src}
                  alt=""
                  aria-hidden="true"
                  draggable="false"
                />
              </button>
            ))}
          </div>

          {/* Libro de Platón. */}
          {objetoVisible === "platon" && (
            <button
              key={`platon-${indiceEscondite}`}
              type="button"
              className={`${clasesBusqueda} escena-2-platon-boton`}
              style={{
                left: posicionActual.left,
                top: posicionActual.top,
              }}
              onClick={() => reproducirObjeto("platon")}
              aria-label="Explorar libro de Platón"
            >
              <img
                src={Es1Platon}
                alt="La República de Platón"
                className="escena-2-platon"
                draggable="false"
              />
            </button>
          )}

          {/* Pergamino de Aristóteles. */}
          {objetoVisible === "pergamino" && (
            <button
              key={`pergamino-${indiceEscondite}`}
              type="button"
              className={`${clasesBusqueda} escena-2-pergamino-boton`}
              style={{
                left: posicionActual.left,
                top: posicionActual.top,
              }}
              onClick={() => reproducirObjeto("pergamino")}
              aria-label="Explorar pergamino"
            >
              <img
                src={Es1Pergamino}
                alt="Pergamino de Aristóteles"
                className="escena-2-pergamino"
                draggable="false"
              />
            </button>
          )}

          {/* Copa relacionada con Sócrates. */}
          {objetoVisible === "copa" && (
            <button
              key={`copa-${indiceEscondite}`}
              type="button"
              className={`${clasesBusqueda} escena-2-copa-boton`}
              style={{
                left: posicionActual.left,
                top: posicionActual.top,
              }}
              onClick={() => reproducirObjeto("copa")}
              aria-label="Explorar copa"
            >
              <img
                src={Es1copa}
                alt="Copa de Sócrates"
                className="escena-2-copa"
                draggable="false"
              />
            </button>
          )}

          {/* Techos: se conservan tus clases y posiciones CSS. */}
          <img
            src="/Escenarios/techo1.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="escena-2-techo escena-2-techo1"
          />
          <img
            src="/Escenarios/techo2.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="escena-2-techo escena-2-techo2"
          />
          <img
            src="/Escenarios/techo3.svg"
            alt=""
            aria-hidden="true"
            draggable="false"
            className="escena-2-techo escena-2-techo3"
          />

          {/* Adrián: sorprendido al entrar, hablando o quieto. */}
          {adrianVisible && (
            <div className="escena-2-adrian-aparicion">
              {mostrarResplandor && (
                <div className="escena-2-resplandor-adrian" />
              )}

              {mostrarAdrianSorprendido ? (
                <img
                  src={ADRIAN_SORPRENDIDO_COMPLETO}
                  alt="Adrián sorprendido en Atenas"
                  className="escena-2-adrian-sorprendido-completo"
                  draggable="false"
                />
              ) : adrianHabla ? (
                <div className="escena-2-adrian-hablando">
                  <Lottie
                    animationData={AdrianHablando}
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              ) : (
                <img
                  src={ADRIAN_QUIETO}
                  alt="Adrián esperando"
                  className="escena-2-adrian-quieto"
                  draggable="false"
                />
              )}
            </div>
          )}

          {/* Expresiones faciales de Adrián. */}
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
              className={[
                "escena-2-expresion",
                `escena-2-expresion--${expresionAdrian.tipo}`,
                `escena-2-expresion--${expresionAdrian.lado}`,
              ].join(" ")}
              draggable="false"
              aria-hidden="true"
            />
          )}

          {/* Subtítulos. */}
          {textoNarracionActivo &&
            momentoTexto !== null &&
            subtitulosEscena2[momentoTexto] && (
              <div
                className="escena-2-subtitulos"
                key={momentoTexto}
              >
                {subtitulosEscena2[momentoTexto]}
              </div>
            )}

          {/* Reloj cerrado: se pulsa para reproducir el audio 8. */}
          {objetoVisible === "reloj" && !relojAbierto && (
            <button
              type="button"
              className="escena-2-reloj"
              onClick={activarReloj}
              disabled={relojAudioIniciadoRef.current}
              aria-label="Activar reloj"
              title="Haz clic para activar el reloj"
            >
              <img
                src={RelojCerrado}
                alt="Reloj cerrado"
                draggable="false"
              />
            </button>
          )}

          {/* Reloj abierto: aparece al terminar el audio 8. */}
          {relojAbierto && (
            <div
              className="escena-2-reloj-abierto"
              aria-hidden="true"
            >
              <img src={RelojAbierto} alt="" draggable="false" />
            </div>
          )}

          {/* El subtítulo final desaparece antes de mostrar continuar. */}
          {mostrarContinuar && (
            <div className="escena-2-continuar-contenedor">
              <div className="escena-2-continuar-texto">
                <span>CONTINUAR AL CAPÍTULO 3</span>
                <button
                  type="button"
                  className="escena-2-continuar-boton"
                  onClick={continuarCapitulo3}
                  disabled={objetosDescubiertos.length < 3}
                >
                  CONTINUAR →
                </button>
              </div>
            </div>
          )}

          {/* Modal de los objetos. */}
          {objetoActivo && (
            <div
              className="escena-2-modal-fondo"
              onClick={cerrarModal}
            >
              <div
                className="escena-2-modal"
                onClick={(evento) => evento.stopPropagation()}
              >
                <div className="escena-2-modal-imagen">
                  {objetoActivo === "platon" && (
                    <img src={Es1Platon} alt="Platón" />
                  )}
                  {objetoActivo === "pergamino" && (
                    <img src={Es1Pergamino} alt="Pergamino" />
                  )}
                  {objetoActivo === "copa" && (
                    <img src={Es1copa} alt="Copa" />
                  )}
                </div>

                <div className="escena-2-modal-info">
                  {objetoActivo === "platon" && (
                    <>
                      <h2>PLATÓN</h2>
                      <p>
                        Platón reflexiona aquí sobre la justicia,
                        la educación y la manera en que debería
                        organizarse una sociedad. Sus ideas generan
                        debates entre quienes buscan comprender
                        cómo debería funcionar nuestra ciudad.
                      </p>
                    </>
                  )}

                  {objetoActivo === "pergamino" && (
                    <>
                      <h2>PERGAMINO</h2>
                      <p>
                        Aristóteles estudia todo lo que despierta
                        su curiosidad: la filosofía, la política,
                        la naturaleza y la lógica. Su objetivo es
                        comprender cómo funciona el mundo, no
                        simplemente aceptar las cosas como son.
                      </p>
                    </>
                  )}

                  {objetoActivo === "copa" && (
                    <>
                      <h2>COPA</h2>
                      <p>
                        Después de ser condenado a muerte en
                        Atenas, Sócrates bebe la cicuta y permanece
                        fiel a sus principios hasta el final.
                        Su historia nos recuerda que cuestionar
                        lo que creemos saber también puede tener
                        consecuencias.
                      </p>
                    </>
                  )}
                </div>

                <button
                  type="button"
                  className="escena-2-modal-cerrar"
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

Escena2.displayName = "Escena2";

export default Escena2;