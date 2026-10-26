import "./styleHillary.css";
import { useState, useEffect } from "react";

export const SeccionHero = () => {

  const [abierto, setAbierto] = useState(false);


  // Cierra el telón con la tecla Esc
  useEffect(() => {

    if (!abierto) return;

    const alPresionar = (evento) => {
      if (evento.key === "Escape") {
        setAbierto(false);
      }
    };

    window.addEventListener("keydown", alPresionar);

    return () => {
      window.removeEventListener("keydown", alPresionar);
    };

  }, [abierto]);


  return (

    <section className="hero-mitonic">

      {/* TEXTO */}

      <div className="hero-texto">

        <h1>

          Mitonic como
          <br />

          puente de
          <br />

          <span>sabiduría</span>

        </h1>

      </div>


      {/* =====================================================
          ESCENARIO CON TELÓN
      ===================================================== */}

      <div className="trailer-mitonic">

        <div
          className={`telon-escenario ${
            abierto ? "abierto" : ""
          }`}
        >

          {/* FONDO DEL ESCENARIO (imagen y video) */}

          <div className="telon-fondo">

            

            {abierto && (

              <video
                className="telon-video"
                controls
                autoPlay
                onEnded={() => setAbierto(false)}
              >
                <source
                  src="/teaser_3.mp4"
                  type="video/mp4"
                />
              </video>

            )}

          </div>


          {/* CORTINAS */}

          <div className="telon-cortina izquierda" />
          <div className="telon-cortina derecha" />


          {/* CENEFA (parte de arriba) */}

          <div className="telon-cenefa" />


          {/* BOTÓN PARA ABRIR */}

          {!abierto && (

            <button
              className="telon-abrir"
              onClick={() => setAbierto(true)}
              aria-label="Abrir el telón y ver el tráiler"
            >

              <span className="telon-abrir-texto">
                ABRIR TELÓN
              </span>

            </button>

          )}


         

        </div>

      </div>

    </section>

  );

};