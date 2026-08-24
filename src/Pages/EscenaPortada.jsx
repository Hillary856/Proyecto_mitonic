import { Link, useNavigate } from "react-router-dom";
import "./EscenaPortada.css";

export const EscenaPortada = () => {

  const navigate = useNavigate();

  const comenzarHistoria = () => {
    navigate("/escenaadrian");
  };

  return (
    <main className="portada-comic">

      {/* =========================================
          PANEL PRINCIPAL
      ========================================= */}

      <section className="portada-principal">

        {/* LOGO */}

        <Link to="/" className="portada-logo">
          <img
            src="/Logo.png"
            alt="Mitonic"
          />
        </Link>


        {/* CONTENIDO */}

        <div className="portada-contenido">


          <h1 className="portada-titulo">
            ADRIAN Y LAS
            <br />
            CRÓNICAS
            <br />
            DEL IMPERIO
          </h1>


          <p className="portada-descripcion">
            Acompaña a nuestro personaje en una aventura
            donde la historia cobra vida de una manera
            diferente e interactiva.
          </p>

        </div>

      </section>


      {/* =========================================
          CAPÍTULOS
      ========================================= */}

      <aside className="portada-capitulos">

        <p className="capitulos-titulo">
          CAPÍTULOS
        </p>


        <div className="capitulos-lista">


          {/* =====================================
              CAPÍTULO 1
          ===================================== */}

          <button
            className="capitulo activo"
            onClick={comenzarHistoria}
          >

            <div className="capitulo-portada">

              <span className="capitulo-numero">
                01
              </span>

            </div>

            <div className="capitulo-info">

              <span>
                CAPÍTULO 01
              </span>

              <strong>
                EL COMIENZO
              </strong>

            </div>

          </button>


          {/* =====================================
              CAPÍTULO 2
          ===================================== */}

          <button
            className="capitulo bloqueado"
            disabled
          >

            <div className="capitulo-portada">

              <span className="capitulo-numero">
                02
              </span>


            </div>

            <div className="capitulo-info">

              <span>
                CAPÍTULO 02
              </span>

              <strong>
                PRÓXIMAMENTE
              </strong>

            </div>

          </button>


          {/* =====================================
              CAPÍTULO 3
          ===================================== */}

          <button
            className="capitulo bloqueado"
            disabled
          >

            <div className="capitulo-portada">

              <span className="capitulo-numero">
                03
              </span>


            </div>

            <div className="capitulo-info">

              <span>
                CAPÍTULO 03
              </span>

              <strong>
                PRÓXIMAMENTE
              </strong>

            </div>

          </button>


        </div>

      </aside>

    </main>
  );
};

export default EscenaPortada;