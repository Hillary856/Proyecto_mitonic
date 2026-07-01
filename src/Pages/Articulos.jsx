import "../stylesheets/Articulos.css";

export const Articulos = () => {

  const items = [
    { column: "/AssetsH/Columna1.svg", object: "../public/AssetsH/relo1.svg" },
    { column: "/AssetsH/Columna2.svg", object: "../public/AssetsH/estatua.svg" },
    { column: "/AssetsH/Columna1.svg", object: "../public/AssetsH/pan.svg" },
    { column: "/AssetsH/Columna2.svg", object: "../public/AssetsH/caballo.svg" },
    { column: "/AssetsH/Columna1.svg", object: "../public/AssetsH/frutas.svg" },
    { column: "/AssetsH/Columna2.svg", object: "../public/AssetsH/pergamino.svg" },
    { column: "/AssetsH/Columna1.svg", object: "../public/AssetsH/brujula.svg" },
  ];

  return (
    <div className="container-fluid articulos-page">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center px-5 pt-4">

        <h1 className="titulo-articulos">
          ARTÍCULOS COLECCIONADOS
        </h1>

        <div className="d-flex gap-3">

          <button className="btn btn-primary px-4">
            Volver al Inicio
          </button>

          <button className="btn btn-warning px-4">
            Volver a la historia
          </button>

        </div>

      </div>

      {/* Colección */}

      <div className="collection-container">

        {items.map((item, index) => (

          <div className="column-item" key={index}>

            {/* Objeto */}

            <img
              src={item.object}
              alt="Objeto"
              className="collection-object"
            />

            {/* Columna */}

            <img
              src={item.column}
              alt="Columna"
              className="collection-column"
            />

          </div>

        ))}

      </div>

    </div>
  );
};