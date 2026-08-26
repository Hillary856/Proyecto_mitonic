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


    </main>
  );
};