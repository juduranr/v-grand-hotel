import React, { useEffect, useRef } from "react";
import "./Purpose.css";

const Purpose: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!titleRef.current || !sectionRef.current) return;

      const purposeRect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calcular el progreso del scroll desde que la sección purpose entra en viewport
      const scrollProgress = Math.max(
        0,
        Math.min(1, (windowHeight - purposeRect.top) / windowHeight)
      );

      if (titleRef.current) {
        const translateY = -50 + scrollProgress * 50;
        const opacity = scrollProgress;

        titleRef.current.style.transform = `translateY(${translateY}%)`;
        titleRef.current.style.opacity = opacity.toString();
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="purpose">
      <div className="purpose__container">
        <div className="purpose__presentation">
          <h2 ref={titleRef} className="purpose__presentation-title">
            FEEL WELL
          </h2>
          <p className="purpose__presentation-description">
            Descubre un oasis de bienestar donde cada detalle está diseñado para
            que te sientas renovado, relajado y completamente cuidado. Tu
            bienestar es nuestra prioridad.
          </p>
        </div>
        <div className="purpose__logo-container">
          <div className="purpose__logo-item">
            <img src="/images/v-hotel.svg" alt="V Grand" />
            <h3 className="purpose__logo-title">Más de 25 marcas que confían en la historia de V Grand.</h3>
          </div>
          <div className="purpose__logo-line">
            <hr />
            <img src="/images/grand-hotel.svg" alt="V Grand" />
            <hr />
          </div>
        </div>
        <div className="purpose__content">
          <p className="purpose__content-subtitle">Propósito</p>
          <h3 className="purpose__content-title">
            V Grand Hotel Medellín: Bienestar urbano con alma colombiana
          </h3>
          <p className="purpose__content-description">
            Descubre en V Grand Hotel una experiencia de lujo consciente en el
            corazón de Medellín. Un refugio contemporáneo donde el bienestar, el
            diseño y la cultura se encuentran para reconectar cuerpo, mente y
            espíritu. Bienvenido a una nueva forma de hospedarte: más humana,
            más consciente, más tú.
          </p>
        </div>
        <div className="purpose__gallery">
          <div className="purpose__gallery-wrapper">
            <div className="purpose__gallery-item">
              <img src="/images/purpose-gallery-2.webp" alt="Purpose" />
            </div>
            <div className="purpose__gallery-item">
              <img src="/images/purpose-gallery-1.webp" alt="Purpose" />
            </div>
            <div className="purpose__gallery-item">
              <img src="/images/purpose-gallery-2.webp" alt="Purpose" />
            </div>
            <div className="purpose__gallery-item">
              <img src="/images/purpose-gallery-3.webp" alt="Purpose" />
            </div>
          </div>
          <div className="purpose__gallery-title">
            El lugar donde bien se está
          </div>
        </div>
        <div className="pillars__content">
          <p className="purpose__content-subtitle">Pilares V-Grand</p>
          <h3 className="purpose__content-title">
            Combinamos comodidad y sofisticación con servicios modernos de
            calidad y bienestar.
          </h3>
          <p className="purpose__content-description">
            dolor sit amet consectetur. Hac eget interdum urna auctor. Enim
            consequat risus sagittis donec. Iaculis dignissim proin non arcu.
            Viverra adipiscing nec massa nunc tristique. Enim consequat risus
            sagittis donec. Iaculis dignissim proin non arcu.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Purpose;
