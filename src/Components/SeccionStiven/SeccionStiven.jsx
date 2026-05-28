import "./SeccionStiven.css"

const SeccionStiven = () => {
  return (
    <div>

<div className="container py-5">

  {/* TITULO */}
  <h2 className="text-center fw-bold text-secondary mb-5">
    NUESTROS PERSONAJES
  </h2>

  {/* CARRUSEL */}
  <div
    id="personajesCarousel"
    className="carousel slide"
    data-bs-ride="carousel"
  >

    {/* BOTONES */}
    <div className="carousel-indicators">

      <button
        type="button"
        data-bs-target="#personajesCarousel"
        data-bs-slide-to="0"
        className="active"
      ></button>

      <button
        type="button"
        data-bs-target="#personajesCarousel"
        data-bs-slide-to="1"
      ></button>

    </div>

    {/* CONTENIDO */}
    <div className="carousel-inner">

      {/* SLIDE 1 */}
      <div className="carousel-item active">

        <div className="row g-4 justify-content-center">

          {/* CARD */}
          <div className="col-12 col-sm-6 col-lg-3">

            <div className="card bg-secondary border-0 rounded-4 h-100 text-white">

              <div
                className="bg-dark-subtle rounded-4 m-3"
                style={{ height: "180px" }}
              ></div>

              <div className="card-body text-center">

                <h5>Personaje 1</h5>

                <p className="small">
                  Texto descriptivo del personaje.
                </p>

              </div>

            </div>

          </div>

          {/* CARD */}
          <div className="col-12 col-sm-6 col-lg-3">

            <div className="card bg-secondary border-0 rounded-4 h-100 text-white">

              <div
                className="bg-dark-subtle rounded-4 m-3"
                style={{ height: "180px" }}
              ></div>

              <div className="card-body text-center">

                <h5>Personaje 2</h5>

                <p className="small">
                  Texto descriptivo del personaje.
                </p>

              </div>

            </div>

          </div>

          {/* CARD */}
          <div className="col-12 col-sm-6 col-lg-3">

            <div className="card bg-secondary border-0 rounded-4 h-100 text-white">

              <div
                className="bg-dark-subtle rounded-4 m-3"
                style={{ height: "180px" }}
              ></div>

              <div className="card-body text-center">

                <h5>Personaje 3</h5>

                <p className="small">
                  Texto descriptivo del personaje.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* SLIDE 2 */}
      <div className="carousel-item">

        <div className="row g-4 justify-content-center">

          {/* CARD */}
          <div className="col-12 col-sm-6 col-lg-3">

            <div className="card bg-secondary border-0 rounded-4 h-100 text-white">

              <div
                className="bg-dark-subtle rounded-4 m-3"
                style={{ height: "180px" }}
              ></div>

              <div className="card-body text-center">

                <h5>Personaje 4</h5>

                <p className="small">
                  Texto descriptivo del personaje.
                </p>

              </div>

            </div>

          </div>

          {/* CARD */}
          <div className="col-12 col-sm-6 col-lg-3">

            <div className="card bg-secondary border-0 rounded-4 h-100 text-white">

              <div
                className="bg-dark-subtle rounded-4 m-3"
                style={{ height: "180px" }}
              ></div>

              <div className="card-body text-center">

                <h5>Personaje 5</h5>

                <p className="small">
                  Texto descriptivo del personaje.
                </p>

              </div>

            </div>

          </div>

          {/* CARD */}
          <div className="col-12 col-sm-6 col-lg-3">

            <div className="card bg-secondary border-0 rounded-4 h-100 text-white">

              <div
                className="bg-dark-subtle rounded-4 m-3"
                style={{ height: "180px" }}
              ></div>

              <div className="card-body text-center">

                <h5>Personaje 6</h5>

                <p className="small">
                  Texto descriptivo del personaje.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    {/* FLECHAS */}
    <button
      className="carousel-control-prev"
      type="button"
      data-bs-target="#personajesCarousel"
      data-bs-slide="prev"
    >

      <span className="carousel-control-prev-icon"></span>

    </button>

    <button
      className="carousel-control-next"
      type="button"
      data-bs-target="#personajesCarousel"
      data-bs-slide="next"
    >

      <span className="carousel-control-next-icon"></span>

    </button>

  </div>

</div>



<section className="container py-5">

  {/* TITULO */}
  <h2 className="text-center fw-bold text-secondary mb-4">
    EQUIPO MITONIC
  </h2>

  {/* TEXTO */}
  <p className="text-center text-muted mx-auto mb-5 w-75">

    Mitonic está conformado por dos personas
    creativas y apasionadas que combinan sus talentos
    en narrativa, arte, tecnología y organización
    para dar vida a un cómic interactivo único.
    Juntos trabajan en equipo, aportando ideas frescas
    y complementándose para que la marca crezca y
    conecte con el público.

  </p>

  {/* CARDS */}
  <div className="row justify-content-center g-4">

    {/* CARD 1 */}
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">

      <div className="card border-0 bg-secondary-subtle rounded-0 text-center h-100">

        {/* IMAGEN */}
        <div
          className="bg-secondary"
          style={{ height: "220px" }}
        ></div>

        {/* CONTENIDO */}
        <div className="card-body">

          <h5 className="fw-bold text-dark">
            STIVEN
          </h5>

          <p className="text-muted small">

            Descripción del integrante,
            habilidades y rol dentro
            del proyecto.

          </p>

        </div>

      </div>

    </div>

    {/* CARD 2 */}
    <div className="col-12 col-sm-6 col-md-4 col-lg-3">

      <div className="card border-0 bg-secondary-subtle rounded-0 text-center h-100">

        {/* IMAGEN */}
        <div
          className="bg-secondary"
          style={{ height: "220px" }}
        ></div>

        {/* CONTENIDO */}
        <div className="card-body">

          <h5 className="fw-bold text-dark">
            Hillary
          </h5>

          <p className="text-muted small">

            Descripción del integrante,
            habilidades y rol dentro
            del proyecto.

          </p>

        </div>

      </div>

    </div>

  </div>

</section>


<footer className="container-fluid bg-secondary-subtle py-5">

  <div className="container">

   
    <div className="mb-5">

      <h3 className="fw-ligh ">
        MITONIC
      </h3>

    </div>

    <div className="row">

      {/* IZQUIERDA */}
      <div className="col-lg-6">

        {/* TITULO */}
        <h3 className="fw-light text-dark mb-4">

          COMUNICATE CON NOSOTROS

        </h3>

  
        <div
          className="
            bg-light
            border
            d-flex
            align-items-center
            gap-3
            px-4
            py-3
            mb-5
            w-75
          "
        >

          <i className="bi bi-envelope fs-4 text-secondary"></i>

          <span className="text-secondary fs-4">

            mitonicgroup@gmail.com

          </span>

        </div>

        {/* SOCIAL */}
        <h2 className="fw-light text-dark mb-4">

          SOCIAL

        </h2>

        <div className="d-flex gap-4 mb-5">

          <i className="bi bi-instagram fs-1 text-secondary"></i>

          <i className="bi bi-twitter-x fs-1 text-secondary"></i>

          <i className="bi bi-whatsapp fs-1 text-secondary"></i>

        </div>

      </div>

    </div>

   
    <hr className="border-secondary opacity-100" />

    {/* ABAJO */}
    <div className="row mt-4">

     
      <div className="col-lg-6">

        <h3 className="fw-light text-secondary mb-4">

          © 2025 MITONIC STUDIO

        </h3>

        <div className="d-flex gap-5">

          <h3 className="fw-light text-secondary">

            PRIVACIDAD

          </h3>

          <h3 className="fw-light text-secondary">

            TERMINOS

          </h3>

        </div>

      </div>

     
      <div className="col-lg-6 text-lg-end mt-4 mt-lg-0">

        <h3 className="fw-light text-secondary">

          TODOS LOS DERECHOS
          <br />
          RESERVADOS

        </h3>

      </div>

    </div>

  </div>

</footer>









        
    </div>  )
}

export default SeccionStiven