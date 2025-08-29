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
      {/* Botón flotante integrado */}
      <button
        className={`floating-button ${isOpen ? 'floating-button--open' : ''} ${isButtonHidden ? 'floating-button--hidden' : ''}`}
        onClick={handleToggle}
        aria-label={isOpen ? 'Cerrar promociones' : 'Abrir promociones'}
        disabled={false}
      >
        <span className="floating-button__text">PROMOS</span>
      </button>
      
      {/* Overlay de fondo */}
      <div 
        className={`promos-sheet-overlay ${isOpen ? 'promos-sheet-overlay--visible' : ''}`}
        onClick={handleOverlayClick}
      />
      
      {/* PromosSheet */}
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
            <h3 className="promos-sheet__promo-title">Paquete Romántico</h3>
            <p className="promos-sheet__promo-description">
              Disfruta de una experiencia romántica inolvidable con cena privada, 
              spa para dos y suite de lujo con vista panorámica.
            </p>
            <button className="promos-sheet__promo-button">
              Ver detalles
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="promos-sheet__promo">
            <h3 className="promos-sheet__promo-title">Escapada de Fin de Semana</h3>
            <p className="promos-sheet__promo-description">
              Perfecta para desconectar del estrés diario. Incluye alojamiento, 
              desayuno gourmet y acceso completo a nuestras instalaciones.
            </p>
            <button className="promos-sheet__promo-button">
              Ver detalles
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="promos-sheet__promo">
            <h3 className="promos-sheet__promo-title">Spa & Wellness</h3>
            <p className="promos-sheet__promo-description">
              Renueva tu energía con tratamientos de spa premium, masajes 
              terapéuticos y acceso a nuestro centro de bienestar.
            </p>
            <button className="promos-sheet__promo-button">
              Ver detalles
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="promos-sheet__promo">
            <h3 className="promos-sheet__promo-title">Experiencia Gastronómica</h3>
            <p className="promos-sheet__promo-description">
              Degusta la mejor cocina local e internacional con nuestro 
              chef ejecutivo en un ambiente exclusivo y elegante.
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
