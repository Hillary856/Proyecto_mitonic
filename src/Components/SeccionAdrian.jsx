import { useEffect, useRef, useState } from "react";
import "./styleHillary.css";

export const SeccionAdrian = () => {

  const adrianRef = useRef(null);
  const seccionRef = useRef(null);

  const [visible, setVisible] = useState(false);


  /* =========================================
     ANIMACIÓN AL HACER SCROLL
  ========================================= */

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
          INFORMACIÓN
      ========================================= */}

      <div className="adrian-info">

        <h2 className="adrian-nombre">

          ADRIAN

          <br />

          SALVATIERRA

        </h2>


        <p className="adrian-profesion">

          ARQUEÓLOGO

        </p>

      </div>



      {/* =========================================
          ADRIÁN INTERACTIVO
      ========================================= */}

      <div
        className="adrian-foto"
        ref={adrianRef}
      />

    </section>

  );
};