import React, { useState } from 'react';
import { Button } from './ui';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
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
        <div className="header__center">
          <img 
            src="/images/header-logo.svg" 
            alt="V Grand Hotel" 
            className="header__logo"
          />
        </div>

        {/* Right side - Reserve button */}
        <div className="header__right">
          <Button variant="default" size="regular">
            Reservar
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
