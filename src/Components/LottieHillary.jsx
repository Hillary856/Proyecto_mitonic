import lottieReact from "lottie-react"
import osopolarH from "../assets/osopolarH.json";
import pinguinoAndres from  "../assets/pinguinoAndres.json"
import "./styleHillary.css"
import { useRef } from "react";

const Lottie = lottieReact.default;

export const LottieHillary = () => {
    const LottieRef = useRef();
    const LottieRefPingui = useRef();


    const ReproducirOso = () => {
        LottieRef.current.play();
        
    }

      const ReproducirPingui = () => {
        LottieRefPingui.current.play();
    }

    const lanzarhielo =() => {
       LottieRefPingui.current.playSegments([0,30], true );
    }

     const lanzarpez =() => {
       LottieRef.current.playSegments([20,50], true );
    }



    return (
        <>



            <div className="pantalla">

                <img className= "position-absolute fondo" src="../public/SVG/Fondo.svg" alt="" />
                <img className= "position-absolute nube1" src="../public/SVG/Nube1.svg" alt="" />
                <img className= "position-absolute nube2" src="../public/SVG/Nube2.svg" alt="" />
                <img onClick={lanzarhielo} className= "position-absolute hielo" src="../public/SVG/Hielo.svg" alt="" />
                <img onClick={lanzarpez} className= "position-absolute pez" src="../public/SVG/pez.svg" alt="" />


                <div onClick={ReproducirOso}>
                    <Lottie
                        lottieRef={LottieRef}
                        animationData={osopolarH}
                        loop={true}
                        autoplay={false}
                        className="OsoH"
                    />
                </div>

                <div onClick={ReproducirPingui}>
                    <Lottie
                        lottieRef={LottieRefPingui}
                        animationData={pinguinoAndres}
                        loop={true}
                        autoplay={false}
                        className="pingo"
                    />
                </div>

            </div>



        </>


    );
};
