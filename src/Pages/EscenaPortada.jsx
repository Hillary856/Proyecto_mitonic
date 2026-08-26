import { useState } from "react";
import "./EscenaPortada.css";

export const EscenaPortada = () => {

  const [capituloActivo, setCapituloActivo] = useState(1);

  const capitulos = [
    {
      numero: "01",
      titulo: "EL COMIENZO",
      disponible: true
    },
    {
      numero: "02",
      titulo: "PRÓXIMAMENTE",
      disponible: false
    },
    {
      numero: "03",
      titulo: "PRÓXIMAMENTE",
      disponible: false
    },
    {
      numero: "04",
      titulo: "PRÓXIMAMENTE",
      disponible: false
    },
    {
      numero: "05",
      titulo: "PRÓXIMAMENTE",
      disponible: false
    },
    {
      numero: "06",
      titulo: "PRÓXIMAMENTE",
      disponible: false
    }
  ];


  const seleccionarCapitulo = (capitulo) => {

    if (!capitulo.disponible) return;

    setCapituloActivo(Number(capitulo.numero));

    console.log("Capítulo seleccionado:", capitulo.numero);

  };


  return (

    <main className="comic-interface">


      {/* =====================================================
          LOGO MITONIC
      ===================================================== */}

      <a href="/" className="comic-logo">

        <img
          src="/public/Logo.png"
          alt="Mitonic"
        />

      </a>



      {/* =====================================================
          CONTENEDOR PRINCIPAL
      ===================================================== */}

      <div className="comic-layout">


        {/* =================================================
            PANTALLA PRINCIPAL
        ================================================= */}

        <section className="comic-pantalla">


          {/* -----------------------------------------------
              CONTENIDO DE LA PANTALLA
          ------------------------------------------------ */}

          <div className="comic-pantalla-contenido">


            <p className="comic-categoria">
              MITONIC
            </p>


            <h1 className="comic-titulo">

              ADRIAN Y LAS
              <br />

              CRÓNICAS DEL IMPERIO

            </h1>


            <p className="comic-descripcion">

              Acompaña a nuestro personaje en una aventura
              donde la historia cobra vida de una manera
              diferente e interactiva.

            </p>


            {/* BOTÓN COMENZAR */}

            <button
              className="comic-boton-comenzar"
              onClick={() => seleccionarCapitulo(capitulos[0])}
            >

              <span>▶</span>

              COMENZAR

            </button>


          </div>


        </section>



        {/* =================================================
            PANEL DE CAPÍTULOS
        ================================================= */}

        <aside className="comic-capitulos">


          <h2 className="comic-capitulos-titulo">
            CAPÍTULOS
          </h2>


          <div className="comic-capitulos-lista">


            {capitulos.map((capitulo) => (

              <button
                key={capitulo.numero}
                className={`
                  comic-capitulo
                  ${capitulo.disponible ? "disponible" : "bloqueado"}
                  ${capituloActivo === Number(capitulo.numero)
                    ? "seleccionado"
                    : ""}
                `}
                onClick={() => seleccionarCapitulo(capitulo)}
                disabled={!capitulo.disponible}
              >


                {/* NÚMERO */}

                <div className="comic-capitulo-numero">

                  {capitulo.numero}

                </div>


                {/* INFORMACIÓN */}

                <div className="comic-capitulo-info">

                  <span>
                    CAPÍTULO {capitulo.numero}
                  </span>

                  <strong>
                    {capitulo.titulo}
                  </strong>

                </div>


              </button>

            ))}


          </div>


        </aside>


      </div>


    </main>

  );
};


export default EscenaPortada;