import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import lottieReact from "lottie-react";
import AdrianHablando from "../../assets/AdrianHablando.json";
import "./Escenas.css";

const Lottie = lottieReact.default || lottieReact;

const IMAGENES = import.meta.glob("../../AssetsNuevos/*.svg", {
  eager: true,
  import: "default",
});

const SONIDOS = import.meta.glob("../../Audios/*.mp3", {
  eager: true,
  import: "default",
});

const nombreSinExtension = (ruta) =>
  ruta.split("/").pop().replace(/\.[^.]+$/, "").toLowerCase();

const buscarArchivo = (mapa, ...nombres) => {
  const rutas = Object.keys(mapa);

  for (const nombre of nombres) {
    const ruta = rutas.find(
      (rutaActual) => nombreSinExtension(rutaActual) === nombre.toLowerCase()
    );

    if (ruta) return mapa[ruta];
  }

  console.warn("[Escena 6] No se encontró el archivo:", nombres.join(" / "));
  return null;
};

const Es6Cincel = buscarArchivo(IMAGENES, "Es6cincel");
const Es6Amuleto = buscarArchivo(IMAGENES, "Es6amuleto", "Es6amuelto");
const Es6Urna =
  buscarArchivo(IMAGENES, "Es6urna", "Es6urnafuneraria") || Es6Cincel;

const RelojCerrado = buscarArchivo(IMAGENES, "RelojCerrado");

const AUDIOS_ESCENA6 = {
  1: buscarArchivo(SONIDOS, "Esc6Audio1"),
  2: buscarArchivo(SONIDOS, "Esc6Audio2"),
  3: buscarArchivo(SONIDOS, "Esc6Audio3"),
  4: buscarArchivo(SONIDOS, "Esc6Audio4"),
  5: buscarArchivo(SONIDOS, "Esc6Audio5"),
  6: buscarArchivo(SONIDOS, "Esc6Audio6"),
  7: buscarArchivo(SONIDOS, "Esc6Audio7"),
  8: buscarArchivo(SONIDOS, "Esc6Audio8"),
};

const FONDO_ESCENA6 = "/Escenarios/imperio.svg";
const AGUA_ESCENA6 = "/Escenarios/agua5.svg";
const COLUMNA_ESCENA6 = "/Escenarios/columna5.svg";
const HUECO_ESCENA6 = "/Escenarios/hueco5.svg";
const TECHO_ESCENA6 = "/Escenarios/techo5.svg";
const FUEGO_ESCENA6 = "/Escenarios/FuegoImpe.svg";

// Cuatro fuegos independientes.
const FUEGOS_ESCENA6 = [
  {
    id: "fuego-1",
    estilo: {
      left: "var(--escena6-fuego-left)",
      bottom: "var(--escena6-fuego-bottom)",
      width: "var(--escena6-fuego-width)",
    },
    humoBottom: "calc(var(--escena6-fuego-bottom) + 8%)",
  },
  {
    id: "fuego-2",
    estilo: {
      left: "var(--escena6-fuego-2-left)",
      bottom: "var(--escena6-fuego-2-bottom)",
      width: "var(--escena6-fuego-2-width)",
    },
    humoBottom: "calc(var(--escena6-fuego-2-bottom) + 8%)",
  },
  {
    id: "fuego-3",
    estilo: {
      left: "var(--escena6-fuego-3-left)",
      bottom: "var(--escena6-fuego-3-bottom)",
      width: "var(--escena6-fuego-3-width)",
    },
    humoBottom: "calc(var(--escena6-fuego-3-bottom) + 8%)",
  },
  {
    id: "fuego-4",
    estilo: {
      left: "var(--escena6-fuego-4-left)",
      bottom: "var(--escena6-fuego-4-bottom)",
      width: "var(--escena6-fuego-4-width)",
    },
    humoBottom: "calc(var(--escena6-fuego-4-bottom) + 8%)",
  },
];

const EXPRESION_PENSATIVO = "/pensativoS.svg";
const EXPRESION_FELIZ = "/FelizS.svg";
const EXPRESION_SORPRENDIDO = "/SorprendidoS.svg";
const EXPRESION_ASUSTADO = "/asustado.svg";
const ADRIAN_QUIETO = "/Feliz.svg";

const SIGUIENTE_OBJETO = {
  urna: "cincel",
  cincel: "amuleto",
  amuleto: null,
};

