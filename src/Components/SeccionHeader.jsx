import { Link } from "react-router-dom";
import "./styleHillary.css";

export const SeccionHeader = () => {
  return (
    <div className="pagina-mitonic">

      {/* HEADER */}
      <header className="header-mitonic">

        {/* Logo */}
        <Link to="/" className="logo-mitonic">
          <img src="/public/Logo.png" alt="Mitonic" />
        </Link>

        {/* Navegación */}
        <nav className="nav-mitonic">

          <Link to="/personajes">
            PERSONAJE
          </Link>

          <Link to="/escenarios">
            ESCENARIOS
          </Link>

          <Link to="/equipo">
            EQUIPO
          </Link>

          <Link to="/comic" className="link-comic">
            VER COMIC
          </Link>

        </nav>

      </header>


      {/* HERO */}
      <section className="hero-mitonic">

        {/* Texto */}
        <div className="hero-texto">

          <h1>
            Mitonic como
            <br />
            puente de
            <br />
            <span>sabiduría</span>
          </h1>

        </div>


        {/* Video / Trailer */}
        <div className="trailer-mitonic">

          <button className="boton-trailer">
            VER TRAILER
          </button>

        </div>

      </section>

    </div>
  );
};