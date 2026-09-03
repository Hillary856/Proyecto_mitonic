import { useEffect, useRef, useState } from "react";
import "./styleHillary.css";

export const SeccionInfoComic = () => {

  const seccionRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [subiendo, setSubiendo] = useState(false);

  const ultimaPosicion = useRef(window.scrollY);



  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (
            entry.target === seccionRef.current &&
            entry.isIntersecting
          ) {

            setVisible(true);

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



  useEffect(() => {

    const detectarScroll = () => {

      const posicionActual = window.scrollY;


      if (posicionActual < ultimaPosicion.current) {
        setSubiendo(true);
      } else {
        setSubiendo(false);
      }
      ultimaPosicion.current = posicionActual;
    };
    window.addEventListener(
      "scroll",
      detectarScroll,
      { passive: true }
    );


    return () => {

      window.removeEventListener(
        "scroll",
        detectarScroll
      );

    };

  }, []);


  return (

    <section
      ref={seccionRef}
      className={`
        info-comic
        ${visible ? "visible" : ""}
        ${subiendo ? "scroll-arriba" : ""}
      `}
    >

      <div className="info-comic-titulo">

        <h2>
          En busca de la innovación y lo
          <br />
          contemporáneo.
        </h2>

      </div>


      {/* =========================================
          MONTAÑAS
      ========================================= */}

      <div className="montanas-comic">

        <img
          src="/montaña.svg"
          alt=""
        />

      </div>


      <div className="info-comic-contenido">


        <div className="info-item">

          <h3>
            ¿Qué es un comic interactivo?
          </h3>

          <p>
            Es una versión digital que permite al lector participar
            en la historia mediante animaciones, sonidos o decisiones
            que cambian la trama.
          </p>

        </div>


        <div className="info-item">

          <h3>
            ¿Cómo lo implementamos?
          </h3>

          <p>
            En Mitonic puede aplicarse con elecciones de caminos,
            objetos que revelen información y efectos visuales o
            sonoros que hagan la experiencia más inmersiva.
          </p>

        </div>


        <div className="info-item">

          <h3>
            Somos una línea del tiempo
          </h3>

          <p>
            En este capítulo exploramos Grecia y Roma, sus mitos,
            costumbres y aportes, pero la historia sigue con más
            capítulos que recorren distintas épocas de forma
            divertida y diferente.
          </p>

        </div>


      </div>


    </section>

  );
};