import React, { useEffect, useState } from 'react';
import './Menu.css';

// Importar las imágenes
import infinityGallery1 from '../assets/images/infinity-gallery-1.webp';
import infinityGallery2 from '../assets/images/infinity-gallery-2.webp';
import infinityGallery3 from '../assets/images/infinity-gallery-3.webp';
import purposeGallery1 from '../assets/images/purpose-gallery-1.webp';
import purposeGallery2 from '../assets/images/purpose-gallery-2.webp';

// Tipo para las imágenes
type ImageType = typeof infinityGallery1;

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [currentBackground, setCurrentBackground] = useState<ImageType>(infinityGallery1);

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
    setCurrentBackground(infinityGallery1);
  };

  if (!shouldRender) return null;

  const menuItems = [
    { id: 'rooms', label: 'Rooms', href: '/rooms', background: infinityGallery1 },
    { id: 'gastro', label: 'Gastronomía', href: '/gastro', background: purposeGallery1 },
    { id: 'behind-us', label: 'Behind us', href: '/behind-us', background: infinityGallery2 },
    { id: 'services-experiences', label: 'Services/Experiences', href: '/services-experiences', background: purposeGallery2 },
    { id: 'events', label: 'Special Events', href: '/events', background: infinityGallery3 },
  ];

  return (
    <div 
      className={`menu-overlay ${isVisible ? 'open' : ''}`} 
      onClick={handleBackdropClick}
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${currentBackground.src})`
      }}
    >
      <div 
        className={`menu-container ${showContent ? 'open' : ''}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="menu__nav">
          <ul className="menu__list">
            {menuItems.map((item) => (
              <li key={item.id} className="menu__item">
                <a 
                  href={item.href} 
                  className="menu__link"
                  onClick={onClose}
                  onMouseEnter={() => handleMenuHover(item.background)}
                  onMouseLeave={handleMenuLeave}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
