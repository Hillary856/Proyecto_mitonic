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

import Esc5Audio1 from "../../Audios/Esc5Audio1.mp3";
import Esc5Audio2 from "../../Audios/Esc5Audio2.mp3";
import Esc5Audio3 from "../../Audios/Esc5Audio3.mp3";
import Esc5Audio4 from "../../Audios/Esc5Audio4.mp3";
import Esc5Audio5 from "../../Audios/Esc5Audio5.mp3";
import Esc5Audio6 from "../../Audios/Esc5Audio6.mp3";
import Esc5Audio7 from "../../Audios/Esc5Audio7.mp3";
import Esc5Audio8 from "../../Audios/Esc5Audio8.mp3";
import Esc5Audio9 from "../../Audios/Esc5Audio9.mp3";
import Esc5Audio10 from "../../Audios/Esc5Audio10.mp3";

import Es5Espada from "../../AssetsNuevos/Es5espada.svg";
import Es5Casco from "../../AssetsNuevos/Es5casco.svg";
import Es5Escudo from "../../AssetsNuevos/Es5Escudo.svg";
import reloj from "../../AssetsNuevos/reloj.svg";
import RelojCerrado from "../../AssetsNuevos/RelojCerrado.svg";

import "./Escenas.css";


const Lottie = lottieReact.default;


/* =====================================================
   FONDO DE LA ESCENA
===================================================== */

const FONDO_ESCENA5 = "/Escenarios/coliseoo.svg";


/* =====================================================
   ORDEN DE LOS OBJETOS
   espada → casco → escudo → (audio 8) → reloj
===================================================== */

const SIGUIENTE_OBJETO = {
  espada: "casco",
  casco: "escudo",
  escudo: null
};


/* =====================================================
   POSICIONES DONDE APARECE CADA OBJETO
   (porcentajes del recuadro de la escena).
   Son de PRUEBA: cámbialas según tu fondo.
===================================================== */

const POSICIONES_ESCENA5 = {
  espada: [
    { left: "14%", top: "70%" },
    { left: "48%", top: "74%" },
    { left: "84%", top: "68%" }
  ],
  casco: [
    { left: "20%", top: "72%" },
    { left: "56%", top: "70%" },
    { left: "88%", top: "74%" }
  ],
  escudo: [
    { left: "12%", top: "74%" },
    { left: "44%", top: "70%" },
    { left: "80%", top: "72%" }
  ]
};


