import { Link } from "react-router-dom";
import "./styleHillary.css";

export const SeccionAdrian = () => {
  return (
    <section className="seccion-adrian">

      {/* CONTENIDO IZQUIERDO */}
      <div className="adrian-info">

        <h2 className="adrian-nombre">
          ADRIAN
          <br />
          SALVATIERRA
        </h2>

        <p className="adrian-profesion">
          ARQUEÓLOGO
        </p>

      </div>

      {/* FOTO DE ADRIAN */}
      <div className="adrian-foto">
        <img
          src="/Adrian.svg"
          alt="Adrian Salvatierra"
        />
      </div>

    </section>
  );
};