const POSICIONES_ESCENA6 = {
  urna: [
    {
      left: "var(--escena6-punto-columna-left)",
      top: "var(--escena6-punto-columna-top)",
    },
    {
      left: "var(--escena6-punto-agua-left)",
      top: "var(--escena6-punto-agua-top)",
    },
    {
      left: "var(--escena6-punto-hueco-left)",
      top: "var(--escena6-punto-hueco-top)",
    },
  ],
  cincel: [
    {
      left: "var(--escena6-punto-techo-left)",
      top: "var(--escena6-punto-techo-top)",
    },
    {
      left: "var(--escena6-punto-columna-left)",
      top: "var(--escena6-punto-columna-top)",
    },
    {
      left: "var(--escena6-punto-hueco-left)",
      top: "var(--escena6-punto-hueco-top)",
    },
  ],
  amuleto: [
    {
      left: "var(--escena6-punto-agua-left)",
      top: "var(--escena6-punto-agua-top)",
    },
    {
      left: "var(--escena6-punto-techo-left)",
      top: "var(--escena6-punto-techo-top)",
    },
    {
      left: "var(--escena6-punto-fuego-left)",
      top: "var(--escena6-punto-fuego-top)",
    },
  ],
};

const OBJETOS = {
  urna: {
    imagen: Es6Urna,
    alt: "Urna funeraria",
    etiqueta: "Encontrar urna",
    audio: 3,
    titulo: "URNA FUNERARIA",
    texto:
      "Los romanos guardaban las cenizas de sus muertos en urnas. Muchas se colocaban en columbarios, edificios con nichos, y llevaban grabado el nombre de la persona.",
  },
  cincel: {
    imagen: Es6Cincel,
    alt: "Cincel",
    etiqueta: "Encontrar cincel",
    audio: 4,
    titulo: "CINCEL",
    texto:
      "Con cinceles y martillos, los escultores tallaban estatuas, relieves y monumentos. Aunque hoy las veamos blancas, muchas obras se pintaban con colores vivos.",
  },
  amuleto: {
    imagen: Es6Amuleto,
    alt: "Amuleto",
    etiqueta: "Encontrar amuleto",
    audio: 5,
    titulo: "AMULETO",
    texto:
      "Los amuletos se llevaban colgados o en anillos para alejar el mal de ojo y atraer la buena suerte. Los niños romanos usaban uno llamado bulla.",
  },
};

const TEXTOS_ESCENA6 = {
  1: "Esto no es un espectáculo. Es una batalla.",
  2: "Los ejércitos romanos están enfrentándose para defender y expandir los territorios del Imperio.",
  3: "Una urna funeraria. En ella se conservan las cenizas de una persona fallecida. Los rituales funerarios forman una parte importante de nuestras tradiciones y de la manera en que honramos a quienes ya no están con nosotros.",
  4: "Un cincel. Nuestros artesanos utilizan herramientas como esta para trabajar la piedra y crear esculturas, relieves y monumentos.",
  5: "Un amuleto. Muchos llevan objetos como este para protegerse y atraer la buena fortuna. Sus símbolos reflejan nuestras creencias y la importancia que damos a la protección de los dioses y de las fuerzas que no podemos controlar.",
  6: "¡Tengo que salir de aquí! ¡Vamos, llévame de vuelta! ¿Por qué no funciona?",
  7: "¡Vamos, haz algo! ¡Sácame de aquí!",
  8: "¡No! ¡Espera! ¡No puedo dejarlo aquí!",
};

