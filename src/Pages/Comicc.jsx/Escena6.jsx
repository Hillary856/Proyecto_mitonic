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

import "./Escenas.css";


const Lottie = lottieReact.default;


/* =====================================================
   BUSCADOR DE ARCHIVOS
   Encuentra los assets y audios por su nombre, sin
   importar mayúsculas ni minúsculas. Si falta alguno,
   avisa en la consola en vez de romper la página.
===================================================== */

const IMAGENES = import.meta.glob(
  "../../AssetsNuevos/*.svg",
  { eager: true, import: "default" }
);

const SONIDOS = import.meta.glob(
  "../../Audios/*.mp3",
  { eager: true, import: "default" }
);

const nombreSinExtension = (ruta) =>
  ruta
    .split("/")
    .pop()
    .replace(/\.[^.]+$/, "")
    .toLowerCase();

const buscarArchivo = (mapa, ...nombres) => {

  const rutas = Object.keys(mapa);

  for (const nombre of nombres) {

    const ruta = rutas.find(
      (r) => nombreSinExtension(r) === nombre.toLowerCase()
    );

    if (ruta) {
      return mapa[ruta];
    }

  }

  console.warn(
    "[Escena 6] No se encontró el archivo:",
    nombres.join(" / ")
  );

  return null;

};


/* =====================================================
   ASSETS DE LA ESCENA
===================================================== */

const Es6Cincel = buscarArchivo(IMAGENES, "Es6cincel");

const Es6Amuleto = buscarArchivo(IMAGENES, "Es6amuelto", "Es6amuleto");

// Si todavía no existe el dibujo de la urna, usa el cincel
// de forma temporal para que la escena no se detenga.
const Es6Urna =
  buscarArchivo(IMAGENES, "Es6urna", "Es6urnafuneraria") ||
  Es6Cincel;

const RelojCerrado = buscarArchivo(IMAGENES, "RelojCerrado");


/* =====================================================
   AUDIOS DE LA ESCENA (Esc6Audio1 a Esc6Audio8)
===================================================== */

const AUDIOS_ESCENA6 = {
  1: buscarArchivo(SONIDOS, "Esc6Audio1"),
  2: buscarArchivo(SONIDOS, "Esc6Audio2"),
  3: buscarArchivo(SONIDOS, "Esc6Audio3"),
  4: buscarArchivo(SONIDOS, "Esc6Audio4"),
  5: buscarArchivo(SONIDOS, "Esc6Audio5"),
  6: buscarArchivo(SONIDOS, "Esc6Audio6"),
  7: buscarArchivo(SONIDOS, "Esc6Audio7"),
  8: buscarArchivo(SONIDOS, "Esc6Audio8")
};


/* =====================================================
   FONDO DE LA ESCENA
   (si ya pusiste el nombre real, déjalo)
===================================================== */

const FONDO_ESCENA6 = "/Escenarios/imperio.svg";


/* =====================================================
   ORDEN DE LOS OBJETOS
   urna → cincel → amuleto → (el reloj se pierde)
===================================================== */

const SIGUIENTE_OBJETO = {
  urna: "cincel",
  cincel: "amuleto",
  amuleto: null
};


/* =====================================================
   POSICIONES DE LOS OBJETOS (de PRUEBA)
   Porcentajes del recuadro de la escena.
===================================================== */

const POSICIONES_ESCENA6 = {
  urna: [
    { left: "16%", top: "72%" },
    { left: "50%", top: "76%" },
    { left: "86%", top: "70%" }
  ],
  cincel: [
    { left: "22%", top: "74%" },
    { left: "58%", top: "72%" },
    { left: "90%", top: "76%" }
  ],
  amuleto: [
    { left: "12%", top: "76%" },
    { left: "46%", top: "72%" },
    { left: "82%", top: "74%" }
  ]
};


/* =====================================================
   OBJETOS DE LA ESCENA
===================================================== */

