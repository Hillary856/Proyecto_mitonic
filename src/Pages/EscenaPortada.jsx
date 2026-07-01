import "../Components/styleHillary.css"
import { useRef } from "react";



export const EscenaPortada = () => {
  return (
    <>
      <div className="portada-container vh-100 vw-100 d-flex justify-content-center align-items-center position-relative">


        <div
          className="position-relative d-flex flex-column justify-content-center align-items-center"
          style={{ width: "900px" }}
        >

          <img className="fondopri" src="../public/fondopri.png" alt="" />

          {/* Sol */}
          <div className="fondo-sol-parpadeando">
            <img className="fondo1" src="../public/AssetsH/sol2.svg" alt="" />
          </div>

          {/* Botón sonido */}
          <div className="btn-sonido position-absolute">
            <button className="btn btn-warning rounded-circle sonido-circle"></button>
          </div>

          {/* Botón logo */}
          <div className="btn-logo position-absolute">
            <button className="btn btn-danger rounded-circle logo-circle"></button>
          </div>

          <div className="navegacion-inferior position-absolute bottom-0 start-50 translate-middle-x mb-5">

            <button className="menu-btn mb-3">
              INDICACIONES
            </button>

            <button className="menu-btn">
              ARTÍCULOS
            </button>

          </div>

        </div>
      </div>
    </>
  )
}

export default EscenaPortada;