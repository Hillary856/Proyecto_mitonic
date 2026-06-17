import lottieReact from "lottie-react"
import osopolarH from "../assets/osopolarH.json";
import pinguinoAndres from  "../assets/pinguinoAndres.json"
import "./styleHillary.css"
import { useRef } from "react";

const Lottie = lottieReact.default;

export const LottieHillary = () => {
    const LottieRef = useRef();

    const Reproducir = () => {
        LottieRef.current.play();
    }

    return (
        <>



            <div className="pantalla">

                <img className= "position-absolute fondo" src="../public/SVG/Fondo.svg" alt="" />
                <img className= "position-absolute nube1" src="../public/SVG/Nube1.svg" alt="" />
                <img className= "position-absolute nube2" src="../public/SVG/Nube2.svg" alt="" />
                <img className= "position-absolute hielo" src="../public/SVG/Hielo.svg" alt="" />
                <img className= "position-absolute pez" src="../public/SVG/pez.svg" alt="" />


                <div onClick={Reproducir}>
                    <Lottie
                        lottieRef={LottieRef}
                        animationData={osopolarH}
                        loop={true}
                        autoplay={false}
                        style={{ width: 500, height: 500 }}
                        className="OsoH"
                    />
                </div>

            </div>



        </>


    );
};
