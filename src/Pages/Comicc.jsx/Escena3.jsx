import { useState, useEffect, useRef } from "react";

import lottieReact from "lottie-react";

import AdrianHablando from "../../assets/AdrianHablando.json";

import Esc3Audio1 from "../../Audios/Esc3Audio1.mp3";
import Esc3Audio2 from "../../Audios/Esc3Audio2.mp3";
import Esc3Audio3 from "../../Audios/Esc3Audio3.mp3";
import Esc3Audio4 from "../../Audios/Esc3Audio4.mp3";
import Esc3Audio5 from "../../Audios/Esc3Audio5.mp3";
import Esc3Audio6 from "../../Audios/Esc3Audio6.mp3";

import "./Escenas.css";

const Lottie = lottieReact.default;

const Escena3 = ({
  onNarracionTerminada
}) => {

  const audiosAdrian = [
    Esc3Audio1,
    Esc3Audio2,
    Esc3Audio3,
    Esc3Audio4,
    Esc3Audio5,
    Esc3Audio6
  ];

  const [adrianVisible, setAdrianVisible] = useState(false);
  const [audioActual, setAudioActual] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {

    setAdrianVisible(true);

  }, []);

  useEffect(() => {

    if (!adrianVisible) return;

    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }

  }, [adrianVisible, audioActual]);

  const manejarFinAudio = () => {

    if (audioActual < audiosAdrian.length - 1) {
      setAudioActual((anterior) => anterior + 1);
    } else if (onNarracionTerminada) {
      onNarracionTerminada();
    }

  };

  return (

    <div className="escena-3">

      <div className="escena-3-contenido">

        {/* =========================================
            FONDO DE LA ESCENA
        ========================================= */}

        <img
          src="/Escenarios/FondoAgora.svg"
          alt="Ágora"
          className="escena-3-fondo"
        />

        {adrianVisible && (

          <div className="escena-3-adrian-hablando">

            <Lottie
              animationData={AdrianHablando}
              loop={true}
              autoplay={true}
            />

          </div>

        )}

        <audio
          ref={audioRef}
          src={audiosAdrian[audioActual]}
          onEnded={manejarFinAudio}
        />

      </div>

    </div>
  );
};

export default Escena3;