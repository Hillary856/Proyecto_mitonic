import React from 'react'

export const SeccionHeader = () => {
  return (
    <>
    <div className="sh-root">

        
        <nav className="sh-navbar">
          <span className="sh-brand">Logo</span>

          <ul className="sh-nav-links">
            <li><span className="sh-nav-link">Trailer</span></li>
            <li><span className="sh-nav-link">Escenarios</span></li>
            <li><span className="sh-nav-link">Equipo</span></li>
            <li><span className="sh-nav-link">Personajes</span></li>
          </ul>

          <span className="sh-btn-tienda">Ir a al Comic</span>
        </nav>

       
        <section className="sh-hero">

        
          <div className="sh-left">
            <div className="sh-badge">
              <span className="sh-badge-dot"></span>
            transmitiendo grandeza, conocimiento y poder.
            </div>

            <h1 className="sh-titulo">
             Mitonic como
              <span className="sh-highlight">puente de<br />sabiduria.</span>
            </h1>

            <p className="sh-descripcion">
              <ul>
                <li>Mito: la inspiración en la mitología griega y romana.</li>
                <li>Toni (Othoni): que significa “pantalla”, relacionándolo con lo visual.</li>
                <li>NIC es la referencia al componente tecnológico.</li>
              </ul>
            </p>

            <div className="sh-ctas">
              <span className="sh-btn-catalogo">
                Descubre más &nbsp;↗
              </span>
              <span className="sh-btn-trailer">
                <span className="sh-play-icon">▶</span>
                Ver tráiler
              </span>
            </div>
          </div>

          
          <div className="sh-right">
            <div className="sh-image-card">
              <img
                  src=""
                  alt="Portada"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>

            <div className="sh-review-card">
              <div className="sh-review-stars">★★★★★</div>
              <p className="sh-review-text">
                "Una obra maestra que fusiona mitología y tecnología de manera épica. Mitonic es un viaje visual impresionante que cautiva desde el primer momento."
              </p>
            </div>
          </div>

        </section>
      </div>
    </>
  );
}
