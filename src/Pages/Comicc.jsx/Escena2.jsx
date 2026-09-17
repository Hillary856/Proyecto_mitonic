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
  ({ onNarradorEstadoChange }, ref) => {

    /* =====================================================
       AUDIOS
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
       ESTADOS
    ===================================================== */

    const [adrianVisible, setAdrianVisible] = useState(false);

    const [mostrarFlash, setMostrarFlash] = useState(false);

    const [audioActual, setAudioActual] = useState(0);

    const [narradorActivo, setNarradorActivo] = useState(false);


    /* =====================================================
       REFERENCIA
    ===================================================== */

    const audioRef = useRef(null);


    /* =====================================================
       ENTRADA DE ESCENA
    ===================================================== */

    useEffect(() => {

      setMostrarFlash(true);

      setAdrianVisible(true);

      const quitarFlash = setTimeout(() => {

        setMostrarFlash(false);

      }, 250);


      return () => {

        clearTimeout(quitarFlash);

      };

    }, []);


    /* =====================================================
       AVISAR ESTADO DEL NARRADOR
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
            "No se pudo reproducir el audio de Escena 2:",
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
              ELEMENTOS
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
              RESPLANDOR
          ================================================= */}

          {mostrarFlash && (

            <div className="escena-2-resplandor" />

          )}


          {/* =================================================
              ADRIÁN
          ================================================= */}

          {adrianVisible && (

            <div className="escena-2-adrian-hablando">

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

Escena2.displayName = "Escena2";

export default Escena2;