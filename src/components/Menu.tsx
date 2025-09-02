import React, { useEffect, useState } from 'react';
import './Menu.css';
import { DISCOVER_IMAGES, PURPOSE_IMAGES } from "../config/env";

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
  const [currentBackground, setCurrentBackground] = useState<ImageType>(DISCOVER_IMAGES.GALLERY_1);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
      setTimeout(() => setShowContent(true), 620);
      document.body.style.overflow = 'hidden';
    } else {
      setShowContent(false);
      setTimeout(() => setIsVisible(false), 100);
      document.body.style.overflow = 'unset';
      setTimeout(() => setShouldRender(false), 720);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleMenuHover = (imageName: ImageType) => {
    setCurrentBackground(imageName);
  };

  const handleMenuLeave = () => {
    setCurrentBackground(DISCOVER_IMAGES.GALLERY_1);
  };

  if (!shouldRender) return null;

  const menuItems = [
    { id: 'rooms', label: 'Habitaciones', href: '/rooms', background: DISCOVER_IMAGES.GALLERY_1 },
    { id: 'gastro', label: 'Gastronomía', href: '/gastro', background: PURPOSE_IMAGES.GALLERY_1 },
    { id: 'behind-us', label: 'Nuestra historia', href: '/behind-us', background: DISCOVER_IMAGES.GALLERY_2 },
    { id: 'services-experiences', label: 'Experiencias', href: '/experiences', background: PURPOSE_IMAGES.GALLERY_2 },
    { id: 'events', label: 'Eventos', href: '/events', background: DISCOVER_IMAGES.GALLERY_3 },
  ];

  return (
    <div 
      className={`menu-overlay ${isVisible ? 'open' : ''}`} 
      onClick={handleBackdropClick}
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${currentBackground})`
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
