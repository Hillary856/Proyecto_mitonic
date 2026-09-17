import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";

import lottieReact from "lottie-react";

import AdrianHablando from "../../assets/AdrianHablando.json";

import Esc3Audio1 from "../../Audios/Esc3Audio1.mp3";
import Esc3Audio2 from "../../Audios/Esc3Audio2.mp3";
import Esc3Audio3 from "../../Audios/Esc3Audio3.mp3";
import Esc3Audio4 from "../../Audios/Esc3Audio4.mp3";
import Esc3Audio5 from "../../Audios/Esc3Audio5.mp3";
import Esc3Audio6 from "../../Audios/Esc3Audio6.mp3";

import "./Escenas.css";

const Lottie = lottieReact.default;


const Escena3 = forwardRef(
  ({ onNarradorEstadoChange }, ref) => {

    /* =====================================================
       AUDIOS
    ===================================================== */

    const audiosAdrian = [
      Esc3Audio1,
      Esc3Audio2,
      Esc3Audio3,
      Esc3Audio4,
      Esc3Audio5,
      Esc3Audio6
    ];


    /* =====================================================
       ESTADOS
    ===================================================== */

    const [adrianVisible, setAdrianVisible] = useState(false);

    const [audioActual, setAudioActual] = useState(0);

    const [narradorActivo, setNarradorActivo] = useState(false);


    /* =====================================================
       REFERENCIA
    ===================================================== */

    const audioRef = useRef(null);


    /* =====================================================
       MOSTRAR ADRIÁN
    ===================================================== */

    useEffect(() => {

      setAdrianVisible(true);

    }, []);


    /* =====================================================
       AVISAR ESTADO
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
       REPRODUCCIÓN
    ===================================================== */

    useEffect(() => {

      const audio = audioRef.current;

      if (!audio) return;


      if (!narradorActivo) {

        audio.pause();

        return;

      }


      audio
        .play()
        .catch((error) => {

          console.error(
            "No se pudo reproducir el audio de Escena 3:",
            error
          );

          setNarradorActivo(false);

        });

    }, [
      adrianVisible,
      audioActual,
      narradorActivo
    ]);


    /* =====================================================
       INICIO AUTOMÁTICO
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
    ===================================================== */

    const toggleNarracion = () => {

      const audio = audioRef.current;

      if (!audio) return;


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
       EXPONER AL PADRE
    ===================================================== */

    useImperativeHandle(ref, () => ({

      toggleNarracion

    }));


    /* =====================================================
       FIN DEL AUDIO
    ===================================================== */

    const manejarFinAudio = () => {

      if (
        audioActual <
        audiosAdrian.length - 1
      ) {

        setAudioActual(
          (anterior) => anterior + 1
        );

      } else {

        setNarradorActivo(false);

      }

    };


    return (

      <div className="escena-3">

        <div className="escena-3-contenido">


          {/* =================================================
              FONDO
          ================================================= */}

          <img
            src="/Escenarios/FondoAgora.svg"
            alt="Ágora"
            className="escena-3-fondo"
          />


          {/* =================================================
              ADRIÁN
          ================================================= */}

          {adrianVisible && (

            <div className="escena-3-adrian-hablando">

              <Lottie
                animationData={AdrianHablando}
                loop={true}
                autoplay={true}
              />

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

Escena3.displayName = "Escena3";

export default Escena3;