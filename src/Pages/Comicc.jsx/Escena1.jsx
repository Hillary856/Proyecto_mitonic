import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

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

import Esc1Audio1 from "../../Audios/Esc1Audio1.mp3";
import Esc1Audio2 from "../../Audios/Esc1Audio2.mp3";
import Esc1Audio3 from "../../Audios/Esc1Audio3.mp3";
import Esc1Audio4 from "../../Audios/Esc1Audio4.mp3";
import Esc1Audio5 from "../../Audios/Esc1Audio5.mp3";
import Esc1Audio6 from "../../Audios/Esc1Audio6.mp3";
import Esc1Audio7 from "../../Audios/Esc1Audio7.mp3";
import Esc1Audio8 from "../../Audios/Esc1Audio8.mp3";

import Es1Moneda from "../../AssetsNuevos/Es1Moneda.svg";
import Es1Jarron from "../../AssetsNuevos/Es1Jarron.svg";
import Es1Lanza from "../../AssetsNuevos/Es1Lanza.svg";
import reloj from "../../AssetsNuevos/reloj.svg";
import RelojCerrado from "../../AssetsNuevos/RelojCerrado.svg";

import "./Escenas.css";

const Lottie = lottieReact.default;

/* Expresiones faciales ubicadas en public/. */
const EXPRESION_SORPRENDIDO = "/SorprendidoS.svg";
const EXPRESION_PENSATIVO = "/pensativoS.svg";
const ADRIAN_QUIETO = "/Feliz.svg";

/* Posiciones de escondite de los objetos. */
const POSICIONES_ESCONDITES_ESCENA1 = {
  moneda: [
    { left: "8.5%", top: "62%" },
    { left: "24%", top: "68%" },
    { left: "90%", top: "62%" },
  ],

  jarron: [
    { left: "92%", top: "60%" },
    { left: "11%", top: "63%" },
    { left: "24%", top: "69%" },
    { left: "65%", top: "65%" },
  ],

  lanza: [
    { left: "8%", top: "65%" },
    { left: "25%", top: "65%" },
    { left: "88%", top: "59%" },
  ],
};

