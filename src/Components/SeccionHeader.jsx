import { Link } from 'react-router-dom';


export const SeccionHeader = () => {
  return (
    <>
    
    
      <div className="bg-light min-vh-100">

        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
          <div className="container">

            <span className="navbar-brand fs-2 fw-bold">
              Logo
            </span>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarMitonic"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-center"
              id="navbarMitonic"
            >
              <ul className="navbar-nav gap-lg-4 text-uppercase fw-bold">
                <li className="nav-item">
                  <span className="">Trailer</span>
                </li>

                <li className="nav-item">
                  <span className="">Escenarios</span>
                </li>

                <li className="nav-item">
                  <span className="">Equipo</span>
                </li>

                <li className="nav-item">
                  <span className="">Personajes</span>
                </li>
              </ul>
            </div>

            <Link
              to="/comic"
              className="btn btn-primary rounded-pill"
            >
              Ir al Comic
            </Link>

          </div>
        </nav>

        {/* Hero */}
        <section className="container">
          <div className="row align-items-center min-vh-100">

            {/* Columna izquierda */}
            <div className="col-lg-6">

              <span className="badge bg-warning text-dark rounded-pill px-3 py-2 mb-3">
                ● Transmitiendo grandeza, conocimiento y poder
              </span>

              <h1 className="display-2 fw-bold">
                Mitonic como
                <span className="d-block text-warning">
                  puente de sabiduría
                </span>
              </h1>

              <ul className="fs-5 text-secondary mt-4">
                <li>
                  Mito: la inspiración en la mitología griega y romana.
                </li>

                <li>
                  Toni (Othoni): significa "pantalla", relacionándolo con lo visual.
                </li>

                <li>
                  NIC: referencia al componente tecnológico.
                </li>
              </ul>

              <div className="d-flex flex-wrap gap-3 mt-4">

                <button className="btn btn-warning btn-lg">
                  Descubre más ↗
                </button>

                <button className="btn btn-outline-dark btn-lg">
                  ▶ Ver tráiler
                </button>

              </div>

            </div>

            {/* Columna derecha */}
            <div className="col-lg-6 mt-5 mt-lg-0">

              <div className="card shadow-lg border-0">

                <img
                  src="https://placehold.co/800x600"
                  alt="Portada"
                  className="card-img-top"
                />

                <div className="card-body">

                  <div className="text-warning fs-5 mb-2">
                    ★★★★★
                  </div>

                  <p className="card-text text-muted">
                    Una obra maestra que fusiona mitología y tecnología de
                    manera épica. Mitonic es un viaje visual impresionante
                    que cautiva desde el primer momento.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>

      </div>
    </>
  );
};
    