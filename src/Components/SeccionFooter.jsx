import { Link } from "react-router-dom";
import "./styleHillary.css";

import {
    FaFacebookF,
    FaWhatsapp,
    FaInstagram,
} from "react-icons/fa";

export const SeccionFooter = () => {
    return (
        <footer className="seccion-footer">

            {/* ============================= */}
            {/* LOGO */}
            {/* ============================= */}

            <div className="footer-logo">
                <img
                    src="/public/Logo.png"
                    alt="Mitonic"
                />
            </div>


            <div className="footer-ondas">
                <img
                    src="/public/Ondas.svg"
                    alt=""
                    className="footer-ondas"
                />
            </div>


            {/* ============================= */}
            {/* REDES SOCIALES */}
            {/* ============================= */}

            <div className="footer-redes">

                <a
                    href="#"
                    className="footer-icono"
                    aria-label="Facebook"
                >
                    <FaFacebookF />
                </a>

                <a
                    href="#"
                    className="footer-icono"
                    aria-label="WhatsApp"
                >
                    <FaWhatsapp />
                </a>

                <a
                    href="#"
                    className="footer-icono"
                    aria-label="Instagram"
                >
                    <FaInstagram />
                </a>

            </div>


            {/* ============================= */}
            {/* INDICADOR */}
            {/* ============================= */}

            <p className="indicador-footer">
                Sección - FOOTER
            </p>

        </footer>
    );
};