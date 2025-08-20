import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImage from '../assets/images/hero.webp';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero__background">
        <img 
          src={heroImage.src} 
          alt="V Grand Hotel Hero" 
          className="hero__image"
        />
      </div>

      <h2 className="hero__title" ref={titleRef}>
        FEEL WELL
      </h2>

      {/* Concave shadow element */}
      <div className="hero__shadow" ref={shadowRef}></div>

      <div className="hero__description">
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
