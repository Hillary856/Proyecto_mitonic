import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "../Components/styleHillary.css";
import { SeccionHeader } from "../Components/SeccionHeader";


export const Personaje = () => {

  const conoceRef = useRef(null);
  const caracteristicasRef = useRef(null);
  const adrianRef = useRef(null);

  const [conoceVisible, setConoceVisible] = useState(false);
  const [caracteristicasVisible, setCaracteristicasVisible] = useState(false);

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.target === conoceRef.current) {
            setConoceVisible(entry.isIntersecting);
          }

          if (entry.target === caracteristicasRef.current) {
            setCaracteristicasVisible(entry.isIntersecting);
          }

        });

      },
      {
        threshold: 0.15
      }
    );

    if (conoceRef.current) {
      observer.observe(conoceRef.current);
    }

    if (caracteristicasRef.current) {
      observer.observe(caracteristicasRef.current);
    }

    return () => {
      observer.disconnect();
    };

  }, []);

  useEffect(() => {
    const contenedor = adrianRef.current;

    if (!contenedor) return;

    let svg = null;

    const cargarSVG = async () => {
      try {
        const respuesta = await fetch("/Adriann.svg");
        const svgTexto = await respuesta.text();

        contenedor.innerHTML = svgTexto;

        svg = contenedor.querySelector("svg");

        if (!svg) return;

        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.style.display = "block";

        // OJOS DE ADRIÁN
        const ojos = svg.querySelectorAll(".cls-56");

        // BRILLOS DE LOS OJOS
        const brillos = svg.querySelectorAll(".cls-62");

        const moverOjos = (evento) => {
          const rect = contenedor.getBoundingClientRect();

          const centroX = rect.left + rect.width / 2;
          const centroY = rect.top + rect.height / 2;

          let movimientoX =
            (evento.clientX - centroX) / (rect.width / 2);

          let movimientoY =
            (evento.clientY - centroY) / (rect.height / 2);

          // Limitamos el movimiento
          movimientoX = Math.max(-1, Math.min(1, movimientoX));
          movimientoY = Math.max(-1, Math.min(1, movimientoY));

          // Movimiento máximo
          const maxX = 4;
          const maxY = 3;

          const x = movimientoX * maxX;
          const y = movimientoY * maxY;

          // Mover los dos ojos
          ojos.forEach((ojo) => {
            ojo.style.transform = `translate(${x}px, ${y}px)`;
            ojo.style.transition = "transform 0.12s ease-out";
          });

          // Mover los brillos
          brillos.forEach((brillo) => {
            brillo.style.transform = `translate(${x}px, ${y}px)`;
            brillo.style.transition = "transform 0.12s ease-out";
          });
        };

        const volverAlCentro = () => {
          ojos.forEach((ojo) => {
            ojo.style.transform = "translate(0px, 0px)";
          });

          brillos.forEach((brillo) => {
            brillo.style.transform = "translate(0px, 0px)";
          });
        };

        window.addEventListener("mousemove", moverOjos);

        contenedor.addEventListener(
          "mouseleave",
          volverAlCentro
        );

        // Guardamos las funciones para poder eliminarlas
        svg._moverOjos = moverOjos;
        svg._volverAlCentro = volverAlCentro;

      } catch (error) {
        console.error(
          "Error cargando Adriann.svg:",
          error
        );
      }
    };

    cargarSVG();

    return () => {
      if (svg) {
        window.removeEventListener(
          "mousemove",
          svg._moverOjos
        );

        contenedor.removeEventListener(
          "mouseleave",
          svg._volverAlCentro
        );
      }
    };
  }, []);


  return (
    <main className="pagina-personaje">

      <SeccionHeader />

      

      {/* =========================================
          HERO
      ========================================= */}

      <section className="personaje-ficha">

        <div className="personaje-ficha-info">

          <p className="personaje-etiqueta">
            PERSONAJE PRINCIPAL
          </p>

          <h1>
            ADRIÁN
            <br />
            SALVATIERRA
          </h1>

          <p className="personaje-profesion">
            ARQUEÓLOGO
          </p>

          <div className="personaje-linea"></div>

          <p className="personaje-frase">
            Un explorador dispuesto a descubrir
            los secretos que guarda la historia.
          </p>

        </div>


        <div className="personaje-cuerpo">

          <div
            className="personaje-cuerpo"
            ref={adrianRef}
          ></div>

        </div>

      </section>


      {/* =========================================
          SOBRE ADRIÁN
      ========================================= */}

      <section
        ref={conoceRef}
        className={`personaje-conoce ${conoceVisible ? "visible" : ""
          }`}
      >

        <div className="personaje-conoce-titulo">

          <p>
            CONOCE AL PERSONAJE
          </p>

          <h2>
            ¿Quién es
            <br />
            Adrián?
          </h2>

        </div>


        <div className="personaje-conoce-texto">

          <p>
            Adrián es un arqueólogo apasionado por la historia
            y la exploración. Su curiosidad lo lleva a descubrir
            secretos ocultos y a enfrentarse a desafíos que pondrán
            a prueba su ingenio y valentía.
          </p>

          <p>
            A lo largo de su viaje, Adrián se encuentra con
            misterios que desafían su comprensión del mundo,
            y su determinación lo impulsa a seguir adelante,
            sin importar los obstáculos que se presenten.
          </p>

        </div>

      </section>


      {/* =========================================
          CARACTERÍSTICAS
      ========================================= */}

      <section
        ref={caracteristicasRef}
        className={`personaje-caracteristicas ${caracteristicasVisible ? "visible" : ""
          }`}
      >

        <div className="caracteristicas-header">

          <p>
            MÁS SOBRE ADRIÁN
          </p>

          <h2>
            Descubre al personaje
          </h2>

        </div>


        <div className="caracteristicas-grid">

          <article className="caracteristica-card">

            <span className="caracteristica-numero">
              01
            </span>

            <h3>
              SOBRE ADRIÁN
            </h3>

            <p>
              Adrian es un arqueólogo apasionado por la historia y la exploración. Su curiosidad lo lleva a descubrir secretos ocultos y a enfrentarse a desafíos que pondrán a prueba su ingenio y valentía.
            </p>

          </article>


          <article className="caracteristica-card">

            <span className="caracteristica-numero">
              02
            </span>

            <h3>
              PERSONALIDAD
            </h3>

            <p>
              Adrián es valiente, curioso y determinado. Su pasión por la historia lo impulsa a explorar lo desconocido y a enfrentar los desafíos con ingenio y perseverancia.
            </p>

          </article>


          <article className="caracteristica-card">

            <span className="caracteristica-numero">
              03
            </span>

            <h3>
              CURIOSIDADES
            </h3>

            <p>
              A lo largo de su viaje, Adrián se encuentra con misterios que desafían su comprensión del mundo, y su determinación lo impulsa a seguir adelante, sin importar los obstáculos que se presenten.
            </p>

          </article>

        </div>

      </section>

    </main>
  );
};