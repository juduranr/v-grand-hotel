import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import headerLogo from '../assets/images/header-logo.svg';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

    window.addEventListener('scroll', handleScroll);
    // Establecer estado inicial
    handleScroll();
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${isMenuOpen ? 'header--menu-open' : ''}`}>
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
            <span className="header__menu-text">Menu</span>
          </div>

          {/* Center - Logo */}
          <div className={`header__center ${isMenuOpen ? 'header__center--hidden' : ''}`}>
            <a href="/" className="header__logo-link">
              <img 
                src={headerLogo.src} 
                alt="V Grand Hotel" 
                className="header__logo"
              />
            </a>
          </div>

          {/* Right side - Reserve button */}
          <div className={`header__right ${isMenuOpen ? 'header__right--hidden' : ''}`}>
            <button className="header__reserve-button">
              Reservar
            </button>
          </div>
        </div>
      </header>
      
      {/* Botón flotante de reservar para móviles */}
      <div className="header__floating-reserve">
        <button className="header__floating-reserve-button">
          Reservar
        </button>
      </div>
      
      <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
    </>
  );
};

export default Header;
