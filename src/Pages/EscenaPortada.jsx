import "../Components/styleHillary.css"
import { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";




export const EscenaPortada = () => {

  const [animarSol, setAnimarSol] = useState(false);
  const [mostrarIndicaciones, setMostrarIndicaciones] = useState(false);
  const navigate = useNavigate();

  const comenzarHistoria = () => {


  setAnimarSol(true);

  
  setTimeout(() => {

    navigate("/escenaadrian");

  }, 2500); 

};

  return (
    <>
      <div className="portada-container vh-100 vw-100 d-flex justify-content-center align-items-center position-relative">


        <div
          className="position-relative d-flex flex-column justify-content-center align-items-center"
          style={{ width: "900px" }}
        >

          <img className="fondopri" src="../public/fondopri.png" alt="" />

          <div className="fondo-sol-parpadeando">
            <img
              className={`fondo1 ${animarSol ? "sol-desaparece" : ""}`}
              src="../public/AssetsH/sol2.svg"
              alt=""
              onClick={comenzarHistoria}
            />
          </div>

          {/* Oscurece toda la pantalla */}
          <div className={`pantalla-negra ${animarSol ? "activa" : ""}`}></div>

          {/* Botón sonido */}
          <div className="btn-sonido position-absolute">
            <button className="btn btn-warning rounded-circle sonido-circle"></button>
          </div>

          {/* Botón logo */}
          <div className="btn-logo position-absolute">
            <button className="btn btn-danger rounded-circle logo-circle"></button>
          </div>

          <div className="navegacion-inferior position-absolute bottom-0 start-50 translate-middle-x mb-5">

            <button
              className="menu-btn mb-3"
              onClick={() => setMostrarIndicaciones(true)}
            >
              INDICACIONES
            </button>

            <button
              className="menu-btn"
              onClick={() => navigate("/articulos")}
            >
              ARTÍCULOS
            </button>

          </div>

        </div>
      </div>
      {mostrarIndicaciones && (
        <div
          className="modal-indicaciones-overlay"
          onClick={() => setMostrarIndicaciones(false)}
        >
          <div
            className="modal-indicaciones"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="cerrar-modal"
              onClick={() => setMostrarIndicaciones(false)}
            >
              ✕
            </button>

            <h2>INDICACIONES</h2>

            <ol>
              <li>
                Haz clic sobre el <strong>sol</strong> para comenzar la historia.
              </li>

              <li>
                Explora el escenario y presta atención a los elementos
                interactivos. Algunos reaccionarán cuando pases el cursor
                sobre ellos o hagas clic.
              </li>

              <li>
                Disfruta la experiencia y sigue el recorrido hasta completar
                la historia.
              </li>
            </ol>

          </div>
        </div>
      )}




    </>
  )
}

export default EscenaPortada;