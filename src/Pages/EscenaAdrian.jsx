import lottieReact from "lottie-react";
import { useRef } from "react";
import AdrianH from "../assets/AdrianH.json";
import Texto1 from "../assets/Texto1.json";
import "../Components/styleHillary.css";


const Lottie = lottieReact.default;

export const EscenaAdrian = () => {

    const adrianRef = useRef();
    const textoRef = useRef();

    const reproducirEscena = () => {

        // Reinicia ambas animaciones
        adrianRef.current.stop();
        textoRef.current.stop();

        // Reproduce Adrián
        adrianRef.current.play();

        // Reproduce el texto
        textoRef.current.play();

    };

    return (

        <div className="pantalla-adrian">

            {/* Aquí después irá el fondo de la cueva */}

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

            <div className="texto-container">

                <Lottie
                    lottieRef={textoRef}
                    animationData={Texto1}
                    autoplay={false}
                    loop={false}
                    className="texto-lottie"
                />

            </div>

        </div>

    );

};

export default EscenaAdrian;