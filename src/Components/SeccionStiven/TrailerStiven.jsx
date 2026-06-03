import React from 'react'

const TrailerStiven = () => {
  return (
   <>
 
    <div className="bg-dark text-light min-vh-100">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom">
        <div className="container">
          <a className="navbar-brand fw-bold fs-2" href="#">
            MITONIC<span className="text-warning">.</span>
          </a>

          <button
            className="navbar-toggler"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="menu">

            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link" href="#">PELÍCULAS</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">COLECCIONABLES</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">EQUIPO</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#">CONTACTO</a>
              </li>
            </ul>

            <button className="btn btn-warning">
              IR A LA TIENDA
            </button>

          </div>
        </div>
      </nav>

      {/* Contenido */}
      <div className="container py-5">

        <div className="row mb-4">

          <div className="col-lg-8">
            <p className="text-warning fw-bold">
              TRÁILER OFICIAL
            </p>

            <h1 className="display-4 fw-bold">
              Noith: La lluvia no olvida
              <span className="text-warning">.</span>
            </h1>

            <p className="text-secondary">
              Descubre el universo de Noith en este tráiler oficial.
            </p>
          </div>

          <div className="col-lg-4 text-lg-end">
            <button className="btn btn-outline-light">
              Volver a ver cómic
            </button>
          </div>

        </div>

        <div className="row g-4">

          {/* Video */}
          <div className="col-lg-8">
            <div className="card bg-black border-secondary">

              <img
                src="/img/trailer.jpg"
                alt="Trailer"
                className="card-img-top"
              />

              <div className="card-body">
                <input
                  type="range"
                  className="form-range"
                />
              </div>

            </div>
          </div>

          {/* Información */}
          <div className="col-lg-4">

            <div className="card bg-black border-secondary h-100">

              <div className="card-body">

                <h5 className="text-warning">
                  INFORMACIÓN
                </h5>

                <ul className="list-group list-group-flush">

                  <li className="list-group-item bg-black text-light">
                    Duración: 1:32
                  </li>

                  <li className="list-group-item bg-black text-light">
                    Formato: 16:9
                  </li>

                  <li className="list-group-item bg-black text-light">
                    Resolución: 4K
                  </li>

                  <li className="list-group-item bg-black text-light">
                    Audio: Estéreo
                  </li>

                </ul>

                <div className="d-grid gap-2 mt-4">
                  <button className="btn btn-warning">
                    Ver en YouTube
                  </button>

                  <button className="btn btn-outline-light">
                    Descargar Trailer
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  
   </>
  )
}

export default TrailerStiven