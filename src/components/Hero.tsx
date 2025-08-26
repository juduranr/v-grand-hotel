import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from '../assets/images/hero.webp';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const [currentTitle, setCurrentTitle] = useState(0);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const titles = ["FEEL WELCOME", "FEEL GRAND", "FEEL MEDELLÍN"];

  const handleScrollDown = () => {
    if (descriptionRef.current) {
      setHasScrolled(true);
      descriptionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    if (!titleRef.current || !heroRef.current || !shadowRef.current) return;

    // Solo crear el intervalo si no se ha hecho scroll
    let titleInterval: NodeJS.Timeout | null = null;
    
    if (!hasScrolled) {
      titleInterval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentTitle((prev) => (prev + 1) % titles.length);
          setIsTransitioning(false);
        }, 400); // Mitad del tiempo de transición
      }, 3000); // Aumenté el tiempo entre cambios
    }

    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: false
      },
      y: "50vh",
      fontSize: "4rem",
      ease: "none"
    });

    gsap.to(shadowRef.current, {
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: false
      },
      y: "-150vh",
      height: "150vh",
      ease: "none"
    });

    return () => {
      if (titleInterval) {
        clearInterval(titleInterval);
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [hasScrolled, titles.length]);

  // Efecto para detectar cuando el usuario vuelve hacia arriba
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const heroTop = heroRef.current?.offsetTop || 0;
      
      // Si el usuario está en la parte superior del hero, reactivar la animación
      if (scrollTop <= heroTop + 100) {
        setHasScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__background">
        <img 
          src={heroImage.src} 
          alt="V Grand Hotel Hero" 
          className="hero__image"
        />
        
        {/* Botón media luna con flecha */}
        <div className="hero__scroll-button">
          <div className="hero__scroll-pulse"></div>
          <button className="hero__scroll-btn" aria-label="Desplazarse hacia abajo" onClick={handleScrollDown}>
            <svg 
              className="hero__scroll-arrow" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M7 10L12 15L17 10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <h2 className={`hero__title ${isTransitioning ? 'hero__title--fade' : ''}`} ref={titleRef}>
        {hasScrolled ? "FEEL WELCOME" : titles[currentTitle]}
      </h2>

      {/* Concave shadow element */}
      <div className="hero__shadow" ref={shadowRef}></div>

      <div className="hero__description" ref={descriptionRef}>
        <div className="hero__description-content">
          <p className="hero__description-text">
            Descubre un oasis de bienestar donde cada detalle está diseñado para que te sientas renovado, relajado y completamente cuidado. Tu bienestar es nuestra prioridad.
          </p>
          <p className="hero__description-text">
            Nuestro hotel combina elegancia contemporánea con servicios de bienestar de primera clase, creando una experiencia única que nutre tu cuerpo, mente y espíritu.
          </p>
          <p className="hero__description-text">
            Desde tratamientos spa personalizados hasta espacios de meditación serenos, cada momento está diseñado para promover tu salud integral y bienestar general.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
