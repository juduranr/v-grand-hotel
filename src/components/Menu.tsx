import React, { useEffect, useState } from 'react';
import './Menu.css';

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [showContent, setShowContent] = useState(false);

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

  if (!shouldRender) return null;

  const menuItems = [
    { id: 'rooms', label: 'Rooms', href: '/rooms' },
    { id: 'gastro', label: 'Gastronomía', href: '/gastro' },
    { id: 'behind-us', label: 'Behind us', href: '/behind-us' },
    { id: 'services-experiences', label: 'Services/Experiences', href: '/services-experiences' },
    { id: 'events', label: 'Special Events', href: '/events' },
  ];

  return (
    <div 
      className={`menu-overlay ${isVisible ? 'open' : ''}`} 
      onClick={handleBackdropClick}
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
