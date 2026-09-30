import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
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

import "./Escenas.css";

const Lottie = lottieReact.default;

const Escena2 = forwardRef(
  (
    {
      textoNarracionActivo = true,
      onNarradorEstadoChange,
      onNarracionTerminada
    },
    ref
  ) => {

    /* =====================================================
       AUDIOS DE LA ESCENA 2
    ===================================================== */

    const audiosAdrian = [
      Esc2Audio1,
      Esc2Audio2,
      Esc2Audio3,
      Esc2Audio4,
      Esc2Audio5,
      Esc2Audio6,
      Esc2Audio7,
      Esc2Audio8
    ];


    /* =====================================================
       SUBTÍTULOS DE LA ESCENA 2

       IMPORTANTE:
       Aquí van los textos correspondientes a cada audio.

       Por ahora dejo identificados los 8 espacios porque
       en el código que me enviaste no vienen las
       transcripciones de los audios.
    ===================================================== */

    const subtitulosAdrian = [
      "SUBTÍTULO DEL AUDIO 1",
      "SUBTÍTULO DEL AUDIO 2",
      "SUBTÍTULO DEL AUDIO 3",
      "SUBTÍTULO DEL AUDIO 4",
      "SUBTÍTULO DEL AUDIO 5",
      "SUBTÍTULO DEL AUDIO 6",
      "SUBTÍTULO DEL AUDIO 7",
      "SUBTÍTULO DEL AUDIO 8"
    ];


    /* =====================================================
       ESTADOS
    ===================================================== */

    const [adrianVisible, setAdrianVisible] = useState(false);

    const [mostrarResplandor, setMostrarResplandor] =
      useState(false);

    const [audioActual, setAudioActual] = useState(0);

    const [narradorActivo, setNarradorActivo] =
      useState(true);


    /* =====================================================
       REFERENCIAS
    ===================================================== */

    const audioRef = useRef(null);


    /* =====================================================
       ENTRADA DE ESCENA

       Adrián aparece con un pequeño "PUM" de resplandor.
       El resplandor solamente rodea a Adrián.
    ===================================================== */

    useEffect(() => {

      setAdrianVisible(true);

      setMostrarResplandor(true);

      const quitarResplandor = setTimeout(() => {
        setMostrarResplandor(false);
      }, 900);

      return () => {
        clearTimeout(quitarResplandor);
      };

    }, []);


    /* =====================================================
       AVISAR AL PADRE DEL ESTADO DEL NARRADOR
    ===================================================== */

    useEffect(() => {

      if (onNarradorEstadoChange) {
        onNarradorEstadoChange(narradorActivo);
      }

    }, [
      narradorActivo,
      onNarradorEstadoChange
    ]);


    /* =====================================================
       REPRODUCCIÓN DEL AUDIO

       Cada vez que cambia el audio, si el narrador está
       activo, se reproduce automáticamente.
    ===================================================== */

    useEffect(() => {

      const audio = audioRef.current;

      if (!audio || !adrianVisible) {
        return;
      }

      if (!narradorActivo) {
        audio.pause();
        return;
      }

      audio.load();

      audio
        .play()
        .catch((error) => {

          console.error(
            "No se pudo reproducir el audio de Escena 2:",
            error
          );

          setNarradorActivo(false);
        });

    }, [
      audioActual,
      adrianVisible,
      narradorActivo
    ]);


    /* =====================================================
       INICIO AUTOMÁTICO DEL NARRADOR
    ===================================================== */

    useEffect(() => {

      setNarradorActivo(true);

      return () => {

        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }

      };

    }, []);


    /* =====================================================
       CONTROL DEL NARRADOR

       El botón superior utiliza esta función mediante ref.
    ===================================================== */

    const toggleNarracion = () => {

      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      if (narradorActivo) {

        audio.pause();

        setNarradorActivo(false);

      } else {

        audio
          .play()
          .then(() => {
            setNarradorActivo(true);
          })
          .catch((error) => {

            console.error(
              "No se pudo reanudar la narración:",
              error
            );

          });

      }

    };


    /* =====================================================
       EXPONER LA FUNCIÓN AL PADRE
    ===================================================== */

    useImperativeHandle(ref, () => ({
      toggleNarracion
    }));


    /* =====================================================
       FIN DE CADA AUDIO
    ===================================================== */

    const manejarFinAudio = () => {

      if (audioActual < audiosAdrian.length - 1) {

        setAudioActual(
          (anterior) => anterior + 1
        );

      } else {

        setNarradorActivo(false);

        if (onNarracionTerminada) {
          onNarracionTerminada();
        }

      }

    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

      <div className="escena-2">

        <div className="escena-2-contenido">


          {/* =================================================
             FONDO
          ================================================= */}

          <img
            src="/Escenarios/FondoAtenas.svg"
            alt="Atenas"
            className="escena-2-fondo"
          />


          {/* =================================================
             ELEMENTOS DEL ESCENARIO
          ================================================= */}

          <svg
            className="escena-2-overlay"
            viewBox="0 0 1024 598"
            preserveAspectRatio="none"
          >

            <image
              href="/Escenarios/arbol1.svg"
              x="939"
              y="79"
              width="120"
              height="278"
            />

            <image
              href="/Escenarios/arbol2.svg"
              x="914"
              y="105"
              width="70"
              height="250"
            />

            <image
              href="/Escenarios/arbusto1.svg"
              x="890"
              y="300"
              width="150"
              height="100"
            />

            <image
              href="/Escenarios/arbusto2.svg"
              x="425"
              y="323"
              width="90"
              height="85"
            />

            <image
              href="/Escenarios/arbusto3.svg"
              x="223"
              y="300"
              width="110"
              height="105"
            />

          </svg>


          {/* =================================================
             ADRIÁN + RESPLANDOR
          ================================================= */}

          {adrianVisible && (

            <div className="escena-2-adrian-aparicion">

              {mostrarResplandor && (
                <div className="escena-2-resplandor-adrian" />
              )}

              <div className="escena-2-adrian-hablando">

                <Lottie
                  animationData={AdrianHablando}
                  loop={true}
                  autoplay={true}
                />

              </div>

            </div>

          )}


          {/* =================================================
             SUBTÍTULOS

             Se muestran automáticamente porque
             textoNarracionActivo empieza en true.
          ================================================= */}

          {textoNarracionActivo && (

            <div className="escena-2-subtitulos">

              {subtitulosAdrian[audioActual]}

            </div>

          )}


          {/* =================================================
             AUDIO
          ================================================= */}

          <audio
            ref={audioRef}
            src={audiosAdrian[audioActual]}
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