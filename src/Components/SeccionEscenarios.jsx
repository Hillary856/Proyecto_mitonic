import { Link } from 'react-router-dom';


export default function SeccionEscenarios() {
  return (
    <>
      <section className="container py-5">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <div>
      <small className="text-warning fw-bold text-uppercase">
        Cartelera
      </small>

      <h2 className="display-4 fw-bold mt-2">
        Lo que estamos viendo.
      </h2>
    </div>

    <a
      href="#"
      className="text-decoration-none text-warning small"
    >
      Ver toda la cartelera ↗
    </a>
  </div>

  <div className="row g-4">
    <div className="col-lg-3 col-md-6">
      <div>
        <div
          className="bg-secondary-subtle rounded-4 position-relative"
          style={{ height: "350px" }}
        >
          <span className="badge bg-secondary position-absolute top-0 start-0 m-3">
            DRAMA
          </span>
        </div>

        <h6 className="fw-bold mt-3 mb-0">A24 Film</h6>
        <small className="text-muted">Drama · 2024</small>
      </div>
    </div>

    <div className="col-lg-3 col-md-6">
      <div>
        <div
          className="bg-secondary-subtle rounded-4 position-relative"
          style={{ height: "350px" }}
        >
          <span className="badge bg-secondary position-absolute top-0 start-0 m-3">
            NOIR
          </span>
        </div>

        <h6 className="fw-bold mt-3 mb-0">Dalenti E.</h6>
        <small className="text-muted">Noir · Same F. 2018</small>
      </div>
    </div>

    <div className="col-lg-3 col-md-6">
      <div>
        <div
          className="bg-secondary-subtle rounded-4 position-relative"
          style={{ height: "350px" }}
        >
          <span className="badge bg-secondary position-absolute top-0 start-0 m-3">
            SCI-FI
          </span>
        </div>

        <h6 className="fw-bold mt-3 mb-0">Sin título</h6>
        <small className="text-muted">Sci-Fi · 2024</small>
      </div>
    </div>

    <div className="col-lg-3 col-md-6">
      <div>
        <div
          className="bg-secondary-subtle rounded-4 position-relative"
          style={{ height: "350px" }}
        >
          <span className="badge bg-secondary position-absolute top-0 start-0 m-3">
            INDIE
          </span>
        </div>

        <h6 className="fw-bold mt-3 mb-0">Thanier</h6>
        <small className="text-muted">Indie · 2024</small>
      </div>
    </div>
  </div>
</section>
    </>
  );
}