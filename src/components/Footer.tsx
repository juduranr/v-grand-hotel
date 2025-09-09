import React from 'react';
import vLogo from '../assets/images/v-logo-complete.svg';
import raddisonLogo from '../assets/images/raddison.svg';
import fbIcon from '../assets/images/fb.svg';
import igIcon from '../assets/images/ig.svg';
import xIcon from '../assets/images/x.svg';
import inIcon from '../assets/images/in.svg';
import ytIcon from '../assets/images/yt.svg';
import tiktokIcon from '../assets/images/tt.svg';
import logo1 from '../assets/images/logo-1.svg';
import logo2 from '../assets/images/logo-2.svg';
import logo3 from '../assets/images/logo-3.svg';
import logo4 from '../assets/images/logo-4.svg';
import logo5 from '../assets/images/logo-5.svg';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__main">
          <div className="footer__logo-column">
            <div className="footer__logos-container">
              <img
                src={vLogo.src}
                alt="V Grand Hotel"
                className="footer__v-logo"
              />
              <hr />
              <img
                src={raddisonLogo.src}
                alt="Raddison"
                className="footer__raddison-logo"
              />
            </div>
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
                <a href="#" className="footer__social-link" aria-label="YouTube">
                  <img src={ytIcon.src} alt="YouTube" className="footer__social-icon" />
                </a>
                <a href="#" className="footer__social-link" aria-label="TikTok">
                  <img src={tiktokIcon.src} alt="TikTok" className="footer__social-icon" />
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
                <a href="tel:+573144583693">+57 314 4583693</a>
              </div>
              <div className="footer__contact-item">
                <a href="tel:018009122083">01-800-912-2083</a>
              </div>
              <div className="footer__contact-item">
                <a href='mailto:reservas@v-grandhotels.com'>reservas@v-grandhotels.com</a>
              </div>
            </div>
          </div>

          {/* Fourth column - Dirección */}
          <div className="footer__column">
            <h3 className="footer__title">Dirección</h3>
            <div className="footer__address">
              <p className="footer__address-text">Cra. 43 #14 81, El Poblado, Medellín, Antioquia</p>
              <a
                href="https://maps.app.goo.gl/G5nsfJZGiMNkAebj9"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__directions-button"
              >
                Cómo llegar
                <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none"><path d="M41.9999 24H5.99994" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M30 12L42 24L30 36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </a>
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
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__work-button"
            >
              Trabaja con nosotros
              <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none"><path d="M41.9999 24H5.99994" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M30 12L42 24L30 36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </a>
          </div>
        </div>

        {/* Bottom section */}
        <div className="footer__bottom">
          <hr />
          <div className="footer__bottom-content">
            <div className="footer__bottom-logos">
              <div className="footer__bottom-logos-group">
                <img src={logo4.src} alt="Logo 4" className="footer__bottom-logo" />
                <img src={logo5.src} alt="Logo 5" className="footer__bottom-logo" />
                <img src={logo1.src} alt="Logo 1" className="footer__bottom-logo" />
              </div>
              <hr className="footer__bottom-separator" />
              <div className="footer__bottom-member-group">
                <p className="footer__bottom-logo-text">Miembro de:</p>
                <div className="footer__bottom-member-logos">
                  <img src={logo2.src} alt="Logo 2" className="footer__bottom-logo" />
                  <img src={logo3.src} alt="Logo 3" className="footer__bottom-logo" />
                </div>
              </div>
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
