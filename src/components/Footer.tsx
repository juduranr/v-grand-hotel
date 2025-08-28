import React from 'react';
import { ArrowRight } from "@icon-park/react";
import footerLogo from '../assets/images/v-logo-complete.svg';
import fbIcon from '../assets/images/fb.svg';
import igIcon from '../assets/images/ig.svg';
import xIcon from '../assets/images/x.svg';
import inIcon from '../assets/images/in.svg';
import logo1 from '../assets/images/logo-1.svg';
import logo2 from '../assets/images/logo-2.svg';
import logo3 from '../assets/images/logo-3.svg';
import logo4 from '../assets/images/logo-4.svg';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__column footer__logo-column">
            <img 
              src={footerLogo.src} 
              alt="V Grand Hotel" 
              className="footer__logo"
            />
            <div className="footer__social">
              <div className="footer__social-links">
                <a href="#" className="footer__social-link" aria-label="Facebook">
                  <img src={fbIcon.src} alt="Facebook" className="footer__social-icon" />
                </a>
                <a href="#" className="footer__social-link" aria-label="Instagram">
                  <img src={igIcon.src} alt="Instagram" className="footer__social-icon" />
                </a>
                <a href="#" className="footer__social-link" aria-label="Twitter">
                  <img src={xIcon.src} alt="Twitter" className="footer__social-icon" />
                </a>
                <a href="#" className="footer__social-link" aria-label="LinkedIn">
                  <img src={inIcon.src} alt="LinkedIn" className="footer__social-icon" />
                </a>
              </div>
            </div>
          </div>

          {/* Second column - Mapa de sitio */}
          <div className="footer__column">
            <h3 className="footer__title">Mapa de Sitio</h3>
            <ul className="footer__links">
              <li><a href="#rooms" className="footer__link">Habitaciones</a></li>
              <li><a href="#dining" className="footer__link">Restaurantes</a></li>
              <li><a href="#experiences" className="footer__link">Experiencias</a></li>
              <li><a href="#events" className="footer__link">Eventos</a></li>
              <li><a href="#gallery" className="footer__link">Galería</a></li>
              <li><a href="#about" className="footer__link">Sobre Nosotros</a></li>
            </ul>
          </div>

          {/* Third column - Contacto */}
          <div className="footer__column">
            <h3 className="footer__title">Contacto</h3>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="footer__contact-item">
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="footer__contact-item">
                <span>info@vgrandhotel.com</span>
              </div>
            </div>
          </div>

          {/* Fourth column - Dirección */}
          <div className="footer__column">
            <h3 className="footer__title">Dirección</h3>
            <div className="footer__address">
              <p className="footer__address-text">123 Luxury Avenue, Downtown District, City, State 12345</p>
              <button 
                className="footer__directions-button"
                onClick={() => window.open('https://maps.google.com/?q=123+Luxury+Avenue+Downtown+District+City+State+12345', '_blank')}
              >
                Cómo llegar
                <ArrowRight theme="outline" size={18} className="footer__contact-icon" />
              </button>
            </div>
          </div>

          {/* Fifth column - Legal */}
          <div className="footer__column">
            <h3 className="footer__title">Legal</h3>
            <ul className="footer__links">
              <li><a href="#" className="footer__link">Política de Privacidad</a></li>
              <li><a href="#" className="footer__link">Términos de Servicio</a></li>
              <li><a href="#" className="footer__link">Cookies</a></li>
              <li><a href="#" className="footer__link">Accesibilidad</a></li>
              <li><a href="#" className="footer__link">Términos de Reserva</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="footer__bottom">
          <div className="footer__bottom-content">
            <div className="footer__bottom-logos">
              <img src={logo1.src} alt="Logo 1" className="footer__bottom-logo" />
              <img src={logo2.src} alt="Logo 2" className="footer__bottom-logo" />
              <img src={logo3.src} alt="Logo 3" className="footer__bottom-logo" />
              <img src={logo4.src} alt="Logo 4" className="footer__bottom-logo" />
            </div>
            <p className="footer__copyright">
              © {currentYear} V Grand Hotel. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
