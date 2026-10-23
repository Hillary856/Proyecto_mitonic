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

/* =====================================================
   ORDEN DE BÚSQUEDA:
   Espada → Casco → Escudo → Reloj.
===================================================== */

const SIGUIENTE_OBJETO = {
  espada: "casco",
  casco: "escudo",
};

/* Posiciones iniciales provisionales de los objetos. */

const POSICIONES_ESCENA5 = {
  espada: [
    { left: "14%", top: "70%" },
    { left: "48%", top: "74%" },
    { left: "84%", top: "68%" },
  ],

  casco: [
    { left: "20%", top: "72%" },
    { left: "56%", top: "70%" },
    { left: "88%", top: "74%" },
  ],

  escudo: [
    { left: "12%", top: "74%" },
    { left: "44%", top: "70%" },
    { left: "80%", top: "72%" },
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
    /* =====================================================
       ANIMACIÓN DE ENTRADA DE ADRIÁN
    ===================================================== */

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

    /* =====================================================
       AUDIOS
       Casco: audio 7.
       Escudo: audio 8.
       Reloj: audio 9.
    ===================================================== */

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

    /* =====================================================
       SUBTÍTULOS
    ===================================================== */

    const textosEscena5 = {
      1: "Roma. Estamos en el Coliseo, uno de los lugares donde más personas se reúnen para presenciar espectáculos.",

      2: "Aquí los espectadores vienen a ver combates de gladiadores, enfrentamientos con animales y otros espectáculos.",

      3: "La multitud espera que el espectáculo comience. Para ellos, esto forma parte del entretenimiento de la ciudad.",

      4: "Para mí, sin embargo, hay algo mucho más importante: entender por qué el reloj me ha traído hasta aquí.",

      5: "El gladius romano es una espada corta de doble filo. Gracias a su tamaño, los legionarios podían usarla en combates muy cercanos, sin perder el orden de la formación.",

      7: "Los cascos de bronce de los guerreros griegos, como los espartanos, protegían la cabeza y buena parte del rostro. A cambio, limitaban la visión y el oído.",

      8: "El escudo de los legionarios era curvo y rectangular, de madera cubierta de cuero. Juntos, los soldados podían formar la famosa «tortuga» para protegerse de los proyectiles.",

      9: "Ya, veamos este objeto. Puede ayudarnos a entender un poco más sobre la vida en Roma.",
    };

    /* =====================================================
       OBJETOS INTERACTIVOS
    ===================================================== */

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
       ESTADOS DE ADRIÁN Y AUDIO
    ===================================================== */

    const [adrianHabla, setAdrianHabla] = useState(false);
    const [audioActual, setAudioActual] = useState(1);
    const [tipoAudio, setTipoAudio] = useState("espera");
    const [narradorActivo, setNarradorActivo] = useState(false);

    const [expresionAdrian, setExpresionAdrian] = useState(null);
    const [versionExpresionAdrian, setVersionExpresionAdrian] =
      useState(0);

    /* =====================================================
       ESTADOS DE LOS OBJETOS
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
       ESTADOS DEL RELOJ Y CONTINUACIÓN
    ===================================================== */

    const [momentoTexto, setMomentoTexto] = useState(null);
    const [relojVisible, setRelojVisible] = useState(false);
    const [relojDescubierto, setRelojDescubierto] = useState(false);
    const [relojMoviendose, setRelojMoviendose] = useState(false);
    const [relojEnCentro, setRelojEnCentro] = useState(false);
    const [relojAbierto, setRelojAbierto] = useState(false);
    const [mostrarContinuar, setMostrarContinuar] = useState(false);

    /* =====================================================
       REFERENCIAS
    ===================================================== */

    const audioRef = useRef(null);
    const escenaIniciadaRef = useRef(false);
    const relojTimerRef = useRef(null);
    const busquedaTimerRef = useRef(null);
    const expresionTimerRef = useRef(null);

    /* Adrián habla mientras hay audio.
       En pausa o espera se muestra su pose quieta. */

    const adrianEstaHablando =
      adrianHabla &&
      narradorActivo &&
      tipoAudio !== "espera";

    useEffect(() => {
      onNarradorEstadoChange?.(narradorActivo);
    }, [narradorActivo, onNarradorEstadoChange]);

    /* Limpiar audio y temporizadores al salir de la escena. */

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
       EXPRESIONES FACIALES
       Solo se activan en momentos concretos.
    ===================================================== */

    const mostrarExpresion = (tipo, lado = "derecha") => {
      if (expresionTimerRef.current) {
        clearTimeout(expresionTimerRef.current);
      }

      setVersionExpresionAdrian((actual) => actual + 1);
      setExpresionAdrian({ tipo, lado });

      expresionTimerRef.current = setTimeout(() => {
        setExpresionAdrian(null);
        expresionTimerRef.current = null;
      }, 2800);
    };

    /* =====================================================
       REPRODUCIR AUDIO
       No activa expresiones automáticamente para evitar
       que se repitan durante toda la narración.
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
          `No se pudo reproducir el audio ${numero} de Escena 5:`,
          error
        );

        setNarradorActivo(false);
      });
    };

    /* =====================================================
       APARICIÓN Y DESAPARICIÓN DE OBJETOS
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

    /* Registrar objetos encontrados una sola vez. */

    const registrarObjetoEncontrado = (objeto) => {
      if (objetosDescubiertos.includes(objeto)) return;

      const nuevosObjetos = [...objetosDescubiertos, objeto];
      setObjetosDescubiertos(nuevosObjetos);

      if (
        nuevosObjetos.length === 3 &&
        onObjetosEncontrados
      ) {
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
      setRelojMoviendose(true);

      relojTimerRef.current = setTimeout(() => {
        setRelojMoviendose(false);
        setRelojEnCentro(true);

        relojTimerRef.current = setTimeout(() => {
          setRelojEnCentro(false);
          setRelojAbierto(true);
          setMostrarContinuar(true);
          setMomentoTexto(null);
          setTipoAudio("espera");
          setNarradorActivo(false);
        }, 1800);
      }, 1400);
    };

    /* =====================================================
       FINAL DE AUDIO
    ===================================================== */

    const manejarFinAudio = () => {
      /* Audios de los objetos y del reloj. */

      if (tipoAudio === "objeto") {
        // Al terminar el audio 9 del reloj, este se mueve y se abre.
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

        // Mostrar expresión después de terminar la explicación.
        if (objetoTerminado === "escudo") {
          mostrarExpresion("feliz", "derecha");
        } else {
          mostrarExpresion(
            "pensativo",
            objetoTerminado === "espada" ? "izquierda" : "derecha"
          );
        }

        if (siguiente) {
          setObjetoVisible(siguiente);
          setPosicionEscondite(0);
          setFaseBusqueda("entrada");
          setMomentoTexto(null);
          setTipoAudio("espera");
          setNarradorActivo(false);

          return;
        }

        // Terminaron espada, casco y escudo: mostrar reloj cerrado.
        // El audio 9 empieza solo al hacer clic en el reloj.
        setObjetoVisible(null);
        setFaseBusqueda("oculto");
        setPosicionEscondite(0);
        setMomentoTexto(null);
        setTipoAudio("espera");
        setNarradorActivo(false);
        setRelojVisible(true);

        return;
      }

      /* Secuencia de introducción: audio 1 → 2 → 3 → 4. */

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

      // Al terminar la introducción, comienza la búsqueda de la espada.
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

    /* =====================================================
       CONTINUAR AL CAPÍTULO 6
    ===================================================== */

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

    /* =====================================================
       CERRAR MODAL
    ===================================================== */

    const cerrarModal = () => {
      const objetoModal = objetoActivo;

      setObjetoActivo(null);

      if (objetoModal) {
        setObjetoPulsando(objetoModal);
      }
    };

    /* =====================================================
       POSICIÓN ACTUAL DEL OBJETO
    ===================================================== */

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

          {/* Objetos interactivos, debajo de las piezas frontales. */}
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

          {/* Piezas frontales del escenario. */}
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

          {/* Adrián hablando o en pose quieta */}
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

          {/* Expresiones faciales de Adrián */}
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
                "escena-5-expresion",
                `escena-5-expresion--${expresionAdrian.tipo}`,
                `escena-5-expresion--${expresionAdrian.lado}`,
              ].join(" ")}
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

          {/* Reloj cerrado */}
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
            <div className="escena-5-reloj-abierto">
              <img
                src={reloj}
                alt="Reloj abierto"
                className="escena-5-reloj"
                draggable="false"
              />
            </div>
          )}

          {/* Continuar al capítulo 6 */}
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