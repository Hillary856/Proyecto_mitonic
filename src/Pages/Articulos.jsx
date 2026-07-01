import "../stylesheets/Articulos.css";
import { useNavigate } from "react-router-dom";

export const Articulos = () => {

  const navigate = useNavigate();


  const items = [
    {
      column: "/AssetsH/Columna1.svg",
      object: "../public/AssetsH/relo1.svg",
      locked: true,
    },
    {
      column: "/AssetsH/Columna2.svg",
      object: "../public/AssetsH/estatua.svg",
      locked: true,
    },
    {
      column: "/AssetsH/Columna1.svg",
      object: "../public/AssetsH/pan.svg",
      locked: true,
    },
    {
      column: "/AssetsH/Columna2.svg",
      object: "../public/AssetsH/caballo.svg",
      locked: true,
    },
    {
      column: "/AssetsH/Columna1.svg",
      object: "../public/AssetsH/frutas.svg",
      locked: true,
    },
    {
      column: "/AssetsH/Columna2.svg",
      object: "../public/AssetsH/pergamino.svg",
      locked: true,
    },
    {
      column: "/AssetsH/Columna1.svg",
      object: "../public/AssetsH/brujula.svg",
      locked: true,
    },
  ];

  return (
    <div className="articulos-page">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center px-5 pt-4">

        <h1 className="titulo-articulos">
          ARTÍCULOS COLECCIONADOS
        </h1>

        <div className="d-flex gap-3">

          <button
            className="btn-menu-articulos"
            onClick={() => navigate("/EscenaPortada")}
          >
            Volver al Inicio
          </button>

          <button className="btn-menu-articulos amarillo">
            Volver a la historia
          </button>

        </div>

      </div>

      {/* Colección */}

      <div className="collection-container">

        {items.map((item, index) => (

          <div className="column-item" key={index}>

            <div className="object-container">

              <img
                src={item.object}
                alt=""
                className={`collection-object ${item.locked ? "locked" : ""
                  }`}
              />

              {item.locked && (
                <div className="lock-icon">
                  🔒
                </div>
              )}

            </div>

            <img
              src={item.column}
              alt=""
              className="collection-column"
            />

          </div>

        ))}

      </div>

    </div>
  );
};

export default Articulos;