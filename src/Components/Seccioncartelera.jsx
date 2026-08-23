export const Seccioncartelera = () => {
  return (
    <section className="cartelera-mitonic">

      {/* ========================================= */}
      {/* FONDO DE TIERRA */}
      {/* ========================================= */}

      <div className="tierra-cartelera">
        <img
          src="/tierra.svg"
          alt=""
        />
      </div>


      {/* ========================================= */}
      {/* CONTENIDO DE LA CARTELERA */}
      {/* ========================================= */}

      <div className="contenido-cartelera">


        {/* ========================================= */}
        {/* CONTROLES */}
        {/* ========================================= */}

        <div className="controles-cartelera">

          <button className="boton-cartelera">
            <img src="/public/btn1.svg" alt="" />
            <span>‹</span>
          </button>

          <button className="boton-cartelera">
            <img src="/public/btn2.svg" alt="" />
            <span>›</span>
          </button>

        </div>


        {/* ========================================= */}
        {/* FONDOS DEL CÓMIC */}
        {/* ========================================= */}

        <div className="fondos-cartelera">


          {/* FONDO 1 */}

          <div className="cartelera fondo-1">
            <div className="">
            </div>
          </div>


          {/* FONDO 2 */}

          <div className="cartelera fondo-2">
            <div className="">
            </div>
          </div>


          {/* FONDO 3 */}

          <div className="cartelera fondo-3">
            <div className="">
            </div>
          </div>


          {/* FONDO 4 */}

          <div className="cartelera fondo-4">
            <div className="">
            </div>
          </div>


        </div>

      </div>


    </section>
  );
};