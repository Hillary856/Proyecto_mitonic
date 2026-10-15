import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
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
import "./Escenas.css";

const Lottie = lottieReact.default;

/*
  Cada objeto tiene varios escondites asociados a las piedras.
  El centro del botón usa porcentajes relativos al recuadro de la escena.
  El cambio de posición ocurre únicamente cuando el asset está oculto.
*/
const POSICIONES_ESCONDITES_ESCENA1 = {
  moneda: [
    { left: "9%", top: "64%" },
    { left: "25%", top: "64%" },
    { left: "82%", top: "79%" },
    { left: "7%", top: "62%" },
    { left: "27%", top: "66%" },
    { left: "84%", top: "77%" }
  ],
  jarron: [
    { left: "11%", top: "64%" },
    { left: "24%", top: "66%" },
    { left: "80%", top: "79%" },
    { left: "7%", top: "65%" },
    { left: "27%", top: "62%" },
    { left: "84%", top: "76%" }
  ],
  lanza: [
    { left: "8%", top: "64%" },
    { left: "25%", top: "65%" },
    { left: "83%", top: "80%" },
    { left: "12%", top: "66%" },
    { left: "28%", top: "62%" },
    { left: "79%", top: "77%" }
  ]
};

const Escena1 = forwardRef(
  (
    {
      textoNarracionActivo = true,
      onNarradorEstadoChange,
      onEscenaTerminada,
      onObjetosEncontrados,
      onCapituloDesbloqueado
    },
    ref
  ) => {
    /* =====================================================
       PREPARAR ASSETS DE ADRIÁN CAMINANDO
    ===================================================== */
    const imagenesAdrian = [
      img0,
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7
    ];

    const animacionAdrian = {
      ...CicloAdrianBody,
      assets: CicloAdrianBody.assets.map((asset, index) => ({
        ...asset,
        u: "",
        p: imagenesAdrian[index] || asset.p
      }))
    };

    /* =====================================================
       AUDIOS
    ===================================================== */
    const audiosEscena1 = {
      1: Esc1Audio1,
      2: Esc1Audio2,
      3: Esc1Audio3,
      4: Esc1Audio4,
      5: Esc1Audio5,
      6: Esc1Audio6,
      7: Esc1Audio7,
      8: Esc1Audio8
    };

    /* =====================================================
       SUBTÍTULOS
    ===================================================== */
    const textosEscena1 = {
      1: "Un nuevo día de investigación. Nunca sé qué voy a encontrar cuando entro en una cueva como esta... y eso es justamente lo que hace interesante mi trabajo.",
      2: "Por lo que puedo ver, este lugar lleva bastante tiempo sin ser explorado. Quizás todavía quede algo entre estos escombros.",
      3: "Ve una moneda. Parece bastante antigua. Además, sus figuras y símbolos nos hablan de nuestras creencias, nuestros dioses y hasta de la identidad de nuestras ciudades.",
      4: "",
      5: "Y aquí tenemos un jarrón. Aunque parece un objeto cotidiano, estos jarrones pueden contar muchísimo sobre nosotros. A veces, para conocer una época, no hace falta encontrar un gran tesoro. Un objeto como este puede contar una historia completa.",
      6: "Una lanza. Esta sí es fácil de reconocer.",
      7: "",
      8: ""
    };

    /* =====================================================
       ESTADOS DE ADRIÁN Y AUDIOS
    ===================================================== */
    const [adrianHabla, setAdrianHabla] = useState(false);
    const [caminataTerminada, setCaminataTerminada] = useState(false);
    const [audio1Terminado, setAudio1Terminado] = useState(false);
    const [audioActual, setAudioActual] = useState(1);
    const [tipoAudio, setTipoAudio] = useState("principal");
    const [narradorActivo, setNarradorActivo] = useState(true);

    /* =====================================================
       ESTADOS DE OBJETOS Y BÚSQUEDA
    ===================================================== */
    const [objetoVisible, setObjetoVisible] = useState(null);
    const [objetoDescubierto, setObjetoDescubierto] = useState(null);
    const [objetoPulsando, setObjetoPulsando] = useState(null);
    const [objetoAsomado, setObjetoAsomado] = useState(false);
    const [posicionEscondite, setPosicionEscondite] = useState(0);
    const [objetoActivo, setObjetoActivo] = useState(null);
    const [objetoEnAudio, setObjetoEnAudio] = useState(null);
    const [objetosDescubiertos, setObjetosDescubiertos] = useState([]);

    /* =====================================================
       TEXTO, RELOJ Y CONTINUAR
    ===================================================== */
    const [momentoTexto, setMomentoTexto] = useState(1);
    const [relojVisible, setRelojVisible] = useState(false);
    const [relojDescubierto, setRelojDescubierto] = useState(false);
    const [relojMoviendose, setRelojMoviendose] = useState(false);
    const [relojEnCentro, setRelojEnCentro] = useState(false);
    const [relojAbierto, setRelojAbierto] = useState(false);
    const [mostrarContinuar, setMostrarContinuar] = useState(false);

    /* =====================================================
       REFERENCIAS PARA AUDIO Y TEMPORIZADORES
    ===================================================== */
    const audioRef = useRef(null);
    const escenaIniciadaRef = useRef(false);
    const audio2IniciadoRef = useRef(false);
    const relojTimerRef = useRef(null);
    const busquedaTimerRef = useRef(null);

    /* =====================================================
       AVISAR AL PADRE DEL ESTADO DEL NARRADOR
    ===================================================== */
    useEffect(() => {
      if (onNarradorEstadoChange) {
        onNarradorEstadoChange(narradorActivo);
      }
    }, [narradorActivo, onNarradorEstadoChange]);

    /* =====================================================
       LIMPIAR AUDIO Y TEMPORIZADORES AL SALIR
    ===================================================== */
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
      };
    }, []);

    /* =====================================================
       REPRODUCIR AUDIO
    ===================================================== */
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
        console.error("No se pudo reproducir el audio de Escena 1:", error);
      });
    };

    /* =====================================================
       INICIAR AUDIO 1
    ===================================================== */
    useEffect(() => {
      if (escenaIniciadaRef.current) return;
      escenaIniciadaRef.current = true;
      reproducirAudio(audiosEscena1[1], 1, "principal");
      // Se inicia también la caminata; el audio 2 espera a que terminen ambos.
    }, []);

    /* =====================================================
       COMENZAR AUDIO 2 SOLO CUANDO TERMINARON CAMINATA Y AUDIO 1
       Esto evita que uno se adelante al otro.
    ===================================================== */
    useEffect(() => {
      if (!caminataTerminada || !audio1Terminado || audio2IniciadoRef.current) {
        return;
      }

      audio2IniciadoRef.current = true;
      setAudio1Terminado(false);
      setMomentoTexto(2);
      reproducirAudio(audiosEscena1[2], 2, "principal");
    }, [caminataTerminada, audio1Terminado]);

    /* =====================================================
       BÚSQUEDA DE ASSETS
       Visible: 900 ms. Oculto: 260 ms. Solo cambia de sitio oculto.
    ===================================================== */
    useEffect(() => {
      const objeto = objetoVisible;
      const objetoYaEncontrado = objetoDescubierto === objeto;

      if (!objeto || objeto === "reloj" || objetoYaEncontrado || objetoActivo) {
        if (busquedaTimerRef.current) {
          clearTimeout(busquedaTimerRef.current);
          busquedaTimerRef.current = null;
        }
        return;
      }

      const posiciones = POSICIONES_ESCONDITES_ESCENA1[objeto];
      if (!posiciones || posiciones.length === 0) return;

      if (objetoAsomado) {
        busquedaTimerRef.current = setTimeout(() => {
          setObjetoAsomado(false);
        }, 900);
      } else {
        busquedaTimerRef.current = setTimeout(() => {
          setPosicionEscondite((actual) => (actual + 1) % posiciones.length);
          setObjetoAsomado(true);
        }, 260);
      }

      return () => {
        if (busquedaTimerRef.current) {
          clearTimeout(busquedaTimerRef.current);
          busquedaTimerRef.current = null;
        }
      };
    }, [objetoVisible, objetoDescubierto, objetoActivo, objetoAsomado]);

    /* =====================================================
       REGISTRAR OBJETO ENCONTRADO
       Los tres objetos muestran el aviso del capítulo 2,
       pero el capítulo solo se desbloquea al pulsar CONTINUAR.
    ===================================================== */
    const registrarObjetoEncontrado = (objeto) => {
      if (objetosDescubiertos.includes(objeto)) return;

      const nuevosObjetos = [...objetosDescubiertos, objeto];
      setObjetosDescubiertos(nuevosObjetos);

      if (nuevosObjetos.length === 3 && onObjetosEncontrados) {
        onObjetosEncontrados(2);
      }
    };

    /* =====================================================
       FINAL DE LA CAMINATA
    ===================================================== */
    const terminarCaminata = (evento) => {
      // Ignora cualquier animationend que no sea la entrada de Adrián.
      if (evento?.animationName && evento.animationName !== "entradaAdrian") return;
      setCaminataTerminada(true);
      setAdrianHabla(true);
    };

    /* =====================================================
       ANIMACIÓN ESPECIAL DEL RELOJ
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
          reproducirAudio(audiosEscena1[8], 8, "principal");
        }, 1800);
      }, 1400);
    };

    /* =====================================================
       FIN DE AUDIO: MANTIENE LA SECUENCIA ORIGINAL
    ===================================================== */
    const manejarFinAudio = () => {
      if (tipoAudio === "objeto") {
        // AUDIO 3: moneda → audio 4
        if (objetoEnAudio === "moneda") {
          setObjetoActivo(null);
          setObjetoEnAudio(null);
          setObjetoPulsando("moneda");
          setMomentoTexto(4);
          reproducirAudio(audiosEscena1[4], 4, "principal");
          return;
        }

        // AUDIO 5: jarrón → aparece la lanza
        if (objetoEnAudio === "jarron") {
          setObjetoActivo(null);
          setObjetoEnAudio(null);
          setObjetoPulsando(null);
          setObjetoVisible("lanza");
          setObjetoDescubierto(null);
          setPosicionEscondite(0);
          setObjetoAsomado(true);
          setMomentoTexto(null);
          setTipoAudio("espera");
          setNarradorActivo(false);
          return;
        }

        // AUDIO 6: lanza → reloj cerrado
        if (objetoEnAudio === "lanza") {
          setObjetoActivo(null);
          setObjetoEnAudio(null);
          setObjetoPulsando(null);
          setObjetoVisible(null);
          setObjetoDescubierto(null);
          setObjetoAsomado(false);
          setPosicionEscondite(0);
          setMomentoTexto(null);
          setTipoAudio("espera");
          setNarradorActivo(false);
          setRelojVisible(true);
          return;
        }

        // AUDIO 7: reloj → movimiento al centro y apertura
        if (objetoEnAudio === "reloj") {
          setObjetoEnAudio(null);
          setMomentoTexto(null);
          setTipoAudio("espera");
          setNarradorActivo(false);
          iniciarMovimientoReloj();
          return;
        }
      }

      // AUDIO 1: el audio 2 espera también a que termine la caminata.
      if (audioActual === 1) {
        setAudio1Terminado(true);
        setNarradorActivo(false);
        return;
      }

      // AUDIO 2: aparece la moneda.
      if (audioActual === 2) {
        setObjetoVisible("moneda");
        setObjetoDescubierto(null);
        setObjetoPulsando(null);
        setPosicionEscondite(0);
        setObjetoAsomado(true);
        setTipoAudio("espera");
        setNarradorActivo(false);
        setMomentoTexto(null);
        return;
      }

      // AUDIO 4: aparece el jarrón.
      if (audioActual === 4) {
        setObjetoVisible("jarron");
        setObjetoDescubierto(null);
        setObjetoPulsando(null);
        setPosicionEscondite(0);
        setObjetoAsomado(true);
        setTipoAudio("espera");
        setNarradorActivo(false);
        setMomentoTexto(null);
        return;
      }

      // AUDIO 8: la narración termina y queda el botón Continuar.
      if (audioActual === 8) {
        setTipoAudio("espera");
        setNarradorActivo(false);
      }
    };

    /* =====================================================
       CLIC EN LOS OBJETOS
    ===================================================== */
    const reproducirObjeto = (objeto) => {
      // No permite volver a activar el mismo asset tras encontrarlo.
      if (objeto !== "reloj" && objetoDescubierto === objeto) return;

      const audiosObjeto = {
        moneda: { audio: audiosEscena1[3], numero: 3, momento: 3 },
        jarron: { audio: audiosEscena1[5], numero: 5, momento: 5 },
        lanza: { audio: audiosEscena1[6], numero: 6, momento: 6 },
        reloj: { audio: audiosEscena1[7], numero: 7, momento: 7 }
      };

      const configuracion = audiosObjeto[objeto];
      if (!configuracion) return;

      // Detiene inmediatamente la búsqueda al hacer clic.
      if (objeto !== "reloj") {
        if (busquedaTimerRef.current) {
          clearTimeout(busquedaTimerRef.current);
          busquedaTimerRef.current = null;
        }
        setObjetoAsomado(true);
        registrarObjetoEncontrado(objeto);
        setObjetoDescubierto(objeto);
        setObjetoActivo(objeto);
      } else {
        setRelojDescubierto(true);
      }

      setObjetoPulsando(null);
      setObjetoEnAudio(objeto);
      setMomentoTexto(configuracion.momento);
      reproducirAudio(configuracion.audio, configuracion.numero, "objeto");
    };

    /* =====================================================
       CONTINUAR AL CAPÍTULO 2
    ===================================================== */
    const continuarCapitulo2 = () => {
      if (objetosDescubiertos.length < 3) return;

      if (onCapituloDesbloqueado) {
        onCapituloDesbloqueado(2);
      }

      if (onEscenaTerminada) {
        onEscenaTerminada();
      }
    };

    /* =====================================================
       CONTROL DEL NARRADOR DESDE EL PADRE
    ===================================================== */
    const toggleNarracion = () => {
      const reproductor = audioRef.current;
      if (!reproductor || tipoAudio === "espera") return;

      if (!reproductor.paused) {
        reproductor.pause();
        setNarradorActivo(false);
        return;
      }

      reproductor.play()
        .then(() => setNarradorActivo(true))
        .catch((error) => {
          console.error("No se pudo reanudar la narración:", error);
        });
    };

    useImperativeHandle(ref, () => ({ toggleNarracion }));

    /* =====================================================
       CERRAR MODAL Y ACTIVAR PULSO
    ===================================================== */
    const cerrarModal = () => {
      const objetoModal = objetoActivo;
      setObjetoActivo(null);

      if (objetoModal && objetoModal !== "reloj") {
        setObjetoPulsando(objetoModal);
      }
    };

    /* =====================================================
       POSICIÓN DEL ASSET ACTUAL
    ===================================================== */
    const posicionesActuales = POSICIONES_ESCONDITES_ESCENA1[objetoVisible];
    const posicionActual = posicionesActuales?.length
      ? posicionesActuales[posicionEscondite % posicionesActuales.length]
      : { left: "50%", top: "60%" };

    /* =====================================================
       RENDER
    ===================================================== */
    return (
      <div className="escena-1">
        <div className="escena-1-contenido">
          {/* FONDO DE LA CUEVA */}
          <img
            src="/Escenarios/FondoCueva.svg"
            alt="Cueva"
            className="escena-1-fondo"
          />

          {/* FUEGO DEL ESCENARIO */}
          <svg
            className="escena-1-overlay"
            viewBox="0 0 1024 598"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <image
              href="/Escenarios/fuegoAnto.svg"
              x="302"
              y="185"
              width="35"
              height="75"
            />
          </svg>

          {/* ADRIÁN CAMINANDO */}
          {!adrianHabla && (
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

          {/* ADRIÁN HABLANDO */}
          {adrianHabla && (
            <div className="escena-1-adrian-hablando">
              <Lottie
                animationData={AdrianHablando}
                loop
                autoplay
              />
            </div>
          )}

          {/* AUDIO ÚNICO DE LA ESCENA */}
          <audio
            ref={audioRef}
            onEnded={manejarFinAudio}
            preload="auto"
          />

          {/* SUBTÍTULOS */}
          {textoNarracionActivo &&
            momentoTexto !== null &&
            textosEscena1[momentoTexto] && (
              <div className="escena-1-texto-narracion">
                {textosEscena1[momentoTexto]}
              </div>
            )}

          {/* MONEDA: APARECE DETRÁS DE LAS PIEDRAS */}
          {objetoVisible === "moneda" && posicionActual && (
            <button
              className={`escena-1-moneda-boton escena-1-objeto-busqueda ${
                objetoAsomado ? "asomado" : "oculto"
              } ${objetoDescubierto === "moneda" ? "descubierto" : ""} ${
                objetoPulsando === "moneda" ? "pulsando" : ""
              }`}
              style={{ left: posicionActual.left, top: posicionActual.top }}
              onClick={() => reproducirObjeto("moneda")}
              aria-label="Encontrar moneda"
              disabled={objetoDescubierto === "moneda"}
            >
              <img
                src={Es1Moneda}
                alt="Moneda antigua"
                className="escena-1-moneda"
              />
            </button>
          )}

          {/* JARRÓN: APARECE DETRÁS DE LAS PIEDRAS */}
          {objetoVisible === "jarron" && posicionActual && (
            <button
              className={`escena-1-jarron-boton escena-1-objeto-busqueda ${
                objetoAsomado ? "asomado" : "oculto"
              } ${objetoDescubierto === "jarron" ? "descubierto" : ""} ${
                objetoPulsando === "jarron" ? "pulsando" : ""
              }`}
              style={{ left: posicionActual.left, top: posicionActual.top }}
              onClick={() => reproducirObjeto("jarron")}
              aria-label="Encontrar jarrón"
              disabled={objetoDescubierto === "jarron"}
            >
              <img
                src={Es1Jarron}
                alt="Jarrón antiguo"
                className="escena-1-jarron"
              />
            </button>
          )}

          {/* LANZA: APARECE DETRÁS DE LAS PIEDRAS */}
          {objetoVisible === "lanza" && posicionActual && (
            <button
              className={`escena-1-lanza-boton escena-1-objeto-busqueda ${
                objetoAsomado ? "asomado" : "oculto"
              } ${objetoDescubierto === "lanza" ? "descubierto" : ""} ${
                objetoPulsando === "lanza" ? "pulsando" : ""
              }`}
              style={{ left: posicionActual.left, top: posicionActual.top }}
              onClick={() => reproducirObjeto("lanza")}
              aria-label="Encontrar lanza"
              disabled={objetoDescubierto === "lanza"}
            >
              <img
                src={Es1Lanza}
                alt="Lanza antigua"
                className="escena-1-lanza"
              />
            </button>
          )}

          {/* PIEDRAS EN PRIMER PLANO: TAPAN PARTE DE LOS ASSETS */}
          <img
            src="/Escenarios/ForegroundCueva.svg"
            alt=""
            aria-hidden="true"
            className="escena-1-foreground-cueva"
          />

          {/* RELOJ CERRADO */}
          {relojVisible && !relojAbierto && (
            <button
              className={`escena-1-reloj-boton ${
                relojMoviendose ? "moviendose" : ""
              } ${relojEnCentro ? "en-centro" : ""} ${
                relojDescubierto ? "descubierto" : ""
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

          {/* RELOJ ABIERTO */}
          {relojAbierto && (
            <div className="escena-1-reloj-abierto">
              <img
                src={reloj}
                alt="Reloj abierto"
                className="escena-1-reloj"
              />
            </div>
          )}

          {/* CONTINUAR AL CAPÍTULO 2 */}
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

          {/* MODAL DE INFORMACIÓN */}
          {objetoActivo && (
            <div
              className="escena-1-modal-fondo"
              onClick={cerrarModal}
            >
              <div
                className="escena-1-modal"
                onClick={(evento) => evento.stopPropagation()}
              >
                <div className="escena-1-modal-imagen">
                  {objetoActivo === "moneda" && (
                    <img src={Es1Moneda} alt="Moneda antigua" />
                  )}
                  {objetoActivo === "jarron" && (
                    <img src={Es1Jarron} alt="Jarrón antiguo" />
                  )}
                  {objetoActivo === "lanza" && (
                    <img src={Es1Lanza} alt="Lanza antigua" />
                  )}
                </div>

                <div className="escena-1-modal-info">
                  {objetoActivo === "moneda" && (
                    <>
                      <h2>MONEDA</h2>
                      <p>
                        Las monedas son mucho más que una forma de pagar. Gracias a ellas podemos
                        comerciar con mayor facilidad y conocer quién tiene el poder en una
                        determinada época.
                      </p>
                    </>
                  )}

                  {objetoActivo === "jarron" && (
                    <>
                      <h2>JARRÓN</h2>
                      <p>
                        Aunque parece un objeto cotidiano, estos jarrones pueden contar muchísimo
                        sobre nosotros. Podemos encontrar escenas de nuestras costumbres, guerras,
                        creencias y hasta momentos de nuestra vida diaria.
                      </p>
                    </>
                  )}

                  {objetoActivo === "lanza" && (
                    <>
                      <h2>LANZA</h2>
                      <p>
                        Es una de las armas principales de nuestros guerreros. Los hoplitas la
                        utilizan junto con su escudo para enfrentarse al enemigo y proteger su ciudad.
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
