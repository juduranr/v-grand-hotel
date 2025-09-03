import React, { useState, useEffect } from 'react';
import { ArrowRight } from '@icon-park/react';
import './PromosSheet.css';

const PromosSheet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isButtonHidden, setIsButtonHidden] = useState(false);
  const BUTTON_ANIMATION_MS = 600;

  const handleToggle = () => {
    if (!isOpen) {
      // Abrir: ocultar botón hacia la derecha y luego abrir sheet
      setIsButtonHidden(true);
      window.setTimeout(() => {
        setIsOpen(true);
      }, BUTTON_ANIMATION_MS);
      return;
    }
    // Cerrar: reutilizar handleClose
    handleClose();
  };

  const handleClose = () => {
    // Cerrar sheet y luego mostrar el botón tras la animación del sheet
    setIsOpen(false);
    window.setTimeout(() => {
      setIsButtonHidden(false);
    }, BUTTON_ANIMATION_MS);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      <button
        className={`floating-button ${isOpen ? 'floating-button--open' : ''} ${isButtonHidden ? 'floating-button--hidden' : ''}`}
        onClick={handleToggle}
        aria-label={isOpen ? 'Cerrar promociones' : 'Abrir promociones'}
        disabled={false}
      >
        <span className="floating-button__text">PROMOS</span>
      </button>
      <div
        className={`promos-sheet-overlay ${isOpen ? 'promos-sheet-overlay--visible' : ''}`}
        onClick={handleOverlayClick}
      />
      <aside className={`promos-sheet ${isOpen ? 'promos-sheet--open' : ''}`}>
        <div className="promos-sheet__header">
          <h2 className="promos-sheet__title">PROMOS</h2>
          <button
            className="promos-sheet__close-btn"
            onClick={handleClose}
            aria-label="Cerrar promociones"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="promos-sheet__content">
          <div className="promos-sheet__promo">
            <h3 className="promos-sheet__promo-title">ESCAPADA WELLNESS</h3>
            <p className="promos-sheet__promo-description">
              Incluye  acceso al spa, bebida detox de bienvenida y desayuno saludable. Ideal para quienes buscan desconexión y autocuidado.
            </p>
            <button className="promos-sheet__promo-button">
              Ver detalles
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="promos-sheet__promo">
            <h3 className="promos-sheet__promo-title">plan aniversario o parejas</h3>
            <p className="promos-sheet__promo-description">
              Decoración especial de la suite, botella de vino, amenities románticos y desayuno en la habitación.
            </p>
            <button className="promos-sheet__promo-button">
              Ver detalles
              <ArrowRight size={16} />
            </button>
          </div>
          <div className="promos-sheet__promo">
            <h3 className="promos-sheet__promo-title">viaje corporativo</h3>
            <p className="promos-sheet__promo-description">
              Tarifas especiales para estancias largas o múltiples reservas, accesso a coworking, gimnasio y beneficios personalizados.
            </p>
            <button className="promos-sheet__promo-button">
              Ver detalles
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default PromosSheet;
