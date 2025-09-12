import React from 'react';
import fbIcon from '../assets/images/fb.svg';
import igIcon from '../assets/images/ig.svg';
import waIcon from '../assets/images/wa.svg';
import inIcon from '../assets/images/in.svg';
import ytIcon from '../assets/images/yt.svg';
import tiktokIcon from '../assets/images/tt.svg';
import logo1 from '../assets/images/logo-1.svg';
import logo2 from '../assets/images/logo-2.svg';
import logo3 from '../assets/images/logo-3.svg';
import logo4 from '../assets/images/logo-4.svg';
import logo5 from '../assets/images/logo-5.svg';
import tresGeneracionesBg from '../assets/images/tres-generaciones-footer.svg';
import './FooterTresGeneraciones.css';

const FooterTresGeneraciones: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="tg-footer">
      <div className="tg-footer__container">
        <div className="tg-footer__intro">
          <img 
            src={tresGeneracionesBg.src} 
            alt="Tres Generaciones" 
            className="tg-footer__intro-bg"
          />
          <p className="tg-footer__intro-text">
            Tres Generaciones nace de una herencia profunda: la pasión por la cocina transmitida de abuelo a padre, y de padre a hijo. Cada plato cuenta una historia, cada ingrediente es elegido con respeto, y cada vino celebra el arte de compartir
          </p>
          <hr className="tg-footer__intro-separator" />
        </div>
        <div className="tg-footer__main">
          {/* First column - Horarios */}
          <div className="tg-footer__column">
            <h3 className="tg-footer__title">Horarios</h3>
            <div className="tg-footer__schedule">
              <div className="tg-footer__schedule-item">
                <span className="tg-footer__schedule-days">Lunes a Domingo</span>
                <span className="tg-footer__schedule-hours">11:00 AM - 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Second column - Dirección */}
          <div className="tg-footer__column">
            <h3 className="tg-footer__title">Dirección</h3>
            <div className="tg-footer__address">
              <p className="tg-footer__address-text">Cra. 43 #14 81, El Poblado, Medellín, Antioquia</p>
              <a
                href="https://maps.app.goo.gl/G5nsfJZGiMNkAebj9"
                target="_blank"
                rel="noopener noreferrer"
                className="tg-footer__directions-button"
              >
                Cómo llegar
                <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none"><path d="M41.9999 24H5.99994" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path><path d="M30 12L42 24L30 36" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"></path></svg>
              </a>
            </div>
          </div>

          {/* Third column - Contacto */}
          <div className="tg-footer__column">
            <h3 className="tg-footer__title">Contacto</h3>
            <div className="tg-footer__contact">
              <div className="tg-footer__contact-item">
                <a href="tel:+34649745470">+34 649 74 54 70</a>
              </div>
              <div className="tg-footer__contact-item">
                <a href='mailto:info@vgrandhotel.com'>info@vgrandhotel.com</a>
              </div>
            </div>
          </div>

          {/* Fourth column - Legal */}
          <div className="tg-footer__column">
            <h3 className="tg-footer__title">Legal</h3>
            <ul className="tg-footer__links">
              <li><a href="#" className="tg-footer__link">Términos y condiciones</a></li>
              <li><a href="#" className="tg-footer__link">Términos de uso</a></li>
              <li><a href="#" className="tg-footer__link">Políticas de privacidad</a></li>
              <li><a href="#" className="tg-footer__link">Políticas de ventas</a></li>
            </ul>
          </div>

          {/* Fifth column - Redes Sociales */}
          <div className="tg-footer__column">
            <h3 className="tg-footer__title">Redes Sociales</h3>
            <div className="tg-footer__social">
              <div className="tg-footer__social-links">
                <a href="https://www.instagram.com/vgrandhotels/" className="tg-footer__social-link" aria-label="Instagram">
                  <img src={igIcon.src} alt="Instagram" className="tg-footer__social-icon" />
                </a>
                <a href="https://www.linkedin.com/company/v-grand-hotel-medellin/posts/?feedView=all" className="tg-footer__social-link" aria-label="LinkedIn">
                  <img src={inIcon.src} alt="LinkedIn" className="tg-footer__social-icon" />
                </a>
                <a href="https://www.facebook.com/people/V-Grand-Hotel/61558598542512/" className="tg-footer__social-link" aria-label="Facebook">
                  <img src={fbIcon.src} alt="Facebook" className="tg-footer__social-icon" />
                </a>
                <a href="https://wa.link/62airb" className="tg-footer__social-link" aria-label="WhatsApp">
                  <img src={waIcon.src} alt="WhatsApp" className="tg-footer__social-icon" />
                </a>
                <a href="https://www.tiktok.com/@vgrandhotels" className="tg-footer__social-link" aria-label="TikTok">
                  <img src={tiktokIcon.src} alt="TikTok" className="tg-footer__social-icon" />
                </a>
                <a href="https://www.youtube.com/@VGrandHotels" className="tg-footer__social-link" aria-label="YouTube">
                  <img src={ytIcon.src} alt="YouTube" className="tg-footer__social-icon" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="tg-footer__bottom">
          <hr />
          <div className="tg-footer__bottom-content">
            <div className="tg-footer__bottom-logos">
              <div className="tg-footer__bottom-logos-group">
                <img src={logo4.src} alt="Logo 4" className="tg-footer__bottom-logo" />
                <img src={logo5.src} alt="Logo 5" className="tg-footer__bottom-logo" />
                <img src={logo1.src} alt="Logo 1" className="tg-footer__bottom-logo" />
              </div>
              <hr className="tg-footer__bottom-separator" />
              <div className="tg-footer__bottom-member-group">
                <p className="tg-footer__bottom-logo-text">Miembro de:</p>
                <div className="tg-footer__bottom-member-logos">
                  <img src={logo2.src} alt="Logo 2" className="tg-footer__bottom-logo" />
                  <img src={logo3.src} alt="Logo 3" className="tg-footer__bottom-logo" />
                </div>
              </div>
            </div>
            <p className="tg-footer__copyright">
              © {currentYear} V Grand Hotel. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterTresGeneraciones;
