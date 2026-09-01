import "./Escenas.css";

const Escena1 = () => {
  return (
    <div className="escena-1">

      {/* =========================================
          FONDO DE LA ESCENA
      ========================================= */}

      <img
        src="/Escenarios/FondoCueva.svg"
        alt="Cueva"
        className="escena-1-fondo"
      />


      {/* =========================================
          FUEGO
      ========================================= */}

      <img
        src="/Escenarios/fuegoAnto.svg"
        alt="Fuego"
        className="escena-1-fuego"
      />

    </div>
  );
};

export default Escena1;