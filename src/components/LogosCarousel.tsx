import React, { useEffect, useRef } from "react";
import logo1 from "../assets/images/logo-1.svg";
import logo2 from "../assets/images/logo-2.svg";
import logo3 from "../assets/images/logo-3.svg";
import logo4 from "../assets/images/logo-4.svg";
import "./LogosCarousel.css";

const LogosCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Crear elementos de imagen estáticamente en JSX
    const logos = [logo1, logo2, logo3, logo4];
    
    // Crear elementos de imagen dinámicamente
    const createLogoElements = () => {
      carousel.innerHTML = '';
      
      // Crear múltiples copias para asegurar el efecto infinito
      for (let i = 0; i < 3; i++) {
        logos.forEach((logo, index) => {
          const logoContainer = document.createElement('div');
          logoContainer.className = 'logos-carousel__item';
          
          const img = document.createElement('img');
          img.src = logo.src;
          img.alt = `Logo ${index + 1}`;
          
          logoContainer.appendChild(img);
          carousel.appendChild(logoContainer);
        });
      }
    };

    createLogoElements();
  }, []);

  return (
    <div className="logos-carousel">
      <div className="logos-carousel__container">
        <div ref={carouselRef} className="logos-carousel__track">
          {/* Los logos se insertan dinámicamente aquí */}
        </div>
      </div>
    </div>
  );
};

export default LogosCarousel;
