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
   BUSCADOR DE AUDIOS
   Encuentra Esc7Audio1 a Esc7Audio7 sin importar
   mayúsculas. Si falta alguno, avisa en la consola.
===================================================== */

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

const buscarAudio = (nombre) => {

  const ruta = Object.keys(SONIDOS).find(
    (r) => nombreSinExtension(r) === nombre.toLowerCase()
  );

  if (ruta) {
    return SONIDOS[ruta];
  }

  console.warn("[Escena 7] No se encontró el audio:", nombre);

  return null;

};

const AUDIOS_ESCENA7 = {
  1: buscarAudio("Esc7Audio1"),
  2: buscarAudio("Esc7Audio2"),
  3: buscarAudio("Esc7Audio3"),
  4: buscarAudio("Esc7Audio4"),
  5: buscarAudio("Esc7Audio5"),
  6: buscarAudio("Esc7Audio6"),
  7: buscarAudio("Esc7Audio7")
};


/* =====================================================
   FONDO DE LA ESCENA
   Prueba estas rutas en orden hasta que una cargue.
===================================================== */

const FONDOS_ESCENA7 = [
  "/Escenarios/cueva2.svg",
  "/cueva2.svg",
  "/Escenarios/Cueva2.svg",
  "/Cueva2.svg"
];


/* =====================================================
   SUBTÍTULOS (el número es el del audio)
===================================================== */

const TEXTOS_ESCENA7 = {
  1: "Estoy de vuelta ¿Qué acaba de pasar? El reloj no está...",
  2: "Claro, se quedó allí, en medio del Imperio romano.",
  3: "He recorrido Atenas, el Ágora y Roma. He visto lugares, personas y acontecimientos que forman parte de nuestra historia.",
  4: "He visto cómo pensamos, cómo vivimos, cómo luchamos y cómo construimos nuestra sociedad.",
  5: "Pero todavía hay algo que no logro comprender. ¿Qué es realmente ese reloj? ¿Por qué me llevó precisamente a esos momentos?",
  6: "Y ahora está allí, en algún lugar del Imperio romano. Supongo que algún día sabremos qué ocurrió con él.",
  7: "Por ahora, solo puedo quedarme con lo que he visto y con las preguntas que este viaje deja atrás."
};


const Escena7 = forwardRef(
  (
    {
      textoNarracionActivo = true,
      onNarradorEstadoChange
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
       ESTADOS
       Al inicio no suena nada: Adrián solo camina.
    ===================================================== */

    const [adrianHabla, setAdrianHabla] = useState(false);
    const [audioActual, setAudioActual] = useState(0);
    const [tipoAudio, setTipoAudio] = useState("espera");
    const [narradorActivo, setNarradorActivo] = useState(false);
    const [momentoTexto, setMomentoTexto] = useState(null);

    const [alejando, setAlejando] = useState(false);
    const [oscureciendo, setOscureciendo] = useState(false);
    const [mostrarFin, setMostrarFin] = useState(false);

    const [fondoIndice, setFondoIndice] = useState(0);


    /* =====================================================
       REFERENCIAS
    ===================================================== */

    const audioRef = useRef(null);
    const habloRef = useRef(false);
    const finTimerRef = useRef(null);


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
        if (finTimerRef.current) {
          clearTimeout(finTimerRef.current);
        }
      };
    }, []);


    /* =====================================================
       REPRODUCIR AUDIO
    ===================================================== */

    const reproducirAudio = (audio, numero) => {
      const reproductor = audioRef.current;
      if (!reproductor || !audio) return;

      reproductor.pause();
      reproductor.src = audio;
      reproductor.load();
      reproductor.currentTime = 0;

      setAudioActual(numero);
      setTipoAudio("principal");
      setNarradorActivo(true);

      reproductor.play().catch((error) => {
        console.error("No se pudo reproducir el audio de Escena 7:", error);
      });
    };


    /* =====================================================
       PASAR AL SIGUIENTE AUDIO
       En el último, la cámara empieza a alejarse.
    ===================================================== */

    const siguienteAudio = (numero) => {
      setMomentoTexto(numero);

      if (numero === 7) {
        setAlejando(true);
      }

      reproducirAudio(AUDIOS_ESCENA7[numero], numero);
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
      siguienteAudio(1);
    };


    /* =====================================================
       FIN DE AUDIO
    ===================================================== */

    const manejarFinAudio = () => {

      // Audios 1 a 6 → pasan solos al siguiente
      if (audioActual >= 1 && audioActual < 7) {
        siguienteAudio(audioActual + 1);
        return;
      }

      // Audio 7 → la pantalla se oscurece y aparece el texto final
      if (audioActual === 7) {
        setMomentoTexto(null);
        setTipoAudio("espera");
        setNarradorActivo(false);
        setOscureciendo(true);

        finTimerRef.current = setTimeout(() => {
          setMostrarFin(true);
        }, 2200);
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
       SI UN FONDO NO CARGA, PRUEBA EL SIGUIENTE
    ===================================================== */

    const probarOtroFondo = () => {
      if (fondoIndice < FONDOS_ESCENA7.length - 1) {
        setFondoIndice((actual) => actual + 1);
      } else {
        console.warn("[Escena 7] No se encontró el fondo cueva2.svg.");
      }
    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (
      <div className="escena-5 escena-7">
        <div className="escena-5-contenido">

          {/* CÁMARA: fondo y Adrián (se aleja al final) */}
          <div
            className={`escena-7-camara ${alejando ? "alejando" : ""}`}
          >

            <img
              src={FONDOS_ESCENA7[fondoIndice]}
              alt="Cueva"
              className="escena-5-fondo"
              onError={probarOtroFondo}
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

          </div>

          {/* AUDIO ÚNICO DE LA ESCENA */}
          <audio
            ref={audioRef}
            onEnded={manejarFinAudio}
            preload="auto"
          />

          {/* SUBTÍTULOS */}
          {textoNarracionActivo &&
            momentoTexto !== null &&
            TEXTOS_ESCENA7[momentoTexto] && (
              <div className="escena-5-texto-narracion">
                {TEXTOS_ESCENA7[momentoTexto]}
              </div>
            )}

          {/* FUNDIDO A NEGRO */}
          <div
            className={`escena-7-fundido ${oscureciendo ? "activo" : ""}`}
            aria-hidden="true"
          />

          {/* TEXTO FINAL */}
          {mostrarFin && (
            <div className="escena-7-fin">
              <p>La historia continúa...</p>
            </div>
          )}

        </div>
      </div>
    );
  }
);

Escena7.displayName = "Escena7";

export default Escena7;