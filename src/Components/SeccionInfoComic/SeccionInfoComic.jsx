import React from 'react'

export const SeccionInfoComic = () => {
  return (
    <>
    <div className="si-root">

        {/* ─── ENCABEZADO ─── */}
        <p className="si-label">Por qué Mi Marca</p>
        <h2 className="si-titulo">
          El cómic y el objeto,<br />en su máxima expresión.
        </h2>

        {/* ─── CARDS GRANDES ─── */}
        <div className="si-cards-top">

          {/* Card oscura */}
          <div className="si-card-dark">
            <div className="si-card-dark-bg"></div>
            <div className="si-card-dark-img"></div>
            <div className="si-card-dark-content">
              <span className="si-card-icon"></span>
              <h3>Curaduría de autor</h3>
              <p>
                Cada título y cada pieza es seleccionada por un colectivo de
                artistas, críticos y diseñadores. Sin algoritmos, sin ruido.
              </p>
            </div>
          </div>

          {/* Card naranja */}
          <div className="si-card-orange">
            <span className="si-card-orange-icon"></span>
            <h3>Ediciones<br />limitadas</h3>
            <p>
              Tiradas numeradas, prints exclusivos
              y figuras de tiraje corto.
            </p>
          </div>

        </div>

        {/* ─── CARDS PEQUEÑAS ─── */}
        <div className="si-cards-bottom">

          <div className="si-card-small">
            <span className="si-card-num">01 /</span>
            <h4>Cómic independiente</h4>
            <p>Festivales, clásicos restaurados y cortos premiados.</p>
          </div>

          <div className="si-card-small">
            <span className="si-card-num">02 /</span>
            <h4>Envío al mundo</h4>
            <p>Empaquetado de archivo. Llega como debe llegar: impecable.</p>
          </div>

          <div className="si-card-small">
            <span className="si-card-num">03 /</span>
            <h4>Comunidad activa</h4>
            <p>Acceso a proyecciones, conversatorios y preventas.</p>
          </div>

        </div>

      </div>
    

 </>
  );
}