const OBJETOS = {
  urna: {
    imagen: Es6Urna,
    alt: "Urna funeraria",
    etiqueta: "Encontrar urna",
    audio: 3,
    titulo: "URNA FUNERARIA",
    texto:
      "Los romanos guardaban las cenizas de sus muertos en urnas. Muchas se colocaban en columbarios, edificios con nichos, y llevaban grabado el nombre de la persona."
  },
  cincel: {
    imagen: Es6Cincel,
    alt: "Cincel",
    etiqueta: "Encontrar cincel",
    audio: 4,
    titulo: "CINCEL",
    texto:
      "Con cinceles y martillos, los escultores tallaban estatuas, relieves y monumentos. Aunque hoy las veamos blancas, muchas obras se pintaban con colores vivos."
  },
  amuleto: {
    imagen: Es6Amuleto,
    alt: "Amuleto",
    etiqueta: "Encontrar amuleto",
    audio: 5,
    titulo: "AMULETO",
    texto:
      "Los amuletos se llevaban colgados o en anillos para alejar el mal de ojo y atraer la buena suerte. Los niños romanos usaban uno llamado bulla."
  }
};


/* =====================================================
   SUBTÍTULOS (el número es el del audio)
===================================================== */

const TEXTOS_ESCENA6 = {
  1: "Esto no es un espectáculo. Es una batalla.",
  2: "Los ejércitos romanos están enfrentándose para defender y expandir los territorios del Imperio.",
  3: "Una urna funeraria. En ella se conservan las cenizas de una persona fallecida. Los rituales funerarios forman una parte importante de nuestras tradiciones y de la manera en que honramos a quienes ya no están con nosotros.",
  4: "Un cincel. Nuestros artesanos utilizan herramientas como esta para trabajar la piedra y crear esculturas, relieves y monumentos.",
  5: "Un amuleto. Muchos llevan objetos como este para protegerse y atraer la buena fortuna. Sus símbolos reflejan nuestras creencias y la importancia que damos a la protección de los dioses y de las fuerzas que no podemos controlar.",
  6: "¡Tengo que salir de aquí! ¡Vamos, llévame de vuelta! ¿Por qué no funciona?",
  7: "¡Vamos, haz algo! ¡Sácame de aquí!",
  8: "¡No! ¡Espera! ¡No puedo dejarlo aquí!"
};


