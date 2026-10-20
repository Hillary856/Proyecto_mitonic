import { useEffect, useRef, useState } from "react";
import "./styleHillary.css";


export const SeccionAdrian = () => {

  const adrianRef = useRef(null);
  const seccionRef = useRef(null);

  // Referencias de la curva del nombre
  const nombreRutaRef = useRef(null);
  const nombreTPRef = useRef(null);

  const [visible, setVisible] = useState(false);




  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.target === seccionRef.current) {
            setVisible(entry.isIntersecting);
          }

        });

      },
      {
        threshold: 0.2
      }
    );


    if (seccionRef.current) {
      observer.observe(seccionRef.current);
    }


    return () => {
      observer.disconnect();
    };

  }, []);


  /* =========================================
     NOMBRE EN CURVA (SCROLL)
  ========================================= */

  useEffect(() => {

    const seccion = seccionRef.current;
    const ruta = nombreRutaRef.current;
    const tp = nombreTPRef.current;

    if (!seccion || !ruta || !tp) return;


    // ====== AJUSTES ======

    const CENTRO_X = 960;   // dónde se detiene (960 = centro)
    const SUAVE = 0.65;     // 0 = velocidad constante, 0.9 = casi se detiene al centro
    const MARGEN = 60;      // qué tan afuera empieza y termina


    let raf = 0;
    let largoRuta = 0;
    let largoTexto = 0;
    let centro = 0;

    const reducirMovimiento = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


    // Busca en qué punto del trayecto está cierta posición X
    const posicionEnX = (x) => {

      let a = 0;
      let b = largoRuta;

      for (let i = 0; i < 30; i++) {

        const m = (a + b) / 2;

        if (ruta.getPointAtLength(m).x < x) {
          a = m;
        } else {
          b = m;
        }

      }

      return (a + b) / 2;

    };


    // Mide la curva y el texto
    const medir = () => {

      largoRuta = ruta.getTotalLength();
      largoTexto = tp.getComputedTextLength();

      centro = posicionEnX(CENTRO_X) - largoTexto / 2;

    };


    const actualizar = () => {

      raf = 0;

      const rect = seccion.getBoundingClientRect();
      const alto = window.innerHeight;

      // 0 = la sección entra, 1 = la sección sale
      let p = (alto - rect.top) / (alto + rect.height);

      p = Math.max(0, Math.min(1, (p - 0.1) / 0.8));

      if (reducirMovimiento) {
        p = 0.5;
      }

      // Más lento en el centro para que se pueda leer
      const q = p * 2 - 1;

      const e = SUAVE * q * q * q + (1 - SUAVE) * q;   // de -1 a 1

      // Entra por la izquierda, sale por la derecha
      const entrada = -largoTexto - MARGEN;
      const salida = largoRuta + MARGEN;

      const offset =
        e <= 0
          ? centro + (entrada - centro) * -e
          : centro + (salida - centro) * e;

      tp.setAttribute("startOffset", String(offset));

    };


    const pedirActualizacion = () => {

      if (!raf) {
        raf = requestAnimationFrame(actualizar);
      }

    };


    const alCambiarTamano = () => {

      medir();
      pedirActualizacion();

    };


    medir();
    actualizar();

    // Vuelve a medir cuando termine de cargar la fuente
    if (document.fonts && document.fonts.ready) {

      document.fonts.ready.then(() => {
        medir();
        actualizar();
      });

    }

    window.addEventListener("scroll", pedirActualizacion, { passive: true });
    window.addEventListener("resize", alCambiarTamano);


    return () => {

      if (raf) cancelAnimationFrame(raf);

      window.removeEventListener("scroll", pedirActualizacion);
      window.removeEventListener("resize", alCambiarTamano);

    };

  }, []);


  /* =========================================
     OJOS INTERACTIVOS DE ADRIÁN
  ========================================= */

  useEffect(() => {

    const contenedor = adrianRef.current;

    if (!contenedor) return;

    let svg;

    const cargarSVG = async () => {

      try {

        const respuesta = await fetch("/Adrian.svg");

        const svgTexto = await respuesta.text();

        contenedor.innerHTML = svgTexto;

        svg = contenedor.querySelector("svg");

        if (!svg) return;

        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");

        svg.style.display = "block";



        /* =========================================
           OJOS
        ========================================= */

        const ojos = svg.querySelectorAll(".cls-16");

        const brillos = svg.querySelectorAll(".cls-17");


        /* =========================================
           MOVIMIENTO
        ========================================= */

        const moverOjos = (evento) => {

          const rect = contenedor.getBoundingClientRect();


          // Centro de Adrián

          const centroX =
            rect.left + rect.width / 2;

          const centroY =
            rect.top + rect.height / 2;


          // Posición relativa del mouse

          let movimientoX =
            (evento.clientX - centroX) /
            (rect.width / 2);

          let movimientoY =
            (evento.clientY - centroY) /
            (rect.height / 2);


          // Limitar movimiento

          movimientoX = Math.max(
            -1,
            Math.min(1, movimientoX)
          );

          movimientoY = Math.max(
            -1,
            Math.min(1, movimientoY)
          );


          // Máximo movimiento

          const maxX = 4;
          const maxY = 3;


          const x = movimientoX * maxX;
          const y = movimientoY * maxY;


          /* =========================================
             OJO DERECHO
          ========================================= */

          if (ojos[0]) {

            ojos[0].style.transform =
              `translate(${x}px, ${y}px)`;

            ojos[0].style.transition =
              "transform 0.12s ease-out";

          }


          /* =========================================
             OJO IZQUIERDO
          ========================================= */

          if (ojos[1]) {

            ojos[1].style.transform =
              `translate(${x}px, ${y}px)`;

            ojos[1].style.transition =
              "transform 0.12s ease-out";

          }


          /* =========================================
             BRILLOS
          ========================================= */

          brillos.forEach((brillo) => {

            brillo.style.transition =
              "transform 0.12s ease-out";

          });


          if (brillos[0]) {

            brillos[0].style.transform =
              `translate(${x}px, ${y}px)`;

          }


          if (brillos[1]) {

            brillos[1].style.transform =
              `translate(${x}px, ${y}px)`;

          }


          if (brillos[2]) {

            brillos[2].style.transform =
              `translate(${x}px, ${y}px)`;

          }


          if (brillos[3]) {

            brillos[3].style.transform =
              `translate(${x}px, ${y}px)`;

          }

        };


        /* =========================================
           VOLVER AL CENTRO
        ========================================= */

        const volverAlCentro = () => {

          ojos.forEach((ojo) => {

            ojo.style.transform =
              "translate(0px, 0px)";

          });


          brillos.forEach((brillo) => {

            brillo.style.transform =
              "translate(0px, 0px)";

          });

        };


        /* =========================================
           EVENTOS
        ========================================= */

        window.addEventListener(
          "mousemove",
          moverOjos
        );

        window.addEventListener(
          "mouseleave",
          volverAlCentro
        );


        // Guardamos las funciones
        // para eliminarlas después

        svg._moverOjos = moverOjos;

        svg._volverAlCentro =
          volverAlCentro;

      } catch (error) {

        console.error(
          "Error cargando Adrian.svg:",
          error
        );

      }

    };


    cargarSVG();


    /* =========================================
       LIMPIEZA
    ========================================= */

    return () => {

      if (svg) {

        window.removeEventListener(
          "mousemove",
          svg._moverOjos
        );

        window.removeEventListener(
          "mouseleave",
          svg._volverAlCentro
        );

      }

    };

  }, []);


  /* =========================================
     JSX
  ========================================= */

  return (

    <section
      ref={seccionRef}
      className={`seccion-adrian ${
        visible ? "visible" : ""
      }`}
    >


      {/* =========================================
          NOMBRE EN CURVA (ARRIBA)
      ========================================= */}

      <div
        className="adrian-curva"
        aria-hidden="true"
      >

        <svg
          viewBox="0 0 1920 400"
          preserveAspectRatio="xMidYMid meet"
        >

          <path
            ref={nombreRutaRef}
            id="ruta-nombre"
            d="M -500 330 C 100 130, 800 130, 1300 230 S 2100 340, 2500 260"
            fill="none"
            stroke="none"
          />

          <text
            className="curva-nombre"
            fontSize="190"
          >

            <textPath
              ref={nombreTPRef}
              href="#ruta-nombre"
              startOffset="-5000"
            >
              ADRIÁN SALVATIERRA
            </textPath>

          </text>

        </svg>

      </div>


      {/* Nombre solo para lectores de pantalla */}

      <h2 className="solo-lectores">
        Adrián Salvatierra
      </h2>


      {/* =========================================
          ADRIÁN (CENTRADO, DEBAJO)
      ========================================= */}

      <div
        className="adrian-foto"
        ref={adrianRef}
      />

    </section>

  );
};