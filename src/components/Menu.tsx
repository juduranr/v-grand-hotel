import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import './Menu.css';
import { MENU_IMAGES } from "../config/env";

// Tipo para las URLs de imágenes
type ImageType = string;

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [currentBackground, setCurrentBackground] = useState<ImageType>(MENU_IMAGES.ROOMS);
  const [lastHoveredImage, setLastHoveredImage] = useState<ImageType>(MENU_IMAGES.ROOMS);

  useEffect(() => {
    if (isOpen) {
      setCurrentBackground(lastHoveredImage);
      setShouldRender(true);
      // Usar requestAnimationFrame para asegurar que la animación se ejecute
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
      setTimeout(() => setShowContent(true), 800);
      document.body.style.overflow = 'hidden';
    } else {
      // Animar la salida de las letras antes de cerrar el menú
      animateLettersExit();
      setShowContent(false);
      setTimeout(() => setIsVisible(false), 500);
      document.body.style.overflow = 'unset';
      setTimeout(() => setShouldRender(false), 1200);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Efecto para animar las letras cuando el contenido se muestre
  useEffect(() => {
    if (showContent) {
      animateLetters();
    }
  }, [showContent]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMenuHover = (imageName: ImageType) => {
    setCurrentBackground(imageName);
    setLastHoveredImage(imageName);
  };

  const handleMenuLeave = () => {
    // No cambiar la imagen al salir del hover, mantener la última seleccionada
  };

  // Función para animar las letras con GSAP
  const animateLetters = () => {
    const links = document.querySelectorAll('.menu__link');
    
    links.forEach((link, linkIndex) => {
      const text = link.textContent || '';
      const letters = text.split('').map((letter, index) => 
        `<span class="letter">${letter}</span>`
      ).join('');
      link.innerHTML = letters;
      
      // Configurar el estado inicial de las letras
      gsap.set(link.querySelectorAll('.letter'), {
        y: '100%',
        opacity: 1
      });
      
      // Animar las letras con GSAP
      gsap.to(link.querySelectorAll('.letter'), {
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        delay: 0.1 + (linkIndex * 0.1)
      });
    });
  };

  // Función para animar la salida de las letras
  const animateLettersExit = () => {
    const links = document.querySelectorAll('.menu__link');
    
    links.forEach((link, linkIndex) => {
      const letters = link.querySelectorAll('.letter');
      if (letters.length > 0) {
        // Animar todas las letras del enlace hacia abajo al mismo tiempo
        gsap.to(letters, {
          y: '100%',
          opacity: 0,
          duration: 0.6,
          ease: 'power2.in',
          delay: linkIndex * 0.1
        });
      }
    });
  };

  if (!shouldRender) return null;

  const menuItems = [
    { id: 'rooms', label: 'Habitaciones', href: '/rooms', background: MENU_IMAGES.ROOMS },
    { id: 'gastro', label: 'Gastronomía', href: '/restaurants', background: MENU_IMAGES.GASTRO },
    // { id: 'behind-us', label: 'Nuestra historia', href: '/behind-us', background: MENU_IMAGES.BEHIND_US },
    // { id: 'services-experiences', label: 'Experiencias', href: '/experiences', background: MENU_IMAGES.EXPERIENCES },
    { id: 'events', label: 'Eventos', href: '/events', background: MENU_IMAGES.EVENTS },
  ];

  return (
    <div 
      className={`menu-overlay ${isVisible ? 'open' : ''}`} 
      onClick={handleBackdropClick}
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${currentBackground})`
      }}
    >
      <div 
        className={`menu-container ${showContent ? 'open' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="menu__nav">
          <div className="menu__list">
            {menuItems.map((item) => (
              <div key={item.id} className="menu__item">
                <a 
                  href={item.href} 
                  className="menu__link"
                  onClick={onClose}
                  onMouseEnter={() => handleMenuHover(item.background)}
                  onMouseLeave={handleMenuLeave}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
