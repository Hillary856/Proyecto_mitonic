import "./Escenas.css";

const Escena2 = () => {

  return (

    <div className="escena-2">

      <div className="escena-2-contenido">

        {/* =========================================
            FONDO DE ATENAS
        ========================================= */}

        <img
          src="/Escenarios/FondoAtenas.svg"
          alt="Atenas"
          className="escena-2-fondo"
        />


        {/* =========================================
            ÁRBOL 1
        ========================================= */}

        <img
          src="/Escenarios/arbol1.svg"
          alt=""
          className="escena-2-arbol-1"
        />


        {/* =========================================
            ÁRBOL 2
        ========================================= */}

        <img
          src="/Escenarios/arbol2.svg"
          alt=""
          className="escena-2-arbol-2"
        />


        {/* =========================================
            ARBUSTO 1
        ========================================= */}

        <img
          src="/Escenarios/arbusto1.svg"
          alt=""
          className="escena-2-arbusto-1"
        />


        {/* =========================================
            ARBUSTO 2
        ========================================= */}

        <img
          src="/Escenarios/arbusto2.svg"
          alt=""
          className="escena-2-arbusto-2"
        />


        {/* =========================================
            ARBUSTO 3
        ========================================= */}

        <img
          src="/Escenarios/arbusto3.svg"
          alt=""
          className="escena-2-arbusto-3"
        />

      </div>

    </div>

  );

};

export default Escena2;