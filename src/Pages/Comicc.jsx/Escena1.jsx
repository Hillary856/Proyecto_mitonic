import "./Escenas.css";

const Escena1 = () => {
  return (
    <div className="escena-1">

      <div className="escena-1-contenido">


        <img
          src="/Escenarios/FondoCueva.svg"
          alt="Cueva"
          className="escena-1-fondo"
        />

        <svg
          className="escena-1-overlay"
          viewBox="0 0 1024 598"
          preserveAspectRatio="none"
        >


          <image
            href="/Escenarios/fuegoAnto.svg"
            x="302"
            y="185"
            width="35"
            height="75"
          />

        </svg>

      </div>

    </div>
  );
};

export default Escena1;