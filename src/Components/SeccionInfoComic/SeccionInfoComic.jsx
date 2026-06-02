
import { Link } from 'react-router-dom';
import '../SeccionInfoComic/SeccionInfoComic.css'
export const SeccionInfoComic = () => {
  return (
    <>
    <div className="si-root">

        
        <p className="si-label">MITONIC Y LO TRANSMEDIAL</p>
        <h2 className="si-titulo">
          En busca de<br /> la innovación y lo contemporaneo.
 
        </h2>

        
        <div className="si-cards-top">

          {/* Card oscura */}
          <div className="si-card-dark">
            <div className="si-card-dark-bg"></div>
            <div className="si-card-dark-img"></div>
            <div className="si-card-dark-content">
              <span className="si-card-icon"></span>
              <h3>¿Que es un comic interactivo?</h3>
              <p>
                Es una versión digital que permite al lector participar en la historia mediante animaciones, sonidos o decisiones que cambian la trama. 
              </p>
            </div>
          </div>

          {/* Card naranja */}
          <div className="si-card-orange">
            <span className="si-card-orange-icon"></span>
            <h3>¿Como lo implementamos?</h3>
            <p>
              En Mitonic puede aplicarse con elecciones de caminos, objetos que revelen información y efectos visuales o sonoros que hagan la experiencia más inmersiva.
            </p>
          </div>

        </div>

        {/* la ultima */}
        <div className="si-cards-bottom">

          <div className="si-card-small">
            <span className="si-card-num"> Somos una linea del tiempo</span>
            <h4> En este capítulo exploramos Grecia y Roma, sus mitos, costumbres y aportes, pero la historia sigue con más capítulos que recorren distintas épocas de forma divertida y diferente.</h4>
          </div>

        </div>

      </div>
    

 </>
  );
}