const Escena1 = forwardRef(
  (
    {
      textoNarracionActivo = true,
      onNarradorEstadoChange,
      onEscenaTerminada,
      onObjetosEncontrados,
      onCapituloDesbloqueado,
    },
    ref
  ) => {
    /* Preparar las imágenes de Adrián caminando. */
    const imagenesAdrian = [
      img0,
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
    ];

    const animacionAdrian = {
      ...CicloAdrianBody,
      assets: CicloAdrianBody.assets.map((asset, index) => ({
        ...asset,
        u: "",
        p: imagenesAdrian[index] || asset.p,
      })),
    };

    /* Audios de la escena. */
    const audiosEscena1 = {
      1: Esc1Audio1,
      2: Esc1Audio2,
      3: Esc1Audio3,
      4: Esc1Audio4,
      5: Esc1Audio5,
      6: Esc1Audio6,
      7: Esc1Audio7,
      8: Esc1Audio8,
    };

    /* Subtítulos originales. */
    const textosEscena1 = {
      1: "Un nuevo día de investigación. Nunca sé qué voy a encontrar cuando entro en una cueva como esta... y eso es justamente lo que hace interesante mi trabajo.",
      2: "Por lo que puedo ver, este lugar lleva bastante tiempo sin ser explorado. Quizás todavía quede algo entre estos escombros.",
      3: "Ve una moneda. Parece bastante antigua. Además, sus figuras y símbolos nos hablan de nuestras creencias, nuestros dioses y hasta de la identidad de nuestras ciudades.",
      4: "",
      5: "Y aquí tenemos un jarrón. Aunque parece un objeto cotidiano, estos jarrones pueden contar muchísimo sobre nosotros. A veces, para conocer una época, no hace falta encontrar un gran tesoro. Un objeto como este puede contar una historia completa.",
      6: "Una lanza. Esta sí es fácil de reconocer.",
      7: "",
      8: "",
    };

    /* Estados de caminata y narración. */
    const [caminataTerminada, setCaminataTerminada] = useState(false);
    const [audio1Terminado, setAudio1Terminado] = useState(false);
    const [audioActual, setAudioActual] = useState(1);
    const [tipoAudio, setTipoAudio] = useState("principal");
    const [narradorActivo, setNarradorActivo] = useState(true);


    /*
     * Adrián habla solo mientras hay narración activa.
     * Si el audio termina o queda en espera, se muestra feliz.svg.
     * Durante la entrada inicial prevalece la animación de caminar.
     */
    const adrianEstaHablando =
      caminataTerminada &&
      narradorActivo &&
      tipoAudio !== "espera";

    const adrianEstaQuieto =
      caminataTerminada && !adrianEstaHablando;

    /* Estados de objetos y búsqueda. */
    const [objetoVisible, setObjetoVisible] = useState(null);
    const [objetoDescubierto, setObjetoDescubierto] = useState(null);
    const [objetoPulsando, setObjetoPulsando] = useState(null);
    const [faseBusqueda, setFaseBusqueda] = useState("oculto");
    const [posicionEscondite, setPosicionEscondite] = useState(0);
    const [objetoActivo, setObjetoActivo] = useState(null);
    const [objetoEnAudio, setObjetoEnAudio] = useState(null);
    const [objetosDescubiertos, setObjetosDescubiertos] = useState([]);

    /* Estados del texto, reloj y botón continuar. */
    const [momentoTexto, setMomentoTexto] = useState(1);
    const [relojVisible, setRelojVisible] = useState(false);
    const [relojDescubierto, setRelojDescubierto] = useState(false);
    const [relojMoviendose, setRelojMoviendose] = useState(false);
    const [relojEnCentro, setRelojEnCentro] = useState(false);
    const [relojAbierto, setRelojAbierto] = useState(false);
    const [mostrarContinuar, setMostrarContinuar] = useState(false);
    const [fuegoActivacion, setFuegoActivacion] = useState(0);

    /* Estado para mostrar expresiones temporales. */
    const [expresionRostro, setExpresionRostro] = useState(null);
    const [versionExpresion, setVersionExpresion] = useState(0);

    /* Referencias de audio y temporizadores. */
    const audioRef = useRef(null);
    const escenaIniciadaRef = useRef(false);
    const audio2IniciadoRef = useRef(false);
    const relojTimerRef = useRef(null);
    const busquedaTimerRef = useRef(null);
    const expresionTimerRef = useRef(null);

    /*
     * Garantiza que un mismo objeto no genere dos expresiones
     * al cerrarse el modal y terminar el audio.
     */
    const expresionObjetoRef = useRef({
      objeto: null,
      disparada: false,
    });

    /* Comunicar el estado del narrador al componente padre. */
    useEffect(() => {
      if (onNarradorEstadoChange) {
        onNarradorEstadoChange(narradorActivo);
      }
    }, [narradorActivo, onNarradorEstadoChange]);

    /* Mostrar expresión con animación reiniciable. */
    const mostrarExpresion = (tipo, lado = "derecha") => {
      if (expresionTimerRef.current) {
        clearTimeout(expresionTimerRef.current);
      }

      setVersionExpresion((actual) => actual + 1);
      setExpresionRostro({ tipo, lado });

      expresionTimerRef.current = setTimeout(() => {
        setExpresionRostro(null);
        expresionTimerRef.current = null;
      }, 4400);
    };

    /* Seleccionar expresión según el objeto descubierto. */
    const mostrarExpresionObjeto = (objeto) => {
      const registro = expresionObjetoRef.current;

      if (
        registro.objeto !== objeto ||
        registro.disparada
      ) {
        return;
      }

      registro.disparada = true;

      if (objeto === "moneda") {
        mostrarExpresion("sorprendido", "derecha");
      } else if (objeto === "jarron") {
        mostrarExpresion("pensativo", "izquierda");
      } else if (objeto === "lanza") {
        mostrarExpresion("sorprendido", "derecha");
      }
    };

    /* Limpiar audio y temporizadores al abandonar la escena. */
    useEffect(() => {
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        if (relojTimerRef.current) {
          clearTimeout(relojTimerRef.current);
        }

        if (busquedaTimerRef.current) {
          clearTimeout(busquedaTimerRef.current);
        }

        if (expresionTimerRef.current) {
          clearTimeout(expresionTimerRef.current);
        }
      };
    }, []);

    /* Reproducir audio. */
    const reproducirAudio = (audio, numero, tipo) => {
      const reproductor = audioRef.current;

      if (!reproductor || !audio) return;

      reproductor.pause();
      reproductor.src = audio;
      reproductor.load();
      reproductor.currentTime = 0;

      setAudioActual(numero);
      setTipoAudio(tipo);
      setNarradorActivo(true);

      reproductor.play().catch((error) => {
        console.error(
          "No se pudo reproducir el audio de Escena 1:",
          error
        );
      });
    };

    /* Iniciar el audio 1 una sola vez. */
    useEffect(() => {
      if (escenaIniciadaRef.current) return;

      escenaIniciadaRef.current = true;
      reproducirAudio(audiosEscena1[1], 1, "principal");
    }, []);

    /* El audio 2 espera al audio 1 y a la caminata. */
    useEffect(() => {
      if (
        !caminataTerminada ||
        !audio1Terminado ||
        audio2IniciadoRef.current
      ) {
        return;
      }

      audio2IniciadoRef.current = true;
      setAudio1Terminado(false);
      setMomentoTexto(2);
      reproducirAudio(audiosEscena1[2], 2, "principal");
    }, [caminataTerminada, audio1Terminado]);

    /* Búsqueda de objetos. Se mueven únicamente cuando están ocultos. */
    useEffect(() => {
      const objeto = objetoVisible;
      const objetoYaEncontrado = objetoDescubierto === objeto;

      if (
        !objeto ||
        objeto === "reloj" ||
        objetoYaEncontrado ||
        objetoActivo
      ) {
        if (busquedaTimerRef.current) {
          clearTimeout(busquedaTimerRef.current);
          busquedaTimerRef.current = null;
        }

        return;
      }

      if (faseBusqueda === "visible") {
        busquedaTimerRef.current = setTimeout(() => {
          setFaseBusqueda("salida");
        }, 750);
      } else if (faseBusqueda === "oculto") {
        busquedaTimerRef.current = setTimeout(() => {
          setFaseBusqueda("entrada");
        }, 120);
      }

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

    /* Fin de la animación de búsqueda. */
    const manejarAnimacionBusqueda = (evento) => {
      if (evento.target !== evento.currentTarget) return;

      if (evento.animationName === "entradaEsconditeEscena1") {
        setFaseBusqueda("visible");
        return;
      }

      if (evento.animationName === "salidaEsconditeEscena1") {
        const posiciones =
          POSICIONES_ESCONDITES_ESCENA1[objetoVisible];

        if (posiciones?.length) {
          setPosicionEscondite(
            (actual) => (actual + 1) % posiciones.length
          );
        }

        setFaseBusqueda("oculto");
      }
    };

    /* Registrar objetos encontrados. */
    const registrarObjetoEncontrado = (objeto) => {
      if (objetosDescubiertos.includes(objeto)) return;

      const nuevosObjetos = [...objetosDescubiertos, objeto];
      setObjetosDescubiertos(nuevosObjetos);

      if (
        nuevosObjetos.length === 3 &&
        onObjetosEncontrados
      ) {
        onObjetosEncontrados(2);
      }
    };

    /* Fin de la caminata inicial. */
    const terminarCaminata = (evento) => {
      if (
        evento?.animationName &&
        evento.animationName !== "entradaAdrian"
      ) {
        return;
      }

      setCaminataTerminada(true);
    };

    /* Movimiento del reloj, apertura y narración final. */
    const iniciarMovimientoReloj = () => {
      setRelojMoviendose(true);

      relojTimerRef.current = setTimeout(() => {
        setRelojMoviendose(false);
        setRelojEnCentro(true);

        relojTimerRef.current = setTimeout(() => {
          setRelojEnCentro(false);
          setRelojAbierto(true);
          setMostrarContinuar(true);

          /* La sorpresa aparece desde el lado izquierdo. */
          mostrarExpresion("sorprendido", "izquierda");

          reproducirAudio(audiosEscena1[8], 8, "principal");
        }, 1800);
      }, 1400);
    };

    /* Gestionar el final de cada audio. */
    const manejarFinAudio = () => {
      if (tipoAudio === "objeto") {
        if (objetoEnAudio === "moneda") {
          mostrarExpresionObjeto("moneda");

          setObjetoActivo(null);
          setObjetoEnAudio(null);
          setObjetoPulsando("moneda");
          setMomentoTexto(4);

          reproducirAudio(audiosEscena1[4], 4, "principal");
          return;
        }

        if (objetoEnAudio === "jarron") {
          mostrarExpresionObjeto("jarron");

          setObjetoActivo(null);
          setObjetoEnAudio(null);
          setObjetoPulsando(null);

          setObjetoVisible("lanza");
          setObjetoDescubierto(null);
          setPosicionEscondite(0);
          setFaseBusqueda("entrada");
          setMomentoTexto(null);
          setTipoAudio("espera");
          setNarradorActivo(false);
          return;
        }

        if (objetoEnAudio === "lanza") {
          mostrarExpresionObjeto("lanza");

          setObjetoActivo(null);
          setObjetoEnAudio(null);
          setObjetoPulsando(null);

          setObjetoVisible(null);
          setObjetoDescubierto(null);
          setFaseBusqueda("oculto");
          setPosicionEscondite(0);
          setMomentoTexto(null);
          setTipoAudio("espera");
          setNarradorActivo(false);
          setRelojVisible(true);
          return;
        }

        if (objetoEnAudio === "reloj") {
          setObjetoEnAudio(null);
          setMomentoTexto(null);
          setTipoAudio("espera");
          setNarradorActivo(false);
          iniciarMovimientoReloj();
          return;
        }
      }

      if (audioActual === 1) {
        setAudio1Terminado(true);
        setNarradorActivo(false);
        return;
      }

      if (audioActual === 2) {
        setObjetoVisible("moneda");
        setObjetoDescubierto(null);
        setObjetoPulsando(null);
        setPosicionEscondite(0);
        setFaseBusqueda("entrada");
        setTipoAudio("espera");
        setNarradorActivo(false);
        setMomentoTexto(null);
        return;
      }

      if (audioActual === 4) {
        setObjetoVisible("jarron");
        setObjetoDescubierto(null);
        setObjetoPulsando(null);
        setPosicionEscondite(0);
        setFaseBusqueda("entrada");
        setTipoAudio("espera");
        setNarradorActivo(false);
        setMomentoTexto(null);
        return;
      }

      if (audioActual === 8) {
        setTipoAudio("espera");
        setNarradorActivo(false);
      }
    };

    /* Clic en los objetos. */
    const reproducirObjeto = (objeto) => {
      const audiosObjeto = {
        moneda: {
          audio: audiosEscena1[3],
          numero: 3,
          momento: 3,
        },
        jarron: {
          audio: audiosEscena1[5],
          numero: 5,
          momento: 5,
        },
        lanza: {
          audio: audiosEscena1[6],
          numero: 6,
          momento: 6,
        },
        reloj: {
          audio: audiosEscena1[7],
          numero: 7,
          momento: 7,
        },
      };

      const configuracion = audiosObjeto[objeto];
      if (!configuracion) return;

      if (objeto !== "reloj") {
        if (busquedaTimerRef.current) {
          clearTimeout(busquedaTimerRef.current);
          busquedaTimerRef.current = null;
        }

        setFaseBusqueda("visible");
        registrarObjetoEncontrado(objeto);
        setObjetoDescubierto(objeto);
        setObjetoActivo(objeto);

        /* La expresión se prepara para este descubrimiento. */
        expresionObjetoRef.current = {
          objeto,
          disparada: false,
        };
      } else {
        setRelojDescubierto(true);
      }

      setObjetoPulsando(null);
      setObjetoEnAudio(objeto);
      setMomentoTexto(configuracion.momento);

      reproducirAudio(
        configuracion.audio,
        configuracion.numero,
        "objeto"
      );
    };

    /* Continuar al capítulo 2. */
    const continuarCapitulo2 = () => {
      if (objetosDescubiertos.length < 3) return;

      if (onCapituloDesbloqueado) {
        onCapituloDesbloqueado(2);
      }

      if (onEscenaTerminada) {
        onEscenaTerminada();
      }
    };

    /* Control del narrador desde el componente padre. */
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

    useImperativeHandle(ref, () => ({ toggleNarracion }));

    /* Cerrar modal y mostrar la expresión del objeto encontrado. */
    const cerrarModal = () => {
      const objetoModal = objetoActivo;
      setObjetoActivo(null);

      if (objetoModal && objetoModal !== "reloj") {
        setObjetoPulsando(objetoModal);
        mostrarExpresionObjeto(objetoModal);
      }
    };

    /* Posición actual del objeto escondido. */
    const posicionesActuales =
      POSICIONES_ESCONDITES_ESCENA1[objetoVisible];

    const posicionActual = posicionesActuales?.length
      ? posicionesActuales[
      posicionEscondite % posicionesActuales.length
      ]
      : { left: "50%", top: "60%" };

    return (
      <div className="escena-1">
        <div className="escena-1-contenido">
          {/* Fondo de la cueva. */}
          <img
            src="/Escenarios/FondoCueva.svg"
            alt="Cueva"
            className="escena-1-fondo"
          />

          {/* FUEGO INTERACTIVO */}
          <button
            key={fuegoActivacion}
            type="button"
            className="escena-1-fuego-boton"
            onClick={() =>
              setFuegoActivacion((actual) => actual + 1)
            }
            aria-label="Interactuar con el fuego"
            title="Haz clic en el fuego"
          >
            <img
              src="/Escenarios/fuegoAnto.svg"
              alt=""
              aria-hidden="true"
              draggable="false"
              className={`escena-1-fuego-svg ${fuegoActivacion > 0 ? "activado" : ""
                }`}
            />
          </button>

          {/* Adrián caminando: permanece así durante la entrada. */}
          {!caminataTerminada && (
            <div
              className="escena-1-adrian-prueba"
              onAnimationEnd={terminarCaminata}
            >
              <Lottie
                animationData={animacionAdrian}
                loop
                autoplay
              />
            </div>
          )}

          {/* Adrián hablando: únicamente cuando hay narración activa. */}
          {adrianEstaHablando && (
            <div className="escena-1-adrian-hablando">
              <Lottie
                animationData={AdrianHablando}
                loop
                autoplay
              />
            </div>
          )}

          {/* Adrián quieto: durante la búsqueda y los tiempos de espera. */}
          {adrianEstaQuieto && (
            <img
              src={ADRIAN_QUIETO}
              alt="Adrián esperando"
              className="escena-1-adrian-quieto"
              draggable="false"
            />
          )}

          {/* Audio único de la escena. */}
          <audio
            ref={audioRef}
            onEnded={manejarFinAudio}
            preload="auto"
          />

          {/* Subtítulos. */}
          {textoNarracionActivo &&
            momentoTexto !== null &&
            textosEscena1[momentoTexto] && (
              <div className="escena-1-texto-narracion">
                {textosEscena1[momentoTexto]}
              </div>
            )}

          {/* Moneda. */}
          {objetoVisible === "moneda" && posicionActual && (
            <button
              className={`escena-1-moneda-boton escena-1-objeto-busqueda ${faseBusqueda} ${objetoDescubierto === "moneda" ? "descubierto" : ""
                } ${objetoPulsando === "moneda" ? "pulsando" : ""
                }`}
              style={{
                left: posicionActual.left,
                top: posicionActual.top,
              }}
              onClick={() => reproducirObjeto("moneda")}
              onAnimationEnd={manejarAnimacionBusqueda}
              aria-label="Encontrar moneda"
            >
              <img
                src={Es1Moneda}
                alt="Moneda antigua"
                className="escena-1-moneda"
              />
            </button>
          )}

          {/* Jarrón. */}
          {objetoVisible === "jarron" && posicionActual && (
            <button
              className={`escena-1-jarron-boton escena-1-objeto-busqueda ${faseBusqueda} ${objetoDescubierto === "jarron" ? "descubierto" : ""
                } ${objetoPulsando === "jarron" ? "pulsando" : ""
                }`}
              style={{
                left: posicionActual.left,
                top: posicionActual.top,
              }}
              onClick={() => reproducirObjeto("jarron")}
              onAnimationEnd={manejarAnimacionBusqueda}
              aria-label="Encontrar jarrón"
            >
              <img
                src={Es1Jarron}
                alt="Jarrón antiguo"
                className="escena-1-jarron"
              />
            </button>
          )}

          {/* Lanza. */}
          {objetoVisible === "lanza" && posicionActual && (
            <button
              className={`escena-1-lanza-boton escena-1-objeto-busqueda ${faseBusqueda} ${objetoDescubierto === "lanza" ? "descubierto" : ""
                } ${objetoPulsando === "lanza" ? "pulsando" : ""
                }`}
              style={{
                left: posicionActual.left,
                top: posicionActual.top,
              }}
              onClick={() => reproducirObjeto("lanza")}
              onAnimationEnd={manejarAnimacionBusqueda}
              aria-label="Encontrar lanza"
            >
              <img
                src={Es1Lanza}
                alt="Lanza antigua"
                className="escena-1-lanza"
              />
            </button>
          )}

          {/* Piedras en primer plano. */}
          <img
            src="/Escenarios/ForegroundCueva.svg"
            alt=""
            aria-hidden="true"
            className="escena-1-foreground-cueva"
          />

          {/* Expresión temporal: aparece a un lado de Adrián. */}
          {expresionRostro && (
            <img
              key={versionExpresion}
              src={
                expresionRostro.tipo === "pensativo"
                  ? EXPRESION_PENSATIVO
                  : EXPRESION_SORPRENDIDO
              }
              alt={
                expresionRostro.tipo === "pensativo"
                  ? "Adrián pensativo"
                  : "Adrián sorprendido"
              }
              className={`escena-1-expresion escena-1-expresion--${expresionRostro.tipo} escena-1-expresion--${expresionRostro.lado}`}
              draggable="false"
              aria-hidden="true"
            />
          )}

          {/* Reloj cerrado. */}
          {relojVisible && !relojAbierto && (
            <button
              className={`escena-1-reloj-boton ${relojMoviendose ? "moviendose" : ""
                } ${relojEnCentro ? "en-centro" : ""
                } ${relojDescubierto ? "descubierto" : ""
                }`}
              onClick={() => reproducirObjeto("reloj")}
              aria-label="Activar reloj"
            >
              <img
                src={RelojCerrado}
                alt="Reloj cerrado"
                className="escena-1-reloj-cerrado"
              />
            </button>
          )}

          {/* Reloj abierto, por delante de Adrián y más hacia la derecha. */}
          {relojAbierto && (
            <div className="escena-1-reloj-abierto">
              <img
                src={reloj}
                alt="Reloj abierto"
                className="escena-1-reloj"
              />
            </div>
          )}

          {/* Continuar al capítulo 2. */}
          {mostrarContinuar && (
            <div className="escena-1-continuar-contenedor">
              <div className="escena-1-continuar-texto">
                <span>CONTINUAR AL CAPÍTULO 2</span>

                <button
                  className="escena-1-continuar-boton"
                  onClick={continuarCapitulo2}
                  disabled={objetosDescubiertos.length < 3}
                >
                  CONTINUAR →
                </button>
              </div>
            </div>
          )}

          {/* Modal de información. */}
          {objetoActivo && (
            <div
              className="escena-1-modal-fondo"
              onClick={cerrarModal}
            >
              <div
                className="escena-1-modal"
                onClick={(evento) => evento.stopPropagation()}
              >
                <div
                  className={`escena-1-modal-imagen ${objetoActivo === "lanza"
                      ? "escena-1-modal-imagen--lanza"
                      : ""
                    }`}
                >
                  {objetoActivo === "moneda" && (
                    <img
                      src={Es1Moneda}
                      alt="Moneda antigua"
                    />
                  )}

                  {objetoActivo === "jarron" && (
                    <img
                      src={Es1Jarron}
                      alt="Jarrón antiguo"
                    />
                  )}

                  {objetoActivo === "lanza" && (
                    <img
                      src={Es1Lanza}
                      alt="Lanza antigua"
                    />
                  )}
                </div>

                <div className="escena-1-modal-info">
                  {objetoActivo === "moneda" && (
                    <>
                      <h2>MONEDA</h2>
                      <p>
                        Las monedas son mucho más que una forma de pagar.
                        Gracias a ellas podemos comerciar con mayor facilidad
                        y conocer quién tiene el poder en una determinada época.
                      </p>
                    </>
                  )}

                  {objetoActivo === "jarron" && (
                    <>
                      <h2>JARRÓN</h2>
                      <p>
                        Aunque parece un objeto cotidiano, estos jarrones
                        pueden contar muchísimo sobre nosotros. Podemos
                        encontrar escenas de nuestras costumbres, guerras,
                        creencias y hasta momentos de nuestra vida diaria.
                      </p>
                    </>
                  )}

                  {objetoActivo === "lanza" && (
                    <>
                      <h2>LANZA</h2>
                      <p>
                        Es una de las armas principales de nuestros guerreros.
                        Los hoplitas la utilizan junto con su escudo para
                        enfrentarse al enemigo y proteger su ciudad.
                      </p>
                    </>
                  )}
                </div>

                <button
                  className="escena-1-modal-cerrar"
                  onClick={cerrarModal}
                  aria-label="Cerrar información"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

Escena1.displayName = "Escena1";

export default Escena1;