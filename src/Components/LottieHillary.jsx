import lottieReact from "lottie-react"
import osopolarH from "../assets/osopolarH.json";
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
                    animationData={osopolarH}
                    loop={true}
                    autoplay={false}
                    style={{ width: 500, height: 500 }}
                />
            </div>


        </>


    );
};
