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

import Esc1Audio1 from "../../Audios/Esc1Audio1.mp3";
import Esc1Audio2 from "../../Audios/Esc1Audio2.mp3";
import Esc1Audio3 from "../../Audios/Esc1Audio3.mp3";
import Esc1Audio4 from "../../Audios/Esc1Audio4.mp3";
import Esc1Audio5 from "../../Audios/Esc1Audio5.mp3";
import Esc1Audio6 from "../../Audios/Esc1Audio6.mp3";

import Es1Moneda from "../../AssetsNuevos/Es1Moneda.svg";
import Es1Jarron from "../../AssetsNuevos/Es1Jarron.svg";
import Es1Lanza from "../../AssetsNuevos/Es1Lanza.svg";

import "./Escenas.css";

const Lottie = lottieReact.default;


const Escena1 = forwardRef(
  (
    {
      textoNarracionActivo,
      onNarradorEstadoChange
    },
    ref
  ) => {


    /* =====================================================
       IMÁGENES DEL CICLO DE CAMINATA
    ===================================================== */

    const imagenesAdrian = [
      img0,
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7
    ];


    /* =====================================================
       PREPARAR JSON DE ADRIÁN
    ===================================================== */

    const animacionAdrian = {
      ...CicloAdrianBody,

      assets: CicloAdrianBody.assets.map(
        (asset, index) => ({
          ...asset,
          u: "",
          p: imagenesAdrian[index]
        })
      )
    };


    /* =====================================================
       AUDIOS DE ESCENA 1
    ===================================================== */

    const audiosEscena1 = {
      1: Esc1Audio1,
      2: Esc1Audio2,
      3: Esc1Audio3,
      4: Esc1Audio4,
      5: Esc1Audio5,
      6: Esc1Audio6
    };


    /* =====================================================
       TEXTOS DE ESCENA 1
    ===================================================== */

    const textosEscena1 = {

      1:
        "Un nuevo día de investigación. Nunca sé qué voy a encontrar cuando entro en una cueva como esta... y eso es justamente lo que hace interesante mi trabajo.",

      2:
        "Por lo que puedo ver, este lugar lleva bastante tiempo sin ser explorado. Quizás todavía quede algo entre estos escombros.",

      3:
        "Ve una moneda. Parece bastante antigua. Además, sus figuras y símbolos nos hablan de nuestras creencias, nuestros dioses y hasta de la identidad de nuestras ciudades.",

      4:
        "",

      5:
        "Y aquí tenemos un jarrón. Aunque parece un objeto cotidiano, estos jarrones pueden contar muchísimo sobre nosotros. A veces, para conocer una época, no hace falta encontrar un gran tesoro. Un objeto como este puede contar una historia completa.",

      6:
        "Una lanza. Esta sí es fácil de reconocer."
    };


    /* =====================================================
       ESTADOS DE ADRIÁN
    ===================================================== */

    const [adrianHabla, setAdrianHabla] =
      useState(false);

    const [caminataTerminada, setCaminataTerminada] =
      useState(false);


    /* =====================================================
       AUDIO ACTUAL

       1 = Audio 1
       2 = Audio 2
       3 = Audio 3
       4 = Audio 4
       5 = Audio 5
       6 = Audio 6
    ===================================================== */

    const [audioActual, setAudioActual] =
      useState(1);


    /* =====================================================
       TIPO DE AUDIO

       principal = narración automática
       objeto = explicación del objeto
       espera = esperando clic
    ===================================================== */

    const [tipoAudio, setTipoAudio] =
      useState("principal");


    /* =====================================================
       CONTROL DEL AUDIO 1
    ===================================================== */

    const [audio1Terminado, setAudio1Terminado] =
      useState(false);


    /* =====================================================
       NARRADOR
    ===================================================== */

    const [narradorActivo, setNarradorActivo] =
      useState(true);


    /* =====================================================
       OBJETO VISIBLE
    ===================================================== */

    const [objetoVisible, setObjetoVisible] =
      useState(null);


    /* =====================================================
       OBJETO DESCUBIERTO
    ===================================================== */

    const [objetoDescubierto, setObjetoDescubierto] =
      useState(null);


    /* =====================================================
       OBJETO DEL MODAL
    ===================================================== */

    const [objetoActivo, setObjetoActivo] =
      useState(null);


    /* =====================================================
       OBJETO CUYO AUDIO ESTÁ SONANDO

       Es diferente a objetoActivo porque
       el usuario puede cerrar el modal mientras
       el audio continúa.
    ===================================================== */

    const [objetoEnAudio, setObjetoEnAudio] =
      useState(null);


    /* =====================================================
       MOMENTO DEL TEXTO
    ===================================================== */

    const [momentoTexto, setMomentoTexto] =
      useState(1);


    /* =====================================================
       REFERENCIA DEL ÚNICO AUDIO
    ===================================================== */

    const audioRef =
      useRef(null);


    /* =====================================================
       EVITAR DOBLE INICIO EN DESARROLLO
    ===================================================== */

    const escenaIniciadaRef =
      useRef(false);


    /* =====================================================
       AVISAR AL PADRE DEL ESTADO DEL NARRADOR
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

       Esta es la parte nueva importante:
       utilizamos UN SOLO elemento <audio>.
    ===================================================== */

    const reproducirAudio = (
      audio,
      numero,
      tipo
    ) => {

      if (!audioRef.current) return;


      const reproductor =
        audioRef.current;


      reproductor.pause();


      reproductor.src = audio;


      reproductor.load();


      reproductor.currentTime = 0;


      setAudioActual(numero);

      setTipoAudio(tipo);

      setNarradorActivo(true);


      reproductor
        .play()
        .catch((error) => {

          console.error(
            "No se pudo reproducir el audio:",
            error
          );

        });

    };


    /* =====================================================
       INICIAR AUDIO 1
    ===================================================== */

    useEffect(() => {

      if (escenaIniciadaRef.current) return;

      escenaIniciadaRef.current = true;


      reproducirAudio(
        audiosEscena1[1],
        1,
        "principal"
      );


      return () => {

        if (audioRef.current) {

          audioRef.current.pause();

          audioRef.current.currentTime = 0;

          audioRef.current.removeAttribute(
            "src"
          );

        }

      };

    }, []);


    /* =====================================================
       TERMINAR CAMINATA
    ===================================================== */

    const terminarCaminata = () => {

      setCaminataTerminada(true);

      setAdrianHabla(true);


      /*
        Si el Audio 1 ya terminó mientras Adrián
        todavía estaba caminando, ahora podemos
        pasar al Audio 2.
      */

      if (audio1Terminado) {

        reproducirAudio(
          audiosEscena1[2],
          2,
          "principal"
        );

        setMomentoTexto(2);

      }

    };


    /* =====================================================
       MANEJAR FIN DEL AUDIO
    ===================================================== */

    const manejarFinAudio = () => {


      /* ===================================================
         AUDIO DE OBJETO
      =================================================== */

      if (tipoAudio === "objeto") {

        /* ===============================================
           MONEDA

           Audio 3 terminó
           → Audio 4 automático
        =============================================== */

        if (
          objetoEnAudio === "moneda"
        ) {

          setObjetoActivo(null);

          setObjetoEnAudio(null);

          setMomentoTexto(4);


          reproducirAudio(
            audiosEscena1[4],
            4,
            "principal"
          );

          return;

        }


        /* ===============================================
           JARRÓN

           Audio 5 terminó
           → aparece lanza
        =============================================== */

        if (
          objetoEnAudio === "jarron"
        ) {

          setObjetoActivo(null);

          setObjetoEnAudio(null);

          setObjetoVisible("lanza");

          setMomentoTexto(6);

          setTipoAudio("espera");

          setNarradorActivo(false);

          return;

        }


        /* ===============================================
           LANZA

           Audio 6 terminó
           → fin de escena
        =============================================== */

        if (
          objetoEnAudio === "lanza"
        ) {

          setObjetoActivo(null);

          setObjetoEnAudio(null);

          setTipoAudio("espera");

          setNarradorActivo(false);

          setMomentoTexto(6);

          return;

        }

      }


      /* ===================================================
         AUDIO PRINCIPAL
      ===================================================== */


      /* ===============================================
         AUDIO 1
      =============================================== */

      if (
        audioActual === 1
      ) {

        setAudio1Terminado(true);

        setNarradorActivo(false);


        /*
          Si Adrián ya terminó de caminar,
          pasamos inmediatamente al Audio 2.
        */

        if (caminataTerminada) {

          setAudio1Terminado(false);


          reproducirAudio(
            audiosEscena1[2],
            2,
            "principal"
          );

          setMomentoTexto(2);

        }

        return;

      }


      /* ===============================================
         AUDIO 2
         → aparece MONEDA
      =============================================== */

      if (
        audioActual === 2
      ) {

        setObjetoVisible("moneda");

        setTipoAudio("espera");

        setNarradorActivo(false);

        setMomentoTexto(null);

        return;

      }


      /* ===============================================
         AUDIO 4
         → aparece JARRÓN
      =============================================== */

      if (
        audioActual === 4
      ) {

        setObjetoVisible("jarron");

        setTipoAudio("espera");

        setNarradorActivo(false);

        setMomentoTexto(null);

        return;

      }

    };


    /* =====================================================
       CLICK SOBRE OBJETO
    ===================================================== */

    const reproducirObjeto = (
      objeto
    ) => {

      let audio = null;

      let numeroAudio = null;

      let momento = null;


      /* ===============================================
         MONEDA
      =============================================== */

      if (
        objeto === "moneda"
      ) {

        audio =
          audiosEscena1[3];

        numeroAudio = 3;

        momento = 3;

      }


      /* ===============================================
         JARRÓN
      =============================================== */

      if (
        objeto === "jarron"
      ) {

        audio =
          audiosEscena1[5];

        numeroAudio = 5;

        momento = 5;

      }


      /* ===============================================
         LANZA
      =============================================== */

      if (
        objeto === "lanza"
      ) {

        audio =
          audiosEscena1[6];

        numeroAudio = 6;

        momento = 6;

      }


      if (!audio) return;


      /* ===============================================
         EL OBJETO QUEDA DESCUBIERTO
      =============================================== */

      setObjetoDescubierto(objeto);


      /* ===============================================
         ABRIR MODAL
      =============================================== */

      setObjetoActivo(objeto);


      /* ===============================================
         RECORDAR QUÉ OBJETO TIENE EL AUDIO
      =============================================== */

      setObjetoEnAudio(objeto);


      /* ===============================================
         TEXTO
      =============================================== */

      setMomentoTexto(momento);


      /* ===============================================
         REPRODUCIR
      =============================================== */

      reproducirAudio(
        audio,
        numeroAudio,
        "objeto"
      );

    };


    /* =====================================================
       BOTÓN DEL NARRADOR
    ===================================================== */

    const toggleNarracion = () => {

      if (
        tipoAudio === "espera"
      ) {

        return;

      }


      if (!audioRef.current) {

        return;

      }


      /* ===============================================
         PAUSAR
      =============================================== */

      if (narradorActivo) {

        audioRef.current.pause();

        setNarradorActivo(false);

        return;

      }


      /* ===============================================
         REANUDAR
      =============================================== */

      audioRef.current
        .play()
        .then(() => {

          setNarradorActivo(true);

        })
        .catch((error) => {

          console.error(
            "No se pudo reanudar el audio:",
            error
          );

        });

    };


    /* =====================================================
       EXPONER BOTÓN AL PADRE
    ===================================================== */

    useImperativeHandle(
      ref,
      () => ({

        toggleNarracion

      })
    );


    /* =====================================================
       CERRAR MODAL
    ===================================================== */

    const cerrarModal = () => {

      /*
        Importante:
        cerramos SOLO el modal.

        El audio sigue reproduciéndose.
      */

      setObjetoActivo(null);

    };


    /* =====================================================
       RENDER
    ===================================================== */

    return (

      <div className="escena-1">

        <div className="escena-1-contenido">


          {/* =================================================
              FONDO
          ================================================= */}

          <img
            src="/Escenarios/FondoCueva.svg"
            alt="Cueva"
            className="escena-1-fondo"
          />


          {/* =================================================
              FUEGO
          ================================================= */}

          <svg
            className="escena-1-overlay"
            viewBox="0 0 1024 598"
            preserveAspectRatio="none"
          >

            <image
              href="/Escenarios/fuegoAnto.svg"
              x="302"
              y="185"
              width="35"
              height="75"
            />

          </svg>


          {/* =================================================
              ADRIÁN CAMINANDO
          ================================================= */}

          {!adrianHabla && (

            <div
              className="escena-1-adrian-prueba"
              onAnimationEnd={terminarCaminata}
            >

              <Lottie
                animationData={
                  animacionAdrian
                }
                loop={true}
                autoplay={true}
              />

            </div>

          )}


          {/* =================================================
              ADRIÁN HABLANDO
          ================================================= */}

          {adrianHabla && (

            <div
              className="escena-1-adrian-hablando"
            >

              <Lottie
                animationData={
                  AdrianHablando
                }
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
            onEnded={manejarFinAudio}
            preload="auto"
          />


          {/* =================================================
              TEXTO DE NARRACIÓN
          ================================================= */}

          {textoNarracionActivo &&
            momentoTexto !== null &&
            textosEscena1[momentoTexto] && (

              <div
                className="escena-1-texto-narracion"
              >

                {
                  textosEscena1[
                    momentoTexto
                  ]
                }

              </div>

            )}


          {/* =================================================
              MONEDA
          ================================================= */}

          {objetoVisible === "moneda" && (

            <button
              className={`
                escena-1-moneda-boton
                ${
                  objetoDescubierto === "moneda"
                    ? "descubierto"
                    : ""
                }
              `}
              onClick={() =>
                reproducirObjeto(
                  "moneda"
                )
              }
              aria-label="Explorar moneda"
            >

              <img
                src={Es1Moneda}
                alt="Moneda antigua"
                className="escena-1-moneda"
              />

            </button>

          )}


          {/* =================================================
              JARRÓN
          ================================================= */}

          {objetoVisible === "jarron" && (

            <button
              className={`
                escena-1-jarron-boton
                ${
                  objetoDescubierto === "jarron"
                    ? "descubierto"
                    : ""
                }
              `}
              onClick={() =>
                reproducirObjeto(
                  "jarron"
                )
              }
              aria-label="Explorar jarrón"
            >

              <img
                src={Es1Jarron}
                alt="Jarrón antiguo"
                className="escena-1-jarron"
              />

            </button>

          )}


          {/* =================================================
              LANZA
          ================================================= */}

          {objetoVisible === "lanza" && (

            <button
              className={`
                escena-1-lanza-boton
                ${
                  objetoDescubierto === "lanza"
                    ? "descubierto"
                    : ""
                }
              `}
              onClick={() =>
                reproducirObjeto(
                  "lanza"
                )
              }
              aria-label="Explorar lanza"
            >

              <img
                src={Es1Lanza}
                alt="Lanza antigua"
                className="escena-1-lanza"
              />

            </button>

          )}


          {/* =================================================
              MODAL
          ================================================= */}

          {objetoActivo && (

            <div
              className="escena-1-modal-fondo"
              onClick={cerrarModal}
            >

              <div
                className="escena-1-modal"
                onClick={(evento) =>
                  evento.stopPropagation()
                }
              >


                {/* =============================================
                    IMAGEN
                ============================================= */}

                <div
                  className="escena-1-modal-imagen"
                >

                  {objetoActivo === "moneda" && (

                    <img
                      src={Es1Moneda}
                      alt="Moneda antigua"
                    />

                  )}


                  {objetoActivo === "jarron" && (

                    <img
                      src={Es1Jarron}
                      alt="Jarrón antiguo"
                    />

                  )}


                  {objetoActivo === "lanza" && (

                    <img
                      src={Es1Lanza}
                      alt="Lanza antigua"
                    />

                  )}

                </div>


                {/* =============================================
                    INFORMACIÓN
                ============================================= */}

                <div
                  className="escena-1-modal-info"
                >


                  {objetoActivo === "moneda" && (

                    <>

                      <h2>
                        MONEDA
                      </h2>

                      <p>
                        Las monedas son mucho más que una forma
                        de pagar. Gracias a ellas podemos comerciar
                        con mayor facilidad y conocer quién tiene
                        el poder en una determinada época.
                      </p>

                    </>

                  )}


                  {objetoActivo === "jarron" && (

                    <>

                      <h2>
                        JARRÓN
                      </h2>

                      <p>
                        Aunque parece un objeto cotidiano, estos
                        jarrones pueden contar muchísimo sobre
                        nosotros. Podemos encontrar escenas de
                        nuestras costumbres, guerras, creencias
                        y hasta momentos de nuestra vida diaria.
                      </p>

                    </>

                  )}


                  {objetoActivo === "lanza" && (

                    <>

                      <h2>
                        LANZA
                      </h2>

                      <p>
                        Es una de las armas principales de nuestros
                        guerreros. Los hoplitas la utilizan junto
                        con su escudo para enfrentarse al enemigo
                        y proteger su ciudad.
                      </p>

                    </>

                  )}

                </div>


                {/* =============================================
                    CERRAR
                ============================================= */}

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


Escena1.displayName =
  "Escena1";


export default Escena1;