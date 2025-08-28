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
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Efecto separado para manejar el intervalo del título
  useEffect(() => {
    let titleInterval: NodeJS.Timeout | null = null;
    
    if (!hasScrolled) {
      titleInterval = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentTitle((prev) => (prev + 1) % titles.length);
          setIsTransitioning(false);
        }, 400);
      }, 3000);
    } else {
      // Si se ha hecho scroll, asegurar que el título esté en "FEEL WELCOME"
      setCurrentTitle(0);
    }

    return () => {
      if (titleInterval) {
        clearInterval(titleInterval);
      }
    };
  }, [hasScrolled, titles.length]);

  // Efecto para detectar cuando el usuario vuelve hacia arriba usando ScrollTrigger
  useEffect(() => {
    if (!heroRef.current) return;

    // Crear ScrollTrigger para controlar la animación del título
    const scrollTrigger = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => {
        // Cuando el hero entra en la pantalla, reactivar la animación
        setHasScrolled(false);
      },
      onLeave: () => {
        // Cuando el hero sale de la pantalla, detener la animación
        setHasScrolled(true);
      },
      onEnterBack: () => {
        // Cuando el hero vuelve a entrar desde abajo, reactivar la animación
        setHasScrolled(false);
      },
      onLeaveBack: () => {
        // Cuando el hero sale hacia arriba, detener la animación
        setHasScrolled(true);
      }
    });

    return () => {
      scrollTrigger.kill();
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
