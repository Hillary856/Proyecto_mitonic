import "./styleHillary.css";

export const SeccionEquipo = () => {
  return (
    <section className="seccion-equipo">

      <div className="equipo-integrantes">

        {/* LUISA C */}
        <div className="integrante">
          <img
            src="/public/Luisa C.png"
            alt="Luisa C"
          />
        </div>

        {/* HILLARY */}
        <div className="integrante">
          <img
            src="/public/Hillary C.png"
            alt="Hillary"
          />
        </div>

        {/* LUISA R */}
        <div className="integrante">
          <img
            src="/public/Luisa R.png"
            alt="Luisa R"
          />
        </div>

      </div>

    </section>
  );
};