const Escena6 = forwardRef(
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
       ESTADOS DE ADRIÁN Y AUDIO
       Al inicio no suena nada: Adrián solo camina.
    ===================================================== */

    const [adrianHabla, setAdrianHabla] = useState(false);
    const [audioActual, setAudioActual] = useState(0);
    const [tipoAudio, setTipoAudio] = useState("espera");
    const [narradorActivo, setNarradorActivo] = useState(false);


    /* =====================================================
       OBJETOS Y BÚSQUEDA
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
       TEXTO, BATALLA, RELOJ Y LUZ
    ===================================================== */

    const [momentoTexto, setMomentoTexto] = useState(null);
    const [batallaIntensa, setBatallaIntensa] = useState(false);
    const [relojVisible, setRelojVisible] = useState(false);
    const [relojDescubierto, setRelojDescubierto] = useState(false);
    const [relojIntentando, setRelojIntentando] = useState(false);
    const [relojCayendo, setRelojCayendo] = useState(false);
    const [luzActiva, setLuzActiva] = useState(false);


    /* =====================================================
       REFERENCIAS
    ===================================================== */

    const audioRef = useRef(null);
    const habloRef = useRef(false);
    const busquedaTimerRef = useRef(null);
    const luzTimerRef = useRef(null);


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
        if (busquedaTimerRef.current) {
          clearTimeout(busquedaTimerRef.current);
        }
        if (luzTimerRef.current) {
          clearTimeout(luzTimerRef.current);
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
        console.error("No se pudo reproducir el audio de Escena 6:", error);
      });
    };


    /* =====================================================
       FINAL DE LA CAMINATA
       Adrián se detiene y recién ahí empieza a hablar.
    ===================================================== */

    const terminarCaminata = (evento) => {
      if (evento?.animationName && evento.animationName !== "entradaAdrianEscena5") {
        return;
      }

      if (habloRef.current) return;
      habloRef.current = true;

      setAdrianHabla(true);
      setMomentoTexto(1);
      reproducirAudio(AUDIOS_ESCENA6[1], 1, "principal");
    };


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
       (usa las animaciones de la Escena 5)
    ===================================================== */

    const manejarAnimacionBusqueda = (evento) => {
      if (evento.target !== evento.currentTarget) return;

      if (evento.animationName === "entradaEsconditeEscena5") {
        setFaseBusqueda("visible");
        return;
      }

      if (evento.animationName === "salidaEsconditeEscena5") {
        const posiciones = POSICIONES_ESCENA6[objetoVisible];

        if (posiciones?.length) {
          setPosicionEscondite((actual) => (actual + 1) % posiciones.length);
        }

        setFaseBusqueda("oculto");
      }
    };


    /* =====================================================
       REGISTRAR OBJETO ENCONTRADO
       Con los 3 se muestra el aviso del capítulo 7.
    ===================================================== */

    const registrarObjetoEncontrado = (objeto) => {
      if (objetosDescubiertos.includes(objeto)) return;

      const nuevosObjetos = [...objetosDescubiertos, objeto];
      setObjetosDescubiertos(nuevosObjetos);

      if (nuevosObjetos.length === 3 && onObjetosEncontrados) {
        onObjetosEncontrados(7);
      }
    };


    /* =====================================================
       LA LUZ DEL RELOJ CUBRE LA PANTALLA
       Luego pasa al capítulo 7.
    ===================================================== */

    const iniciarLuz = () => {
      setMomentoTexto(null);
      setTipoAudio("espera");
      setNarradorActivo(false);
      setLuzActiva(true);

      luzTimerRef.current = setTimeout(() => {
        if (onCapituloDesbloqueado) {
          onCapituloDesbloqueado(7);
        }
        if (onEscenaTerminada) {
          onEscenaTerminada();
        }
      }, 2200);
    };


    /* =====================================================
       FIN DE AUDIO
    ===================================================== */

    const manejarFinAudio = () => {

      /* ---------- audios de objetos y del reloj ---------- */

      if (tipoAudio === "objeto") {

        // AUDIO 7: el reloj se resbala y cae → audio 8
        if (objetoEnAudio === "reloj") {
          setObjetoEnAudio(null);
          setRelojIntentando(false);
          setRelojCayendo(true);
          setMomentoTexto(8);
          reproducirAudio(AUDIOS_ESCENA6[8], 8, "principal");
          return;
        }

        // AUDIOS 3, 4 y 5: urna, cincel, amuleto
        const siguiente = SIGUIENTE_OBJETO[objetoEnAudio];

        setObjetoActivo(null);
        setObjetoEnAudio(null);
        setObjetoPulsando(null);
        setObjetoDescubierto(null);

        if (siguiente) {
          setObjetoVisible(siguiente);
          setPosicionEscondite(0);
          setFaseBusqueda("entrada");
          setMomentoTexto(null);
          setTipoAudio("espera");
          setNarradorActivo(false);
          return;
        }

        // era el último objeto: la batalla se intensifica
        setObjetoVisible(null);
        setFaseBusqueda("oculto");
        setPosicionEscondite(0);
        setBatallaIntensa(true);
        setMomentoTexto(6);
        reproducirAudio(AUDIOS_ESCENA6[6], 6, "principal");
        return;
      }

      /* ---------- audios principales ---------- */

      // AUDIO 1 → AUDIO 2
      if (audioActual === 1) {
        setMomentoTexto(2);
        reproducirAudio(AUDIOS_ESCENA6[2], 2, "principal");
        return;
      }

      // AUDIO 2 → aparece la urna
      if (audioActual === 2) {
        setObjetoVisible("urna");
        setObjetoDescubierto(null);
        setObjetoPulsando(null);
        setPosicionEscondite(0);
        setFaseBusqueda("entrada");
        setTipoAudio("espera");
        setNarradorActivo(false);
        setMomentoTexto(null);
        return;
      }

      // AUDIO 6 → aparece el reloj y espera el clic
      if (audioActual === 6) {
        setMomentoTexto(null);
        setTipoAudio("espera");
        setNarradorActivo(false);
        setRelojVisible(true);
        return;
      }

      // AUDIO 8 → la luz cubre la pantalla
      if (audioActual === 8) {
        iniciarLuz();
      }
    };


    /* =====================================================
       CLIC EN LOS OBJETOS Y EN EL RELOJ
    ===================================================== */

    const reproducirObjeto = (objeto) => {

      if (objeto === "reloj") {
        setRelojDescubierto(true);
        setRelojIntentando(true);
        setObjetoPulsando(null);
        setObjetoEnAudio("reloj");
        setMomentoTexto(7);
        reproducirAudio(AUDIOS_ESCENA6[7], 7, "objeto");
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
        AUDIOS_ESCENA6[configuracion.audio],
        configuracion.audio,
        "objeto"
      );
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

    const posicionesActuales = POSICIONES_ESCENA6[objetoVisible];

    const posicionActual = posicionesActuales?.length
      ? posicionesActuales[posicionEscondite % posicionesActuales.length]
      : { left: "50%", top: "65%" };


    /* =====================================================
       RENDER
    ===================================================== */

    return (
      <div className="escena-5 escena-6">
        <div className="escena-5-contenido">

          {/* FONDO (tiembla por la batalla) */}
          <img
            src={FONDO_ESCENA6}
            alt="Campo de batalla del Imperio romano"
            className={`escena-5-fondo escena-6-fondo-batalla ${
              batallaIntensa ? "intensa" : ""
            }`}
          />

          {/* AMBIENTE: sombra rojiza que late en la batalla */}
          <div
            className={`escena-6-ambiente ${
              batallaIntensa ? "intensa" : ""
            }`}
            aria-hidden="true"
          />

          {/* ADRIÁN CAMINANDO */}
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

          {/* ADRIÁN HABLANDO */}
          {adrianHabla && (
            <div className="escena-5-adrian-hablando">
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
            TEXTOS_ESCENA6[momentoTexto] && (
              <div className="escena-5-texto-narracion">
                {TEXTOS_ESCENA6[momentoTexto]}
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

          {/* RELOJ (espera el clic de Adrián) */}
          {relojVisible && !relojCayendo && (
            <button
              className={`escena-5-reloj-boton ${
                relojDescubierto ? "descubierto" : ""
              } ${relojIntentando ? "intentando" : ""}`}
              onClick={() => reproducirObjeto("reloj")}
              aria-label="Activar reloj"
            >
              <img
                src={RelojCerrado}
                alt="Reloj"
                className="escena-5-reloj-cerrado"
              />
            </button>
          )}

          {/* RELOJ CAÍDO ENTRE LOS ESCOMBROS */}
          {relojCayendo && (
            <div className="escena-6-reloj-caido">
              <img
                src={RelojCerrado}
                alt="Reloj caído entre los escombros"
                className="escena-5-reloj-cerrado"
              />
            </div>
          )}

          {/* LUZ INTENSA QUE CUBRE LA PANTALLA */}
          {luzActiva && (
            <div
              className="escena-6-luz"
              aria-hidden="true"
            />
          )}

          {/* MODAL DE INFORMACIÓN */}
          {objetoActivo && OBJETOS[objetoActivo] && (
            <div
              className="escena-5-modal-fondo"
              onClick={cerrarModal}
            >
              <div
                className="escena-5-modal"
                onClick={(evento) => evento.stopPropagation()}
              >
                <div className="escena-5-modal-imagen">
                  <img
                    src={OBJETOS[objetoActivo].imagen}
                    alt={OBJETOS[objetoActivo].alt}
                  />
                </div>

                <div className="escena-5-modal-info">
                  <h2>{OBJETOS[objetoActivo].titulo}</h2>
                  <p>{OBJETOS[objetoActivo].texto}</p>
                </div>

                <button
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

Escena6.displayName = "Escena6";

export default Escena6;