import lottieReact from "lottie-react"
import stivenAnimation from "../assets/stivenanimacion.json";
import { useRef } from "react";

const Lottie = lottieReact.default;

export const LottieHillary = () => {
    const LottieRef = useRef();

    const Reproducir = () => {
        LottieRef.current.play();
    }

    return (
        <>

            <div onClick={Reproducir}>
                <Lottie
                    lottieRef={LottieRef}
                    animationData={stivenAnimation}
                    loop={true}
                    autoplay={false}
                    style={{ width: 500, height: 500 }}
                />
            </div>


        </>


    );
};