const Escena5 = forwardRef(
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
       ADRIÁN CAMINANDO
    ===================================================== */

    const imagenesAdrian = [
      img0, img1, img2, img3,
      img4, img5, img6, img7
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

    const audiosEscena5 = {
      1: Esc5Audio1,
      2: Esc5Audio2,
      3: Esc5Audio3,
      4: Esc5Audio4,
      5: Esc5Audio5,
      6: Esc5Audio6,
      7: Esc5Audio7,
      8: Esc5Audio8,
      9: Esc5Audio9,
      10: Esc5Audio10
    };


    /* =====================================================
       SUBTÍTULOS (el número es el del audio)
    ===================================================== */

    const textosEscena5 = {
      1: "Roma. Estamos en el Coliseo, uno de los lugares donde más personas se reúnen para presenciar espectáculos.",
      2: "Aquí los espectadores vienen a ver combates de gladiadores, enfrentamientos con animales y otros espectáculos.",
      3: "La multitud espera que el espectáculo comience. Para ellos, esto forma parte del entretenimiento de la ciudad.",
      4: "Para mí, sin embargo, hay algo mucho más importante: entender por qué el reloj me ha traído hasta aquí.",
      5: "El gladius romano, una de las armas más importantes del ejército romano, especialmente por su tamaño corto y fácil manejo en combates cercanos.",
      6: "El casco espartano era una parte fundamental de la protección de los guerreros espartanos. Cubría principalmente la cabeza y ayudaba a protegerlos durante los combates.",
      7: "El escudo romano fue un icónico escudo semicilíndrico y rectangular utilizado por los legionarios de la antigua Roma.",
      8: "Roma deja su historia en cada uno de estos objetos.",
      9: "Ya, veamos este objeto. Puede ayudarnos a entender un poco más sobre la vida en Roma.",
      10: ""
    };


    /* =====================================================
       OBJETOS DE LA ESCENA
    ===================================================== */

    const OBJETOS = {
      espada: {
        imagen: Es5Espada,
        alt: "Gladius romano",
        etiqueta: "Encontrar gladius",
        audio: 5,
        titulo: "GLADIUS",
        texto:
          "El gladius es una espada corta de doble filo. Gracias a su tamaño, los legionarios podían usarla en combates muy cercanos, sin perder el orden de la formación."
      },
      casco: {
        imagen: Es5Casco,
        alt: "Casco espartano",
        etiqueta: "Encontrar casco",
        audio: 6,
        titulo: "CASCO ESPARTANO",
        texto:
          "Los cascos de bronce de los guerreros griegos, como los espartanos, protegían la cabeza y buena parte del rostro. A cambio, limitaban la visión y el oído."
      },
      escudo: {
        imagen: Es5Escudo,
        alt: "Escudo romano",
        etiqueta: "Encontrar escudo",
        audio: 7,
        titulo: "ESCUDO ROMANO",
        texto:
          "El escudo de los legionarios era curvo y rectangular, de madera cubierta de cuero. Juntos, los soldados podían formar la famosa «tortuga» para protegerse de los proyectiles."
      }
    };


    /* =====================================================
       ESTADOS DE ADRIÁN Y AUDIO
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
    const [faseBusqueda, setFaseBusqueda] = useState("oculto");
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
       REFERENCIAS
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
        console.error("No se pudo reproducir el audio de Escena 5:", error);
      });
    };


    /* =====================================================
       INICIAR AUDIO 1 (mientras Adrián camina)
    ===================================================== */

    useEffect(() => {
      if (escenaIniciadaRef.current) return;
      escenaIniciadaRef.current = true;
      reproducirAudio(audiosEscena5[1], 1, "principal");
    }, []);


    /* =====================================================
       AUDIO 2: ESPERA A QUE TERMINEN LA CAMINATA Y EL AUDIO 1
    ===================================================== */

    useEffect(() => {
      if (!caminataTerminada || !audio1Terminado || audio2IniciadoRef.current) {
        return;
      }

      audio2IniciadoRef.current = true;
      setAudio1Terminado(false);
      setMomentoTexto(2);
      reproducirAudio(audiosEscena5[2], 2, "principal");
    }, [caminataTerminada, audio1Terminado]);


    /* =====================================================
       BÚSQUEDA DE OBJETOS
       Aparece, se queda un momento, se desvanece y cambia
       de lugar cuando ya está oculto.
    ===================================================== */

    useEffect(() => {
      const objeto = objetoVisible;
      const objetoYaEncontrado = objetoDescubierto === objeto;

      if (!objeto || objetoYaEncontrado || objetoActivo) {
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
    }, [objetoVisible, objetoDescubierto, objetoActivo, faseBusqueda]);


    /* =====================================================
       FIN DE LA ANIMACIÓN DE BÚSQUEDA
    ===================================================== */

    const manejarAnimacionBusqueda = (evento) => {
      if (evento.target !== evento.currentTarget) return;

      if (evento.animationName === "entradaEsconditeEscena5") {
        setFaseBusqueda("visible");
        return;
      }

      if (evento.animationName === "salidaEsconditeEscena5") {
        const posiciones = POSICIONES_ESCENA5[objetoVisible];

        if (posiciones?.length) {
          setPosicionEscondite((actual) => (actual + 1) % posiciones.length);
        }

        setFaseBusqueda("oculto");
      }
    };


    /* =====================================================
       REGISTRAR OBJETO ENCONTRADO
       Con los 3 se muestra el aviso del capítulo 6, pero el
       capítulo solo se desbloquea al pulsar CONTINUAR.
    ===================================================== */

    const registrarObjetoEncontrado = (objeto) => {
      if (objetosDescubiertos.includes(objeto)) return;

      const nuevosObjetos = [...objetosDescubiertos, objeto];
      setObjetosDescubiertos(nuevosObjetos);

      if (nuevosObjetos.length === 3 && onObjetosEncontrados) {
        onObjetosEncontrados(6);
      }
    };


    /* =====================================================
       FINAL DE LA CAMINATA
    ===================================================== */

    const terminarCaminata = (evento) => {
      if (evento?.animationName && evento.animationName !== "entradaAdrian") {
        return;
      }
      setCaminataTerminada(true);
      setAdrianHabla(true);
    };


    /* =====================================================
       ANIMACIÓN DEL RELOJ (se mueve al centro y se abre)
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
          setMomentoTexto(10);
          reproducirAudio(audiosEscena5[10], 10, "principal");
        }, 1800);
      }, 1400);
    };


    /* =====================================================
       FIN DE AUDIO
    ===================================================== */

    const manejarFinAudio = () => {

      /* ---------- audios de objetos y del reloj ---------- */

      if (tipoAudio === "objeto") {

        // AUDIO 9: reloj → se mueve al centro y se abre
        if (objetoEnAudio === "reloj") {
          setObjetoEnAudio(null);
          setMomentoTexto(null);
          setTipoAudio("espera");
          setNarradorActivo(false);
          iniciarMovimientoReloj();
          return;
        }

        // AUDIOS 5, 6, 7: espada, casco, escudo
        const siguiente = SIGUIENTE_OBJETO[objetoEnAudio];

        setObjetoActivo(null);
        setObjetoEnAudio(null);
        setObjetoPulsando(null);
        setObjetoDescubierto(null);

        if (siguiente) {
          // aparece el siguiente objeto
          setObjetoVisible(siguiente);
          setPosicionEscondite(0);
          setFaseBusqueda("entrada");
          setMomentoTexto(null);
          setTipoAudio("espera");
          setNarradorActivo(false);
          return;
        }

        // era el último objeto → audio 8
        setObjetoVisible(null);
        setFaseBusqueda("oculto");
        setPosicionEscondite(0);
        setMomentoTexto(8);
        reproducirAudio(audiosEscena5[8], 8, "principal");
        return;
      }

      /* ---------- audios principales ---------- */

      // AUDIO 1: el audio 2 espera también a que termine la caminata
      if (audioActual === 1) {
        setAudio1Terminado(true);
        setNarradorActivo(false);
        return;
      }

      // AUDIO 2 → AUDIO 3
      if (audioActual === 2) {
        setMomentoTexto(3);
        reproducirAudio(audiosEscena5[3], 3, "principal");
        return;
      }

      // AUDIO 3 → AUDIO 4
      if (audioActual === 3) {
        setMomentoTexto(4);
        reproducirAudio(audiosEscena5[4], 4, "principal");
        return;
      }

      // AUDIO 4 → aparece la espada
      if (audioActual === 4) {
        setObjetoVisible("espada");
        setObjetoDescubierto(null);
        setObjetoPulsando(null);
        setPosicionEscondite(0);
        setFaseBusqueda("entrada");
        setTipoAudio("espera");
        setNarradorActivo(false);
        setMomentoTexto(null);
        return;
      }

      // AUDIO 8 → aparece el reloj cerrado
      if (audioActual === 8) {
        setMomentoTexto(null);
        setTipoAudio("espera");
        setNarradorActivo(false);
        setRelojVisible(true);
        return;
      }

      // AUDIO 10 → queda el botón Continuar
      if (audioActual === 10) {
        setMomentoTexto(null);
        setTipoAudio("espera");
        setNarradorActivo(false);
      }
    };


    /* =====================================================
       CLIC EN LOS OBJETOS Y EN EL RELOJ
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

      // Detiene la búsqueda al hacer clic
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
      reproducirAudio(audiosEscena5[configuracion.audio], configuracion.audio, "objeto");
    };


    /* =====================================================
       CONTINUAR AL CAPÍTULO 6
    ===================================================== */

    const continuarCapitulo6 = () => {
      if (objetosDescubiertos.length < 3) return;

      if (onCapituloDesbloqueado) {
        onCapituloDesbloqueado(6);
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
       POSICIÓN DEL OBJETO ACTUAL
    ===================================================== */

    const posicionesActuales = POSICIONES_ESCENA5[objetoVisible];

    const posicionActual = posicionesActuales?.length
      ? posicionesActuales[posicionEscondite % posicionesActuales.length]
      : { left: "50%", top: "65%" };


    /* =====================================================
       RENDER
    ===================================================== */

    return (
      <div className="escena-1">
        <div className="escena-1-contenido">

          {/* FONDO */}
          <img
            src={FONDO_ESCENA5}
            alt="Coliseo romano"
            className="escena-1-fondo"
          />

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
            textosEscena5[momentoTexto] && (
              <div className="escena-1-texto-narracion">
                {textosEscena5[momentoTexto]}
              </div>
            )}

          {/* OBJETO QUE SE ESTÁ BUSCANDO */}
          {objetoVisible && OBJETOS[objetoVisible] && (
            <button
              className={`escena-5-objeto-boton fase-${faseBusqueda} ${
                objetoDescubierto === objetoVisible ? "descubierto" : ""
              } ${objetoPulsando === objetoVisible ? "pulsando" : ""}`}
              data-objeto={objetoVisible}
              style={{ left: posicionActual.left, top: posicionActual.top }}
              onClick={() => reproducirObjeto(objetoVisible)}
              onAnimationEnd={manejarAnimacionBusqueda}
              aria-label={OBJETOS[objetoVisible].etiqueta}
            >
              <img
                src={OBJETOS[objetoVisible].imagen}
                alt={OBJETOS[objetoVisible].alt}
              />
            </button>
          )}

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

          {/* CONTINUAR AL CAPÍTULO 6 */}
          {mostrarContinuar && (
            <div className="escena-1-continuar-contenedor">
              <div className="escena-1-continuar-texto">
                <span>CONTINUAR AL CAPÍTULO 6</span>
                <button
                  className="escena-1-continuar-boton"
                  onClick={continuarCapitulo6}
                  disabled={objetosDescubiertos.length < 3}
                >
                  CONTINUAR →
                </button>
              </div>
            </div>
          )}

          {/* MODAL DE INFORMACIÓN */}
          {objetoActivo && OBJETOS[objetoActivo] && (
            <div
              className="escena-1-modal-fondo"
              onClick={cerrarModal}
            >
              <div
                className="escena-1-modal"
                onClick={(evento) => evento.stopPropagation()}
              >
                <div className="escena-1-modal-imagen">
                  <img
                    src={OBJETOS[objetoActivo].imagen}
                    alt={OBJETOS[objetoActivo].alt}
                  />
                </div>

                <div className="escena-1-modal-info">
                  <h2>{OBJETOS[objetoActivo].titulo}</h2>
                  <p>{OBJETOS[objetoActivo].texto}</p>
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

Escena5.displayName = "Escena5";

export default Escena5;