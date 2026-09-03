import "./styleHillary.css";
import { useState } from "react";

export const SeccionHero = () => {

  const [mostrarTrailer, setMostrarTrailer] = useState(false);

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
    VIDEO / TRAILER
===================================================== */}

      <div className="trailer-mitonic">

        <div className="trailer-contenedor">

          {!mostrarTrailer ? (

            <>

              <button
                className="boton-trailer"
                onClick={() => setMostrarTrailer(true)}
              >
                VER TRAILER
              </button>
            </>

          ) : (

            <video
              className="video-trailer"
              controls
              autoPlay
            >
              <source
                src="/teaser_3.mp4"
                type="video/mp4"
              />
            </video>

          )}

        </div>

      </div>

    </section>

  );

};