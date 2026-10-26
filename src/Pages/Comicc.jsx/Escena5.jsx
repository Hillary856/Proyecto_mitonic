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

import Esc5Audio1 from "../../Audios/Esc5Audio1.mp3";
import Esc5Audio2 from "../../Audios/Esc5Audio2.mp3";
import Esc5Audio3 from "../../Audios/Esc5Audio3.mp3";
import Esc5Audio4 from "../../Audios/Esc5Audio4.mp3";
import Esc5Audio5 from "../../Audios/Esc5Audio5.mp3";
import Esc5Audio7 from "../../Audios/Esc5Audio7.mp3";
import Esc5Audio8 from "../../Audios/Esc5Audio8.mp3";
import Esc5Audio9 from "../../Audios/Esc5Audio9.mp3";

import Es5Espada from "../../AssetsNuevos/Es5espada.svg";
import Es5Casco from "../../AssetsNuevos/Es5casco.svg";
import Es5Escudo from "../../AssetsNuevos/Es5Escudo.svg";
import reloj from "../../AssetsNuevos/reloj.svg";
import RelojCerrado from "../../AssetsNuevos/RelojCerrado.svg";

import "./Escenas.css";

const Lottie = lottieReact.default || lottieReact;

const FONDO_ESCENA5 = "/Escenarios/coliseoo.svg";
const ADRIAN_QUIETO = "/Feliz.svg";
const EXPRESION_PENSATIVO = "/pensativoS.svg";
const EXPRESION_FELIZ = "/FelizS.svg";

// Orden de búsqueda: espada → casco → escudo → reloj.
const SIGUIENTE_OBJETO = {
  espada: "casco",
  casco: "escudo",
};

// Posiciones de búsqueda de los objetos.
const POSICIONES_ESCENA5 = {
  espada: [
    { left: "10%", top: "76%" },
    { left: "23%", top: "42%" },
    { left: "85%", top: "77%" },
  ],

  casco: [
    { left: "12%", top: "74%" },
    { left: "22%", top: "44%" },
    { left: "87%", top: "78%" },
  ],

  escudo: [
    { left: "8%", top: "79%" },
    { left: "25%", top: "40%" },
    { left: "82%", top: "80%" },
  ],
};

