import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import headerLogo from '../assets/images/header-logo.svg';
import tresGeneracionesLogo from '../assets/images/tres-generaciones-isotipo.svg';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isTresGeneracionesPage, setIsTresGeneracionesPage] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      // Cambiar el estado cuando se pase la sección hero
      setIsScrolled(currentScrollY > heroHeight * 0.8);
    };

    // Detectar si estamos en la página de Tres Generaciones
    const checkCurrentRoute = () => {
      const currentPath = window.location.pathname;
      setIsTresGeneracionesPage(currentPath === '/restaurants/tres-generaciones');
    };

    window.addEventListener('scroll', handleScroll);
    // Establecer estado inicial
    handleScroll();
    checkCurrentRoute();
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto para manejar las clases del body cuando el header cambia de estado
  useEffect(() => {
    const body = document.body;
    
    if (isTresGeneracionesPage) {
      if (!isScrolled) {
        // Header transparente - aplicar color #622E27
        body.classList.add('tres-generaciones-header-transparent');
        body.classList.remove('tres-generaciones-header-scrolled');
      } else {
        // Header con fondo blanco - remover color #622E27
        body.classList.remove('tres-generaciones-header-transparent');
        body.classList.add('tres-generaciones-header-scrolled');
      }
    } else {
      // No estamos en Tres Generaciones - limpiar clases
      body.classList.remove('tres-generaciones-header-transparent');
      body.classList.remove('tres-generaciones-header-scrolled');
    }

    // Cleanup
    return () => {
      body.classList.remove('tres-generaciones-header-transparent');
      body.classList.remove('tres-generaciones-header-scrolled');
    };
  }, [isTresGeneracionesPage, isScrolled]);


  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${isMenuOpen ? 'header--menu-open' : ''} ${isTresGeneracionesPage ? 'header--tres-generaciones' : ''}`}>
        <div className="header__container">
          {/* Left side - Burger menu */}
          <div className="header__left">
            <button 
              className={`header__burger ${isMenuOpen ? 'header__burger--active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <span className="header__burger-line"></span>
              <span className="header__burger-line"></span>
              <span className="header__burger-line"></span>
            </button>
            <span className="header__menu-text">Menú</span>
          </div>

          {/* Center - Logo */}
          <div className={`header__center ${isMenuOpen ? 'header__center--hidden' : ''}`}>
            <a href="/" className="header__logo-link">
              <img 
                src={isTresGeneracionesPage ? tresGeneracionesLogo.src : headerLogo.src} 
                alt={isTresGeneracionesPage ? "Tres Generaciones" : "V Grand Hotel"} 
                className="header__logo"
              />
            </a>
          </div>

          {/* Right side - Reserve button */}
          <div className={`header__right ${isMenuOpen ? 'header__right--hidden' : ''}`}>
            <a 
              href={isTresGeneracionesPage ? "#carta" : "https://www.choicehotels.com/es-xl/colombia/medellin/radisson-individuals-hotels/cb031"} 
              target={isTresGeneracionesPage ? "_self" : "_blank"} 
              rel={isTresGeneracionesPage ? "" : "noopener noreferrer"}
              className="header__reserve-button"
            >
              {isTresGeneracionesPage ? "Reservar Mesa" : "Reservar"}
            </a>
          </div>
        </div>
      </header>
      
      {/* Botón flotante de reservar para móviles */}
      <div className="header__floating-reserve">
        <a 
          href={isTresGeneracionesPage ? "#carta" : "https://www.choicehotels.com/es-xl/colombia/medellin/radisson-individuals-hotels/cb031"} 
          target={isTresGeneracionesPage ? "_self" : "_blank"} 
          rel={isTresGeneracionesPage ? "" : "noopener noreferrer"}
          className="header__floating-reserve-button"
        >
          {isTresGeneracionesPage ? "Reservar Mesa" : "Reservar"}
        </a>
      </div>
      
      <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
    </>
  );
};

export default Header;
