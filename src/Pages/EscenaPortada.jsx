import "../Components/styleHillary.css"
import { useRef } from "react";



export const EscenaPortada = () => {
  return (
    <>
     <div className="portada-container vh-100 vw-100 d-flex justify-content-center align-items-center position-relative">

      {/* Fondo gris (placeholder para imagen futura) */}
      <div className="fondo-gris-imagen position-relative w-100 h-100 d-flex flex-column justify-content-center align-items-center">

      

        {/* Sol */}
        <div className="position-relative d-flex align-items-center">
          <div className="fondo-sol-parpadeando"></div>

          {/* Instrucción clic */}
         
        </div>

        {/* Navegación inferior */}
        <div className="navegacion-inferior position-absolute bottom-0 start-50 translate-middle-x mb-2 text-center">

         

          <h2 className="fs-3 mb-1">INDICACIONES</h2>
          <h3 className="fs-4">ARTICULOS</h3>
        </div>
      </div>

      {/* Botón sonido */}
      <div className="btn-sonido position-absolute d-flex align-items-center">
       

        <button className="btn btn-warning rounded-circle sonido-circle"></button>
      </div>

      {/* Botón logo */}
      <div className="btn-logo position-absolute d-flex align-items-center">
        <button className="btn btn-danger rounded-circle logo-circle"></button>

      
      </div>
    </div>
  );
    </>
  )
}

export default EscenaPortada;