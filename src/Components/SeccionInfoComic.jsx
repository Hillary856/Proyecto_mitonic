
export const SeccionInfoComic = () => {
  return (
    <>
    
    <section className="bg-light py-5">
      <div className="container">

        {/* Encabezado */}
        <p className="text-warning fw-bold text-uppercase small mb-3">
          Mitonic y lo transmedial
        </p>

        <h2 className="display-4 fw-bold mb-5">
          En busca de
          <br />
          la innovación y lo contemporáneo.
        </h2>

        {/* Cards superiores */}
        <div className="row g-4 mb-4">

          {/* Card oscura */}
          <div className="col-lg-8">

            <div className="card bg-dark text-white border-0 shadow h-100">

              <div className="card-body d-flex flex-column justify-content-end p-5">

                <h3 className="fw-bold display-6 mb-3">
                  ¿Qué es un comic interactivo?
                </h3>

                <p className="text-white-50 mb-0">
                  Es una versión digital que permite al lector participar
                  en la historia mediante animaciones, sonidos o decisiones
                  que cambian la trama.
                </p>

              </div>

            </div>

          </div>

          {/* Card amarilla */}
          <div className="col-lg-4">

            <div className="card bg-warning border-0 shadow h-100">

              <div className="card-body d-flex flex-column justify-content-end p-5">

                <h3 className="fw-bold mb-3">
                  ¿Cómo lo implementamos?
                </h3>

                <p className="mb-0">
                  En Mitonic puede aplicarse con elecciones de caminos,
                  objetos que revelen información y efectos visuales o
                  sonoros que hagan la experiencia más inmersiva.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Card inferior */}
        <div className="row">

          <div className="col-12">

            <div className="card bg-secondary-subtle border-0 shadow-sm">

              <div className="card-body p-4">

                <p className="text-warning fw-bold mb-4">
                  Somos una línea del tiempo
                </p>

                <h4 className="fw-bold mb-0">
                  En este capítulo exploramos Grecia y Roma, sus mitos,
                  costumbres y aportes, pero la historia sigue con más
                  capítulos que recorren distintas épocas de forma
                  divertida y diferente.
                </h4>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>


 </>
  );
}