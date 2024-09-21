import React, { useEffect } from 'react';
import { FaFacebook, FaInstagram, FaDiscord } from 'react-icons/fa';
import './Style/footer.css';

function Footer() {
    useEffect(() => {
        // Seu código JavaScript para o footer, se necessário
    }, []);

    return (
        <footer id="Footer" className="Footer">
            <ul className="social_list">
                <li className="social_list li">
                    <FaFacebook />
                </li>
                <li className="social_list li">
                    <FaInstagram />
                </li>
                <li className="social_list li">
                    <FaDiscord />
                </li>
            </ul>
            <p className="copy_right">&copy; 2024. Todos os direitos reservados a <span>Capy ❤</span></p>
        </footer>
    );
}

export default Footer;