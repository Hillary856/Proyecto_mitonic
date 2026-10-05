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
/* import Esc3Audio6 from "../../Audios/Esc3Audio6.mp3"; */

import Es3Campana from "../../AssetsNuevos/Es3Campana.svg";
import Es3corona from "../../AssetsNuevos/Es3corona.svg";
import Es3racimo from "../../AssetsNuevos/Es3racimo.svg";

import "./Escenas.css";

const Lottie = lottieReact.default;


const Escena3 = forwardRef(
  (
    {
      textoNarracionActivo = true,
      onNarradorEstadoChange,
      onNarracionTerminada,
      onEscenaTerminada
    },
    ref
  ) => {

    /* =====================================================
       AUDIOS
    ===================================================== */

    const audiosEscena3 = {
      1: Esc3Audio1,
      2: Esc3Audio2,
      3: Esc3Audio3,
      4: Esc3Audio4,
      5: Esc3Audio5
      /* 6: Esc3Audio6 */
    };


    /* =====================================================
       SUBTÍTULOS
    ===================================================== */

    const subtitulosEscena3 = {

      1:
        "El Ágora. Este lugar es mucho más que una plaza. Aquí nos reunimos para comerciar, conversar y discutir sobre los asuntos que afectan a nuestra ciudad. Si prestan atención, pueden escuchar cómo las personas intercambian ideas, opiniones y argumentos. La vida pública de Atenas ocurre aquí, frente a todos.",

      2:
        "Servía para premiar y dar la máxima distinción de respeto a los líderes, jueces y sabios.",

      3:
        "Cada cosa que encontramos aquí parece mostrarnos una parte diferente de cómo funciona nuestra sociedad.",

      4:
        "Era obligatoria para todos los comerciantes y debían pesar sus productos frente al cliente, ya fueran sacos de trigo, olivas o polvo de oro.",

      5:
        "Un racimo de uvas no era una simple fruta: era el motor de la economía local, el ingrediente estrella de las grandes discusiones filosóficas impulsadas por el vino y un amuleto vivo consagrado a Dioniso para atraer la buena suerte a los negocios."

      /*
      6:
        "¡Ya está sucediendo otra vez! Cada vez que se activa me transporta a otro momento... ¿Qué está buscando?"
      */

    };


    /* =====================================================
       ADRIÁN
    ===================================================== */

    const [adrianVisible, setAdrianVisible] =
      useState(false);

    const [mostrarResplandor, setMostrarResplandor] =
      useState(false);


    /* =====================================================
       AUDIO
    ===================================================== */

    const [audioActual, setAudioActual] =
      useState(0);

    const [tipoAudio, setTipoAudio] =
      useState("espera");

    const [narradorActivo, setNarradorActivo] =
      useState(true);


    /* =====================================================
       OBJETOS
    ===================================================== */

    const [objetoVisible, setObjetoVisible] =
      useState(null);

    const [objetoDescubierto, setObjetoDescubierto] =
      useState(null);

    const [objetoPulsando, setObjetoPulsando] =
      useState(null);

    const [objetoActivo, setObjetoActivo] =
      useState(null);

    const [objetoEnAudio, setObjetoEnAudio] =
      useState(null);


    /* =====================================================
       OBJETOS ENCONTRADOS
    ===================================================== */

    const [objetosDescubiertos, setObjetosDescubiertos] =
      useState([]);


    /* =====================================================
       SUBTÍTULO
    ===================================================== */

    const [momentoTexto, setMomentoTexto] =
      useState(null);


    /* =====================================================
       BOTÓN CONTINUAR
    ===================================================== */

    const [mostrarContinuar, setMostrarContinuar] =
      useState(false);


    /* =====================================================
       AUDIO
    ===================================================== */

    const audioRef =
      useRef(null);


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
       AVISAR ESTADO DEL NARRADOR
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
            "No se pudo reproducir el audio de Escena 3:",
            error
          );

          setNarradorActivo(false);

        });

    };


    /* =====================================================
       AUDIO 1
    ===================================================== */

    useEffect(() => {

      if (!adrianVisible) {
        return;
      }

      reproducirAudio(
        audiosEscena3[1],
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
       REGISTRAR OBJETO
    ===================================================== */

    const registrarObjetoEncontrado = (
      objeto
    ) => {

      if (
        objetosDescubiertos.includes(
          objeto
        )
      ) {

        return;

      }

      setObjetosDescubiertos(
        (anteriores) => [

          ...anteriores,
          objeto

        ]
      );

    };


    /* =====================================================
       FIN DEL AUDIO
    ===================================================== */

    const manejarFinAudio = () => {


      /* ===================================================
         AUDIO 1
         → CORONA
      =================================================== */

      if (
        tipoAudio === "principal" &&
        audioActual === 1
      ) {

        setObjetoVisible(
          "corona"
        );

        setObjetoDescubierto(
          null
        );

        setObjetoPulsando(
          null
        );

        setMomentoTexto(
          null
        );

        setTipoAudio(
          "espera"
        );

        setNarradorActivo(
          false
        );

        return;

      }


      /* ===================================================
         AUDIO 2 - CORONA
         → AUDIO 3
      =================================================== */

      if (
        tipoAudio === "objeto" &&
        objetoEnAudio === "corona"
      ) {

        setObjetoActivo(
          null
        );

        setObjetoVisible(
          null
        );

        setObjetoDescubierto(
          null
        );

        setObjetoPulsando(
          null
        );

        setObjetoEnAudio(
          null
        );

        setMomentoTexto(
          null
        );

        reproducirAudio(
          audiosEscena3[3],
          3,
          "principal",
          null,
          3
        );

        return;

      }


      /* ===================================================
         AUDIO 3
         → CAMPANA
      =================================================== */

      if (
        tipoAudio === "principal" &&
        audioActual === 3
      ) {

        setObjetoVisible(
          "campana"
        );

        setObjetoDescubierto(
          null
        );

        setObjetoPulsando(
          null
        );

        setMomentoTexto(
          null
        );

        setTipoAudio(
          "espera"
        );

        setNarradorActivo(
          false
        );

        return;

      }


      /* ===================================================
         AUDIO 4 - CAMPANA
         → RACIMO
      =================================================== */

      if (
        tipoAudio === "objeto" &&
        objetoEnAudio === "campana"
      ) {

        setObjetoActivo(
          null
        );

        setObjetoVisible(
          "racimo"
        );

        setObjetoDescubierto(
          null
        );

        setObjetoPulsando(
          null
        );

        setObjetoEnAudio(
          null
        );

        setMomentoTexto(
          null
        );

        setTipoAudio(
          "espera"
        );

        setNarradorActivo(
          false
        );

        return;

      }


      /* ===================================================
         AUDIO 5 - RACIMO
         → BOTÓN CAPÍTULO 4
      =================================================== */

      if (
        tipoAudio === "objeto" &&
        objetoEnAudio === "racimo"
      ) {

        setObjetoActivo(
          null
        );

        setObjetoVisible(
          null
        );

        setObjetoDescubierto(
          null
        );

        setObjetoPulsando(
          null
        );

        setObjetoEnAudio(
          null
        );

        setMomentoTexto(
          null
        );

        setNarradorActivo(
          false
        );

        setMostrarContinuar(
          true
        );

        return;

      }

    };


    /* =====================================================
       CLICK EN OBJETOS
    ===================================================== */

    const reproducirObjeto = (
      objeto
    ) => {

      let audio = null;

      let numeroAudio = null;

      let momento = null;


      /* ===================================================
         CORONA → AUDIO 2
      =================================================== */

      if (
        objeto === "corona"
      ) {

        audio =
          audiosEscena3[2];

        numeroAudio = 2;

        momento = 2;

      }


      /* ===================================================
         CAMPANA → AUDIO 4
      =================================================== */

      if (
        objeto === "campana"
      ) {

        audio =
          audiosEscena3[4];

        numeroAudio = 4;

        momento = 4;

      }


      /* ===================================================
         RACIMO → AUDIO 5
      =================================================== */

      if (
        objeto === "racimo"
      ) {

        audio =
          audiosEscena3[5];

        numeroAudio = 5;

        momento = 5;

      }


      if (!audio) {
        return;
      }


      setObjetoDescubierto(
        objeto
      );

      registrarObjetoEncontrado(
        objeto
      );

      setObjetoPulsando(
        null
      );

      setObjetoActivo(
        objeto
      );

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

      setObjetoActivo(
        null
      );

      if (
        objetoVisible
      ) {

        setObjetoPulsando(
          objetoVisible
        );

      }

    };


    /* =====================================================
       CONTINUAR AL CAPÍTULO 4
    ===================================================== */

    const continuarCapitulo4 = () => {

      setMostrarContinuar(
        false
      );

      if (
        onEscenaTerminada
      ) {

        onEscenaTerminada();

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

      if (
        tipoAudio === "espera"
      ) {

        return;

      }

      if (
        !audio.paused
      ) {

        audio.pause();

        setNarradorActivo(
          false
        );

        return;

      }

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
             ADRIÁN + RESPLANDOR
          ================================================= */}

          {adrianVisible && (

            <div
              className="
                escena-3-adrian-aparicion
              "
            >

              {mostrarResplandor && (

                <div
                  className="
                    escena-3-resplandor-adrian
                  "
                />

              )}

              <div
                className="
                  escena-3-adrian-hablando
                "
              >

                <Lottie
                  animationData={
                    AdrianHablando
                  }
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
            subtitulosEscena3[
              momentoTexto
            ] && (

              <div
                className="
                  escena-3-subtitulos
                "
                key={
                  momentoTexto
                }
              >

                {
                  subtitulosEscena3[
                    momentoTexto
                  ]
                }

              </div>

            )}


          {/* =================================================
             CORONA
          ================================================= */}

          {objetoVisible === "corona" && (

            <button
              className={`
                escena-3-corona-boton

                ${
                  objetoDescubierto === "corona"
                    ? "descubierto"
                    : ""
                }

                ${
                  objetoPulsando === "corona"
                    ? "pulsando"
                    : ""
                }
              `}
              onClick={() =>
                reproducirObjeto(
                  "corona"
                )
              }
              aria-label="Explorar corona"
            >

              <img
                src={Es3corona}
                alt="Corona"
                className="
                  escena-3-corona
                "
              />

            </button>

          )}


          {/* =================================================
             CAMPANA
          ================================================= */}

          {objetoVisible === "campana" && (

            <button
              className={`
                escena-3-campana-boton

                ${
                  objetoDescubierto === "campana"
                    ? "descubierto"
                    : ""
                }

                ${
                  objetoPulsando === "campana"
                    ? "pulsando"
                    : ""
                }
              `}
              onClick={() =>
                reproducirObjeto(
                  "campana"
                )
              }
              aria-label="Explorar campana"
            >

              <img
                src={Es3Campana}
                alt="Campana"
                className="
                  escena-3-campana
                "
              />

            </button>

          )}


          {/* =================================================
             RACIMO
          ================================================= */}

          {objetoVisible === "racimo" && (

            <button
              className={`
                escena-3-racimo-boton

                ${
                  objetoDescubierto === "racimo"
                    ? "descubierto"
                    : ""
                }

                ${
                  objetoPulsando === "racimo"
                    ? "pulsando"
                    : ""
                }
              `}
              onClick={() =>
                reproducirObjeto(
                  "racimo"
                )
              }
              aria-label="Explorar racimo"
            >

              <img
                src={Es3racimo}
                alt="Racimo"
                className="
                  escena-3-racimo
                "
              />

            </button>

          )}


          {/* =================================================
             BOTÓN CONTINUAR
          ================================================= */}

          {mostrarContinuar && (

            <div
              className="
                escena-1-continuar-contenedor
              "
            >

              <div
                className="
                  escena-1-continuar-texto
                "
              >

                <span>
                  CONTINUAR AL CAPÍTULO 4
                </span>

                <button
                  className="
                    escena-1-continuar-boton
                  "
                  onClick={
                    continuarCapitulo4
                  }
                >
                  CONTINUAR →
                </button>

              </div>

            </div>

          )}


          {/* =================================================
             MODAL
          ================================================= */}

          {objetoActivo && (

            <div
              className="
                escena-3-modal-fondo
              "
              onClick={
                cerrarModal
              }
            >

              <div
                className="
                  escena-3-modal
                "
                onClick={(evento) =>
                  evento.stopPropagation()
                }
              >

                <div
                  className="
                    escena-3-modal-imagen
                  "
                >

                  {objetoActivo === "corona" && (

                    <img
                      src={Es3corona}
                      alt="Corona"
                    />

                  )}

                  {objetoActivo === "campana" && (

                    <img
                      src={Es3Campana}
                      alt="Campana"
                    />

                  )}

                  {objetoActivo === "racimo" && (

                    <img
                      src={Es3racimo}
                      alt="Racimo"
                    />

                  )}

                </div>


                <div
                  className="
                    escena-3-modal-info
                  "
                >

                  {objetoActivo === "corona" && (

                    <>

                      <h2>
                        CORONA
                      </h2>

                      <p>
                        Llevarla puesta durante las
                        reuniones daba una protección
                        especial, por lo que nadie podía
                        atacar ni callar a esa persona
                        mientras daba su discurso.
                        También se usaba como premio
                        para los ganadores de los
                        concursos de poesía y talento
                        que se hacían en la plaza.
                      </p>

                    </>

                  )}


                  {objetoActivo === "campana" && (

                    <>

                      <h2>
                        Balanza de bronce
                      </h2>

                      <p>
                        La balanza de bronce del Ágora,
                        revisada por el inspector
                        oficial llamado Metronomos con
                        pesas de piedra selladas con la
                        lechuza de Atenas, era obligatoria
                        para todos los comerciantes y
                        debían pesar sus productos frente
                        al cliente.
                      </p>

                    </>

                  )}


                  {objetoActivo === "racimo" && (

                    <>

                      <h2>
                        RACIMO
                      </h2>

                      <p>
                        En una plaza donde todo se
                        negociaba y se debatía, vender
                        uvas frescas o pasas significaba
                        mover el comercio diario y
                        alimentar a los ciudadanos que
                        pasaban horas arreglando la
                        política de la ciudad.
                      </p>

                    </>

                  )}

                </div>


                <button
                  className="
                    escena-3-modal-cerrar
                  "
                  onClick={
                    cerrarModal
                  }
                  aria-label="Cerrar información"
                >
                  ×
                </button>

              </div>

            </div>

          )}


          {/* =================================================
             AUDIO
          ================================================= */}

          <audio
            ref={audioRef}
            onEnded={
              manejarFinAudio
            }
            preload="auto"
          />

        </div>

      </div>

    );

  }
);


Escena3.displayName =
  "Escena3";

export default Escena3;