const Escena6 = forwardRef(
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
    const [adrianHabla, setAdrianHabla] = useState(false);
    const [audioActual, setAudioActual] = useState(0);
    const [tipoAudio, setTipoAudio] = useState("espera");
    const [narradorActivo, setNarradorActivo] = useState(false);

    const [objetoVisible, setObjetoVisible] = useState(null);
    const [objetoDescubierto, setObjetoDescubierto] = useState(null);
    const [objetoPulsando, setObjetoPulsando] = useState(null);
    const [faseBusqueda, setFaseBusqueda] = useState("oculto");
    const [posicionEscondite, setPosicionEscondite] = useState(0);
    const [objetoActivo, setObjetoActivo] = useState(null);
    const [objetoEnAudio, setObjetoEnAudio] = useState(null);
    const [objetosDescubiertos, setObjetosDescubiertos] = useState([]);

    const [momentoTexto, setMomentoTexto] = useState(null);
    const [batallaIntensa, setBatallaIntensa] = useState(false);
    const [fuegosApagando, setFuegosApagando] = useState([]);
    const [fuegosApagados, setFuegosApagados] = useState([]);
    const [humosVisibles, setHumosVisibles] = useState([]);
    const [esperandoApagarFuego, setEsperandoApagarFuego] =
      useState(false);

    const [relojVisible, setRelojVisible] = useState(false);
    const [relojDescubierto, setRelojDescubierto] = useState(false);
    const [relojIntentando, setRelojIntentando] = useState(false);
    const [relojCayendo, setRelojCayendo] = useState(false);
    const [luzActiva, setLuzActiva] = useState(false);

    const [expresionAdrian, setExpresionAdrian] = useState(null);
    const [faseExpresion, setFaseExpresion] = useState("entrada");
    const [versionExpresion, setVersionExpresion] = useState(0);

    const audioRef = useRef(null);
    const habloRef = useRef(false);
    const busquedaTimerRef = useRef(null);
    const luzTimerRef = useRef(null);
    const humoTimerRef = useRef({});
    const expresionTimerRef = useRef(null);

    const adrianEstaHablando =
      adrianHabla && narradorActivo && tipoAudio !== "espera";

    useEffect(() => {
      onNarradorEstadoChange?.(narradorActivo);
    }, [narradorActivo, onNarradorEstadoChange]);

    useEffect(() => {
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

        [busquedaTimerRef, luzTimerRef, expresionTimerRef].forEach(
          (timerRef) => {
            if (timerRef.current) clearTimeout(timerRef.current);
          }
        );

        Object.values(humoTimerRef.current).forEach((timer) => {
          if (timer) clearTimeout(timer);
        });
      };
    }, []);

    const mostrarExpresion = (tipo, lado = "derecha") => {
      if (expresionTimerRef.current) {
        clearTimeout(expresionTimerRef.current);
        expresionTimerRef.current = null;
      }

      setVersionExpresion((actual) => actual + 1);
      setFaseExpresion("entrada");
      setExpresionAdrian({ tipo, lado });

      expresionTimerRef.current = setTimeout(() => {
        setFaseExpresion("salida");
      }, 1900);
    };

    const manejarFinAnimacionExpresion = (evento) => {
      if (evento.target !== evento.currentTarget) return;

      if (evento.animationName !== "salidaExpresionEscena6") {
        return;
      }

      if (expresionTimerRef.current) {
        clearTimeout(expresionTimerRef.current);
        expresionTimerRef.current = null;
      }

      setExpresionAdrian(null);
      setFaseExpresion("entrada");
    };

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
          "No se pudo reproducir el audio de Escena 6:",
          error
        );
        setNarradorActivo(false);
      });
    };

    // Termina la aparición breve de Adrián asustado y empieza la narración.
    const terminarEntradaAdrian = (evento) => {
      if (evento?.target !== evento?.currentTarget) return;

      if (
        evento?.animationName &&
        evento.animationName !== "entradaAdrianEscena6"
      ) {
        return;
      }

      if (habloRef.current) return;

      habloRef.current = true;
      setAdrianHabla(true);
      setMomentoTexto(1);
      reproducirAudio(AUDIOS_ESCENA6[1], 1, "principal");
    };

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

      if (faseBusqueda === "entrada" || faseBusqueda === "visible") {
        busquedaTimerRef.current = setTimeout(() => {
          setFaseBusqueda("salida");
        }, 950);
      } else if (faseBusqueda === "salida") {
        busquedaTimerRef.current = setTimeout(() => {
          const posiciones = POSICIONES_ESCENA6[objeto];

          if (posiciones?.length) {
            setPosicionEscondite(
              (actual) => (actual + 1) % posiciones.length
            );
          }

          setFaseBusqueda("entrada");
        }, 260);
      } else if (faseBusqueda === "oculto") {
        busquedaTimerRef.current = setTimeout(() => {
          setFaseBusqueda("entrada");
        }, 160);
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

    const registrarObjetoEncontrado = (objeto) => {
      if (objetosDescubiertos.includes(objeto)) return;

      const nuevosObjetos = [...objetosDescubiertos, objeto];
      setObjetosDescubiertos(nuevosObjetos);

      if (nuevosObjetos.length === 3) {
        onObjetosEncontrados?.(7);
      }
    };

    const apagarFuego = (fuegoId) => {
      if (
        !batallaIntensa ||
        fuegosApagados.includes(fuegoId) ||
        fuegosApagando.includes(fuegoId)
      ) {
        return;
      }

      setFuegosApagando((actuales) =>
        actuales.includes(fuegoId) ? actuales : [...actuales, fuegoId]
      );
    };

    const manejarFinAnimacionFuego = (evento) => {
      if (evento.target !== evento.currentTarget) return;
      if (evento.animationName !== "extinguirFuegoEscena6") return;

      const fuegoId = evento.currentTarget.dataset.fuegoId;

      if (!fuegoId || fuegosApagados.includes(fuegoId)) return;

      const nuevosApagados = [
        ...new Set([...fuegosApagados, fuegoId]),
      ];

      setFuegosApagando((actuales) =>
        actuales.filter((id) => id !== fuegoId)
      );
      setFuegosApagados(nuevosApagados);
      setHumosVisibles((actuales) =>
        [...new Set([...actuales, fuegoId])]
      );

      if (humoTimerRef.current[fuegoId]) {
        clearTimeout(humoTimerRef.current[fuegoId]);
      }

      humoTimerRef.current[fuegoId] = setTimeout(() => {
        setHumosVisibles((actuales) =>
          actuales.filter((id) => id !== fuegoId)
        );
        delete humoTimerRef.current[fuegoId];
      }, 1500);

      // El reloj se habilita cuando se apagan los cuatro fuegos.
      if (
        esperandoApagarFuego &&
        nuevosApagados.length === FUEGOS_ESCENA6.length
      ) {
        setEsperandoApagarFuego(false);
        setRelojVisible(true);
        mostrarExpresion("sorprendido", "derecha");
      }
    };

    const iniciarLuz = () => {
      setMomentoTexto(null);
      setTipoAudio("espera");
      setNarradorActivo(false);
      setLuzActiva(true);

      if (luzTimerRef.current) {
        clearTimeout(luzTimerRef.current);
      }

      luzTimerRef.current = setTimeout(() => {
        onCapituloDesbloqueado?.(7);
        onEscenaTerminada?.();
      }, 2200);
    };

    const manejarFinAudio = () => {
      if (tipoAudio === "objeto") {
        // Después del audio del reloj, este cae y comienza el audio 8.
        if (objetoEnAudio === "reloj") {
          setObjetoEnAudio(null);
          setRelojIntentando(false);
          setRelojCayendo(true);
          setMomentoTexto(8);
          reproducirAudio(AUDIOS_ESCENA6[8], 8, "principal");
          return;
        }

        const objetoTerminado = objetoEnAudio;
        const siguiente = SIGUIENTE_OBJETO[objetoTerminado];

        setObjetoActivo(null);
        setObjetoEnAudio(null);
        setObjetoPulsando(null);
        setObjetoDescubierto(null);

        if (objetoTerminado === "urna") {
          mostrarExpresion("pensativo", "derecha");
        } else if (objetoTerminado === "cincel") {
          mostrarExpresion("feliz", "izquierda");
        } else if (objetoTerminado === "amuleto") {
          mostrarExpresion("sorprendido", "derecha");
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

        // Encontrados los tres objetos, la batalla se intensifica.
        setObjetoVisible(null);
        setFaseBusqueda("oculto");
        setPosicionEscondite(0);
        setBatallaIntensa(true);
        setMomentoTexto(6);
        reproducirAudio(AUDIOS_ESCENA6[6], 6, "principal");
        return;
      }

      // Audio 1 → audio 2.
      if (audioActual === 1) {
        setMomentoTexto(2);
        reproducirAudio(AUDIOS_ESCENA6[2], 2, "principal");
        return;
      }

      // Audio 2 terminado: comienza la búsqueda de la urna.
      if (audioActual === 2) {
        mostrarExpresion("pensativo", "derecha");
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

      // Audio 6 terminado: hay que apagar los fuegos para activar el reloj.
      if (audioActual === 6) {
        setMomentoTexto(null);
        setTipoAudio("espera");
        setNarradorActivo(false);

        if (fuegosApagados.length === FUEGOS_ESCENA6.length) {
          setRelojVisible(true);
        } else {
          setEsperandoApagarFuego(true);
        }
        return;
      }

      // Audio 8 terminado: la luz cubre la pantalla y termina la escena.
      if (audioActual === 8) {
        iniciarLuz();
      }
    };

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

    const posicionesActuales = POSICIONES_ESCENA6[objetoVisible];

    const posicionActual = posicionesActuales?.length
      ? posicionesActuales[
          posicionEscondite % posicionesActuales.length
        ]
      : { left: "50%", top: "65%" };

    // Sacudidas y destellos solo durante la desesperación y mientras se apagan los fuegos.
    const caosActivo =
      batallaIntensa &&
      !luzActiva &&
      (
        (narradorActivo && audioActual === 6) ||
        (
          esperandoApagarFuego &&
          fuegosApagados.length < FUEGOS_ESCENA6.length
        )
      );

    return (
      <div
        className={`escena-6 ${
          batallaIntensa ? "batalla-intensa" : ""
        }`}
      >
        <div
          className={`escena-6-contenido ${
            caosActivo ? "caos-activo" : ""
          }`}
        >
          <img
            src={FONDO_ESCENA6}
            alt="Campo de batalla del Imperio romano"
            className={`escena-6-fondo ${
              batallaIntensa ? "intensa" : ""
            }`}
            draggable="false"
          />

          <div
            className="escena-6-elementos-escenario"
            aria-hidden="true"
          >
            <img
              src={AGUA_ESCENA6}
              alt=""
              className="escena-6-pieza escena-6-agua"
              draggable="false"
            />
            <img
              src={COLUMNA_ESCENA6}
              alt=""
              className="escena-6-pieza escena-6-columna"
              draggable="false"
            />
            <img
              src={HUECO_ESCENA6}
              alt=""
              className="escena-6-pieza escena-6-hueco"
              draggable="false"
            />
            <img
              src={TECHO_ESCENA6}
              alt=""
              className="escena-6-pieza escena-6-techo"
              draggable="false"
            />
          </div>

          {/* Cuatro fuegos independientes usando el mismo archivo SVG. */}
          {FUEGOS_ESCENA6.map((fuego, indice) => {
            const apagado = fuegosApagados.includes(fuego.id);
            const apagando = fuegosApagando.includes(fuego.id);

            if (apagado) return null;

            return (
              <button
                key={fuego.id}
                type="button"
                data-fuego-id={fuego.id}
                className={`escena-6-fuego-boton escena-6-fuego-boton--${
                  indice + 1
                } ${apagando ? "apagando" : ""} ${
                  batallaIntensa ? "fuego-intenso" : ""
                }`}
                style={fuego.estilo}
                onClick={() => apagarFuego(fuego.id)}
                onAnimationEnd={manejarFinAnimacionFuego}
                disabled={!batallaIntensa || apagando}
                aria-label={`Apagar fuego ${indice + 1}`}
                title="Toca para apagar este fuego"
              >
                <img
                  src={FUEGO_ESCENA6}
                  alt={`Fuego ${indice + 1}`}
                  draggable="false"
                />
              </button>
            );
          })}

          {/* Cada fuego genera humo en su propia posición. */}
          {FUEGOS_ESCENA6.map((fuego) =>
            humosVisibles.includes(fuego.id) ? (
              <div
                key={`humo-${fuego.id}`}
                className="escena-6-humo"
                style={{
                  left: fuego.estilo.left,
                  bottom: fuego.humoBottom,
                  width: fuego.estilo.width,
                }}
                aria-hidden="true"
              />
            ) : null
          )}

          <div
            className={`escena-6-ambiente ${
              batallaIntensa ? "intensa" : ""
            }`}
            aria-hidden="true"
          />

          {/* Adrián aparece asustado en su posición final y no entra caminando. */}
          {!adrianHabla && (
            <div
              className="escena-6-adrian-entrada"
              onAnimationEnd={terminarEntradaAdrian}
            >
              <img
                src={EXPRESION_ASUSTADO}
                alt="Adrián asustado"
                draggable="false"
              />
            </div>
          )}

          {adrianHabla && (
            <div className="escena-6-adrian-hablando">
              <Lottie
                animationData={AdrianHablando}
                loop
                autoplay
              />
            </div>
          )}

          {expresionAdrian && (
            <img
              key={versionExpresion}
              src={
                expresionAdrian.tipo === "asustado"
                  ? EXPRESION_ASUSTADO
                  : expresionAdrian.tipo === "pensativo"
                    ? EXPRESION_PENSATIVO
                    : expresionAdrian.tipo === "feliz"
                      ? EXPRESION_FELIZ
                      : EXPRESION_SORPRENDIDO
              }
              alt={`Adrián ${expresionAdrian.tipo}`}
              className={`escena-6-expresion escena-6-expresion--${
                expresionAdrian.lado
              } ${
                faseExpresion === "salida" ? "saliendo" : "entrando"
              }`}
              onAnimationEnd={manejarFinAnimacionExpresion}
              draggable="false"
              aria-hidden="true"
            />
          )}

          <audio
            ref={audioRef}
            onEnded={manejarFinAudio}
            preload="auto"
          />

          {textoNarracionActivo &&
            momentoTexto !== null &&
            TEXTOS_ESCENA6[momentoTexto] && (
              <div
                className="escena-6-texto-narracion"
                key={momentoTexto}
              >
                {TEXTOS_ESCENA6[momentoTexto]}
              </div>
            )}

          {esperandoApagarFuego &&
            fuegosApagados.length < FUEGOS_ESCENA6.length && (
              <div className="escena-6-instruccion-fuego">
                ¡Apaga el fuego para que el reloj responda!
              </div>
            )}

          {objetoVisible && OBJETOS[objetoVisible] && (
            <button
              type="button"
              className={`escena-6-objeto-boton fase-${faseBusqueda} ${
                objetoDescubierto === objetoVisible ? "descubierto" : ""
              } ${
                objetoActivo === objetoVisible ? "modal-abierto" : ""
              } ${
                objetoPulsando === objetoVisible ? "pulsando" : ""
              }`}
              data-objeto={objetoVisible}
              style={{
                left: posicionActual.left,
                top: posicionActual.top,
              }}
              onClick={() => reproducirObjeto(objetoVisible)}
              aria-label={OBJETOS[objetoVisible].etiqueta}
            >
              <img
                src={OBJETOS[objetoVisible].imagen}
                alt={OBJETOS[objetoVisible].alt}
                draggable="false"
              />
            </button>
          )}

          {relojVisible && !relojCayendo && (
            <button
              type="button"
              className={`escena-6-reloj-boton ${
                relojDescubierto ? "descubierto" : ""
              } ${
                relojIntentando ? "intentando" : ""
              }`}
              onClick={() => reproducirObjeto("reloj")}
              aria-label="Activar reloj"
            >
              <img
                src={RelojCerrado}
                alt="Reloj cerrado"
                className="escena-6-reloj-cerrado"
                draggable="false"
              />
            </button>
          )}

          {relojCayendo && (
            <div className="escena-6-reloj-caido">
              <img
                src={RelojCerrado}
                alt="Reloj caído entre los escombros"
                className="escena-6-reloj-cerrado"
                draggable="false"
              />
            </div>
          )}

          {objetoActivo && OBJETOS[objetoActivo] && (
            <div
              className="escena-6-modal-fondo"
              onClick={cerrarModal}
            >
              <div
                className="escena-6-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="escena-6-modal-titulo"
                onClick={(evento) => evento.stopPropagation()}
              >
                <div className="escena-6-modal-imagen">
                  <img
                    src={OBJETOS[objetoActivo].imagen}
                    alt={OBJETOS[objetoActivo].alt}
                    draggable="false"
                  />
                </div>

                <div className="escena-6-modal-info">
                  <h2 id="escena-6-modal-titulo">
                    {OBJETOS[objetoActivo].titulo}
                  </h2>
                  <p>{OBJETOS[objetoActivo].texto}</p>
                </div>

                <button
                  type="button"
                  className="escena-6-modal-cerrar"
                  onClick={cerrarModal}
                  aria-label="Cerrar información"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Destellos blancos por encima de toda la escena durante el caos. */}
          {caosActivo && (
            <div
              className="escena-6-destellos"
              aria-hidden="true"
            />
          )}

          {luzActiva && (
            <div
              className="escena-6-luz"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    );
  }
);

Escena6.displayName = "Escena6";

export default Escena6;