const Escena5 = forwardRef(
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

    const audiosEscena5 = {
      1: Esc5Audio1,
      2: Esc5Audio2,
      3: Esc5Audio3,
      4: Esc5Audio4,
      5: Esc5Audio5,
      7: Esc5Audio7,
      8: Esc5Audio8,
      9: Esc5Audio9,
    };

    const textosEscena5 = {
      1: "Roma. Estamos en el Coliseo, uno de los lugares donde más personas se reúnen para presenciar espectáculos.",

      2: "Aquí los espectadores vienen a ver combates de gladiadores, enfrentamientos con animales y otros espectáculos.",

      3: "La multitud espera que el espectáculo comience. Para ellos, esto forma parte del entretenimiento de la ciudad.",

      4: "Para mí, sin embargo, hay algo mucho más importante: entender por qué el reloj me ha traído hasta aquí.",

      5: "El gladius romano, fue una de las armas más importantes del ejército romano, especialmente por su tamaño corto y fácil manejo en combates cercanos",

      6: "",

      7: "El casco espartano era una parte fundamental de la protección de los guerreros espartanos. Cubría principalmente la cabeza y ayudaba a protegerlos durante los combates",

      8: "El escudo romano fue un icónico escudo semicilíndrico y rectangular utilizado por los legionarios de la antigua Roma.",

      9: "Roma deja su historia en cada uno de estos objetos.",
    };

    const OBJETOS = {
      espada: {
        imagen: Es5Espada,
        alt: "Gladius romano",
        etiqueta: "Encontrar gladius",
        audio: 5,
        titulo: "GLADIUS",
        texto:
          "El gladius es una espada corta de doble filo. Gracias a su tamaño, los legionarios podían usarla en combates muy cercanos, sin perder el orden de la formación.",
      },

      casco: {
        imagen: Es5Casco,
        alt: "Casco espartano",
        etiqueta: "Encontrar casco",
        audio: 7,
        titulo: "CASCO ESPARTANO",
        texto:
          "Los cascos de bronce de los guerreros griegos, como los espartanos, protegían la cabeza y buena parte del rostro. A cambio, limitaban la visión y el oído.",
      },

      escudo: {
        imagen: Es5Escudo,
        alt: "Escudo romano",
        etiqueta: "Encontrar escudo",
        audio: 8,
        titulo: "ESCUDO ROMANO",
        texto:
          "El escudo de los legionarios era curvo y rectangular, de madera cubierta de cuero. Juntos, los soldados podían formar la famosa «tortuga» para protegerse de los proyectiles.",
      },
    };

    /* =====================================================
       ESTADOS DE ADRIÁN Y DEL AUDIO
    ===================================================== */

    const [adrianHabla, setAdrianHabla] = useState(false);
    const [audioActual, setAudioActual] = useState(1);
    const [tipoAudio, setTipoAudio] = useState("espera");
    const [narradorActivo, setNarradorActivo] = useState(false);

    const [expresionAdrian, setExpresionAdrian] = useState(null);
    const [faseExpresion, setFaseExpresion] = useState("entrada");
    const [versionExpresionAdrian, setVersionExpresionAdrian] =
      useState(0);

    /* =====================================================
       ESTADOS DE LOS OBJETOS INTERACTIVOS
    ===================================================== */

    const [objetoVisible, setObjetoVisible] = useState(null);
    const [objetoDescubierto, setObjetoDescubierto] = useState(null);
    const [objetoPulsando, setObjetoPulsando] = useState(null);
    const [faseBusqueda, setFaseBusqueda] = useState("oculto");
    const [posicionEscondite, setPosicionEscondite] = useState(0);
    const [objetoActivo, setObjetoActivo] = useState(null);
    const [objetoEnAudio, setObjetoEnAudio] = useState(null);
    const [objetosDescubiertos, setObjetosDescubiertos] = useState([]);

    /* =====================================================
       ESTADOS DEL RELOJ Y DE LA CONTINUACIÓN
    ===================================================== */

    const [momentoTexto, setMomentoTexto] = useState(null);
    const [relojVisible, setRelojVisible] = useState(false);
    const [relojDescubierto, setRelojDescubierto] = useState(false);
    const [relojMoviendose, setRelojMoviendose] = useState(false);
    const [relojEnCentro, setRelojEnCentro] = useState(false);
    const [relojAbierto, setRelojAbierto] = useState(false);
    const [mostrarContinuar, setMostrarContinuar] = useState(false);

    const audioRef = useRef(null);
    const escenaIniciadaRef = useRef(false);
    const relojTimerRef = useRef(null);
    const busquedaTimerRef = useRef(null);
    const expresionTimerRef = useRef(null);

    const adrianEstaHablando =
      adrianHabla && narradorActivo && tipoAudio !== "espera";

    useEffect(() => {
      onNarradorEstadoChange?.(narradorActivo);
    }, [narradorActivo, onNarradorEstadoChange]);

    /* Limpieza de los temporizadores y del audio al salir de la escena. */
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

    /* =====================================================
       EXPRESIONES FACIALES: ENTRADA Y SALIDA
    ===================================================== */

    const mostrarExpresion = (tipo, lado = "derecha") => {
      if (expresionTimerRef.current) {
        clearTimeout(expresionTimerRef.current);
        expresionTimerRef.current = null;
      }

      setVersionExpresionAdrian((actual) => actual + 1);
      setFaseExpresion("entrada");
      setExpresionAdrian({ tipo, lado });

      // Espera mientras la expresión permanece visible.
      // Después cambia a la fase de salida.
      expresionTimerRef.current = setTimeout(() => {
        setFaseExpresion("salida");
      }, 2100);
    };

    const manejarFinAnimacionExpresion = (evento) => {
      if (evento.target !== evento.currentTarget) return;

      if (evento.animationName !== "salidaExpresionEscena5") {
        return;
      }

      if (expresionTimerRef.current) {
        clearTimeout(expresionTimerRef.current);
        expresionTimerRef.current = null;
      }

      // Desmontar la expresión únicamente cuando terminó su salida.
      setExpresionAdrian(null);
      setFaseExpresion("entrada");
    };

    /* =====================================================
       REPRODUCCIÓN DE AUDIO
    ===================================================== */

    const reproducirAudio = (audio, numero, tipo) => {
      const reproductor = audioRef.current;

      if (!reproductor || !audio) return;

      console.log(`Escena 5 → audio ${numero} (${tipo})`);

      reproductor.pause();
      reproductor.src = audio;
      reproductor.load();
      reproductor.currentTime = 0;

      setAudioActual(numero);
      setTipoAudio(tipo);
      setNarradorActivo(true);

      reproductor.play().catch((error) => {
        console.error(
          "No se pudo reproducir el audio de Escena 5:",
          error
        );

        setNarradorActivo(false);
      });
    };

    /* =====================================================
       APARICIÓN Y DESAPARICIÓN DE LOS OBJETOS
    ===================================================== */

    useEffect(() => {
      const objeto = objetoVisible;
      const objetoYaEncontrado = objetoDescubierto === objeto;

      if (!objeto || objetoYaEncontrado || objetoActivo) {
        if (busquedaTimerRef.current) {
          clearTimeout(busquedaTimerRef.current);
          busquedaTimerRef.current = null;
        }

        return undefined;
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

    const manejarAnimacionBusqueda = (evento) => {
      if (evento.target !== evento.currentTarget) return;

      if (evento.animationName === "entradaEsconditeEscena5") {
        setFaseBusqueda("visible");
        return;
      }

      if (evento.animationName === "salidaEsconditeEscena5") {
        const posiciones = POSICIONES_ESCENA5[objetoVisible];

        if (posiciones?.length) {
          setPosicionEscondite(
            (actual) => (actual + 1) % posiciones.length
          );
        }

        setFaseBusqueda("oculto");
      }
    };

    const registrarObjetoEncontrado = (objeto) => {
      if (objetosDescubiertos.includes(objeto)) return;

      const nuevosObjetos = [...objetosDescubiertos, objeto];
      setObjetosDescubiertos(nuevosObjetos);

      if (nuevosObjetos.length === 3 && onObjetosEncontrados) {
        onObjetosEncontrados(6);
      }
    };

    /* =====================================================
       ENTRADA DE ADRIÁN
    ===================================================== */

    const terminarCaminata = (evento) => {
      if (evento.target !== evento.currentTarget) return;

      if (evento.animationName !== "entradaAdrianEscena5") return;
      if (escenaIniciadaRef.current) return;

      escenaIniciadaRef.current = true;

      setAdrianHabla(true);
      setMomentoTexto(1);
      reproducirAudio(audiosEscena5[1], 1, "principal");
    };

    /* =====================================================
       MOVIMIENTO Y APERTURA DEL RELOJ
    ===================================================== */

    const iniciarMovimientoReloj = () => {
      if (relojTimerRef.current) {
        clearTimeout(relojTimerRef.current);
        relojTimerRef.current = null;
      }

      // El reloj comienza cerca de Adrián y viaja hacia arriba.
      setRelojDescubierto(false);
      setRelojEnCentro(false);
      setRelojMoviendose(true);
    };

    const manejarAnimacionReloj = (evento) => {
      if (evento.target !== evento.currentTarget) return;

      // Solo reaccionar al final de la trayectoria del reloj.
      if (evento.animationName !== "moverRelojCentroEscena5") {
        return;
      }

      setRelojMoviendose(false);
      setRelojEnCentro(true);

      // El reloj permanece un instante en su destino antes de abrirse.
      if (relojTimerRef.current) {
        clearTimeout(relojTimerRef.current);
      }

      relojTimerRef.current = setTimeout(() => {
        setRelojEnCentro(false);
        setRelojAbierto(true);

        setMomentoTexto(null);
        setTipoAudio("espera");
        setNarradorActivo(false);

        relojTimerRef.current = null;
      }, 700);
    };

    const manejarFinAnimacionRelojAbierto = (evento) => {
      if (evento.target !== evento.currentTarget) return;

      // El botón aparece después de terminar la animación de apertura.
      if (evento.animationName !== "abrirRelojEscena5") {
        return;
      }

      setMostrarContinuar(true);
    };

    /* =====================================================
       FINALIZACIÓN DE LOS AUDIOS
    ===================================================== */

    const manejarFinAudio = () => {
      if (tipoAudio === "objeto") {
        // El audio del reloj termina y comienza su traslado.
        if (objetoEnAudio === "reloj") {
          setObjetoEnAudio(null);
          setMomentoTexto(null);
          setTipoAudio("espera");
          setNarradorActivo(false);

          mostrarExpresion("pensativo", "derecha");
          iniciarMovimientoReloj();

          return;
        }

        const objetoTerminado = objetoEnAudio;
        const siguiente = SIGUIENTE_OBJETO[objetoTerminado];

        setObjetoActivo(null);
        setObjetoEnAudio(null);
        setObjetoPulsando(null);
        setObjetoDescubierto(null);

        if (objetoTerminado === "escudo") {
          mostrarExpresion("feliz", "derecha");
        } else {
          mostrarExpresion(
            "pensativo",
            objetoTerminado === "espada" ? "izquierda" : "derecha"
          );
        }

        // Continuar con el siguiente objeto.
        if (siguiente) {
          setObjetoVisible(siguiente);
          setPosicionEscondite(0);
          setFaseBusqueda("entrada");
          setMomentoTexto(null);
          setTipoAudio("espera");
          setNarradorActivo(false);

          return;
        }

        // Los tres objetos ya fueron encontrados: habilitar el reloj.
        setObjetoVisible(null);
        setFaseBusqueda("oculto");
        setPosicionEscondite(0);
        setMomentoTexto(null);
        setTipoAudio("espera");
        setNarradorActivo(false);
        setRelojVisible(true);

        return;
      }

      // Secuencia de introducción: audios 1 → 2 → 3 → 4.
      if (audioActual === 1) {
        setMomentoTexto(2);
        reproducirAudio(audiosEscena5[2], 2, "principal");
        return;
      }

      if (audioActual === 2) {
        setMomentoTexto(3);
        reproducirAudio(audiosEscena5[3], 3, "principal");
        return;
      }

      if (audioActual === 3) {
        setMomentoTexto(4);
        reproducirAudio(audiosEscena5[4], 4, "principal");
        return;
      }

      // Al acabar la introducción, aparece la expresión y se busca la espada.
      if (audioActual === 4) {
        mostrarExpresion("pensativo", "derecha");

        setObjetoVisible("espada");
        setObjetoDescubierto(null);
        setObjetoPulsando(null);
        setPosicionEscondite(0);
        setFaseBusqueda("entrada");
        setTipoAudio("espera");
        setNarradorActivo(false);
        setMomentoTexto(null);
      }
    };

    /* =====================================================
       CLIC EN OBJETOS Y RELOJ
    ===================================================== */

    const reproducirObjeto = (objeto) => {
      if (objeto === "reloj") {
        setRelojDescubierto(true);
        setObjetoPulsando(null);
        setObjetoEnAudio("reloj");
        setMomentoTexto(9);

        reproducirAudio(audiosEscena5[9], 9, "objeto");
        return;
      }

      const configuracion = OBJETOS[objeto];
      if (!configuracion) return;

      if (busquedaTimerRef.current) {
        clearTimeout(busquedaTimerRef.current);
        busquedaTimerRef.current = null;
      }

      setFaseBusqueda("visible");
      registrarObjetoEncontrado(objeto);

      setObjetoDescubierto(objeto);
      setObjetoActivo(objeto);
      setObjetoPulsando(null);
      setObjetoEnAudio(objeto);
      setMomentoTexto(configuracion.audio);

      reproducirAudio(
        audiosEscena5[configuracion.audio],
        configuracion.audio,
        "objeto"
      );
    };

    const continuarCapitulo6 = () => {
      if (objetosDescubiertos.length < 3) return;

      onCapituloDesbloqueado?.(6);
      onEscenaTerminada?.();
    };

    /* =====================================================
       CONTROL DEL NARRADOR
    ===================================================== */

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

    const cerrarModal = () => {
      const objetoModal = objetoActivo;
      setObjetoActivo(null);

      if (objetoModal) {
        setObjetoPulsando(objetoModal);
      }
    };

    const posicionesActuales = POSICIONES_ESCENA5[objetoVisible];

    const posicionActual = posicionesActuales?.length
      ? posicionesActuales[
          posicionEscondite % posicionesActuales.length
        ]
      : { left: "50%", top: "65%" };

    /* =====================================================
       RENDER
    ===================================================== */

    return (
      <div className="escena-5">
        <div className="escena-5-contenido">
          {/* Fondo del Coliseo */}
          <img
            src={FONDO_ESCENA5}
            alt="Coliseo romano"
            className="escena-5-fondo"
          />

          {/* Objetos interactivos bajo los elementos frontales */}
          {objetoVisible && OBJETOS[objetoVisible] && (
            <button
              type="button"
              className={`escena-5-objeto-boton fase-${faseBusqueda} ${
                objetoDescubierto === objetoVisible ? "descubierto" : ""
              } ${
                objetoPulsando === objetoVisible ? "pulsando" : ""
              }`}
              data-objeto={objetoVisible}
              style={{
                left: posicionActual.left,
                top: posicionActual.top,
              }}
              onClick={() => reproducirObjeto(objetoVisible)}
              onAnimationEnd={manejarAnimacionBusqueda}
              aria-label={OBJETOS[objetoVisible].etiqueta}
            >
              <img
                src={OBJETOS[objetoVisible].imagen}
                alt={OBJETOS[objetoVisible].alt}
                draggable="false"
              />
            </button>
          )}

          {/* Piezas del primer plano */}
          <div
            className="escena-5-elementos-frontales"
            aria-hidden="true"
          >
            <img
              src="/Escenarios/arbolColiseo.svg"
              alt=""
              className="escena-5-pieza-frontal escena-5-arbol-coliseo"
              draggable="false"
            />

            <img
              src="/Escenarios/arbustoColiseo.svg"
              alt=""
              className="escena-5-pieza-frontal escena-5-arbusto-coliseo"
              draggable="false"
            />

            <img
              src="/Escenarios/bloqueColiseo.svg"
              alt=""
              className="escena-5-pieza-frontal escena-5-bloque-coliseo"
              draggable="false"
            />
          </div>

          {/* Adrián caminando al entrar */}
          {!adrianHabla && (
            <div
              className="escena-5-adrian-prueba"
              onAnimationEnd={terminarCaminata}
            >
              <Lottie
                animationData={animacionAdrian}
                loop
                autoplay
              />
            </div>
          )}

          {/* Adrián hablando o quieto */}
          {adrianHabla &&
            (adrianEstaHablando ? (
              <div className="escena-5-adrian-hablando">
                <Lottie
                  animationData={AdrianHablando}
                  loop
                  autoplay
                />
              </div>
            ) : (
              <img
                src={ADRIAN_QUIETO}
                alt="Adrián esperando"
                className="escena-5-adrian-quieto"
                draggable="false"
              />
            ))}

          {/* Expresiones faciales con entrada y salida separadas */}
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
              className={`escena-5-expresion escena-5-expresion--${expresionAdrian.tipo} escena-5-expresion--${expresionAdrian.lado} ${
                faseExpresion === "salida" ? "saliendo" : "entrando"
              }`}
              onAnimationEnd={manejarFinAnimacionExpresion}
              draggable="false"
              aria-hidden="true"
              onError={(evento) => {
                console.error(
                  "No se pudo cargar el SVG de expresión de Adrián:",
                  evento.currentTarget.src
                );
              }}
            />
          )}

          {/* Audio de la escena */}
          <audio
            ref={audioRef}
            onEnded={manejarFinAudio}
            preload="auto"
          />

          {/* Subtítulos */}
          {textoNarracionActivo &&
            momentoTexto !== null &&
            textosEscena5[momentoTexto] && (
              <div
                className="escena-5-texto-narracion"
                key={momentoTexto}
              >
                {textosEscena5[momentoTexto]}
              </div>
            )}

          {/* Reloj cerrado: parpadea hasta que se toca */}
          {relojVisible && !relojAbierto && (
            <button
              type="button"
              className={`escena-5-reloj-boton ${
                relojMoviendose ? "moviendose" : ""
              } ${
                relojEnCentro ? "en-centro" : ""
              } ${
                relojDescubierto ? "descubierto" : ""
              }`}
              onClick={() => reproducirObjeto("reloj")}
              onAnimationEnd={manejarAnimacionReloj}
              aria-label="Activar reloj"
            >
              <img
                src={RelojCerrado}
                alt="Reloj cerrado"
                className="escena-5-reloj-cerrado"
                draggable="false"
              />
            </button>
          )}

          {/* Reloj abierto */}
          {relojAbierto && (
            <div
              className="escena-5-reloj-abierto"
              onAnimationEnd={manejarFinAnimacionRelojAbierto}
            >
              <img
                src={reloj}
                alt="Reloj abierto"
                className="escena-5-reloj"
                draggable="false"
              />
            </div>
          )}

          {/* Continuar al capítulo 6: aparece después de abrirse el reloj */}
          {mostrarContinuar && (
            <div className="escena-5-continuar-contenedor">
              <div className="escena-5-continuar-texto">
                <span>CONTINUAR AL CAPÍTULO 6</span>
                <button
                  type="button"
                  className="escena-5-continuar-boton"
                  onClick={continuarCapitulo6}
                  disabled={objetosDescubiertos.length < 3}
                >
                  CONTINUAR →
                </button>
              </div>
            </div>
          )}

          {/* Modal de información */}
          {objetoActivo && OBJETOS[objetoActivo] && (
            <div
              className="escena-5-modal-fondo"
              onClick={cerrarModal}
            >
              <div
                className="escena-5-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="escena-5-modal-titulo"
                onClick={(evento) => evento.stopPropagation()}
              >
                <div className="escena-5-modal-imagen">
                  <img
                    src={OBJETOS[objetoActivo].imagen}
                    alt={OBJETOS[objetoActivo].alt}
                    draggable="false"
                  />
                </div>

                <div className="escena-5-modal-info">
                  <h2 id="escena-5-modal-titulo">
                    {OBJETOS[objetoActivo].titulo}
                  </h2>
                  <p>{OBJETOS[objetoActivo].texto}</p>
                </div>

                <button
                  type="button"
                  className="escena-5-modal-cerrar"
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

Escena5.displayName = "Escena5";

export default Escena5;