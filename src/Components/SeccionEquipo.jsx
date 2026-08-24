import { useEffect, useRef, useState } from "react";
import "./styleHillary.css";

export const SeccionEquipo = () => {

  const equipoRef = useRef(null);

  const [visible, setVisible] = useState(false);


  /* =========================================
     DETECTAR SCROLL
  ========================================= */

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


  return (

    <section
      ref={equipoRef}
      className={`seccion-equipo ${
        visible ? "visible" : ""
      }`}
    >


      {/* =========================================
          TÍTULO
      ========================================= */}

      <h2 className="equipo-titulo">
        EQUIPO
      </h2>



      {/* =========================================
          INTEGRANTES
      ========================================= */}

      <div className="equipo-integrantes">


        {/* LUISA C */}

        <div className="integrante">

          <img
            src="/public/Luisa C.png"
            alt="Luisa C"
          />

        </div>



        {/* HILLARY */}

        <div className="integrante">

          <img
            src="/public/Hillary C.png"
            alt="Hillary"
          />

        </div>



        {/* LUISA R */}

        <div className="integrante">

          <img
            src="/public/Luisa R.png"
            alt="Luisa R"
          />

        </div>


      </div>


    </section>

  );
};