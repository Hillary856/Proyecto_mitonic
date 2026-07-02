import lottieReact from "lottie-react";
import { useRef, useState } from "react";

import AdrianH from "../assets/AdrianH.json";
import Texto1 from "../assets/Texto1.1.json";
import Texto2 from "../assets/Texto2.json";



import "../Components/styleHillary.css";

const Lottie = lottieReact.default;

export const EscenaAdrian = () => {

    const adrianRef = useRef();
    const textoRef = useRef();

    const [textoActual, setTextoActual] = useState(1);
    const [inicioEscena, setInicioEscena] = useState(false);
    const [parpadeo, setParpadeo] = useState(false);
    const [mostrarReloj, setMostrarReloj] = useState(false);

    const reproducirEscena = () => {

        if (inicioEscena) return;

        setInicioEscena(true);
        setTextoActual(1);
        setParpadeo(false);
        setMostrarReloj(false);

        adrianRef.current.stop();
        adrianRef.current.play();

        textoRef.current.stop();
        textoRef.current.play();

        // Texto 1 termina
        setTimeout(() => {
            setParpadeo(true);
        }, 5100);

    };

    const siguienteTexto = () => {

        if (!parpadeo) return;

        if (textoActual === 1) {

            setParpadeo(false);

            setTextoActual(2);

            setTimeout(() => {

                textoRef.current.stop();
                textoRef.current.play();

            }, 100);

            // Cuando termina el texto 2 aparece el reloj
            setTimeout(() => {

                setMostrarReloj(true);

            }, 7500);

        }

    };

    return (

        <div className="pantalla-adrian">

            {/* Fondo */}
            <img
                src="../public/fondo-2.png"
                alt=""
                className="fondo-adrian"
            />

            {/* Adrián */}
            <div
                className="adrian-container"
                onClick={reproducirEscena}
            >

                <Lottie
                    lottieRef={adrianRef}
                    animationData={AdrianH}
                    autoplay={false}
                    loop={false}
                    className="adrian-lottie"
                />

            </div>

            {/* Texto */}

            <div
                className={`texto-container ${parpadeo ? "texto-parpadeo" : ""}`}
                onClick={siguienteTexto}
            >

                <Lottie
                    key={textoActual}
                    lottieRef={textoRef}
                    animationData={textoActual === 1 ? Texto1 : Texto2}
                    autoplay={false}
                    loop={false}
                    className="texto-lottie"
                />

            </div>

            {/* Reloj */}

           
          {mostrarReloj && (

    <img
        src="/AssetsH/relo1.svg"
        alt="Reloj"
        className="reloj-articulo reloj-activo"
    />

)}

        </div>

    );

};

export default EscenaAdrian;