import React, { useState, useEffect } from 'react';
import { Button } from './ui';
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
      // Obtener la altura de la sección hero (aproximadamente 100vh)
      const heroHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      // Cambiar el estado cuando se pase la sección hero
      setIsScrolled(scrollPosition > heroHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
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
            <Button variant="default" size="regular">
              Reservar
            </Button>
          </div>
        </div>
      </header>

      {/* Menu component */}
      <Menu isOpen={isMenuOpen} onClose={toggleMenu} />
    </>
  );
};

export default Header;
