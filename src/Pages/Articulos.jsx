import "../stylesheets/Articulos.css";

export const Articulos = () => {
  const items = [
    { type: "circle", height: 220 },
    { type: "star", height: 115 },
    { type: "triangle", height: 190 },
    { type: "star", height: 160 },
    { type: "triangle", height: 235 },
    { type: "star", height: 180 },
    { type: "triangle", height: 100 },
  ];

  return (
    <div className="articulos-container">
      <div className="container py-4">
        {/* Header */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
          <h1 className="articulos-title mb-0">
            ARTICULOS COLECCIONADOS
          </h1>

          <div className="d-flex gap-2 justify-content-md-end">
            <button className="btn btn-primary">
              Volver al Inicio
            </button>

            <button className="btn btn-warning">
              Volver a la historia
            </button>
          </div>
        </div>

        {/* Barras */}
        <div className="bars-wrapper">
          {items.map((item, index) => (
            <div key={index} className="bar-item">

              {/* Icono superior */}
              <div className="icon-container">

                {item.type === "circle" && (
                  <div className="blue-circle"></div>
                )}

                {item.type === "triangle" && (
                  <div className="triangle-icon">
                    <span>?</span>
                  </div>
                )}

                {item.type === "star" && (
                  <div className="star-icon">
                    <span>?</span>
                  </div>
                )}

              </div>

              {/* Barra */}
              <div
                className="collection-bar"
                style={{ height: `${item.height}px` }}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

