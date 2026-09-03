import { Link } from "react-router-dom";
import "./styleHillary.css";

export const SeccionHeader = () => {
  return (
    <div className="pagina-mitonic">

      <header className="header-mitonic">

        <Link to="/" className="logo-mitonic">
          <img src="/public/Logo.png" alt="Mitonic" />
        </Link>

        <nav className="nav-mitonic">

          <Link to="/personaje">
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


    </div>
  );
};