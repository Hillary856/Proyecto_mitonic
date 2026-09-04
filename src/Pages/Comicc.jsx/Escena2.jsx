import "./Escenas.css";

const Escena2 = () => {
  return (
    <div className="escena-2">

      <div className="escena-2-contenido">

        {/* =================================================
            FONDO DE ATENAS
            Sistema de coordenadas: 1024 × 598
        ================================================= */}

        <img
          src="/Escenarios/FondoAtenas.svg"
          alt="Atenas"
          className="escena-2-fondo"
        />

        {/* =================================================
            ELEMENTOS DE LA ESCENA
            Todos utilizan el mismo sistema de
            coordenadas del fondo.
        ================================================= */}

        <svg
          className="escena-2-overlay"
          viewBox="0 0 1024 598"
          preserveAspectRatio="none"
        >

          {/* =================================================
              ÁRBOL 1
          ================================================= */}

          <image
            href="/Escenarios/arbol1.svg"
            x="939"
            y="79"
            width="120"
            height="278"
          />

          {/* =================================================
              ÁRBOL 2
          ================================================= */}

          <image
            href="/Escenarios/arbol2.svg"
            x="914"
            y="105"
            width="70"
            height="250"
          />

          {/* =================================================
              ARBUSTO 1
          ================================================= */}

          <image
            href="/Escenarios/arbusto1.svg"
            x="890"
            y="300"
            width="150"
            height="100"
          />

          {/* =================================================
              ARBUSTO 2
          ================================================= */}

          <image
            href="/Escenarios/arbusto2.svg"
            x="425"
            y="323"
            width="90"
            height="85"
          />

          {/* =================================================
              ARBUSTO 3
          ================================================= */}

          <image
            href="/Escenarios/arbusto3.svg"
            x="223"
            y="300"
            width="110"
            height="105"
          />

        </svg>

      </div>
    </div>
  );
};

export default Escena2;