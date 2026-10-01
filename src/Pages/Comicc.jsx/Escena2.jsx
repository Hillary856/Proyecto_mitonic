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

       Cada posición corresponde directamente al audio
       que está en la misma posición del arreglo.
    ===================================================== */

    const subtitulosAdrian = [
      "Estoy en Atenas... Pero este no es el lugar donde estaba hace un momento. Ese extraño objeto me ha traído hasta aquí. Estamos en una de las zonas donde se concentra gran parte de nuestra vida cultural e intelectual. Atenas es hogar de pensadores que cuestionan, enseñan y buscan comprender el mundo que nos rodea. Y si el reloj me ha traído hasta aquí, quizás haya una razón.",

      "Reconozco este libro. Es La República, de Platón. Platón reflexiona aquí sobre la justicia, la educación y la manera en que debería organizarse una sociedad.",

      "Sus ideas generan debates que siguen muy presentes entre quienes buscan comprender cómo debería funcionar nuestra ciudad.",

      "Y este pergamino pertenece a Aristóteles. Él estudia prácticamente todo lo que despierta su curiosidad: la filosofía, la política, la naturaleza y la lógica.",

      "Su objetivo es comprender cómo funciona el mundo, no simplemente aceptar las cosas como son.",

      "Esta copa tiene una historia mucho más difícil. Está relacionada con Sócrates y con uno de los momentos más recordados de nuestra historia.",

      "Después de ser condenado a muerte en Atenas, Sócrates bebe la cicuta y permanece fiel a sus principios hasta el final. Su historia nos recuerda que cuestionar lo que creemos saber también puede tener consecuencias.",

      "Otra vez... Cada vez que este objeto se activa, me lleva a otro lugar. Pero ¿por qué me está mostrando estos momentos?",

    ];


    /* =====================================================
       ESTADOS
    ===================================================== */

    const [adrianVisible, setAdrianVisible] = useState(false);

    const [mostrarResplandor, setMostrarResplandor] =
      useState(false);

    const [audioActual, setAudioActual] = useState(0);

    /*
      El narrador comienza ACTIVADO.
    */
    const [narradorActivo, setNarradorActivo] =
      useState(true);


    /* =====================================================
       REFERENCIA DEL AUDIO
    ===================================================== */

    const audioRef = useRef(null);


    /* =====================================================
       ENTRADA DE ESCENA

       Adrián aparece + resplandor solamente alrededor de él.
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
       AVISAR AL PADRE EL ESTADO DEL NARRADOR
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
       REPRODUCIR AUDIO ACTUAL

       IMPORTANTE:
       Cuando cambia de audio, se reinicia desde 0.
       Al pausar y reanudar NO se reinicia.
    ===================================================== */

    useEffect(() => {

      const audio = audioRef.current;

      if (!audio || !adrianVisible) {
        return;
      }

      audio.pause();

      audio.currentTime = 0;

      if (!narradorActivo) {
        return;
      }

      const reproducir = async () => {

        try {

          await audio.play();

        } catch (error) {

          console.error(
            "No se pudo reproducir el audio de Escena 2:",
            error
          );

          setNarradorActivo(false);

        }

      };

      reproducir();

    }, [
      audioActual,
      adrianVisible
    ]);


    /* =====================================================
       CONTROL DEL ESTADO DEL NARRADOR

       Cuando se activa:
       → continúa el audio desde donde quedó.

       Cuando se desactiva:
       → pausa, pero NO reinicia.
    ===================================================== */

    useEffect(() => {

      const audio = audioRef.current;

      if (!audio) {
        return;
      }

      if (narradorActivo) {

        audio
          .play()
          .catch((error) => {

            console.error(
              "No se pudo reanudar la narración:",
              error
            );

          });

      } else {

        audio.pause();

      }

    }, [narradorActivo]);


    /* =====================================================
       LIMPIAR AUDIO AL SALIR DE LA ESCENA
    ===================================================== */

    useEffect(() => {

      return () => {

        if (audioRef.current) {

          audioRef.current.pause();

          audioRef.current.currentTime = 0;

        }

      };

    }, []);


    /* =====================================================
       CONTROL DEL BOTÓN NARRADOR
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

       Esto permite que el botón superior de Narrador
       controle la Escena 2.
    ===================================================== */

    useImperativeHandle(ref, () => ({

      toggleNarracion

    }));


    /* =====================================================
       CUANDO TERMINA UN AUDIO
    ===================================================== */

    const manejarFinAudio = () => {

      if (
        audioActual <
        audiosAdrian.length - 1
      ) {

        /*
          Cambia inmediatamente al siguiente audio.
          Esto también cambia automáticamente el subtítulo.
        */

        setAudioActual(
          (anterior) => anterior + 1
        );

      } else {

        /*
          Terminó toda la narración.
        */

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

            {/* ÁRBOL 1 */}

            <image
              href="/Escenarios/arbol1.svg"
              x="923"
              y="62"
              width="108"
              height="292"
            />


            {/* ÁRBOL 2 */}

            <image
              href="/Escenarios/arbol2.svg"
              x="884"
              y="94"
              width="82"
              height="265"
            />


            {/* ARBUSTO 1 */}

            <image
              href="/Escenarios/arbusto1.svg"
              x="850"
              y="296"
              width="174"
              height="120"
            />


            {/* ARBUSTO 2 */}

            <image
              href="/Escenarios/arbusto2.svg"
              x="398"
              y="322"
              width="100"
              height="92"
            />


            {/* ARBUSTO 3 */}

            <image
              href="/Escenarios/arbusto3.svg"
              x="180"
              y="298"
              width="120"
              height="110"
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

             Se muestran automáticamente.
             El botón general de subtítulos los puede ocultar.
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