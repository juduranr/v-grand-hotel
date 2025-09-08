import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES_BASE_URL } from '../config/env';
import vHotelLogo from "../assets/images/v-hotel.svg";
import './Hero.css';

// Registrar los plugins
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const Hero: React.FC = () => {
  const videoUrl = `${IMAGES_BASE_URL}hero/Video-Header_WebM.webm`;
  const titleRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const welcomeAnimationRef = useRef<HTMLDivElement>(null);
  const welcomeAnimationTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const handleScrollDown = () => {
    const descriptionElement = document.querySelector('.hero__description');
    if (descriptionElement) {
      descriptionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  useEffect(() => {
    if (titleRef.current && pathRef.current) {
      // Obtener el tamaño de pantalla para calcular el font-size final
      const getFinalFontSize = () => {
        const width = window.innerWidth;
        if (width <= 480) return "32px"; // 48px * 0.67
        if (width <= 768) return "43px"; // 64px * 0.67
        return "64px"; // 96px * 0.67
      };

      // Obtener el ancho inicial del contenedor de animación
      const getInitialWidth = () => {
        const width = window.innerWidth;
        if (width <= 480) return 200; // 50% de 400px
        if (width <= 768) return 267; // 67% de 400px
        return 400; // ancho completo
      };

      // Obtener el ancho final del contenedor de animación (reducido proporcionalmente)
      const getFinalWidth = () => {
        const width = window.innerWidth;
        if (width <= 480) return 150; // 200px * 0.75
        if (width <= 768) return 200; // 267px * 0.75
        return 300; // 400px * 0.75
      };

      // Crear la animación del título siguiendo el path
      const animation = gsap.to(titleRef.current, {
        motionPath: {
          path: pathRef.current,
          align: pathRef.current,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        fontSize: getFinalFontSize(),
        duration: 3,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom-=50% top",
          scrub: 1,
        }
      });

      // Crear animación paralela para el ancho del contenedor de animación
      if (welcomeAnimationRef.current) {
        gsap.to(welcomeAnimationRef.current, {
          width: getFinalWidth(),
          duration: 3,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom-=50% top",
            scrub: 1,
          }
        });
      }

      // Variable para controlar si la animación ya se pausó
      let animationPaused = false;
      
      // Función para pausar la animación de las palabras
      const pauseWelcomeAnimation = () => {
        if (!animationPaused && welcomeAnimationTimelineRef.current) {
          welcomeAnimationTimelineRef.current.pause();
          animationPaused = true;
          
          // Mostrar solo "WELCOME" y ocultar las otras palabras
          if (welcomeAnimationRef.current) {
            const targets = welcomeAnimationRef.current.querySelectorAll('.welcome-word');
            gsap.set(targets, { opacity: 0, y: 0 });
            gsap.set(targets[0], { opacity: 1, y: 0 }); // Mostrar solo WELCOME
          }
        }
      };

      // Función para reiniciar la animación de las palabras
      const restartWelcomeAnimation = () => {
        if (animationPaused && welcomeAnimationTimelineRef.current) {
          // Resetear el estado de pausa
          animationPaused = false;
          
          // Reiniciar la animación desde el principio
          welcomeAnimationTimelineRef.current.restart();
        }
      };
      
      // Crear un ScrollTrigger que controle la animación de las palabras
      const pauseTrigger = ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        onUpdate: (self) => {
          if (self.progress > 0) {
            // Pausar cuando se inicia el scroll
            pauseWelcomeAnimation();
          } else if (self.progress === 0 && animationPaused) {
            // Reiniciar cuando vuelve al inicio
            restartWelcomeAnimation();
          }
        }
      });

      // Animación del shadow que sube y tapa el background
      let shadowAnimation: gsap.core.Timeline | null = null;
      if (shadowRef.current) {
        shadowAnimation = gsap.timeline({
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          }
        });

        shadowAnimation
          .to(shadowRef.current, {
            y: "-100vh", // Mueve el shadow hacia arriba para cubrir el background
            height: "100vh", // Aumenta la altura para cubrir completamente
            duration: 1,
            ease: "power2.out"
          });
      }

      // Función para actualizar el font-size y ancho en resize
      const handleResize = () => {
        gsap.set(titleRef.current, { fontSize: getFinalFontSize() });
        if (welcomeAnimationRef.current) {
          gsap.set(welcomeAnimationRef.current, { width: getInitialWidth() });
        }
      };

      // Agregar listener para resize
      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        window.removeEventListener('resize', handleResize);
        animation.kill();
        if (shadowAnimation) {
          shadowAnimation.kill();
        }
        if (welcomeAnimationTimelineRef.current) {
          welcomeAnimationTimelineRef.current.kill();
        }
        pauseTrigger.kill();
      };
    }
  }, []);

  // Animación de las palabras WELCOME, GRAND, MEDELLIN
  useEffect(() => {
    if (welcomeAnimationRef.current) {
      const targets = welcomeAnimationRef.current.querySelectorAll('.welcome-word');
      const numberOfTargets = targets.length;
      const duration = 0.8;
      const pause = 1.5;
      const stagger = duration + pause;
      const repeatDelay = (stagger * (numberOfTargets - 1)) + pause;

      // Mostrar el contenedor de animación
      gsap.set(welcomeAnimationRef.current, { autoAlpha: 1 });
      
      // Configurar estado inicial de las palabras
      gsap.set(targets, { opacity: 0, y: 80 });

      // Crear la animación y guardarla en la referencia
      welcomeAnimationTimelineRef.current = gsap.timeline({ repeat: 20 });
      
      welcomeAnimationTimelineRef.current
        .to(targets, {
          y: 0,
          duration: duration,
          opacity: 1,
          stagger: {
            each: stagger,
            repeat: -1,
            repeatDelay: repeatDelay
          }
        })
        .to(targets, {
          y: -80,
          duration: duration,
          opacity: 0,
          stagger: {
            each: stagger,
            repeat: -1,
            repeatDelay: repeatDelay
          }
        }, stagger);

      // Cleanup
      return () => {
        if (welcomeAnimationTimelineRef.current) {
          welcomeAnimationTimelineRef.current.kill();
        }
      };
    }
  }, []);
  
  return (
    <section className="hero">
      <div className="hero__background">
        <video 
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          onError={(e) => console.error('Error loading video:', e)}
        >
          <source src={videoUrl} type="video/webm" />
        </video>
        
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
      
      <div className="hero__title-wrapper">
        <div ref={titleRef} className="hero__title-content">
          <span className="hero__title-static">FEEL</span>
          <div ref={welcomeAnimationRef} className="welcome-animation">
            <div className="welcome-word">WELCOME</div>
            <div className="welcome-word">GRAND</div>
            <div className="welcome-word">MEDELLIN</div>
          </div>
        </div>
      </div>
      
      {/* Path SVG que conecta el título con la descripción */}
      <svg 
        className="hero__connecting-path" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          ref={pathRef}
          d="M50 0 Q30 30 50 50 Q70 70 50 100" 
          stroke="transparent" 
          strokeWidth="4" 
          fill="none" 
          opacity="0"
        />
      </svg>
      
      <div ref={shadowRef} className="hero__shadow"></div>
      <div className="hero__description">
        <div className="hero__description-content">
          <div className="hero__description-logo">
            <img src={vHotelLogo.src} alt="V Grand" />
          </div>
          
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
