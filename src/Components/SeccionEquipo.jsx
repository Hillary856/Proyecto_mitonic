import { useEffect, useRef, useState } from "react";
import "./styleHillary.css";

export const SeccionEquipo = () => {

  const equipoRef = useRef(null);

  const [visible, setVisible] = useState(false);

  // Guarda cuál integrante está volteada (null = ninguna)
  const [volteada, setVolteada] = useState(null);

  // Guarda el temporizador para poder limpiarlo
  const temporizadorRef = useRef(null);



  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.target === equipoRef.current) {
            setVisible(entry.isIntersecting);
          }

        });

      },
      {
        threshold: 0.2
      }
    );


    if (equipoRef.current) {
      observer.observe(equipoRef.current);
    }


    return () => {
      observer.disconnect();
    };

  }, []);


  // Limpia el temporizador si el componente se desmonta
  useEffect(() => {
    return () => {
      if (temporizadorRef.current) {
        clearTimeout(temporizadorRef.current);
      }
    };
  }, []);


  // Voltea la tarjeta y la regresa sola después de 6.5 segundos
  const manejarClick = (nombre) => {

    if (temporizadorRef.current) {
      clearTimeout(temporizadorRef.current);
    }

    setVolteada(nombre);

    temporizadorRef.current = setTimeout(() => {
      setVolteada(null);
    }, 18000);

  };


  return (

    <section
      ref={equipoRef}
      className={`seccion-equipo ${
        visible ? "visible" : ""
      }`}
    >
      <h2 className="equipo-titulo">
        EQUIPO
      </h2>

      <div className="equipo-integrantes">


        {/* LUISA C */}

        <div
          className={`integrante ${volteada === "luisaC" ? "volteada" : ""}`}
          onClick={() => manejarClick("luisaC")}
        >

          <div className="integrante-interior">

            <div className="integrante-frente">
              <img
                src="/LUISA%20C.png"
                alt="Luisa C"
              />
            </div>

            <div className="integrante-reverso">
              <h3>Luisa C</h3>
              <p>
             Mi nombre es Luisa Chavarría Peláez, tengo 18 años y estudio una Tecnología en Producción Multimedia. Me gusta la creatividad, el diseño y todo lo relacionado con el mundo digital. Soy una persona responsable, creativa y con muchas ganas de aprender cosas nuevas. Me gusta desarrollar ideas, adquirir experiencia y mejorar mis habilidades para crecer tanto personal como profesionalmente.
              </p>
            </div>

          </div>

        </div>



        {/* HILLARY */}

        <div
          className={`integrante ${volteada === "hillary" ? "volteada" : ""}`}
          onClick={() => manejarClick("hillary")}
        >

          <div className="integrante-interior">

            <div className="integrante-frente">
              <img
                src="/HILLARY%20C.png"
                alt="Hillary"
              />
            </div>

            <div className="integrante-reverso">
              <h3>Hillary</h3>
              <p>
               Soy una profesional en producción multimedia, creativa, extrovertida y apasionada por la comunicación y el diseño audiovisual. Contar historias a través del diseño, la fotografía y el video. Me caracterizo por mi iniciativa, capacidad de trabajo en equipo y curiosidad por aprender, siempre buscando aportar una perspectiva auténtica y creativa a cada proyecto.
              </p>
            </div>

          </div>

        </div>



        {/* LUISA R */}

        <div
          className={`integrante ${volteada === "luisaR" ? "volteada" : ""}`}
          onClick={() => manejarClick("luisaR")}
        >

          <div className="integrante-interior">

            <div className="integrante-frente">
              <img
                src="/LUISA%20R.png"
                alt="Luisa R"
              />
            </div>

            <div className="integrante-reverso">
              <h3>Luisa R</h3>
              <p>
               Mi nombre es Luisa Restrepo y tengo 19 años. Soy una persona
        amable y resiliente, que se adapta con facilidad a los retos que
        se presenten. Me apasiona el diseño visual y disfruto convertir
        ideas en piezas con identidad y sentido. Creo que cada proyecto
        es una oportunidad para aprender, crecer y dar lo mejor de mí.
              </p>
            </div>

          </div>

        </div>


      </div>


    </section>

  );
};