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

import Es1Platon from "../../AssetsNuevos/Es1Platon.svg";
import Es1Pergamino from "../../AssetsNuevos/Es1Pergamino.svg";
import Es1copa from "../../AssetsNuevos/Es1copa.svg";
import reloj from "../../AssetsNuevos/reloj.svg";

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
       AUDIOS ESCENA 2
    ===================================================== */

    const audiosEscena2 = {
      1: Esc2Audio1,
      2: Esc2Audio2,
      3: Esc2Audio3,
      4: Esc2Audio4,
      5: Esc2Audio5,
      6: Esc2Audio6,
      7: Esc2Audio7,
      8: Esc2Audio8
    };


    /* =====================================================
       SUBTÍTULOS
    ===================================================== */

    const subtitulosEscena2 = {

      1:
        "Estoy en Atenas... Pero este no es el lugar donde estaba hace un momento. Ese extraño objeto me ha traído hasta aquí. Estamos en una de las zonas donde se concentra gran parte de nuestra vida cultural e intelectual. Atenas es hogar de pensadores que cuestionan, enseñan y buscan comprender el mundo que nos rodea. Y si el reloj me ha traído hasta aquí, quizás haya una razón.",

      2:
        "Reconozco este libro. Es La República, de Platón. Platón reflexiona aquí sobre la justicia, la educación y la manera en que debería organizarse una sociedad.",

      3:
        "Sus ideas generan debates que siguen muy presentes entre quienes buscan comprender cómo debería funcionar nuestra ciudad.",

      4:
        "Y este pergamino pertenece a Aristóteles. Él estudia prácticamente todo lo que despierta su curiosidad: la filosofía, la política, la naturaleza y la lógica.",

      5:
        "Su objetivo es comprender cómo funciona el mundo, no simplemente aceptar las cosas como son.",

      6:
        "Esta copa tiene una historia mucho más difícil. Está relacionada con Sócrates y con uno de los momentos más recordados de nuestra historia.",

      7:
        "Después de ser condenado a muerte en Atenas, Sócrates bebe la cicuta y permanece fiel a sus principios hasta el final. Su historia nos recuerda que cuestionar lo que creemos saber también puede tener consecuencias.",

      8:
        "Otra vez... Cada vez que este objeto se activa, me lleva a otro lugar. Pero ¿por qué me está mostrando estos momentos?"

    };


    /* =====================================================
       ESTADOS DE ADRIÁN
    ===================================================== */

    const [adrianVisible, setAdrianVisible] =
      useState(false);

    const [mostrarResplandor, setMostrarResplandor] =
      useState(false);


    /* =====================================================
       AUDIO ACTUAL

       1 = introducción
       2 = introducción Platón
       3 = audio Platón
       4 = introducción Pergamino
       5 = audio Pergamino
       6 = introducción Copa
       7 = audio Copa
       8 = Reloj
    ===================================================== */

    const [audioActual, setAudioActual] =
      useState(0);


    /* =====================================================
       TIPO DE AUDIO

       principal = narración automática
       objeto = audio del objeto
       espera = esperando clic
    ===================================================== */

    const [tipoAudio, setTipoAudio] =
      useState("espera");


    /* =====================================================
       NARRADOR
    ===================================================== */

    const [narradorActivo, setNarradorActivo] =
      useState(true);


    /* =====================================================
       OBJETO VISIBLE

       SOLO UNO A LA VEZ.
    ===================================================== */

    const [objetoVisible, setObjetoVisible] =
      useState(null);


    /* =====================================================
       OBJETO DESCUBIERTO
    ===================================================== */

    const [objetoDescubierto, setObjetoDescubierto] =
      useState(null);


    /* =====================================================
       OBJETO QUE ESTÁ HACIENDO PULSO
    ===================================================== */

    const [objetoPulsando, setObjetoPulsando] =
      useState(null);


    /* =====================================================
       MODAL
    ===================================================== */

    const [objetoActivo, setObjetoActivo] =
      useState(null);


    /* =====================================================
       OBJETO CUYO AUDIO ESTÁ SONANDO
    ===================================================== */

    const [objetoEnAudio, setObjetoEnAudio] =
      useState(null);


    /* =====================================================
       TEXTO ACTUAL
    ===================================================== */

    const [momentoTexto, setMomentoTexto] =
      useState(null);


    /* =====================================================
       OBJETOS ENCONTRADOS
    ===================================================== */

    const [objetosDescubiertos, setObjetosDescubiertos] =
      useState([]);


    /* =====================================================
       AUDIO
    ===================================================== */

    const audioRef = useRef(null);


    /* =====================================================
       ENTRADA DE ESCENA
    ===================================================== */

    useEffect(() => {

      setAdrianVisible(true);

      setMostrarResplandor(true);

      const quitarResplandor =
        setTimeout(() => {

          setMostrarResplandor(false);

        }, 900);


      return () => {

        clearTimeout(
          quitarResplandor
        );

      };

    }, []);


    /* =====================================================
       INFORMAR ESTADO DEL NARRADOR AL PADRE
    ===================================================== */

    useEffect(() => {

      if (onNarradorEstadoChange) {

        onNarradorEstadoChange(
          narradorActivo
        );

      }

    }, [
      narradorActivo,
      onNarradorEstadoChange
    ]);


    /* =====================================================
       REPRODUCIR AUDIO
    ===================================================== */

    const reproducirAudio = (
      audio,
      numero,
      tipo,
      objeto = null,
      momento = null
    ) => {

      const reproductor =
        audioRef.current;


      if (!reproductor) {
        return;
      }


      reproductor.pause();

      reproductor.src = audio;

      reproductor.load();

      reproductor.currentTime = 0;


      setAudioActual(numero);

      setTipoAudio(tipo);

      setObjetoEnAudio(objeto);

      setMomentoTexto(momento);

      setNarradorActivo(true);


      reproductor
        .play()
        .catch((error) => {

          console.error(
            "No se pudo reproducir el audio de Escena 2:",
            error
          );

          setNarradorActivo(false);

        });

    };


    /* =====================================================
       INICIAR AUDIO 1
    ===================================================== */

    useEffect(() => {

      if (!adrianVisible) {
        return;
      }


      reproducirAudio(
        audiosEscena2[1],
        1,
        "principal",
        null,
        1
      );


    }, [adrianVisible]);


    /* =====================================================
       LIMPIEZA
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
       REGISTRAR OBJETO ENCONTRADO
    ===================================================== */

    const registrarObjetoEncontrado = (
      objeto
    ) => {

      setObjetosDescubiertos(
        (anteriores) => {

          if (
            anteriores.includes(objeto)
          ) {

            return anteriores;

          }

          return [
            ...anteriores,
            objeto
          ];

        }
      );

    };


    /* =====================================================
       FIN DE AUDIO
    ===================================================== */

    const manejarFinAudio = () => {


      /* ===================================================
         AUDIO 1
         → AUDIO 2
         → APARECE PLATÓN
      =================================================== */

      if (
        tipoAudio === "principal" &&
        audioActual === 1
      ) {

        /*
          Platón aparece justo cuando comienza
          el Audio 2.
        */

        setObjetoVisible("platon");

        setObjetoPulsando(null);

        reproducirAudio(
          audiosEscena2[2],
          2,
          "principal",
          null,
          2
        );

        return;

      }


      /* ===================================================
         AUDIO 2
         → PLATÓN QUEDA ESPERANDO CLIC
      =================================================== */

      if (
        tipoAudio === "principal" &&
        audioActual === 2
      ) {

        setMomentoTexto(null);

        setTipoAudio("espera");

        setNarradorActivo(false);

        return;

      }


      /* ===================================================
         AUDIO 3 - PLATÓN
         → DESAPARECE PLATÓN
         → APARECE PERGAMINO
         → AUDIO 4
      =================================================== */

      if (
        tipoAudio === "objeto" &&
        objetoEnAudio === "platon"
      ) {

        setObjetoActivo(null);

        setObjetoEnAudio(null);

        setObjetoDescubierto(null);

        setObjetoPulsando(null);

        setObjetoVisible(
          "pergamino"
        );


        reproducirAudio(
          audiosEscena2[4],
          4,
          "principal",
          null,
          4
        );

        return;

      }


      /* ===================================================
         AUDIO 4
         → PERGAMINO QUEDA ESPERANDO CLIC
      =================================================== */

      if (
        tipoAudio === "principal" &&
        audioActual === 4
      ) {

        setMomentoTexto(null);

        setTipoAudio("espera");

        setNarradorActivo(false);

        return;

      }


      /* ===================================================
         AUDIO 5 - PERGAMINO
         → DESAPARECE PERGAMINO
         → APARECE COPA
         → AUDIO 6
      =================================================== */

      if (
        tipoAudio === "objeto" &&
        objetoEnAudio === "pergamino"
      ) {

        setObjetoActivo(null);

        setObjetoEnAudio(null);

        setObjetoDescubierto(null);

        setObjetoPulsando(null);

        setObjetoVisible(
          "copa"
        );


        reproducirAudio(
          audiosEscena2[6],
          6,
          "principal",
          null,
          6
        );

        return;

      }


      /* ===================================================
         AUDIO 6
         → COPA QUEDA ESPERANDO CLIC
      =================================================== */

      if (
        tipoAudio === "principal" &&
        audioActual === 6
      ) {

        setMomentoTexto(null);

        setTipoAudio("espera");

        setNarradorActivo(false);

        return;

      }


      /* ===================================================
         AUDIO 7 - COPA
         → DESAPARECE COPA
         → APARECE RELOJ
         → AUDIO 8
      =================================================== */

      if (
        tipoAudio === "objeto" &&
        objetoEnAudio === "copa"
      ) {

        setObjetoActivo(null);

        setObjetoEnAudio(null);

        setObjetoDescubierto(null);

        setObjetoPulsando(null);

        setObjetoVisible(
          "reloj"
        );


        reproducirAudio(
          audiosEscena2[8],
          8,
          "principal",
          null,
          8
        );

        return;

      }


      /* ===================================================
         AUDIO 8
         → FINAL
      =================================================== */

      if (
        tipoAudio === "principal" &&
        audioActual === 8
      ) {

        setNarradorActivo(false);

        setTipoAudio("espera");

        if (onNarracionTerminada) {

          onNarracionTerminada();

        }

      }

    };


    /* =====================================================
       CLICK EN LOS OBJETOS
    ===================================================== */

    const reproducirObjeto = (
      objeto
    ) => {

      let audio = null;

      let numeroAudio = null;

      let momento = null;


      /* ===================================================
         PLATÓN
         → AUDIO 3
      =================================================== */

      if (
        objeto === "platon"
      ) {

        audio =
          audiosEscena2[3];

        numeroAudio = 3;

        momento = 3;

      }


      /* ===================================================
         PERGAMINO
         → AUDIO 5
      =================================================== */

      if (
        objeto === "pergamino"
      ) {

        audio =
          audiosEscena2[5];

        numeroAudio = 5;

        momento = 5;

      }


      /* ===================================================
         COPA
         → AUDIO 7
      =================================================== */

      if (
        objeto === "copa"
      ) {

        audio =
          audiosEscena2[7];

        numeroAudio = 7;

        momento = 7;

      }


      if (!audio) {
        return;
      }


      /* ===================================================
         DESCUBRIR OBJETO
      =================================================== */

      setObjetoDescubierto(
        objeto
      );

      registrarObjetoEncontrado(
        objeto
      );


      /*
        Al abrir nuevamente el modal,
        detenemos momentáneamente el pulso.
      */

      setObjetoPulsando(null);


      /* ===================================================
         ABRIR MODAL
      =================================================== */

      setObjetoActivo(
        objeto
      );


      /* ===================================================
         REPRODUCIR AUDIO
      =================================================== */

      reproducirAudio(
        audio,
        numeroAudio,
        "objeto",
        objeto,
        momento
      );

    };


    /* =====================================================
       CERRAR MODAL
    ===================================================== */

    const cerrarModal = () => {

      setObjetoActivo(null);


      /*
        Cuando cerramos el modal,
        el objeto comienza a palpitar.
      */

      if (objetoVisible) {

        setObjetoPulsando(
          objetoVisible
        );

      }

    };


    /* =====================================================
       BOTÓN NARRADOR
    ===================================================== */

    const toggleNarracion = () => {

      const audio =
        audioRef.current;


      if (!audio) {
        return;
      }


      /*
        Si estamos esperando un clic
        en un objeto, el narrador no inicia
        ningún audio nuevo.
      */

      if (
        tipoAudio === "espera"
      ) {

        return;

      }


      /* ===================================================
         PAUSAR
      =================================================== */

      if (
        !audio.paused
      ) {

        audio.pause();

        setNarradorActivo(
          false
        );

        return;

      }


      /* ===================================================
         REANUDAR
      =================================================== */

      audio
        .play()
        .then(() => {

          setNarradorActivo(
            true
          );

        })
        .catch((error) => {

          console.error(
            "No se pudo reanudar la narración:",
            error
          );

        });

    };


    /* =====================================================
       EXPONER AL PADRE
    ===================================================== */

    useImperativeHandle(
      ref,
      () => ({
        toggleNarracion
      }),
      [tipoAudio]
    );


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
              x="923"
              y="62"
              width="108"
              height="292"
            />

            <image
              href="/Escenarios/arbol2.svg"
              x="884"
              y="94"
              width="82"
              height="265"
            />

            <image
              href="/Escenarios/arbusto1.svg"
              x="850"
              y="296"
              width="174"
              height="120"
            />

            <image
              href="/Escenarios/arbusto2.svg"
              x="398"
              y="322"
              width="100"
              height="92"
            />

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

                <div
                  className="
                    escena-2-resplandor-adrian
                  "
                />

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
          ================================================= */}

          {textoNarracionActivo &&
            momentoTexto !== null &&
            subtitulosEscena2[momentoTexto] && (

              <div
                className="escena-2-subtitulos"
                key={momentoTexto}
              >

                {subtitulosEscena2[momentoTexto]}

              </div>

            )}


          {/* =================================================
             PLATÓN
          ================================================= */}

          {objetoVisible === "platon" && (

            <button
              className={`
                escena-2-platon-boton

                ${
                  objetoDescubierto === "platon"
                    ? "descubierto"
                    : ""
                }

                ${
                  objetoPulsando === "platon"
                    ? "pulsando"
                    : ""
                }
              `}
              onClick={() =>
                reproducirObjeto(
                  "platon"
                )
              }
              aria-label="Explorar Platón"
            >

              <img
                src={Es1Platon}
                alt="Platón"
                className="escena-2-platon"
              />

            </button>

          )}


          {/* =================================================
             PERGAMINO
          ================================================= */}

          {objetoVisible === "pergamino" && (

            <button
              className={`
                escena-2-pergamino-boton

                ${
                  objetoDescubierto === "pergamino"
                    ? "descubierto"
                    : ""
                }

                ${
                  objetoPulsando === "pergamino"
                    ? "pulsando"
                    : ""
                }
              `}
              onClick={() =>
                reproducirObjeto(
                  "pergamino"
                )
              }
              aria-label="Explorar pergamino"
            >

              <img
                src={Es1Pergamino}
                alt="Pergamino"
                className="escena-2-pergamino"
              />

            </button>

          )}


          {/* =================================================
             COPA
          ================================================= */}

          {objetoVisible === "copa" && (

            <button
              className={`
                escena-2-copa-boton

                ${
                  objetoDescubierto === "copa"
                    ? "descubierto"
                    : ""
                }

                ${
                  objetoPulsando === "copa"
                    ? "pulsando"
                    : ""
                }
              `}
              onClick={() =>
                reproducirObjeto(
                  "copa"
                )
              }
              aria-label="Explorar copa"
            >

              <img
                src={Es1copa}
                alt="Copa"
                className="escena-2-copa"
              />

            </button>

          )}


          {/* =================================================
             RELOJ

             POR AHORA SOLO APARECE.
          ================================================= */}

          {objetoVisible === "reloj" && (

            <div className="escena-2-reloj">

              <img
                src={reloj}
                alt="Reloj"
              />

            </div>

          )}


          {/* =================================================
             MODAL
          ================================================= */}

          {objetoActivo && (

            <div
              className="escena-2-modal-fondo"
              onClick={cerrarModal}
            >

              <div
                className="escena-2-modal"
                onClick={(evento) =>
                  evento.stopPropagation()
                }
              >

                <div
                  className="escena-2-modal-imagen"
                >

                  {objetoActivo === "platon" && (

                    <img
                      src={Es1Platon}
                      alt="Platón"
                    />

                  )}

                  {objetoActivo === "pergamino" && (

                    <img
                      src={Es1Pergamino}
                      alt="Pergamino"
                    />

                  )}

                  {objetoActivo === "copa" && (

                    <img
                      src={Es1copa}
                      alt="Copa"
                    />

                  )}

                </div>

                <div
                  className="escena-2-modal-info"
                >


                  {objetoActivo === "platon" && (

                    <>

                      <h2>
                        PLATÓN
                      </h2>

                      <p>
                       Platón reflexiona aquí sobre la justicia, la educación y la manera en que debería organizarse una sociedad. Sus ideas generan debates que siguen muy presentes entre quienes buscan comprender cómo debería funcionar nuestra ciudad.
                      </p>

                    </>

                  )}


                  {objetoActivo === "pergamino" && (

                    <>

                      <h2>
                        PERGAMINO
                      </h2>

                      <p>
                       Él estudia prácticamente todo lo que despierta su curiosidad: la filosofía, la política, la naturaleza y la lógica. Su objetivo es comprender cómo funciona el mundo, no simplemente aceptar las cosas como son.
                      </p>

                    </>

                  )}


                  {objetoActivo === "copa" && (

                    <>

                      <h2>
                        COPA
                      </h2>

                      <p>
                       Después de ser condenado a muerte en Atenas, Sócrates bebe la cicuta y permanece fiel a sus principios hasta el final. Su historia nos recuerda que cuestionar lo que creemos saber también puede tener consecuencias.
                      </p>

                    </>

                  )}

                </div>


                <button
                  className="escena-2-modal-cerrar"
                  onClick={cerrarModal}
                  aria-label="Cerrar información"
                >
                  ×
                </button>

              </div>

            </div>

          )}


          <audio
            ref={audioRef}
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