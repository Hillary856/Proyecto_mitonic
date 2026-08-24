import "./styleHillary.css";

export const SeccionHero = () => {
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


      {/* VIDEO / TRAILER */}
      <div className="trailer-mitonic">

        <button className="boton-trailer">
          VER TRAILER
        </button>

      </div>

    </section>
  );
};