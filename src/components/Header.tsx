import React, { useState, useEffect } from 'react';
import Menu from './Menu';
import headerLogo from '../assets/images/header-logo.svg';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // Cambiar el estado cuando se pase la sección hero
      setIsScrolled(currentScrollY > heroHeight * 0.8);
      
      // Lógica para ocultar/mostrar el header
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - ocultar header
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - mostrar header
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''} ${isMenuOpen ? 'header--menu-open' : ''} ${!isVisible ? 'header--hidden' : ''}`}>
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
            <img 
              src={headerLogo.src} 
              alt="V Grand Hotel" 
              className="header__logo"
            />
          </div>

          {/* Right side - Reserve button */}
          <div className={`header__right ${isMenuOpen ? 'header__right--hidden' : ''}`}>
            <button className="header__reserve-button">
              Reservar
            </button>
          </div>
        </div>
      </header>
      
      <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
    </>
  );
};

export default Header;
