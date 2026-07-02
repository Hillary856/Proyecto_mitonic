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
    const [mostrarFlecha, setMostrarFlecha] = useState(false);
    const [inicioEscena, setInicioEscena] = useState(false);

    const reproducirEscena = () => {

        if (inicioEscena) return;

        setInicioEscena(true);

        setTextoActual(1);
        setMostrarFlecha(false);

        adrianRef.current.stop();
        adrianRef.current.play();

        textoRef.current.stop();
        textoRef.current.play();

        // Texto 1 dura 5.1 segundos
        setTimeout(() => {

            setMostrarFlecha(true);

        }, 5100);

    };

    const siguienteTexto = () => {

        if (!mostrarFlecha) return;

        if (textoActual === 1) {

            setMostrarFlecha(false);

            setTextoActual(2);

            setTimeout(() => {

                textoRef.current.stop();
                textoRef.current.play();

            }, 100);

            // Texto 2 dura 7.5 segundos
            setTimeout(() => {

                setMostrarFlecha(true);

            }, 7600);

        }

    };

    return (

        <div className="pantalla-adrian">

            <img
                src="../public/fondo-2.png"
                alt="Fondo"
                className="fondo-adrian"
            />

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

            <div
                className="texto-container"
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

                {mostrarFlecha && (

                    <div className="flecha-dialogo">

                        ▼

                    </div>

                )}

            </div>

        </div>

    );

};

export default EscenaAdrian;