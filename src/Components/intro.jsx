import { useEffect, useRef, useState } from "react";
import "./intro.css";

const DURACION_SALIDA = 4000;
const CANTIDAD_HOJAS = 80;

const HOJAS = Array.from({ length: CANTIDAD_HOJAS }, (_, index) => ({
  id: index,
  style: {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,

    // Movimiento lento: entre 45 y 70 segundos
    "--duracion": `${35 + Math.random() * 25}s`,
    "--fase": `-${Math.random() * 50}s`,

    // Trayectoria independiente de cada hoja
    "--x1": `${(Math.random() - 0.5) * 35}vw`,
    "--y1": `${(Math.random() - 0.5) * 30}vh`,
    "--x2": `${(Math.random() - 0.5) * 60}vw`,
    "--y2": `${(Math.random() - 0.5) * 50}vh`,
    "--x3": `${(Math.random() - 0.5) * 45}vw`,
    "--y3": `${(Math.random() - 0.5) * 35}vh`,
    "--rotacion": `${(Math.random() - 0.5) * 180}deg`,

    // Salida de las hojas al hacer scroll
    "--salida-x": `${(Math.random() - 0.5) * 100}vw`,
    "--salida-y": `${-80 - Math.random() * 40}vh`,
    "--salida-rotacion": `${(Math.random() - 0.5) * 600}deg`,
    "--salida-retraso": `${Math.random() * 0.15}s`,
  },
}));

export default function Intro() {
  const [visible, setVisible] = useState(true);
  const [saliendo, setSaliendo] = useState(false);

  const touchStartY = useRef(null);
  const desplazamientoPendiente = useRef(0);
  const salidaIniciada = useRef(false);
  const temporizadorSalida = useRef(null);

  const iniciarSalida = () => {
    if (salidaIniciada.current) return;

    salidaIniciada.current = true;
    setSaliendo(true);

    // Deja terminar la animación de salida de 4 segundos.
    temporizadorSalida.current = window.setTimeout(() => {
      setVisible(false);
    }, DURACION_SALIDA + 200);
  };

  useEffect(() => {
    if (!visible) return;

    const overflowAnteriorHtml = document.documentElement.style.overflow;
    const overflowAnteriorBody = document.body.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const manejarScroll = (event) => {
      if (event.deltaY <= 0 || salidaIniciada.current) return;

      event.preventDefault();

      desplazamientoPendiente.current = Math.max(
        event.deltaY,
        window.innerHeight * 0.55
      );

      iniciarSalida();
    };

    const manejarTeclado = (event) => {
      const teclasScroll = [
        "ArrowDown",
        "PageDown",
        " ",
        "Spacebar",
      ];

      if (!teclasScroll.includes(event.key)) return;
      if (salidaIniciada.current) return;

      event.preventDefault();

      desplazamientoPendiente.current = window.innerHeight * 0.55;
      iniciarSalida();
    };

    window.addEventListener("wheel", manejarScroll, {
      passive: false,
      capture: true,
    });

    window.addEventListener("keydown", manejarTeclado);

    return () => {
      window.removeEventListener("wheel", manejarScroll, true);
      window.removeEventListener("keydown", manejarTeclado);

      document.documentElement.style.overflow = overflowAnteriorHtml;
      document.body.style.overflow = overflowAnteriorBody;
    };
  }, [visible]);

  // Cuando termina el intro, continúa el desplazamiento hacia la página.
  useEffect(() => {
    if (visible) return;

    const desplazamiento =
      desplazamientoPendiente.current || window.innerHeight * 0.55;

    const frame = window.requestAnimationFrame(() => {
      window.scrollBy({
        top: desplazamiento,
        behavior: "smooth",
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [visible]);

  useEffect(() => {
    return () => {
      if (temporizadorSalida.current) {
        window.clearTimeout(temporizadorSalida.current);
      }
    };
  }, []);

  const manejarInicioToque = (event) => {
    touchStartY.current = event.touches[0].clientY;
  };

  const manejarFinToque = (event) => {
    if (touchStartY.current === null || salidaIniciada.current) return;

    const touchFinalY = event.changedTouches[0].clientY;
    const diferencia = touchStartY.current - touchFinalY;

    // Deslizar el dedo hacia arriba inicia la salida.
    if (diferencia > 30) {
      desplazamientoPendiente.current = Math.max(
        diferencia,
        window.innerHeight * 0.55
      );

      iniciarSalida();
    }

    touchStartY.current = null;
  };

  if (!visible) return null;

  return (
    <div
      className={`intro-mitonic ${saliendo ? "saliendo" : ""}`}
      onTouchStart={manejarInicioToque}
      onTouchEnd={manejarFinToque}
      aria-label="Introducción de MiTonic"
    >
      <div className="intro-hojas" aria-hidden="true">
        {HOJAS.map((hoja) => (
          <span
            key={hoja.id}
            className="intro-hoja"
            style={hoja.style}
          >
            <span className="intro-hoja-aparicion">
              <img
                className="intro-hoja-viento"
                src="/Hojaverde.png"
                alt=""
                draggable="false"
              />
            </span>
          </span>
        ))}
      </div>

      <div className="intro-logo-bloque">
        <img
          className="intro-logo"
          src="/Logo.png"
          alt="MiTonic"
          draggable="false"
        />
      </div>

      {!saliendo && (
        <div className="intro-indicacion">
          <span>Desliza para descubrir</span>
          <span className="intro-flecha">↓</span>
        </div>
      )}
    </div>
  );
}